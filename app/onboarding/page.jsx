"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";

// Define steps
const steps = [
  "Personal Details",
  "Educational Background",
  "Skills & Interests",
  "Career Goals",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalDetails: {
      name: "",
      location: "",
      bio: "",
    },
    education: {
      level: "high_school",
      institution: "",
      major: "",
      gradYear: "",
    },
    skills: {
      selectedSkills: [],
      interests: [],
    },
    career: {
      goals: "",
      preferredIndustries: [],
      salaryExpectation: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form with user data if available
  useState(() => {
    if (isLoaded && user) {
      setFormData((prev) => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        },
      }));
    }
  });

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
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

  // Handle array fields (skills, interests, etc.)
  const handleArrayUpdate = (section, field, value, action) => {
    setFormData((prev) => {
      const current = [...prev[section][field]];

      if (action === "add" && !current.includes(value)) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: [...current, value],
          },
        };
      } else if (action === "remove") {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: current.filter((item) => item !== value),
          },
        };
      }

      return prev;
    });
  };

  // Handle next step
  const handleNextStep = () => {
    // Validate current step
    const currentErrors = {};

    if (currentStep === 0) {
      // Validate personal details
      if (!formData.personalDetails.name) {
        currentErrors["personalDetails.name"] = "Name is required";
      }
      if (!formData.personalDetails.location) {
        currentErrors["personalDetails.location"] = "Location is required";
      }
    } else if (currentStep === 1) {
      // Validate education
      if (!formData.education.institution) {
        currentErrors["education.institution"] = "Institution is required";
      }
      if (!formData.education.gradYear) {
        currentErrors["education.gradYear"] = "Graduation year is required";
      }
    } else if (currentStep === 2) {
      // Validate skills
      if (formData.skills.selectedSkills.length === 0) {
        currentErrors["skills.selectedSkills"] =
          "Please select at least one skill";
      }
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    // Go to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // In a real app, you would submit the data to your API
      // For the hackathon, we'll simulate an API call
      console.log("Submitting onboarding data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      setIsSubmitting(false);
    }
  };

  // Sample skill options
  const skillOptions = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Data Analysis",
    "Machine Learning",
    "UI/UX Design",
    "Product Management",
    "Digital Marketing",
    "Content Creation",
    "Leadership",
    "Project Management",
    "Communication",
    "Problem Solving",
  ];

  // Sample industry options
  const industryOptions = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Media",
    "Retail",
    "Manufacturing",
    "Consulting",
    "Non-profit",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container py-4 flex items-center justify-between">
          <div className="font-bold text-xl">EduCredit Pro</div>
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            Skip for now
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Complete Your Profile</h1>
            <p className="text-muted-foreground mt-2">
              Let's personalize your experience to help you get the most out of
              EduCredit Pro
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Profile completion</span>
              <span className="text-sm">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <Progress
              value={((currentStep + 1) / steps.length) * 100}
              className="h-2"
            />
          </div>

          {/* Steps indicator */}
          <div className="hidden md:flex items-center mb-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep > index
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === index
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {currentStep > index ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <span
                  className={`ml-3 ${
                    currentStep === index
                      ? "font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>

                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-border mx-4"></div>
                )}
              </div>
            ))}
          </div>

          {/* Form steps */}
          <div className="bg-background border border-border rounded-xl p-6 shadow-sm mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px]"
              >
                {/* Step 1: Personal Details */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Details
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          value={formData.personalDetails.name}
                          onChange={(e) =>
                            handleInputChange(
                              "personalDetails",
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Your full name"
                          className={
                            errors["personalDetails.name"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["personalDetails.name"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["personalDetails.name"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Location
                        </label>
                        <Input
                          value={formData.personalDetails.location}
                          onChange={(e) =>
                            handleInputChange(
                              "personalDetails",
                              "location",
                              e.target.value
                            )
                          }
                          placeholder="City, State/Province, Country"
                          className={
                            errors["personalDetails.location"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["personalDetails.location"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["personalDetails.location"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Bio
                        </label>
                        <textarea
                          value={formData.personalDetails.bio}
                          onChange={(e) =>
                            handleInputChange(
                              "personalDetails",
                              "bio",
                              e.target.value
                            )
                          }
                          placeholder="Tell us a little about yourself..."
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Educational Background */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Educational Background
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Education Level
                        </label>
                        <select
                          value={formData.education.level}
                          onChange={(e) =>
                            handleInputChange(
                              "education",
                              "level",
                              e.target.value
                            )
                          }
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="high_school">High School</option>
                          <option value="some_college">Some College</option>
                          <option value="associates">Associate's Degree</option>
                          <option value="bachelors">Bachelor's Degree</option>
                          <option value="masters">Master's Degree</option>
                          <option value="doctorate">Doctorate</option>
                          <option value="bootcamp">Bootcamp</option>
                          <option value="self_taught">Self-Taught</option>
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
                          placeholder="School, college, or university name"
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
                          Field of Study
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
                          placeholder="Major or field of study"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Graduation Year
                        </label>
                        <Input
                          type="number"
                          value={formData.education.gradYear}
                          onChange={(e) =>
                            handleInputChange(
                              "education",
                              "gradYear",
                              e.target.value
                            )
                          }
                          placeholder="Graduation year (e.g., 2023)"
                          min="1950"
                          max="2030"
                          className={
                            errors["education.gradYear"]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {errors["education.gradYear"] && (
                          <p className="mt-1 text-sm text-destructive">
                            {errors["education.gradYear"]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Skills & Interests */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                      Skills & Interests
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Your Skills
                        </label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Select the skills you have. You'll be able to verify
                          these later.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.skills.selectedSkills.map((skill) => (
                            <Badge
                              key={skill}
                              className="flex items-center gap-1"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() =>
                                  handleArrayUpdate(
                                    "skills",
                                    "selectedSkills",
                                    skill,
                                    "remove"
                                  )
                                }
                                className="ml-1 text-xs rounded-full hover:bg-primary-800"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>

                        {errors["skills.selectedSkills"] && (
                          <p className="mt-1 mb-3 text-sm text-destructive">
                            {errors["skills.selectedSkills"]}
                          </p>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {skillOptions
                            .filter(
                              (skill) =>
                                !formData.skills.selectedSkills.includes(skill)
                            )
                            .map((skill) => (
                              <div
                                key={skill}
                                className="border rounded-md p-2 cursor-pointer hover:bg-muted transition-colors"
                                onClick={() =>
                                  handleArrayUpdate(
                                    "skills",
                                    "selectedSkills",
                                    skill,
                                    "add"
                                  )
                                }
                              >
                                <span className="text-sm">{skill}</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Your Interests
                        </label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Select topics you're interested in learning more
                          about.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.skills.interests.map((interest) => (
                            <Badge
                              key={interest}
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              {interest}
                              <button
                                type="button"
                                onClick={() =>
                                  handleArrayUpdate(
                                    "skills",
                                    "interests",
                                    interest,
                                    "remove"
                                  )
                                }
                                className="ml-1 text-xs rounded-full hover:bg-muted"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {skillOptions
                            .filter(
                              (skill) =>
                                !formData.skills.interests.includes(skill)
                            )
                            .map((skill) => (
                              <div
                                key={skill}
                                className="border rounded-md p-2 cursor-pointer hover:bg-muted transition-colors"
                                onClick={() =>
                                  handleArrayUpdate(
                                    "skills",
                                    "interests",
                                    skill,
                                    "add"
                                  )
                                }
                              >
                                <span className="text-sm">{skill}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Career Goals */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Career Goals
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Career Objectives
                        </label>
                        <textarea
                          value={formData.career.goals}
                          onChange={(e) =>
                            handleInputChange("career", "goals", e.target.value)
                          }
                          placeholder="What are your career goals? What do you hope to achieve professionally?"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          rows={4}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Preferred Industries
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.career.preferredIndustries.map(
                            (industry) => (
                              <Badge
                                key={industry}
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                {industry}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleArrayUpdate(
                                      "career",
                                      "preferredIndustries",
                                      industry,
                                      "remove"
                                    )
                                  }
                                  className="ml-1 text-xs rounded-full hover:bg-muted"
                                >
                                  ×
                                </button>
                              </Badge>
                            )
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {industryOptions
                            .filter(
                              (industry) =>
                                !formData.career.preferredIndustries.includes(
                                  industry
                                )
                            )
                            .map((industry) => (
                              <div
                                key={industry}
                                className="border rounded-md p-2 cursor-pointer hover:bg-muted transition-colors"
                                onClick={() =>
                                  handleArrayUpdate(
                                    "career",
                                    "preferredIndustries",
                                    industry,
                                    "add"
                                  )
                                }
                              >
                                <span className="text-sm">{industry}</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Salary Expectations
                        </label>
                        <div className="relative">
                          {/* Missing DollarSign import */}
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground">
                            $
                          </div>
                          <Input
                            type="number"
                            value={formData.career.salaryExpectation}
                            onChange={(e) =>
                              handleInputChange(
                                "career",
                                "salaryExpectation",
                                e.target.value
                              )
                            }
                            placeholder="Annual salary expectation (e.g., 60000)"
                            className="pl-8"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          This helps us provide appropriate funding and career
                          options
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button onClick={handleNextStep} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                  Completing...
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  Complete Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
