"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Smartphone, Zap, Users, Shield, Star } from "lucide-react"
import Footer from "@/components/landingpages/footer"
import Navbar from "./navbar"
import { faqItems } from "@/constants/index"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
}

export default function LP() {
  return (
    <main className="min-h-screen  flex flex-col justify-between dark:bg-black text-black dark:text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>


      <div className="overflow-hidden border-b  rounded-2xl border-neutral-800 bg-gradient-to-r from-black via-gray-900 to-black relative">
        <Navbar />
        <motion.section
          className="relative  max-w-6xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8  text-center flex flex-col justify-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >


          <motion.h1
            className="text-4xl max-w-8xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-tight"
            variants={fadeInUp}
          >
            Organize
            <br />
            Your
            Life with{" "}
            <span className="bg-gradient-to-r from-neutral-100 font-bold to-neutral-300 bg-clip-text text-transparent">Donezo</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-base  sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
            variants={fadeIn}
          >
            A powerful yet simple to-do application designed to keep you organized and productive. Experience the modern
            UI and intuitive design tailored for efficiency across all your devices.
          </motion.p>

          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto px-8 py-4 bg-neutral-700 hover:bg-neutral-800 text-white text-lg rounded-xl shadow-xl transition-all duration-300 transform hover:shadow-2xl"
            >
              <Link href="/createTodo" className="flex items-center justify-center gap-2 text-lg font-semibold">
                Get Started
              </Link>
            </Button>

            <Button
              asChild
              // variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-lg space-x-4 bg-background backdrop-blur-sm text-white font-bold  rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/signin">

                Sign In
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>


        </motion.section>
      </div>

      <section className="py-16 sm:py-20 lg:py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks efficiently across all your devices
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {[
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Optimized for mobile with offline sync across all devices",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Instant loading and real-time updates for seamless productivity",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share tasks and collaborate with your team in real-time",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "End-to-end encryption keeps your data safe and private",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full bg-white/5 backdrop-blur-sm border-gray-800 hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Loved by many users</h2>

          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {[
              {
                name: "Dhruv Tripathi",
                role: "Software Developer",
                content:
                  "Donezo has completely transformed how I manage my daily tasks. The interface is beautiful and the features are exactly what I needed. The mobile app is incredibly smooth!",
                avatar: "DT",
                rating: 5,
              },
              {
                name: "Yuvraj Singh",
                role: "Freelancer",
                content:
                  "I've tried dozens of to-do apps, but Donezo is the only one that stuck. It's simple yet powerful, and the sync works flawlessly across all my devices.",
                avatar: "YS",
                rating: 5,
              },
              {
                name: "Nitin Prajapati",
                role: "Team Lead",
                content:
                  "Our team's productivity has increased significantly since switching to Donezo. The collaboration features are game-changing and work perfectly on mobile.",
                avatar: "NP",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full bg-white/5 backdrop-blur-sm border-gray-800 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 min-h-screen sm:py-20 lg:py-2 bg-black ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-400">Everything you need to know about Donezo</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Accordion type="single" collapsible className="divide-y divide-gray-800">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="text-left hover:no-underline py-6 text-white hover:text-green-400 font-medium text-base sm:text-lg transition-colors duration-200">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-6 leading-relaxed">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>



      <Footer />
    </main>
  )
}
