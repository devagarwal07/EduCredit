"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Filter,
  ArrowRight,
  DollarSign,
  Building,
  Wifi,
  Users,
  ChevronsUpDown,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

// Mock data fetch
const fetchJobs = async () => {
  try {
    return [
      {
        id: "job-001",
        title: "Machine Learning Engineer",
        company: "TechInnovate",
        location: "San Francisco, CA",
        remote: "Hybrid",
        salary: { min: 120000, max: 160000 },
        type: "Full-time",
        postedDate: "2025-03-15T14:30:00Z",
        description:
          "Join our AI team to develop cutting-edge machine learning models...",
        requirements: [
          "Python",
          "TensorFlow/PyTorch",
          "Computer Science degree",
          "3+ years experience",
        ],
        logo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGxvZ298ZW58MHx8MHx8fDA%3D",
        skills: [
          "Machine Learning",
          "Python",
          "Data Science",
          "AI",
          "Deep Learning",
        ],
      },
      {
        id: "job-002",
        title: "Full Stack Developer",
        company: "WebSolutions Inc.",
        location: "New York, NY",
        remote: "Remote",
        salary: { min: 95000, max: 135000 },
        type: "Full-time",
        postedDate: "2025-03-20T09:15:00Z",
        description:
          "Looking for an experienced full stack developer to join our team...",
        requirements: [
          "JavaScript",
          "React",
          "Node.js",
          "MongoDB",
          "2+ years experience",
        ],
        logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaCUyMGxvZ298ZW58MHx8MHx8fDA%3D",
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "TypeScript"],
      },
      {
        id: "job-003",
        title: "Data Scientist",
        company: "DataCorp Analytics",
        location: "Boston, MA",
        remote: "On-site",
        salary: { min: 110000, max: 145000 },
        type: "Full-time",
        postedDate: "2025-03-22T11:45:00Z",
        description:
          "We're seeking a talented data scientist to help extract insights from our data...",
        requirements: [
          "Python",
          "SQL",
          "Statistics",
          "Data visualization",
          "Master's degree preferred",
        ],
        logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaCUyMGxvZ298ZW58MHx8MHx8fDA%3D",
        skills: [
          "Data Science",
          "Python",
          "SQL",
          "Statistics",
          "Data Visualization",
        ],
      },
      {
        id: "job-004",
        title: "UX/UI Designer",
        company: "CreativeMinds",
        location: "Austin, TX",
        remote: "Hybrid",
        salary: { min: 85000, max: 120000 },
        type: "Full-time",
        postedDate: "2025-03-18T10:00:00Z",
        description:
          "Looking for a creative designer to improve our product user experience...",
        requirements: [
          "Figma",
          "Adobe XD",
          "User research",
          "Prototyping",
          "3+ years experience",
        ],
        logo: "https://images.unsplash.com/photo-1618588507085-c79565432917?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JlYXRpdmUlMjBsb2dvfGVufDB8fDB8fHww",
        skills: [
          "UI Design",
          "UX Research",
          "Figma",
          "Adobe Suite",
          "Prototyping",
        ],
      },
      {
        id: "job-005",
        title: "DevOps Engineer",
        company: "CloudTech Solutions",
        location: "Seattle, WA",
        remote: "Remote",
        salary: { min: 115000, max: 150000 },
        type: "Full-time",
        postedDate: "2025-03-25T15:20:00Z",
        description:
          "Join our team to improve and maintain our cloud infrastructure...",
        requirements: [
          "AWS/Azure/GCP",
          "Kubernetes",
          "CI/CD",
          "Linux",
          "4+ years experience",
        ],
        logo: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWQlMjBsb2dvfGVufDB8fDB8fHww",
        skills: ["DevOps", "AWS", "Kubernetes", "CI/CD", "Linux"],
      },
      {
        id: "job-006",
        title: "Product Manager",
        company: "InnovateTech",
        location: "Chicago, IL",
        remote: "Hybrid",
        salary: { min: 125000, max: 170000 },
        type: "Full-time",
        postedDate: "2025-03-16T09:30:00Z",
        description:
          "Seeking an experienced product manager to lead our product development lifecycle...",
        requirements: [
          "5+ years experience",
          "Agile methodologies",
          "Technical background",
          "Strong communication",
        ],
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueSUyMGxvZ298ZW58MHx8MHx8fDA%3D",
        skills: [
          "Product Management",
          "Agile",
          "Strategy",
          "Roadmapping",
          "User Research",
        ],
      },
    ];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [remoteFilter, setRemoteFilter] = useState<string | null>(null);
  const [salaryFilter, setSalaryFilter] = useState<[number, number] | null>(
    null
  );
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const jobsData = await fetchJobs();

      setJobs(jobsData);
      setFilteredJobs(jobsData);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter jobs based on search query and filters
    if (jobs.length > 0) {
      let filtered = [...jobs];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (job) =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.skills.some((skill: string) =>
              skill.toLowerCase().includes(query)
            )
        );
      }

      if (locationFilter) {
        const location = locationFilter.toLowerCase();
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes(location)
        );
      }

      if (remoteFilter) {
        filtered = filtered.filter(
          (job) => job.remote.toLowerCase() === remoteFilter.toLowerCase()
        );
      }

      if (salaryFilter) {
        filtered = filtered.filter(
          (job) =>
            job.salary.min <= salaryFilter[1] &&
            job.salary.max >= salaryFilter[0]
        );
      }

      setFilteredJobs(filtered);
    }
  }, [searchQuery, locationFilter, remoteFilter, salaryFilter, jobs]);

  // Format date to "X days ago"
  const formatPostedDate = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date("2025-03-26T17:14:08Z"); // Using the provided current date

    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Career Opportunities</h1>
          <p className="text-muted-foreground mt-2">
            Find your next role in companies that value your verified skills
          </p>
        </div>
        <Link href="/career-simulator">
          <Button variant="outline">
            Career Path Simulator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Search and filter section */}
      <div className="bg-background border border-border rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by job title, company, or skill..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative w-full md:w-1/3">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Location (city, state, country)"
              className="pl-10"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="md:w-auto flex items-center gap-2"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </div>

        {filtersVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-4 border-t"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Remote Type
                </label>
                <select
                  value={remoteFilter || ""}
                  onChange={(e) => setRemoteFilter(e.target.value || null)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Any Remote Type</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Salary Range
                </label>
                <select
                  value={
                    salaryFilter ? `${salaryFilter[0]}-${salaryFilter[1]}` : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setSalaryFilter(null);
                    } else {
                      const [min, max] = value.split("-").map(Number);
                      setSalaryFilter([min, max]);
                    }
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Any Salary Range</option>
                  <option value="0-80000">Up to $80,000</option>
                  <option value="80000-100000">$80,000 - $100,000</option>
                  <option value="100000-130000">$100,000 - $130,000</option>
                  <option value="130000-150000">$130,000 - $150,000</option>
                  <option value="150000-1000000">$150,000+</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="ghost"
                  className="text-sm text-muted-foreground"
                  onClick={() => {
                    setSearchQuery("");
                    setLocationFilter("");
                    setRemoteFilter(null);
                    setSalaryFilter(null);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Job listings */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-background border border-border rounded-xl shadow-sm p-12 text-center">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            We couldn't find any jobs matching your search criteria. Try
            adjusting your filters or search terms.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setLocationFilter("");
              setRemoteFilter(null);
              setSalaryFilter(null);
            }}
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Link href={`/careers/${job.id}`} key={job.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-background border border-border rounded-xl shadow-sm p-6 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 overflow-hidden rounded-lg">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <Badge className="ml-2 hidden md:inline-flex">
                          {job.type}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>

                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="h-4 w-4 text-muted-foreground" />
                        <span>{job.remote}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>
                          ${formatCurrency(job.salary.min)} - $
                          {formatCurrency(job.salary.max)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Posted {formatPostedDate(job.postedDate)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.skills
                        .slice(0, 5)
                        .map((skill: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <Badge variant="outline" className="md:hidden mb-2">
                      {job.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:flex"
                    >
                      View Job
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
