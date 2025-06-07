import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfService() {
  const lastUpdated = "December 7, 2024"

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Important Notice</h2>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Please read these Terms of Service carefully before using Donezo. By accessing or using our service, you
              agree to be bound by these terms.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing and using Donezo ("the Service"), you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms of Service ("Terms") govern your use of our website located at donezo.app (the "Service")
              operated by Donezo ("us", "we", or "our").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Donezo is a web-based task management and productivity application that allows users to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Create, organize, and manage tasks and to-do lists</li>
              <li>Set reminders and due dates</li>
              <li>Collaborate with team members on shared projects</li>
              <li>Track productivity and progress</li>
              <li>Sync data across multiple devices</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify, suspend, or discontinue the Service at any time with or without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Accounts</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To access certain features of the Service, you must register for an account. When you create an account,
              you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Upload or transmit malicious code or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use the Service for any commercial purpose without permission</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Spam or send unsolicited communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive
              property of Donezo and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You retain ownership of any content you create using the Service. By using the Service, you grant us a
              limited, non-exclusive license to use, store, and process your content solely for the purpose of providing
              the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
              Service, to understand our practices.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Payment Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Donezo offers both free and paid subscription plans. For paid plans:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Payments are processed securely through third-party payment processors</li>
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>Refunds are provided according to our refund policy</li>
              <li>We reserve the right to change pricing with 30 days notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Termination</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice, for
              conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You may terminate your account at any time by contacting us or using the account deletion feature in the
              Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Disclaimers and Limitations
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee
              that the Service will be uninterrupted, secure, or error-free.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by
              posting the new Terms on this page and updating the "Last updated" date.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without
              regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the
              exclusive jurisdiction of the courts in [Your Jurisdiction].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> legal@donezo.app
                <br />
                <strong>Address:</strong> [Your Business Address]
                <br />
                <strong>Website:</strong>{" "}
                <Link href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  donezo.app
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
