"use client"

import { ccAbilities, drCategories, classColors } from "@/lib/cc-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DRCategoriesPage() {
  const getCategoryAbilities = (categoryName: string) => {
    return ccAbilities.filter((a) => a.drCategory === categoryName)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Diminishing Returns Categories</h1>
        <p className="text-muted-foreground text-lg">
          Understanding DR categories and how crowd control abilities share diminishing returns
        </p>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">What are Diminishing Returns?</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Diminishing Returns (DR) is a mechanic in World of Warcraft that reduces the duration of crowd control
            effects when applied repeatedly to the same target.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="p-4 bg-muted/50">
              <p className="font-semibold text-foreground mb-2">First Application</p>
              <p className="text-2xl font-bold text-green-500">100%</p>
              <p className="text-sm">Full duration</p>
            </Card>
            <Card className="p-4 bg-muted/50">
              <p className="font-semibold text-foreground mb-2">Second Application</p>
              <p className="text-2xl font-bold text-yellow-500">50%</p>
              <p className="text-sm">Half duration</p>
            </Card>
            <Card className="p-4 bg-muted/50">
              <p className="font-semibold text-foreground mb-2">Third Application</p>
              <p className="text-2xl font-bold text-red-500">25%</p>
              <p className="text-sm">Quarter duration</p>
            </Card>
          </div>
          <p className="text-sm">
            After 18 seconds without being affected by abilities in the same DR category, the diminishing returns reset.
          </p>
        </div>
      </Card>

      <div className="space-y-4">
        {drCategories.map((category) => {
          const abilities = getCategoryAbilities(category.name)
          const classCounts = abilities.reduce(
            (acc, ability) => {
              acc[ability.class] = (acc[ability.class] || 0) + 1
              return acc
            },
            {} as Record<string, number>,
          )

          return (
            <Card key={category.name}>
              <Accordion type="single" collapsible>
                <AccordionItem value={category.name} className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-4">
                        <Badge className={`${category.color} text-base px-3 py-1`}>{category.name}</Badge>
                        <p className="text-muted-foreground text-sm">{category.description}</p>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        {abilities.length} {abilities.length === 1 ? "ability" : "abilities"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-6 pb-4">
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-2">Classes with {category.name} CC:</h3>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(classCounts).map(([className, count]) => (
                            <Badge key={className} variant="secondary" className={classColors[className]}>
                              {className} ({count})
                            </Badge>
                          ))}
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
                              <TableHead>Specialization</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {abilities.map((ability) => (
                              <TableRow key={ability.id}>
                                <TableCell>
                                  <span className={classColors[ability.class]}>{ability.class}</span>
                                </TableCell>
                                <TableCell className="font-medium">{ability.ability}</TableCell>
                                <TableCell>{ability.duration}</TableCell>
                                <TableCell>
                                  {ability.dispellable ? (
                                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Yes</Badge>
                                  ) : (
                                    <Badge variant="secondary">No</Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {ability.breaksOnDamage ? (
                                    <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Yes</Badge>
                                  ) : (
                                    <Badge variant="secondary">No</Badge>
                                  )}
                                </TableCell>
                                <TableCell className="text-muted-foreground">{ability.specialization}</TableCell>
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
          )
        })}
      </div>
    </div>
  )
}
