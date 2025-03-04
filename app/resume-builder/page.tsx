"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaFileAlt,
  FaMagic,
  FaDownload,
  FaTrash,
  FaPlus,
  FaChevronRight,
  FaRegLightbulb,
  FaCheck,
  FaRobot,
  FaCloudUploadAlt,
  FaLinkedin,
  FaFileUpload,
  FaEye,
  FaEyeSlash,
  FaStar,
} from "react-icons/fa";
import { Tab } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/ui/LoadingScreen";
// Mock function to simulate AI analysis
const simulateAIAnalysis = async (resumeData: any) => {
  // In production, this would be an API call to your AI service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        atsScore: Math.floor(Math.random() * 30) + 70, // 70-100 score
        suggestions: [
          {
            id: "sug1",
            section: "summary",
            type: "improvement",
            message:
              "Consider adding more measurable accomplishments to your summary.",
            example:
              "Increased team productivity by 30% through implementation of agile methodologies.",
          },
          {
            id: "sug2",
            section: "experience",
            type: "keyword",
            message:
              "Add more industry-specific keywords related to your target position.",
            example:
              'For a software developer position, include terms like "full-stack", "CI/CD", or "agile development".',
          },
          {
            id: "sug3",
            section: "skills",
            type: "formatting",
            message: "Group your skills by category for better readability.",
            example:
              "Technical: JavaScript, React, Node.js | Soft Skills: Leadership, Communication",
          },
        ],
        keywordMatches: [
          { keyword: "leadership", count: 2, recommended: 3 },
          { keyword: "react", count: 3, recommended: 3 },
          { keyword: "management", count: 1, recommended: 4 },
          { keyword: "analytical", count: 0, recommended: 2 },
        ],
      });
    }, 1500);
  });
};

// Resume template types
type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  atsScore: number;
};

// Resume data types
interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
  };
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  skills: {
    id: string;
    name: string;
    level?: number;
    category?: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expires?: string;
    hasExpiry: boolean;
  }[];
}

// Template data
const resumeTemplates: ResumeTemplate[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean, minimal design with excellent ATS compatibility",
    thumbnail: "/templates/professional.jpg",
    atsScore: 98,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with stylish elements",
    thumbnail: "/templates/modern.jpg",
    atsScore: 92,
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional resume format, highly compatible with ATS",
    thumbnail: "/templates/classic.jpg",
    atsScore: 95,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique design for creative fields (lower ATS compatibility)",
    thumbnail: "/templates/creative.jpg",
    atsScore: 78,
  },
];

const ResumeBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [keywordMatches, setKeywordMatches] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState(resumeTemplates[0]);
  const [jobDescription, setJobDescription] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Initialize empty resume data
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      title: "Software Developer",
      email: "",
      phone: "",
      location: "San Francisco, CA",
      website: "",
      linkedin: "",
    },
    summary:
      "Experienced software developer with expertise in building web applications using modern JavaScript frameworks. Passionate about creating intuitive user interfaces and scalable backend solutions.",
    experience: [
      {
        id: "exp1",
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        startDate: "2023-01",
        endDate: "",
        current: true,
        description: "Lead frontend development for multiple web applications",
        achievements: [
          "Reduced page load time by 40% through optimization techniques",
          "Implemented responsive design principles across all company products",
          "Collaborated with UI/UX team to improve user experience",
        ],
      },
    ],
    education: [
      {
        id: "edu1",
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        location: "Boston, MA",
        startDate: "2018-09",
        endDate: "2022-05",
        current: false,
        description:
          "Graduated with honors. Specialized in software engineering and artificial intelligence.",
      },
    ],
    skills: [
      { id: "skill1", name: "JavaScript", level: 90, category: "Programming" },
      { id: "skill2", name: "React", level: 85, category: "Frontend" },
      { id: "skill3", name: "Node.js", level: 80, category: "Backend" },
      { id: "skill4", name: "TypeScript", level: 75, category: "Programming" },
      { id: "skill5", name: "CSS/SCSS", level: 85, category: "Frontend" },
    ],
    certifications: [
      {
        id: "cert1",
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023-06",
        expires: "2026-06",
        hasExpiry: true,
      },
    ],
  });

  // Steps for the resume building process
  const steps = [
    { id: "personal", name: "Personal Info", icon: <FaUserCircle /> },
    { id: "experience", name: "Experience", icon: <FaBriefcase /> },
    { id: "education", name: "Education", icon: <FaGraduationCap /> },
    { id: "skills", name: "Skills", icon: <FaTools /> },
    { id: "review", name: "Review & Optimize", icon: <FaFileAlt /> },
    { id: "export", name: "Export", icon: <FaDownload /> },
  ];

  // Run AI analysis when user gets to the review step
  useEffect(() => {
    if (activeStep === 4 && !atsScore) {
      runAIAnalysis();
    }
  }, [activeStep, atsScore]);

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await simulateAIAnalysis(resumeData);
      // @ts-ignore - We know the shape of the response from simulateAIAnalysis
      setAtsScore(result.atsScore);
      // @ts-ignore
      setAiSuggestions(result.suggestions);
      // @ts-ignore
      setKeywordMatches(result.keywordMatches);
    } catch (error) {
      toast.error("Error analyzing resume. Please try again.");
      console.error("AI analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle form updates for personal info
  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };
  useEffect(() => {
    // Simulate API data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle form updates for summary
  const handleSummaryChange = (value: string) => {
    setResumeData({
      ...resumeData,
      summary: value,
    });
  };

  // Add a new experience entry
  const addExperience = () => {
    const newId = `exp${resumeData.experience.length + 1}`;
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: newId,
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          achievements: [],
        },
      ],
    });
  };

  // Update an experience entry
  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  // Add an achievement to an experience
  const addAchievement = (experienceId: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === experienceId
          ? {
              ...exp,
              achievements: [...exp.achievements, ""],
            }
          : exp
      ),
    });
  };

  // Update an achievement
  const updateAchievement = (
    experienceId: string,
    index: number,
    value: string
  ) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === experienceId
          ? {
              ...exp,
              achievements: exp.achievements.map((a, i) =>
                i === index ? value : a
              ),
            }
          : exp
      ),
    });
  };

  // Remove an achievement
  const removeAchievement = (experienceId: string, index: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === experienceId
          ? {
              ...exp,
              achievements: exp.achievements.filter((_, i) => i !== index),
            }
          : exp
      ),
    });
  };

  // Remove an experience entry
  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  // Add a new education entry
  const addEducation = () => {
    const newId = `edu${resumeData.education.length + 1}`;
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: newId,
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  // Update an education entry
  const updateEducation = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  // Remove an education entry
  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  // Add a new skill
  const addSkill = () => {
    const newId = `skill${resumeData.skills.length + 1}`;
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          id: newId,
          name: "",
          level: 50,
          category: "",
        },
      ],
    });
  };

  // Update a skill
  const updateSkill = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  // Remove a skill
  const removeSkill = (id: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    });
  };

  // Add a new certification
  const addCertification = () => {
    const newId = `cert${resumeData.certifications.length + 1}`;
    setResumeData({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        {
          id: newId,
          name: "",
          issuer: "",
          date: "",
          expires: "",
          hasExpiry: false,
        },
      ],
    });
  };

  // Update a certification
  const updateCertification = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    });
  };

  // Remove a certification
  const removeCertification = (id: string) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter(
        (cert) => cert.id !== id
      ),
    });
  };

  const handleExport = (format: "pdf" | "docx") => {
    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      toast.success(`Resume exported as ${format.toUpperCase()}`);
      setIsExporting(false);

      // In a real app, this would trigger the download
      console.log(`Exporting resume as ${format}`, resumeData);
    }, 1500);
  };

  const applySuggestion = (suggestionId: string) => {
    // Mark the suggestion as applied
    setAiSuggestions(
      aiSuggestions.map((suggestion) =>
        suggestion.id === suggestionId
          ? { ...suggestion, applied: true }
          : suggestion
      )
    );

    toast.success("Suggestion applied to resume");
  };

  const importFromLinkedIn = () => {
    toast.success("LinkedIn import feature would be implemented here");
  };

  const uploadResume = () => {
    toast.success("Resume upload feature would be implemented here");
  };

  const parseJobDescription = () => {
    setIsAnalyzing(true);

    // Simulate job description analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success(
        "Job description analyzed. Resume optimized for this position."
      );
      runAIAnalysis(); // Re-run the analysis after parsing job description
    }, 2000);
  };

  // Navigation functions
  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (index: number) => {
    setActiveStep(index);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="bg-gray-50 min-h-screen mt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                AI Resume Builder
              </h1>
              <p className="text-indigo-100 max-w-xl">
                Build an ATS-optimized resume in minutes with AI assistance. Get
                real-time suggestions to improve your chances of landing
                interviews.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={importFromLinkedIn}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-2 text-sm border border-white/30"
              >
                <FaLinkedin />
                <span>Import from LinkedIn</span>
              </button>

              <button
                onClick={uploadResume}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-2 text-sm border border-white/30"
              >
                <FaFileUpload />
                <span>Upload Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="inset-0 z-10 parallax-bg" style={{ height: "150%" }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.1) 25%, rgba(45, 212, 191, 0.05) 50%, transparent 80%)",
            height: "150%",
            width: "100%",
          }}
        />
        <div
          className="absolute inset-0 z-10 bg-blue-700"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(14,165,233,0.15) 0, rgba(0,0,0,0) 80%)",
            height: "150%",
            width: "100%",
          }}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="mb-8">
          <div className="hidden sm:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(index)}
                  disabled={index > activeStep + 1}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 
                    ${
                      activeStep === index
                        ? `bg-indigo-600 text-white border-indigo-600`
                        : index < activeStep
                        ? "bg-green-50 text-green-600 border-green-500"
                        : "bg-gray-100 text-gray-400 border-gray-300"
                    }
                    ${
                      index <= activeStep + 1
                        ? "cursor-pointer hover:shadow-md transition-shadow"
                        : "cursor-not-allowed"
                    }
                  `}
                >
                  {index < activeStep ? <FaCheck /> : step.icon}
                </button>

                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index < activeStep ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 text-center hidden sm:block">
            <span className="text-sm font-medium text-indigo-600">
              {steps[activeStep].name}
            </span>
          </div>

          {/* Mobile stepper */}
          <div className="flex items-center justify-between sm:hidden">
            <span className="text-sm text-gray-500">
              Step {activeStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {steps[activeStep].name}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 sm:hidden">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Personal Information */}
                  {activeStep === 0 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6">
                        Personal Information
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={resumeData.personalInfo.name}
                            onChange={(e) =>
                              handlePersonalInfoChange("name", e.target.value)
                            }
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Professional Title
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={resumeData.personalInfo.title}
                            onChange={(e) =>
                              handlePersonalInfoChange("title", e.target.value)
                            }
                            placeholder="Software Engineer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={resumeData.personalInfo.email}
                            onChange={(e) =>
                              handlePersonalInfoChange("email", e.target.value)
                            }
                            placeholder="john.doe@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) =>
                              handlePersonalInfoChange("phone", e.target.value)
                            }
                            placeholder="(123) 456-7890"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={resumeData.personalInfo.location}
                            onChange={(e) =>
                              handlePersonalInfoChange(
                                "location",
                                e.target.value
                              )
                            }
                            placeholder="City, State"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            LinkedIn URL
                          </label>
                          <input
                            type="url"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={resumeData.personalInfo.linkedin || ""}
                            onChange={(e) =>
                              handlePersonalInfoChange(
                                "linkedin",
                                e.target.value
                              )
                            }
                            placeholder="linkedin.com/in/username"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Professional Summary
                        </label>
                        <textarea
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          value={resumeData.summary}
                          onChange={(e) => handleSummaryChange(e.target.value)}
                          placeholder="A brief summary of your professional background and career goals..."
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">
                          Tip: Keep your summary concise (3-4 sentences) and
                          highlight your most relevant experience and skills.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {activeStep === 1 && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Work Experience</h2>
                        <button
                          onClick={addExperience}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-2 text-sm hover:bg-indigo-100 transition-colors"
                        >
                          <FaPlus />
                          <span>Add Experience</span>
                        </button>
                      </div>

                      <div className="space-y-8">
                        {resumeData.experience.map((exp, index) => (
                          <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-medium">
                                Position {index + 1}
                              </h3>
                              <button
                                onClick={() => removeExperience(exp.id)}
                                className="text-red-500 hover:text-red-600 transition-colors"
                                title="Remove experience"
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Job Title
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                  value={exp.title}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Software Developer"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Company
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                  value={exp.company}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "company",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Acme Inc."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Location
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                  value={exp.location}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "location",
                                      e.target.value
                                    )
                                  }
                                  placeholder="San Francisco, CA"
                                />
                              </div>

                              <div className="flex items-center pt-6">
                                <input
                                  type="checkbox"
                                  id={`current-${exp.id}`}
                                  checked={exp.current}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "current",
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`current-${exp.id}`}
                                  className="ml-2 text-sm text-gray-700"
                                >
                                  I currently work here
                                </label>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Start Date
                                </label>
                                <input
                                  type="month"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                  value={exp.startDate}
                                  onChange={(e) =>
                                    updateExperience(
                                      exp.id,
                                      "startDate",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              {!exp.current && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                  </label>
                                  <input
                                    type="month"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    value={exp.endDate}
                                    onChange={(e) =>
                                      updateExperience(
                                        exp.id,
                                        "endDate",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Description
                              </label>
                              <textarea
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                value={exp.description}
                                onChange={(e) =>
                                  updateExperience(
                                    exp.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Describe your role, responsibilities, and the company's product/service..."
                              ></textarea>
                              <p className="text-xs text-gray-500 mt-1">
                                Tip: Begin descriptions with strong action verbs
                                (Developed, Led, Implemented, etc.)
                              </p>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-medium text-gray-700">
                                  Key Achievements
                                </label>
                                <button
                                  onClick={() => addAchievement(exp.id)}
                                  className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded flex items-center gap-1 text-xs hover:bg-indigo-100 transition-colors"
                                >
                                  <FaPlus size={10} />
                                  <span>Add Achievement</span>
                                </button>
                              </div>

                              {exp.achievements.length === 0 ? (
                                <div className="text-sm text-gray-500 italic p-2 bg-gray-100 rounded-lg text-center">
                                  No achievements added yet. Add specific
                                  accomplishments to stand out.
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {exp.achievements.map(
                                    (achievement, achievementIndex) => (
                                      <div
                                        key={achievementIndex}
                                        className="flex items-start gap-2"
                                      >
                                        <span className="text-gray-500 pt-2">
                                          •
                                        </span>
                                        <input
                                          type="text"
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                          value={achievement}
                                          onChange={(e) =>
                                            updateAchievement(
                                              exp.id,
                                              achievementIndex,
                                              e.target.value
                                            )
                                          }
                                          placeholder="e.g., Increased sales by 20% through targeted marketing campaigns"
                                        />
                                        <button
                                          onClick={() =>
                                            removeAchievement(
                                              exp.id,
                                              achievementIndex
                                            )
                                          }
                                          className="text-red-500 hover:text-red-600 transition-colors p-2"
                                          title="Remove achievement"
                                        >
                                          <FaTrash size={14} />
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                              <p className="text-xs text-gray-500 mt-2">
                                Tip: Quantify your achievements (%, $, numbers)
                                whenever possible for maximum impact.
                              </p>
                            </div>
                          </motion.div>
                        ))}

                        {resumeData.experience.length === 0 && (
                          <div className="text-center py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500 mb-3">
                              No work experience added yet
                            </p>
                            <button
                              onClick={addExperience}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              Add Your First Position
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {activeStep === 2 && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Education</h2>
                        <button
                          onClick={addEducation}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-2 text-sm hover:bg-indigo-100 transition-colors"
                        >
                          <FaPlus />
                          <span>Add Education</span>
                        </button>
                      </div>

                      <div className="space-y-8">
                        {resumeData.education.map((edu, index) => (
                          <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-medium">
                                Education {index + 1}
                              </h3>
                              <button
                                onClick={() => removeEducation(edu.id)}
                                className="text-red-500 hover:text-red-600 transition-colors"
                                title="Remove education"
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Degree/Certificate
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                  value={edu.degree}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "degree",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Bachelor of Science in Computer Science"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Institution
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                  value={edu.institution}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "institution",
                                      e.target.value
                                    )
                                  }
                                  placeholder="University of Technology"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Location
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                  value={edu.location}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "location",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Boston, MA"
                                />
                              </div>

                              <div className="flex items-center pt-6">
                                <input
                                  type="checkbox"
                                  id={`current-edu-${edu.id}`}
                                  checked={edu.current}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "current",
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`current-edu-${edu.id}`}
                                  className="ml-2 text-sm text-gray-700"
                                >
                                  Currently enrolled
                                </label>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Start Date
                                </label>
                                <input
                                  type="month"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                  value={edu.startDate}
                                  onChange={(e) =>
                                    updateEducation(
                                      edu.id,
                                      "startDate",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              {!edu.current && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                  </label>
                                  <input
                                    type="month"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    value={edu.endDate}
                                    onChange={(e) =>
                                      updateEducation(
                                        edu.id,
                                        "endDate",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Additional Information
                              </label>
                              <textarea
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                value={edu.description}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="GPA, honors, relevant coursework, activities, etc."
                              ></textarea>
                            </div>
                          </motion.div>
                        ))}

                        {resumeData.education.length === 0 && (
                          <div className="text-center py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500 mb-3">
                              No education added yet
                            </p>
                            <button
                              onClick={addEducation}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              Add Your Education
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Skills & Certifications */}
                  {activeStep === 3 && (
                    <div>
                      <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-50 p-1 mb-6">
                          <Tab
                            className={({ selected }) =>
                              `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all
                              ${
                                selected
                                  ? "bg-white text-indigo-700 shadow"
                                  : "text-indigo-700/60 hover:text-indigo-700/80 hover:bg-white/[0.12]"
                              }`
                            }
                          >
                            Skills
                          </Tab>
                          <Tab
                            className={({ selected }) =>
                              `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all
                              ${
                                selected
                                  ? "bg-white text-indigo-700 shadow"
                                  : "text-indigo-700/60 hover:text-indigo-700/80 hover:bg-white/[0.12]"
                              }`
                            }
                          >
                            Certifications
                          </Tab>
                        </Tab.List>

                        <Tab.Panels>
                          <Tab.Panel>
                            <div className="flex justify-between items-center mb-6">
                              <h2 className="text-xl font-bold">Skills</h2>
                              <button
                                onClick={addSkill}
                                className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-2 text-sm hover:bg-indigo-100 transition-colors"
                              >
                                <FaPlus />
                                <span>Add Skill</span>
                              </button>
                            </div>

                            <div className="space-y-4">
                              {resumeData.skills.map((skill, index) => (
                                <motion.div
                                  key={skill.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200"
                                >
                                  <div className="flex-1">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                      value={skill.name}
                                      onChange={(e) =>
                                        updateSkill(
                                          skill.id,
                                          "name",
                                          e.target.value
                                        )
                                      }
                                      placeholder="e.g., JavaScript, Project Management"
                                    />
                                  </div>

                                  <div className="w-32">
                                    <select
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                      value={skill.category || ""}
                                      onChange={(e) =>
                                        updateSkill(
                                          skill.id,
                                          "category",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="">Category</option>
                                      <option value="Programming">
                                        Programming
                                      </option>
                                      <option value="Frontend">Frontend</option>
                                      <option value="Backend">Backend</option>
                                      <option value="Database">Database</option>
                                      <option value="DevOps">DevOps</option>
                                      <option value="Soft Skills">
                                        Soft Skills
                                      </option>
                                      <option value="Languages">
                                        Languages
                                      </option>
                                      <option value="Tools">Tools</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>

                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="10"
                                        value={skill.level || 50}
                                        onChange={(e) =>
                                          updateSkill(
                                            skill.id,
                                            "level",
                                            parseInt(e.target.value)
                                          )
                                        }
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                      />
                                      <span className="text-sm text-gray-600 w-8">
                                        {skill.level || 50}%
                                      </span>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => removeSkill(skill.id)}
                                    className="text-red-500 hover:text-red-600 transition-colors p-2"
                                    title="Remove skill"
                                  >
                                    <FaTrash size={14} />
                                  </button>
                                </motion.div>
                              ))}

                              {resumeData.skills.length === 0 && (
                                <div className="text-center py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg">
                                  <p className="text-gray-500 mb-3">
                                    No skills added yet
                                  </p>
                                  <button
                                    onClick={addSkill}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                  >
                                    Add Your First Skill
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                              <div className="flex items-start gap-3">
                                <div className="bg-indigo-100 p-2 rounded text-indigo-700">
                                  <FaRegLightbulb size={20} />
                                </div>
                                <div>
                                  <h4 className="font-medium text-indigo-900">
                                    ATS Optimization Tip
                                  </h4>
                                  <p className="text-sm text-indigo-800">
                                    Include skills mentioned in the job
                                    description. ATS systems scan for specific
                                    keywords from the job posting. Be sure to
                                    list both technical skills and soft skills.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Tab.Panel>

                          <Tab.Panel>
                            <div className="flex justify-between items-center mb-6">
                              <h2 className="text-xl font-bold">
                                Certifications
                              </h2>
                              <button
                                onClick={addCertification}
                                className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg flex items-center gap-2 text-sm hover:bg-indigo-100 transition-colors"
                              >
                                <FaPlus />
                                <span>Add Certification</span>
                              </button>
                            </div>

                            <div className="space-y-6">
                              {resumeData.certifications.map((cert, index) => (
                                <motion.div
                                  key={cert.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                                >
                                  <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-medium">
                                      Certification {index + 1}
                                    </h3>
                                    <button
                                      onClick={() =>
                                        removeCertification(cert.id)
                                      }
                                      className="text-red-500 hover:text-red-600 transition-colors"
                                      title="Remove certification"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Certification Name
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        value={cert.name}
                                        onChange={(e) =>
                                          updateCertification(
                                            cert.id,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                        placeholder="AWS Certified Developer"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Issuing Organization
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        value={cert.issuer}
                                        onChange={(e) =>
                                          updateCertification(
                                            cert.id,
                                            "issuer",
                                            e.target.value
                                          )
                                        }
                                        placeholder="Amazon Web Services"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date Earned
                                      </label>
                                      <input
                                        type="month"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        value={cert.date}
                                        onChange={(e) =>
                                          updateCertification(
                                            cert.id,
                                            "date",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>

                                    <div className="flex items-center pt-6">
                                      <input
                                        type="checkbox"
                                        id={`expires-${cert.id}`}
                                        checked={cert.hasExpiry}
                                        onChange={(e) =>
                                          updateCertification(
                                            cert.id,
                                            "hasExpiry",
                                            e.target.checked
                                          )
                                        }
                                        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`expires-${cert.id}`}
                                        className="ml-2 text-sm text-gray-700"
                                      >
                                        Has expiration date
                                      </label>
                                    </div>

                                    {cert.hasExpiry && (
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Expiration Date
                                        </label>
                                        <input
                                          type="month"
                                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                          value={cert.expires}
                                          onChange={(e) =>
                                            updateCertification(
                                              cert.id,
                                              "expires",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              ))}

                              {resumeData.certifications.length === 0 && (
                                <div className="text-center py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg">
                                  <p className="text-gray-500 mb-3">
                                    No certifications added yet
                                  </p>
                                  <button
                                    onClick={addCertification}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                  >
                                    Add Your First Certification
                                  </button>
                                </div>
                              )}
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                    <button
                      onClick={prevStep}
                      disabled={activeStep === 0}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${
                        activeStep === 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100 transition-colors"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span>Previous</span>
                    </button>

                    {activeStep < steps.length - 1 ? (
                      <button
                        onClick={nextStep}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm"
                      >
                        <span>Next</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500 italic">
                        You've reached the end! Export your resume above.
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Live Preview */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-8">
              <h3 className="text-lg font-medium mb-3 px-2">Live Preview</h3>
              <div
                className="bg-gray-100 rounded-lg p-2 overflow-hidden"
                style={{ height: "calc(100vh - 220px)" }}
              >
                {/* Resume Preview Content */}
                <div className="transform scale-[0.6] origin-top-left w-[170%] h-[170%] bg-white shadow-sm p-6 overflow-auto">
                  {/* Resume Content */}
                  <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {resumeData.personalInfo.name || "Your Name"}
                    </h1>
                    <p className="text-gray-700">
                      {resumeData.personalInfo.title || "Professional Title"}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-600">
                      {resumeData.personalInfo.email && (
                        <div>{resumeData.personalInfo.email}</div>
                      )}
                      {resumeData.personalInfo.phone && (
                        <div>{resumeData.personalInfo.phone}</div>
                      )}
                      {resumeData.personalInfo.location && (
                        <div>{resumeData.personalInfo.location}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-bold pb-1 border-b border-gray-300 mb-2">
                      Summary
                    </h2>
                    <p className="text-xs text-gray-700">
                      {resumeData.summary}
                    </p>
                  </div>

                  {/* Experience Preview */}
                  {resumeData.experience.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold pb-1 border-b border-gray-300 mb-2">
                        Experience
                      </h2>
                      <div className="space-y-3">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id} className="mb-2">
                            <div className="flex flex-wrap justify-between mb-1">
                              <div>
                                <h3 className="font-bold text-sm">
                                  {exp.title || "Position"}
                                </h3>
                                <p className="text-xs text-gray-700">
                                  {exp.company || "Company"}
                                  {exp.location ? `, ${exp.location}` : ""}
                                </p>
                              </div>
                              <div className="text-gray-600 text-xs">
                                {exp.startDate &&
                                  new Date(exp.startDate).toLocaleDateString(
                                    "en-US",
                                    { year: "numeric", month: "short" }
                                  )}{" "}
                                {" - "}
                                {exp.current
                                  ? "Present"
                                  : exp.endDate &&
                                    new Date(exp.endDate).toLocaleDateString(
                                      "en-US",
                                      { year: "numeric", month: "short" }
                                    )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education Preview */}
                  {resumeData.education.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-lg font-bold pb-1 border-b border-gray-300 mb-2">
                        Education
                      </h2>
                      <div className="space-y-2">
                        {resumeData.education.map((edu) => (
                          <div key={edu.id} className="mb-1">
                            <div>
                              <h3 className="font-bold text-sm">
                                {edu.degree || "Degree"}
                              </h3>
                              <p className="text-xs text-gray-700">
                                {edu.institution || "Institution"}
                                {edu.location ? `, ${edu.location}` : ""}
                              </p>
                              <p className="text-xs text-gray-600">
                                {edu.startDate &&
                                  new Date(edu.startDate).toLocaleDateString(
                                    "en-US",
                                    { year: "numeric", month: "short" }
                                  )}{" "}
                                {" - "}
                                {edu.current
                                  ? "Present"
                                  : edu.endDate &&
                                    new Date(edu.endDate).toLocaleDateString(
                                      "en-US",
                                      { year: "numeric", month: "short" }
                                    )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Preview */}
                  {resumeData.skills.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold pb-1 border-b border-gray-300 mb-2">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.skills.slice(0, 8).map((skill) => (
                          <span
                            key={skill.id}
                            className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 text-xs"
                          >
                            {skill.name}
                          </span>
                        ))}
                        {resumeData.skills.length > 8 && (
                          <span className="text-xs text-gray-500">
                            +{resumeData.skills.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Certifications Preview */}
                  {resumeData.certifications.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold pb-1 border-b border-gray-300 mb-2">
                        Certifications
                      </h2>
                      <div className="space-y-1">
                        {resumeData.certifications.map((cert) => (
                          <div key={cert.id} className="text-xs">
                            <span className="font-medium">{cert.name}</span>
                            {cert.issuer && (
                              <span className="text-gray-600">
                                {" "}
                                • {cert.issuer}
                              </span>
                            )}
                            <div className="text-gray-500">
                              {cert.date &&
                                new Date(cert.date).toLocaleDateString(
                                  "en-US",
                                  { year: "numeric", month: "short" }
                                )}
                              {cert.hasExpiry && cert.expires && (
                                <>
                                  {" "}
                                  - Expires{" "}
                                  {new Date(cert.expires).toLocaleDateString(
                                    "en-US",
                                    { year: "numeric", month: "short" }
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 text-center mt-8 border-t border-gray-200 pt-3">
                    Live preview - export to see full resume
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="px-2 mt-4">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <FaStar className="text-amber-500" />
                  <span className="font-medium">Pro Tips:</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1 pl-4">
                  <li>ATS systems prefer simple, clean formats</li>
                  <li>Avoid tables, multiple columns, or graphics</li>
                  <li>Match keywords from the job description</li>
                  <li>Use standard section headings</li>
                  <li>Keep formatting consistent throughout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
