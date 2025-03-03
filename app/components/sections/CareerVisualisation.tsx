"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

export default function CareerVisualization() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // User data and timestamp
  const currentDateTime = "2025-03-03 19:07:52";
  const currentUser = "vkhare2909";

  // Mouse parallax effect for the 3D scene
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 70 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-in-up", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tabItems = [
    {
      id: "roadmap",
      title: "Career Roadmap",
      description:
        "Visualize your career path with customizable milestones and achievements in an interactive 3D environment.",
      features: [
        "Interactive skill nodes",
        "Career path branching",
        "Milestone tracking",
        "Real-time updates",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "skills",
      title: "Skill Forest",
      description:
        "Watch your skills grow like trees in a forest. The more you learn, the more your forest flourishes.",
      features: [
        "Skill growth visualization",
        "Learning progress tracking",
        "Skill relationships",
        "Industry demand heatmap",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "network",
      title: "Network Graph",
      description:
        "See how your professional connections and skills form a powerful network that opens new opportunities.",
      features: [
        "Connection visualization",
        "Industry clustering",
        "Opportunity pathways",
        "Recommendation highlights",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="visualization"
      className="py-24 relative"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          {/* User and time badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-1.5 border border-gray-700/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">
                <span className="font-medium text-indigo-400">
                  {currentUser}
                </span>{" "}
                • {currentDateTime} UTC
              </span>
            </div>
          </motion.div>

          <span className="text-sm font-medium text-indigo-400 uppercase tracking-wider">
            Immersive Experience
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            3D Career Visualization
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Track your career progress with our interactive 3D visualization
            tools that make career planning engaging and insightful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 fade-in-up">
            <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 p-1 rounded-xl mb-8">
              <div className="flex">
                {tabItems.map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
                      activeTab === index
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {activeTab === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(79, 70, 229, 0.2), rgba(147, 51, 234, 0.2))",
                        }}
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={activeTab}
              className="space-y-6"
            >
              <h3
                className="text-2xl font-bold"
                style={{
                  background: "linear-gradient(to right, #4f46e5, #7e22ce)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {tabItems[activeTab].title}
              </h3>

              <p className="text-gray-300">{tabItems[activeTab].description}</p>

              <ul className="space-y-3">
                {tabItems[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <svg
                      className="w-5 h-5 text-indigo-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
              >
                Explore {tabItems[activeTab].title}
              </motion.button>

              {/* Last interaction info */}
              <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
                <span>Last interaction: {currentUser}</span>
                <span>{currentDateTime}</span>
              </div>
            </motion.div>
          </div>

          <div className="order-1 md:order-2 fade-in-up">
            <motion.div
              style={{ rotateX, rotateY, perspective: 1000 }}
              className="h-[400px] bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden relative"
            >
              <Image
                src={tabItems[activeTab].imageUrl}
                alt={tabItems[activeTab].title}
                fill
                className="object-cover"
              />

              {/* User indicator on the visualization */}
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-gray-300 border border-gray-700/30 flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                <span>Viewing: {currentUser}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background glow effect */}
      <div
        className="absolute -z-10 bottom-0 left-0 w-full h-[500px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, rgba(17, 24, 39, 0) 70%)",
        }}
      ></div>
    </section>
  );
}
