'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Menu } from 'lucide-react'
import Footer from '@/components/footer'
import { ModeToggle } from '@/components/darkmode'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function LP() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-black text-white relative">
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-white">Donezo</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/createTodo" className="text-gray-300 hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/calender" className="text-gray-300 hover:text-white transition">
            Calender
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      <motion.section
        className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 text-center"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-400 dark:from-emerald-400 dark:to-green-200"
          variants={fadeIn}
        >
          Organize Your Life with <span className="text-white">Donezo</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          variants={fadeIn}
        >
          A powerful yet simple to-do application designed to keep you organized and productive.
          Experience the modern UI and intuitive design tailored for efficiency.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-5 justify-center"
          variants={fadeIn}
        >
          <Button asChild size="lg" className="px-8 py-3 text-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <Link href="/createTodo" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg border-gray-600 text-white hover:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <Link href="/signin">
              Login
            </Link>
          </Button>
        </motion.div>
      </motion.section>

      <Footer />
    </main>
  )
}