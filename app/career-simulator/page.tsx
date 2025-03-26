"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  LineChart,
  MapPin,
  DollarSign,
  Briefcase,
  GraduationCap,
  TrendingUp,
  User,
  Building,
  Clock,
  CheckCircle2,
  BadgeCheck,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { generateCareerPathRecommendations } from "@/lib/gemini-api";
import { formatCurrency } from "@/lib/utils";

// Mock fetch functions to be replaced with real API calls
const fetchUserSkills = async () => {
  try {
    const response = await fetch("/data/students.json");
    const students = await response.json();
    return students[0].skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};

const fetchUserProfile = async () => {
  try {
    const response = await fetch("/data/students.json");
    const students = await response.json();
    return students[0];
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export default function CareerSimulator() {
  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedCareerPath, setSelectedCareerPath] = useState<any>(null);
  const [careerRecommendations, setCareerRecommendations] = useState<any>(null);
  const [userInterests, setUserInterests] = useState<string[]>([
    "Machine Learning",
    "Data Analysis",
    "Software Development",
  ]);
  const [newInterest, setNewInterest] = useState("");
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const skills = await fetchUserSkills();
      const profile = await fetchUserProfile();

      setUserSkills(skills);
      setUserProfile(profile);
      setLoading(false);

      // Generate initial recommendations
      generateRecommendations(skills, profile);
    };

    loadData();
  }, []);

  const generateRecommendations = async (skills: any[], profile: any) => {
    setLoadingRecommendations(true);
    try {
      // This would use the real Gemini API in production
      // For now, we'll simulate a response
      // In real implementation we'd call:
      // const recommendations = await generateCareerPathRecommendations(
      //   skills,
      //   userInterests,
      //   profile.bio || "Student with programming experience"
      // )

      // Simulated response
      const recommendations = {
        careerPaths: [
          {
            title: "Machine Learning Engineer",
            suitabilityScore: 87,
            requiredSkills: [
              "Python",
              "Machine Learning",
              "Statistics",
              "TensorFlow",
            ],
            currentMatchPercentage: 75,
            salaryCap: "$130,000",
            recommendations: [
              "Take a specialized deep learning course",
              "Build a portfolio of ML projects",
              "Learn cloud-based ML deployment",
            ],
          },
          {
            title: "Data Scientist",
            suitabilityScore: 82,
            requiredSkills: [
              "Python",
              "Statistics",
              "Data Visualization",
              "SQL",
            ],
            currentMatchPercentage: 80,
            salaryCap: "$125,000",
            recommendations: [
              "Enhance SQL query optimization skills",
              "Learn Tableau or Power BI",
              "Take a course on experimental design",
            ],
          },
          {
            title: "Full Stack Developer",
            suitabilityScore: 78,
            requiredSkills: ["JavaScript", "React", "Node.js", "SQL"],
            currentMatchPercentage: 65,
            salaryCap: "$115,000",
            recommendations: [
              "Build experience with backend frameworks",
              "Learn about API design and development",
              "Complete projects with database integration",
            ],
          },
        ],
      };

      setCareerRecommendations(recommendations);

      // Default to first recommendation
      if (recommendations.careerPaths.length > 0 && !selectedCareerPath) {
        setSelectedCareerPath(recommendations.careerPaths[0]);
      }
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !userInterests.includes(newInterest.trim())) {
      setUserInterests([...userInterests, newInterest.trim()]);
      setNewInterest("");

      // Regenerate recommendations with new interests
      if (userSkills.length > 0 && userProfile) {
        generateRecommendations(userSkills, userProfile);
      }
    }
  };

  const removeInterest = (interest: string) => {
    setUserInterests(userInterests.filter((i) => i !== interest));

    // Regenerate recommendations with updated interests
    if (userSkills.length > 0 && userProfile) {
      generateRecommendations(userSkills, userProfile);
    }
  };

  // Timeline animation with GSAP
  useEffect(() => {
    if (selectedCareerPath && timelineRef.current) {
      const timelineItems =
        timelineRef.current.querySelectorAll(".timeline-item");

      gsap.fromTo(
        timelineItems,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [selectedCareerPath]);

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading career simulator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Career Simulator</h1>
          <p className="text-muted-foreground mt-2">
            Explore potential career paths based on your skills and interests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-6">Your Profile</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Top Skills</h3>
              <div className="space-y-3">
                {userSkills
                  .sort((a, b) => b.level - a.level)
                  .slice(0, 5)
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        <span>{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={skill.level} className="w-20 h-2" />
                        <span className="text-sm font-medium">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-3">
                <Link href="/skill-assessment">
                  <Button variant="outline" size="sm" className="w-full">
                    Add More Skills
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Career Interests</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {userInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="outline"
                    className="cursor-pointer"
                  >
                    {interest}
                    <button
                      className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => removeInterest(interest)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add interest..."
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addInterest();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={addInterest} size="sm">
                  Add
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Experience Level</h3>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Entry Level</span>
                    <span>Expert</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Preferred Locations</h3>
              <div className="space-y-2">
                {userProfile.career.preferredLocations.map(
                  (location: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>{location}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => generateRecommendations(userSkills, userProfile)}
              isLoading={loadingRecommendations}
            >
              Regenerate Recommendations
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {loadingRecommendations ? (
            <div className="bg-background border border-border rounded-xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[300px]">
              <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium">
                Generating career recommendations...
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Using AI to analyze your skills and interests for the best
                career matches
              </p>
            </div>
          ) : careerRecommendations ? (
            <>
              <div className="bg-background border border-border rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">
                  Recommended Career Paths
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {careerRecommendations.careerPaths.map(
                    (path: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <button
                          className={`w-full p-4 rounded-lg border text-left transition-colors ${
                            selectedCareerPath?.title === path.title
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedCareerPath(path)}
                        >
                          <div className="font-semibold mb-2">{path.title}</div>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm text-muted-foreground">
                              Match Score
                            </div>
                            <div className="text-sm font-medium">
                              {path.suitabilityScore}%
                            </div>
                          </div>
                          <Progress
                            value={path.suitabilityScore}
                            className="h-1.5"
                          />
                        </button>
                      </motion.div>
                    )
                  )}
                </div>
              </div>

              {selectedCareerPath && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-background border border-border rounded-xl shadow-sm p-6"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedCareerPath.title}
                      </h2>
                      <p className="text-muted-foreground">
                        Career path analysis based on your profile
                      </p>
                    </div>
                    <Badge
                      variant={
                        selectedCareerPath.suitabilityScore > 80
                          ? "default"
                          : "outline"
                      }
                      className="text-sm"
                    >
                      {selectedCareerPath.suitabilityScore}% Match
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Potential Salary</h3>
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {selectedCareerPath.salaryCap}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Average max compensation
                      </p>
                    </div>

                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="h-5 w-5 text-secondary" />
                        <h3 className="font-semibold">Open Positions</h3>
                      </div>
                      <div className="text-2xl font-bold mb-1">1,240+</div>
                      <p className="text-sm text-muted-foreground">
                        Current job openings
                      </p>
                    </div>

                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-5 w-5 text-accent" />
                        <h3 className="font-semibold">Growth Rate</h3>
                      </div>
                      <div className="text-2xl font-bold mb-1">+18%</div>
                      <p className="text-sm text-muted-foreground">
                        Expected job growth (5yr)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Skill Analysis
                      </h3>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Skill Match</span>
                          <span className="font-medium">
                            {selectedCareerPath.currentMatchPercentage}%
                          </span>
                        </div>
                        <Progress
                          value={selectedCareerPath.currentMatchPercentage}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-3">
                        {selectedCareerPath.requiredSkills.map(
                          (skill: string, index: number) => {
                            const userSkill = userSkills.find(
                              (s) => s.name === skill
                            );
                            const hasSkill = !!userSkill;

                            return (
                              <div
                                key={index}
                                className="flex justify-between items-center p-2 rounded-lg bg-muted"
                              >
                                <div className="flex items-center gap-2">
                                  {hasSkill ? (
                                    <CheckCircle2 className="h-4 w-4 text-accent" />
                                  ) : (
                                    <Target className="h-4 w-4 text-warning" />
                                  )}
                                  <span>{skill}</span>
                                </div>
                                {hasSkill ? (
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={userSkill.level}
                                      className="w-16 h-1.5"
                                    />
                                    <span className="text-xs font-medium">
                                      {userSkill.level}/100
                                    </span>
                                  </div>
                                ) : (
                                  <Badge variant="outline" className="text-xs">
                                    Needed
                                  </Badge>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Action Plan
                      </h3>

                      <div className="space-y-4" ref={timelineRef}>
                        {selectedCareerPath.recommendations.map(
                          (recommendation: string, index: number) => (
                            <div
                              key={index}
                              className="timeline-item flex items-start gap-3 p-3 rounded-lg bg-muted"
                            >
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-medium">
                                  {recommendation}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {index === 0
                                    ? "Immediate priority"
                                    : index === 1
                                    ? "Within 3 months"
                                    : "Within 6 months"}
                                </div>
                              </div>
                            </div>
                          )
                        )}

                        <div className="timeline-item flex items-start gap-3 p-3 rounded-lg bg-muted">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300 text-sm font-medium">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">
                              Ready for job applications
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              After completing the recommended steps
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Top Companies Hiring
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Building className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">TechInnovate</div>
                          <div className="text-sm text-muted-foreground">
                            San Francisco, CA
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Building className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">DataSci Solutions</div>
                          <div className="text-sm text-muted-foreground">
                            Remote
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Building className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">AI Research Lab</div>
                          <div className="text-sm text-muted-foreground">
                            Boston, MA
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Building className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Global Tech</div>
                          <div className="text-sm text-muted-foreground">
                            Austin, TX
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link href="/marketplace">
                      <Button size="lg" className="w-full sm:w-auto">
                        Find Relevant Courses
                        <GraduationCap className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>

                    <Link href="/careers">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        Explore Job Opportunities
                        <Briefcase className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div className="bg-background border border-border rounded-xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[300px]">
              <div className="text-center max-w-md">
                <h3 className="text-xl font-semibold mb-3">
                  No Recommendations Generated
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add more skills and interests to generate career
                  recommendations that match your profile.
                </p>
                <Button
                  onClick={() =>
                    generateRecommendations(userSkills, userProfile)
                  }
                >
                  Generate Recommendations
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
