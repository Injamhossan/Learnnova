"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const RoleSelectionModal = dynamic(() => import("@/components/auth/RoleSelectionModal"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup");
  const isAdminPage = pathname?.startsWith("/admin");
  const isStudentPage = pathname?.startsWith("/student");
  const isInstructorPage = pathname?.startsWith("/instructor");

  const hideNavbarFooter = isAuthPage || isAdminPage || isStudentPage || isInstructorPage;

  return (
    <>
      <RoleSelectionModal />
      {!hideNavbarFooter && <Navbar />}
      <main className="min-h-screen">
        {children}
      </main>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
