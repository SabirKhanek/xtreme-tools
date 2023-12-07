import * as Yup from "yup";

export const signUpSchema = Yup.object({
  first_name: Yup.string().min(3).max(25).required("First name is required"),
  last_name: Yup.string().min(3).max(25).required("Last name is required"),
  email: Yup.string().lowercase().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(8).required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});
