"use client";
import { toast } from "react-toastify";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { sendResetPasswordRequest } from "@/app/services/auth";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (v) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const resp = await sendResetPasswordRequest(v.email);
        if (resp.success) {
          toast.success("An email with a rest link has been sent.");
        } else {
          toast.error(resp.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    },
    validationSchema: Yup.object({ email: Yup.string().email().required() }),
  });
  return (
    <div className={`flex justify-center items-center flex-col w-full px-3`}>
      <div className="max-w-[472px] w-full rounded-lg bg-white shadow p-8">
        <div className="text-center flex-col justify-center items-center mb-8">
          <h2 className=" font-semibold text-xl text-[#707070]">
            Forgot <span className="text-primary">Password</span>
          </h2>
          <p className="text-[#707070] text-sm font-medium">
            Enter your email to reset your password
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Email"
            name="email"
            error={formik.errors.email}
            value={formik.values.email}
            isTouched={formik.touched.email}
            formikTouched={formik.setFieldTouched}
            onChange={formik.handleChange}
            containerClass="my-3"
          />
          <div className="mt-10 flex justify-center">
            <Button type="submit" isLoading={isLoading} className="bg-primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
