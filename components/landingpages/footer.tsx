"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Footer = () => {

  return (
    <div className="border-t  border-neutral-100 dark:border-white/[0.1] px-8 py-40 bg-white dark:bg-black">
      <div className="max-w-[87rem] mx-auto text-sm px-4 text-gray-400 flex sm:flex-row flex-col justify-between items-start ">
        <div>
          <div className="mb-4 flex">
            <Link href="/" className="flex items-center space-x-1">
              <Image src="/donezo.png" width={60} height={60} priority={false} alt="Logo" unoptimized={true} className="rounded-xl" />
              <span className="text-2xl font-extrabold text-black dark:text-white ">Donezo</span>
            </Link>
          </div>
          <div className="mt-2 text-white">
            Building in public at
            <a className="dark:text-emerald-500 pl-1 font-medium text-neutral-600" target="__blank" href="https://github.com/dhruv7tripathi">@dhruv7tripathi</a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
          <div className="flex justify-center space-y-4 flex-col mt-4">
            <Link href='/createTodo'>
              <p className="hover:text-foreground/80 text-white">Todo</p>
            </Link>
            <Link href='/calender'>
              <p className="hover:text-foreground/80 text-white">Calender</p>
            </Link>
            <Link href='/about'>
              <p className="hover:text-foreground/80 text-white">About</p>
            </Link>
          </div>
          <div className="flex justify-center space-y-4 flex-col mt-4">
            <Link href='https://x.com/DhruvTripathi77' target="_blank">
              <p className="hover:text-foreground/80 text-white">Twitter</p>
            </Link>
            <Link href='https://www.linkedin.com/in/dhruv-tripathi-9848792aa/' target='_blank'>
              <p className="hover:text-foreground/80 text-white">LindedIn</p>
            </Link>
          </div>
          {/* <div className="flex justify-center space-y-4 flex-col mt-4">
            <p className="hover:text-foreground/80 text-white"><a href='/termsofservice' target='_blank'>Terms of Service</a></p>
            <p className="hover:text-foreground/80 text-white"><a href='/privacypolicy' target='_blank'>Privacy Policy</a></p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Footer