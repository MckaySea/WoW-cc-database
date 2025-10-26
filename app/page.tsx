"use client"

import { useState, useMemo } from "react"
import { ccAbilities, classColors } from "@/lib/cc-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, X } from "lucide-react"

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [selectedDR, setSelectedDR] = useState<string>("all")
  const [dispellableOnly, setDispellableOnly] = useState(false)
  const [breaksOnDamageOnly, setBreaksOnDamageOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const classes = useMemo(() => {
    return Array.from(new Set(ccAbilities.map((a) => a.class))).sort()
  }, [])

  const drCategories = useMemo(() => {
    return Array.from(new Set(ccAbilities.map((a) => a.drCategory))).sort()
  }, [])

  const filteredAbilities = useMemo(() => {
    return ccAbilities.filter((ability) => {
      const matchesSearch =
        ability.ability.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ability.class.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesClass = selectedClass === "all" || ability.class === selectedClass
      const matchesDR = selectedDR === "all" || ability.drCategory === selectedDR
      const matchesDispellable = !dispellableOnly || ability.dispellable
      const matchesBreaks = !breaksOnDamageOnly || ability.breaksOnDamage

      return matchesSearch && matchesClass && matchesDR && matchesDispellable && matchesBreaks
    })
  }, [searchQuery, selectedClass, selectedDR, dispellableOnly, breaksOnDamageOnly])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedClass("all")
    setSelectedDR("all")
    setDispellableOnly(false)
    setBreaksOnDamageOnly(false)
  }

  const hasActiveFilters =
    searchQuery || selectedClass !== "all" || selectedDR !== "all" || dispellableOnly || breaksOnDamageOnly

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Crowd Control Database</h1>
        <p className="text-muted-foreground text-lg">
          Search and filter all crowd control abilities across World of Warcraft classes
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search abilities or classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>DR Category</Label>
                <Select value={selectedDR} onValueChange={setSelectedDR}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {drCategories.map((dr) => (
                      <SelectItem key={dr} value={dr}>
                        {dr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <Checkbox
                  id="dispellable"
                  checked={dispellableOnly}
                  onCheckedChange={(checked) => setDispellableOnly(checked as boolean)}
                />
                <Label htmlFor="dispellable" className="cursor-pointer">
                  Dispellable only
                </Label>
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <Checkbox
                  id="breaks"
                  checked={breaksOnDamageOnly}
                  onCheckedChange={(checked) => setBreaksOnDamageOnly(checked as boolean)}
                />
                <Label htmlFor="breaks" className="cursor-pointer">
                  Breaks on damage
                </Label>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Ability</TableHead>
                <TableHead>DR Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Dispellable</TableHead>
                <TableHead>Breaks on Damage</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Talent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAbilities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No abilities found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredAbilities.map((ability) => (
                  <TableRow key={ability.id}>
                    <TableCell>
                      <span className={classColors[ability.class]}>{ability.class}</span>
                    </TableCell>
                    <TableCell className="font-medium">{ability.ability}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ability.drCategory}</Badge>
                    </TableCell>
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
                    <TableCell className="text-center">
                      {ability.talent === "Talent" ? (
                        <span className="text-green-500 text-lg">✓</span>
                      ) : (
                        <span className="text-red-500 text-lg">✗</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Showing {filteredAbilities.length} of {ccAbilities.length} abilities
      </div>
    </div>
  )
}
