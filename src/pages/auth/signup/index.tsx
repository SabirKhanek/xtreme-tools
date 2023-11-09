import { Link } from "react-router-dom";
import { Button } from "../../../components/button";

export interface signupProps {
  className?: string;
}
export function SignUp({ className }: signupProps) {
  return (
    <div className={`flex justify-center items-center flex-col ${className}`}>
      <h1>Signup works!</h1>
      <Link to="/login">
        <Button className="bg-primary">Sign in</Button>
      </Link>
    </div>
  );
}
