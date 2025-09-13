import { LoginForm } from "@/components/ui/login-form";
import type { Route } from "./+types/login";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { cn } from "@/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | The Last of Guss" },
    { name: "description", content: "Welcome to The Last of Guss" },
  ];
}

export default function Login() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your name below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
        
      </div>
    </div>
    )
  }