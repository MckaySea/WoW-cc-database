"use client";

import Link from "next/link";
import { ccAbilities, classColors } from "@/lib/cc-data";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function ClassesPage() {
  const classes = Array.from(new Set(ccAbilities.map((a) => a.class))).sort();

  const getClassAbilityCount = (className: string) => {
    return ccAbilities.filter((a) => a.class === className).length;
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-balance">
          Class Guides
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Explore crowd control abilities available to each class
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((className) => (
          <Link
            key={className}
            href={`/classes/${className.toLowerCase().replace(" ", "-")}`}
          >
            <Card className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2
                    className={`text-2xl font-bold mb-2 ${classColors[className]}`}
                  >
                    {className}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {getClassAbilityCount(className)} CC{" "}
                    {getClassAbilityCount(className) === 1
                      ? "ability"
                      : "abilities"}
                  </p>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
