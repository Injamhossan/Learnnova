"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";

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
      
      <AnimatePresence mode="wait">
        <motion.main 
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}
