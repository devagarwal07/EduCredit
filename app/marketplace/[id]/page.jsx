"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Clock,
  DollarSign,
  Users,
  GraduationCap,
  BookOpen,
  ExternalLink,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import Layout from "@/app/components/layout/Layout";
import LoadingScreen from "@/app/components/ui/LoadingScreen";

/**
 * Fetches marketplace item data from a local JSON file
 * @param {string} id - The item ID to fetch
 * @returns {Promise<Object|null>} The marketplace item or null if not found
 */
const fetchMarketplaceItem = async (id) => {
  try {
    const response = await fetch("/data/marketplace.json");
    const data = await response.json();
    return data.find((item) => item.id === id) || null;
  } catch (error) {
    console.error("Error fetching marketplace item:", error);
    return null;
  }
};

/**
 * InfoCard component for displaying item details
 */
const InfoCard = ({
  icon,
  label,
  value,
  bgColor = "bg-indigo-500/20",
  textColor = "text-indigo-400",
}) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
    <div className={`p-2 rounded-full ${bgColor} ${textColor}`}>{icon}</div>
    <div>
      <div className="text-sm text-gray-400">{label}</div>
      <div className="font-medium text-white">{value}</div>
    </div>
  </div>
);

/**
 * NotFoundView component for handling missing items
 */
const NotFoundView = () => (
  <div className="min-h-screen py-24">
    <div className="container mx-auto px-6">
      <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-md border border-white/10 p-12 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Item not found
        </h2>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          The marketplace item you're looking for doesn't exist.
        </p>
        <Link href="/marketplace">
          <span className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all inline-block">
            Browse Marketplace
          </span>
        </Link>
      </div>
    </div>
  </div>
);

/**
 * ItemHeader component for displaying the item's basic information
 */
