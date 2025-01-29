"use client"
import Link from "next/link";
import { Menu as HamIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import UserAccountNav from "./userAccountNav";
import SignInButton from "./SignInButton";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-7xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-l font-bold">
          <Link href="/" className="flex items-center">
            <Image
              src="/l2.webp"
              alt="logo"
              className="h-10 w-10 mr-3 rounded-full border border-gray-200 hover:scale-105 transition-transform duration-200"
              height={10}
              width={10}
            />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent font-bold">
              Donezo
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-8 text-gray-600 dark:text-gray-300">
          <Link
            href="/"
            className="relative hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
          >
            Home
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>
          <Link
            href="/about"
            className="relative hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
          >
            About
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>
          <Link
            href="/contactus"
            className="relative hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
          >
            Contact Us
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>
          <Link
            href="/blog"
            className="relative hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
          >
            Blog
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text={"Sign In"} />
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
              <HamIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-blue-600 dark:text-blue-400">Donezo</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8 text-gray-700 dark:text-gray-300">
                <Link
                  href="/"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="/contactus"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  Contact Us
                </Link>
                <Link
                  href="/blog"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  Blog
                </Link>
              </nav>
              <div className="mt-8 flex flex-col gap-4">
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <SignInButton text={"Sign In"} />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}