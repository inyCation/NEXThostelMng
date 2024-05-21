import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

import type { Metadata } from "next";
import { Inter } from "next/font/google";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HOSTELO",
  description: "Hostel Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><Header />{children}<Footer /></body>
    </html>
  );
}
