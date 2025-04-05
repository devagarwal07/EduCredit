"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function InvestorAgreementPage() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  const handleAccept = () => {
    // TODO: Add logic to record acceptance in database
    router.push("/investor/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-background/50 p-8 rounded-lg border border-border">
        <h1 className="text-3xl font-bold mb-6">Investor Agreement</h1>
        
        <div className="prose prose-invert max-w-none mb-8">
          <p className="mb-4">
            Before proceeding with investments, you must review and accept:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Income Share Agreement (ISA) Terms</li>
            <li className="mb-2">Investor Rights and Responsibilities</li>
            <li>Risk Disclosure Statement</li>
          </ul>

          <div className="bg-background/80 p-4 rounded border border-border/50 mb-6">
            <h3 className="font-semibold mb-2">Key Terms:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Minimum investment amount: $500</li>
              <li>Investment term: 5 years</li>
              <li>Expected return range: 8-12% annually</li>
              <li>Early withdrawal penalties may apply</li>
            </ul>
          </div>

          <div className="flex items-center mb-8">
            <input
              type="checkbox"
              id="accept-terms"
              className="mr-3 h-5 w-5"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <label htmlFor="accept-terms" className="text-sm">
              I have read and agree to the ISA Agreement and all related terms
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push("/isa-agreement")}
          >
            Review Full Agreement
          </Button>
          <Button
            disabled={!accepted}
            onClick={handleAccept}
          >
            Accept and Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
