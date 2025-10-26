"use client";

import { useState } from "react";
import { ccAbilities, drCategories, classColors } from "@/lib/cc-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Extract all unique class names from ccAbilities for the filter list
const allClassNames = [
  ...new Set(ccAbilities.map((ability) => ability.class)),
].sort();

export default function DRCategoriesPage() {
  const [selectedClasses, setSelectedClasses] =
    useState<string[]>(allClassNames);

  const handleClassToggle = (className: string) => {
    setSelectedClasses((prev) => {
      if (prev.includes(className)) {
        // Prevent clearing the selection if only one class is selected
        // Optional: If you want to force at least one class to be selected
        // if (prev.length === 1) return prev;
        return prev.filter((name) => name !== className);
      } else {
        return [...prev, className];
      }
    });
  };

  const getCategoryAbilities = (categoryName: string) => {
    // If no classes are selected, show nothing
    if (selectedClasses.length === 0) return [];

    return ccAbilities.filter(
      (a) => a.drCategory === categoryName && selectedClasses.includes(a.class)
    );
  };

  const isClassSelected = (className: string) =>
    selectedClasses.includes(className);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-balance">
          Diminishing Returns Categories
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Understanding DR categories and how crowd control abilities share
          diminishing returns
        </p>
      </div>

      {/* DR Explanation Card (unchanged) */}
      <Card className="p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          What are Diminishing Returns?
        </h2>
        <div className="space-y-4 text-muted-foreground text-sm sm:text-base">
          <p>
            Diminishing Returns (DR) is a mechanic in World of Warcraft that
            reduces the duration of crowd control effects when applied
            repeatedly to the same target.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
            <Card className="p-4 bg-muted/50">
              <p className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                First Application
              </p>
              <p className="text-2xl font-bold text-green-500">100%</p>
              <p className="text-xs sm:text-sm">Full duration</p>
            </Card>
            <Card className="p-4 bg-muted/50">
              <p className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                Second Application
              </p>
              <p className="text-2xl font-bold text-yellow-500">50%</p>
              <p className="text-xs sm:text-sm">Half duration</p>
            </Card>
            <Card className="p-4 bg-muted/50">
              <p className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                Third Application
              </p>
              <p className="text-2xl font-bold text-red-500">25%</p>
              <p className="text-xs sm:text-sm">Quarter duration</p>
            </Card>
          </div>
          <p className="text-xs sm:text-sm">
            After 18 seconds without being affected by abilities in the same DR
            category, the diminishing returns reset.
          </p>
        </div>
      </Card>

      {/* 🚀 Updated Class Filter UI with Sticky Positioning */}
      <Card className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 sm:p-6 mb-6 sm:mb-8 border-b">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Filter by Class</h2>
        <div className="flex flex-wrap gap-2">
          {allClassNames.map((className) => (
            <Badge
              key={className}
              className={`
                cursor-pointer text-sm sm:text-base px-3 py-1.5 transition-all duration-200 shadow-md
                ${
                  isClassSelected(className)
                    ? "bg-primary text-primary-foreground border border-primary hover:bg-primary/90"
                    : "bg-input/20 text-foreground border border-border hover:bg-input/40"
                }
              `}
              onClick={() => handleClassToggle(className)}
            >
              {className}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Badge
            variant="outline"
            className="cursor-pointer text-xs sm:text-sm px-2.5 py-1 transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
            onClick={() => setSelectedClasses(allClassNames)}
          >
            Select All
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer text-xs sm:text-sm px-2.5 py-1 transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
            // Only allow clearing if not all classes are already cleared, to prevent zero selection issues
            onClick={() => setSelectedClasses([])}
          >
            Clear Selection
          </Badge>
        </div>
      </Card>

      {/* DR Categories List */}
      <div className="space-y-4">
        {drCategories.map((category) => {
          const abilities = getCategoryAbilities(category.name);
          const classCounts = abilities.reduce((acc, ability) => {
            acc[ability.class] = (acc[ability.class] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

          // Only display the category if there are abilities for the selected classes
          if (abilities.length === 0) return null;

          return (
            <Card key={category.name}>
              <Accordion type="single" collapsible>
                <AccordionItem value={category.name} className="border-none">
                  <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full pr-4 gap-2 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <Badge
                          className={`${category.color} text-sm sm:text-base px-2 sm:px-3 py-1 w-fit`}
                        >
                          {category.name}
                        </Badge>
                        <p className="text-muted-foreground text-xs sm:text-sm text-left">
                          {category.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {abilities.length}{" "}
                        {abilities.length === 1 ? "ability" : "abilities"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 sm:px-6 pb-4">
                      <div className="mb-4">
                        <h3 className="text-xs sm:text-sm font-semibold mb-2">
                          Classes with {category.name} CC:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(classCounts).map(
                            ([className, count]) => (
                              <Badge
                                key={className}
                                variant="secondary"
                                className={`${classColors[className]} text-xs sm:text-sm`}
                              >
                                {className} ({count})
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Class</TableHead>
                              <TableHead>Ability</TableHead>
                              <TableHead>Duration</TableHead>
                              <TableHead>Dispellable</TableHead>
                              <TableHead>Breaks on Damage</TableHead>
                              <TableHead>Cooldown</TableHead>
                              <TableHead>Specialization</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {abilities.map((ability) => (
                              <TableRow key={ability.id}>
                                <TableCell>
                                  <span className={classColors[ability.class]}>
                                    {ability.class}
                                  </span>
                                </TableCell>
                                <TableCell className="font-medium">
                                  {ability.ability}
                                </TableCell>
                                <TableCell>{ability.duration}</TableCell>
                                <TableCell>
                                  {ability.dispellable ? (
                                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                      Yes
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary">No</Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {ability.breaksOnDamage ? (
                                    <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                                      Yes
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary">No</Badge>
                                  )}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {ability.cooldown}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {ability.specialization}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
