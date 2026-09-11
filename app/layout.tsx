import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Sehati - E-Commerce & Logistik",
  description: "Platform E-Commerce & Logistik Retail Berbasis Web",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sehati",
  },
};

export const viewport = {
  themeColor: "#1F6E4A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${fraunces.variable} font-sans antialiased bg-brand-bg text-brand-ink`}>
        {children}
      </body>
    </html>
  );
}
