import { signupFormSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form"
import type { SignupFormData } from "@/lib/types"
import { Checkbox } from "@ui/checkbox"
import {AlertDialog,  AlertDialogAction,  AlertDialogContent,  AlertDialogFooter,  AlertDialogHeader,  AlertDialogTitle } from "@ui/alert-dialog"
import { useState } from "react"
import { useAuth } from "@/lib/providers/auth-provider"

export function SignupForm() {
  const {register} = useAuth()
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  async function onSubmit(formData: SignupFormData) {
    try {
      await register(formData)
    } catch (error) {
      const apiError = error as { statusCode?: number; error?: string, message: string };
      if(apiError.statusCode === 409 && apiError.error === "Conflict") {
        setAlertMessage(apiError.message)
      }
    }
  };

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
                      placeholder="Passsword"
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
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder="Type your password again"
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
              name="agreement"
              render={({ field }) => (
                <FormItem >
                  <div className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Agree to terms and conditions</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <Button variant='success'>Create</Button>
          </div>
        </div>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to='/login' className="underline underline-offset-4">
            Login
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
