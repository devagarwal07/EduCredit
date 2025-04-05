"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface PortfolioItem {
  category: string;
  percentage: number;
}

interface HistoricalReturn {
  year: string;
  return: string;
}

interface Document {
  title: string;
  generated: string;
  url: string;
}

interface Investor {
  id: string;
  name: string;
  bio: string;
  investmentFocus: string[];
  portfolio: { company: string; amount: number; date: string }[];
  contact: { email: string; phone: string; website: string };
  location?: string;
  founded?: string;
  fundingModels?: string[];
  investmentRange?: { min: number; max: number };
  keyStats?: { label: string; value: string }[];
  testimonial?: { text: string; author: string; role: string };
  portfolioComposition?: PortfolioItem[];
  financialMetrics?: Record<string, string>;
  nextDisbursement?: { amount: string; date: string };
  quarterlyDisbursements?: Record<string, string>;
  performanceInsights?: { outlook: string; text: string };
  documents?: Document[];
}

// Fallback data (for testing or error handling)
const fallbackInvestor: Investor = {
  id: "investor-001",
  name: "Future Talents Fund",
  bio: "Investing in exceptional individuals with high growth potential in technology fields.",
  investmentFocus: ["Computer Science", "Data Science", "AI & Machine Learning"],
  portfolio: [
    { company: "TechInnovate", amount: 50000, date: "2023-01-15" },
    { company: "DataCorp", amount: 30000, date: "2024-03-10" },
  ],
  contact: {
    email: "info@futuretalents.com",
    phone: "+1-555-123-4567",
    website: "https://futuretalents.com",
  },
  location: "San Francisco, CA",
  founded: "2018",
  fundingModels: ["Income Share Agreements", "Milestone-Based Funding", "Partial Scholarships"],
  investmentRange: { min: 15000, max: 75000 },
  keyStats: [
    { label: "Total Investments", value: "120" },
    { label: "Avg Return", value: "8.5%" },
    { label: "Portfolio Value", value: "$5.2M" },
    { label: "Success Rate", value: "92%" },
  ],
  testimonial: {
    text: "Future Talents Fund believed in me when traditional lenders wouldn't. Their ISA program was the launching pad for my career in AI.",
    author: "David Rodriguez",
    role: "AI Engineer at TechInnovate",
  },
  portfolioComposition: [
    { category: "Computer Science", percentage: 40 },
    { category: "Data Science", percentage: 30 },
    { category: "AI & Machine Learning", percentage: 30 },
  ],
  financialMetrics: {
    totalInvested: "$5,200,000",
    avgReturn: "8.5%",
    defaultRate: "2.1%",
    activeInvestments: "120",
  },
  nextDisbursement: { amount: "$1,250.00", date: "April 15, 2025" },
  quarterlyDisbursements: {
    "Q1 2025": "$875.42",
    "Q4 2024": "$812.16",
    "Q3 2024": "$798.53",
    "Q2 2024": "$765.29",
  },
  performanceInsights: {
    outlook: "Positive",
    text: "Based on current economic indicators and tech sector trends, we project continued strong performance through 2025.",
  },
  documents: [
    { title: "Q1 2025 Investor Statement", generated: "April 3, 2025", url: "#" },
    { title: "2024 Annual Report", generated: "January 15, 2025", url: "#" },
    { title: "Tax Documents (2024)", generated: "February 10, 2025", url: "#" },
    { title: "Investment Agreement", generated: "September 12, 2023", url: "#" },
    { title: "Portfolio Prospectus", generated: "March 15, 2025", url: "#" },
  ],
};

