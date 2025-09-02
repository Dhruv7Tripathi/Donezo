"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  const footerSections = {
    product: [
      { name: "Todo App", href: "/createTodo" },
      { name: "Calendar", href: "/calendar" },
      { name: "About Us", href: "/about" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Service", href: "/terms" }
    ],
  }

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://x.com/DhruvTripathi77",
      icon: <FaTwitter className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/dhruv-tripathi-9848792aa/",
      icon: <FaLinkedin className="w-5 h-5" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/dhruv7tripathi",
      icon: <FaGithub className="w-5 h-5" />,
    },
  ]

  return (
    <footer className="border-t bg-neutral-950 to-black border-gray-800 text-white">
      <div className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="mb-6">
                <Link href="/" className="flex items-center space-x-3">
                  <Image
                    src="/donezo.png"
                    width={48}
                    height={48}
                    alt="Donezo Logo"
                    unoptimized
                    className="rounded-xl"
                  />
                  <span className="text-2xl font-extrabold text-white">Donezo</span>
                </Link>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                The modern to-do application that helps you organize your life and boost productivity with beautiful
                design and powerful features.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Navigations
                  </h4>
                  <ul className="space-y-3">
                    {footerSections.product.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Rules
                  </h4>
                  <ul className="space-y-3">
                    {footerSections.legal.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Social
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label={social.name}
                      >
                        {social.icon}
                        <span className="sr-only">{social.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 text-center">
            <div className="flex items-center space-x-1 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by this guy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
