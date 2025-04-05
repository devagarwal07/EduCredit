"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 max-w-4xl px-4">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to EduCredit. These Terms of Service govern your use of our platform 
            and services. By accessing or using our services, you agree to be bound by these terms.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
          <p>
            You agree to use our services responsibly and in compliance with all applicable laws.
            You are responsible for maintaining the confidentiality of your account credentials.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p>
            All content on our platform is protected by copyright and other intellectual property laws.
            You may not reproduce, distribute, or create derivative works without permission.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p>
            EduCredit shall not be liable for any indirect, incidental, or consequential damages
            arising from your use of our services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. Continued use of our services constitutes
            acceptance of the modified terms.
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
