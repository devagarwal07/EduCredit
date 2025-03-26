"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MessageSquare,
  Users,
  Calendar,
  Clock,
  ThumbsUp,
  Eye,
  Share2,
  Bookmark,
  BookOpen,
  Megaphone,
  Lightbulb,
  User,
  Tag,
  ChevronRight,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Mock data fetch
const fetchCommunityData = async () => {
  try {
    return {
      discussions: [
        {
          id: "disc-001",
          title: "How to prepare for a machine learning interview?",
          body: "I have an interview for a machine learning position coming up next week. Any advice on what to focus on?",
          author: {
            name: "Alex Johnson",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
            role: "Student",
          },
          tags: ["Career", "Machine Learning", "Interview Tips"],
          likes: 42,
          comments: 18,
          views: 356,
          createdAt: "2025-03-24T10:15:00Z",
        },
        {
          id: "disc-002",
          title: "Share your success stories with Income Share Agreements",
          body: "I recently completed my bootcamp funded through an ISA. The experience was great, and I'm now employed with a great salary. Who else has had success with ISAs?",
          author: {
            name: "Sarah Miller",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
            role: "Graduate",
          },
          tags: ["Funding", "ISA", "Success Stories"],
          likes: 87,
          comments: 36,
          views: 512,
          createdAt: "2025-03-25T08:30:00Z",
          isPinned: true,
        },
        {
          id: "disc-003",
          title: "Best online courses for blockchain development?",
          body: "I'm interested in learning blockchain development. Can anyone recommend online courses or resources that have helped them?",
          author: {
            name: "Mike Chen",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
            role: "Student",
          },
          tags: ["Blockchain", "Learning Resources", "Courses"],
          likes: 28,
          comments: 24,
          views: 430,
          createdAt: "2025-03-23T14:45:00Z",
        },
        {
          id: "disc-004",
          title: "Negotiating with investors - what worked for you?",
          body: "I'm about to enter negotiations with an investor for my education funding. Any tips or strategies that worked well for others?",
          author: {
            name: "Jessica Taylor",
            avatar:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
            role: "Student",
          },
          tags: ["Funding", "Negotiation", "Investors"],
          likes: 35,
          comments: 27,
          views: 389,
          createdAt: "2025-03-24T16:20:00Z",
        },
      ],
      events: [
        {
          id: "event-001",
          title: "Virtual Career Fair: Tech Startups Edition",
          description:
            "Connect with 30+ tech startups looking for talent in engineering, design, and product roles.",
          organizer: "EduCredit Pro",
          date: "2025-04-15T09:00:00Z",
          endDate: "2025-04-15T17:00:00Z",
          location: "Virtual",
          image:
            "https://images.unsplash.com/photo-1591115765373-5207764f72e4?w=800&auto=format&fit=crop",
          attendees: 248,
          isFeatured: true,
        },
        {
          id: "event-002",
          title: "Workshop: Building Your Education Investment Pitch",
          description:
            "Learn how to create a compelling pitch to secure education funding from investors.",
          organizer: "Funding Experts Network",
          date: "2025-04-08T18:00:00Z",
          endDate: "2025-04-08T20:00:00Z",
          location: "Virtual",
          image:
            "https://images.unsplash.com/photo-1591115766055-5c23b0224227?w=800&auto=format&fit=crop",
          attendees: 112,
        },
        {
          id: "event-003",
          title: "Panel Discussion: The Future of Tech Education",
          description:
            "Industry leaders discuss emerging trends and the future of technical education.",
          organizer: "Tech Educators Alliance",
          date: "2025-04-20T15:00:00Z",
          endDate: "2025-04-20T17:00:00Z",
          location: "San Francisco + Virtual",
          image:
            "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop",
          attendees: 175,
        },
      ],
      meetups: [
        {
          id: "meetup-001",
          title: "San Francisco Machine Learning Enthusiasts",
          description:
            "Weekly meetup for ML practitioners and enthusiasts in the Bay Area.",
          organizer: "AI Community SF",
          nextMeeting: "2025-04-05T18:00:00Z",
          location: "San Francisco, CA",
          image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop",
          members: 352,
        },
        {
          id: "meetup-002",
          title: "NYC Web Development Study Group",
          description:
            "Monthly meetup for web developers to share knowledge and collaborate.",
          organizer: "NYC Coders Club",
          nextMeeting: "2025-04-12T14:00:00Z",
          location: "New York, NY",
          image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
          members: 285,
        },
        {
          id: "meetup-003",
          title: "Remote Data Science Coffee Chats",
          description:
            "Virtual coffee meetings for data scientists to network and share insights.",
          organizer: "Global Data Science Network",
          nextMeeting: "2025-04-03T09:00:00Z",
          location: "Virtual",
          image:
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop",
          members: 421,
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching community data:", error);
    return {
      discussions: [],
      events: [],
      meetups: [],
    };
  }
};

export default function CommunityPage() {
  const [communityData, setCommunityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDiscussions, setFilteredDiscussions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("discussions");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCommunityData();
      setCommunityData(data);
      setFilteredDiscussions(data.discussions);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter discussions based on search query
    if (communityData) {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        setFilteredDiscussions(
          communityData.discussions.filter(
            (discussion: any) =>
              discussion.title.toLowerCase().includes(query) ||
              discussion.body.toLowerCase().includes(query) ||
              discussion.tags.some((tag: string) =>
                tag.toLowerCase().includes(query)
              )
          )
        );
      } else {
        setFilteredDiscussions(communityData.discussions);
      }
    }
  }, [searchQuery, communityData]);

  // Format date to "X days ago"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date("2025-03-26T17:14:08Z"); // Using the provided current date

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffDays === 0) {
      if (diffHours === 0) {
        return "Just now";
      }
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  // Format date to full format
  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground mt-2">
            Connect with students, investors, and professionals
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            My Events
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>
      </div>

      {/* Main tabs for different sections */}
      <Tabs
        defaultValue="discussions"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="discussions" className="flex gap-2">
            <MessageSquare className="h-4 w-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="events" className="flex gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="meetups" className="flex gap-2">
            <Users className="h-4 w-4" />
            Groups
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          {/* Search and filter */}
          {activeTab === "discussions" && (
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          )}

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="pt-4">
            <div className="space-y-6">
              {filteredDiscussions.length === 0 ? (
                <div className="bg-muted rounded-xl p-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">
                    No discussions found
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    We couldn't find any discussions matching your search. Try
                    different keywords or start a new discussion.
                  </p>
                  <Button onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <>
                  {/* Pinned discussions */}
                  {filteredDiscussions.some((d: any) => d.isPinned) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Megaphone className="h-5 w-5 text-primary" />
                        Pinned Discussions
                      </h2>

                      {filteredDiscussions
                        .filter((d: any) => d.isPinned)
                        .map((discussion: any) => (
                          <Link
                            href={`/community/discussions/${discussion.id}`}
                            key={discussion.id}
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <Image
                                  src={discussion.author.avatar}
                                  alt={discussion.author.name}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                                <div>
                                  <div className="font-medium">
                                    {discussion.author.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {discussion.author.role}
                                  </div>
                                </div>
                                <div className="text-xs text-muted-foreground ml-auto">
                                  {formatDate(discussion.createdAt)}
                                </div>
                              </div>

                              <h3 className="text-xl font-semibold mb-2">
                                {discussion.title}
                              </h3>
                              <p className="text-muted-foreground mb-4 line-clamp-2">
                                {discussion.body}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {discussion.tags.map(
                                  (tag: string, index: number) => (
                                    <Badge key={index} variant="outline">
                                      {tag}
                                    </Badge>
                                  )
                                )}
                              </div>

                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                                  <span>{discussion.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                  <span>{discussion.comments}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                  <span>{discussion.views}</span>
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                    </div>
                  )}

                  {/* Regular discussions */}
                  <h2 className="text-lg font-semibold mb-4">
                    Recent Discussions
                  </h2>

                  <div className="space-y-4">
                    {filteredDiscussions
                      .filter((d: any) => !d.isPinned)
                      .map((discussion: any) => (
                        <Link
                          href={`/community/discussions/${discussion.id}`}
                          key={discussion.id}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <Image
                                src={discussion.author.avatar}
                                alt={discussion.author.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <div className="font-medium">
                                  {discussion.author.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {discussion.author.role}
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground ml-auto">
                                {formatDate(discussion.createdAt)}
                              </div>
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                              {discussion.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {discussion.body}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {discussion.tags.map(
                                (tag: string, index: number) => (
                                  <Badge key={index} variant="outline">
                                    {tag}
                                  </Badge>
                                )
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                                <span>{discussion.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                <span>{discussion.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4 text-muted-foreground" />
                                <span>{discussion.views}</span>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="pt-4">
            <div className="space-y-8">
              {/* Featured event */}
              {communityData.events.some((e: any) => e.isFeatured) && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Featured Event</h2>

                  {communityData.events
                    .filter((e: any) => e.isFeatured)
                    .slice(0, 1)
                    .map((event: any) => (
                      <Link
                        href={`/community/events/${event.id}`}
                        key={event.id}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="relative h-64 w-full">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <h3 className="text-2xl font-bold mb-2">
                                {event.title}
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatFullDate(event.date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{event.attendees} attending</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-6">
                            <p className="text-muted-foreground mb-4">
                              {event.description}
                            </p>

                            <div className="flex justify-between items-center">
                              <div className="text-sm text-muted-foreground">
                                Organized by {event.organizer}
                              </div>
                              <Button>Register Now</Button>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                </div>
              )}

              {/* Upcoming events */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {communityData.events
                    .filter((e: any) => !e.isFeatured)
                    .map((event: any) => (
                      <Link
                        href={`/community/events/${event.id}`}
                        key={event.id}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-background border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
                        >
                          <div className="relative h-48">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <h3 className="text-lg font-medium">
                                {event.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-3 w-3" />
                                <span>{formatFullDate(event.date)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4">
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {event.description}
                            </p>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Users className="h-3 w-3" />
                                <span>{event.attendees} attending</span>
                              </div>
                              <Badge variant="outline">{event.location}</Badge>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                </div>

                <div className="mt-6 text-center">
                  <Link href="/community/events">
                    <Button variant="outline">
                      View All Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Groups/Meetups Tab */}
          <TabsContent value="meetups" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityData.meetups.map((meetup: any) => (
                <Link href={`/community/groups/${meetup.id}`} key={meetup.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-background border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors h-full flex flex-col"
                  >
                    <div className="relative h-48">
                      <Image
                        src={meetup.image}
                        alt={meetup.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-semibold">
                          {meetup.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{meetup.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4 flex-1">
                        {meetup.description}
                      </p>

                      <div className="space-y-3 mt-auto">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Next Meeting</span>
                          <span>{formatFullDate(meetup.nextMeeting)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{meetup.members} members</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Join Group
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}

              {/* Create new group card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-muted/50 border border-dashed border-muted-foreground/30 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-muted/80 transition-colors cursor-pointer h-full"
              >
                <div className="bg-background rounded-full p-4 mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create a Group</h3>
                <p className="text-muted-foreground mb-4">
                  Start your own community group for students with similar
                  interests
                </p>
                <Button>Get Started</Button>
              </motion.div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Trending topics section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-background border border-border rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Trending Topics
          </h2>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {[
                "Education Funding",
                "ISA Experiences",
                "Career Transitions",
                "Skill Verification",
                "Data Science",
                "Machine Learning",
                "Job Search",
                "Portfolio Building",
                "Interview Prep",
              ].map((topic, index) => (
                <Link
                  href={`/community/topics/${topic
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  key={index}
                >
                  <Badge className="px-3 py-1 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    {topic}
                  </Badge>
                </Link>
              ))}
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg transition-colors hover:bg-muted/80 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">
                    How to maximize your Education Credit Score?
                  </h3>
                  <Badge variant="outline">Hot Topic</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Community members are sharing strategies to improve Education
                  Credit Scores for better funding options.
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>48 discussions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>125 contributors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Active today</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg transition-colors hover:bg-muted/80 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">
                    Portfolio projects that impressed investors
                  </h3>
                  <Badge variant="outline">Trending</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Students are sharing examples of projects that helped them
                  secure education funding.
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>32 discussions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>87 contributors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Active yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Member spotlight */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Member Spotlight
            </h2>

            <div className="flex flex-col items-center text-center mb-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop"
                  alt="Sarah Miller"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold">Sarah Miller</h3>
              <div className="text-sm text-muted-foreground mb-2">
                Data Scientist @ TechCorp
              </div>
              <Badge variant="outline" className="mb-3">
                Community Champion
              </Badge>
              <p className="text-sm text-muted-foreground mb-4">
                Sarah used an ISA to fund her data science bootcamp and now
                mentors students in the community.
              </p>
              <Link href="/community/members/sarah-miller">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Popular tags */}
          <div className="bg-background border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Popular Tags
            </h2>

            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "JavaScript",
                "Machine Learning",
                "Data Science",
                "Web Development",
                "UX/UI",
                "Career Advice",
                "ISA",
                "Funding",
                "Interview Prep",
                "Portfolio",
                "Bootcamp",
                "Self-taught",
                "Networking",
              ].map((tag, index) => (
                <Link
                  href={`/community/tags/${tag
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  key={index}
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Community guidelines */}
          <div className="bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3 text-primary-900 dark:text-primary-300">
              Community Guidelines
            </h2>
            <p className="text-sm text-primary-800/80 dark:text-primary-300/80 mb-4">
              Our community thrives on respect, collaboration, and knowledge
              sharing. Please review our guidelines to help maintain a positive
              environment.
            </p>
            <Link href="/community/guidelines">
              <Button
                variant="outline"
                size="sm"
                className="border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30"
              >
                Read Guidelines
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
