"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  LineChart,
  Layers,
  BarChart4,
  Users,
  Globe,
  Award,
  Zap,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, -50]);

  // GSAP animations
  useEffect(() => {
    // Stats counter animation
    const statsElements = statsRef.current?.querySelectorAll(".stat-value");
    if (statsElements) {
      statsElements.forEach((stat) => {
        const target = parseInt(stat.textContent || "0", 10);
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          }
        );
      });
    }

    // Features animation
    const features = featuresRef.current?.querySelectorAll(".feature-card");
    if (features) {
      gsap.fromTo(
        features,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Testimonials animation
    const testimonials =
      testimonialsRef.current?.querySelectorAll(".testimonial-card");
    if (testimonials) {
      gsap.fromTo(
        testimonials,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "100% 50%",
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    }
  }, []);

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="w-full py-20 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container flex flex-col items-center text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: heroTextY }}
            className="max-w-3xl mx-auto mb-10 md:mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              <span className="gradient-text">Accelerate</span> Your Journey
              From
              <span className="gradient-text"> Education to Career</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect education funding with verified skills, employer
              partnerships, and community knowledge exchange.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="gradient"
                    withRipple
                    className="text-md px-8"
                  >
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="gradient"
                    withRipple
                    className="text-md px-8"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-md px-8">
                    Learn More
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            style={{ y: heroImageY }}
            className="relative w-full max-w-4xl aspect-video"
          >
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
              alt="Students collaborating"
              fill
              className="object-cover rounded-xl shadow-2xl"
              priority
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="bg-primary-500/20 p-2 rounded-full">
                  <BadgeCheck className="h-6 w-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Skill Verified</h3>
                  <p className="text-xs text-muted-foreground">
                    JavaScript Development
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="bg-secondary-500/20 p-2 rounded-full">
                  <LineChart className="h-6 w-6 text-secondary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Education Credit Score
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    785 - Excellent
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <GraduationCap className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Skill Verification</h3>
            </div>
            <div className="flex flex-col items-center">
              <Briefcase className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Employer Partnerships</h3>
            </div>
            <div className="flex flex-col items-center">
              <LineChart className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Funding Options</h3>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Community Exchange</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="w-full py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Empowering Education Journeys
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform connects students, investors, and employers in a
              dynamic ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <span className="stat-value text-4xl font-bold text-primary">
                25
              </span>
              <span className="text-4xl font-bold text-primary">K+</span>
              <p className="text-muted-foreground mt-2">Students</p>
            </div>
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <span className="stat-value text-4xl font-bold text-primary">
                180
              </span>
              <span className="text-4xl font-bold text-primary">+</span>
              <p className="text-muted-foreground mt-2">Investors</p>
            </div>
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <span className="stat-value text-4xl font-bold text-primary">
                350
              </span>
              <span className="text-4xl font-bold text-primary">+</span>
              <p className="text-muted-foreground mt-2">Employers</p>
            </div>
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <span className="stat-value text-4xl font-bold text-primary">
                12
              </span>
              <span className="text-4xl font-bold text-primary">M+</span>
              <p className="text-muted-foreground mt-2">Funding Secured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="w-full py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Innovative Platform Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive toolkit for education-to-career acceleration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-background p-8 rounded-xl shadow-sm border border-border hover:border-primary/50 transition-all duration-300 card-hover">
              <div className="bg-primary-500/10 p-3 rounded-lg w-fit mb-6">
                <BadgeCheck className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Skill Verification System
              </h3>
              <p className="text-muted-foreground mb-6">
                Blockchain-verified micro-credentials that prove specific skills
                to potential investors and employers.
              </p>
              <Link href="/skill-assessment">
                <Button variant="outline" size="sm">
                  Verify Skills
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="feature-card bg-background p-8 rounded-xl shadow-sm border border-border hover:border-primary/50 transition-all duration-300 card-hover">
              <div className="bg-secondary-500/10 p-3 rounded-lg w-fit mb-6">
                <LineChart className="h-6 w-6 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Education Credit Score
              </h3>
              <p className="text-muted-foreground mb-6">
                Alternative to traditional credit scores based on learning
                commitment and skill acquisition.
              </p>
              <Link href="/funding">
                <Button variant="outline" size="sm">
                  Explore Funding
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="feature-card bg-background p-8 rounded-xl shadow-sm border border-border hover:border-primary/50 transition-all duration-300 card-hover">
              <div className="bg-accent-500/10 p-3 rounded-lg w-fit mb-6">
                <Briefcase className="h-6 w-6 text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Employer Integration
              </h3>
              <p className="text-muted-foreground mb-6">
                Companies can sponsor promising students in exchange for first
                hiring opportunities.
              </p>
              <Link href="/employers">
                <Button variant="outline" size="sm">
                  Partner with Us
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="feature-card bg-background p-8 rounded-xl shadow-sm border border-border hover:border-primary/50 transition-all duration-300 card-hover">
              <div className="bg-warning-500/10 p-3 rounded-lg w-fit mb-6">
                <Users className="h-6 w-6 text-warning-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Community Knowledge Exchange
              </h3>
              <p className="text-muted-foreground mb-6">
                Peer-to-peer teaching marketplace where users can both learn and
                earn through knowledge sharing.
              </p>
              <Link href="/community">
                <Button variant="outline" size="sm">
                  Join Community
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="feature-card bg-background p-8 rounded-xl shadow-sm border border-border hover:border-primary/50 transition-all duration-300 card-hover">
              <div className="bg-primary-500/10 p-3 rounded-lg w-fit mb-6">
                <Globe className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Global Opportunity Matching
              </h3>
              <p className="text-muted-foreground mb-6">
                ML-powered matching between underserved talent and global remote
                work opportunities.
              </p>
              <Link href="/career-simulator">
                <Button variant="outline" size="sm">
                  Discover Opportunities
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="feature-card bg-background p-8 rounded-xl shadow-sm border border-border hover:border-primary/50 transition-all duration-300 card-hover">
              <div className="bg-secondary-500/10 p-3 rounded-lg w-fit mb-6">
                <BarChart4 className="h-6 w-6 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Learning-to-Earning Timeline
              </h3>
              <p className="text-muted-foreground mb-6">
                Visual projection of how specific courses translate to income
                potential and career growth.
              </p>
              <Link href="/marketplace">
                <Button variant="outline" size="sm">
                  Explore Courses
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="w-full py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how EduCredit Pro is transforming education and career
              journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card bg-background p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Sarah J."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-muted-foreground">
                    Data Science Student
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "The skill verification system helped me secure funding for my
                data science bootcamp. Now I'm working at a top tech company
                with a salary I never thought possible."
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Award key={star} className="h-5 w-5 text-warning-500" />
                ))}
              </div>
            </div>

            <div className="testimonial-card bg-background p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Michael T."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-muted-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "As a career-changer, I struggled to prove my new skills.
                EduCredit Pro's verification system gave me credibility, and the
                employer partnership led directly to my job."
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Award key={star} className="h-5 w-5 text-warning-500" />
                ))}
              </div>
            </div>

            <div className="testimonial-card bg-background p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Jessica L."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Jessica L.</h4>
                  <p className="text-sm text-muted-foreground">
                    Investment Analyst
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "As an investor, I can confidently fund students through
                EduCredit Pro. The education credit score and verified skills
                make it a smart investment with measurable returns."
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Award key={star} className="h-5 w-5 text-warning-500" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="w-full py-20 bg-gradient-to-r from-primary-500/90 via-secondary-500/90 to-accent-500/90 text-white"
      >
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join thousands of students, investors, and employers in our
            education-to-career ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="default"
                  className="bg-white text-primary-500 hover:bg-gray-100 px-8"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-white text-primary-500 hover:bg-gray-100 px-8"
                >
                  Get Started Today
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8"
                >
                  Learn More
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </section>
    </main>
  );
}
