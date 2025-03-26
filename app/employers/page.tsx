"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Building,
  Briefcase,
  MapPin,
  Globe,
  Users,
  ArrowRight,
  Calendar,
  GraduationCap,
  CheckCircle2,
  BadgeCheck,
  Award,
  ChevronRight,
  User,
  Layers,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

// Mock data fetch
const fetchEmployers = async () => {
  try {
    return [
      {
        id: "employer-001",
        name: "TechInnovate",
        industry: "Technology",
        description:
          "Leading AI technology company developing cutting-edge solutions for enterprises. We're constantly looking for exceptional talent to join our diverse and dynamic team.",
        logo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=150&h=150&fit=crop",
        location: "San Francisco, CA",
        founded: 2018,
        size: "100-200 employees",
        website: "https://techinnovate.example.com",
        openPositions: 12,
        hiredFromPlatform: 8,
        sponsoredPrograms: 3,
        verifiedSkills: [
          "Machine Learning",
          "Python",
          "TensorFlow",
          "Data Analysis",
          "Software Engineering",
        ],
        programTypes: [
          "Internships",
          "Sponsored Education",
          "Skill-based Hiring",
        ],
        hiringProcess: [
          "Skills Verification Assessment",
          "Portfolio Review",
          "Technical Interview",
          "Team Fit Interview",
        ],
        successStories: [
          {
            name: "Sarah Johnson",
            role: "Machine Learning Engineer",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            quote:
              "TechInnovate recognized my verified skills despite not having a traditional CS background. Their focus on demonstrated abilities over credentials gave me an opportunity I wouldn't have had elsewhere.",
          },
        ],
        featuredProgram: {
          title: "AI Academy Sponsorship",
          description:
            "A 6-month intensive program where we sponsor promising talent to develop advanced AI skills while working on real projects.",
          benefits: [
            "Full tuition coverage",
            "Monthly stipend",
            "1:1 mentorship",
            "Job opportunity upon completion",
          ],
          nextCohort: "2025-06-01T00:00:00Z",
          applicationDeadline: "2025-04-15T23:59:59Z",
        },
      },
      {
        id: "employer-002",
        name: "FinTech Solutions",
        industry: "Finance",
        description:
          "Innovative financial technology company reinventing how people and businesses manage money. We combine the stability of finance with the innovation of technology.",
        logo: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=150&h=150&fit=crop",
        location: "New York, NY",
        founded: 2015,
        size: "500-1000 employees",
        website: "https://fintechsolutions.example.com",
        openPositions: 18,
        hiredFromPlatform: 15,
        sponsoredPrograms: 5,
        verifiedSkills: [
          "Financial Analysis",
          "Data Science",
          "Software Engineering",
          "Python",
          "SQL",
          "Risk Management",
        ],
        programTypes: [
          "Graduate Development",
          "Education Reimbursement",
          "Apprenticeships",
        ],
        hiringProcess: [
          "Skills Assessment",
          "Case Study",
          "Technical Interview",
          "Cultural Fit Interview",
          "Final Panel",
        ],
        successStories: [
          {
            name: "James Chen",
            role: "Data Engineer",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            quote:
              "FinTech Solutions' Education Reimbursement program allowed me to complete my data engineering certification while working. The company's investment in my skills led to two promotions in just 18 months.",
          },
        ],
        featuredProgram: {
          title: "FinTech Academy",
          description:
            "A 12-month rotational program for graduates, combining structured learning with hands-on experience across our business units.",
          benefits: [
            "Competitive salary",
            "Education budget",
            "Rotation across departments",
            "Guaranteed placement",
          ],
          nextCohort: "2025-09-01T00:00:00Z",
          applicationDeadline: "2025-05-30T23:59:59Z",
        },
      },
      {
        id: "employer-003",
        name: "HealthTech Innovations",
        industry: "Healthcare Technology",
        description:
          "Pioneering healthtech company developing solutions to improve patient care and healthcare delivery. We're at the intersection of medicine, technology, and data science.",
        logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=150&h=150&fit=crop",
        location: "Boston, MA",
        founded: 2017,
        size: "50-100 employees",
        website: "https://healthtechinnovations.example.com",
        openPositions: 8,
        hiredFromPlatform: 6,
        sponsoredPrograms: 2,
        verifiedSkills: [
          "Healthcare Data Analysis",
          "Machine Learning",
          "Software Development",
          "HIPAA Compliance",
          "Electronic Health Records",
        ],
        programTypes: [
          "Specialized Training",
          "Tuition Support",
          "Research Partnerships",
        ],
        hiringProcess: [
          "Skills Verification",
          "Technical Assessment",
          "Domain Knowledge Interview",
          "Team Interview",
        ],
        successStories: [
          {
            name: "Emily Rodriguez",
            role: "Clinical Data Scientist",
            avatar:
              "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
            quote:
              "HealthTech Innovations' specialized training program provided me with both the technical and clinical knowledge I needed to bridge data science with healthcare applications.",
          },
        ],
        featuredProgram: {
          title: "Healthcare Analytics Fellowship",
          description:
            "A specialized 9-month program training data scientists to address unique healthcare challenges while working alongside clinical experts.",
          benefits: [
            "Certification",
            "Cutting-edge project work",
            "Clinical exposure",
            "Published research opportunity",
          ],
          nextCohort: "2025-07-15T00:00:00Z",
          applicationDeadline: "2025-05-01T23:59:59Z",
        },
      },
      {
        id: "employer-004",
        name: "GreenEnergy Solutions",
        industry: "Clean Energy",
        description:
          "Sustainable energy company developing renewable solutions for a greener future. We combine engineering excellence with environmental stewardship.",
        logo: "https://images.unsplash.com/photo-1473810394358-1534ff7474a7?w=150&h=150&fit=crop",
        location: "Austin, TX",
        founded: 2019,
        size: "100-250 employees",
        website: "https://greenenergy.example.com",
        openPositions: 14,
        hiredFromPlatform: 9,
        sponsoredPrograms: 4,
        verifiedSkills: [
          "Renewable Energy",
          "Electrical Engineering",
          "Sustainable Design",
          "Python",
          "Data Analysis",
          "Systems Engineering",
        ],
        programTypes: [
          "Green Energy Academy",
          "University Partnerships",
          "Reskilling Programs",
        ],
        hiringProcess: [
          "Skills Assessment",
          "Project Simulation",
          "Technical Interview",
          "Values Alignment Interview",
        ],
        successStories: [
          {
            name: "Michael Torres",
            role: "Renewable Systems Engineer",
            avatar:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
            quote:
              "GreenEnergy's reskilling program helped me transition from traditional energy to renewable systems. Their investment in my education allowed me to pursue a more meaningful career that aligns with my values.",
          },
        ],
        featuredProgram: {
          title: "Renewable Engineering Accelerator",
          description:
            "A 6-month program helping engineers transition into renewable energy roles through specialized training and hands-on projects.",
          benefits: [
            "Training stipend",
            "Project-based learning",
            "Industry certification",
            "Job placement",
          ],
          nextCohort: "2025-05-01T00:00:00Z",
          applicationDeadline: "2025-03-30T23:59:59Z",
        },
      },
    ];
  } catch (error) {
    console.error("Error fetching employers:", error);
    return [];
  }
};

