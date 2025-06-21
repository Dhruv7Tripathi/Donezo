// "use client"
// import Link from "next/link";
// import { Menu } from "lucide-react";
// import { useSession } from "next-auth/react";
// import UserAccountNav from "../auth/userAccountNav";
// import SignInButton from "../auth/SignInButton";
// import { Themetoggle } from "../ui/themetoggle";
// import { Button } from "../ui/button";

// export default function Navbar() {
//   const { data: session } = useSession();

//   return (
//     <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
//       <div className="flex items-center space-x-2">
//         <h1 className="text-xl font-bold text-black dark:text-white">Donezo</h1>
//       </div>

//       <div className="hidden md:flex items-center space-x-6">
//         <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
//           Home
//         </Link>
//         <Link href="/createTodo" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
//           Dashboard
//         </Link>
//         <Link href="/calender" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
//           Calender
//         </Link>
//       </div>

//       <div className="flex items-center space-x-4">
//         <Themetoggle />
//         <div className="flex items-center">
//           {session?.user ? (
//             <UserAccountNav user={session.user} />
//           ) : (
//             <SignInButton text="Sign In" />
//           )}
//         </div>
//         <div className="md:hidden">
//           <Button variant="ghost" size="icon">
//             <Menu className="h-6 w-6" />
//           </Button>
//         </div>
//       </div>
//     </nav>
//   );
// }
'use client'
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import UserAccountNav from "../auth/userAccountNav";
import SignInButton from "../auth/SignInButton";
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/createTodo' },
  { name: 'Calender', href: '/calender' },
]

const Navbar = () => {
  const { data: session } = useSession();
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed z-20 w-full px-2 group">
        <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/250 max-w-4xl rounded-2xl border border-zinc-200 dark:border-white/10 backdrop-blur-md lg:px-5')}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2">
                {/* <Image
                  src="/donezo.png"
                  alt="Bloggify Logo"
                  width={40} border border-zinc-200 dark:border-white/10

                  height={40}
                  className="h-10 w-10 rounded-full object-cover lg:h-10 lg:w-10 md:h-10 md:w-10 sm:h-8 sm:w-8"
                  priority
                /> */}
                <span className="text-xl font-bold text-white">Donezo</span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-white hover:text-accent-foreground block duration-150">
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-white hover:text-accent-foreground block duration-150">
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && 'lg:hidden')}>

                  {session?.user ? (
                    <UserAccountNav user={session.user} />
                  ) : (
                    <SignInButton text={"Sign In"} />
                  )}

                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Navbar