// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { SignIn } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// import { useTheme } from "next-themes";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react";

// export default function SignInPage() {
//   const router = useRouter();
//   const { theme } = useTheme();
//   const [isLoaded, setIsLoaded] = useState(false);

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/90">
//       <div className="container py-6">
//         <Button
//           variant="outline"
//           className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/70 dark:bg-background/30 dark:border-border/30 dark:hover:bg-background/40 transition-colors"
//           onClick={() => router.push("/")}
//         >
//           <ChevronLeft className="h-4 w-4 text-foreground" />
//           Back to Home
//         </Button>
//       </div>

//       <div className="flex-1 flex items-center justify-center p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="w-full max-w-md"
//         >
//           <div className="text-center mb-10">
//             <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/80">
//               Welcome Back
//             </h1>
//             <p className="text-muted-foreground mt-3 text-base dark:text-muted-foreground/90">
//               Sign in to your EduCredit Pro account
//             </p>
//           </div>

//           <div

//           >
//             {/* Subtle decorative element */}
//             {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 pointer-events-none" /> */}

//             {/* {!isLoaded && (
//               <div className="h-8 w-8 border-4 border-primary/80 dark:border-primary/70 border-t-transparent rounded-full animate-spin" />
//             )} */}

//             <SignIn
//               signUpUrl="/sign-up"
//               redirectUrl="/dashboard"
//               afterSignInUrl="/dashboard"
//               onLoaded={() => setIsLoaded(true)}
//             />
//           </div>

//           <div className="text-center mt-10">
//             <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
//               Don't have an account?{" "}
//               <Link
//                 href="/sign-up"
//                 className="text-primary hover:text-primary/80 dark:text-primary/90 dark:hover:text-primary font-medium transition-colors"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useUser } from "@clerk/nextjs";

// export default function SignUpPage() {
//   const router = useRouter();
//   const { isSignedIn } = useUser();


//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-3xl font-bold">Sign in as</h1>
//       <div className="flex gap-4 mt-4">
//         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => router.push("/sign-in/student")}>
//           Student
//         </button>
//         <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => router.push("/sign-in/investor")}>
//           Investor
//         </button>
//       </div>
//     </div>
//   );
// }
'use client';

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SpotlightCard from "./SpotlightCard";

export default function SignUpPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 gap-8 bg-neutral-950">
      <h1 className="text-3xl font-bold text-center text-white">Sign in as</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <StudentCard onClick={() => router.push("/sign-in/student")} />
        <InvestorCard onClick={() => router.push("/sign-in/investor")} />
      </div>
    </div>
  );
}

function StudentCard({ onClick }) {
  return (
    <SpotlightCard
      spotlightColor="rgba(0, 229, 255, 0.2)"
      className="cursor-pointer transition-transform duration-300 h-48 flex items-center justify-center 
                 hover:scale-105 hover:brightness-125 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="text-white text-center">
        <h1 className="text-3xl font-semibold">Student</h1>
      </div>
    </SpotlightCard>
  );
}

function InvestorCard({ onClick }) {
  return (
    <SpotlightCard
      spotlightColor="rgba(0, 255, 170, 0.2)"
      className="cursor-pointer transition-transform duration-300 h-48 flex items-center justify-center 
                 hover:scale-105 hover:brightness-325 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="text-white text-center">
        <h1 className="text-3xl font-semibold">Investor</h1>
      </div>
    </SpotlightCard>
  );
}
