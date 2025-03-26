"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/90">
      <div className="container py-6">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/70 dark:bg-background/30 dark:border-border/30 dark:hover:bg-background/40 transition-colors"
          onClick={() => router.push("/")}
        >
          <ChevronLeft className="h-4 w-4 text-foreground" />
          Back to Home
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/80">
              Create an Account
            </h1>
            <p className="text-muted-foreground mt-3 text-base dark:text-muted-foreground/90">
              Join EduCredit Pro to unlock your educational future
            </p>
          </div>

          <div
            className={`relative bg-background/95 border border-border/40 rounded-2xl shadow-lg shadow-primary/5 dark:shadow-primary/10 overflow-hidden backdrop-blur-md ${
              isLoaded ? "" : "min-h-[500px] flex items-center justify-center"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 pointer-events-none" />

            {!isLoaded && (
              <div className="h-8 w-8 border-4 border-primary/80 dark:border-primary/70 border-t-transparent rounded-full animate-spin" />
            )}

            <SignUp
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  rootBox: "w-full p-6",
                  card: "bg-transparent shadow-none",
                  formButtonPrimary:
                    "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 dark:from-primary dark:to-primary/90 dark:hover:from-primary/95 dark:hover:to-primary/85 text-primary-foreground transition-all duration-300",
                  formFieldInput:
                    "bg-background/50 border-border/50 focus:ring-2 focus:ring-primary/50 dark:bg-background/40 dark:border-border/40 dark:focus:ring-primary/40 rounded-lg",
                  footerActionLink:
                    "text-primary hover:text-primary/80 dark:text-primary/90 dark:hover:text-primary font-medium transition-colors",
                },
              }}
              signInUrl="/sign-in"
              redirectUrl="/dashboard"
              afterSignUpUrl="/onboarding"
            />
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-primary hover:text-primary/80 dark:text-primary/90 dark:hover:text-primary font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Educational funding info section */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center p-6 bg-background/50 dark:bg-background/30 border border-border/30 rounded-xl shadow-sm backdrop-blur-sm"
          >
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              Access Education Funding
            </h3>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
              Connect with investors who believe in your potential
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center p-6 bg-background/50 dark:bg-background/30 border border-border/30 rounded-xl shadow-sm backdrop-blur-sm"
          >
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              Verify Your Skills
            </h3>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
              Showcase your abilities with blockchain-verified credentials
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center p-6 bg-background/50 dark:bg-background/30 border border-border/30 rounded-xl shadow-sm backdrop-blur-sm"
          >
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              Build Your Future
            </h3>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
              Create a personalized career path tailored to your goals
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
