"use client";

import {
  Search,
  Tag
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BarChart2, CheckSquare, FilePlus, LogIn, Share2, UserCheck } from "lucide-react";
import { tutorials } from "@/components/Tutorials/TutorialList";

// Updated categories
const categories = [
  {
    id: "all",
    label: "All Tutorials",
    icon: <UserCheck className="h-4 w-4" />, // Represents all user-related actions
  },
  {
    id: "account",
    label: "User Access & Login",
    icon: <LogIn className="h-4 w-4" />, // Login related
  },
  {
    id: "complaint",
    label: "Complaint Lodging",
    icon: <FilePlus className="h-4 w-4" />, // Adding a new complaint
  },
  {
    id: "forwarding",
    label: "Complaint Forwarding",
    icon: <Share2 className="h-4 w-4" />, // Sharing or forwarding complaints
  },
  {
    id: "resolution",
    label: "Complaint Resolution",
    icon: <CheckSquare className="h-4 w-4" />, // Marking complaints as resolved 
  },
  {
    id: "reporting",
    label: "Report Generation",
    icon: <BarChart2 className="h-4 w-4" />, // Reporting and analytics
  },
];

// Updated tag list
const popularTags = [
  { key: "login", label: "login" },
  { key: "admin portal", label: "Admin Portal Overview" },
  { key: "forward", label: "Forward" },
  { key: "resolve", label: "Resolve" },
  { key: "report", label: "Report" },
  { key: "acc", label: "ACC Committee" },
];

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tutorial.roles.some((role) => role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === "all" || tutorial.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container px-4 py-4 mx-auto space-y-8">
      {/* Search & Tag Filters */}
      <div className="border border-gray-100 bg-white  shadow-md rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-2.5 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tutorials by title, tags, or roles..."
              className="!pl-10 hover:!ring-2 focus:ring-2 !ring-[#067b01] !ring-offset-2 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center flex-wrap !gap-2 !text-sm">
            <Tag className="h-4 w-4 " />
            <span>Popular:</span>
            {popularTags.map(({ key, label }) => {
              const isActive = searchQuery === key;
              return (
                <Badge
                  key={key}
                  variant={isActive ? "default" : "outline"}
                  className={`cursor-pointer ${isActive ? "bg-primary text-background" : ""}`}
                  onClick={() => setSearchQuery(key)}
                >
                  {label}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center space-y-4">
        <h1 className="sm:text-4xl font-extrabold text-primary tracking-tight lg:text-5xl">
          Platform Tutorials
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
          Master our platform with these comprehensive video tutorials. Learn at your own pace
          and become an expert.
        </p>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        {/* <div className="w-full bg-secondary rounded-lg overflow-auto">
          <TabsList className=" md:max-w-[calc(100vw-24rem)]  max-w-[calc(100vw-4rem)] bg-transparent no-scrollbar  justify-start">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={`flex items-center gap-1 text-sm font-medium transition-colors shadow-none outline-none p-2`}
              >
                {category.icon}
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div> */}

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            {filteredTutorials.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredTutorials.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="group overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {tutorial.thumbnail}
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                    </div>
                    <div className="flex-1 p-6 py-4 flex flex-col" title={tutorial.title}>
                      <h3 className="text-xl font-bold mb-2 !text-primary dark:text-white line-clamp-2">
                        {tutorial.title}
                      </h3>
                      <p className="!text-[#2b2b2b] dark:text-slate-300 line-clamp-3 mb-4 flex-1" title={tutorial.description}>
                        {tutorial.description}
                      </p>
                      <div className="flex overflow-auto gap-2 mb-4">
                        {tutorial.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant={"default"} className="text-xs  rounded-xl"> 
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        to={`/tutorial/${tutorial.id}`}
                        className="inline-flex items-center justify-center rounded-md bg-primary h-10 text-sm font-medium text-white shadow transition-colors hover:bg-[#067b04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#067b04]"
                      >
                        Watch Tutorial
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-[#2b2b2b] flex items-center justify-center mb-4">
                  <Search className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">No tutorials found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Try adjusting your search or category filter
                </p>
                <Button className={"!bg-[#067b01] "} onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                  Clear filters
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
