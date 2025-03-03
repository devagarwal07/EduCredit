"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Career Guidance", href: "/career-guidance" },
    { name: "Resume Builder", href: "/resume-builder" },
    { name: "Credentials", href: "/credentials" },
    { name: "About", href: "/about" },
  ];

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const currentDate = "2025-03-03";
  const currentUser = "vkhare2909";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
        style={{
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.svg"
                alt="UpSkillr Logo"
                fill
                className="object-contain"
              />
            </div>
            <span
              className="text-xl font-bold"
              style={{
                background:
                  "linear-gradient(to right, #4f46e5, #7e22ce, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              UpSkillr
            </span>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:block"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.ul className="flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.li key={item.name} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium relative transition-colors duration-300 ${
                      pathname === item.href
                        ? "text-indigo-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 right-0 bottom-[-5px] h-[2px] bg-indigo-400"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>

          <div className="flex items-center space-x-4">
            {/* User info display */}
            <div className="hidden md:flex items-center text-xs text-gray-400">
              <span>{currentDate}</span>
              <span className="mx-2">|</span>
              <span className="text-indigo-400">{currentUser}</span>
            </div>

            <Link
              href="/login"
              className="hidden sm:block bg-transparent border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition-colors duration-300 px-4 py-2 rounded-full text-sm"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="hidden sm:block bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 px-4 py-2 rounded-full text-sm"
            >
              Sign Up
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="lg:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg pt-24"
          >
            <nav className="container mx-auto px-6 py-8">
              <ul className="space-y-6">
                {navigation.map((item) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-lg font-medium block py-2 transition-colors duration-300 ${
                        pathname === item.href
                          ? "text-indigo-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}

                {/* User info in mobile view */}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="py-2 text-sm text-gray-400"
                >
                  <div className="flex flex-col space-y-1">
                    <span>Date: {currentDate}</span>
                    <span>
                      User:{" "}
                      <span className="text-indigo-400">{currentUser}</span>
                    </span>
                  </div>
                </motion.li>

                <div className="pt-6 space-y-4">
                  <Link
                    href="/login"
                    className="w-full block text-center bg-transparent border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition-colors duration-300 px-4 py-2 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full block text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 px-4 py-2 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes hover-effect {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
          100% {
            transform: translateY(0);
          }
        }

        a:hover {
          animation: hover-effect 0.5s ease;
        }
      `}</style>
    </>
  );
}
