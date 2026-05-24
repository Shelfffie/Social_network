import SignOutButton from "@/features/auth/components/sign-out-button";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-20  w-full h-20 bg-indigo-50 fixed z-900  right-0 top-0 border-b-1 border-indigo-300">
      HEADER
      <SignOutButton />
    </header>
  );
}
