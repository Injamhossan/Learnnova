import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import SessionProviderWrapper from "@/components/layout/SessionProviderWrapper";
import StoreProvider from "@/components/providers/StoreProvider";
import ToastContainer from "@/components/ui/ToastContainer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learnova - Learn New Skills",
  description: "Learnova is a platform for learning new skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased bg-white text-slate-900`}>
        <StoreProvider>
          <SessionProviderWrapper>
            <ClientLayout>
              {children}
            </ClientLayout>
            <ToastContainer />
          </SessionProviderWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}

