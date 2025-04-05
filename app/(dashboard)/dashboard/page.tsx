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

const fetchStudentData = async () => {
  try {
    const response = await fetch("/data/students.json");
    const students = await response.json();
    return students[0];
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
};

export default function Dashboard() {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchStudentData();
      setStudent(data);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      // Animation timeline
      const tl = gsap.timeline();

      // Animate headline
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }

      // Animate timeline items
      if (timelineRef.current) {
        tl.fromTo(
          timelineRef.current.querySelectorAll(".timeline-item"),
          {
            opacity: 0,
            y: 20,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      return () => {
        tl.kill(); // Clean up animation
      };
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center py-24">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.1) 25%, rgba(45, 212, 191, 0.05) 50%, transparent 80%)",
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-gray-200">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.1) 25%, rgba(45, 212, 191, 0.05) 50%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(14,165,233,0.15) 0, rgba(0,0,0,0) 80%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 ref={headlineRef} className="text-4xl font-bold mb-8">
            <span className="gradient-text">Your Dashboard</span>
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Welcome and Overview Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/3 bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={student.avatar}
                alt={student.name}
                width={64}
                height={64}
                className="rounded-full border-2 border-indigo-400"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Welcome back, {student.name.split(" ")[0]}!
                </h2>
                <p className="text-gray-400">Last login: Today at 9:45 AM</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <BadgeCheck className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm font-medium text-gray-300">
                    Verified Skills
                  </span>
                </div>
                <span className="text-2xl font-bold text-white">
                  {student.skills.length}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <LineChart className="h-5 w-5 text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">
                    Credit Score
                  </span>
                </div>
                <span className="text-2xl font-bold text-white">
                  {student.educationCreditScore}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-teal-400" />
                  <span className="text-sm font-medium text-gray-300">
                    Learning Streak
                  </span>
                </div>
                <span className="text-2xl font-bold text-white">
                  {student.learning.streak} days
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-amber-400" />
                  <span className="text-sm font-medium text-gray-300">
                    Funding
                  </span>
                </div>
                <span className="text-2xl font-bold text-white">
                  ${student.funding.received.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">
                  Current Learning Progress
                </h3>
                <Link
                  href="/learning"
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  View All
                </Link>
              </div>

              {student.learning.currentCourses.map(
                (course: any, index: number) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">
                        {course.title}
                      </span>
                      <span className="text-sm font-medium text-gray-300">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">Upcoming Deadlines</h3>
                <Link
                  href="/calendar"
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
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
                      (dueDate.getTime() - now.getTime()) /
                      (1000 * 60 * 60 * 24)
                    );
                    const isUrgent = daysLeft <= 7;

                    return (
                      <div
                        key={index}
                        className="timeline-item flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                      >
                        <div
                          className={`p-2 rounded-full ${isUrgent
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-indigo-500/20 text-indigo-400"
                            }`}
                        >
                          {isUrgent ? (
                            <AlertCircle className="h-5 w-5" />
                          ) : (
                            <Calendar className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">
                            {milestone.description}
                          </div>
                          <div className="text-sm text-gray-400 flex justify-between">
                            <span>
                              Due:{" "}
                              {new Date(milestone.dueDate).toLocaleDateString()}
                            </span>
                            {isUrgent && (
                              <span className="text-amber-400">
                                {daysLeft} days left
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-white">
                            ${milestone.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            Milestone Value
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}

                <div className="timeline-item flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="p-2 rounded-full bg-teal-500/20 text-teal-400">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">
                      Interview with TechCorp Inc.
                    </div>
                    <div className="text-sm text-gray-400">
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
                    <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                      Prepare
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skill Visualization Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/3 bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Your Skills</h2>
              <Link href="/skill-assessment">
                <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                  Add Skills
                </button>
              </Link>
            </div>

            <div className="h-[300px] mb-6">
              <SkillGraph skills={student.skills} />
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-white">Top Skills</h3>
              {student.skills
                .sort((a: any, b: any) => b.level - a.level)
                .slice(0, 3)
                .map((skill: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {skill.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          Verified{" "}
                          {new Date(skill.lastVerified).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {skill.level}/100
                    </div>
                  </div>
                ))}

              <div className="pt-4">
                <Link href="/skill-assessment">
                  <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all">
                    View All Skills
                    <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Learning Path Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Learning Journey</h2>
              <Link href="/career-simulator">
                <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                  Career Simulator
                </button>
              </Link>
            </div>

            <div className="h-[300px]">
              <LearningPathTimeline
                completedCourses={student.learning.completedCourses}
                currentCourses={student.learning.currentCourses}
                careerObjectives={student.career.objectives}
              />
            </div>
          </motion.div>

          {/* Funding Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Funding Overview</h2>
              <Link href="/funding">
                <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                  Find Investors
                </button>
              </Link>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-white">Active Contract</h3>
                  <Link
                    href={`/funding/contracts/${student.funding.activeContracts[0].id}`}
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View Details
                  </Link>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
                  <div className="flex justify-between mb-3">
                    <div>
                      <div className="text-sm text-gray-400">Investor</div>
                      <div className="font-medium text-white">
                        Future Talents Fund
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Amount</div>
                      <div className="font-medium text-white">
                        $
                        {student.funding.activeContracts[0].amount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mb-2">
                    <div className="text-sm text-gray-400">Contract Type</div>
                    <div className="text-sm font-medium text-gray-300 capitalize">
                      {student.funding.activeContracts[0].termsType}
                    </div>
                  </div>

                  <div className="flex justify-between mb-4">
                    <div className="text-sm text-gray-400">Term</div>
                    <div className="text-sm font-medium text-gray-300">
                      {student.funding.activeContracts[0].termDetails.months}{" "}
                      months
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">
                        Milestones Completed
                      </span>
                      <span className="text-gray-300">
                        0/{student.funding.activeContracts[0].milestones.length}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {student.funding.pendingApplications.length > 0 && (
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-white">
                      Pending Applications
                    </h3>
                    <Link
                      href="/funding/applications"
                      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      View All
                    </Link>
                  </div>

                  {student.funding.pendingApplications.map(
                    (application: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 mb-3 last:mb-0 hover:bg-white/10 transition-all"
                      >
                        <div className="flex justify-between mb-2">
                          <div>
                            <div className="text-sm text-gray-400">
                              Investor
                            </div>
                            <div className="font-medium text-white">
                              Education Forward
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Amount</div>
                            <div className="font-medium text-white">
                              ${application.amount.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Status</span>
                          <span className="capitalize text-amber-400">
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
                  <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all">
                    Apply for Funding
                    <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommended Courses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                Recommended Courses
              </h2>
              <Link href="/marketplace">
                <button className="px-4 py-1 text-sm rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                  View All
                </button>
              </Link>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="relative h-32">
                  <Image
                    src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80"
                    alt="Data Science Bootcamp"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Premium
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1">
                    Data Science Bootcamp
                  </h3>
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span>DataMasters Academy</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Award className="h-3 w-3 text-amber-400 mr-1" />
                      <span>4.9</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">
                      ${formatCurrency(1299)}
                    </span>
                    <Link href="/marketplace/course-009">
                      <button className="px-4 py-1 text-sm rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                <div className="relative h-32">
                  <Image
                    src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80"
                    alt="Machine Learning Masterclass"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1">
                    Machine Learning Masterclass
                  </h3>
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span>AI Institute</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Award className="h-3 w-3 text-amber-400 mr-1" />
                      <span>4.7</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">
                      ${formatCurrency(799)}
                    </span>
                    <Link href="/marketplace/course-010">
                      <button className="px-4 py-1 text-sm rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/marketplace">
                  <button className="w-full px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all group">
                    Explore Marketplace
                    <ArrowRight className="ml-2 h-4 w-4 inline transform transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Community Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                Community Activity
              </h2>
              <Link href="/community">
                <button className="px-4 py-1 text-sm rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                  View All
                </button>
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                  alt="David Nguyen"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium text-white">David Nguyen</div>
                  <p className="text-sm text-gray-400 mb-2">
                    Started a new study group: "Advanced Machine Learning
                    Algorithms"
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">2 hours ago</span>
                    <button className="px-3 py-1 text-sm rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                      Join
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                  alt="Sarah Johnson"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium text-white">Sarah Johnson</div>
                  <p className="text-sm text-gray-400 mb-2">
                    Posted a new resource: "Ultimate Guide to Python Libraries
                    for Data Science"
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Yesterday</span>
                    <button className="px-3 py-1 text-sm rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                      View
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                  alt="Michael Lee"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium text-white">Michael Lee</div>
                  <p className="text-sm text-gray-400 mb-2">
                    Is offering peer teaching sessions on "React Hooks and
                    Context API"
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">2 days ago</span>
                    <button className="px-3 py-1 text-sm rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                      Register
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/community">
                  <button className="w-full px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all group">
                    Engage With Community
                    <ArrowRight className="ml-2 h-4 w-4 inline transform transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Career Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-md border border-white/10 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                Career Opportunities
              </h2>
              <Link href="/careers">
                <button className="px-4 py-1 text-sm rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                  View All
                </button>
              </Link>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
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
                    <h3 className="font-semibold text-white">
                      Junior ML Engineer
                    </h3>
                    <div className="text-sm text-gray-400">
                      TechInnovate • San Francisco, CA
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                    Machine Learning
                  </span>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                    Python
                  </span>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                    TensorFlow
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium text-white">
                      ${formatCurrency(85000)} - ${formatCurrency(110000)}
                    </span>
                  </div>
                  <Link href="/careers/job-001">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all">
                      Apply
                    </button>
                  </Link>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
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
                    <h3 className="font-semibold text-white">Data Analyst</h3>
                    <div className="text-sm text-gray-400">
                      DataSci Solutions • Remote
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                    SQL
                  </span>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                    Data Visualization
                  </span>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                    Python
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium text-white">
                      ${formatCurrency(70000)} - ${formatCurrency(90000)}
                    </span>
                  </div>
                  <Link href="/careers/job-002">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all">
                      Apply
                    </button>
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/career-simulator">
                  <button className="w-full px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all group">
                    Career Simulator
                    <ArrowRight className="ml-2 h-4 w-4 inline transform transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global styles to match Hero.tsx */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        /* Gradient text styles */
        .gradient-text {
          background: linear-gradient(to right, #38bdf8, #d946ef, #2dd4bf);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        /* Progress bar styling */
        .progress {
          @apply bg-gray-700 rounded-full overflow-hidden;
        }

        .progress div {
          @apply bg-gradient-to-r from-indigo-500 to-purple-600;
        }
      `}</style>
    </div>
  );
}
