import { toast } from "react-toastify";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

export interface ForgetPasswordProps {
  className?: string;
}
export function ForgetPassword({ className }: ForgetPasswordProps) {
  return (
    <div className={`flex justify-center items-center flex-col ${className}`}>
      <div className="w-[472px] rounded-lg bg-white shadow p-8">
        <div className="text-center flex-col justify-center items-center mb-8">
          <h2 className=" font-semibold text-xl text-[#707070]">
            Forgot <span className="text-primary">Password</span>
          </h2>
          <p className="text-[#707070] text-sm font-medium">
            Enter your email to reset your password
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" name="email" containerClass="my-3" />
          <div className="mt-10 flex justify-center">
            <Button
              onClick={() => toast("Functionality not implemented yet.")}
              className="bg-primary"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
