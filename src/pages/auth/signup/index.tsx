import { Link } from "react-router-dom";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { PasswordStrength } from "../../../components/password_strength";
import { useState } from "react";
import { toast } from "react-toastify";

export interface signupProps {
  className?: string;
}
export function SignUp({ className }: signupProps) {
  const [password, setPassword] = useState("");
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
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-center items-center gap-4 my-3">
            <Input label="First Name" />
            <Input label="Last Name" />
          </div>
          <Input label="Email" name="email" containerClass="my-3" />
          <Input
            label="Password"
            name="password"
            type="password"
            containerClass="my-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelAction={
              <Link to="/forget">
                <span className="text-primary cursor-pointer font-semibold text-sm">
                  Forgot Password?
                </span>
              </Link>
            }
          />
          <div className="my-3">
            <PasswordStrength password={password} />
          </div>
          <label htmlFor="password" className="text-[#707070] text-xs">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </label>
          <Input
            label="Confirm Password"
            name="confirm_password"
            type="password"
            containerClass="my-3"
          />

          <div className="mt-10 flex justify-center">
            <Button
              onClick={() => toast("Functionality not implemented yet")}
              className="bg-primary"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
