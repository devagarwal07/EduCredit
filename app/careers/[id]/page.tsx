"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building,
  Wifi,
  Users,
  CalendarDays,
  FileText,
  CheckCircle2,
  ChevronRight,
  Share2,
  Bookmark,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

// Mock data fetch for a specific job
const fetchJob = async (id: string) => {
  try {
    // In a real app, this would fetch from an API
    const jobs = [
      {
        id: "job-001",
        title: "Machine Learning Engineer",
        company: "TechInnovate",
        location: "San Francisco, CA",
        remote: "Hybrid",
        salary: { min: 120000, max: 160000 },
        type: "Full-time",
        postedDate: "2025-03-15T14:30:00Z",
        applicationDeadline: "2025-04-15T23:59:59Z",
        description:
          "Join our AI team to develop cutting-edge machine learning models for our product suite. You'll be working on challenging problems in computer vision, natural language processing, and recommendation systems. This role offers an opportunity to innovate and make a significant impact in how our customers interact with technology.",
        responsibilities: [
          "Design, develop and optimize machine learning models and algorithms",
          "Collaborate with product and engineering teams to integrate ML solutions",
          "Research and implement state-of-the-art ML techniques",
          "Improve model performance through continuous experimentation",
          "Analyze and interpret complex datasets to derive insights",
        ],
        requirements: [
          "Bachelor's or Master's degree in Computer Science, Machine Learning, or related field",
          "3+ years of professional experience in machine learning or related field",
          "Strong proficiency in Python and ML frameworks (TensorFlow, PyTorch)",
          "Experience with data processing, feature engineering, and model validation",
          "Knowledge of modern deep learning architectures",
          "Excellent communication and collaboration skills",
        ],
        benefits: [
          "Competitive salary and equity package",
          "Comprehensive health, dental, and vision insurance",
          "Flexible work arrangements",
          "Professional development budget",
          "401(k) matching",
          "Paid parental leave",
          "Regular team events and retreats",
        ],
        logo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGxvZ298ZW58MHx8MHx8fDA%3D",
        skills: [
          "Machine Learning",
          "Python",
          "TensorFlow",
          "PyTorch",
          "Deep Learning",
          "Data Science",
          "AI",
        ],
        companyDescription:
          "TechInnovate is a leading AI technology company focused on developing intelligent solutions that transform how businesses operate. Our mission is to make artificial intelligence accessible, ethical, and impactful for organizations of all sizes. Founded in 2018, we've grown to a team of over 150 professionals dedicated to pushing the boundaries of what's possible with AI.",
        companySize: "100-200 employees",
        companyIndustry: "Artificial Intelligence",
        companyWebsite: "https://techinnovate.example.com",
      },
    ];

    return jobs.find((job) => job.id === id) || null;
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error);
    return null;
  }
};

// Mock data for user skills
const fetchUserSkills = async () => {
  return [
    { name: "Python", level: 85 },
    { name: "Machine Learning", level: 75 },
    { name: "TensorFlow", level: 70 },
    { name: "Data Science", level: 80 },
    { name: "Deep Learning", level: 65 },
  ];
};

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchScore, setMatchScore] = useState(0);
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const jobData = await fetchJob(id as string);
      const skills = await fetchUserSkills();

      setJob(jobData);
      setUserSkills(skills);

      // Calculate match score based on required skills and user skills
      if (jobData && skills.length > 0) {
        const relevantSkills = skills.filter((skill) =>
          jobData.skills.some(
            (jobSkill: string) =>
              jobSkill.toLowerCase().includes(skill.name.toLowerCase()) ||
              skill.name.toLowerCase().includes(jobSkill.toLowerCase())
          )
        );

        const score = Math.min(
          100,
          Math.round(
            (relevantSkills.length / Math.min(5, jobData.skills.length)) * 100
          )
        );
        setMatchScore(score);
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const handleApply = async () => {
    setIsApplying(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsApplying(false);
    setIsApplied(true);
  };

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container py-12">
        <div className="bg-background border border-border rounded-xl shadow-sm p-12 text-center">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Job not found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            The job posting you're looking for doesn't exist or has been
            removed.
          </p>
          <Link href="/careers">
            <Button>Browse All Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link
          href="/careers"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main job details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20 overflow-hidden rounded-lg">
                  <Image
                    src={job.logo}
                    alt={job.company}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                <div className="text-lg text-muted-foreground mb-4">
                  {job.company}
                </div>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <span>{job.remote}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>
                      ${formatCurrency(job.salary.min)} - $
                      {formatCurrency(job.salary.max)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 py-4 border-t border-b">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Posted: {formatDate(job.postedDate)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Apply by: {formatDate(job.applicationDeadline)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {job.responsibilities.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {job.requirements.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {job.benefits.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>

            <div className="space-y-4">
              <p className="text-muted-foreground">{job.companyDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Company Size
                    </div>
                    <div className="font-medium">{job.companySize}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Industry
                    </div>
                    <div className="font-medium">{job.companyIndustry}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={job.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center"
                >
                  Visit company website
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-background border border-border rounded-xl shadow-sm p-6 sticky top-20">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Your Match Score</h2>

              <div className="relative mb-4">
                <div className="text-center mb-2">
                  <span className="text-4xl font-bold">{matchScore}%</span>
                </div>
                <Progress value={matchScore} className="h-3" />
              </div>

              <div className="p-4 bg-muted rounded-lg mb-6">
                <h3 className="font-medium mb-2">Skills Analysis</h3>

                <div className="space-y-3">
                  {userSkills.map((skill) => {
                    const isRelevant = job.skills.some(
                      (jobSkill: string) =>
                        jobSkill
                          .toLowerCase()
                          .includes(skill.name.toLowerCase()) ||
                        skill.name
                          .toLowerCase()
                          .includes(jobSkill.toLowerCase())
                    );

                    return (
                      <div
                        key={skill.name}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          {isRelevant ? (
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                          ) : (
                            <span className="w-4" />
                          )}
                          <span className={isRelevant ? "font-medium" : ""}>
                            {skill.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={skill.level}
                            className="w-20 h-1.5"
                          />
                          <span className="text-xs font-medium w-5 text-right">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isApplied ? (
                <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-lg mb-4">
                  <h3 className="font-medium text-primary mb-1">
                    Application Submitted!
                  </h3>
                  <p className="text-sm">
                    Your application has been sent. The company will review your
                    profile and contact you if there's a match.
                  </p>
                </div>
              ) : (
                <Button
                  size="lg"
                  className="w-full mb-4"
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  {isApplying ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                      Applying...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-medium mb-3">Similar Jobs</h3>
              <Link href="/careers">
                <Button variant="link" className="px-0 text-primary">
                  Browse related positions
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
