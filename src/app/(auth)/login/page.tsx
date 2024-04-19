"use client";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useState } from "react";
import { login } from "../../services/auth";
import { signInSchema } from "../../schemas/forms/login";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (v) => {
      setIsLoading(true);
      try {
        const response = await login({
          email: v.email,
          password: v.password,
        });
        if (response) {
          navigate.push("/");
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
      setIsLoading(false);
    },
    validationSchema: signInSchema,
  });
  return (
    <div className={`flex justify-center items-center flex-col w-full px-3 `}>
      <div className="max-w-[472px] w-full rounded-lg bg-white shadow p-8">
        <div className="text-center flex-col justify-center items-center mb-8">
          <h2 className=" font-semibold text-xl text-[#707070]">
            Sign <span className="text-primary">In</span>
          </h2>
          <p className="text-[#707070] text-sm font-medium">
            New Here?{" "}
            <Link href="/signup">
              <span className="cursor-pointer text-primary font-semibold">
                Create an account?
              </span>
            </Link>
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
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
            containerClass="my-3"
            onChange={formik.handleChange}
            value={formik.values.password}
            isTouched={formik.touched.password}
            error={formik.errors.password}
            formikTouched={formik.setFieldTouched}
            type="password"
            labelAction={
              <Link href="/forget">
                <span className="text-primary cursor-pointer font-semibold text-sm">
                  Forgot Password?
                </span>
              </Link>
            }
          />
          <div className="mt-10 flex justify-center">
            <Button className="bg-primary" type="submit" isLoading={isLoading}>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
