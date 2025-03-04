"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "../../utils/SplitText";

import GlobeVisualization from "../3d/GlobeVisualization";
import SparkleButton from "../ui/SparkleButton";
import { FaAws, FaGoogle, FaMicrosoft } from "react-icons/fa";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const currentTime = "2025-03-04 07:04:32";
  const currentUser = "vkhare2909";

  useEffect(() => {
    let headlineSplit: any;
    let subtitleSplit: any;

    const animateText = async () => {
      // Try-catch to handle potential SplitText issues
      try {
        if (headlineRef.current && subtitleRef.current) {
          // Wait a tiny bit to ensure fonts are loaded
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Split text animation
          headlineSplit = new SplitText(headlineRef.current, {
            type: "words,chars",
          });

          subtitleSplit = new SplitText(subtitleRef.current, {
            type: "lines",
          });

          // Headline animation
          gsap.set(headlineSplit.chars, { opacity: 0, y: 20, rotationX: -80 });
          gsap.to(headlineSplit.chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.02,
            duration: 1,
            ease: "power4.out",
          });

          // Subtitle animation
          gsap.set(subtitleSplit.lines, { opacity: 0, y: 20 });
          gsap.to(subtitleSplit.lines, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5,
          });
        }
      } catch (error) {
        console.log("SplitText animation fallback");
        // Fallback animation if SplitText fails
        if (headlineRef.current) {
          gsap.fromTo(
            headlineRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
          );
        }

        if (subtitleRef.current) {
          gsap.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
          );
        }
      }
    };

    animateText();

    // Parallax effect
    gsap.to(".parallax-bg", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Cleanup
    return () => {
      if (headlineSplit) headlineSplit.revert();
      if (subtitleSplit) subtitleSplit.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
    >
      {/* Background Elements - Expanded to cover all content */}
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

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium border border-white/20 inline-flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Career Navigation Platform
            </span>
          </motion.div>

          {/* Headline with robust animation approach */}
          <div className="mb-6">
            <h1
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span
                className="inline-block gradient-text"
                style={{
                  background:
                    "linear-gradient(to right, #38bdf8, #d946ef, #2dd4bf)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Level Up Your Career
              </span>{" "}
              <span className="inline-block">With</span>{" "}
              <span className="relative inline-block">
                AI & Blockchain
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0,5 Q40,0 80,5 T160,5 T240,5"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#d946ef" />
                      <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
          </div>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-md"
          >
            Navigate your career journey with AI-powered guidance and secure
            your achievements with blockchain-verified credentials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <SparkleButton
              href="/signup"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
            >
              Start Your Journey
            </SparkleButton>

            <Link
              href="#how-it-works"
              className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-all duration-300 flex items-center justify-center group"
            >
              How It Works
              <svg
                className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex items-center space-x-6"
          >
            <p className="text-sm text-gray-400">
              Trusted by industry leaders:
            </p>
            <div className="flex space-x-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <FaGoogle className="text-xl md:text-2xl" />
              <FaMicrosoft className="text-xl md:text-2xl" />
              <FaAws className="text-xl md:text-2xl" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative h-[600px] w-full z-0"
        >
          {/* Globe container with increased height */}
          <div className="absolute inset-0">
            <GlobeVisualization />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div
              className="relative w-[300px] h-[300px] overflow-hidden rounded-xl shadow-lg"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <a
            href="#features"
            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M19 12L12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Add float animation */}
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

        /* Fallback for the gradient text in case background-clip isn't working */
        @supports not (background-clip: text) {
          .gradient-text {
            background: none !important;
            color: #38bdf8 !important;
          }
        }
      `}</style>
    </section>
  );
}
