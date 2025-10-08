"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tag, Users } from "lucide-react";
import { tutorials } from "@/components/Tutorials/TutorialList";

export default function TutorialPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    const found = tutorials.find((t) => t.id === id);
    if (found) setTutorial(found);
    else navigate("/tutorials");
  }, [id, navigate]);

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Button
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate("/tutorials")}
      >
        <ArrowLeft className="h-4 w-4 " />
        Back to Tutorials
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Tutorial Content */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold text-primary tracking-tight">{tutorial.title}</h1>

          <div className="aspect-video w-full  flex justify-center items-center rounded-xl overflow-hidden shadow-xl">
            <iframe
              src={tutorial.link}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="prose dark:prose-invert max-w-none border p-5 rounded-xl">
            <h2 className="text-2xl font-bold text-primary ">About this tutorial</h2>
            <p className="!text-foreground/90 ml-4 ">{tutorial.content}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tutorial Info */}
          <div className="rounded-xl border border-primary/20 p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Tutorial Details</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{tutorial.duration}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium capitalize">{tutorial.category}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Tags</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tutorial.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center  gap-2 mb-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Relevant for</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tutorial.roles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Tutorials */}
          <div className="border border-primary/20 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Related Tutorials</h3>

            {tutorials.filter((t) => t.id !== tutorial.id && t.category === tutorial.category).length > 0 ? (
              <div className="space-y-4">
                {tutorials
                  .filter((t) => t.id !== tutorial.id && t.category === tutorial.category)
                  .slice(0, 3)
                  .map((related) => (
                    <div
                      key={related.id}
                      className="flex gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => navigate(`/dashboard/tutorials/${related.id}`)}
                    >
                      <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0 bg-muted">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${related.thumbnail})` }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-2">{related.title}</p>
                        <p className="text-xs text-muted-foreground">{related.duration}</p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No related tutorials found.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
