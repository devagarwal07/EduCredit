"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  FaBrain,
  FaFileAlt,
  FaShieldAlt,
  FaCube,
  FaGamepad,
} from "react-icons/fa";
import Image from "next/image";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  currentUser?: string;
  currentTime?: string;
  imageUrl?: string;
};

function FeatureCard({
  icon,
  title,
  description,
  delay,
  currentUser,
  currentTime,
  imageUrl,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:bg-white/15 transition-all duration-500 group flex flex-col h-full"
    >
      {/* Image container */}
      {imageUrl && (
        <div className="mb-6 w-full h-48 overflow-hidden rounded-lg relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40 z-10"></div>
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      )}

      <div
        className="relative mb-6 w-14 h-14 flex items-center justify-center rounded-lg overflow-hidden"
        style={{
          background: "linear-gradient(to bottom right, #4f46e5, #7e22ce)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        <div className="z-10 text-2xl text-white">{icon}</div>
      </div>

      <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-indigo-400">
        {title}
      </h3>

      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>

      {currentUser && currentTime && (
        <div className="mt-4 mb-2 flex items-center text-xs text-gray-500">
          <span className="text-indigo-400">{currentUser}</span>
          <span className="mx-2">•</span>
          <span>{currentTime}</span>
        </div>
      )}

      <div className="mt-auto pt-6 flex items-center text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <span>Learn more</span>
        <svg
          className="ml-2 w-5 h-5"
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
      </div>
    </motion.div>
  );
}

// New component for the image cards
type ImageCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  delay: number;
};

function ImageCard({ imageUrl, title, description, delay }: ImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-500 group h-full flex flex-col"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-50 z-10"></div>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-indigo-400">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
        <div className="mt-auto pt-6 flex items-center text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>Explore</span>
          <svg
            className="ml-2 w-5 h-5"
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
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const currentUser = "vkhare2909";
  const currentTime = "2025-03-03 20:06:47";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Career Guidance",
      description:
        "Our smart career advisor analyzes your resume and suggests personalized career paths, identifying skill gaps and recommending learning resources.",
      imageUrl:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      icon: <FaFileAlt />,
      title: "AI Resume Builder & Optimization",
      description:
        "NLP-based resume generator that structures ATS-friendly resumes with keyword optimization based on job descriptions.",
      imageUrl:
        "https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      icon: <FaShieldAlt />,
      title: "Blockchain-Verified Credentials",
      description:
        "NFT-based skill badges and certifications for tamper-proof verification with smart contracts ensuring trustworthy validation.",
      imageUrl:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    },
    {
      icon: <FaCube />,
      title: "3D Career Progression Visualization",
      description:
        "Three.js-powered interactive career roadmap for tracking progress in a gamified way with immersive animations.",
      imageUrl:
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      icon: <FaGamepad />,
      title: "Stunning UI/UX & Gamification",
      description:
        "Engaging and intuitive design with GSAP-powered animations and gamified learning paths to keep users motivated.",
      imageUrl:
        "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80",
    },
  ];

  // New image cards data
  const imageCards = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      title: "Remote Team Collaboration",
      description:
        "Connect with industry professionals across the globe to expand your skills and network.",
      delay: 0.6,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      title: "Industry-Focused Learning Paths",
      description:
        "Customized learning trajectories based on specific industry requirements and future trends.",
      delay: 0.7,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Mentorship Programs",
      description:
        "Connect with leaders in your desired field for personalized coaching and insight.",
      delay: 0.8,
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-24 relative">
      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 w-full h-20 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0))",
        }}
      ></div>
      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-20 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0))",
        }}
      ></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center mb-3 px-3 py-1 bg-gray-800/70 rounded-full"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-medium text-gray-400 mr-2">
              Last updated:
            </span>
            <span className="text-xs font-medium text-indigo-400">
              {currentTime}
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-indigo-400 uppercase tracking-wider"
          >
            Key Features
          </motion.span>

          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mt-2 mb-4"
          >
            Revolutionize Your Career Journey
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Our cutting-edge platform combines the power of AI and blockchain to
            provide a comprehensive career development solution.
          </p>
        </div>

        {/* First feature gets user details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
              currentUser={index === 0 ? currentUser : undefined}
              currentTime={index === 0 ? currentTime : undefined}
              imageUrl={feature.imageUrl}
            />
          ))}
        </div>

        {/* Image cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imageCards.map((card, index) => (
            <ImageCard
              key={index}
              imageUrl={card.imageUrl}
              title={card.title}
              description={card.description}
              delay={card.delay}
            />
          ))}
        </div>
      </div>

      {/* Large background glow */}
      <div
        className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{
          background: "rgba(79, 70, 229, 0.1)",
        }}
      ></div>
    </section>
  );
}
