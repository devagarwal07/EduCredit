"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 max-w-4xl px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly, including name, email, and payment details when you use our services.
            We also automatically collect usage data through cookies and similar technologies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
          <p>
            Your information is used to provide and improve our services, process transactions,
            communicate with you, and for security and fraud prevention.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share it with service providers
            who assist us in operations, and when required by law.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
          <p>
            You may access, correct, or delete your personal information. Contact us to exercise these rights.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Changes to This Policy</h2>
          <p>
            We may update this policy periodically. Continued use of our services constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <div className="mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
