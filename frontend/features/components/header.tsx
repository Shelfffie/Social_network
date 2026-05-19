import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-20  w-full h-20 bg-indigo-50 fixed z-1000  right-0 top-0 border-b-1 border-indigo-300">
      HEADER
      <Button variant="link" className="text-xl p-0">
        <Link href={"/sign-in"}>Sign in</Link>
      </Button>
    </header>
  );
}
