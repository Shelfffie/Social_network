import Header from "@/features/common/components/header";
import "../globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";

import { getMe } from "@/features/auth/actions/get-me";
import { AuthProvider } from "@/features/auth/contexts/auth-context";
import { AppSidebar } from "@/features/common/components/authorized-menu-components/sidebar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <header>
          <Header />
        </header>

        <main className="flex-1 flex-row min-screen w-full pt-15 pl-36 overflow-x-hidden">
          <SidebarProvider>
            <AppSidebar />
            <AuthProvider initialUser={user}>{children}</AuthProvider>
          </SidebarProvider>
        </main>
      </body>
    </html>
  );
}
