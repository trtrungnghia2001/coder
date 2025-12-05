import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Link } from "react-router-dom";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen sm:p-8">
      <Card className="sm:max-w-[440px] w-full">
        <CardHeader>
          <CardTitle className="text-lg">Forgot Password</CardTitle>
          <CardDescription>
            Enter your registered email and
            <br />
            we will send you a link to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ForgotPasswordForm />
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link to={`/signup`} className="underline">
              Sign Up.
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
