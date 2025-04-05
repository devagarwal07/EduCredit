'use client';

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SpotlightCard from "./SpotlightCard";
import { MouseEventHandler } from "react";

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

type CardProps = {
    onClick: MouseEventHandler<HTMLDivElement>;
};

function StudentCard({ onClick }: CardProps) {
    return (
        <SpotlightCard
            spotlightColor="rgba(0, 229, 255, 0.2)"
            className="cursor-pointer transition-transform duration-300 h-48 flex items-center justify-center 
                 hover:scale-105 hover:brightness-125 hover:shadow-xl"
            onClick={onClick}
        >
            <div className="text-blue text-center">
                <h1 className="text-3xl font-semibold">Student</h1>
            </div>
        </SpotlightCard>
    );
}

function InvestorCard({ onClick }: CardProps) {
    return (
        <SpotlightCard
            spotlightColor="rgba(0, 255, 170, 0.2)"
            className="cursor-pointer transition-transform duration-300 h-48 flex items-center justify-center 
                 hover:scale-105 hover:brightness-125 hover:shadow-xl"
            onClick={onClick}
        >
            <div className="text-green text-center">
                <h1 className="text-3xl font-semibold">Investor</h1>
            </div>
        </SpotlightCard>
    );
}
