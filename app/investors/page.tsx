"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  DollarSign,
  Building,
  TrendingUp,
  Users,
  ChevronRight,
  Globe,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  Briefcase,
  BadgeCheck,
  BarChart,
} from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

// Mock data fetch
const fetchInvestors = async () => {
  try {
    return [
      {
        id: "investor-001",
        name: "Future Talents Fund",
        type: "Venture Capital",
        description:
          "Investing in exceptional individuals with high growth potential in technology fields.",
        focusAreas: [
          "Computer Science",
          "Data Science",
          "AI & Machine Learning",
        ],
        investmentRange: { min: 15000, max: 75000 },
        averageROI: 22.5,
        successRate: 87,
        totalInvested: 8500000,
        activeInvestments: 42,
        location: "San Francisco, CA",
        foundedYear: 2018,
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop",
        website: "https://futuretalents.example.com",
        achievements: [
          "Funded 250+ students in the past 5 years",
          "92% employment rate for portfolio students",
          "Average salary increase of 65% post-education",
        ],
        fundingModels: [
          "Income Share Agreements",
          "Milestone-Based Funding",
          "Partial Scholarships",
        ],
        featuredTestimonial: {
          quote:
            "Future Talents Fund believed in me when traditional lenders wouldn't. Their ISA program was the launching pad for my career in AI.",
          author: "David Rodriguez",
          role: "AI Engineer",
          company: "TechInnovate",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
      },
      {
        id: "investor-002",
        name: "EduVentures",
        type: "Impact Investor",
        description:
          "Social impact fund focusing on democratizing access to quality education for underrepresented communities.",
        focusAreas: [
          "Software Engineering",
          "Healthcare Tech",
          "Green Technology",
        ],
        investmentRange: { min: 10000, max: 50000 },
        averageROI: 18.5,
        successRate: 82,
        totalInvested: 6200000,
        activeInvestments: 35,
        location: "Boston, MA",
        foundedYear: 2016,
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop",
        website: "https://eduventures.example.com",
        achievements: [
          "Supported 180+ first-generation college students",
          "40% of portfolio students from underrepresented backgrounds",
          "Partner with 25+ top educational institutions",
        ],
        fundingModels: [
          "Income Share Agreements",
          "Fixed Term Loans",
          "Merit Scholarships",
        ],
        featuredTestimonial: {
          quote:
            "As a first-generation student, EduVentures not only provided financial support but also mentorship that was invaluable to my career journey.",
          author: "Maya Johnson",
          role: "Software Engineer",
          company: "TechSolutions Inc.",
          avatar:
            "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=crop",
        },
      },
      {
        id: "investor-003",
        name: "TechTalent Capital",
        type: "Specialized Fund",
        description:
          "Focused exclusively on high-potential tech talent with a strong emphasis on practical skills and portfolio quality.",
        focusAreas: [
          "Web Development",
          "Mobile Development",
          "DevOps",
          "Cloud Computing",
        ],
        investmentRange: { min: 20000, max: 100000 },
        averageROI: 25.0,
        successRate: 90,
        totalInvested: 12000000,
        activeInvestments: 65,
        location: "Austin, TX",
        foundedYear: 2020,
        logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop",
        website: "https://techtalent.example.com",
        achievements: [
          "Portfolio students at 45+ leading tech companies",
          "Average time to employment: 3.5 months",
          "85% of students exceed income projections",
        ],
        fundingModels: [
          "Income Share Agreements",
          "Results-Based Funding",
          "Apprenticeship Programs",
        ],
        featuredTestimonial: {
          quote:
            "TechTalent's results-based funding model aligned our incentives perfectly. They invested in my success, and the rigorous milestones pushed me to excel.",
          author: "James Chen",
          role: "Full Stack Developer",
          company: "InnovateTech",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
      },
      {
        id: "investor-004",
        name: "NextGen Education Fund",
        type: "Education-Focused Fund",
        description:
          "Supporting ambitious students transitioning into high-growth fields with flexible funding options.",
        focusAreas: [
          "Data Analysis",
          "Digital Marketing",
          "UX/UI Design",
          "Project Management",
        ],
        investmentRange: { min: 8000, max: 45000 },
        averageROI: 19.8,
        successRate: 85,
        totalInvested: 5800000,
        activeInvestments: 38,
        location: "Chicago, IL",
        foundedYear: 2019,
        logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop",
        website: "https://nextgenedu.example.com",
        achievements: [
          "Specialized in career-changers (65% of portfolio)",
          "93% program completion rate",
          "Partnerships with 15+ industry-leading bootcamps",
        ],
        fundingModels: [
          "Flexible Payment Plans",
          "Income Share Agreements",
          "Stipend Programs",
        ],
        featuredTestimonial: {
          quote:
            "NextGen made my career transition from marketing to UX design possible. Their flexible funding and industry connections were game-changers.",
          author: "Sarah Williams",
          role: "UX Designer",
          company: "DesignWorks",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
      },
    ];
  } catch (error) {
    console.error("Error fetching investors:", error);
    return [];
  }
};

export default function InvestorsPage() {
  const [investors, setInvestors] = useState<any[]>([]);
  const [filteredInvestors, setFilteredInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusFilter, setFocusFilter] = useState<string | null>(null);
  const [fundingModelFilter, setFundingModelFilter] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      const investorsData = await fetchInvestors();

      setInvestors(investorsData);
      setFilteredInvestors(investorsData);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter investors based on search query and filters
    if (investors.length > 0) {
      let filtered = [...investors];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (investor) =>
            investor.name.toLowerCase().includes(query) ||
            investor.description.toLowerCase().includes(query) ||
            investor.focusAreas.some((area: string) =>
              area.toLowerCase().includes(query)
            )
        );
      }

      if (focusFilter) {
        filtered = filtered.filter((investor) =>
          investor.focusAreas.some(
            (area: string) => area.toLowerCase() === focusFilter.toLowerCase()
          )
        );
      }

      if (fundingModelFilter) {
        filtered = filtered.filter((investor) =>
          investor.fundingModels.some(
            (model: string) =>
              model.toLowerCase() === fundingModelFilter.toLowerCase()
          )
        );
      }

      setFilteredInvestors(filtered);
    }
  }, [searchQuery, focusFilter, fundingModelFilter, investors]);

  // Get all unique focus areas and funding models from investors
  const allFocusAreas = [
    ...new Set(investors.flatMap((investor) => investor.focusAreas)),
  ].sort();
  const allFundingModels = [
    ...new Set(investors.flatMap((investor) => investor.fundingModels)),
  ].sort();

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Education Investors</h1>
          <p className="text-muted-foreground mt-2">
            Connect with investors who fund educational opportunities and career
            growth
          </p>
        </div>
        <Link href="/funding/apply">
          <Button>
            Apply for Funding
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Search and filter section */}
      <div className="bg-background border border-border rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by name, description, or focus area..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm whitespace-nowrap">Filter by:</span>
            <select
              value={focusFilter || ""}
              onChange={(e) => setFocusFilter(e.target.value || null)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="">All Focus Areas</option>
              {allFocusAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <select
              value={fundingModelFilter || ""}
              onChange={(e) => setFundingModelFilter(e.target.value || null)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="">All Funding Models</option>
              {allFundingModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(searchQuery || focusFilter || fundingModelFilter) && (
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Showing {filteredInvestors.length} of {investors.length} investors
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground"
              onClick={() => {
                setSearchQuery("");
                setFocusFilter(null);
                setFundingModelFilter(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Investors list */}
      <div className="space-y-8">
        {filteredInvestors.length === 0 ? (
          <div className="bg-muted rounded-xl p-12 text-center">
            <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No investors found</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn't find any investors matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setFocusFilter(null);
                setFundingModelFilter(null);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          filteredInvestors.map((investor) => (
            <motion.div
              key={investor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background border border-border rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={investor.logo}
                        alt={investor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <h2 className="text-2xl font-bold">{investor.name}</h2>
                      <Badge className="md:ml-2 w-fit">{investor.type}</Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {investor.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {investor.focusAreas.map(
                        (area: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {area}
                          </Badge>
                        )
                      )}
                    </div>

                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm mb-6">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{investor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Founded {investor.foundedYear}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={investor.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">
                          ${formatCurrency(investor.totalInvested / 1000000)}M
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total Invested
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">
                          {investor.activeInvestments}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Active Investments
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">
                          {investor.averageROI}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Average ROI
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">
                          {investor.successRate}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Success Rate
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium mb-2">Funding Models</h3>
                        <ul className="space-y-1">
                          {investor.fundingModels.map(
                            (model: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <span>{model}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium mb-2">Investment Range</h3>
                        <div className="flex items-baseline gap-1 text-xl">
                          <DollarSign className="h-5 w-5 text-muted-foreground" />
                          <span className="font-semibold">
                            {formatCurrency(investor.investmentRange.min)}
                          </span>
                          <span className="text-muted-foreground">-</span>
                          <span className="font-semibold">
                            {formatCurrency(investor.investmentRange.max)}
                          </span>
                        </div>
                      </div>

                      <div className="self-end">
                        <Link href={`/investors/${investor.id}`}>
                          <Button>
                            View Details
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {investor.featuredTestimonial && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={investor.featuredTestimonial.avatar}
                            alt={investor.featuredTestimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 text-warning-500 fill-warning-500"
                            />
                          ))}
                        </div>

                        <p className="text-muted-foreground italic mb-2">
                          "{investor.featuredTestimonial.quote}"
                        </p>

                        <div className="text-sm">
                          <span className="font-medium">
                            {investor.featuredTestimonial.author}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            • {investor.featuredTestimonial.role} at{" "}
                            {investor.featuredTestimonial.company}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Call to action */}
      <div className="mt-12 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Fund Your Education?
        </h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Connect with investors who believe in your potential and are ready to
          back your educational journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/funding/apply">
            <Button
              size="lg"
              className="bg-white text-primary-500 hover:bg-gray-100"
            >
              Apply for Funding
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/funding/calculator">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Calculate Your Options
              <BarChart className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
