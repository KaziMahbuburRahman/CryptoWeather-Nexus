import NotificationCenter from "@/components/NotificationCenter";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoWeather Nexus",
  description: "Real-time crypto and weather dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">CryptoWeather Nexus</h1>
              <NotificationCenter />
            </div>
          </header>
          <main className="container mx-auto px-4 pt-24 pb-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
