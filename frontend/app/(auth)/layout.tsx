import { getMe } from "@/features/auth/actions/get-me";
import "../globals.css";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();
  if (user) redirect("/");
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col gap-10 w-4/5 justify-center items-center h-full pb-50">
        <h1 className="text-7xl font-bold">Welcome.</h1>
        <h2 className="text-3xl">Please sign in</h2>
      </div>
      {children}
    </div>
  );
}
