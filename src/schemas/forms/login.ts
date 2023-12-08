import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .lowercase()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
