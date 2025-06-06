'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/landingpages/footer';
import Navbar from './navbar';
import Image from 'next/image';
import { faqItems } from '@/constants/index'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function LP() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-white dark:bg-black text-black dark:text-white relative">
      <Navbar />
      <div className='overflow-hidden bg-white dark:bg-transparent'>

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
            Organize Your Life with <span className="text-emerald-500">Donezo</span>
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
            <Button asChild size="lg" className="px-8 py-3 text-black hover:text-white bg-gray-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl shadow-lg transition-transform transform hover:scale-105">
              <Link href="/createTodo" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105">
              <Link href="/signin">Login</Link>
            </Button>
          </motion.div>
        </motion.section>

        <div className="mx-auto min-h-screen  max-w-7xl [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
          <div className="[perspective:1200px] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
            <div className="rotate-x-[20deg]">
              <div className="lg:h-[44rem] relative skew-x-[.36rad]">
                <Image
                  className="rounded-2xl z-[2] relative border block dark:hidden"
                  src="/dash.png"
                  alt="Dashboard Preview - Light Mode"
                  width={2880}
                  height={2074}
                />
                <Image
                  className="rounded-2xl z-[2] relative border hidden dark:block"
                  src="/dash.png"
                  alt="Dashboard Preview - Dark Mode"
                  width={2880}
                  height={2074}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="w-full py-16 sm:py-20 bg-black/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion
            type="single"
            collapsible
            className="max-w-3xl mx-auto divide-y  divide-gray-700"
          >
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left dark:hover:text-white  sm:text-lg font-medium py-4 text-white">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-gray-200 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  );
}
