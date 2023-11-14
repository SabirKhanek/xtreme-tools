import { Link } from "react-router-dom";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

export interface LoginPageProps {
  className?: string;
}
export function LoginPage({ className }: LoginPageProps) {
  return (
    <div className={`flex justify-center items-center flex-col ${className}`}>
      <div className="w-[472px] rounded-lg bg-white shadow p-8">
        <div className="text-center flex-col justify-center items-center mb-8">
          <h2 className=" font-semibold text-xl text-[#707070]">
            Sign <span className="text-primary">In</span>
          </h2>
          <p className="text-[#707070] text-sm font-medium">
            New Here?{" "}
            <Link to="/signup">
              <span className="cursor-pointer text-primary font-semibold">
                Create an account?
              </span>
            </Link>
          </p>
        </div>
        <form>
          <Input label="Email" name="email" containerClass="my-3" />
          <Input
            label="Password"
            name="password"
            containerClass="my-3"
            labelAction={
              <Link to="/forget">
                <span className="text-primary cursor-pointer font-semibold text-sm">
                  Forgot Password?
                </span>
              </Link>
            }
          />
          <Link to="/signup" className="mt-10 flex justify-center">
            <Button className="bg-primary">Sign Up</Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
