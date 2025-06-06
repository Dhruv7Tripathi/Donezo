"use client"
import Link from "next/link";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import UserAccountNav from "../auth/userAccountNav";
import SignInButton from "../auth/SignInButton";
// import { Themetoggle } from "../ui/themetoggle";
import { Button } from "../ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-black dark:text-white">Donezo</h1>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Home
        </Link>
        <Link href="/createTodo" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Dashboard
        </Link>
        <Link href="/calender" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Calender
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* <Themetoggle /> */}
        <div className="flex items-center">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}