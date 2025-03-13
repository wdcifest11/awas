import {z} from "zod";

export const userSignUpSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    name: z.string().min(5, "Username minimal 5 karakter"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

export type UserSignUpForm = z.infer<typeof userSignUpSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export type UserLoginForm = z.infer<typeof userLoginSchema>;

export const userAddressSchema = z.object({
  fullName: z.string().min(5, "Nama lengkap minimal 5 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 karakter"),
  fullAddress: z.string().min(10, "Alamat lengkap minimal 10 karakter"),
  details: z.string().optional(),
});

export type UserAddressForm = z.infer<typeof userAddressSchema>;
