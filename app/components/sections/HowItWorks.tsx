"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // User data
  const currentDateTime = "2025-03-03 19:06:04";
  const currentUser = "vkhare2909";

  useEffect(() => {
    if (!timelineRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
      },
    });

    // Animate the progress line
    timeline.to(".timeline-progress", {
      height: "100%",
      duration: 1,
      ease: "none",
    });

    // Animate each step as it comes into view
    const steps = gsap.utils.toArray(".timeline-step");
    steps.forEach((step, i) => {
      gsap.to(step as Element, {
        scrollTrigger: {
          trigger: step as Element,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const steps = [
    {
      title: "User Onboards",
      description:
        "Upload your resume and fill out career preferences to get started on your personalized journey.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      title: "AI Analysis",
      description:
        "Our AI analyzes your profile to identify skill gaps and recommend suitable jobs & learning paths.",
      image:
        "https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Resume Optimization",
      description:
        "The AI Resume Builder creates optimized resumes tailored for specific jobs to boost your visibility.",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      title: "Career Visualization",
      description:
        "Track your progress with an interactive 3D career roadmap that visualizes your journey.",
      image:
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      title: "Blockchain Credentials",
      description:
        "Earn certifications and skill badges minted as NFTs for secure, verifiable proof of your achievements.",
      image:
        "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Job & Course Matching",
      description:
        "Receive continuous AI suggestions for best-fit jobs and courses to advance your career.",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      gradient: "from-pink-500 to-indigo-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 relative"
      style={{
        background:
          "linear-gradient(to bottom, rgb(17, 24, 39), rgba(0, 0, 0, 0.8))",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-indigo-400 uppercase tracking-wider"
          >
            The Process
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
          >
            How UpSkillr Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Follow these six steps to transform your career journey and unlock
            new opportunities with our AI-powered platform.
          </motion.p>
        </div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline track */}
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-800">
            <div
              className="timeline-progress absolute top-0 left-0 right-0 h-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgb(79, 70, 229), rgb(147, 51, 234), rgb(236, 72, 153))",
              }}
            ></div>
          </div>

          {/* Timeline steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`timeline-step flex items-center opacity-0 ${
                  index % 2 === 0
                    ? "flex-row -translate-x-4"
                    : "flex-row-reverse -translate-x-4 md:translate-x-4"
                }`}
              >
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "text-right pr-10" : "text-left pl-10"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>

                  {/* Add user tag to first step */}
                  {index === 0 && (
                    <div className="inline-flex items-center mt-3 text-xs text-gray-500">
                      <span>Created by</span>
                      <span className="ml-1 text-indigo-400">
                        {currentUser}
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold`}
                  >
                    {index + 1}
                  </div>
                </div>

                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "pl-10" : "pr-10"
                  }`}
                >
                  <div className="relative w-full h-40 md:h-64 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain p-4"
                    />

                    {/* Last updated timestamp */}
                    {index === steps.length - 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm text-[10px] text-gray-400 px-2 py-1 rounded">
                        Last updated: {currentDateTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
