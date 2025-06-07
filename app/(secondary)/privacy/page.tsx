import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: {lastUpdated}</p>
        </div>

        {/* Privacy Commitment */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                Our Privacy Commitment
              </h2>
              <p className="text-emerald-800 dark:text-emerald-200 text-sm">
                At Donezo, we believe privacy is a fundamental right. This policy explains how we collect, use, and
                protect your personal information when you use our service.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <Eye className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">What We Collect</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Only what's necessary to provide our service</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <Lock className="w-6 h-6 text-green-500 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">How We Protect</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Industry-standard encryption and security</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <Users className="w-6 h-6 text-purple-500 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Your Control</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">You own your data and can delete it anytime</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong>Account Information:</strong> Email address, name, and password when you create an account
              </li>
              <li>
                <strong>Profile Information:</strong> Optional profile details like profile picture and preferences
              </li>
              <li>
                <strong>Content:</strong> Tasks, notes, projects, and other content you create in the Service
              </li>
              <li>
                <strong>Communication:</strong> Messages you send to us for support or feedback
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
              Information We Collect Automatically
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong>Usage Data:</strong> How you interact with our Service, features used, and time spent
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, operating system, and device identifiers
              </li>
              <li>
                <strong>Log Data:</strong> IP address, access times, and pages viewed
              </li>
              <li>
                <strong>Cookies:</strong> Small data files stored on your device for functionality and analytics
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and security alerts</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
              <li>Personalize and improve your experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong>With Your Consent:</strong> When you explicitly agree to share information
              </li>
              <li>
                <strong>Service Providers:</strong> With trusted third parties who assist in operating our Service
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
              </li>
              <li>
                <strong>Team Collaboration:</strong> With team members when you use collaboration features
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal
              information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Secure data centers and infrastructure</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute
              security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Provide personalized content and features</li>
              <li>Analyze how our Service is used</li>
              <li>Improve our Service performance</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              You can control cookies through your browser settings, but disabling them may affect Service
              functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong>Access:</strong> Request a copy of your personal information
              </li>
              <li>
                <strong>Correction:</strong> Update or correct inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information
              </li>
              <li>
                <strong>Portability:</strong> Export your data in a machine-readable format
              </li>
              <li>
                <strong>Restriction:</strong> Limit how we process your information
              </li>
              <li>
                <strong>Objection:</strong> Object to certain types of processing
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Data Retention</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We retain your personal information for as long as necessary to provide our Service and fulfill the
              purposes outlined in this policy. Specifically:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Account information is retained until you delete your account</li>
              <li>Content is retained until you delete it or your account</li>
              <li>Usage data is typically retained for up to 2 years</li>
              <li>Legal and safety data may be retained longer as required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. International Data Transfers
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your information during such transfers, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Standard contractual clauses approved by regulatory authorities</li>
              <li>Adequacy decisions by relevant data protection authorities</li>
              <li>Other legally recognized transfer mechanisms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Posting the new Privacy Policy on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending you an email notification for material changes</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Your continued use of the Service after any changes constitutes acceptance of the new Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">General Inquiries</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Email:</strong> privacy@donezo.app
                    <br />
                    <strong>Response Time:</strong> Within 48 hours
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Data Protection Officer</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Email:</strong> dpo@donezo.app
                    <br />
                    <strong>For:</strong> GDPR and data rights requests
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Mailing Address:</strong>
                  <br />
                  Donezo Privacy Team
                  <br />
                  [Your Business Address]
                  <br />
                  [City, State, ZIP Code]
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
