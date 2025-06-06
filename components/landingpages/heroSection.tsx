import * as React from "react"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Navbar from "./navbar"
import Footer from "./footer"
import Image from 'next/image'
export const HeroSection = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
          <div className="w-[35rem] h-[80rem] -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-87.5 absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section className="overflow-hidden bg-white dark:bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">Modern Software testing reimagined</h1>
              <p className="mx-auto my-8 max-w-2xl text-xl">Officiis laudantium excepturi ducimus rerum dignissimos, and tempora nam vitae, excepturi ducimus iste provident dolores.</p>

              <Button
                asChild
                size="lg">
                <Link href="#">
                  <span className="btn-label">Start Building</span>
                </Link>
              </Button>
            </div>
          </div>

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
        </section>

      </main>
      <Footer />
    </div>
  )
}

