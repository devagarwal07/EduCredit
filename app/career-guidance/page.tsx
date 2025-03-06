"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import {
  FaChartLine,
  FaLightbulb,
  FaRoad,
  FaGraduationCap,
  FaBriefcase,
  FaPuzzlePiece,
  FaRocket,
  FaTrophy,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaStar,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Layout from "../components/layout/Layout";
import VisualizationScene from "../components/3d/VisualizationScene";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LoadingSpinner from "../components/ui/LoadingScreen";
import NoiseBackground from "../components/effects/NoiseBackground";
import FloatingElements from "../components/effects/FloatingElements";

// Mock data - would be fetched from API in production
const careerPathsData = [
  {
    id: "path1",
    title: "Full Stack Developer",
    description:
      "A comprehensive path to becoming a skilled full stack developer with expertise in modern web technologies.",
    currentLevel: "Intermediate",
    progress: 68,
    milestones: [
      { id: 1, title: "Frontend Fundamentals", complete: true },
      { id: 2, title: "Backend Fundamentals", complete: true },
      { id: 3, title: "Database Design & Implementation", complete: true },
      { id: 4, title: "API Development", complete: true },
      { id: 5, title: "Advanced Frontend (React/Angular)", complete: false },
      { id: 6, title: "DevOps & Deployment", complete: false },
      { id: 7, title: "System Architecture", complete: false },
    ],
    skills: {
      acquired: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "SQL",
      ],
      recommended: ["Docker", "Kubernetes", "AWS", "GraphQL"],
    },
    nextSteps: [
      {
        id: "course1",
        type: "course",
        title: "Advanced React Patterns",
        provider: "FrontendMasters",
        duration: "12 hours",
        matchScore: 96,
      },
      {
        id: "cert1",
        type: "certification",
        title: "AWS Certified Developer",
        provider: "Amazon Web Services",
        duration: "3 months",
        matchScore: 92,
      },
    ],
  },
  {
    id: "path2",
    title: "Data Scientist",
    description:
      "A focused path to becoming a skilled data scientist with expertise in analysis, machine learning and data visualization.",
    currentLevel: "Beginner",
    progress: 32,
    milestones: [
      { id: 1, title: "Python Programming", complete: true },
      { id: 2, title: "Statistics Foundations", complete: true },
      { id: 3, title: "Data Preparation & Cleaning", complete: false },
      { id: 4, title: "Exploratory Data Analysis", complete: false },
      { id: 5, title: "Machine Learning Fundamentals", complete: false },
      { id: 6, title: "Deep Learning", complete: false },
      { id: 7, title: "Advanced ML & Deployment", complete: false },
    ],
    skills: {
      acquired: ["Python", "pandas", "NumPy", "Basic Statistics"],
      recommended: ["scikit-learn", "TensorFlow", "SQL", "Data Visualization"],
    },
    nextSteps: [
      {
        id: "course2",
        type: "course",
        title: "Data Cleaning & Feature Engineering",
        provider: "DataCamp",
        duration: "8 hours",
        matchScore: 98,
      },
      {
        id: "project1",
        type: "project",
        title: "Exploratory Data Analysis Portfolio Project",
        provider: "UpSkillr Projects",
        duration: "2 weeks",
        matchScore: 95,
      },
    ],
  },
];

const jobRecommendationsData = [
  {
    id: "job1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    description:
      "Looking for an experienced Frontend Developer with React expertise to build responsive, accessible web applications.",
    matchScore: 89,
    salary: "$120,000 - $150,000",
    skills: {
      matching: ["React", "JavaScript", "CSS", "HTML"],
      missing: ["TypeScript", "GraphQL"],
    },
    postedDate: "2025-02-28",
    applicationDeadline: "2025-03-15",
  },
  {
    id: "job2",
    title: "Fullstack Engineer",
    company: "GrowthStartup",
    location: "New York, NY (Hybrid)",
    description:
      "Join our dynamic team building our next-generation platform with React, Node.js and AWS.",
    matchScore: 94,
    salary: "$130,000 - $160,000",
    skills: {
      matching: ["React", "Node.js", "JavaScript", "Express"],
      missing: ["AWS", "PostgreSQL"],
    },
    postedDate: "2025-03-01",
    applicationDeadline: "2025-03-30",
  },
  {
    id: "job3",
    title: "Software Developer",
    company: "EnterpriseInc",
    location: "Chicago, IL (On-site)",
    description:
      "Develop and maintain business-critical applications using modern JavaScript frameworks.",
    matchScore: 85,
    salary: "$110,000 - $140,000",
    skills: {
      matching: ["JavaScript", "HTML", "CSS", "React"],
      missing: ["Java", "Spring Boot", "Microservices"],
    },
    postedDate: "2025-02-25",
    applicationDeadline: "2025-03-25",
  },
];

