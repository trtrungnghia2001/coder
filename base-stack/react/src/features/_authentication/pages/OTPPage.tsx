import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Link } from "react-router-dom";
import SigninForm from "../components/SigninForm";

const OTPPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen sm:p-8">
      <Card className="sm:max-w-[440px] w-full">
        <CardHeader>
          <CardTitle className="text-lg">Two-factor Authentication</CardTitle>
          <CardDescription>
            Please enter the authentication code.
            <br />
            We have sent the authentication code to your email.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SigninForm />
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="text-muted-foreground text-center">
            Haven't received it?
            <Link to={`/`} className="underline">
              Resend a new code.
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OTPPage;
