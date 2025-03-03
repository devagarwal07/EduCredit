"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaUserClock,
} from "react-icons/fa";

// Current user data
const currentDateTime = "2025-03-03 19:11:36";
const currentUser = "vkhare2909";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Software Developer",
    company: "TechVision",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    quote:
      "UpSkillr transformed my career trajectory. The AI career guidance helped me identify key skills I was missing, and the blockchain credentials gave me an edge in job applications.",
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "UX Designer",
    company: "Creative Labs",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    quote:
      "The resume optimization tool landed me interviews at top companies. The 3D career visualization made planning my career path exciting rather than overwhelming.",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Data Scientist",
    company: "DataCore Analytics",
    image:
      "https://images.unsplash.com/photo-1581091870627-3a45013e5495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    quote:
      "As someone transitioning careers, UpSkillr was invaluable. The skill gap analysis pinpointed exactly what I needed to learn, and the blockchain credentials validated my new skills to employers.",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Product Manager",
    company: "Innovate Inc.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    quote:
      "The personalized learning paths and job matching features saved me countless hours. I secured a role that perfectly aligned with my skills and career goals.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;

      if (nextIndex < 0) {
        nextIndex = testimonials.length - 1;
      } else if (nextIndex >= testimonials.length) {
        nextIndex = 0;
      }

      return nextIndex;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 1))",
        }}
      />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          {/* User badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-gray-800/70 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 border border-gray-700/50"
          >
            <FaUserClock className="text-indigo-400" size={14} />
            <div className="text-xs">
              <span className="text-indigo-400 font-medium">{currentUser}</span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-400">{currentDateTime}</span>
            </div>
          </motion.div>

          <span className="text-sm font-medium text-indigo-400 uppercase tracking-wider">
            Success Stories
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Hear From Our Users
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover how UpSkillr has helped professionals across various
            industries accelerate their career growth.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div
            className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden"
            ref={slideRef}
          >
            {/* Background accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background:
                  "linear-gradient(to right, #4f46e5, #7e22ce, #ec4899)",
              }}
            ></div>

            {/* Quote icon */}
            <FaQuoteLeft className="absolute top-8 left-8 text-4xl text-gray-700 opacity-30" />

            {/* Last viewed by indicator */}
            <div className="absolute top-6 right-6 flex items-center space-x-2 text-xs">
              <span className="text-gray-500">Last viewed by</span>
              <span className="text-indigo-400 font-medium">{currentUser}</span>
            </div>

            {/* Testimonial carousel */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="py-8 px-4 md:px-12"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div
                      className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2"
                      style={{ borderColor: "rgba(79, 70, 229, 0.3)" }}
                    >
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-lg md:text-xl text-gray-300 italic mb-6">
                      "{testimonials[currentIndex].quote}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {testimonials[currentIndex].role},{" "}
                          {testimonials[currentIndex].company}
                        </p>
                      </div>

                      <div className="hidden md:block text-right text-xs text-gray-500">
                        <div>
                          Testimonial ID: #{testimonials[currentIndex].id}
                        </div>
                        <div>
                          Added: {new Date(currentDateTime).getMonth() + 1}/
                          {new Date(currentDateTime).getDate()}/
                          {new Date(currentDateTime).getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute bottom-8 right-8 flex items-center space-x-3">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full bg-gray-900/50 border border-gray-700 flex items-center justify-center text-white hover:bg-indigo-500 hover:border-indigo-500 transition-colors"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full bg-gray-900/50 border border-gray-700 flex items-center justify-center text-white hover:bg-indigo-500 hover:border-indigo-500 transition-colors"
                aria-label="Next testimonial"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-indigo-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center"
          >
            <div
              className="text-4xl font-bold mb-2"
              style={{
                background:
                  "linear-gradient(to right, #4f46e5, #7e22ce, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              10,000+
            </div>
            <p className="text-gray-400">Active Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center"
          >
            <div
              className="text-4xl font-bold mb-2"
              style={{
                background:
                  "linear-gradient(to right, #4f46e5, #7e22ce, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              94%
            </div>
            <p className="text-gray-400">Career Advancement Rate</p>
            <div className="mt-2 text-xs text-gray-500">
              Last updated: {currentDateTime}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center"
          >
            <div
              className="text-4xl font-bold mb-2"
              style={{
                background:
                  "linear-gradient(to right, #4f46e5, #7e22ce, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              50,000+
            </div>
            <p className="text-gray-400">Blockchain Credentials Issued</p>
          </motion.div>
        </div>

        {/* Admin note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-800/30 text-gray-500 text-xs rounded-full px-3 py-1">
            <span>Dashboard Session: {currentUser}</span>
            <span>•</span>
            <span>Last Activity: {currentDateTime}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
