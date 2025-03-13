"use server";

import {cookies} from "next/headers";
import jwt, {JwtPayload} from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from "uuid";
import users from "@/data/users"; // Simulasi database (bisa pakai Prisma atau DB lainnya)

export async function login(email: string, password: string) {
  const user = users.find((u) => u.email === email);
  if (!user) {
    return {success: false, message: "Email atau password salah"};
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return {success: false, message: "Email atau password salah"};
  }

  if (!process.env.SECRET_KEY) {
    return {success: false, message: "Kesalahan konfigurasi server"};
  }

  try {
    const token = jwt.sign(
      {email: user.email, id: user.id},
      process.env.SECRET_KEY,
      {expiresIn: "1h"}
    );

    // ✅ Simpan token di cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // Expire dalam 1 jam
      path: "/",
    });

    const {password: _, ...userWithoutPassword} = user;
    return {
      success: true,
      message: "Berhasil login!",
      user: userWithoutPassword,
    };
  } catch (error) {
    return {success: false, message: "Terjadi kesalahan pada server"};
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !process.env.SECRET_KEY) return null;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

    const user = users.find(
      (u) => u.email.toLowerCase().trim() === decoded.email.toLowerCase().trim()
    );

    return user;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function registerAction(data: {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}) {
  const {email, name, password, confirmPassword} = data;

  if (!email || !name || !password || !confirmPassword) {
    return {success: false, message: "Semua field harus diisi"};
  }

  if (password !== confirmPassword) {
    return {success: false, message: "Password tidak sama"};
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: uuidv4(),
    email,
    name,
    location: "Semarang",
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    rating: null,
    products: [],
    address: null,
    password: passwordHash,
  };

  if (!process.env.SECRET_KEY) {
    return {success: false, message: "Kesalahan konfigurasi server"};
  }

  const token = jwt.sign(
    {email: user.email, id: user.id},
    process.env.SECRET_KEY,
    {expiresIn: "1h"}
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60,
    path: "/",
  });

  return {
    success: true,
    user: {email: user.email, name: user.name},
    message: "Berhasil membuat akun",
  };
}