export default function InvestorDetailsPage() {
  const params = useParams();
const id = params && params.id 
  ? Array.isArray(params.id) ? params.id[0] : params.id 
  : null;
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!id) return;

    const fetchInvestorData = async () => {
      try {
        const response = await fetch(`/data/investors/${id}`);
        console.log(id);
        if (!response.ok) throw new Error("Failed to fetch investor data");
        const data = await response.json();
        setInvestor(data);
      } catch (error) {
        console.error("Error fetching investor data:", error);
        setInvestor(fallbackInvestor); // Fallback for demo
      } finally {
        setLoading(false);
      }
    };

    fetchInvestorData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="animate-pulse">Loading investor details...</div>
      </div>
    );
  }

  if (!investor) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        Investor not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/investors" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Investors
          </Link>
        </Button>

        {/* Page Header */}
        <div className="bg-black py-8 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">{investor.name}</h1>
            <p className="mt-2 text-lg text-gray-300">{investor.bio}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {investor.investmentFocus.map((focus, index) => (
                <span key={index} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                  {focus}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-6 mt-4 text-gray-400 text-sm">
              {investor.location && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{investor.location}</span>
                </div>
              )}
              {investor.founded && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Founded {investor.founded}</span>
                </div>
              )}
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a href={investor.contact.website} className="text-purple-400 hover:text-purple-300">
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Key Metrics Cards */}
          {investor.keyStats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {investor.keyStats.map((stat, index) => (
                <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-sm font-medium text-gray-400">{stat.label}</h3>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {investor.fundingModels && (
              <div>
                <h2 className="text-xl font-bold mb-4">Funding Models</h2>
                <div className="space-y-3">
                  {investor.fundingModels.map((model, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-3 text-white">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {investor.investmentRange && (
              <div>
                <h2 className="text-xl font-bold mb-4">Investment Range</h2>
                <div className="flex items-center">
                  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-2xl font-bold ml-2">
                    {investor.investmentRange.min.toLocaleString()} - {investor.investmentRange.max.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Testimonial */}
          {investor.testimonial && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img src="/api/placeholder/64/64" alt="Profile" className="h-12 w-12 rounded-full" />
                </div>
                <div className="ml-4">
                  <div className="flex text-yellow-400">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <p className="text-white italic mt-2">"{investor.testimonial.text}"</p>
                  <p className="text-gray-400 mt-2">
                    {investor.testimonial.author} • {investor.testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="border-b border-gray-800 mb-6">
            <nav className="flex space-x-8">
              {["overview", "portfolio", "performance", "documents"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 ${
                    activeTab === tab
                      ? "border-b-2 border-purple-600 text-purple-400"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          {activeTab === "overview" && (
  <div>
    <h2 className="text-xl font-bold text-white mb-4">Investment Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {investor.financialMetrics && (
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Financial Metrics</h3>
          <div className="space-y-2">
            {Object.entries(investor.financialMetrics).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </span>
                <span className="font-medium text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
                      
                  {investor.nextDisbursement && (
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Investment Summary</h3>
                      <p className="text-gray-300 mb-4">{investor.bio}</p>
                      <h4 className="font-medium text-white mt-4 mb-2">Next Disbursement</h4>
                      <div className="bg-gray-800 p-4 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Estimated Amount:</span>
                          <span className="font-medium text-white">{investor.nextDisbursement.amount}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-gray-400">Expected Date:</span>
                          <span className="font-medium text-white">{investor.nextDisbursement.date}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "portfolio" && investor.portfolioComposition && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Portfolio Composition</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Educational Category Distribution</h3>
                    <div className="space-y-4">
                      {investor.portfolioComposition.map((item) => (
                        <div key={item.category}>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-300">{item.category}</span>
                            <span className="font-medium text-white">{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Portfolio Details</h3>
                    <div className="space-y-2">
                      {investor.portfolio.map((item, index) => (
                        <div key={index} className="flex justify-between border-b border-gray-800 pb-2">
                          <span className="text-gray-300">{item.company}</span>
                          <span className="font-medium text-white">${item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Performance History</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Historical Returns</h3>
                    <table className="min-w-full">
                      <thead className="border-b border-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Year
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Return
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            vs. Market
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {investor.quarterlyDisbursements ?
                          Object.entries(investor.quarterlyDisbursements || {}).map(([year, ret]) => (
                            <tr key={year}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{year}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{ret}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-400">+2.4%</td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan={3} className="px-6 py-4 text-gray-400">No data available</td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                  {investor.quarterlyDisbursements && investor.performanceInsights && (
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Quarterly Disbursements</h3>
                      <div className="bg-gray-800 p-4 rounded-md mb-6">
                        {Object.entries(investor.quarterlyDisbursements).map(([quarter, amount]) => (
                          <div key={quarter} className="flex justify-between mb-2">
                            <span className="text-gray-400">{quarter}</span>
                            <span className="font-medium text-white">{amount}</span>
                          </div>
                        ))}
                      </div>
                      <h3 className="text-lg font-medium text-white mb-3">Performance Insights</h3>
                      <p className="text-gray-300 mb-4">{investor.performanceInsights.text}</p>
                      <div className="bg-gray-800 p-4 rounded-md border-l-4 border-purple-500">
                        <p className="text-purple-400 font-medium">Outlook: {investor.performanceInsights.outlook}</p>
                        <p className="text-gray-300 text-sm mt-1">{investor.performanceInsights.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "documents" && investor.documents && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Investment Documents</h2>
                <div className="space-y-4">
                  {investor.documents.map((doc, index) => (
                    <div key={index} className="border border-gray-800 rounded-md p-4 hover:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">{doc.title}</h3>
                          <p className="text-sm text-gray-400">Generated: {doc.generated}</p>
                        </div>
                        <a href={doc.url} className="text-purple-400 hover:text-purple-300 font-medium">
                          Download PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}