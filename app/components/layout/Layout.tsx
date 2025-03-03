"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollProgress from "../ui/ScrollProgress";

type LayoutProps = {
  children: ReactNode;
  userLogin?: string;
};

export default function Layout({
  children,
  userLogin = "vkhare2909",
}: LayoutProps) {
  const [currentDateTime, setCurrentDateTime] = useState("2025-03-03 17:08:00");

  useEffect(() => {
    // Update the date time every minute
    const timer = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
      setCurrentDateTime(formattedDate);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />
      <div className="fixed bottom-4 right-4 z-40 text-xs text-gray-400 bg-black/30 backdrop-blur-sm py-1 px-2 rounded">
        <div>User: {userLogin}</div>
        <div>UTC: {currentDateTime}</div>
      </div>
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
      <ScrollProgress />
    </>
  );
}
