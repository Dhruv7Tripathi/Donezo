import React from 'react'
import Link from 'next/link'

export default function CTA() {
  return (
    <div className="bg-black flex flex-col justify-center  items-center min-h-screen space-y-4 p-6 rounded-lg shadow-lg">
      <div className='text-center bg-neutral-950  justify-center w-full rounded-xl p-12 ml-12 mr-12  border border-dashed border-neutral-800 flex flex-col items-center  mx-auto'>

        <h2 className="bg-gradient-stop mx-auto max-w-6xl text-balance bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-900/30 dark:from-neutral-100 dark:via-neutral-100 via-50% dark:to-neutral-100/30 bg-clip-text py-2 px-2 text-6xl font-bold leading-[1.1] tracking-tighter text-transparent md:text-6xl lg:text-7xl">
          Ready to get started?
        </h2>
        <p className="mt-2 mb-8 max-w-xl text-center text-white text-base">
          Join thousands of users who&apos;ve already boosted their productivity with our tools.
          Whether you&apos;re managing tasks or planning big projects — we&apos;ve got you covered.
          Sign up now and take control of your time.
        </p>
        <Link
          href={"/createTodo"}
          className="group w-40 flex items-center justify-center gap-2 rounded-xl border border-neutral-600 bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-[inset_0px_0px_7px_1px_#535353] transition-all duration-300 hover:bg-neutral-800/50 md:text-[1rem]"
        >
          <TextGlitch text={"Get Started"} />
        </Link>
      </div>
    </div>
  )
}

function TextGlitch({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden">
      <span className="invisible">{text}</span>
      <span className="absolute left-0 top-0 font-semibold transition-transform duration-500 ease-in-out hover:duration-300 group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute left-0 top-0 translate-y-full font-semibold transition-transform duration-500 ease-in-out hover:duration-300 group-hover:translate-y-0">
        {text}
      </span>
    </div>
  )
}
