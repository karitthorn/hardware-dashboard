import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const inter = Prompt({  weight: ["300"], subsets:["thai"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
