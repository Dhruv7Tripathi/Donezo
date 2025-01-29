"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-12 md:space-y-0">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center">
              <Image
                src="/l2.webp"
                alt="logo"
                className="h-12 w-12 mr-3 rounded-full border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200"
                height={12}
                width={12}
              />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  Donezo
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Building in public at{' '}
                  <a
                    href="https://twitter.com/dhruvtripathi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center"
                  >
                    @dhruvtripathi
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md text-center md:text-left">
              Streamline your tasks and boost productivity with our intuitive todo management platform.
            </p>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/createTodo"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    Create Task
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contactus"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Connect</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dhruv-tripathi-9848792aa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center md:text-left">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Donezo. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;