import { loginFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "app/components/ui/button"
import { Input } from "app/components/ui/input"
import { Label } from "app/components/ui/label"
import { useForm } from "react-hook-form";
import { Link } from "react-router"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";

export function LoginForm() {
  const form = useForm({
      resolver: zodResolver(loginFormSchema),
    });

    function onSubmit() {
      console.log('onSubmit')
    }
  return (
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
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
          </div>
          <Input id="password" type="password" required />
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
  )
}
