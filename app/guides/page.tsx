import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Target, Users, Swords, Shield } from "lucide-react";

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Crowd Control Guides
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Master the art of crowd control in World of Warcraft
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Understanding CC Basics */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-lg sm:text-xl">
                Understanding Crowd Control
              </CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Learn the fundamentals of CC and how it works in WoW
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 text-sm sm:text-base">
            <div>
              <h3 className="font-semibold mb-2">What is Crowd Control?</h3>
              <p className="text-muted-foreground">
                Crowd Control (CC) refers to abilities that limit or prevent
                enemy actions. These abilities are crucial for controlling the
                pace of combat, protecting allies, and setting up kills in both
                PvP and PvE content.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Types of Crowd Control</h3>
              <div className="grid gap-3">
                <div className="flex gap-3">
                  <Badge variant="outline" className="shrink-0">
                    Stun
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Completely incapacitates the target, preventing all actions.
                    Most stuns break on damage.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Badge variant="outline" className="shrink-0">
                    Root
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Prevents movement but allows the target to cast spells and
                    use abilities.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Badge variant="outline" className="shrink-0">
                    Silence
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Prevents spellcasting but allows physical abilities and
                    movement.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Badge variant="outline" className="shrink-0">
                    Disorient
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Incapacitates the target but breaks on any damage taken.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Badge variant="outline" className="shrink-0">
                    Incapacitate
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Similar to disorient, prevents all actions and breaks on
                    damage.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diminishing Returns */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-lg sm:text-xl">
                Diminishing Returns (DR)
              </CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              How DR works and why it matters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 text-sm sm:text-base">
            <div>
              <h3 className="font-semibold mb-2">What is DR?</h3>
              <p className="text-muted-foreground mb-4">
                Diminishing Returns is a system that reduces the duration of
                crowd control effects when applied repeatedly to the same
                target. This prevents players from being permanently locked down
                by CC chains.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">How DR Works</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    1st
                  </Badge>
                  <span className="text-muted-foreground">
                    Full duration (100%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                    2nd
                  </Badge>
                  <span className="text-muted-foreground">
                    Half duration (50%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                    3rd
                  </Badge>
                  <span className="text-muted-foreground">
                    Quarter duration (25%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                    4th+
                  </Badge>
                  <span className="text-muted-foreground">
                    Immune to that DR category
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                DR categories reset after 18 seconds of not being affected by
                that category.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Strategic Implications</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                <li>Coordinate CC with teammates to maximize control time</li>
                <li>Use different DR categories to extend total CC duration</li>
                <li>Save important CC for when DR is reset</li>
                <li>Track enemy DR status to time your CC effectively</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* PvP Strategies */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <Swords className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-lg sm:text-xl">
                PvP CC Strategies
              </CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Using crowd control effectively in player versus player combat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 text-sm sm:text-base">
            <div>
              <h3 className="font-semibold mb-2">CC Chains</h3>
              <p className="text-muted-foreground mb-3">
                A CC chain is a sequence of crowd control abilities used to keep
                a target controlled for an extended period. Effective chains use
                different DR categories.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                <p className="font-medium">Example Chain:</p>
                <p className="text-muted-foreground">
                  Polymorph (Disorient) → Ring of Frost (Controlled Stun) →
                  Dragon's Breath (Disorient, 50% DR) → Frost Nova (Root)
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  This chain uses multiple DR categories to maximize control
                  time.
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Offensive vs Defensive CC</h3>
              <div className="space-y-3">
                <div>
                  <Badge className="mb-2">Offensive</Badge>
                  <p className="text-sm text-muted-foreground">
                    Used to set up kills or prevent enemy counterplay. Examples:
                    stunning a healer during a kill attempt, polymorphing a DPS
                    to create a numbers advantage.
                  </p>
                </div>
                <div>
                  <Badge className="mb-2">Defensive</Badge>
                  <p className="text-sm text-muted-foreground">
                    Used to survive or escape dangerous situations. Examples:
                    rooting a melee to create distance, stunning an enemy during
                    their burst cooldowns.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Key Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                <li>Communicate CC targets with your team</li>
                <li>Track enemy trinkets and CC breaks</li>
                <li>Don't overlap CC on the same DR category unnecessarily</li>
                <li>Use CC to interrupt important casts (heals, damage)</li>
                <li>Position yourself to land CC on priority targets</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* PvE Strategies */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-lg sm:text-xl">
                PvE CC Strategies
              </CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Managing crowd control in dungeons and raids
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 text-sm sm:text-base">
            <div>
              <h3 className="font-semibold mb-2">Dungeon CC Priority</h3>
              <p className="text-muted-foreground mb-3">
                In Mythic+ and dungeons, CC is used to manage large pulls and
                dangerous enemy abilities.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="shrink-0 mt-0.5">
                    High
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Casters with dangerous spells, healers, enemies with deadly
                    abilities
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="shrink-0 mt-0.5">
                    Medium
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Melee enemies that can be kited, adds during boss fights
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="shrink-0 mt-0.5">
                    Low
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Weak trash mobs, enemies that die quickly
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">CC Assignment</h3>
              <p className="text-muted-foreground text-sm mb-3">
                In organized groups, assign specific players to CC specific
                targets. Use markers (skull, cross, moon, etc.) to designate CC
                targets.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-sm">
                <p className="font-medium mb-2">Example Assignment:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Mage: Polymorph moon target</li>
                  <li>• Rogue: Sap square target before pull</li>
                  <li>• Hunter: Trap star target</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Important Considerations</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                <li>Some enemies are immune to certain CC types</li>
                <li>Boss adds often have reduced CC duration</li>
                <li>Coordinate CC breaks with tank and group damage</li>
                <li>
                  Use CC to interrupt dangerous casts when interrupts are on
                  cooldown
                </li>
                <li>Re-apply CC if pulls are taking longer than expected</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Tips */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-lg sm:text-xl">
                Advanced Tips
              </CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Pro-level crowd control techniques
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 text-sm sm:text-base">
            <div>
              <h3 className="font-semibold mb-2">Fake Casting</h3>
              <p className="text-muted-foreground text-sm">
                Start casting a CC ability to bait out enemy interrupts or
                defensive cooldowns, then cancel and cast your real ability.
                This is especially effective with long-cast CC like Polymorph.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">CC Layering</h3>
              <p className="text-muted-foreground text-sm">
                Apply multiple CC effects from different DR categories
                simultaneously or in quick succession to maximize control time
                and make it harder for enemies to respond.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Predictive CC</h3>
              <p className="text-muted-foreground text-sm">
                Anticipate enemy movement and cast CC where they will be, not
                where they are. This is crucial for skillshot CC like Ring of
                Frost or traps.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">CC Trading</h3>
              <p className="text-muted-foreground text-sm">
                Force enemies to use defensive cooldowns or trinkets on less
                important CC, saving your most powerful CC for when they're
                vulnerable. This creates windows of opportunity for your team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
