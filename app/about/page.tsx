"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import BlurText from "../components/ui/BlurText";
import TextPressure from "../components/ui/TextPressure";
import ImageTrail from "../components/ui/ImageTrail";
import PixelCard from "../components/ui/PixelCard";
import CircularGallery from "../components/ui/CircularGallery";
import FlowingMenu from "../components/ui/FlowingMenu";
import Aurora from "../components/ui/Aurora";
import Orb from "../components/ui/Orb";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaArrowDown,
  FaLightbulb,
  FaHandshake,
  FaAward,
  FaBalanceScale,
  FaCodeBranch,
  FaChartLine,
} from "react-icons/fa";
import Layout from "../components/layout/Layout";

const AboutUs = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const isTeamInView = useInView(teamSectionRef);
  const [trailKey, setTrailKey] = useState(0);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marqueeItems = marqueeRef.current.children;
    const marqueeWidth = marqueeRef.current.scrollWidth;
    const clone = marqueeRef.current.innerHTML;
    marqueeRef.current.innerHTML = clone + clone;

    let currentPos = 0;
    const scroll = () => {
      currentPos -= 1;
      if (Math.abs(currentPos) >= marqueeWidth) currentPos = 0;
      marqueeRef.current!.style.transform = `translateX(${currentPos}px)`;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Force rerender of ImageTrail on view
  useEffect(() => {
    if (isTeamInView) {
      setTrailKey((prevKey) => prevKey + 1);
    }
  }, [isTeamInView]);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  // Team members data with high-quality images
  const teamMembers = [
    {
      name: "Vishal Khare",
      role: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
      bio: "Vishal leads our development team with over 10 years of experience building scalable web applications. He specializes in React, Node.js, and cloud architecture.",
      social: {
        linkedin: "https://linkedin.com/in/vishalkhare",
        github: "https://github.com/vkhare2909",
        twitter: "https://twitter.com/vishalkhare",
      },
    },
    {
      name: "Sophia Chen",
      role: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
      bio: "Sophia brings creative vision to our products with her background in user experience design and psychology. She ensures our applications are intuitive and accessible.",
      social: {
        linkedin: "https://linkedin.com/in/sophiachen",
        github: "https://github.com/sophiachen",
        twitter: "https://twitter.com/sophiachen",
      },
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop",
      bio: "Marcus bridges the gap between technical implementation and business objectives, ensuring our solutions solve real customer problems while driving growth.",
      social: {
        linkedin: "https://linkedin.com/in/marcusrodriguez",
        github: "https://github.com/marcusrodriguez",
        twitter: "https://twitter.com/marcusrodriguez",
      },
    },
    {
      name: "Aisha Johnson",
      role: "Backend Architect",
      image:
        "https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=1000&auto=format&fit=crop",
      bio: "Aisha designs and implements our backend systems with a focus on performance, scalability, and security. She specializes in distributed systems and cloud infrastructure.",
      social: {
        linkedin: "https://linkedin.com/in/aishajohnson",
        github: "https://github.com/aishajohnson",
        twitter: "https://twitter.com/aishajohnson",
      },
    },
    {
      name: "David Park",
      role: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1000&auto=format&fit=crop",
      bio: "David leverages machine learning and data analytics to drive insights across our organization, helping us make data-driven decisions and build intelligent features.",
      social: {
        linkedin: "https://linkedin.com/in/davidpark",
        github: "https://github.com/davidpark",
        twitter: "https://twitter.com/davidpark",
      },
    },
  ];

  // Gallery items for CircularGallery
  const galleryItems = teamMembers.map((member) => ({
    image: member.image,
    text: member.name,
  }));

  // Updated menu items with high-quality images
  const menuItems = [
    {
      link: "#mission",
      text: "Our Mission",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop",
    },
    {
      link: "#team",
      text: "Meet the Team",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop",
    },
    {
      link: "#values",
      text: "Our Values",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2000&auto=format&fit=crop",
    },
    {
      link: "#contact",
      text: "Get in Touch",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  // High-quality images for ImageTrail
  const trailImages = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=300&auto=format&fit=crop",
  ];

  // Values data with icons
  const values = [
    {
      title: "Innovation",
      description:
        "We push boundaries and embrace new technologies to solve complex problems that others find challenging.",
      icon: <FaLightbulb className="text-4xl mb-4 text-purple-400" />,
      color: "purple",
    },
    {
      title: "Collaboration",
      description:
        "We believe in the power of diverse teams working together to create solutions greater than any individual.",
      icon: <FaHandshake className="text-4xl mb-4 text-blue-400" />,
      color: "blue",
    },
    {
      title: "Excellence",
      description:
        "We are committed to delivering high-quality solutions that exceed expectations and set new industry standards.",
      icon: <FaAward className="text-4xl mb-4 text-indigo-400" />,
      color: "indigo",
    },
    {
      title: "Integrity",
      description:
        "We operate with transparency, honesty, and ethical practices in all our business relationships and decisions.",
      icon: <FaBalanceScale className="text-4xl mb-4 text-blue-400" />,
      color: "blue",
    },
    {
      title: "Adaptability",
      description:
        "We embrace change and continuously evolve our processes, skills, and solutions to meet emerging challenges.",
      icon: <FaCodeBranch className="text-4xl mb-4 text-purple-400" />,
      color: "purple",
    },
    {
      title: "Data-Driven",
      description:
        "We make informed decisions based on meaningful analytics, research, and user feedback to drive continuous improvement.",
      icon: <FaChartLine className="text-4xl mb-4 text-indigo-400" />,
      color: "indigo",
    },
  ];

  return (
    <Layout>
      <div
        ref={containerRef}
        className="min-h-screen bg-gray-900 text-white overflow-hidden"
      >
        {/* Hero Section with Aurora background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Aurora
              colorStops={["#3A29FF", "#8b5cf6", "#4f46e5", "#3b82f6"]}
              blend={0.7}
              amplitude={1.2}
            />
          </div>

          <div className="container mx-auto px-4 py-20 z-10 relative">
            <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
              <BlurText
                text="About Our Team"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-5xl md:text-7xl font-bold mb-12 text-white"
              />

              <div
                style={{ position: "relative", height: "200px", width: "100%" }}
                className="my-12"
              >
                <TextPressure
                  text="Building the future together"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#ffffff"
                  strokeColor="#8b5cf6"
                  minFontSize={36}
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl md:text-2xl text-gray-200 mt-8 mb-12 max-w-3xl"
              >
                We are a collective of passionate technologists, designers, and
                visionaries committed to creating exceptional digital
                experiences that inspire and transform.
              </motion.p>

              <motion.a
                href="#team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-2 text-white bg-indigo-600/30 hover:bg-indigo-600/50 backdrop-blur-sm px-8 py-4 rounded-full transition-all group"
              >
                <span className="font-medium">Meet our team</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="group-hover:translate-y-1 transition-transform"
                >
                  <FaArrowDown />
                </motion.div>
              </motion.a>
            </div>
          </div>
        </section>

        {/* Enhanced Marquee Section */}
        <div className="bg-gray-800/90 py-8 overflow-hidden w-full relative backdrop-blur-md">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <Aurora
              colorStops={["#8b5cf6", "#3b82f6", "#06b6d4"]}
              amplitude={0.6}
              blend={0.3}
            />
          </div>
          <div
            ref={marqueeRef}
            className="whitespace-nowrap font-extrabold text-white text-4xl md:text-7xl py-4"
            style={{ willChange: "transform" }}
          >
            <span className="mx-4 text-purple-400">#</span>
            <span className="mx-4">INNOVATION</span>
            <span className="mx-4 text-blue-400">#</span>
            <span className="mx-4">CREATIVITY</span>
            <span className="mx-4 text-purple-400">#</span>
            <span className="mx-4">EXCELLENCE</span>
            <span className="mx-4 text-blue-400">#</span>
            <span className="mx-4">PASSION</span>
            <span className="mx-4 text-purple-400">#</span>
            <span className="mx-4">TEAMWORK</span>
          </div>
        </div>

        {/* Mission Section with Enhanced PixelCard */}
        <section id="mission" className="py-28 px-4 relative">
          <div className="absolute inset-0 z-0 opacity-30">
            <Aurora
              colorStops={["#3b82f6", "#1e40af", "#2563eb"]}
              amplitude={0.4}
              blend={0.2}
            />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-5xl mx-auto">
              <BlurText
                text="Our Mission"
                delay={100}
                animateBy="letters"
                direction="top"
                className="text-3xl md:text-5xl font-bold mb-16 text-center"
              />

              <PixelCard
                variant="blue"
                className="rounded-xl min-h-[400px] relative shadow-lg shadow-blue-900/20"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                  <div className="w-24 h-24 bg-blue-600/30 backdrop-blur-md rounded-full flex items-center justify-center mb-8">
                    <FaLightbulb className="text-4xl text-blue-300" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                    Pushing Boundaries Through Innovation
                  </h2>
                  <p className="text-xl md:text-2xl leading-relaxed z-10 text-center text-gray-100 max-w-3xl">
                    We are dedicated to creating innovative digital solutions
                    that empower businesses and individuals to thrive in an
                    ever-evolving technological landscape. Through our
                    commitment to excellence, collaboration, and continuous
                    learning, we strive to deliver products that not only meet
                    but exceed expectations, making a positive impact on our
                    clients and communities.
                  </p>
                </div>
              </PixelCard>
            </div>
          </div>
        </section>

        {/* Values Section with Enhanced Image Trail */}
        <section id="values" className="py-28 px-4 relative">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Aurora
              colorStops={["#6366f1", "#a855f7", "#ec4899", "#8b5cf6"]}
              amplitude={0.6}
              blend={0.4}
            />
          </div>

          <div className="container mx-auto z-10 relative">
            <BlurText
              text="Our Core Values"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div
                    style={{
                      height: "350px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    className="rounded-xl group shadow-lg shadow-purple-900/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-blue-900/90 group-hover:opacity-95 transition-opacity z-10"></div>
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
                      {value.icon}
                      <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-200 text-lg">
                        {value.description}
                      </p>
                    </div>
                    <ImageTrail
                      key={trailKey + index}
                      items={trailImages}
                      variant={1}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section with Enhanced CircularGallery */}
        <section id="team" ref={teamSectionRef} className="py-28 relative">
          <div className="absolute inset-0 z-0 opacity-30">
            <Aurora
              colorStops={["#4f46e5", "#7c3aed", "#8b5cf6"]}
              amplitude={0.4}
              blend={0.2}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <BlurText
              text="Meet Our Team"
              delay={120}
              animateBy="letters"
              direction="top"
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
            />

            <div className="mb-24">
              <div
                style={{ height: "600px", position: "relative" }}
                className="mx-auto max-w-6xl"
              >
                <CircularGallery
                  items={galleryItems}
                  bend={3}
                  textColor="#ffffff"
                  borderRadius={0.05}
                  font="bold 28px 'DM Sans', sans-serif"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <PixelCard
                  key={index}
                  variant={
                    index % 3 === 0
                      ? "blue"
                      : index % 3 === 1
                      ? "default"
                      : "pink"
                  }
                  className="rounded-xl min-h-[460px] relative shadow-lg shadow-purple-900/20"
                >
                  <div className="absolute inset-0 z-10 p-8 flex flex-col">
                    <div className="w-18 h-18 mx-auto mb-6 rounded-full overflow-hidden relative shadow-lg shadow-purple-900/20 border-2 border-indigo-500/30">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-18 h-18 object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                      {member.name}
                    </h3>
                    <p className="text-center text-purple-300 mb-4 font-medium">
                      {member.role}
                    </p>
                    <p className="text-gray-300 text-base mb-6 flex-1 text-center">
                      {member.bio}
                    </p>
                    <div className="flex justify-center gap-6">
                      <a
                        href={member.social.linkedin}
                        className="text-blue-400 hover:text-blue-300 transition-colors bg-blue-800/20 p-3 rounded-full hover:bg-blue-800/40"
                      >
                        <FaLinkedinIn size={20} />
                      </a>
                      <a
                        href={member.social.github}
                        className="text-gray-400 hover:text-gray-300 transition-colors bg-gray-800/30 p-3 rounded-full hover:bg-gray-800/50"
                      >
                        <FaGithub size={20} />
                      </a>
                      <a
                        href={member.social.twitter}
                        className="text-blue-400 hover:text-blue-300 transition-colors bg-blue-800/20 p-3 rounded-full hover:bg-blue-800/40"
                      >
                        <FaTwitter size={20} />
                      </a>
                    </div>
                  </div>
                </PixelCard>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Section with Enhanced FlowingMenu */}
        <section className="py-28 px-4 relative">
          <div className="absolute inset-0 z-0 opacity-30">
            <Aurora
              colorStops={["#3b82f6", "#8b5cf6", "#ec4899"]}
              amplitude={0.5}
              blend={0.3}
            />
          </div>

          <div className="container mx-auto relative z-10">
            <BlurText
              text="Navigate Our Story"
              delay={100}
              animateBy="words"
              direction="bottom"
              className="text-3xl md:text-5xl font-bold mb-14 text-center"
            />

            <div
              style={{ height: "600px", position: "relative" }}
              className="mt-10 max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-purple-900/20"
            >
              <FlowingMenu items={menuItems} />
            </div>
          </div>
        </section>

        {/* Contact Section with Enhanced Orbs */}
        <section id="contact" className="py-28 px-4 relative">
          <div className="absolute inset-0 z-0 opacity-40">
            <Aurora
              colorStops={["#FF94B4", "#3A29FF", "#4f46e5"]}
              amplitude={0.5}
              blend={0.3}
            />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-5xl mx-auto">
              <BlurText
                text="Get In Touch"
                delay={100}
                animateBy="letters"
                direction="top"
                className="text-3xl md:text-5xl font-bold mb-16 text-center"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    position: "relative",
                  }}
                  className="rounded-xl overflow-hidden shadow-lg shadow-blue-900/20"
                >
                  <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={220}
                    forceHoverState={false}
                  />
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-blue-900/30 backdrop-blur-md">
                    <h3 className="font-bold text-xl mb-4">Email Us</h3>
                    <a
                      href="mailto:contact@company.com"
                      className="text-blue-300 hover:text-blue-200 transition-colors text-lg"
                    >
                      lmaowtf@gmail.com
                    </a>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    position: "relative",
                  }}
                  className="rounded-xl overflow-hidden shadow-lg shadow-purple-900/20"
                >
                  <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={280}
                    forceHoverState={false}
                  />
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-purple-900/30 backdrop-blur-md">
                    <h3 className="font-bold text-xl mb-4">Visit Us</h3>
                    <p className="text-lg">Chennai, Tamil Nadu</p>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    position: "relative",
                  }}
                  className="rounded-xl overflow-hidden shadow-lg shadow-indigo-900/20"
                >
                  <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={180}
                    forceHoverState={false}
                  />
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-indigo-900/30 backdrop-blur-md">
                    <h3 className="font-bold text-xl mb-4">Call Us</h3>
                    <a
                      href="tel:+11234567890"
                      className="text-blue-300 hover:text-blue-200 transition-colors text-lg"
                    >
                      +91 394394394
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg p-10 rounded-xl shadow-lg shadow-purple-900/20 border border-purple-500/10">
                <h3 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                  Send us a message
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-900/60 border border-indigo-500/30 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-gray-900/60 border border-indigo-500/30 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full bg-gray-900/60 border border-indigo-500/30 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden accessibility info with updated date and username */}
        <div className="sr-only" aria-live="polite">
          Current user: vkhare2909. Last updated: 2025-03-09 09:31:44
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
