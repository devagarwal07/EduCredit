"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  BadgeCheck,
  LineChart,
  BookOpen,
  GraduationCap,
  BarChart3,
  Users,
  Clock,
  ArrowRight,
  Award,
  Calendar,
  Briefcase,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SkillGraph } from "@/components/visualizations/skill-graph";
import { LearningPathTimeline } from "@/components/visualizations/learning-path-timeline";
import { formatCurrency } from "@/lib/utils";

// Temporary static data - will be replaced with API calls
// In real implementation, we would fetch this from the backend
const fetchStudentData = async () => {
  try {
    const response = await fetch("/data/students.json");
    const students = await response.json();
    return students[0]; // Just return the first student for now
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
};

export default function Dashboard() {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchStudentData();
      setStudent(data);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!loading && timelineRef.current) {
      // Animate the timeline
      gsap.fromTo(
        timelineRef.current.querySelectorAll(".timeline-item"),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power1.out",
        }
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Welcome and Overview Card */}
        <div className="lg:w-2/3 bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={student.avatar}
              alt={student.name}
              width={64}
              height={64}
              className="rounded-full border-2 border-primary-200"
            />
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {student.name.split(" ")[0]}!
              </h1>
              <p className="text-muted-foreground">
                Last login: Today at 9:45 AM
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-primary-50 dark:bg-primary-950/20 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="h-5 w-5 text-primary-500" />
                <span className="text-sm font-medium">Verified Skills</span>
              </div>
              <span className="text-2xl font-bold">
                {student.skills.length}
              </span>
            </div>

            <div className="bg-secondary-50 dark:bg-secondary-950/20 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <LineChart className="h-5 w-5 text-secondary-500" />
                <span className="text-sm font-medium">Credit Score</span>
              </div>
              <span className="text-2xl font-bold">
                {student.educationCreditScore}
              </span>
            </div>

            <div className="bg-accent-50 dark:bg-accent-950/20 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-accent-500" />
                <span className="text-sm font-medium">Learning Streak</span>
              </div>
              <span className="text-2xl font-bold">
                {student.learning.streak} days
              </span>
            </div>

            <div className="bg-warning-50 dark:bg-warning-950/20 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-warning-500" />
                <span className="text-sm font-medium">Funding</span>
              </div>
              <span className="text-2xl font-bold">
                ${student.funding.received.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Current Learning Progress</h3>
              <Link
                href="/learning"
                className="text-sm text-primary-500 hover:underline"
              >
                View All
              </Link>
            </div>

            {student.learning.currentCourses.map(
              (course: any, index: number) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{course.title}</span>
                    <span className="text-sm font-medium">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Upcoming Deadlines</h3>
              <Link
                href="/calendar"
                className="text-sm text-primary-500 hover:underline"
              >
                View Calendar
              </Link>
            </div>

            <div className="space-y-3" ref={timelineRef}>
              {student.funding.activeContracts[0].milestones.map(
                (milestone: any, index: number) => {
                  const dueDate = new Date(milestone.dueDate);
                  const now = new Date();
                  const daysLeft = Math.ceil(
                    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                  );
                  const isUrgent = daysLeft <= 7;

                  return (
                    <div
                      key={index}
                      className="timeline-item flex items-center gap-3 p-3 rounded-lg bg-muted"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          isUrgent
                            ? "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400"
                            : "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                        }`}
                      >
                        {isUrgent ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : (
                          <Calendar className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {milestone.description}
                        </div>
                        <div className="text-sm text-muted-foreground flex justify-between">
                          <span>
                            Due:{" "}
                            {new Date(milestone.dueDate).toLocaleDateString()}
                          </span>
                          {isUrgent && (
                            <span className="text-warning-600 dark:text-warning-400">
                              {daysLeft} days left
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${milestone.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Milestone Value
                        </div>
                      </div>
                    </div>
                  );
                }
              )}

              <div className="timeline-item flex items-center gap-3 p-3 rounded-lg bg-muted">
                <div className="p-2 rounded-full bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">
                    Interview with TechCorp Inc.
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(
                      student.career.interviews[0].date
                    ).toLocaleDateString()}{" "}
                    at{" "}
                    {new Date(
                      student.career.interviews[0].date
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <Link href="/career/interviews">
                  <Button variant="outline" size="sm">
                    Prepare
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Visualization Card */}
        <div className="lg:w-1/3 bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Skills</h2>
            <Link href="/skill-assessment">
              <Button size="sm" variant="outline">
                Add Skills
              </Button>
            </Link>
          </div>

          <div className="h-[300px] mb-6">
            <SkillGraph skills={student.skills} />
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Top Skills</h3>
            {student.skills
              .sort((a: any, b: any) => b.level - a.level)
              .slice(0, 3)
              .map((skill: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Verified{" "}
                        {new Date(skill.lastVerified).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{skill.level}/100</div>
                </div>
              ))}

            <div className="pt-4">
              <Link href="/skill-assessment">
                <Button className="w-full" variant="default">
                  View All Skills
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Learning Path Timeline */}
        <div className="bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Learning Journey</h2>
            <Link href="/career-simulator">
              <Button size="sm" variant="outline">
                Career Simulator
              </Button>
            </Link>
          </div>

          <div className="h-[300px]">
            <LearningPathTimeline
              completedCourses={student.learning.completedCourses}
              currentCourses={student.learning.currentCourses}
              careerObjectives={student.career.objectives}
            />
          </div>
        </div>

        {/* Funding Overview */}
        <div className="bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Funding Overview</h2>
            <Link href="/funding">
              <Button size="sm" variant="outline">
                Find Investors
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Active Contract</h3>
                <Link
                  href={`/funding/contracts/${student.funding.activeContracts[0].id}`}
                  className="text-sm text-primary-500 hover:underline"
                >
                  View Details
                </Link>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Investor
                    </div>
                    <div className="font-medium">Future Talents Fund</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Amount</div>
                    <div className="font-medium">
                      $
                      {student.funding.activeContracts[0].amount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mb-2">
                  <div className="text-sm">Contract Type</div>
                  <div className="text-sm font-medium capitalize">
                    {student.funding.activeContracts[0].termsType}
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <div className="text-sm">Term</div>
                  <div className="text-sm font-medium">
                    {student.funding.activeContracts[0].termDetails.months}{" "}
                    months
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Milestones Completed</span>
                    <span>
                      0/{student.funding.activeContracts[0].milestones.length}
                    </span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>
            </div>

            {student.funding.pendingApplications.length > 0 && (
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Pending Applications</h3>
                  <Link
                    href="/funding/applications"
                    className="text-sm text-primary-500 hover:underline"
                  >
                    View All
                  </Link>
                </div>

                {student.funding.pendingApplications.map(
                  (application: any, index: number) => (
                    <div
                      key={index}
                      className="bg-muted rounded-lg p-4 mb-3 last:mb-0"
                    >
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Investor
                          </div>
                          <div className="font-medium">Education Forward</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            Amount
                          </div>
                          <div className="font-medium">
                            ${application.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Status</span>
                        <span className="capitalize text-warning-600 dark:text-warning-400">
                          {application.status}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            <div className="pt-4">
              <Link href="/funding/apply">
                <Button className="w-full" variant="default">
                  Apply for Funding
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Courses */}
        <div className="bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recommended Courses</h2>
            <Link href="/marketplace">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="bg-muted rounded-lg overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-32">
                <Image
                  src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80"
                  alt="Data Science Bootcamp"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Premium
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold mb-1">Data Science Bootcamp</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span>DataMasters Academy</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <Award className="h-3 w-3 text-warning-500 mr-1" />
                    <span>4.9</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold">${formatCurrency(1299)}</span>
                  <Link href="/marketplace/course-009">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-32">
                <Image
                  src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80"
                  alt="Machine Learning Masterclass"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold mb-1">
                  Machine Learning Masterclass
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span>AI Institute</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <Award className="h-3 w-3 text-warning-500 mr-1" />
                    <span>4.7</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold">${formatCurrency(799)}</span>
                  <Link href="/marketplace/course-010">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/marketplace">
                <Button className="w-full" variant="secondary">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Community Activity */}
        <div className="bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Community Activity</h2>
            <Link href="/community">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                alt="David Nguyen"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">David Nguyen</div>
                <p className="text-sm text-muted-foreground mb-2">
                  Started a new study group: "Advanced Machine Learning
                  Algorithms"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    2 hours ago
                  </span>
                  <Button variant="ghost" size="sm">
                    Join
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                alt="Sarah Johnson"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">Sarah Johnson</div>
                <p className="text-sm text-muted-foreground mb-2">
                  Posted a new resource: "Ultimate Guide to Python Libraries for
                  Data Science"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Yesterday
                  </span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                alt="Michael Lee"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">Michael Lee</div>
                <p className="text-sm text-muted-foreground mb-2">
                  Is offering peer teaching sessions on "React Hooks and Context
                  API"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    2 days ago
                  </span>
                  <Button variant="ghost" size="sm">
                    Register
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/community">
                <Button className="w-full" variant="secondary">
                  Engage With Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Career Opportunities */}
        <div className="bg-background rounded-xl shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Career Opportunities</h2>
            <Link href="/careers">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <Image
                    src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                    alt="TechInnovate"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Junior ML Engineer</h3>
                  <div className="text-sm text-muted-foreground">
                    TechInnovate • San Francisco, CA
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 px-2 py-1 rounded-full">
                  Machine Learning
                </span>
                <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 px-2 py-1 rounded-full">
                  Python
                </span>
                <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 px-2 py-1 rounded-full">
                  TensorFlow
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="font-medium">
                    ${formatCurrency(85000)} - ${formatCurrency(110000)}
                  </span>
                </div>
                <Link href="/careers/job-001">
                  <Button size="sm">Apply</Button>
                </Link>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <Image
                    src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                    alt="DataSci Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Data Analyst</h3>
                  <div className="text-sm text-muted-foreground">
                    DataSci Solutions • Remote
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 px-2 py-1 rounded-full">
                  SQL
                </span>
                <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 px-2 py-1 rounded-full">
                  Data Visualization
                </span>
                <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 px-2 py-1 rounded-full">
                  Python
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="font-medium">
                    ${formatCurrency(70000)} - ${formatCurrency(90000)}
                  </span>
                </div>
                <Link href="/careers/job-002">
                  <Button size="sm">Apply</Button>
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/career-simulator">
                <Button className="w-full" variant="secondary">
                  Career Simulator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
