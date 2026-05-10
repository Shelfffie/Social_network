import Header from "@/features/components/header";
import "./globals.css";
import Footer from "@/features/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
