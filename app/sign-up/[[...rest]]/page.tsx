'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SignUpPage() {
    const router = useRouter();
    const { isSignedIn } = useUser();


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Sign up as</h1>
            <div className="flex gap-4 mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => router.push("/sign-up/student")}>
                    Student
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => router.push("/sign-up/investor")}>
                    Investor
                </button>
            </div>
        </div>
    );
}
