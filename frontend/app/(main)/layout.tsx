import Header from "@/features/common/components/header";
import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/features/auth/actions/get-me";
import { AuthProvider } from "@/features/auth/contexts/auth-context";
import { AppSidebar } from "@/features/common/components/authorized-menu-components/sidebar";
import { redirect } from "next/navigation";
import React from "react";

export default async function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await getMe();
  if (!user) redirect("/sign-in");
  return (
    <div>
      <header>
        <Header />
      </header>

      <main className="flex-1 flex-row w-full pt-15 pl-36 overflow-x-hidden">
        <SidebarProvider>
          <AppSidebar user={user} />
          <AuthProvider initialUser={user}>
            {children}
            {modal}
          </AuthProvider>
        </SidebarProvider>
      </main>
    </div>
  );
}
