"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  Users,
  Search,
  Filter,
  Briefcase,
  GraduationCap,
  ChevronRight,
  UserPlus,
  Clock,
  Check,
  BarChart,
  LineChart,
  Layers,
  User,
  MapPin,
  Building,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SkillGapChart } from "@/components/visualizations/skill-gap-chart";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";
// Mock data fetch - would be replaced with real API calls
const fetchEmployerData = async () => {
  try {
    const response = await fetch("/data/employers.json");
    const employers = await response.json();
    return employers[0]; // Return the first employer for demo purposes
  } catch (error) {
    console.error("Error fetching employer data:", error);
    return null;
  }
};

const fetchStudentData = async () => {
  try {
    const response = await fetch("/data/students.json");
    return await response.json();
  } catch (error) {
    console.error("Error fetching student data:", error);
    return [];
  }
};

export default function EmployerDashboard() {
  const [employer, setEmployer] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const employerData = await fetchEmployerData();
      const studentsData = await fetchStudentData();

      setEmployer(employerData);
      setStudents(studentsData);
      setFilteredStudents(studentsData);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter students based on search and selected skill
    if (students.length > 0) {
      let filtered = [...students];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (student) =>
            student.name.toLowerCase().includes(query) ||
            student.bio.toLowerCase().includes(query) ||
            student.skills.some((skill: any) =>
              skill.name.toLowerCase().includes(query)
            )
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
  }, [searchQuery, selectedSkill, students]);

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
              const attr = stat.getAttribute("data-format");
              // @ts-ignore - textContent exists on HTMLElement
              stat.textContent =
                attr === "money"
                  ? `$${value.toLocaleString()}`
                  : value.toLocaleString();
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
          <p className="text-lg font-medium">Loading employer dashboard...</p>
        </div>
      </div>
    );
  }

  // Get all unique skills from the job positions
  // Get all unique skills from the job positions
  const requiredSkills = employer.openPositions
    .flatMap((position: any) => position.skills.map((skill: any) => skill.name))
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    );

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Overview Card */}
        <div className="lg:w-2/3 bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Image
                src={employer.logo}
                alt={employer.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{employer.name}</h1>
              <p className="text-muted-foreground">{employer.industry}</p>
            </div>
            <div className="ml-auto">
              <Link href="/employer/profile">
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
                <Briefcase className="h-5 w-5 text-primary-500" />
                <span className="text-sm font-medium">Open Positions</span>
              </div>
              <span className="text-2xl font-bold">
                <span
                  className="stat-value"
                  data-value={employer.openPositions.length}
                >
                  0
                </span>
              </span>
            </div>

            <div className="bg-secondary-50 dark:bg-secondary-950/20 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-secondary-500" />
                <span className="text-sm font-medium">Total Applicants</span>
              </div>
              <span className="text-2xl font-bold">
                <span
                  className="stat-value"
                  data-value={employer.openPositions.reduce(
                    (acc: number, pos: any) => acc + pos.applicants,
                    0
                  )}
                >
                  0
                </span>
              </span>
            </div>

            <div className="bg-accent-50 dark:bg-accent-950/20 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-accent-500" />
                <span className="text-sm font-medium">Sponsored Students</span>
              </div>
              <span className="text-2xl font-bold">
                <span
                  className="stat-value"
                  data-value={employer.sponsoredPrograms.reduce(
                    (acc: number, prog: any) => acc + prog.currentApplications,
                    0
                  )}
                >
                  0
                </span>
              </span>
            </div>

            <div className="bg-warning-50 dark:bg-warning-950/20 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-5 w-5 text-warning-500" />
                <span className="text-sm font-medium">Founded</span>
              </div>
              <span className="text-2xl font-bold">
                <span className="stat-value" data-value={employer.founded}>
                  0
                </span>
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Open Positions</h2>
              <Link href="/employer/jobs/new">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  New Position
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {employer.openPositions.map((position: any, index: number) => (
                <div
                  key={index}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center p-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {position.location}
                        </span>
                        <span>•</span>
                        <span>
                          Remote:{" "}
                          {position.remote === "Yes"
                            ? "Full"
                            : position.remote === "Hybrid"
                            ? "Hybrid"
                            : "No"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          Applicants
                        </span>
                        <span className="font-semibold">
                          {position.applicants}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          Posted
                        </span>
                        <span className="font-semibold">
                          {new Date(position.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <Link href={`/employer/jobs/${position.id}`}>
                        <Button variant="outline" size="sm">
                          Manage
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-muted p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">
                        Required Skills:
                      </span>
                      {position.skills.map((skill: any, i: number) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <span>{skill.name}</span>
                          <span className="text-xs">{skill.level}+</span>
                        </Badge>
                      ))}
                      <div className="ml-auto text-sm">
                        <span className="font-medium">
                          ${formatCurrency(position.salary.min)} - $
                          {formatCurrency(position.salary.max)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sponsored Programs</h2>
              <Link href="/employer/programs/new">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  New Program
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {employer.sponsoredPrograms.map((program: any, index: number) => (
                <div
                  key={index}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center p-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{program.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {program.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          Applications
                        </span>
                        <span className="font-semibold">
                          {program.currentApplications}/{program.slots}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          Starts
                        </span>
                        <span className="font-semibold">
                          {new Date(program.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <Link href={`/employer/programs/${program.id}`}>
                        <Button variant="outline" size="sm">
                          Manage
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-muted p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">Requirements:</span>
                      {program.requirements.skills.map(
                        (skill: string, i: number) => (
                          <Badge key={i} variant="outline">
                            {skill}
                          </Badge>
                        )
                      )}
                      <div className="ml-auto flex gap-2 text-sm">
                        <span>
                          <Clock className="h-3 w-3 inline mr-1" />
                          {program.duration}
                        </span>
                        <span>
                          <Calendar className="h-3 w-3 inline mr-1" />
                          Deadline:{" "}
                          {new Date(
                            program.applicationDeadline
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Analysis Card */}
        <div className="lg:w-1/3 bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Skill Gap Analysis</h2>
            <Link href="/employer/talent-analytics">
              <Button variant="ghost" size="sm">
                Detailed View
              </Button>
            </Link>
          </div>

          <div className="h-[300px] mb-6">
            <SkillGapChart
              skills={employer.openPositions.flatMap(
                (position: any) => position.skills
              )}
              talentPool={students.flatMap((student: any) => student.skills)}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium mb-2">Talent Shortage Areas</h3>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Machine Learning</div>
                  <Badge
                    variant="outline"
                    className="bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400 border-warning-200 dark:border-warning-800"
                  >
                    High Demand
                  </Badge>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Talent Availability</span>
                  <span className="font-medium">32%</span>
                </div>
                <Progress value={32} className="h-1.5" />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>3 Positions</span>
                  <span>8 Qualified Candidates</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Blockchain</div>
                  <Badge
                    variant="outline"
                    className="bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400 border-warning-200 dark:border-warning-800"
                  >
                    High Demand
                  </Badge>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Talent Availability</span>
                  <span className="font-medium">28%</span>
                </div>
                <Progress value={28} className="h-1.5" />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>2 Positions</span>
                  <span>4 Qualified Candidates</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">TensorFlow</div>
                  <Badge
                    variant="outline"
                    className="bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400 border-accent-200 dark:border-accent-800"
                  >
                    Medium Demand
                  </Badge>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Talent Availability</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-1.5" />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>2 Positions</span>
                  <span>7 Qualified Candidates</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/employer/sponsored-training">
                <Button className="w-full" variant="default">
                  Create Sponsored Training
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Discovery */}
      <div className="bg-background rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Talent Discovery</h2>
          <Link href="/employer/talent-pool">
            <Button variant="outline" size="sm">
              View Talent Pool
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by name, skills, or bio..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedSkill ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSkill(null)}
            >
              All Skills
            </Button>

            {requiredSkills.slice(0, 3).map((skill: string) => (
              <Button
                key={skill}
                variant={selectedSkill === skill ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSkill(skill)}
              >
                {skill}
              </Button>
            ))}

            {requiredSkills.length > 3 && (
              <div className="relative group">
                <Button variant="outline" size="sm">
                  More +{requiredSkills.length - 3}
                </Button>
                <div className="absolute right-0 top-full mt-1 z-10 w-48 py-2 bg-popover rounded-md shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {requiredSkills.slice(3).map((skill: string) => (
                    <button
                      key={skill}
                      className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted transition-colors"
                      onClick={() => setSelectedSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
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

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Match Score</span>
                    {/* Calculate match score based on required skills */}
                    {(() => {
                      const matchScore = Math.floor(
                        (student.skills.filter((skill: any) =>
                          requiredSkills.includes(skill.name)
                        ).length /
                          Math.min(requiredSkills.length, 3)) *
                          100
                      );
                      return (
                        <span className="text-sm font-medium">
                          {matchScore}%
                        </span>
                      );
                    })()}
                  </div>
                  <Progress
                    value={Math.floor(
                      (student.skills.filter((skill: any) =>
                        requiredSkills.includes(skill.name)
                      ).length /
                        Math.min(requiredSkills.length, 3)) *
                        100
                    )}
                    className="h-1.5"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Link href={`/employer/candidate/${student.id}`}>
                    <Button className="w-full" variant="default" size="sm">
                      View Profile
                    </Button>
                  </Link>
                  <Link href={`/employer/contact/${student.id}`}>
                    <Button className="w-full" variant="outline" size="sm">
                      Contact
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStudents.length > 6 && (
          <div className="mt-6 text-center">
            <Link href="/employer/talent-pool">
              <Button variant="outline">
                View All {filteredStudents.length} Candidates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {filteredStudents.length === 0 && (
          <div className="bg-muted rounded-xl p-12 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No candidates found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn't find any candidates matching your search criteria. Try
              adjusting your filters.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedSkill(null);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Success Stories & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Success Stories</h2>
            <Link href="/employer/success-stories">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {employer.successStories.map((story: any, index: number) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {story.position} • Hired{" "}
                      {new Date(story.hireDate).toLocaleDateString()}
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

                <blockquote className="text-sm text-muted-foreground italic mb-3">
                  "{story.testimonial}"
                </blockquote>

                <Link
                  href={`/employer/success-story/${story.studentId}`}
                  className="text-sm text-primary hover:underline"
                >
                  View Full Story
                </Link>
              </div>
            ))}

            <div className="pt-2">
              <Link href="/employer/hiring-report">
                <Button className="w-full" variant="secondary">
                  View Hiring Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Hiring Analytics</h2>
            <Button variant="ghost" size="sm">
              Last 6 Months
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Time to Hire</h3>
              </div>
              <div className="text-2xl font-bold mb-1">32 days</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <span className="text-accent">▼ 12%</span>
                <span className="ml-1">from previous period</span>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-full bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Qualified Applicants</h3>
              </div>
              <div className="text-2xl font-bold mb-1">25%</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <span className="text-accent">▲ 8%</span>
                <span className="ml-1">from previous period</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Hiring Funnel</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Applications Received</span>
                  <span className="font-medium">125</span>
                </div>
                <Progress value={100} className="h-2.5 bg-muted" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Resume Screening</span>
                  <span className="font-medium">78</span>
                </div>
                <Progress value={62} className="h-2.5 bg-muted" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Technical Assessment</span>
                  <span className="font-medium">42</span>
                </div>
                <Progress value={34} className="h-2.5 bg-muted" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Interviews</span>
                  <span className="font-medium">18</span>
                </div>
                <Progress value={14} className="h-2.5 bg-muted" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Offers Extended</span>
                  <span className="font-medium">8</span>
                </div>
                <Progress value={6} className="h-2.5 bg-muted" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Offers Accepted</span>
                  <span className="font-medium">6</span>
                </div>
                <Progress value={5} className="h-2.5 bg-muted" />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/employer/analytics">
              <Button className="w-full" variant="secondary">
                View Detailed Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
