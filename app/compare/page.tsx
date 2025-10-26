"use client";

import { useState } from "react";
import { ccAbilities, classColors } from "@/lib/cc-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";

export default function ComparePage() {
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);

  const addAbility = (abilityId: string) => {
    if (
      !selectedAbilities.includes(abilityId) &&
      selectedAbilities.length < 4
    ) {
      setSelectedAbilities([...selectedAbilities, abilityId]);
    }
  };

  const removeAbility = (abilityId: string) => {
    setSelectedAbilities(selectedAbilities.filter((id) => id !== abilityId));
  };

  const selectedAbilityData = selectedAbilities
    .map((id) => ccAbilities.find((a) => a.id === id))
    .filter(Boolean);

  const availableAbilities = ccAbilities.filter(
    (a) => !selectedAbilities.includes(a.id)
  );

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-balance">
          Compare CC Abilities
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Select up to 4 abilities to compare their properties side-by-side
        </p>
      </div>

      <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Select
            value=""
            onValueChange={(value) => addAbility(value)}
            disabled={selectedAbilities.length >= 4}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select an ability to compare..." />
            </SelectTrigger>
            <SelectContent>
              {availableAbilities.map((ability) => (
                <SelectItem key={ability.id} value={ability.id}>
                  <span className={classColors[ability.class]}>
                    {ability.class}
                  </span>{" "}
                  - {ability.ability}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedAbilities.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setSelectedAbilities([])}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
        {selectedAbilities.length >= 4 && (
          <p className="text-sm text-muted-foreground mt-2">
            Maximum of 4 abilities can be compared at once
          </p>
        )}
      </Card>

      {selectedAbilityData.length === 0 ? (
        <Card className="p-8 sm:p-12">
          <div className="text-center text-muted-foreground">
            <Plus className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
            <p className="text-base sm:text-lg">No abilities selected</p>
            <p className="text-sm mt-2">
              Select abilities from the dropdown above to start comparing
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {selectedAbilityData.map((ability) => (
            <Card key={ability.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => removeAbility(ability.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Class</p>
                  <p
                    className={`text-lg font-semibold ${
                      classColors[ability.class]
                    }`}
                  >
                    {ability.class}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ability</p>
                  <p className="text-xl font-bold">{ability.ability}</p>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      DR Category
                    </p>
                    <Badge variant="outline">{ability.drCategory}</Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Duration
                    </p>
                    <p className="font-medium">{ability.duration}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Dispellable
                    </p>
                    {ability.dispellable ? (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Breaks on Damage
                    </p>
                    {ability.breaksOnDamage ? (
                      <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Specialization
                    </p>
                    <p className="text-sm">{ability.specialization}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                    {ability.talent === "Talent" ? (
                      <Badge variant="outline">Talent</Badge>
                    ) : (
                      <Badge variant="secondary">Base</Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
