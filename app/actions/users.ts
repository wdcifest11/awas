"use server";

import users from "@/data/users";

export async function addUserAddress(newUser: {
  email: string;
  newAddress: {
    fullAddress: string;
    phone: string;
    fullName: string;
    details: string;
  };
}) {
  try {
    const {email, newAddress} = newUser;

    if (!email || !newAddress) {
      return {success: false, message: "Data tidak lengkap"};
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return {success: false, message: "User tidak ditemukan"};
    }

    user.address = structuredClone(newAddress);

    return {success: true, message: "Alamat berhasil diperbarui", user};
  } catch (error) {
    console.error("Error di server:", error);
    return {success: false, message: "Server error"};
  }
}
