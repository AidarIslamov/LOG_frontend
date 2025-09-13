import { loginFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { useForm } from "react-hook-form";
import { Link } from "react-router"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { useAuth } from "@/lib/providers/auth-provider";
import type { LoginFormData } from "@/lib/types";
import {AlertDialog,  AlertDialogAction,  AlertDialogContent,  AlertDialogFooter,  AlertDialogHeader,  AlertDialogTitle } from "@ui/alert-dialog"
import { useState } from "react";

export function LoginForm() {
  const {login} = useAuth();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(formData: LoginFormData) {
    try {
      await login(formData)
    } catch (error) {
      const apiError = error as { statusCode?: number; error?: string, message: string };
      if(apiError.statusCode === 401 && apiError.error === "User not found") {
        setAlertMessage(apiError.message)
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='name'
                        placeholder="Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <Button variant='success'>Login</Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to='/signup' className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
      <AlertDialog open={!!alertMessage} onOpenChange={(open) => setAlertMessage(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertMessage}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Ok</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </>
  )
}
