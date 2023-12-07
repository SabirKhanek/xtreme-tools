import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { PasswordStrength } from "../../../components/password_strength";
import { useFormik } from "formik";
import { signUpSchema } from "../../../schemas/forms/signup";
import { signUp } from "../../../services/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../shared/contexts/auth";
export interface signupProps {
  className?: string;
}
export function SignUp({ className }: signupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async (vals) => {
      setIsLoading(true);
      try {
        const resp = await signUp({
          first_name: vals.first_name,
          last_name: vals.last_name,
          email: vals.email,
          password: vals.password,
        });
        if (resp) {
          auth.updateAuthDetails();
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    },
    validationSchema: signUpSchema,
  });
  return (
    <div className={`flex justify-center items-center flex-col ${className}`}>
      <div className="w-[472px] rounded-lg bg-white shadow p-8">
        <div className="text-center flex-col justify-center items-center mb-8">
          <h2 className=" font-semibold text-xl text-[#707070]">
            Sign <span className="text-primary">Up</span>
          </h2>
          <p className="text-[#707070] text-sm font-medium">
            Already have an account?{" "}
            <Link to="/login">
              <span className="cursor-pointer text-primary font-semibold">
                Sign in here.
              </span>
            </Link>
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center items-start gap-4 my-3">
            <Input
              label="First Name"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              isTouched={formik.touched.first_name}
              error={formik.errors.first_name}
              formikTouched={formik.setFieldTouched}
            />
            <Input
              label="Last Name"
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              isTouched={formik.touched.last_name}
              error={formik.errors.last_name}
              formikTouched={formik.setFieldTouched}
            />
          </div>
          <Input
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            isTouched={formik.touched.email}
            error={formik.errors.email}
            formikTouched={formik.setFieldTouched}
            containerClass="my-3"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            containerClass="my-3"
            onChange={formik.handleChange}
            value={formik.values.password}
            isTouched={formik.touched.password}
            error={formik.errors.password}
            formikTouched={formik.setFieldTouched}
            labelAction={
              <Link to="/forget">
                <span className="text-primary cursor-pointer font-semibold text-sm">
                  Forgot Password?
                </span>
              </Link>
            }
          />
          <div className="my-3">
            <PasswordStrength password={formik.values.password} />
          </div>
          <label htmlFor="password" className="text-[#707070] text-xs">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </label>
          <Input
            label="Confirm Password"
            name="confirm_password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            isTouched={formik.touched.confirm_password}
            error={formik.errors.confirm_password}
            formikTouched={formik.setFieldTouched}
            containerClass="my-3"
          />

          <div className="mt-10 flex justify-center">
            <Button type="submit" className="bg-primary" isLoading={isLoading}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
