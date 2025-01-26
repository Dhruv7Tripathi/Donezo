'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, BarChart3, Shield } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight"
              variants={fadeIn}
            >
              Organize Your Life with{' '}
              <span className="text-blue-600">TodoNext</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              A powerful, yet simple todo application that helps you stay organized
              and boost your productivity.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <Button asChild size="lg" className="text-base">
                <Link href="/todos">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/auth/login">
                  Login
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Everything you need to stay organized
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Simple, intuitive, and powerful features to manage your tasks effectively
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                title: 'Easy to Use',
                description: 'Simple and intuitive interface that helps you focus on what matters most',
                icon: Calendar
              },
              {
                title: 'Real-time Sync',
                description: 'Your todos are instantly synced across all your devices',
                icon: BarChart3
              },
              {
                title: 'Secure',
                description: 'Your data is protected with enterprise-grade security',
                icon: Shield
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-full p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <motion.div
          className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Start organizing your tasks today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/todos">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}