import { useFormik } from "formik";
import { Input } from "../../../../components/input";
import { smtpTesterSchema } from "../../../../schemas/forms/smtp_tester";
import { Toggler } from "../../../../components/toggle";
import { Button } from "../../../../components/button";
import {
  TestSMTPRequest,
  testSMTP,
} from "../../../../services/email_marketing";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

export interface SMTPTesterProps {
  className?: string;
}
export function SMTPTester({ className }: SMTPTesterProps) {
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
    <div className={`${className}`}>
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
          <Button className="bg-primary w-full my-3">
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
        <div>
          <h2 className="font-semibold text-lg">What is a privacy policy?</h2>
          <p className="text-black/70 my-2">
            A privacy policy is a legal document where you disclose what data
            you collect from users, how you manage the collected data, and how
            you use that data. The important objective of a privacy policy is to
            inform users how you collect, use and manage the collection.
          </p>
        </div>
        <div className="my-2">
          <h2 className="font-semibold text-lg">
            Can I copy someone else's privacy policy?
          </h2>
          <p className="text-black/70 my-2">
            We do not recommend copying someone else's privacy policy. First of
            all, privacy policies are copyright-protected legal documents. But
            most importantly, a privacy policy must be generated based on the
            exact data you collect. Our privacy policy generator can help you
            with this.
            <br />
            <br /> Not everyone knows how to make a{" "}
            <strong>Privacy Policy agreement</strong>, especially with{" "}
            <strong>
              CCPA, GDPR, CalOPPA, PIPEDA, or Australia's Privacy Act provisions
            </strong>
            . You will be clueless if you are not a lawyer or someone familiar
            with Privacy Policies. Some people might even take advantage of you
            because of this. Some people may even extort money from you. These
            are some examples that we want to stop from happening to you. We
            will help you protect yourself by generating a Privacy Policy.
            <br />{" "}
            <strong>
              Our Privacy Policy Generator can help ensure your business
              complies with the law.
            </strong>{" "}
            <br />
            We are here to help you protect your business, yourself, and
            customers. Fill in the blank spaces below, and we will create a
            personalized website Privacy Policy for your business. No account
            registration is required. Simply generate & download a Privacy
            Policy in seconds! <br />
            <br />
            Small remark when filling in this Privacy Policy generator: Not all
            parts of this Privacy Policy might apply to your website. When there
            are parts that are not applicable, these can be removed. Optional
            elements can be selected in step 2. The accuracy of the generated
            Privacy Policy on this website is not legally binding. Use at your
            own risk.
          </p>
        </div>

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
