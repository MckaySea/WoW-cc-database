import { ccAbilities, classColors, drCategories } from "@/lib/cc-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { notFound } from "next/navigation";

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ class: string }>;
}) {
  const { class: classSlug } = await params;
  const className = classSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const classAbilities = ccAbilities.filter((a) => a.class === className);

  if (classAbilities.length === 0) {
    notFound();
  }

  const drCategoryBreakdown = drCategories.map((dr) => ({
    ...dr,
    count: classAbilities.filter((a) => a.drCategory === dr.name).length,
  }));

  const dispellableCount = classAbilities.filter((a) => a.dispellable).length;
  const breaksOnDamageCount = classAbilities.filter(
    (a) => a.breaksOnDamage
  ).length;
  const talentCount = classAbilities.filter(
    (a) => a.talent === "Talent"
  ).length;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1
          className={`text-3xl sm:text-4xl font-bold mb-2 text-balance ${classColors[className]}`}
        >
          {className}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Complete guide to {className} crowd control abilities
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card className="p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">
            Total CC Abilities
          </p>
          <p className="text-2xl sm:text-3xl font-bold">
            {classAbilities.length}
          </p>
        </Card>
        <Card className="p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">
            Dispellable
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-green-500">
            {dispellableCount}
          </p>
        </Card>
        <Card className="p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">
            Breaks on Damage
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-red-500">
            {breaksOnDamageCount}
          </p>
        </Card>
        <Card className="p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">
            Talent Abilities
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-accent">
            {talentCount}
          </p>
        </Card>
      </div>

      <Card className="p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          DR Category Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {drCategoryBreakdown
            .filter((dr) => dr.count > 0)
            .map((dr) => (
              <div key={dr.name} className="space-y-2">
                <Badge className={dr.color}>{dr.name}</Badge>
                <p className="text-2xl font-bold">{dr.count}</p>
                <p className="text-xs text-muted-foreground">
                  {dr.description}
                </p>
              </div>
            ))}
        </div>
      </Card>

      <Card>
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">All Abilities</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ability</TableHead>
                <TableHead>DR Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Dispellable</TableHead>
                <TableHead>Breaks on Damage</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classAbilities.map((ability) => (
                <TableRow key={ability.id}>
                  <TableCell className="font-medium">
                    {ability.ability}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ability.drCategory}</Badge>
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
                    {ability.specialization}
                  </TableCell>
                  <TableCell>
                    {ability.talent === "Talent" ? (
                      <Badge variant="outline">Talent</Badge>
                    ) : (
                      <Badge variant="secondary">Base</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
