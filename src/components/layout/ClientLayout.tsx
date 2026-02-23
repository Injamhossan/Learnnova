"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

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
