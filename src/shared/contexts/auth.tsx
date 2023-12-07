import { createContext, useContext, useState, ReactNode } from "react";
import { UserPayload, isLoggedIn } from "../../services/auth";

function getCurrentAuthDetails() {
  const user = isLoggedIn();
  return { isLoggedIn: user !== undefined, user: user };
}

export let updateAuthDetails = () => {};

export interface AuthDetails {
  isLoggedIn: boolean;
  user?: UserPayload;
}

export interface AuthConsumer {
  authDetails: AuthDetails;
  updateAuthDetails: () => void;
}

const AuthContext = createContext<AuthConsumer>({
  authDetails: getCurrentAuthDetails(),
  updateAuthDetails,
});

export const useAuth: () => AuthConsumer = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [AuthInfo, setAuthInfo] = useState<AuthDetails>(
    getCurrentAuthDetails()
  );
  updateAuthDetails = () => {
    setAuthInfo(getCurrentAuthDetails());
  };
  return (
    <AuthContext.Provider
      value={{
        authDetails: AuthInfo,
        updateAuthDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
