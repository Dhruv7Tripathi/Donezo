"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Footer from "@/components/landingpages/footer"
import Navbar from "./navbar"
import Image from "next/image"
import { faqItems } from "@/constants/index"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}
export default function LP() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col justify-between dark:bg-black text-black dark:text-white relative">
      <Navbar />
      <div className="overflow-hidden bg-white dark:bg-transparent">
        <motion.section
          className="relative max-w-5xl min-h-screen mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black dark:text-white"
            variants={fadeIn}
          >
            Organize Your Life with <span className="text-green-500">Donezo</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={fadeIn}
          >
            A powerful yet simple to-do application designed to keep you organized and productive. Experience the modern
            UI and intuitive design tailored for efficiency.
          </motion.p>

          <motion.div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center" variants={fadeIn}>
            <Button
              asChild
              size="lg"
              className="px-8 py-3 bg-green-700 hover:bg-green-700 text-white rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              <Link href="/createTodo" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          </motion.div>


        </motion.section>

        {/* <div className="mx-auto min-h-screen max-w-7xl [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
          <div className="[perspective:1200px] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
            <div className="rotate-x-[20deg]">
              <div className="lg:h-[44rem] relative skew-x-[.36rad]">
                <Image
                  className="rounded-2xl z-[2] relative border border-gray-200 dark:border-gray-800 shadow-2xl"
                  src="/dash.png"
                  alt="Dashboard Preview"
                  width={2880}
                  height={2074}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>



      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
              Loved by thousands of users
            </h2>

          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                name: "Dhruv Tripathi",
                role: "Software developer",
                content:
                  "Donezo has completely transformed how I manage my daily tasks. The interface is beautiful and the features are exactly what I needed.",
                avatar: "DT",
              },
              {
                name: "Yuvraj Singh",
                role: "Freelancer",
                content:
                  "I've tried dozens of to-do apps, but Donezo is the only one that stuck. It's simple yet powerful, and the sync works flawlessly.",
                avatar: "YS",
              },
              {
                name: "Nitin Prajapti",
                role: "Team Lead",
                content:
                  "Our team's productivity has increased significantly since switching to Donezo. The collaboration features are game-changing.",
                avatar: "NP",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full border-gray-200 dark:border-gray-800">
                  <CardContent className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">&quot;{testimonial.content}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-black dark:text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white bg-gradient-to-r from-black via-gray-900 to-black dark:bg-black">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Everything you need to know about Donezo</p>
          </motion.div>

          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn}>
            <Accordion type="single" collapsible className="divide-y divide-gray-200 dark:divide-gray-800">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="text-left hover:no-underline py-6 text-black dark:text-white hover:text-black dark:hover:text-white font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-6">{item.answer}</AccordionContent>
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