const skillGapsData = {
  currentRole: "Frontend Developer",
  desiredRole: "Full Stack Developer",
  matchPercentage: 72,
  coreSkills: {
    acquired: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Responsive Design",
      "Version Control",
    ],
    missing: [
      "Node.js",
      "Express",
      "Database Design",
      "API Development",
      "Server Deployment",
    ],
  },
  recommendations: [
    {
      id: "rec1",
      title: "Learn Node.js Fundamentals",
      description: "Master the basics of server-side JavaScript with Node.js",
      resource: {
        title: "Complete Node.js Developer Course",
        provider: "Udemy",
        duration: "35 hours",
        url: "https://upskillr.io/courses/nodejs-fundamentals",
      },
    },
    {
      id: "rec2",
      title: "Database Design & Implementation",
      description: "Learn SQL and NoSQL database concepts and implementation",
      resource: {
        title: "Database Design Mastery",
        provider: "UpSkillr",
        duration: "16 hours",
        url: "https://upskillr.io/courses/database-design",
      },
    },
    {
      id: "rec3",
      title: "API Development with Express",
      description: "Build RESTful APIs with Express.js framework",
      resource: {
        title: "RESTful API Development",
        provider: "Coursera",
        duration: "12 hours",
        url: "https://upskillr.io/courses/api-development",
      },
    },
  ],
};

const CareerGuidancePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [activePath, setActivePath] = useState(careerPathsData[0]);
  const [draggingJob, setDraggingJob] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const headerRef = useRef(null);

  useEffect(() => {
    // Simulate API data loading
    const timer = setTimeout(() => {
      setLoading(false);
      setUserData({
        name: "John Doe",
        currentRole: "Frontend Developer",
        experience: "3 years",
        profileCompleteness: 85,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const tabVariants = {
    inactive: { opacity: 0.6 },
    active: { opacity: 1 },
  };

  const handleDragStart = (jobId: string) => {
    setDraggingJob(jobId);
  };

  const handleDragEnd = () => {
    setDraggingJob(null);
  };

  const handleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Career Guidance | UpSkillr</title>
        <meta
          name="description"
          content="Personalized career guidance and planning powered by AI"
        />
      </Head>

      <NoiseBackground />
      <FloatingElements />

      <Header />

      <main className="pt-24 pb-20 min-h-screen bg-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          {/* Welcome section */}
          <section className="mb-12">
            <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Hello, {userData?.name || "there"}!
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Your personalized career dashboard is ready
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden md:block">
                    <div className="text-sm text-gray-400">
                      Profile Completeness
                    </div>
                    <div className="w-48 h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
                        style={{
                          width: `${userData?.profileCompleteness || 0}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {userData?.profileCompleteness || 0}% Complete
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-lg hover:shadow-blue-600/20 text-sm whitespace-nowrap"
                  >
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Main tabs section */}
          <Tab.Group onChange={(index: number) => setActiveTab(index)}>
            <Tab.List className="flex flex-wrap gap-2 mb-8">
              <Tab
                as={motion.div}
                initial="inactive"
                animate={activeTab === 0 ? "active" : "inactive"}
                variants={tabVariants}
                className={({ selected }: { selected: boolean }) =>
                  `px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selected
                      ? "bg-blue-500/20 text-white border border-blue-500/50 shadow-lg shadow-blue-500/10"
                      : "bg-gray-800/40 hover:bg-gray-800/70 text-gray-300 border border-gray-700"
                  }`
                }
              >
                <FaRoad className="text-blue-400" />
                <span>Career Paths</span>
              </Tab>

              <Tab
                as={motion.div}
                initial="inactive"
                animate={activeTab === 1 ? "active" : "inactive"}
                variants={tabVariants}
                className={({ selected }: { selected: boolean }) =>
                  `px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selected
                      ? "bg-purple-500/20 text-white border border-purple-500/50 shadow-lg shadow-purple-500/10"
                      : "bg-gray-800/40 hover:bg-gray-800/70 text-gray-300 border border-gray-700"
                  }`
                }
              >
                <FaPuzzlePiece className="text-purple-400" />
                <span>Skill Analysis</span>
              </Tab>

              <Tab
                as={motion.div}
                initial="inactive"
                animate={activeTab === 2 ? "active" : "inactive"}
                variants={tabVariants}
                className={({ selected }: { selected: boolean }) =>
                  `px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selected
                      ? "bg-emerald-500/20 text-white border border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                      : "bg-gray-800/40 hover:bg-gray-800/70 text-gray-300 border border-gray-700"
                  }`
                }
              >
                <FaBriefcase className="text-emerald-400" />
                <span>Job Matches</span>
              </Tab>
            </Tab.List>

            <Tab.Panels>
              {/* Career Paths Panel */}
              <Tab.Panel>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Paths list sidebar */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-lg">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <FaRoad className="mr-2 text-blue-400" /> Your Career
                        Paths
                      </h2>

                      <div className="space-y-3">
                        {careerPathsData.map((path) => (
                          <motion.div
                            key={path.id}
                            onClick={() => setActivePath(path)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                              activePath.id === path.id
                                ? "bg-blue-500/20 border border-blue-500/40 shadow-lg shadow-blue-500/5"
                                : "bg-gray-800/40 border border-gray-700 hover:border-blue-500/30"
                            }`}
                          >
                            <div className="flex justify-between">
                              <h3 className="font-medium">{path.title}</h3>
                              <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">
                                {path.currentLevel}
                              </span>
                            </div>

                            <div className="mt-2">
                              <div className="text-xs text-gray-400 mb-1">
                                Progress
                              </div>
                              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${path.progress}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                                ></motion.div>
                              </div>
                              <div className="flex justify-between text-xs mt-1">
                                <span>Started</span>
                                <span>{path.progress}%</span>
                                <span>Completed</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        <button className="w-full p-4 rounded-lg border border-dashed border-gray-600 hover:border-blue-400 text-gray-400 hover:text-blue-400 transition-colors hover:bg-blue-500/5 duration-300">
                          <div className="flex items-center justify-center">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            <span>Explore More Paths</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Path details and visualization */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 shadow-lg">
                      <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        {activePath.title}
                      </h2>
                      <p className="text-gray-400 mb-6">
                        {activePath.description}
                      </p>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <FaRoad className="mr-2 text-blue-400" /> Milestones
                          </h3>
                          <div className="space-y-3">
                            {activePath.milestones.map((milestone, index) => (
                              <div
                                key={milestone.id}
                                className="relative pl-8 pb-3"
                              >
                                <div
                                  className={`absolute top-0 left-2 h-full w-0.5 ${
                                    milestone.complete
                                      ? "bg-blue-500"
                                      : "bg-gray-700"
                                  }`}
                                ></div>
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className={`absolute top-1 left-0 w-4 h-4 rounded-full flex items-center justify-center ${
                                    milestone.complete
                                      ? "bg-blue-500"
                                      : "bg-gray-700"
                                  }`}
                                >
                                  {milestone.complete && (
                                    <svg
                                      className="w-2.5 h-2.5 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      />
                                    </svg>
                                  )}
                                </motion.div>
                                <div
                                  className={
                                    index === activePath.milestones.length - 1
                                      ? "pb-0"
                                      : ""
                                  }
                                >
                                  <h4
                                    className={`font-medium ${
                                      milestone.complete
                                        ? "text-white"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {milestone.title}
                                  </h4>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                              <FaGraduationCap className="mr-2 text-purple-400" />{" "}
                              Skills Acquired
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {activePath.skills.acquired.map((skill) => (
                                <motion.span
                                  key={skill}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-100 text-sm border border-purple-500/30"
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                              <FaLightbulb className="mr-2 text-amber-400" />{" "}
                              Recommended Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {activePath.skills.recommended.map((skill) => (
                                <motion.span
                                  key={skill}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-3 py-1 rounded-full bg-gray-800 border border-amber-500/30 text-gray-300 text-sm"
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <FaRocket className="mr-2 text-blue-400" />{" "}
                            Recommended Next Steps
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activePath.nextSteps.map((step) => (
                              <motion.div
                                key={step.id}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="p-4 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-blue-500/50 transition-colors shadow-lg"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      {step.type === "course" ? (
                                        <FaGraduationCap className="text-purple-400 mr-2" />
                                      ) : (
                                        <FaTrophy className="text-amber-400 mr-2" />
                                      )}
                                      <span className="text-xs uppercase text-gray-400">
                                        {step.type}
                                      </span>
                                    </div>
                                    <h4 className="font-medium mt-1">
                                      {step.title}
                                    </h4>
                                    <p className="text-sm text-gray-400 mt-1">
                                      {step.provider} • {step.duration}
                                    </p>
                                  </div>

                                  <div className="text-right">
                                    <div className="text-sm font-medium text-blue-400">
                                      {step.matchScore}%
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Match
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3 flex justify-end">
                                  <button className="px-3 py-1 text-sm rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors">
                                    View Details
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 overflow-hidden h-[400px] shadow-lg">
                      <h3 className="text-lg font-semibold mb-2">
                        Career Path Visualization
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Interactive 3D visualization of your selected career
                        path
                      </p>
                      <div className="h-[300px] w-full">
                        <VisualizationScene activeTab={0} />
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* Skill Analysis Panel */}
              <Tab.Panel>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Skill Gap Analysis */}
                  <div className="lg:col-span-2">
                    <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 mb-6 shadow-lg">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                            Skill Gap Analysis
                          </h2>
                          <p className="text-gray-400">
                            From {skillGapsData.currentRole} to{" "}
                            {skillGapsData.desiredRole}
                          </p>
                        </div>

                        <motion.div
                          className="mt-4 md:mt-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <div className="bg-gray-800/80 rounded-full px-4 py-1 flex items-center shadow-lg border border-purple-500/30">
                            <div className="text-2xl font-bold mr-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                              {skillGapsData.matchPercentage}%
                            </div>
                            <div className="text-xs text-gray-400 leading-tight">
                              Skills
                              <br />
                              Match
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <FaGraduationCap className="mr-2 text-purple-400" />{" "}
                            Skills You Have
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skillGapsData.coreSkills.acquired.map((skill) => (
                              <motion.span
                                key={skill}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-100 text-sm border border-purple-500/30"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <FaPuzzlePiece className="mr-2 text-pink-400" />{" "}
                            Skills To Acquire
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skillGapsData.coreSkills.missing.map((skill) => (
                              <motion.span
                                key={skill}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 rounded-full bg-gray-800 border border-pink-500/30 text-gray-300 text-sm"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="overflow-hidden h-[300px] mt-2">
                        <VisualizationScene activeTab={1} />
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 mb-6 shadow-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FaLightbulb className="mr-2 text-amber-400" /> Learning
                        Recommendations
                      </h3>

                      <div className="space-y-4">
                        {skillGapsData.recommendations.map((recommendation) => (
                          <motion.div
                            key={recommendation.id}
                            whileHover={{
                              y: -5,
                              boxShadow:
                                "0 10px 25px -5px rgba(124, 58, 237, 0.1)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-4 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 shadow-lg"
                          >
                            <h4 className="font-medium">
                              {recommendation.title}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">
                              {recommendation.description}
                            </p>

                            <div className="mt-3 p-3 rounded bg-gray-900/50 text-sm backdrop-blur-sm">
                              <div className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                                {recommendation.resource.title}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {recommendation.resource.provider} •{" "}
                                {recommendation.resource.duration}
                              </div>
                              <div className="mt-2">
                                <a
                                  href={recommendation.resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-purple-400 hover:text-purple-300 text-xs group"
                                >
                                  <span>View Resource</span>
                                  <svg
                                    className="w-3 h-3 ml-1 transform transition-transform group-hover:translate-x-1"
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
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full p-3 rounded-lg border border-dashed border-gray-600 hover:border-purple-400 text-gray-400 hover:text-purple-400 transition-colors hover:bg-purple-500/5 text-sm"
                        >
                          <div className="flex items-center justify-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            <span>View More Recommendations</span>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* Job Matches Panel */}
              <Tab.Panel>
                <div className="mb-8">
                  <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                        Job Matches
                      </h2>

                      <div className="flex gap-2 mt-4 md:mt-0">
                        <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:border-emerald-500/30 text-sm flex items-center gap-1">
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
                              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                          </svg>
                          <span>Filter</span>
                        </button>

                        <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:border-emerald-500/30 text-sm flex items-center gap-1">
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
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                          </svg>
                          <span>Sort</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {jobRecommendationsData.map((job) => (
                        <motion.div
                          key={job.id}
                          layoutId={job.id}
                          drag={draggingJob === job.id}
                          dragConstraints={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                          }}
                          onDragStart={() => handleDragStart(job.id)}
                          onDragEnd={handleDragEnd}
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="p-6 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-emerald-500/40 transition-all duration-300 shadow-lg relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 h-20 w-20 overflow-hidden">
                            <div
                              className="bg-gradient-to-tr from-emerald-500 to-teal-400 text-white px-6 py-1 rotate-45 translate-y-4 translate-x-2 text-xs font-medium shadow-lg"
                              style={{ width: "140%" }}
                            >
                              {job.matchScore}% Match
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="mb-4 md:mb-0 pr-12">
                              <h3 className="text-xl font-semibold mb-1">
                                {job.title}
                              </h3>
                              <div className="text-gray-300 mb-3">
                                {job.company} • {job.location}
                              </div>

                              <p className="text-gray-400 text-sm mb-4">
                                {job.description}
                              </p>

                              <div className="flex flex-wrap gap-3 mb-4">
                                <div className="flex items-center text-gray-400 text-sm">
                                  <FaCalendarAlt className="mr-1 text-xs" />
                                  <span>
                                    Posted:{" "}
                                    {new Date(
                                      job.postedDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-400 text-sm">
                                  <FaCalendarAlt className="mr-1 text-xs" />
                                  <span>
                                    Deadline:{" "}
                                    {new Date(
                                      job.applicationDeadline
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center text-emerald-400 text-sm">
                                  <FaDollarSign className="mr-1" />
                                  <span>{job.salary}</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <div className="text-xs text-gray-400 mb-1">
                                    Matching Skills
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {job.skills.matching.map((skill) => (
                                      <span
                                        key={skill}
                                        className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-100 text-xs border border-emerald-500/30"
                                      >
                                        <FaCheck className="inline mr-1 text-xs" />
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-xs text-gray-400 mb-1">
                                    Skills to Develop
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {job.skills.missing.map((skill) => (
                                      <span
                                        key={skill}
                                        className="px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs"
                                      >
                                        <FaTimes className="inline mr-1 text-xs text-gray-500" />
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex mt-4 gap-2 justify-end">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm flex items-center gap-1 transition-colors"
                              onClick={() => handleSaveJob(job.id)}
                            >
                              {savedJobs.includes(job.id) ? (
                                <>
                                  <FaStar className="text-amber-400" />
                                  <span>Saved</span>
                                </>
                              ) : (
                                <>
                                  <FaStar className="text-gray-500" />
                                  <span>Save</span>
                                </>
                              )}
                            </motion.button>

                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm shadow-lg shadow-emerald-500/20 transition-all duration-300"
                            >
                              Apply Now
                            </motion.button>
                          </div>

                          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-teal-500/0"></div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-6 py-2 rounded-lg border border-dashed border-gray-600 hover:border-emerald-400 text-gray-400 hover:text-emerald-400 transition-colors hover:bg-emerald-500/5"
                      >
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span>Load More Job Matches</span>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 shadow-lg mt-8 overflow-hidden">
                    <h3 className="text-lg font-semibold mb-3">
                      Career Market Trends
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Recent trends in your target job market based on real-time
                      data
                    </p>

                    <div className="h-[300px] w-full">
                      <VisualizationScene activeTab={2} />
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </Layout>
  );
};

export default CareerGuidancePage;
