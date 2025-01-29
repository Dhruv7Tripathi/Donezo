'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Rocket, Shield, Sparkles, Zap } from 'lucide-react'
import Footer from '@/components/footer'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.3
    }
  }
}

export default function lP() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="inline-block mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Your Tasks, Reimagined
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight"
              variants={fadeIn}
            >
              Organize Your Life with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Donezo
              </span>
            </motion.h1>

            <motion.p
              className="mt-8 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
              variants={fadeIn}
            >
              A powerful, yet simple todo application that helps you stay organized
              and boost your productivity with modern tools and intuitive design.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <Button asChild size="lg" className="text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Link href="/createTodo" className="px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-slate-700 text-white hover:bg-slate-800">
                <Link href="/signin" className="px-8">
                  Login
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Everything you need to stay organized
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Simple, intuitive, and powerful features to manage your tasks effectively
            </p>
          </motion.div>

          <motion.div
            className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                title: 'Lightning Fast',
                description: 'Instant updates and real-time synchronization across all your devices',
                icon: Zap,
                gradient: 'from-amber-500 to-orange-500'
              },
              {
                title: 'Smart Organization',
                description: 'Intelligent categorization and priority management for your tasks',
                icon: CheckCircle2,
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Enterprise Security',
                description: 'Your data is protected with industry-leading encryption standards',
                icon: Shield,
                gradient: 'from-blue-500 to-violet-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={fadeIn}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-full p-8 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-800/80 transition-colors">
                  <div className="space-y-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
          </div>
        </div>

        <motion.div
          className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700 p-8 sm:p-12 backdrop-blur-sm">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to get started?
                </h2>
                <p className="mt-4 text-lg text-slate-400">
                  Join thousands of users who are already organizing their lives with TodoNext.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <Button asChild size="lg" className="w-full lg:w-auto text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Link href="/createTodo" className="px-8">
                    Start Now
                    <Rocket className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}