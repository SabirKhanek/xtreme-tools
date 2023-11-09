import { Link } from "react-router-dom";
import { Button } from "../../../components/button";

export interface LoginPageProps {
  className?: string;
}
export function LoginPage({ className }: LoginPageProps) {
  return (
    <div className={`flex justify-center items-center flex-col ${className}`}>
      <h1>LoginPage works!</h1>
      <Link to="/signup">
        <Button className="bg-primary">Sign Up</Button>
      </Link>
    </div>
  );
}
