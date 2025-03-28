import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { DollarSign, Briefcase, Calendar, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type EducationCreditScoreProps = {
  userData: any;
};

const EducationCreditScore = forwardRef<
  HTMLDivElement,
  EducationCreditScoreProps
>(({ userData }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/5 backdrop-blur-md rounded-xl shadow-md border border-white/10 p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Your Education Credit Score
          </h2>
          <p className="text-gray-300">
            Your score determines your eligibility for funding opportunities and
            interest rates
          </p>
        </div>

        <div className="relative w-48 h-48 mx-auto md:mx-0">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeOpacity="0.1"
              className="text-white/10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#credit-score-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="282.74"
              initial={{ strokeDashoffset: 282.74 }}
              animate={{
                strokeDashoffset:
                  282.74 * (1 - userData.educationCreditScore / 900),
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold gradient-text">
              <span
                className="stat-value"
                data-value={userData.educationCreditScore}
              >
                0
              </span>
            </span>
            <span className="text-gray-400">out of 900</span>
          </div>

          <svg width="0" height="0">
            <defs>
              <linearGradient
                id="credit-score-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" style={{ stopColor: "#38bdf8" }} />
                <stop offset="50%" style={{ stopColor: "#d946ef" }} />
                <stop offset="100%" style={{ stopColor: "#2dd4bf" }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Funding Received</h3>
          </div>
          <div className="text-2xl font-bold mb-1 text-white">
            $
            <span
              className="stat-value"
              data-value={userData.funding.received}
              data-format="currency"
            >
              0
            </span>
          </div>
          <p className="text-sm text-gray-400">Total funding secured to date</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white">Active Contracts</h3>
          </div>
          <div className="text-2xl font-bold mb-1 text-white">
            <span
              className="stat-value"
              data-value={userData.funding.activeContracts.length}
            >
              0
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Funding agreements in progress
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-teal-400" />
            <h3 className="font-semibold text-white">Pending Applications</h3>
          </div>
          <div className="text-2xl font-bold mb-1 text-white">
            <span
              className="stat-value"
              data-value={userData.funding.pendingApplications.length}
            >
              0
            </span>
          </div>
          <p className="text-sm text-gray-400">Applications under review</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h3 className="font-semibold text-white">Eligibility Rating</h3>
          </div>
          <div className="text-2xl font-bold mb-1">
            <span className="text-green-400">High</span>
          </div>
          <p className="text-sm text-gray-400">
            Based on your score and skills
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
});

EducationCreditScore.displayName = "EducationCreditScore";
export default EducationCreditScore;
