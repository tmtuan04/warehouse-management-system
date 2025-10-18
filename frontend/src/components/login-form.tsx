import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field as FieldWrapper,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { LoginSchema } from "@/types/auth";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const login = useAuthStore((state) => state.login);
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await login(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={cn("flex flex-col gap-6", className)} {...props}>
          <FieldGroup>
            {/* Header */}
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to login to your account
              </p>
            </div>

            {/* Email */}
            <FieldWrapper>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Field
                name="email"
                as={Input}
                type="email"
                placeholder="m@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500"
              />
            </FieldWrapper>

            {/* Password */}
            <FieldWrapper>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <Field
                  name="password"
                  as={Input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} className="cursor-pointer" /> : <Eye size={18} className="cursor-pointer" />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500"
              />
            </FieldWrapper>

            {/* Submit */}
            <FieldWrapper>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </FieldWrapper>

            <FieldSeparator>Or continue with</FieldSeparator>

            {/* GitHub login (fake) */}
            <FieldWrapper>
              <Button variant="outline" type="button" className="w-full flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 
                      0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
                      C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729
                      1.205.084 1.838 1.236 1.838 1.236
                      1.07 1.835 2.809 1.305 3.495.998
                      .108-.776.417-1.305.76-1.605
                      -2.665-.3-5.466-1.332-5.466-5.93
                      0-1.31.465-2.38 1.235-3.22
                      -.135-.303-.54-1.523.105-3.176
                      0 0 1.005-.322 3.3 1.23
                      .96-.267 1.98-.399 3-.405
                      1.02.006 2.04.138 3 .405
                      2.28-1.552 3.285-1.23 3.285-1.23
                      .645 1.653.24 2.873.12 3.176
                      .765.84 1.23 1.91 1.23 3.22
                      0 4.61-2.805 5.625-5.475 5.92
                      .42.36.81 1.096.81 2.22
                      0 1.606-.015 2.896-.015 3.286
                      0 .315.21.69.825.57
                      C20.565 22.092 24 17.592 24 12.297
                      c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Login with GitHub
              </Button>

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </FieldDescription>
            </FieldWrapper>
          </FieldGroup>
        </Form>
      )}
    </Formik>
  );
}
