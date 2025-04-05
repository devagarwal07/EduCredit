"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import FormContainer from "./components/FormContainer";
import LoadingScreen from "./components/LoadingScreen";
import SuccessScreen from "./components/SuccessScreen";
import Layout from "@/app/components/layout/Layout";

// Mock data fetch functions
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

export default function FundingApplicationPage() {
  const [userData, setUserData] = useState<any>(null);
  const [investors, setInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  // Current user info
  const currentTime = "2025-03-28 06:34:36";
  const currentUser = "vkhare2909";

  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const user = await fetchUserData();
      const investorsData = await fetchInvestors();

      setUserData(
        user || {
          name: "John Doe",
          email: "john.doe@example.com",
          location: "San Francisco, CA",
          bio: "Software developer with a passion for building innovative products.",
          skills: [
            { id: 1, name: "JavaScript", level: "Advanced" },
            { id: 2, name: "React", level: "Advanced" },
            { id: 3, name: "TypeScript", level: "Intermediate" },
            { id: 4, name: "Node.js", level: "Intermediate" },
          ],
          career: {
            objectives: [
              "Become a senior full-stack developer",
              "Work on AI-driven applications",
            ],
            desiredSalary: 120000,
          },
          educationCreditScore: 720,
        }
      );

      setInvestors(
        investorsData.length
          ? investorsData
          : [
              {
                id: "inv-001",
                name: "TechFund Ventures",
                type: "Venture Capital",
                logo: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=100&h=100&fit=crop",
              },
              {
                id: "inv-002",
                name: "EduInvest Partners",
                type: "Education Fund",
                logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
              },
              {
                id: "inv-003",
                name: "Future Talent Capital",
                type: "Angel Investor Group",
                logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
              },
            ]
      );

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

  // Animation effect for the heading
  useEffect(() => {
    if (!loading && headlineRef.current) {
      // Animation timeline
      const tl = gsap.timeline();

      // Animate the headline
      tl.fromTo(
        headlineRef.current.querySelectorAll("span"),
        {
          opacity: 0,
          y: 30,
          rotationX: -40,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, [loading]);

  const handleSubmitApplication = (data: any) => {
    console.log("Submitting application:", data);
    setIsSubmitted(true);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (isSubmitted) {
    return <SuccessScreen formData={formData} currentTime={currentTime} />;
  }

  return (
    <Layout>
      <div className="relative min-h-screen py-24 overflow-hidden">
        {/* Background Elements */}
        <div
          className="absolute inset-0 -z-10 parallax-bg"
          style={{ height: "150%" }}
        >
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
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(14,165,233,0.15) 0, rgba(0,0,0,0) 80%)",
              height: "150%",
              width: "100%",
            }}
          />
        </div>

        <div className="container mx-auto px-6">
          <div className="mb-2">
            <span className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium border border-white/20 inline-flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              {currentTime} • {currentUser}
            </span>
          </div>

          <h1 ref={headlineRef} className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Funding</span>{" "}
            <span>Application</span>
          </h1>
          <p className="text-gray-300 mb-10 max-w-2xl">
            Complete the application below to apply for funding from our network
            of investors. Your information will help us match you with the best
            funding options.
          </p>

          <FormContainer
            userData={userData}
            investors={investors}
            initialFormData={formData}
            onSubmit={handleSubmitApplication}
          />
        </div>

        {/* Global styles */}
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
        `}</style>
      </div>
    </Layout>
  );
}
