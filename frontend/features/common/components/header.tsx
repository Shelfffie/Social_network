import { Button } from "@/components/ui/button";
import { getMe } from "@/features/auth/actions/get-me";
import Link from "next/link";

export default async function Header() {
  const user = await getMe();
  return (
    <header className="flex flex-row justify-between items-center px-20  w-full h-20 bg-indigo-50 fixed z-900  right-0 top-0 border-b-1 border-indigo-300">
      HEADER
      <Button variant="link" className="text-xl p-0">
        {user ? (
          <Link href={"/profile"}>Profile</Link>
        ) : (
          <Link href={"/sign-in"}>Sign in</Link>
        )}
      </Button>
    </header>
  );
}
