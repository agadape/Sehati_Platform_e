import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sehati - E-Commerce & Logistik",
  description: "Platform E-Commerce & Logistik Retail Berbasis Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