const ItemHeader = ({ item }) => (
  <div className="flex items-start gap-6 mb-6">
    <div className="flex-shrink-0">
      <div className="relative w-20 h-20 overflow-hidden rounded-lg border border-white/20 bg-white/10">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
    </div>

    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-2 text-white">{item.title}</h1>
      <div className="text-xl text-gray-300 mb-4">{item.provider}</div>

      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
        {item.type === "course" && (
          <div className="flex items-center gap-1 text-gray-300">
            <GraduationCap className="h-4 w-4 text-indigo-400" />
            <span>Course</span>
          </div>
        )}
        {item.type === "mentorship" && (
          <div className="flex items-center gap-1 text-gray-300">
            <Users className="h-4 w-4 text-purple-400" />
            <span>Mentorship</span>
          </div>
        )}
        {item.type === "peer-teaching" && (
          <div className="flex items-center gap-1 text-gray-300">
            <BookOpen className="h-4 w-4 text-teal-400" />
            <span>Peer Learning</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-gray-300">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="font-medium">{item.rating}</span>
          <span className="text-gray-400">({item.reviewCount})</span>
        </div>
      </div>
    </div>
  </div>
);

/**
 * TeacherProfile component for displaying instructor information
 */
const TeacherProfile = ({ teacher, mentor, type }) => (
  <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-md border border-white/10 p-6">
    <h2 className="text-xl font-semibold mb-4 text-white">
      {type === "mentorship" ? "Mentor" : "Teacher"} Details
    </h2>
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0">
        <div className="relative w-20 h-20 overflow-hidden rounded-full border border-white/20 bg-white/10">
          <Image
            src={teacher?.avatar || mentor?.avatar || "/default-avatar.png"}
            alt={teacher?.name || mentor?.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white">
          {teacher?.name || mentor?.name}
        </h3>
        {mentor?.title && (
          <p className="text-gray-300 mb-2">
            {mentor.title} at {mentor.company}
          </p>
        )}
        {teacher?.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{teacher.rating}</span>
            <span className="text-gray-400">
              ({teacher.completedSessions} sessions)
            </span>
          </div>
        )}
        {mentor?.experience && (
          <p className="text-gray-300">
            {mentor.experience} years of experience
          </p>
        )}
      </div>
    </div>
  </div>
);

/**
 * Sidebar component for displaying quick facts
 */
const ItemSidebar = ({ item }) => (
  <div className="space-y-6">
    <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-md border border-white/10 p-6 sticky top-20">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Quick Facts</h2>
        <div className="space-y-3">
          <InfoCard
            icon={<Star className="h-5 w-5" />}
            label="Rating"
            value={`${item.rating} (${item.reviewCount} reviews)`}
          />

          {item.type === "course" && (
            <InfoCard
              icon={<DollarSign className="h-5 w-5" />}
              label="Price"
              value={`$${formatCurrency(item.price)}`}
              bgColor="bg-purple-500/20"
              textColor="text-purple-400"
            />
          )}

          {(item.type === "mentorship" || item.type === "peer-teaching") && (
            <InfoCard
              icon={<DollarSign className="h-5 w-5" />}
              label="Rate"
              value={`${formatCurrency(item.price)}/${item.priceType}`}
              bgColor="bg-teal-500/20"
              textColor="text-teal-400"
            />
          )}

          {item.premium && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-yellow-300">Premium</div>
                <div className="font-medium text-white">Exclusive content</div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10">
          <Link
            href="#"
            className="w-full block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  </div>
);

/**
 * JobDetails component for job listings
 */
const JobDetails = ({ item }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-semibold mb-3 text-white">Job Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Start Date"
          value={item.startDate}
        />
        <InfoCard
          icon={<DollarSign className="h-5 w-5" />}
          label="CTC"
          value={formatCurrency(item.ctc)}
          bgColor="bg-purple-500/20"
          textColor="text-purple-400"
        />
        <InfoCard
          icon={<Clock className="h-5 w-5" />}
          label="Experience"
          value={item.experience}
          bgColor="bg-teal-500/20"
          textColor="text-teal-400"
        />
        <InfoCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Apply By"
          value={item.applyBy}
          bgColor="bg-yellow-500/20"
          textColor="text-yellow-400"
        />
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-white">
          Job Description
        </h3>
        <p className="text-gray-300">{item.jobDescription}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-white">
          About the Organization
        </h3>
        <p className="text-gray-300">{item.aboutOrganization}</p>
      </div>
    </div>
  </div>
);

/**
 * CourseDetails component for courses
 */
const CourseDetails = ({ item }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-semibold mb-3 text-white">Course Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          icon={<Clock className="h-5 w-5" />}
          label="Duration"
          value={item.duration || "Self-paced"}
        />
        <InfoCard
          icon={<DollarSign className="h-5 w-5" />}
          label="Price"
          value={`$${formatCurrency(item.price)}`}
          bgColor="bg-purple-500/20"
          textColor="text-purple-400"
        />
      </div>
    </div>
  </div>
);

/**
 * MentorshipDetails component for mentorship listings
 */
const MentorshipDetails = ({ item }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-semibold mb-3 text-white">
        Mentorship Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          icon={<DollarSign className="h-5 w-5" />}
          label="Rate"
          value={`${formatCurrency(item.price)}/${item.priceType}`}
        />
      </div>
    </div>
  </div>
);

/**
 * PeerTeachingDetails component for peer teaching sessions
 */
const PeerTeachingDetails = ({ item }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-semibold mb-3 text-white">Session Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          icon={<Clock className="h-5 w-5" />}
          label="Session Length"
          value={item.sessionLength}
        />
        <InfoCard
          icon={<Users className="h-5 w-5" />}
          label="Max Participants"
          value={item.maxParticipants}
          bgColor="bg-purple-500/20"
          textColor="text-purple-400"
        />
      </div>
    </div>
  </div>
);

/**
 * SkillsList component for displaying skills
 */
const SkillsList = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Skills Covered</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border-none"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

/**
 * Main MarketplaceItemPage component
 */
export default function MarketplaceItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const itemData = await fetchMarketplaceItem(id);
      setItem(itemData);
      setLoading(false);
    }

    loadData();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!item) {
    return <NotFoundView />;
  }

  // Dynamic content based on item type
  const renderItemDetails = () => {
    switch (item.type) {
      case "job":
        return <JobDetails item={item} />;
      case "course":
        return <CourseDetails item={item} />;
      case "mentorship":
        return <MentorshipDetails item={item} />;
      case "peer-teaching":
        return <PeerTeachingDetails item={item} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <Link href="/marketplace">
              <span className="flex items-center text-gray-400 hover:text-white px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-md border border-white/10 p-6">
                <ItemHeader item={item} />

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-white">
                    Description
                  </h2>
                  <p className="text-gray-300">{item.description}</p>
                </div>

                {renderItemDetails()}
                <SkillsList skills={item.skills} />
              </div>

              {/* Instructor/Mentor/Teacher section */}
              {(item.teacher || item.mentor) && (
                <TeacherProfile
                  teacher={item.teacher}
                  mentor={item.mentor}
                  type={item.type}
                />
              )}
            </div>

            {/* Sidebar */}
            <ItemSidebar item={item} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
