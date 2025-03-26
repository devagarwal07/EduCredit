"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Calendar,
  Clock,
  LineChart,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  File,
  Upload,
  AlertCircle,
  User,
  Edit,
  Check,
} from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

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

// Application steps
const steps = [
  "Personal Information",
  "Education & Skills",
  "Funding Goals",
  "Career Plans",
  "Documentation",
  "Review & Submit",
];

export default function FundingApplicationPage() {
  const [userData, setUserData] = useState<any>(null);
  const [investors, setInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
    },
    education: {
      currentLevel: "Bachelor's",
      institution: "",
      major: "",
      graduationDate: "",
      gpa: "",
      skills: [] as string[],
    },
    funding: {
      amount: "",
      purpose: "",
      timeline: "",
      preferredModel: "Income Share Agreement",
      specificInvestors: [] as string[],
    },
    career: {
      shortTermGoals: "",
      longTermGoals: "",
      targetIndustries: [] as string[],
      targetRoles: [] as string[],
      salaryExpectations: "",
    },
    documents: {
      resume: null,
      transcript: null,
      portfolioLink: "",
      additionalLinks: [] as string[],
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const user = await fetchUserData();
      const investorsData = await fetchInvestors();

      setUserData(user);
      setInvestors(investorsData);

      // Pre-fill form with user data
      if (user) {
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            name: user.name,
            email: user.email,
            phone: "555-123-4567", // Mock phone number
            location: user.location,
            bio: user.bio,
          },
          education: {
            ...prev.education,
            skills: user.skills.map((skill: any) => skill.name),
          },
          career: {
            ...prev.career,
            shortTermGoals: user.career.objectives.join("\n"),
            longTermGoals: "",
            targetIndustries: ["Technology", "Finance"],
            targetRoles: ["Data Scientist", "Machine Learning Engineer"],
            salaryExpectations: user.career.desiredSalary.toString(),
          },
        }));
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // Scroll to top when changing steps
  useEffect(() => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollTo(0, 0);
    }
  }, [currentStep]);

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));

    // Clear error when field is updated
    if (errors[`${section}.${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  const handleNextStep = () => {
    // Validate current step
    const currentErrors: Record<string, string> = {};

    if (currentStep === 0) {
      // Validate personal info
      if (!formData.personalInfo.name)
        currentErrors["personalInfo.name"] = "Name is required";
      if (!formData.personalInfo.email)
        currentErrors["personalInfo.email"] = "Email is required";
      if (!formData.personalInfo.phone)
        currentErrors["personalInfo.phone"] = "Phone number is required";
      if (!formData.personalInfo.location)
        currentErrors["personalInfo.location"] = "Location is required";
    } else if (currentStep === 1) {
      // Validate education
      if (!formData.education.institution)
        currentErrors["education.institution"] = "Institution is required";
      if (!formData.education.major)
        currentErrors["education.major"] = "Major is required";
      if (!formData.education.graduationDate)
        currentErrors["education.graduationDate"] =
          "Graduation date is required";
    } else if (currentStep === 2) {
      // Validate funding
      if (!formData.funding.amount)
        currentErrors["funding.amount"] = "Amount is required";
      if (!formData.funding.purpose)
        currentErrors["funding.purpose"] = "Purpose is required";
      if (!formData.funding.timeline)
        currentErrors["funding.timeline"] = "Timeline is required";
    } else if (currentStep === 3) {
      // Validate career
      if (!formData.career.shortTermGoals)
        currentErrors["career.shortTermGoals"] =
          "Short-term goals are required";
      if (!formData.career.longTermGoals)
        currentErrors["career.longTermGoals"] = "Long-term goals are required";
      if (formData.career.targetIndustries.length === 0)
        currentErrors["career.targetIndustries"] =
          "At least one target industry is required";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    // If validation passes, go to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to submit the application
      console.log("Submitting application:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading application form...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-background rounded-xl shadow-sm border border-border p-8 max-w-2xl w-full text-center"
        >
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-muted-foreground text-lg mb-6">
              Your funding application has been successfully submitted. You will
              receive a confirmation email shortly.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-6 mb-8">
            <div className="text-left mb-4">
              <h3 className="font-semibold mb-2">Application Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Application ID:</span>
                  <span className="font-medium">
                    APP-{Math.floor(Math.random() * 100000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span className="font-medium">
                    {new Date().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Requested Amount:
                  </span>
                  <span className="font-medium">
                    ${formData.funding.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Preferred Funding Model:
                  </span>
                  <span className="font-medium">
                    {formData.funding.preferredModel}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-left">Next Steps</h3>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span>
                    Your application will be reviewed within 3-5 business days.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span>
                    You may be contacted for an interview or additional
                    information.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span>
                    Once approved, you'll receive funding offers to review.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/funding" className="flex-1">
              <Button size="lg" className="w-full">
                View Funding Options
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with steps */}
        <div className="md:w-1/4">
          <div className="bg-background rounded-xl shadow-sm border border-border p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-6">Application Steps</h2>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm 
                      ${
                        currentStep === index
                          ? "bg-primary text-primary-foreground"
                          : currentStep > index
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    {currentStep > index ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`${
                      currentStep === index
                        ? "font-medium"
                        : currentStep > index
                        ? "text-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm">
                <LineChart className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Education Credit Score:
                </span>
                <span className="font-medium">
                  {userData.educationCreditScore}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Funding Eligibility:
                </span>
                <span className="font-medium">
                  Up to ${formatCurrency(userData.educationCreditScore * 100)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main form area */}
        <div ref={formContainerRef} className="md:w-3/4 flex-1 overflow-y-auto">
          <div className="bg-background rounded-xl shadow-sm border border-border p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">Funding Application</h1>
            <p className="text-muted-foreground mb-6">
              Complete the application below to apply for funding from our
              investor network.
            </p>

            <div className="mb-6">
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Application Progress
                  </span>
                  <span className="text-sm">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                  </span>
                </div>
                <Progress
                  value={((currentStep + 1) / steps.length) * 100}
                  className="h-2"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px]"
              >
                {/* Step 1: Personal Information */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Personal Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          value={formData.personalInfo.name}
                          onChange={(e) =>
                            handleInputChange(
                              "personalInfo",
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Your full name"
                          className={
                            errors["personalInfo.name"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["personalInfo.name"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["personalInfo.name"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          value={formData.personalInfo.email}
                          onChange={(e) =>
                            handleInputChange(
                              "personalInfo",
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="your.email@example.com"
                          className={
                            errors["personalInfo.email"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["personalInfo.email"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["personalInfo.email"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input
                          value={formData.personalInfo.phone}
                          onChange={(e) =>
                            handleInputChange(
                              "personalInfo",
                              "phone",
                              e.target.value
                            )
                          }
                          placeholder="555-123-4567"
                          className={
                            errors["personalInfo.phone"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["personalInfo.phone"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["personalInfo.phone"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Location
                        </label>
                        <Input
                          value={formData.personalInfo.location}
                          onChange={(e) =>
                            handleInputChange(
                              "personalInfo",
                              "location",
                              e.target.value
                            )
                          }
                          placeholder="City, State/Province, Country"
                          className={
                            errors["personalInfo.location"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["personalInfo.location"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["personalInfo.location"]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Bio / Personal Statement
                      </label>
                      <textarea
                        rows={4}
                        value={formData.personalInfo.bio}
                        onChange={(e) =>
                          handleInputChange(
                            "personalInfo",
                            "bio",
                            e.target.value
                          )
                        }
                        placeholder="Tell us about yourself, your background, and why you're seeking funding."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Step 2: Education & Skills */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Education & Skills
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Education Level
                        </label>
                        <select
                          value={formData.education.currentLevel}
                          onChange={(e) =>
                            handleInputChange(
                              "education",
                              "currentLevel",
                              e.target.value
                            )
                          }
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="High School">High School</option>
                          <option value="Associate's">
                            Associate's Degree
                          </option>
                          <option value="Bachelor's">Bachelor's Degree</option>
                          <option value="Master's">Master's Degree</option>
                          <option value="Doctorate">Doctorate</option>
                          <option value="Bootcamp">Bootcamp</option>
                          <option value="Self-taught">Self-taught</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Institution
                        </label>
                        <Input
                          value={formData.education.institution}
                          onChange={(e) =>
                            handleInputChange(
                              "education",
                              "institution",
                              e.target.value
                            )
                          }
                          placeholder="University, College, or School name"
                          className={
                            errors["education.institution"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["education.institution"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["education.institution"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Major / Field of Study
                        </label>
                        <Input
                          value={formData.education.major}
                          onChange={(e) =>
                            handleInputChange(
                              "education",
                              "major",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Computer Science, Data Science"
                          className={
                            errors["education.major"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["education.major"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["education.major"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Expected Graduation Date
                        </label>
                        <Input
                          type="date"
                          value={formData.education.graduationDate}
                          onChange={(e) =>
                            handleInputChange(
                              "education",
                              "graduationDate",
                              e.target.value
                            )
                          }
                          className={
                            errors["education.graduationDate"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["education.graduationDate"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["education.graduationDate"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          GPA (if applicable)
                        </label>
                        <Input
                          value={formData.education.gpa}
                          onChange={(e) =>
                            handleInputChange(
                              "education",
                              "gpa",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 3.5/4.0"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Skills
                      </label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.education.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => {
                                const newSkills = [
                                  ...formData.education.skills,
                                ];
                                newSkills.splice(index, 1);
                                handleInputChange(
                                  "education",
                                  "skills",
                                  newSkills
                                );
                              }}
                              className="text-muted-foreground hover:text-foreground ml-1"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill (e.g., Python, Data Analysis)"
                          onKeyDown={(e) => {
                            if (
                              e.key === "Enter" &&
                              e.currentTarget.value.trim()
                            ) {
                              e.preventDefault();
                              if (
                                !formData.education.skills.includes(
                                  e.currentTarget.value.trim()
                                )
                              ) {
                                handleInputChange("education", "skills", [
                                  ...formData.education.skills,
                                  e.currentTarget.value.trim(),
                                ]);
                                e.currentTarget.value = "";
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={(e) => {
                            const input = e.currentTarget
                              .previousElementSibling as HTMLInputElement;
                            if (
                              input.value.trim() &&
                              !formData.education.skills.includes(
                                input.value.trim()
                              )
                            ) {
                              handleInputChange("education", "skills", [
                                ...formData.education.skills,
                                input.value.trim(),
                              ]);
                              input.value = "";
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <BadgeCheck className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">
                            Verified Skills from Your Profile
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            The following skills have been imported from your
                            verified skill assessments.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {userData.skills.map((skill: any) => (
                              <Badge
                                key={skill.id}
                                className="bg-primary/10 text-primary border-primary/20"
                              >
                                {skill.name} ({skill.level})
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Funding Goals */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Funding Goals
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Amount Requested
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            type="number"
                            value={formData.funding.amount}
                            onChange={(e) =>
                              handleInputChange(
                                "funding",
                                "amount",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 15000"
                            className={`pl-7 ${
                              errors["funding.amount"]
                                ? "border-destructive"
                                : ""
                            }`}
                          />
                        </div>
                        {errors["funding.amount"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["funding.amount"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Funding Timeline
                        </label>
                        <select
                          value={formData.funding.timeline}
                          onChange={(e) =>
                            handleInputChange(
                              "funding",
                              "timeline",
                              e.target.value
                            )
                          }
                          className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
                            errors["funding.timeline"]
                              ? "border-destructive"
                              : ""
                          }`}
                        >
                          <option value="">Select a timeline</option>
                          <option value="Immediate">
                            Immediate (within 1 month)
                          </option>
                          <option value="Short-term">
                            Short-term (1-3 months)
                          </option>
                          <option value="Medium-term">
                            Medium-term (3-6 months)
                          </option>
                          <option value="Long-term">
                            Long-term (6+ months)
                          </option>
                        </select>
                        {errors["funding.timeline"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["funding.timeline"]}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Purpose of Funding
                        </label>
                        <textarea
                          rows={4}
                          value={formData.funding.purpose}
                          onChange={(e) =>
                            handleInputChange(
                              "funding",
                              "purpose",
                              e.target.value
                            )
                          }
                          placeholder="Explain how you plan to use the funding (e.g., tuition, living expenses, project costs)"
                          className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
                            errors["funding.purpose"]
                              ? "border-destructive"
                              : ""
                          }`}
                        ></textarea>
                        {errors["funding.purpose"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["funding.purpose"]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Preferred Funding Model
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            name: "Income Share Agreement",
                            description:
                              "Pay a percentage of your income after securing employment",
                          },
                          {
                            name: "Fixed Term Loan",
                            description:
                              "Fixed interest rate and repayment schedule",
                          },
                          {
                            name: "Milestone-Based",
                            description:
                              "Receive funding based on achieving specific milestones",
                          },
                          {
                            name: "Flexible",
                            description:
                              "Open to various funding models depending on terms",
                          },
                        ].map((model) => (
                          <div
                            key={model.name}
                            className={`p-4 rounded-lg border ${
                              formData.funding.preferredModel === model.name
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            } cursor-pointer transition-colors`}
                            onClick={() =>
                              handleInputChange(
                                "funding",
                                "preferredModel",
                                model.name
                              )
                            }
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  formData.funding.preferredModel === model.name
                                    ? "border-primary"
                                    : "border-muted-foreground"
                                }`}
                              >
                                {formData.funding.preferredModel ===
                                  model.name && (
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                )}
                              </div>
                              <span className="font-medium">{model.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 ml-6">
                              {model.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Specific Investors (Optional)
                      </label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select any specific investors you'd like to apply to.
                        Leave blank to be matched with all suitable investors.
                      </p>

                      <div className="space-y-3">
                        {investors.map((investor) => (
                          <div
                            key={investor.id}
                            className={`p-4 rounded-lg border ${
                              formData.funding.specificInvestors.includes(
                                investor.id
                              )
                                ? "border-primary bg-primary/5"
                                : "border-border"
                            } cursor-pointer transition-colors`}
                            onClick={() => {
                              const newInvestors =
                                formData.funding.specificInvestors.includes(
                                  investor.id
                                )
                                  ? formData.funding.specificInvestors.filter(
                                      (id) => id !== investor.id
                                    )
                                  : [
                                      ...formData.funding.specificInvestors,
                                      investor.id,
                                    ];

                              handleInputChange(
                                "funding",
                                "specificInvestors",
                                newInvestors
                              );
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center ${
                                  formData.funding.specificInvestors.includes(
                                    investor.id
                                  )
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-input"
                                }`}
                              >
                                {formData.funding.specificInvestors.includes(
                                  investor.id
                                ) && <Check className="h-3 w-3" />}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                                  <Image
                                    src={investor.logo}
                                    alt={investor.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {investor.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {investor.type}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Career Plans */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Career Plans</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Short-Term Career Goals (1-2 years)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.career.shortTermGoals}
                          onChange={(e) =>
                            handleInputChange(
                              "career",
                              "shortTermGoals",
                              e.target.value
                            )
                          }
                          placeholder="Describe your career goals for the next 1-2 years"
                          className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
                            errors["career.shortTermGoals"]
                              ? "border-destructive"
                              : ""
                          }`}
                        ></textarea>
                        {errors["career.shortTermGoals"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["career.shortTermGoals"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Long-Term Career Goals (3-5 years)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.career.longTermGoals}
                          onChange={(e) =>
                            handleInputChange(
                              "career",
                              "longTermGoals",
                              e.target.value
                            )
                          }
                          placeholder="Describe your career goals for the next 3-5 years"
                          className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
                            errors["career.longTermGoals"]
                              ? "border-destructive"
                              : ""
                          }`}
                        ></textarea>
                        {errors["career.longTermGoals"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["career.longTermGoals"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Target Industries
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.career.targetIndustries.map(
                            (industry, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                {industry}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newIndustries = [
                                      ...formData.career.targetIndustries,
                                    ];
                                    newIndustries.splice(index, 1);
                                    handleInputChange(
                                      "career",
                                      "targetIndustries",
                                      newIndustries
                                    );
                                  }}
                                  className="text-muted-foreground hover:text-foreground ml-1"
                                >
                                  ×
                                </button>
                              </Badge>
                            )
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Input
                            placeholder="Add an industry (e.g., Technology, Finance)"
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                e.currentTarget.value.trim()
                              ) {
                                e.preventDefault();
                                if (
                                  !formData.career.targetIndustries.includes(
                                    e.currentTarget.value.trim()
                                  )
                                ) {
                                  handleInputChange(
                                    "career",
                                    "targetIndustries",
                                    [
                                      ...formData.career.targetIndustries,
                                      e.currentTarget.value.trim(),
                                    ]
                                  );
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (
                                input.value.trim() &&
                                !formData.career.targetIndustries.includes(
                                  input.value.trim()
                                )
                              ) {
                                handleInputChange(
                                  "career",
                                  "targetIndustries",
                                  [
                                    ...formData.career.targetIndustries,
                                    input.value.trim(),
                                  ]
                                );
                                input.value = "";
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        {errors["career.targetIndustries"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["career.targetIndustries"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Target Roles
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.career.targetRoles.map((role, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              {role}
                              <button
                                type="button"
                                onClick={() => {
                                  const newRoles = [
                                    ...formData.career.targetRoles,
                                  ];
                                  newRoles.splice(index, 1);
                                  handleInputChange(
                                    "career",
                                    "targetRoles",
                                    newRoles
                                  );
                                }}
                                className="text-muted-foreground hover:text-foreground ml-1"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a role (e.g., Data Scientist, Software Engineer)"
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                e.currentTarget.value.trim()
                              ) {
                                e.preventDefault();
                                if (
                                  !formData.career.targetRoles.includes(
                                    e.currentTarget.value.trim()
                                  )
                                ) {
                                  handleInputChange("career", "targetRoles", [
                                    ...formData.career.targetRoles,
                                    e.currentTarget.value.trim(),
                                  ]);
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (
                                input.value.trim() &&
                                !formData.career.targetRoles.includes(
                                  input.value.trim()
                                )
                              ) {
                                handleInputChange("career", "targetRoles", [
                                  ...formData.career.targetRoles,
                                  input.value.trim(),
                                ]);
                                input.value = "";
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Expected Salary Range
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            type="number"
                            value={formData.career.salaryExpectations}
                            onChange={(e) =>
                              handleInputChange(
                                "career",
                                "salaryExpectations",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 80000"
                            className="pl-7"
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          This helps investors understand your earning potential
                          for Income Share Agreements.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Documentation */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Supporting Documentation
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Resume / CV
                        </label>
                        <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-border cursor-pointer hover:bg-muted/80 transition-colors">
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <span className="font-medium">
                              Click to upload or drag and drop
                            </span>
                            <span className="text-sm text-muted-foreground">
                              PDF, DOCX up to 5MB
                            </span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.docx"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleInputChange(
                                  "documents",
                                  "resume",
                                  e.target.files[0]
                                );
                              }
                            }}
                          />
                        </div>
                        {formData.documents.resume && (
                          <div className="mt-3 flex items-center justify-between bg-primary-50 dark:bg-primary-950/20 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <File className="h-5 w-5 text-primary" />
                              <span>
                                {(formData.documents.resume as any).name ||
                                  "resume.pdf"}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleInputChange("documents", "resume", null)
                              }
                              className="text-muted-foreground hover:text-foreground"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Academic Transcript
                        </label>
                        <div className="bg-muted rounded-lg p-8 text-center border border-dashed border-border cursor-pointer hover:bg-muted/80 transition-colors">
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <span className="font-medium">
                              Click to upload or drag and drop
                            </span>
                            <span className="text-sm text-muted-foreground">
                              PDF up to 5MB
                            </span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleInputChange(
                                  "documents",
                                  "transcript",
                                  e.target.files[0]
                                );
                              }
                            }}
                          />
                        </div>
                        {formData.documents.transcript && (
                          <div className="mt-3 flex items-center justify-between bg-primary-50 dark:bg-primary-950/20 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <File className="h-5 w-5 text-primary" />
                              <span>
                                {(formData.documents.transcript as any).name ||
                                  "transcript.pdf"}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleInputChange(
                                  "documents",
                                  "transcript",
                                  null
                                )
                              }
                              className="text-muted-foreground hover:text-foreground"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Portfolio or Project Link
                        </label>
                        <Input
                          value={formData.documents.portfolioLink}
                          onChange={(e) =>
                            handleInputChange(
                              "documents",
                              "portfolioLink",
                              e.target.value
                            )
                          }
                          placeholder="https://your-portfolio.com"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Include a link to your portfolio, GitHub, project
                          website, or other relevant work.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Additional Links
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.documents.additionalLinks.map(
                            (link, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                {link}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newLinks = [
                                      ...formData.documents.additionalLinks,
                                    ];
                                    newLinks.splice(index, 1);
                                    handleInputChange(
                                      "documents",
                                      "additionalLinks",
                                      newLinks
                                    );
                                  }}
                                  className="text-muted-foreground hover:text-foreground ml-1"
                                >
                                  ×
                                </button>
                              </Badge>
                            )
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a link (e.g., LinkedIn, Medium)"
                            onKeyDown={(e) => {
                              if (
                                e.key === "Enter" &&
                                e.currentTarget.value.trim()
                              ) {
                                e.preventDefault();
                                if (
                                  !formData.documents.additionalLinks.includes(
                                    e.currentTarget.value.trim()
                                  )
                                ) {
                                  handleInputChange(
                                    "documents",
                                    "additionalLinks",
                                    [
                                      ...formData.documents.additionalLinks,
                                      e.currentTarget.value.trim(),
                                    ]
                                  );
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (
                                input.value.trim() &&
                                !formData.documents.additionalLinks.includes(
                                  input.value.trim()
                                )
                              ) {
                                handleInputChange(
                                  "documents",
                                  "additionalLinks",
                                  [
                                    ...formData.documents.additionalLinks,
                                    input.value.trim(),
                                  ]
                                );
                                input.value = "";
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-accent-50 dark:bg-accent-950/20 p-4 rounded-lg mt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-accent-600 dark:text-accent-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-accent-700 dark:text-accent-300">
                            Notes about document submission
                          </h3>
                          <p className="text-sm text-accent-600/90 dark:text-accent-400/90 mt-1">
                            All documents you submit will be handled securely
                            and only shared with the investors you select or are
                            matched with. Original academic documents may be
                            required for verification at a later stage.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Review & Submit */}
                {currentStep === 5 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Review & Submit
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Please review all information before submitting your
                      application.
                    </p>

                    <div className="space-y-8">
                      <div className="bg-muted rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Personal Information</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentStep(0)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Full Name:
                            </span>
                            <div className="font-medium">
                              {formData.personalInfo.name}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Email:
                            </span>
                            <div className="font-medium">
                              {formData.personalInfo.email}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Phone:
                            </span>
                            <div className="font-medium">
                              {formData.personalInfo.phone}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Location:
                            </span>
                            <div className="font-medium">
                              {formData.personalInfo.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Education & Skills</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentStep(1)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-muted-foreground">
                              Education Level:
                            </span>
                            <div className="font-medium">
                              {formData.education.currentLevel}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Institution:
                            </span>
                            <div className="font-medium">
                              {formData.education.institution}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Major:
                            </span>
                            <div className="font-medium">
                              {formData.education.major}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Graduation Date:
                            </span>
                            <div className="font-medium">
                              {formData.education.graduationDate}
                            </div>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Skills:</span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {formData.education.skills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Funding Goals</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentStep(2)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-muted-foreground">
                              Amount Requested:
                            </span>
                            <div className="font-medium">
                              ${formData.funding.amount}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Timeline:
                            </span>
                            <div className="font-medium">
                              {formData.funding.timeline}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Preferred Model:
                            </span>
                            <div className="font-medium">
                              {formData.funding.preferredModel}
                            </div>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Purpose:
                          </span>
                          <div className="mt-1">{formData.funding.purpose}</div>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Career Plans</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentStep(3)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </div>
                        <div className="space-y-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Short-Term Goals:
                            </span>
                            <div className="mt-1">
                              {formData.career.shortTermGoals}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Long-Term Goals:
                            </span>
                            <div className="mt-1">
                              {formData.career.longTermGoals}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Target Industries:
                            </span>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {formData.career.targetIndustries.map(
                                (industry, index) => (
                                  <Badge key={index} variant="outline">
                                    {industry}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Target Roles:
                            </span>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {formData.career.targetRoles.map(
                                (role, index) => (
                                  <Badge key={index} variant="outline">
                                    {role}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Expected Salary:
                            </span>
                            <div className="font-medium">
                              ${formData.career.salaryExpectations}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Documentation</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentStep(4)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </div>
                        <div className="space-y-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Resume:
                            </span>
                            <div className="mt-1">
                              {formData.documents.resume ? (
                                <div className="flex items-center gap-2">
                                  <File className="h-4 w-4 text-primary" />
                                  <span>
                                    {(formData.documents.resume as any).name ||
                                      "resume.pdf"}
                                  </span>
                                </div>
                              ) : (
                                "No resume uploaded"
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Transcript:
                            </span>
                            <div className="mt-1">
                              {formData.documents.transcript ? (
                                <div className="flex items-center gap-2">
                                  <File className="h-4 w-4 text-primary" />
                                  <span>
                                    {(formData.documents.transcript as any)
                                      .name || "transcript.pdf"}
                                  </span>
                                </div>
                              ) : (
                                "No transcript uploaded"
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Portfolio Link:
                            </span>
                            <div className="mt-1">
                              {formData.documents.portfolioLink ||
                                "No portfolio link provided"}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Additional Links:
                            </span>
                            <div className="mt-2">
                              {formData.documents.additionalLinks.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {formData.documents.additionalLinks.map(
                                    (link, index) => (
                                      <Badge key={index} variant="outline">
                                        {link}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              ) : (
                                "No additional links provided"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary-50 dark:bg-primary-950/20 p-4 rounded-lg mt-8">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-primary-700 dark:text-primary-300">
                            Before you submit
                          </h3>
                          <p className="text-sm text-primary-600/90 dark:text-primary-400/90 mt-1">
                            By submitting this application, you confirm that all
                            information provided is accurate and complete. Your
                            application will be reviewed by our team and the
                            investors you selected or matched with. You'll
                            receive email notifications about the status of your
                            application.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between">
            {currentStep > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            ) : (
              <Link href="/funding">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Funding
                </Button>
              </Link>
            )}

            <Button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : currentStep === steps.length - 1 ? (
                <>
                  Submit Application
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
