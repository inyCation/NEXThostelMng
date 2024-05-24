import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import StoreProvider from "./StoreProvider";




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
    <html lang="en" >
      <body className={inter.className}><StoreProvider><Header />{children}<Footer /></StoreProvider></body>
    </html>
  );
}
