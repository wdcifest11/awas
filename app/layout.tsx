import type {Metadata} from "next";
import {Montserrat, Playfair} from "next/font/google";
import "./styles/globals.css";
import {AuthProvider} from "../context/auth";
import LayoutWrapper from "@/components/layout-wrapper";

const monsterrat = Montserrat({
  variable: "--font-monsterrat",
  subsets: ["latin"],
});
const playfair = Playfair({variable: "--font-playfair", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "EcoWearHub",
  description: "Bersama wujudkan fashion berkelanjutan dan ramah lingkungan.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body
        className={`${monsterrat.variable} ${playfair.variable} antialiased`}
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
