'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import AnchorNav from '../auth/anchor-nav'
import { useSession } from 'next-auth/react'
import UserAccountNav from '../auth/userAccountNav'
import SignInButton from '../auth/SignInButton'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const Navbar = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Signup', href: '/signup' },
  ]

  return (
    <nav className="sticky top-0 z-[9999] w-full dark:bg-zinc-950/10 bg-white/15 backdrop-blur-lg border-b border-neutral-200 dark:border-zinc-800">
      <div className="max-w-[88rem] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-2 items-center">
            <Image
              src="/logo.gif"
              alt="Donezo Logo"
              className="rounded-md"
              width={40}
              height={40}
            />
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold">Donezo</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <AnchorNav
                key={item.name + item.href}
                className="text-lg hover:bg-background rounded-2xl px-3 py-1.5 text-neutral-900 dark:text-neutral-100 font-semibold"
                absolute
                href={item.href}
              >
                {item.name}
              </AnchorNav>
            ))}
            <div className="flex items-center bg-neutral-700 border border-neutral-800 rounded-xl font-bold text-xl space-x-6 px-4 py-1">
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <SignInButton text="Sign In" />
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white dark:bg-zinc-950/95 backdrop-blur-lg shadow-lg border-t border-neutral-200 dark:border-zinc-800">
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
                  <SignInButton text="Sign In" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
