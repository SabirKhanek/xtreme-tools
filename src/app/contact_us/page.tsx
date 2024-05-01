"use client";
import { LuMail } from "react-icons/lu";
import { Footer } from "../components/footer";
import { Input } from "../components/input";
import { Navbar } from "../components/navbar";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Button } from "../components/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendContactUsMessage } from "../services/contact_us";
import { SubscribeSection } from "../components/home_sections/subscribe";

export default function ContactUs() {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", message: "" },
    onSubmit: async (v) => {
      setIsLoading(true);
      try {
        const resp = await sendContactUsMessage(v);
        if (resp.success) {
          formik.setTouched({
            name: false,
            email: false,
            phone: false,
            message: false,
          });
          formik.setValues({ name: "", email: "", phone: "", message: "" });
          toast.success("Message sent successfully");
        }
      } catch (err) {
        toast.error("something went wrong");
      }

      setIsLoading(false);
    },
    validationSchema: Yup.object({
      name: Yup.string().required().label("Name"),
      email: Yup.string().email().required().label("Email"),
      phone: Yup.string().required().label("Phone"),
      message: Yup.string().required(),
    }),
  });
  return (
    <div className="flex-grow w-full flex flex-col">
      <Navbar bgClassApplied />
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-x-9 gap-y-9 grow my-16 ${"responsive"}`}
      >
        <div className="basis">
          <h1 className="text-primary text-3xl font-bold">
            Get in Touch with Xtreme Tools!
          </h1>
          <p className="my-3">
            Questions, feedback, or partnership inquiries? Reach out to us
            effortlessly. Our team is ready to assist you on your AI journey.
            Connect with Xtreme Tools today and unlock the potential of
            innovation!
          </p>
          <h2 className="text-primary text-xl font-semibold">
            Contact Details
          </h2>
          <ul className="my-3">
            <li className="flex items-center gap-3">
              <IoLocationSharp className="text-[#F2AEDE]" />
              <span>1311 W Sprint St, Suite B, Monroe GA 30655</span>
            </li>
            <li className="flex items-center gap-3">
              <LuMail className="text-[#F2AEDE]" />
              <span>support@xtreme.tools</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-[#F2AEDE]" />
              <span>+1 770-346-8500</span>
            </li>
          </ul>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <Input
            name="name"
            value={formik.values.name}
            error={formik.errors.name}
            isTouched={formik.touched.name}
            formikTouched={formik.setFieldTouched}
            onChange={formik.handleChange}
            containerClass="w-full"
            label="Name"
          />
          <div className="flex gap-2 w-full">
            <Input
              name="email"
              value={formik.values.email}
              error={formik.errors.email}
              isTouched={formik.touched.email}
              formikTouched={formik.setFieldTouched}
              onChange={formik.handleChange}
              containerClass="basis-1/2 grow-0"
              label="Email"
            />
            <Input
              name="phone"
              value={formik.values.phone}
              error={formik.errors.phone}
              isTouched={formik.touched.phone}
              formikTouched={formik.setFieldTouched}
              onChange={formik.handleChange}
              containerClass="basis-1/2  grow-0"
              label="Phone"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black/70 font-semibold text-sm">
              Message
            </label>
            <textarea
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              className="resize-none bg-[#E6B0D92E]/20 p-1 outline-[#E6B0D92E]/50 text-lg text-black rounded-lg"
              rows={5}
            ></textarea>
            {formik.errors.message && formik.touched.message && (
              <p className="text-red-500">{formik.errors.message}</p>
            )}
          </div>
          <Button isLoading={isLoading} className="bg-primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
      <SubscribeSection />
      <Footer />
    </div>
  );
}
