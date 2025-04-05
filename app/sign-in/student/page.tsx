"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthenticateWithRedirectCallback, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignInPage() {
    const router = useRouter();
    const { theme } = useTheme();
    const [isLoaded, setIsLoaded] = useState(false);
    const { isSignedIn } = useUser();

    // useEffect(() => {
    //     if (isSignedIn) {
    //         router.push("/dashboard");
    //     }
    // }, [isSignedIn, router]);

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
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground mt-3 text-base dark:text-muted-foreground/90">
                            Sign in to your EduCredit Pro account
                        </p>
                    </div>

                    <div

                    >
                        {/* Subtle decorative element */}
                        {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 pointer-events-none" /> */}

                        {/* {!isLoaded && (
              <div className="h-8 w-8 border-4 border-primary/80 dark:border-primary/70 border-t-transparent rounded-full animate-spin" />
            )} */}

                        <SignIn forceRedirectUrl='/dashboard' />
                        {/* <AuthenticateWithRedirectCallback signInForceRedirectUrl='/dashboard' /> */}


                    </div>

                    <div className="text-center mt-10">
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
                            Don't have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="text-primary hover:text-primary/80 dark:text-primary/90 dark:hover:text-primary font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}