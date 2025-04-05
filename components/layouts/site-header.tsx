"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const mainNavItems = [
  {
    title: "Home",
    href: "/",
    onlyMobile: true,
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Marketplace",
    href: "/marketplace",
  },
  {
    title: "For Students",
    href: "#",
    children: [
      {
        title: "Skill Assessment",
        href: "/skill-assessment",
        description: "Verify and showcase your skills",
      },
      {
        title: "Funding Options",
        href: "/funding",
        description: "Connect with investors and funding opportunities",
      },
      {
        title: "Career Simulator",
        href: "/career-simulator",
        description: "Explore career paths based on your skills",
      },
    ],
  },
  {
    title: "For Investors",
    href: "/investors",
  },
  {
    title: "For Employers",
    href: "/employers",
  },
];

export function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname()!;

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevents SSR issues

    const header = document.querySelector("header");
    if (!header) return;

    const ctx = gsap.context(() => {
      const updateHeaderOnScroll = () => {
        gsap.to(header, {
          backdropFilter: window.scrollY > 50 ? "blur(10px)" : "blur(0px)",
          backgroundColor:
            window.scrollY > 50 ? "grey-700" : "rgba(255, 255, 255, 0)",
          boxShadow:
            window.scrollY > 50 ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
          duration: 0.3,
          color: window.scrollY > 50 ? "black" : "white",
        });
      };

      window.addEventListener("scroll", updateHeaderOnScroll);
      return () => window.removeEventListener("scroll", updateHeaderOnScroll);
    });

    return () => ctx.revert(); // Cleanup GSAP animations properly
  }, []);

  const toggleDropdown = (title: string) => {
    setActiveDropdown((prev) => (prev === title ? null : title));
  };

  const mobileNavVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                EduCredit
                <span className="text-foreground">Pro</span>
              </span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex gap-6">
            {mainNavItems
              .filter((item) => !item.onlyMobile)
              .map((item, index) => {
                if (item.children) {
                  return (
                    <div key={index} className="relative group">
                      <button
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                          activeDropdown === item.title
                            ? "text-primary"
                            : "text-foreground"
                        )}
                        onClick={() => toggleDropdown(item.title)}
                      >
                        {item.title}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.title && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 top-full mt-2 w-64 rounded-md border bg-background p-4 shadow-lg"
                          >
                            <div className="flex flex-col gap-3">
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  href={child.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block rounded-md p-2 text-sm hover:bg-muted"
                                >
                                  <div className="font-medium">
                                    {child.title}
                                  </div>
                                  {child.description && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {child.description}
                                    </div>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary"
                        : "text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <div className="hidden md:flex gap-2">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </SignedOut>

          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            variants={mobileNavVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[300px] bg-background border-l shadow-xl"
          >
            <div className="flex flex-col h-full py-6 px-6">
              <div className="flex justify-end mb-8">
                <button onClick={() => setMobileNavOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {mainNavItems.map((item, index) => {
                  if (item.children) {
                    return (
                      <div key={index} className="space-y-3">
                        <button
                          className={cn(
                            "flex items-center text-lg font-medium transition-colors hover:text-primary",
                            pathname.startsWith(item.href)
                              ? "text-primary"
                              : "text-foreground"
                          )}
                          onClick={() => toggleDropdown(item.title)}
                        >
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 ml-1 transition-transform duration-200",
                              activeDropdown === item.title ? "rotate-180" : ""
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.title && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 flex flex-col gap-3 border-l border-border">
                                {item.children.map((child, childIndex) => (
                                  <Link
                                    key={childIndex}
                                    href={child.href}
                                    onClick={() => setMobileNavOpen(false)}
                                    className="text-foreground hover:text-primary transition-colors py-1"
                                  >
                                    {child.title}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-6">
                <SignedOut>
                  <div className="flex flex-col gap-4 w-full">
                    <Link href="/sign-in" className="w-full">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up" className="w-full">
                      <Button variant="default" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </SignedOut>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
