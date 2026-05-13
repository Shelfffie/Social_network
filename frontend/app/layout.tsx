import Header from "@/features/components/header";
import "./globals.css";
import Footer from "@/features/components/footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/components/authorized-menu-components/sidebar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <Header />

        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
        <main className="flex-1 min-h-full">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
