import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { getMe } from "@/features/auth/actions/get-me";
import { AuthProvider } from "@/features/contexts/auth-context";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="h-screen">
        <AuthProvider initialUser={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}
