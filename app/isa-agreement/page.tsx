"use client";

import Link from "next/link";

export default function ISAAgreementPage() {
  return (
    <div className="container mx-auto py-12 max-w-4xl px-4">
      <h1 className="text-4xl font-bold mb-8">Income Share Agreement (ISA)</h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement Overview</h2>
          <p>
            This Income Share Agreement (ISA) is a legally binding contract between
            the Investor and the Student, outlining the terms of the investment
            and repayment structure.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Investment Terms</h2>
          <p>
            The Investor agrees to fund the Student's education in exchange
            for a percentage of the Student's future income for a specified
            period.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Repayment Terms</h2>
          <p>
            The Student agrees to repay a percentage of their income, with
            minimum income thresholds and maximum repayment caps.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Investor Rights</h2>
          <p>
            Investors have the right to receive payments according to the agreed
            terms and access to verified repayment data.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Termination Clause</h2>
          <p>
            Conditions under which the agreement may be terminated, including
            breach of contract or mutual agreement.
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
