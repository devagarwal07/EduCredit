"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  Search,
  Filter,
  GraduationCap,
  Users,
  BookOpen,
  Star,
  Clock,
  DollarSign,
  ArrowUpRight,
  ChevronRight,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

// Mock data fetch
const fetchMarketplaceItems = async () => {
  try {
    const response = await fetch("/data/marketplace.json");
    return await response.json();
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    return [];
  }
};

export default function Marketplace() {
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [skillFilter, setSkillFilter] = useState<string | null>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMarketplaceItems();
      setItems(data);
      setFilteredItems(data);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter items based on search query, type, and skill
    if (items.length > 0) {
      let filtered = [...items];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.provider.toLowerCase().includes(query) ||
            (item.skills &&
              item.skills.some((s: string) => s.toLowerCase().includes(query)))
        );
      }

      if (selectedType) {
        filtered = filtered.filter((item) => item.type === selectedType);
      }

      if (skillFilter) {
        filtered = filtered.filter(
          (item) =>
            item.skills &&
            item.skills.some(
              (s: string) => s.toLowerCase() === skillFilter.toLowerCase()
            )
        );
      }

      setFilteredItems(filtered);
    }
  }, [searchQuery, selectedType, skillFilter, items]);

  // Get unique skills from all items
  const allSkills = [...new Set(items.flatMap((item) => item.skills || []))];

  // Animate featured items
  useEffect(() => {
    if (!loading && featuredRef.current) {
      gsap.fromTo(
        featuredRef.current.querySelectorAll(".featured-item"),
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [loading, filteredItems]);

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  // Featured items (premium or high rating)
  const featuredItems = filteredItems.filter(
    (item) => item.featured || item.premium
  );

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Learning Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Discover courses, mentorship opportunities, and peer-to-peer
            learning
          </p>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="bg-background border border-border rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search courses, mentors, and resources..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              onClick={() => setSelectedType(null)}
              className="shrink-0"
            >
              All Types
            </Button>
            <Button
              variant={selectedType === "course" ? "default" : "outline"}
              onClick={() => setSelectedType("course")}
              className="shrink-0"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Courses
            </Button>
            <Button
              variant={selectedType === "mentorship" ? "default" : "outline"}
              onClick={() => setSelectedType("mentorship")}
              className="shrink-0"
            >
              <Users className="h-4 w-4 mr-2" />
              Mentorship
            </Button>
            <Button
              variant={selectedType === "peer-teaching" ? "default" : "outline"}
              onClick={() => setSelectedType("peer-teaching")}
              className="shrink-0"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Peer Learning
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Filter by Skill</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {skillFilter && (
              <Badge
                variant="default"
                className="cursor-pointer"
                onClick={() => setSkillFilter(null)}
              >
                {skillFilter}
                <button className="ml-1 text-primary-foreground">×</button>
              </Badge>
            )}

            {allSkills
              .filter((skill) => skill !== skillFilter)
              .slice(0, 10)
              .map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => setSkillFilter(skill)}
                >
                  {skill}
                </Badge>
              ))}
          </div>
        </div>
      </div>

      {/* Featured items */}
      {featuredItems.length > 0 && (
        <div className="mb-12" ref={featuredRef}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Opportunities</h2>
            <Link
              href="/premium"
              className="text-primary hover:underline text-sm font-medium"
            >
              View Premium Content
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                className="featured-item bg-background border border-border rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md card-hover"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {item.premium && (
                    <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                      Premium
                    </div>
                  )}
                  {item.type === "course" && (
                    <div className="absolute bottom-4 left-4 bg-primary-800/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      Course
                    </div>
                  )}
                  {item.type === "mentorship" && (
                    <div className="absolute bottom-4 left-4 bg-accent-800/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      Mentorship
                    </div>
                  )}
                  {item.type === "peer-teaching" && (
                    <div className="absolute bottom-4 left-4 bg-warning-800/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      Peer Learning
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm">
                      {item.type === "course" ? (
                        <span className="font-medium">{item.provider}</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          {item.teacher?.avatar && (
                            <Image
                              src={item.teacher.avatar}
                              alt={item.teacher.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          )}
                          {item.teacher?.name || item.mentor?.name}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-warning-500 fill-warning-500" />
                      <span className="font-medium">{item.rating}</span>
                      <span className="text-muted-foreground">
                        ({item.reviewCount})
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {item.type === "course" ? (
                          <Clock className="h-3 w-3 inline mr-1" />
                        ) : (
                          <DollarSign className="h-3 w-3 inline mr-1" />
                        )}
                        {item.type === "course"
                          ? "Self-paced"
                          : `${formatCurrency(item.price)}/${item.priceType}`}
                      </div>
                      {item.type === "course" && (
                        <div className="text-lg font-bold">${item.price}</div>
                      )}
                    </div>

                    <Link href={`/marketplace/${item.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All marketplace items */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Opportunities</h2>

        {filteredItems.length === 0 ? (
          <div className="bg-muted rounded-xl p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn't find any items matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedType(null);
                setSkillFilter(null);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-background border border-border rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md card-hover"
              >
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {item.premium && (
                    <div className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                      Premium
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                    {item.type === "course" && (
                      <span className="flex items-center">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Course
                      </span>
                    )}
                    {item.type === "mentorship" && (
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        Mentorship
                      </span>
                    )}
                    {item.type === "peer-teaching" && (
                      <span className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Peer Learning
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {(item.skills || [])
                      .slice(0, 3)
                      .map((skill: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">${item.price}</span>
                      {item.type !== "course" && (
                        <span className="text-xs text-muted-foreground">
                          /{item.priceType}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 text-warning-500 fill-warning-500" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {item.provider}
                    </span>
                    <Link href={`/marketplace/${item.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
