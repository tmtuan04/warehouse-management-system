import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type LoginFormData = {
  email: string;
  password: string;
};
