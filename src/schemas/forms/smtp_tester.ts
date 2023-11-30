import * as Yup from "yup";

export const smtpTesterSchema = Yup.object({
  host: Yup.string().required("Host is a required field"),
  port: Yup.number().required("Port is required field"),
  secure: Yup.string().oneOf(["none", "auto"]).default("none"),
  from: Yup.string().email().required("From email is required field"),
  to: Yup.string().email().required("To email is required field"),
  auth: Yup.boolean().default(false),
  user: Yup.string().when("auth", {
    is: true,
    then: (schema) => schema.required("Username is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: Yup.string().when("auth", {
    is: true,
    then: (schema) => schema.required("Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
