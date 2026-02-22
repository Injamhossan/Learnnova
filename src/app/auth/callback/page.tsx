import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = ((session.user as any)?.role || "STUDENT").toUpperCase();

  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    redirect("/admin");
  } else if (role === "INSTRUCTOR") {
    redirect("/instructor");
  } else {
    redirect("/student");
  }
}
