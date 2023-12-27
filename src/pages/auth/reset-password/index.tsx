import { toast } from "react-toastify";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { resetPassword } from "../../../services/auth";
import { useNavigate, useParams } from "react-router-dom";
export interface ResetPasswordProps {
  className?: string;
}
export function ResetPassword({ className }: ResetPasswordProps) {
  const token = useParams()["token"];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (v) => {
      if (isLoading) return;
      if (!token || token.length < 10)
        return toast.error("No token provided or invalid. ");
      setIsLoading(true);
      try {
        const resp = await resetPassword(token, v.password);
        if (resp.success) {
          toast.success("Password was changed. You can now login!");
          navigate("/login");
        } else {
          toast.error(resp.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8).required(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
  });
  return (
    <div className={`flex justify-center items-center flex-col ${className}`}>
      <div className="w-[472px] rounded-lg bg-white shadow p-8">
        <div className="text-center flex-col justify-center items-center mb-8">
          <h2 className=" font-semibold text-xl text-[#707070]">
            Reset <span className="text-primary">Password</span>
          </h2>
          <p className="text-[#707070] text-sm font-medium">
            Enter new password
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Password"
            name="password"
            error={formik.errors.password}
            value={formik.values.password}
            isTouched={formik.touched.password}
            formikTouched={formik.setFieldTouched}
            onChange={formik.handleChange}
            containerClass="my-3"
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            error={formik.errors.confirmPassword}
            value={formik.values.confirmPassword}
            isTouched={formik.touched.confirmPassword}
            formikTouched={formik.setFieldTouched}
            onChange={formik.handleChange}
            containerClass="my-3"
          />
          <div className="mt-10 flex justify-center">
            <Button isLoading={isLoading} type="submit" className="bg-primary">
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
