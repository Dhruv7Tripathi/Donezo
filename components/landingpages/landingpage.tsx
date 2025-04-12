'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/landingpages/footer'
import Navbar from './navbar'
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
    <main className="min-h-screen flex flex-col justify-between bg-white dark:bg-black text-black dark:text-white relative">
      <Navbar />

      <motion.section
        className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 text-center"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-black dark:text-white bg-gradient"
          variants={fadeIn}
        >
          Organize Your Life with <span className="text-black dark:text-white">Donezo</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          variants={fadeIn}
        >
          A powerful yet simple to-do application designed to keep you organized and productive.
          Experience the modern UI and intuitive design tailored for efficiency.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-5 justify-center"
          variants={fadeIn}
        >
          <Button asChild size="lg" className="px-8 py-3 text-black hover:text-white bg-gray-600  dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <Link href="/createTodo" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105">
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