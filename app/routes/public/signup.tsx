import type { Route } from "./+types/login";
import { SignupForm } from "@/components/ui/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import { cn } from "@lib/utils"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Signup | The Last of Guss" },
    { name: "description", content: "Welcome to The Last of Guss" },
  ];
}

export default function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Complete Your Registration Details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}