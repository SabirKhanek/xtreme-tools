import { StandardHttpResponse, axios } from "../shared/axios";
import { toast } from "react-toastify";
import { updateAuthDetails } from "../shared/contexts/auth";
export interface LoginParams {
  email: string;
  password: string;
}
interface UserAuthResponseData {
  user: {
    verified: boolean;
    uid: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_photo_slug: null | string;
  };
  token: string;
}
export async function login(loginCredentials: LoginParams) {
  try {
    const response = await axios.post<
      StandardHttpResponse<UserAuthResponseData>
    >("/auth", loginCredentials);
    if (response && response.status === 401) {
      console.error("Unauthorized: Invalid credentials");
      toast.error(response.data.message || "Invalid credentials");
      return false;
    } else {
      localStorage.setItem("jwt", response.data.data?.token || "");
      const user = isLoggedIn();
      if (user) {
        if (user.first_name) toast(`Welcome back ${user.first_name}`);
        updateAuthDetails();
        return true;
      } else return false;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Invalid credentials");
      toast.error(error.response.data || "Invalid credentials");
    } else {
      console.error("Login failed:", error.message);
    }
    return false;
  }
}

export async function signUp(userObj: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post<
      StandardHttpResponse<UserAuthResponseData>
    >("/auth/signup", userObj);
    if (!response.data.success) {
      toast.error(`${response.data.statusCode}: ${response.data.message}`);
      return false;
    } else {
      localStorage.setItem("jwt", response.data.data?.token || "");
      const user = isLoggedIn();
      if (user?.first_name)
        toast(
          `Welcome to Xtreme Tools ${user.first_name}! Check your email to verify your account.`
        );
      updateAuthDetails();
      return true;
    }
  } catch (err: any) {
    console.error("Signup failed:", err.message);
    return false;
  }
}

export async function logout() {
  localStorage.removeItem("jwt");
  window.location.reload();
  return true;
}
export interface UserPayload {
  uid: number;
  email: string;
  first_name: string;
  last_name: string;
  verified: boolean;
}
export function isLoggedIn() {
  const jwtToken = localStorage.getItem("jwt");

  if (jwtToken) {
    const [, payloadBase64] = jwtToken.split("."); // Extract the payload part of the JWT
    if (payloadBase64) {
      try {
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload as UserPayload;
      } catch (error: any) {
        // Handle JSON parsing errors
        console.error("Error decoding JWT payload:", error.message);
        return undefined;
      }
    }
  }

  return undefined;
}
