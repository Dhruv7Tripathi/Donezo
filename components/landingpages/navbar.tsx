// 'use client'
// import React from 'react';
// import Link from 'next/link';
// import { useSession } from 'next-auth/react';
// import UserAccountNav from "../auth/userAccountNav";
// import SignInButton from "../auth/SignInButton";
// import { Menu, X } from 'lucide-react';
// import { Button } from '../ui/button';
// import { cn } from '@/lib/utils';

// const menuItems = [
//   { name: 'Home', href: '/' },
//   { name: 'Dashboard', href: '/createTodo' },
//   { name: 'Calender', href: '/calender' },
// ]

// const Navbar = () => {
//   const { data: session } = useSession();
//   const [menuState, setMenuState] = React.useState(false)
//   const [isScrolled, setIsScrolled] = React.useState(false)

//   React.useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])
//   return (
//     <header>
//       <nav
//         data-state={menuState && 'active'}
//         className="fixed z-20 w-full px-2 group">
//         <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 border-gray-400', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border-zinc-200 dark:border-white/10 backdrop-blur-sm lg:px-5')}>
//           <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
//             <div className="flex w-full justify-between lg:w-auto">
//               <Link
//                 href="/"
//                 aria-label="home"
//                 className="flex items-center space-x-2">
//                 <span className="text-xl font-bold text-white">Donezo</span>
//               </Link>

//               <button
//                 onClick={() => setMenuState(!menuState)}
//                 aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
//                 className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
//                 <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
//                 <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
//               </button>
//             </div>

//             <div className="absolute inset-0 m-auto hidden size-fit lg:block">
//               <ul className="flex gap-8 text-sm">
//                 {menuItems.map((item, index) => (
//                   <li key={index}>
//                     <Link
//                       href={item.href}
//                       className="text-white bg-background px-4 rounded-full py-2 hover:text-accent-foreground block duration-150">
//                       <span>{item.name}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
//               <div className="lg:hidden">
//                 <ul className="space-y-6 text-base">
//                   {menuItems.map((item, index) => (
//                     <li key={index}>
//                       <Link
//                         href={item.href}
//                         className="text-white hover:text-accent-foreground block duration-150">
//                         <span>{item.name}</span>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="flex w-full text-white flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
//                 <Button
//                   asChild
//                   variant="outline"
//                   size="sm"
//                   className={cn(isScrolled && 'lg:hidden text-white border-white hover:bg-white/10')}>

//                   {session?.user ? (
//                     <UserAccountNav user={session.user} />
//                   ) : (
//                     <SignInButton text={"Sign In"} />
//                   )}

//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   )
// }
// export default Navbar
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import AnchorNav from '../auth/anchor-nav';
import { useSession } from 'next-auth/react';
import UserAccountNav from "../auth/userAccountNav";
import SignInButton from '../auth/SignInButton';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'pricing', href: '/pricing' },
    { name: 'signup', href: '/signup' },
  ];
  return (
    <nav className="z-50 sticky top-0 w-full dark:bg-zinc-950/10 bg-white/15  backdrop-blur-lg ">
      <div className="max-w-[88rem] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-2 items-center">

            <Image src="/logo.gif" alt="SaasStarter Logo"
              className='rounded-md' width={40} height={40} />

            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold">Donezo</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <AnchorNav
                key={item.name + item.href}
                className=" text-lg hover:bg-background rounded-2xl px-3 py-1.5 text-neutral-900 dark:text-neutral-100 font-semibold"
                absolute
                href={item.href}
              >
                {item.name}
              </AnchorNav>

            ))}
            <div className="flex items-center bg-neutral-700 border border-neutral-800 rounded-xl font-bold text-xl space-x-6">
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <SignInButton text={"Sign In"} />
              )}
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white dark:bg-zinc-950/95 backdrop-blur-lg shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name + item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <SignInButton text={"Sign In"} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;