"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SkillGraph } from "@/components/visualizations/skill-graph";
import {
  BadgeCheck,
  ArrowRight,
  Search,
  Clock,
  BarChart,
  Award,
  Shield,
  Plus,
  Filter,
  Briefcase,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { generateSkillQuestions } from "@/lib/gemini-api";
import { cn } from "@/lib/utils";

// Mock data fetch - replace with actual API calls later
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

const fetchAvailableSkills = async () => {
  try {
    const response = await fetch("/data/skills.json");
    return await response.json();
  } catch (error) {
    console.error("Error fetching skills catalog:", error);
    return [];
  }
};

export default function SkillAssessment() {
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [availableSkills, setAvailableSkills] = useState<any[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("my-skills");

  // For assessment flow
  const [assessmentMode, setAssessmentMode] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [assessmentQuestions, setAssessmentQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    level: number;
    feedback: string;
  } | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const skills = await fetchUserSkills();
      const catalog = await fetchAvailableSkills();

      setUserSkills(skills);
      setAvailableSkills(catalog);
      setFilteredSkills(catalog);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter skills based on search query and category
    if (availableSkills.length > 0) {
      let filtered = [...availableSkills];

      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (skill) =>
            skill.name.toLowerCase().includes(lowerQuery) ||
            skill.category.toLowerCase().includes(lowerQuery) ||
            skill.description.toLowerCase().includes(lowerQuery)
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(
          (skill) => skill.category === selectedCategory
        );
      }

      setFilteredSkills(filtered);
    }
  }, [searchQuery, selectedCategory, availableSkills]);

  const startAssessment = async (skill: any) => {
    setSelectedSkill(skill);
    setAssessmentMode(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setAssessmentComplete(false);
    setAssessmentResult(null);

    setLoadingQuestions(true);
    try {
      // Generate questions using Gemini API
      const questions = await generateSkillQuestions(
        skill.name,
        "intermediate"
      );
      setAssessmentQuestions(questions);
    } catch (error) {
      console.error("Error generating questions:", error);
      // Fallback to sample questions if API fails
      setAssessmentQuestions([
        {
          question: `What is a key feature of ${skill.name}?`,
          options: [
            "Sample answer 1",
            "Sample answer 2",
            "Sample answer 3",
            "Sample answer 4",
          ],
          correctAnswer: 1,
          explanation: "This is a sample explanation.",
        },
        {
          question: `How would you implement ${skill.name} in a project?`,
          options: [
            "Sample approach 1",
            "Sample approach 2",
            "Sample approach 3",
            "Sample approach 4",
          ],
          correctAnswer: 2,
          explanation: "This is a sample explanation.",
        },
      ]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const answerQuestion = (optionIndex: number) => {
    // Store the user's answer
    const updatedAnswers = [...userAnswers, optionIndex];
    setUserAnswers(updatedAnswers);

    // Move to next question or complete assessment
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      completeAssessment(updatedAnswers);
    }
  };

  const completeAssessment = (answers: number[]) => {
    setAssessmentComplete(true);

    // Calculate result (in real implementation, this would use the Gemini API)
    const correctAnswers = answers.filter(
      (answer, index) => answer === assessmentQuestions[index].correctAnswer
    ).length;

    const score = Math.round(
      (correctAnswers / assessmentQuestions.length) * 100
    );

    setAssessmentResult({
      level: score,
      feedback: `
        <p>You answered ${correctAnswers} out of ${assessmentQuestions.length} questions correctly.</p>
        <p class="mt-4"><strong>Strengths:</strong> You demonstrated good understanding of the core concepts.</p>
        <p class="mt-2"><strong>Areas for improvement:</strong> Consider focusing on advanced techniques and practical applications.</p>
        <p class="mt-4"><strong>Recommended resources:</strong></p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li>"Advanced ${selectedSkill.name}" by TechEd Academy</li>
          <li>${selectedSkill.name} Documentation</li>
        </ul>
      `,
    });

    // In a real implementation, we would update the user's skill in the database
    if (score > 0) {
      // Check if user already has this skill
      const existingSkillIndex = userSkills.findIndex(
        (s) => s.name === selectedSkill.name
      );

      if (existingSkillIndex >= 0) {
        // Update existing skill
        const updatedSkills = [...userSkills];
        updatedSkills[existingSkillIndex] = {
          ...updatedSkills[existingSkillIndex],
          level: score,
          lastVerified: new Date().toISOString(),
        };
        setUserSkills(updatedSkills);
      } else {
        // Add new skill
        const newSkill = {
          id: `skill-${Date.now()}`,
          name: selectedSkill.name,
          level: score,
          lastVerified: new Date().toISOString(),
          endorsements: 0,
        };
        setUserSkills([...userSkills, newSkill]);
      }
    }
  };

  const resetAssessment = () => {
    setAssessmentMode(false);
    setSelectedSkill(null);
    setAssessmentQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setAssessmentComplete(false);
    setAssessmentResult(null);
  };

  // Get unique categories from available skills
  const categories = [
    ...new Set(availableSkills.map((skill) => skill.category)),
  ];

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading skill assessment...</p>
        </div>
      </div>
    );
  }

  // Assessment mode takes over the UI
  if (assessmentMode) {
    return (
      <div className="container py-12 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={resetAssessment} className="mb-4">
            ← Back to Skills
          </Button>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              {selectedSkill.name} Assessment
            </h1>
            {!assessmentComplete && (
              <Badge variant="outline" className="text-sm">
                Question {currentQuestionIndex + 1} of{" "}
                {assessmentQuestions.length}
              </Badge>
            )}
          </div>

          <div className="mt-2 text-muted-foreground">
            {selectedSkill.description}
          </div>
        </div>

        {loadingQuestions ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium">
              Generating assessment questions...
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Using AI to create personalized questions for your skill level
            </p>
          </div>
        ) : assessmentComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background border border-border rounded-xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {assessmentResult?.level}
                  </span>
                </div>
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
                    strokeWidth="5"
                    strokeOpacity="0.1"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="5"
                    strokeDasharray="282.74"
                    initial={{ strokeDashoffset: 282.74 }}
                    animate={{
                      strokeDashoffset:
                        282.74 * (1 - (assessmentResult?.level || 0) / 100),
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Assessment Complete</h2>
                <p className="text-muted-foreground">
                  Your {selectedSkill.name} skill level has been verified
                </p>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b">
              <h3 className="text-lg font-semibold mb-2">
                Skill Level: {assessmentResult?.level}/100
              </h3>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: assessmentResult?.feedback || "",
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={resetAssessment} size="lg">
                Return to Skills
              </Button>
              <Link href="/marketplace">
                <Button variant="outline" size="lg">
                  Find Courses to Improve
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-background border border-border rounded-xl p-8 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-6">
                {assessmentQuestions[currentQuestionIndex]?.question}
              </h2>

              <div className="space-y-3 mb-6">
                {assessmentQuestions[currentQuestionIndex]?.options.map(
                  (option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => answerQuestion(index)}
                      className="w-full p-4 text-left rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  )
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  <Clock className="inline mr-1 h-4 w-4" />
                  Take your time to consider each answer
                </div>
                <Progress
                  value={
                    (currentQuestionIndex / assessmentQuestions.length) * 100
                  }
                  className="w-24 h-2"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Skill Assessment</h1>
          <p className="text-muted-foreground mt-2">
            Verify your skills and showcase your expertise to employers and
            investors
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/marketplace">
            Find Learning Resources
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex border-b mb-8">
        <button
          className={cn(
            "px-4 py-2 font-medium text-sm transition-colors relative",
            activeTab === "my-skills"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab("my-skills")}
        >
          My Skills
          {activeTab === "my-skills" && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layoutId="activeTab"
            />
          )}
        </button>

        <button
          className={cn(
            "px-4 py-2 font-medium text-sm transition-colors relative",
            activeTab === "add-skills"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab("add-skills")}
        >
          Add New Skills
          {activeTab === "add-skills" && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layoutId="activeTab"
            />
          )}
        </button>
      </div>

      {activeTab === "my-skills" ? (
        <>
          <div className="bg-background border border-border rounded-xl p-6 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold">Your Verified Skills</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  <span>{userSkills.length} Verified Skills</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full">
                  <Shield className="h-4 w-4 text-accent" />
                  <span>Blockchain Secured</span>
                </div>
              </div>
            </div>

            {userSkills.length > 0 ? (
              <div className="h-[400px] mb-6">
                <SkillGraph skills={userSkills} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-muted rounded-lg">
                <BadgeCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No Verified Skills Yet
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Start by adding and verifying your skills to showcase your
                  expertise to potential employers and investors.
                </p>
                <Button onClick={() => setActiveTab("add-skills")}>
                  Add Your First Skill
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {userSkills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Skill Details</h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {userSkills.map((skill) => {
                    // Calculate days since verification
                    const lastVerified = new Date(skill.lastVerified);
                    const now = new Date();
                    const daysSince = Math.floor(
                      (now.getTime() - lastVerified.getTime()) /
                        (1000 * 60 * 60 * 24)
                    );
                    const isRecent = daysSince < 30;

                    return (
                      <div
                        key={skill.id}
                        className="bg-muted p-4 rounded-lg border border-border hover:border-primary transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold">{skill.name}</h4>
                          <Badge
                            variant={isRecent ? "default" : "outline"}
                            className="ml-2"
                          >
                            {isRecent ? "Recent" : `${daysSince}d ago`}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Progress
                            value={skill.level}
                            className="flex-1 h-2"
                          />
                          <span className="text-sm font-medium w-10 text-right">
                            {skill.level}/100
                          </span>
                        </div>

                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            <span>{skill.endorsements} endorsements</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const fullSkill = availableSkills.find(
                                (s) => s.name === skill.name
                              ) || {
                                name: skill.name,
                                description: `${skill.name} skills and knowledge`,
                                category: "Other",
                              };
                              startAssessment(fullSkill);
                            }}
                          >
                            Re-verify
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Job Market Impact</h2>
              <Button variant="outline" size="sm">
                View Full Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Job Opportunities</h3>
                </div>
                <div className="text-3xl font-bold mb-2">247</div>
                <p className="text-sm text-muted-foreground">
                  Jobs matching your verified skills in your preferred locations
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart className="h-5 w-5 text-secondary" />
                  <h3 className="font-semibold">Salary Potential</h3>
                </div>
                <div className="text-3xl font-bold mb-2">$94,500</div>
                <p className="text-sm text-muted-foreground">
                  Average salary based on your highest-level skills
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUpRight className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">Skill Gaps</h3>
                </div>
                <div className="text-3xl font-bold mb-2">3 Key Skills</div>
                <p className="text-sm text-muted-foreground">
                  Add these skills to unlock 40% more opportunities
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search skills..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </Button>

              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => {
              // Check if user already has this skill
              const userSkill = userSkills.find((s) => s.name === skill.name);
              const isVerified = !!userSkill;

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-muted p-5 rounded-lg border border-border hover:border-primary/50 transition-all card-hover"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {skill.category}
                      </p>
                    </div>
                    {isVerified ? (
                      <Badge className="bg-accent hover:bg-accent">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Verified</Badge>
                    )}
                  </div>

                  <p className="text-sm mb-4 line-clamp-2">
                    {skill.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Market Demand</span>
                      <span className="font-medium">
                        {skill.demandScore}/100
                      </span>
                    </div>
                    <Progress value={skill.demandScore} className="h-1" />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 px-2 py-1 rounded-full">
                      Salary: +${skill.averageSalaryImpact.toLocaleString()}
                    </div>
                    <div className="text-xs bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300 px-2 py-1 rounded-full">
                      Growth: {skill.growthRate}%
                    </div>
                  </div>

                  <div className="flex justify-between">
                    {isVerified ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => startAssessment(skill)}
                      >
                        Re-verify ({userSkill.level}/100)
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => startAssessment(skill)}
                      >
                        Verify Skill
                        <BadgeCheck className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredSkills.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 bg-muted rounded-lg">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Skills Found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                We couldn't find any skills matching your search. Try a
                different search term or category.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
