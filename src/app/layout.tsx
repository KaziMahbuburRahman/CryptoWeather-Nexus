import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CryptoWeather Nexus",
  description:
    "A modern dashboard combining weather data and cryptocurrency information with real-time notifications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
