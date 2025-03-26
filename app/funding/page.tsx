"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  LineChart,
  Users,
  DollarSign,
  ArrowRight,
  Search,
  Filter,
  Star,
  Clock,
  Calendar,
  Building,
  BadgeCheck,
  TrendingUp,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
// Mock data fetch - would be replaced with real API calls
const fetchUserData = async () => {
  try {
    const response = await fetch("/data/students.json");
    const students = await response.json();
    return students[0]; // Return the first student for demo purposes
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const fetchInvestors = async () => {
  try {
    const response = await fetch("/data/investors.json");
    return await response.json();
  } catch (error) {
    console.error("Error fetching investors:", error);
    return [];
  }
};

export default function FundingPage() {
  const [userData, setUserData] = useState<any>(null);
  const [investors, setInvestors] = useState<any[]>([]);
  const [filteredInvestors, setFilteredInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedInvestor, setExpandedInvestor] = useState<string | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const user = await fetchUserData();
      const investorsData = await fetchInvestors();

      setUserData(user);
      setInvestors(investorsData);
      setFilteredInvestors(investorsData);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter investors based on search, field, and type
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

      if (selectedField) {
        filtered = filtered.filter(
          (investor) =>
            investor.focusAreas.includes(selectedField) ||
            investor.requirements.preferredFields.includes(selectedField)
        );
      }

      if (selectedType) {
        filtered = filtered.filter((investor) =>
          investor.fundingModels.some(
            (model: any) => model.type === selectedType
          )
        );
      }

      setFilteredInvestors(filtered);
    }
  }, [searchQuery, selectedField, selectedType, investors]);

  // Get all unique fields and funding types from investors
  const allFields = [
    ...new Set(
      investors.flatMap((investor: any) => [
        ...investor.focusAreas,
        ...investor.requirements.preferredFields,
      ])
    ),
  ].sort();

  const allFundingTypes = [
    ...new Set(
      investors.flatMap((investor: any) =>
        investor.fundingModels.map((model: any) => model.type)
      )
    ),
  ].sort();

  // Statistics animation with GSAP
  useEffect(() => {
    if (!loading && statsRef.current && userData) {
      const statValues = statsRef.current.querySelectorAll(".stat-value");

      gsap.fromTo(
        statValues,
        { textContent: 0 },
        {
          textContent: (i: number, target: Element) => {
            return target.getAttribute("data-value");
          },
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          stagger: 0.2,
          onUpdate: function () {
            // Format numbers with commas
            statValues.forEach((stat) => {
              const value = parseInt(stat.textContent || "0");
              const format = stat.getAttribute("data-format");
              if (format === "currency") {
                // @ts-ignore - textContent exists on HTMLElement
                stat.textContent = "$" + value.toLocaleString();
              } else {
                // @ts-ignore - textContent exists on HTMLElement
                stat.textContent = value.toLocaleString();
              }
            });
          },
        }
      );
    }
  }, [loading, userData]);

  // Toggle expanded investor details
  const toggleInvestorExpanded = (id: string) => {
    if (expandedInvestor === id) {
      setExpandedInvestor(null);
    } else {
      setExpandedInvestor(id);
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading funding options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Funding Opportunities</h1>
          <p className="text-muted-foreground mt-2">
            Discover investors and funding options aligned with your skills and
            career goals
          </p>
        </div>
        <Link href="/funding/apply">
          <Button size="lg">
            Start Application
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Education Credit Score Card */}
      <div
        className="bg-background rounded-xl shadow-sm border border-border p-6 mb-8"
        ref={statsRef}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">
              Your Education Credit Score
            </h2>
            <p className="text-muted-foreground">
              Your score determines your eligibility for funding opportunities
              and interest rates
            </p>
          </div>

          <div className="relative w-48 h-48 mx-auto md:mx-0">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeOpacity="0.1"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#credit-score-gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="282.74"
                initial={{ strokeDashoffset: 282.74 }}
                animate={{
                  strokeDashoffset:
                    282.74 * (1 - userData.educationCreditScore / 900),
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-glow">
                <span
                  className="stat-value"
                  data-value={userData.educationCreditScore}
                >
                  0
                </span>
              </span>
              <span className="text-muted-foreground">out of 900</span>
            </div>

            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="credit-score-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" style={{ stopColor: "var(--secondary)" }} />
                  <stop offset="50%" style={{ stopColor: "var(--primary)" }} />
                  <stop offset="100%" style={{ stopColor: "var(--accent)" }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Funding Received</h3>
            </div>
            <div className="text-2xl font-bold mb-1">
              $
              <span
                className="stat-value"
                data-value={userData.funding.received}
                data-format="currency"
              >
                0
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Total funding secured to date
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="h-5 w-5 text-secondary" />
              <h3 className="font-semibold">Active Contracts</h3>
            </div>
            <div className="text-2xl font-bold mb-1">
              <span
                className="stat-value"
                data-value={userData.funding.activeContracts.length}
              >
                0
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Funding agreements in progress
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Pending Applications</h3>
            </div>
            <div className="text-2xl font-bold mb-1">
              <span
                className="stat-value"
                data-value={userData.funding.pendingApplications.length}
              >
                0
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Applications under review
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-warning" />
              <h3 className="font-semibold">Eligibility Rating</h3>
            </div>
            <div className="text-2xl font-bold mb-1">
              <span className="text-accent">High</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your score and skills
            </p>
          </div>
        </div>
      </div>

      {/* Investor Search & Filter Section */}
      <div className="bg-background rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search investors by name, description, or focus area..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm whitespace-nowrap">Filter by:</span>
            <select
              value={selectedField || ""}
              onChange={(e) => setSelectedField(e.target.value || null)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="">All Fields</option>
              {allFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>

            <select
              value={selectedType || ""}
              onChange={(e) => setSelectedType(e.target.value || null)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="">All Funding Types</option>
              {allFundingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredInvestors.length === 0 ? (
            <div className="bg-muted rounded-xl p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No investors found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any investors matching your search criteria.
                Try adjusting your filters.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedField(null);
                  setSelectedType(null);
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
                className="border border-border rounded-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border">
                        <Image
                          src={investor.logo}
                          alt={investor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {investor.name}
                        </h3>
                        <p className="text-muted-foreground">{investor.type}</p>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-0">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Total Invested
                        </span>
                        <span className="font-semibold">
                          ${formatCurrency(investor.totalInvested)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Average ROI
                        </span>
                        <span className="font-semibold">
                          {investor.averageROI}%
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Success Rate
                        </span>
                        <span className="font-semibold">
                          {investor.successRate}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <Link href={`/funding/investor/${investor.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleInvestorExpanded(investor.id)}
                        aria-expanded={expandedInvestor === investor.id}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            expandedInvestor === investor.id ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedInvestor === investor.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-medium mb-3">About</h4>
                              <p className="text-sm text-muted-foreground mb-4">
                                {investor.description}
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    Investment Range:
                                  </span>
                                  <span>
                                    $
                                    {formatCurrency(
                                      investor.investmentRange.min
                                    )}{" "}
                                    - $
                                    {formatCurrency(
                                      investor.investmentRange.max
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Focus Areas</h4>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {investor.focusAreas.map(
                                  (area: string, index: number) => (
                                    <Badge key={index} variant="outline">
                                      {area}
                                    </Badge>
                                  )
                                )}
                              </div>

                              <h4 className="font-medium mb-3">Requirements</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <LineChart className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    Min Credit Score:
                                  </span>
                                  <span className="font-medium">
                                    {
                                      investor.requirements
                                        .minimumEducationCreditScore
                                    }
                                  </span>
                                  {userData.educationCreditScore >=
                                  investor.requirements
                                    .minimumEducationCreditScore ? (
                                    <Check className="h-4 w-4 text-accent" />
                                  ) : (
                                    <X className="h-4 w-4 text-destructive" />
                                  )}
                                </div>

                                <div className="text-sm">
                                  <span className="text-muted-foreground">
                                    Preferred Fields:
                                  </span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {investor.requirements.preferredFields.map(
                                      (field: string, index: number) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {field}
                                        </Badge>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">
                                Funding Models
                              </h4>
                              <div className="space-y-3">
                                {investor.fundingModels.map(
                                  (model: any, index: number) => (
                                    <div
                                      key={index}
                                      className="bg-muted p-3 rounded-lg"
                                    >
                                      <div className="font-medium">
                                        {model.type}
                                      </div>
                                      <div className="text-sm mt-1">
                                        {model.type ===
                                          "Income Share Agreement" && (
                                          <div className="space-y-1">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Percentage Range:
                                              </span>
                                              <span>
                                                {
                                                  model.details
                                                    .percentageRange[0]
                                                }
                                                % -{" "}
                                                {
                                                  model.details
                                                    .percentageRange[1]
                                                }
                                                %
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Term Range:
                                              </span>
                                              <span>
                                                {model.details.termRange[0]} -{" "}
                                                {model.details.termRange[1]}{" "}
                                                months
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Cap Multiplier:
                                              </span>
                                              <span>
                                                {model.details.capMultiplier}x
                                              </span>
                                            </div>
                                          </div>
                                        )}

                                        {model.type === "Milestone-Based" && (
                                          <div className="space-y-1">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Milestone Types:
                                              </span>
                                              <span>
                                                {model.details.milestoneTypes.join(
                                                  ", "
                                                )}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Bonus Available:
                                              </span>
                                              <span>
                                                {model.details.bonusAvailable
                                                  ? "Yes"
                                                  : "No"}
                                              </span>
                                            </div>
                                          </div>
                                        )}

                                        {model.type === "Low-Interest Loan" && (
                                          <div className="space-y-1">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Interest Range:
                                              </span>
                                              <span>
                                                {model.details.interestRange[0]}
                                                % -{" "}
                                                {model.details.interestRange[1]}
                                                %
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Term Range:
                                              </span>
                                              <span>
                                                {model.details.termRange[0]} -{" "}
                                                {model.details.termRange[1]}{" "}
                                                months
                                              </span>
                                            </div>
                                          </div>
                                        )}

                                        {model.type === "Fixed Term Loan" && (
                                          <div className="space-y-1">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Interest Range:
                                              </span>
                                              <span>
                                                {model.details.interestRange[0]}
                                                % -{" "}
                                                {model.details.interestRange[1]}
                                                %
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Term Range:
                                              </span>
                                              <span>
                                                {model.details.termRange[0]} -{" "}
                                                {model.details.termRange[1]}{" "}
                                                months
                                              </span>
                                            </div>
                                          </div>
                                        )}

                                        {model.type ===
                                          "Partial Scholarship" && (
                                          <div className="space-y-1">
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Percentage Covered:
                                              </span>
                                              <span>
                                                {
                                                  model.details
                                                    .percentageCovered[0]
                                                }
                                                % -{" "}
                                                {
                                                  model.details
                                                    .percentageCovered[1]
                                                }
                                                %
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">
                                                Requirements:
                                              </span>
                                              <span>
                                                {model.details.requirementsCriteria.join(
                                                  ", "
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex justify-end">
                            <Link href={`/funding/apply/${investor.id}`}>
                              <Button>
                                Apply for Funding
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Educational Resources */}
      <div className="bg-background rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Educational Resources</h2>
          <Link href="/funding/resources">
            <Button variant="outline" size="sm">
              View All Resources
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted rounded-lg overflow-hidden transition-all hover:shadow-md card-hover">
            <div className="relative h-40">
              <Image
                src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80"
                alt="Education Funding Guide"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-semibold">Education Funding Guide</h3>
                <p className="text-xs opacity-90">
                  Comprehensive guide to funding options
                </p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                Learn about different funding models, their pros and cons, and
                how to choose the right option for your educational journey.
              </p>

              <Link href="/funding/resources/guide">
                <Button variant="outline" size="sm" className="w-full">
                  Read Guide
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-muted rounded-lg overflow-hidden transition-all hover:shadow-md card-hover">
            <div className="relative h-40">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80"
                alt="Application Workshop"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-semibold">Application Workshop</h3>
                <p className="text-xs opacity-90">
                  Interactive workshop on funding applications
                </p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                Join our interactive workshop to learn how to create compelling
                funding applications that stand out to investors.
              </p>

              <Link href="/funding/resources/workshop">
                <Button variant="outline" size="sm" className="w-full">
                  Register Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-muted rounded-lg overflow-hidden transition-all hover:shadow-md card-hover">
            <div className="relative h-40">
              <Image
                src="https://images.unsplash.com/photo-1553484771-047a44eee27c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80"
                alt="Credit Score Improvement"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-semibold">Boost Your Credit Score</h3>
                <p className="text-xs opacity-90">
                  Strategies to improve your Education Credit Score
                </p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                Learn effective strategies to boost your Education Credit Score
                and qualify for better funding opportunities.
              </p>

              <Link href="/funding/resources/credit-score">
                <Button variant="outline" size="sm" className="w-full">
                  Read Guide
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Active Contracts */}
      {userData.funding.activeContracts.length > 0 && (
        <div className="bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Active Contracts</h2>
            <Link href="/funding/contracts">
              <Button variant="outline" size="sm">
                Manage Contracts
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {userData.funding.activeContracts.map((contract: any) => (
              <div
                key={contract.id}
                className="border border-border rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div>
                      <div className="text-xl font-semibold mb-1">
                        Future Talents Fund
                      </div>
                      <div className="text-muted-foreground">
                        Contract started{" "}
                        {new Date(contract.startDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-0">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Amount
                        </span>
                        <span className="font-semibold">
                          ${formatCurrency(contract.amount)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Contract Type
                        </span>
                        <span className="font-semibold capitalize">
                          {contract.termsType}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Term
                        </span>
                        <span className="font-semibold">
                          {contract.termDetails.months} months
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <Link href={`/funding/contracts/${contract.id}`}>
                        <Button size="sm">
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-4">Milestones</h3>
                    <div className="space-y-4">
                      {contract.milestones.map(
                        (milestone: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-3 rounded-lg bg-muted"
                          >
                            <div
                              className={`p-2 rounded-full ${
                                milestone.completed
                                  ? "bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400"
                                  : "bg-muted-foreground/10 text-muted-foreground"
                              }`}
                            >
                              {milestone.completed ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <Clock className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">
                                {milestone.description}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Due:{" "}
                                {new Date(
                                  milestone.dueDate
                                ).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">
                                ${formatCurrency(milestone.amount)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Milestone Value
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
