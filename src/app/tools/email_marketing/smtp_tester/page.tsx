"use client";
import { useFormik } from "formik";
import { Input } from "@/app/components/input";
import { smtpTesterSchema } from "@/app/schemas/forms/smtp_tester";
import { Toggler } from "@/app/components/toggle";
import { Button } from "@/app/components/button";
import { TestSMTPRequest, testSMTP } from "@/app/services/email_marketing";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";


export default function SMTPTester() {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      host: "",
      port: undefined as unknown as number,
      secure: "auto" as "auto" | "none",
      from: "",
      auth: false,
      to: "",
      user: "",
      password: "",
    },
    validationSchema: smtpTesterSchema,
    onSubmit: async ({
      auth,
      from,
      host,
      password,
      port,
      secure,
      to,
      user,
    }) => {
      const requestObj: TestSMTPRequest = {
        host,
        port,
        secure,
        to,
        from,
      };
      if (auth) {
        requestObj.username = user;
        requestObj.password = password;
      }
      setIsLoading(true);
      try {
        const response = await testSMTP(requestObj);
        if (response.success === true)
          toast.success(`SMTP server at host: ${host} is up and running`);
        else toast.error("SMTP request failed");
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    },
  });
  return (
    <div className={``}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">SMTP Tester</h1>
        <p className="text-sm text-black/70 my-2">
          Tool for testing SMTP servers
        </p>
      </div>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full border border-black rounded-xl min-h-[69.5vh] p-6 flex flex-col gap-2"
        >
          <Input
            value={formik.values.host}
            label="Host"
            placeholder="Enter host"
            type="text"
            name="host"
            formikTouched={formik.setFieldTouched}
            isTouched={formik.touched.host}
            required={true}
            error={formik.errors.host}
            onChange={formik.handleChange}
          />
          <Input
            value={formik.values.port}
            label="Port"
            placeholder="Enter port"
            type="number"
            name="port"
            formikTouched={formik.setFieldTouched}
            isTouched={formik.touched.port}
            required={true}
            onChange={formik.handleChange}
            error={formik.errors.port}
          />
          <div>
            <label className="text-black/70 font-semibold text-sm">
              Secure Socket
            </label>
            <select
              className="bg-[#E6B0D92E]/20 rounded-lg text-black/70 w-full p-1 outline-[#E6B0D92E]/50 text-lg my-2"
              value={formik.values.secure}
              onChange={formik.handleChange}
            >
              <option value={"none"}>None</option>
              <option value={"auto"}>Auto</option>
            </select>
          </div>
          <Input
            value={formik.values.from}
            label="From address"
            placeholder="Enter from address"
            type="text"
            name="from"
            formikTouched={formik.setFieldTouched}
            isTouched={formik.touched.from}
            required={true}
            error={formik.errors.from}
            onChange={formik.handleChange}
          />
          <Input
            value={formik.values.to}
            label="To address"
            placeholder="Enter to address"
            type="text"
            name="to"
            formikTouched={formik.setFieldTouched}
            isTouched={formik.touched.to}
            required={true}
            error={formik.errors.to}
            onChange={formik.handleChange}
          />
          <div className="flex items-center gap-1 my-2">
            <label className="text-black/70 font-semibold text-sm">
              SMTP Auth
            </label>
            <Toggler
              value={formik.values.auth}
              onChange={(val) => formik.setFieldValue("auth", val)}
            />
          </div>
          <Input
            value={formik.values.user}
            label="User"
            placeholder="Enter user"
            type="text"
            name="user"
            formikTouched={formik.setFieldTouched}
            isTouched={formik.touched.user}
            error={formik.errors.user}
            onChange={formik.handleChange}
            required={formik.values.auth}
            disabled={!formik.values.auth}
          />
          <Input
            value={formik.values.password}
            label="Password"
            placeholder="Enter password"
            type="password"
            name="password"
            formikTouched={formik.setFieldTouched}
            isTouched={formik.touched.password}
            error={formik.errors.password}
            onChange={formik.handleChange}
            required={formik.values.auth}
            disabled={!formik.values.auth}
          />
          <Button className="bg-primary w-full my-3" type="submit">
            <span className="flex justify-center items-center gap-1">
              {isLoading && (
                <span className="animate-spin">
                  <FaSpinner />
                </span>
              )}
              <span>Test SMTP Server</span>
            </span>
          </Button>
        </form>
      </div>
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <h2 className="font-semibold text-lg">What is SMTP Generator</h2>
        <p className="text-black/70 my-2">
          Are you having trouble sending emails? Is your SMTP server functioning
          properly? Our innovative online tool can help you diagnose any issues
          and ensure that your email service is up and running smoothly.
          <br /> With just a few clicks, our SMTP testing tool can verify that
          your server is working properly and is configured correctly. Our tool
          performs a series of tests to check the connection to your server, the
          availability of the SMTP service, and the ability to send and receive
          emails.
          <br /> With our email address extractor tool, you can save hours of
          time that would otherwise be Our user-friendly interface makes it easy
          for anyone to use, regardless of technical expertise. Simply enter
          your SMTP server details and let our tool do the rest. Our tool will
          provide you with detailed information about the status of your SMTP
          service, helping you troubleshoot any issues and get back to sending
          and receiving emails in no time.
          <br /> Whether you're a small business owner, IT professional, or
          simply someone looking to make sure their email service is functioning
          properly, our SMTP testing tool is the perfect solution. Don't let
          email issues slow you down - try our tool today and ensure that your
          SMTP server is operating at peak performance!
        </p>
        <span className="text-black/70 font-semibold text-lg">
          <span className="text-primary">Contact Us </span>
          <span>
            for suggestions, complaints, or just feedback without hesitation.
          </span>
        </span>
      </div>
    </div>
  );
}
