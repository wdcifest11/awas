"use client";

import {usePathname} from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LayoutWrapper({children}: {children: React.ReactNode}) {
  const pathname = usePathname();

  return (
    <div
      className={`grid gap-20 overflow-x-hidden ${
        pathname.includes("/education") ||
        pathname.includes("/messages") ||
        pathname.includes("/how") ||
        pathname.includes("/shop") ||
        pathname.includes("/dashboard") ||
        pathname.includes("/user")
          ? "sm:gap-y-20"
          : "sm:gap-y-40"
      }`}
    >
      <Navbar />
      <main
        className={`container mx-auto grid gap-20 ${
          pathname.includes("/education") ||
          pathname.includes("/messages") ||
          pathname.includes("/how") ||
          pathname.includes("/shop") ||
          pathname.includes("/dashboard") ||
          pathname.includes("/user")
            ? "sm:gap-y-20"
            : "sm:gap-y-32"
        }`}
      >
        {children}
      </main>
      {!pathname.includes("/cart") && !pathname.includes("/checkout") && (
        <Footer />
      )}
    </div>
  );
}
