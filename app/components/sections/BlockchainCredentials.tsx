"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

import NFTCard from "../ui/NFTCard";

export default function BlockchainCredentials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // User data
  const currentDateTime = "2025-03-03 19:09:29";
  const currentUser = "vkhare2909";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".credential-item", {
        scrollTrigger: {
          trigger: ".credential-grid",
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const credentials = [
    {
      id: "cred-1",
      name: "Full Stack Developer",
      issuer: "Tech Academy",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2024-12-05",
      tokenId: "0x7829...3d41",
    },
    {
      id: "cred-2",
      name: "AI & Machine Learning",
      issuer: "DataScience Pro",
      image:
        "https://images.unsplash.com/photo-1581091870627-3a45013e5495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2024-08-15",
      tokenId: "0x9a34...7f21",
    },
    {
      id: "cred-3",
      name: "Blockchain Development",
      issuer: "Web3 University",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "2024-10-22",
      tokenId: "0x5b12...9c36",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="credentials"
      className="py-24 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div
        className="absolute -z-10 w-[600px] h-[600px] top-1/2 -right-64 transform -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: "rgba(147, 51, 234, 0.1)" }}
      ></div>
      <div
        className="absolute -z-10 w-[500px] h-[500px] -bottom-64 left-1/4 transform -translate-x-1/2 rounded-full blur-[100px]"
        style={{ background: "rgba(236, 72, 153, 0.1)" }}
      ></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* User timestamp badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gray-800/60 rounded-full px-3 py-1 text-xs"
            >
              <span className="text-indigo-400 font-medium">{currentUser}</span>
              <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              <span className="text-gray-400">{currentDateTime}</span>
            </motion.div>

            <span className="text-sm font-medium text-indigo-400 uppercase tracking-wider">
              Verifiable Achievements
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Secure Your Skills with{" "}
              <span
                style={{
                  background:
                    "linear-gradient(to right, #4f46e5, #7e22ce, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Blockchain Credentials
              </span>
            </h2>

            <p className="text-gray-300">
              Our blockchain-based credential system ensures that your
              achievements are tamper-proof, verifiable, and recognized
              globally.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <div
                  className="mt-1 p-1 rounded-md"
                  style={{ background: "rgba(79, 70, 229, 0.2)" }}
                >
                  <svg
                    className="w-5 h-5 text-indigo-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-white font-semibold">
                    NFT-Based Certifications
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">
                    Your certificates and badges are minted as NFTs on the
                    blockchain, ensuring they can't be forged or tampered with.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div
                  className="mt-1 p-1 rounded-md"
                  style={{ background: "rgba(79, 70, 229, 0.2)" }}
                >
                  <svg
                    className="w-5 h-5 text-indigo-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-white font-semibold">
                    Smart Contract Verification
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">
                    Smart contracts ensure trustworthy and transparent
                    validation of your credentials by potential employers.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div
                  className="mt-1 p-1 rounded-md"
                  style={{ background: "rgba(79, 70, 229, 0.2)" }}
                >
                  <svg
                    className="w-5 h-5 text-indigo-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-white font-semibold">
                    Global Recognition
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">
                    Share your credentials globally without worrying about
                    verification processes across borders or institutions.
                  </p>
                </div>
              </li>
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 mt-4"
            >
              Explore Credential System
            </motion.button>
          </motion.div>

          <div className="credential-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((credential, index) => (
              <div
                key={credential.id}
                className={`credential-item ${
                  index === 2 ? "md:col-span-2" : ""
                }`}
              >
                <NFTCard
                  name={credential.name}
                  issuer={credential.issuer}
                  image={credential.image}
                  date={credential.date}
                  tokenId={credential.tokenId}
                />
              </div>
            ))}

            <div className="credential-item md:col-span-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 text-center border border-dashed border-gray-600 cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div
                  className="mb-4 mx-auto w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(79, 70, 229, 0.2)" }}
                >
                  <svg
                    className="w-6 h-6 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <p className="text-gray-300 font-medium">Add New Credential</p>
                <p className="text-sm text-gray-400 mt-2">
                  Upload a certificate or connect to a learning platform
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  Last modified by{" "}
                  <span className="text-indigo-400">{currentUser}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-800">
          <div className="text-center mb-8">
            <div className="inline-flex items-center mb-3 px-3 py-1 bg-gray-800/70 rounded-full">
              <span className="text-xs font-medium text-gray-400 mr-2">
                Last verification:
              </span>
              <span className="text-xs font-medium text-indigo-400">
                {currentDateTime}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Verification Portal</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Employers can easily verify your credentials using our blockchain
              verification portal.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full">
                <label className="block text-gray-400 text-sm mb-2">
                  Enter credential token ID or scan QR code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="e.g. 0x7829...3d41"
                    className="flex-1 bg-gray-800/50 border border-gray-700 rounded-l-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 rounded-r-lg transition-colors">
                    Verify
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Last search by{" "}
                  <span className="text-indigo-400">{currentUser}</span>
                </div>
              </div>

              <div className="hidden md:block h-20 w-[1px] bg-gray-700"></div>

              <div className="w-full md:w-auto flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 bg-white p-2 rounded-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1581091870627-3a45013e5495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="QR Code Scanner"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2">
                  Scan with mobile
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
