"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  BarChart,
  Users,
  DollarSign,
  Briefcase,
  TrendingUp,
  PieChart,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Calendar,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  GraduationCap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { InvestorPortfolioChart } from "@/components/visualizations/investor-portfolio-chart";
import { InvestmentMap } from "@/components/visualizations/investment-map";
import { formatCurrency } from "@/lib/utils";
import Layout from "@/app/components/layout/Layout";

// Mock data fetch - would be replaced with real API calls
const fetchInvestorData = async () => {
  try {
    const response = await fetch("/data/investors.json");
    const investors = await response.json();
    return investors[0]; // Return the first investor for demo purposes
  } catch (error) {
    console.error("Error fetching investor data:", error);
    return null;
  }
};

const fetchStudentData = async () => {
  try {
    const response = await fetch("/data/students.json");
    const students = await response.json();
    return students; // Return all students
  } catch (error) {
    console.error("Error fetching student data:", error);
    return [];
  }
};

export default function InvestorDashboard() {
  const [investor, setInvestor] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [minCreditScore, setMinCreditScore] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const investorData = await fetchInvestorData();
      const studentsData = await fetchStudentData();

      setInvestor(investorData);
      setStudents(studentsData);
      setFilteredStudents(studentsData);
      setMinCreditScore(
        investorData?.requirements?.minimumEducationCreditScore || 0
      );
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter students based on search and filters
    if (students.length > 0) {
      let filtered = [...students];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (student) =>
            student.name.toLowerCase().includes(query) ||
            student.location.toLowerCase().includes(query) ||
            student.bio.toLowerCase().includes(query)
        );
      }

      if (minCreditScore > 0) {
        filtered = filtered.filter(
          (student) => student.educationCreditScore >= minCreditScore
        );
      }

      if (selectedField) {
        // This is a mock filter - in a real app, you'd have a field property for students
        filtered = filtered.filter((student) =>
          student.bio.toLowerCase().includes(selectedField.toLowerCase())
        );
      }

      if (selectedSkill) {
        filtered = filtered.filter((student) =>
          student.skills.some(
            (skill: any) =>
              skill.name.toLowerCase() === selectedSkill.toLowerCase()
          )
        );
      }

      setFilteredStudents(filtered);
    }
  }, [searchQuery, selectedField, selectedSkill, minCreditScore, students]);

  // Statistics animation with GSAP
  useEffect(() => {
    if (!loading && statsRef.current) {
      const statValues = statsRef.current.querySelectorAll(".stat-value");

      gsap.fromTo(
        statValues,
        { textContent: 0 },
        {
          textContent: (i: number, target: HTMLElement) => {
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
              // @ts-ignore - textContent exists on HTMLElement
              stat.textContent = value.toLocaleString();
            });
          },
        }
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading investor dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate some metrics (these would come from the API in a real app)
  const totalInvested = investor.totalInvested;
  const activeInvestments = investor.activeInvestments;
  const averageROI = investor.averageROI;
  const successRate = investor.successRate;

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Overview and Analytics Card */}
          <div className="lg:w-2/3 bg-background rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Image
                  src={investor.logo}
                  alt={investor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{investor.name}</h1>
                <p className="text-muted-foreground">{investor.type}</p>
              </div>
              <div className="ml-auto">
                <Link href="/investor/profile">
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
              <div className="bg-primary-50 dark:bg-primary-950/20 rounded-lg p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-primary-500" />
                  <span className="text-sm font-medium">Total Invested</span>
                </div>
                <span className="text-2xl font-bold">
                  $
                  <span
                    className="stat-value"
                    data-value={totalInvested / 1000}
                  >
                    0
                  </span>
                  K
                </span>
              </div>

              <div className="bg-secondary-50 dark:bg-secondary-950/20 rounded-lg p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-secondary-500" />
                  <span className="text-sm font-medium">
                    Active Investments
                  </span>
                </div>
                <span className="text-2xl font-bold">
                  <span className="stat-value" data-value={activeInvestments}>
                    0
                  </span>
                </span>
              </div>

              <div className="bg-accent-50 dark:bg-accent-950/20 rounded-lg p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-accent-500" />
                  <span className="text-sm font-medium">Average ROI</span>
                </div>
                <span className="text-2xl font-bold">
                  <span className="stat-value" data-value={averageROI}>
                    0
                  </span>
                  %
                </span>
              </div>

              <div className="bg-warning-50 dark:bg-warning-950/20 rounded-lg p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-warning-500" />
                  <span className="text-sm font-medium">Success Rate</span>
                </div>
                <span className="text-2xl font-bold">
                  <span className="stat-value" data-value={successRate}>
                    0
                  </span>
                  %
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Portfolio Performance</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    All Time
                  </Button>
                  <Button variant="ghost" size="sm">
                    This Year
                  </Button>
                  <Button variant="ghost" size="sm">
                    This Quarter
                  </Button>
                </div>
              </div>

              <div className="h-80">
                <InvestorPortfolioChart
                  data={{
                    months: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    series: [
                      {
                        name: "Investment",
                        data: [
                          150000, 180000, 210000, 240000, 270000, 300000,
                          330000, 370000, 420000, 490000, 510000, 520000,
                        ],
                      },
                      {
                        name: "Returns",
                        data: [
                          0, 0, 15000, 25000, 40000, 80000, 110000, 150000,
                          190000, 225000, 255000, 280000,
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Upcoming Milestones</h2>
                <Link
                  href="/investor/milestones"
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="p-2 rounded-full bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      Machine Learning Certification Completion
                    </div>
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>Student: Alex Johnson</span>
                      <span className="text-warning-600 dark:text-warning-400">
                        3 days left
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">$5,000</div>
                    <div className="text-xs text-muted-foreground">
                      Milestone Value
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="p-2 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      Blockchain Certification Completion
                    </div>
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>Student: Samantha Lee</span>
                      <span>Due: June 30, 2025</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">$8,000</div>
                    <div className="text-xs text-muted-foreground">
                      Milestone Value
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="p-2 rounded-full bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      Finance Internship Placement
                    </div>
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>Student: Samantha Lee</span>
                      <span>Due: August 15, 2025</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">$12,000</div>
                    <div className="text-xs text-muted-foreground">
                      Milestone Value
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Geographic Impact Card */}
          <div className="lg:w-1/3 bg-background rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Geographic Impact</h2>
              <Link href="/investor/impact">
                <Button variant="ghost" size="sm">
                  Detailed View
                </Button>
              </Link>
            </div>

            <div className="h-[300px] mb-6">
              <InvestmentMap />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium mb-2">Top Regions</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">San Francisco Bay Area</div>
                      <div className="text-xs text-muted-foreground">
                        California, USA
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">12 Students</div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Greater Boston</div>
                      <div className="text-xs text-muted-foreground">
                        Massachusetts, USA
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">8 Students</div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">New York Metro</div>
                      <div className="text-xs text-muted-foreground">
                        New York, USA
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">7 Students</div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/investor/opportunities">
                  <Button className="w-full" variant="default">
                    Discover Regional Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Student Discovery Section */}
        <div className="bg-background rounded-xl shadow-sm border border-border p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Discover Promising Students</h2>
            <Link href="/investor/opportunities">
              <Button variant="outline" size="sm">
                View All Opportunities
              </Button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search by name, location, or skills..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={!selectedField ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedField(null)}
              >
                All Fields
              </Button>

              {investor.requirements.preferredFields.map((field: string) => (
                <Button
                  key={field}
                  variant={selectedField === field ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedField(field)}
                >
                  {field}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Min Education Credit Score:</span>
              <div className="flex items-center gap-2 w-64">
                <Input
                  type="range"
                  min="0"
                  max="900"
                  step="10"
                  value={minCreditScore}
                  onChange={(e) => setMinCreditScore(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm font-medium w-10">
                  {minCreditScore}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Skills:</span>
              <select
                value={selectedSkill || ""}
                onChange={(e) => setSelectedSkill(e.target.value || null)}
                className="px-2 py-1 border rounded-md text-sm bg-background"
              >
                <option value="">Any Skill</option>
                {investor.requirements.preferredSkills.map((skill: string) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.slice(0, 6).map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-muted rounded-xl overflow-hidden transition-all hover:shadow-md card-hover border border-border"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={student.avatar}
                      alt={student.name}
                      width={56}
                      height={56}
                      className="rounded-full border-2 border-primary-200"
                    />
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {student.location}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Education Credit Score</span>
                      <span className="text-sm font-medium">
                        {student.educationCreditScore}/900
                      </span>
                    </div>
                    <Progress
                      value={(student.educationCreditScore / 900) * 100}
                      className="h-1.5"
                    />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {student.bio}
                  </p>

                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Top Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {student.skills
                        .sort((a: any, b: any) => b.level - a.level)
                        .slice(0, 3)
                        .map((skill: any) => (
                          <Badge
                            key={skill.id}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill.name} ({skill.level})
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link href={`/investor/student/${student.id}`}>
                      <Button className="w-full" variant="default" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Link href={`/investor/invest/${student.id}`}>
                      <Button className="w-full" variant="outline" size="sm">
                        Investment Options
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="bg-muted rounded-xl p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any students matching your search criteria. Try
                adjusting your filters.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedField(null);
                  setSelectedSkill(null);
                  setMinCreditScore(
                    investor?.requirements?.minimumEducationCreditScore || 0
                  );
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {filteredStudents.length > 6 && (
            <div className="mt-6 text-center">
              <Link href="/investor/discover">
                <Button variant="outline">
                  View All {filteredStudents.length} Results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* ROI Projection and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-background rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">ROI by Field</h2>
              <Button variant="ghost" size="sm">
                Last 12 Months
              </Button>
            </div>

            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">Computer Science</h3>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Average ROI</span>
                  <span className="text-sm font-medium">24.5%</span>
                </div>
                <Progress value={24.5} max={30} className="h-1.5 mb-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>12 Investments</span>
                  <span>$320K Total</span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-full bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">Data Science</h3>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Average ROI</span>
                  <span className="text-sm font-medium">22.0%</span>
                </div>
                <Progress value={22} max={30} className="h-1.5 mb-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>8 Investments</span>
                  <span>$240K Total</span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-full bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">Engineering</h3>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Average ROI</span>
                  <span className="text-sm font-medium">19.8%</span>
                </div>
                <Progress value={19.8} max={30} className="h-1.5 mb-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>15 Investments</span>
                  <span>$380K Total</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/investor/analytics">
                  <Button className="w-full" variant="secondary">
                    View Detailed Analytics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Applications</h2>
              <Link href="/investor/applications">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              <div className="bg-muted rounded-lg overflow-hidden">
                <div className="relative h-24">
                  <Image
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80"
                    alt="CS Student"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-semibold">Tyler Williams</h3>
                    <p className="text-xs">CS Student • Chicago, IL</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white text-primary-800 text-xs px-2 py-1 rounded-full">
                    Credit Score: 760
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Machine Learning
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Python
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Data Analysis
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Amount Requested
                      </span>
                      <div className="font-semibold">
                        ${formatCurrency(18000)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">
                        Applied
                      </span>
                      <div className="text-sm">Yesterday</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Review
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg overflow-hidden">
                <div className="relative h-24">
                  <Image
                    src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80"
                    alt="Design Student"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-semibold">Megan Thompson</h3>
                    <p className="text-xs">UX Design • Seattle, WA</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white text-primary-800 text-xs px-2 py-1 rounded-full">
                    Credit Score: 725
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      UI/UX Design
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Figma
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      User Research
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Amount Requested
                      </span>
                      <div className="font-semibold">
                        ${formatCurrency(12000)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">
                        Applied
                      </span>
                      <div className="text-sm">3 days ago</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Review
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/investor/applications">
                  <Button className="w-full" variant="secondary">
                    View All Applications
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Success Stories</h2>
              <Link href="/investor/success-stories">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                    alt="David Nguyen"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">David Nguyen</h3>
                    <p className="text-sm text-muted-foreground">
                      Software Engineer at TechCorp
                    </p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-warning-500 fill-warning-500"
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  "The investment allowed me to complete my bootcamp and land a
                  job within 3 months. My income increased by 70% and I was able
                  to repay the investment in just 1 year."
                </p>

                <div className="flex justify-between text-sm">
                  <span>
                    <span className="font-medium">Investment:</span> $15,000
                  </span>
                  <span>
                    <span className="font-medium">ROI:</span> 35%
                  </span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                    alt="Sarah Johnson"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">
                      Data Scientist at Analytics Inc.
                    </p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-warning-500 fill-warning-500"
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  "I was able to complete my data science certification and
                  transition to a new career. The milestone-based funding kept
                  me motivated and on track."
                </p>

                <div className="flex justify-between text-sm">
                  <span>
                    <span className="font-medium">Investment:</span> $22,000
                  </span>
                  <span>
                    <span className="font-medium">ROI:</span> 28%
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/investor/success-stories">
                  <Button className="w-full" variant="secondary">
                    View All Success Stories
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