export default function EmployersPage() {
  const [employers, setEmployers] = useState<any[]>([]);
  const [filteredEmployers, setFilteredEmployers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  const [programFilter, setProgramFilter] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const employersData = await fetchEmployers();

      setEmployers(employersData);
      setFilteredEmployers(employersData);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter employers based on search query and filters
    if (employers.length > 0) {
      let filtered = [...employers];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (employer) =>
            employer.name.toLowerCase().includes(query) ||
            employer.description.toLowerCase().includes(query) ||
            employer.industry.toLowerCase().includes(query) ||
            employer.verifiedSkills.some((skill: string) =>
              skill.toLowerCase().includes(query)
            )
        );
      }

      if (industryFilter) {
        filtered = filtered.filter(
          (employer) =>
            employer.industry.toLowerCase() === industryFilter.toLowerCase()
        );
      }

      if (programFilter) {
        filtered = filtered.filter((employer) =>
          employer.programTypes.some(
            (program: string) =>
              program.toLowerCase() === programFilter.toLowerCase()
          )
        );
      }

      setFilteredEmployers(filtered);
    }
  }, [searchQuery, industryFilter, programFilter, employers]);

  // Get all unique industries and program types from employers
  const allIndustries = [
    ...new Set(employers.map((employer) => employer.industry)),
  ].sort();
  const allProgramTypes = [
    ...new Set(employers.flatMap((employer) => employer.programTypes)),
  ].sort();

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

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
          <h1 className="text-3xl font-bold">Partnered Employers</h1>
          <p className="text-muted-foreground mt-2">
            Discover companies investing in education and skill-based hiring
          </p>
        </div>
        <Link href="/careers">
          <Button>
            Browse Job Opportunities
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
              placeholder="Search by name, industry, or description..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm whitespace-nowrap">Filter by:</span>
            <select
              value={industryFilter || ""}
              onChange={(e) => setIndustryFilter(e.target.value || null)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="">All Industries</option>
              {allIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>

            <select
              value={programFilter || ""}
              onChange={(e) => setProgramFilter(e.target.value || null)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="">All Program Types</option>
              {allProgramTypes.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(searchQuery || industryFilter || programFilter) && (
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Showing {filteredEmployers.length} of {employers.length} employers
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground"
              onClick={() => {
                setSearchQuery("");
                setIndustryFilter(null);
                setProgramFilter(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Employers list */}
      <div className="space-y-8">
        {filteredEmployers.length === 0 ? (
          <div className="bg-muted rounded-xl p-12 text-center">
            <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No employers found</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn't find any employers matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setIndustryFilter(null);
                setProgramFilter(null);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          filteredEmployers.map((employer) => (
            <motion.div
              key={employer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background border border-border rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={employer.logo}
                        alt={employer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <div>
                        <h2 className="text-2xl font-bold">{employer.name}</h2>
                        <Badge className="mt-1 md:mt-0 w-fit">
                          {employer.industry}
                        </Badge>
                      </div>

                      <div className="flex gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{employer.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{employer.size}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {employer.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">
                          {employer.openPositions}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Open Positions
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">
                          {employer.hiredFromPlatform}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Hired From Platform
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">
                          {employer.sponsoredPrograms}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Sponsored Programs
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold">
                          {employer.founded}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Founded
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-4">
                      <div>
                        <h3 className="font-medium mb-2">Verified Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {employer.verifiedSkills.map(
                            (skill: string, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <BadgeCheck className="h-3 w-3" />
                                <span>{skill}</span>
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Program Types</h3>
                        <div className="flex flex-wrap gap-2">
                          {employer.programTypes.map(
                            (program: string, index: number) => (
                              <Badge key={index}>{program}</Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <Link href={`/careers?company=${employer.name}`}>
                        <Button variant="outline">
                          <Briefcase className="mr-2 h-4 w-4" />
                          View Jobs
                        </Button>
                      </Link>

                      <Link href={`/employers/${employer.id}`}>
                        <Button>
                          Company Profile
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {employer.featuredProgram && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="bg-primary-50 dark:bg-primary-950/20 rounded-xl p-4">
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Featured Program: {employer.featuredProgram.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-3">
                        {employer.featuredProgram.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Key Benefits
                          </h4>
                          <ul className="space-y-1">
                            {employer.featuredProgram.benefits.map(
                              (benefit: string, index: number) => (
                                <li
                                  key={index}
                                  className="text-sm flex items-center gap-2"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-primary" />
                                  <span>{benefit}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <span className="font-medium">
                                  Next Cohort:
                                </span>{" "}
                                {formatDate(
                                  employer.featuredProgram.nextCohort
                                )}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <span className="font-medium">
                                  Application Deadline:
                                </span>{" "}
                                {formatDate(
                                  employer.featuredProgram.applicationDeadline
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Link href={`/employers/${employer.id}/programs`}>
                        <Button size="sm">
                          Learn More About This Program
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Features section */}
      <div className="mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-8 text-center">
          How Employers Partner With Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background border border-border rounded-xl p-6 text-center">
            <div className="bg-primary-50 dark:bg-primary-950/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BadgeCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Skill-Based Hiring</h3>
            <p className="text-muted-foreground">
              Identify candidates based on verified skills and abilities rather
              than just credentials. Find talent that has proven their
              competencies through our assessment platform.
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 text-center">
            <div className="bg-secondary-50 dark:bg-secondary-950/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Education Sponsorship
            </h3>
            <p className="text-muted-foreground">
              Invest in future talent by sponsoring students' education in
              fields relevant to your company. Build a pipeline of perfectly
              trained candidates.
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 text-center">
            <div className="bg-accent-50 dark:bg-accent-950/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Layers className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Talent Matching</h3>
            <p className="text-muted-foreground">
              Our AI-powered platform matches your open positions with
              candidates who have the exact skill profile you're looking for,
              saving time and improving hiring outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="mt-16 bg-background border border-border rounded-xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Become a Partner Employer
            </h2>
            <p className="text-muted-foreground mb-6">
              Join our network of forward-thinking companies investing in
              education and skill-based hiring. Gain access to a pool of
              talented individuals with verified skills and customized training.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Access to verified skill profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Create customized training programs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Improve diversity and inclusion in hiring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Reduce recruitment costs and time-to-hire</span>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/employers/join">
                <Button size="lg">
                  Join as an Employer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-64 md:h-full">
            <Image
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format&fit=crop"
              alt="Employer partnership"
              fill
              className="object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent rounded-xl"></div>
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
              <div className="bg-background/90 backdrop-blur-sm p-4 rounded-lg border border-border shadow-sm">
                <div className="font-semibold text-lg">Partner Success</div>
                <div className="text-sm text-muted-foreground">
                  Average hiring success rate
                </div>
                <div className="text-3xl font-bold text-primary mt-2">92%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          What Employers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEmployers.slice(0, 2).map((employer) =>
            employer.successStories && employer.successStories.length > 0 ? (
              <motion.div
                key={employer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 overflow-hidden rounded-lg flex-shrink-0">
                    <Image
                      src={employer.logo}
                      alt={employer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{employer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {employer.industry}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-xl mb-4">
                  <p className="italic text-muted-foreground">
                    "{employer.successStories[0].quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full">
                    <Image
                      src={employer.successStories[0].avatar}
                      alt={employer.successStories[0].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">
                      {employer.successStories[0].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {employer.successStories[0].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/employer-stories">
            <Button variant="outline">
              View All Success Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">
              How do I verify skills?
            </h3>
            <p className="text-muted-foreground">
              Our platform provides standardized assessments for various skills.
              Candidates complete these assessments, and the results are
              verified and recorded on their profiles, giving you confidence in
              their abilities.
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">
              What is the cost to become a partner?
            </h3>
            <p className="text-muted-foreground">
              We offer flexible partnership tiers based on your company's size
              and hiring needs. Contact our employer partnerships team for a
              customized quote and package details.
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">
              How does the sponsored education model work?
            </h3>
            <p className="text-muted-foreground">
              You can sponsor students through their education in exchange for a
              commitment to work with your company for a set period after
              graduation, or through other flexible arrangements like
              internships or project work.
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">
              Can we customize the skills we're looking for?
            </h3>
            <p className="text-muted-foreground">
              Absolutely. Partner employers can define specific skill profiles
              for their openings, and our platform will match and recommend
              candidates who meet those exact requirements.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/employers/faq">
            <Button variant="outline">
              View All FAQs
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
