import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Shield,
  Info,
} from "lucide-react";

function confidenceColor(c: string) {
  if (c === "High") return "text-green-600 dark:text-green-400";
  if (c === "Medium") return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function matchColor(pct: number) {
  if (pct >= 70) return "text-green-600 dark:text-green-400";
  if (pct >= 40) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function matchBarColor(pct: number) {
  if (pct >= 70) return "bg-green-500";
  if (pct >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

export default function CareerGuide() {
  const profile = useQuery(api.userProfiles.getMyProfile);
  const companies = useQuery(api.compare.getAllCompanies);
  const matchingRoles = useQuery(
    api.compare.findMatchingRoles,
    profile?.skills?.length ? { userSkills: profile.skills } : "skip"
  );

  const [targetCompanyId, setTargetCompanyId] = useState<string>("");
  const [targetRoleId, setTargetRoleId] = useState<string>("");

  const targetRoles = useQuery(
    api.compare.getRolesByCompany,
    targetCompanyId ? { companyId: targetCompanyId as any } : "skip"
  );

  const targetRole = useMemo(() => {
    const role = targetRoles?.find((r) => r._id === targetRoleId);
    if (!role) return null;
    const ageMs = Date.now() - role.lastUpdated;
    const daysSinceUpdate = Math.floor(ageMs / (1000 * 60 * 60 * 24));
    let dataConfidence: "High" | "Medium" | "Low" = "High";
    if (daysSinceUpdate > 180) dataConfidence = "Low";
    else if (daysSinceUpdate > 60) dataConfidence = "Medium";
    return { ...role, dataConfidence, daysSinceUpdate };
  }, [targetRoles, targetRoleId]);

  const skillGap = useMemo(() => {
    if (!targetRole || !profile) return null;
    const userSet = new Set(profile.skills.map((s) => s.toLowerCase()));
    const matched = targetRole.requiredSkills.filter((s) =>
      userSet.has(s.toLowerCase())
    );
    const missing = targetRole.requiredSkills.filter(
      (s) => !userSet.has(s.toLowerCase())
    );
    const matchPercent =
      targetRole.requiredSkills.length > 0
        ? Math.round(
            (matched.length / targetRole.requiredSkills.length) * 100
          )
        : 0;

    return { matched, missing, matchPercent };
  }, [targetRole, profile]);

  const userSkillsEmpty = !profile?.skills?.length;

  if (profile === undefined || companies === undefined) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Skill Gap Analysis ───────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.70_0.18_165)]/10 text-[oklch(0.55_0.15_165)]">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">
                Skill Gap Analysis
              </CardTitle>
              <CardDescription>
                Select a target company and role to see what skills you need.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              value={targetCompanyId}
              onValueChange={(v) => {
                setTargetCompanyId(v);
                setTargetRoleId("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Target company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={targetRoleId}
              onValueChange={setTargetRoleId}
              disabled={!targetCompanyId}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    targetCompanyId
                      ? "Select location & role"
                      : "Select company first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {targetRoles?.map((r) => (
                  <SelectItem key={r._id} value={r._id}>
                    {r.title} — {r.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {userSkillsEmpty && (
            <div className="flex items-center gap-2 rounded-lg bg-yellow-400/10 p-3 text-sm text-yellow-700 dark:text-yellow-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Add your skills in the My Skills tab first to use the career guide.
            </div>
          )}

          {skillGap && targetRole && (
            <div className="space-y-5 rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    {targetRole.title} — {targetRole.companyName} (
                    {targetRole.location})
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Source: {targetRole.source}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${matchColor(skillGap.matchPercent)}`}>
                    {skillGap.matchPercent}%
                  </p>
                  <p className="text-xs text-muted-foreground">Skill Match</p>
                </div>
              </div>

              <Progress value={skillGap.matchPercent} className="h-2" />

              {/* Matched skills */}
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400 uppercase">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Already Matched ({skillGap.matched.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skillGap.matched.map((s) => (
                    <Badge
                      key={s}
                      className="bg-green-400/15 text-green-700 dark:text-green-400"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Missing skills */}
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 uppercase">
                  <BookOpen className="h-3.5 w-3.5" />
                  Missing — Learn Next ({skillGap.missing.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skillGap.missing.map((s) => (
                    <Badge
                      key={s}
                      className="bg-red-400/15 text-red-700 dark:text-red-400"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Data confidence */}
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm">
                <Shield className={`h-4 w-4 shrink-0 ${confidenceColor(targetRole.dataConfidence)}`} />
                <span className="text-muted-foreground">Data Confidence:</span>
                <span className={`font-medium ${confidenceColor(targetRole.dataConfidence)}`}>
                  {targetRole.dataConfidence}
                </span>
                <span className="text-muted-foreground/60">·</span>
                <span className="text-muted-foreground">
                  Updated {targetRole.daysSinceUpdate} days ago
                </span>
              </div>

              {skillGap.matchPercent < 50 && (
                <div className="flex items-start gap-2 rounded-lg bg-[oklch(0.70_0.18_165)]/5 p-3 text-sm text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.55_0.15_165)]" />
                  <span>
                    Your current skills show a{" "}
                    <span className={matchColor(skillGap.matchPercent)}>
                      {skillGap.matchPercent}% match
                    </span>{" "}
                    with this role. Focus on learning the missing skills above
                    to strengthen your profile.
                  </span>
                </div>
              )}
            </div>
          )}

          {!skillGap && !targetRoleId && (
            <div className="rounded-xl border border-dashed border-border py-10 text-center">
              <Target className="mx-auto h-8 w-8 text-muted-foreground/40" />
              <p className="mt-2 text-sm text-muted-foreground">
                Select a target role to see your skill gap analysis.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Matching Roles ───────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.70_0.18_165)]/10 text-[oklch(0.55_0.15_165)]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">
                Roles That Match Your Skills
              </CardTitle>
              <CardDescription>
                Based on your current skill profile, here are the best-matching
                roles.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {userSkillsEmpty ? (
            <div className="rounded-xl border border-dashed border-border py-10 text-center">
              <TrendingUp className="mx-auto h-8 w-8 text-muted-foreground/40" />
              <p className="mt-2 text-sm text-muted-foreground">
                Add skills in the My Skills tab to see matching roles.
              </p>
            </div>
          ) : matchingRoles && matchingRoles.length > 0 ? (
            <div className="space-y-3">
              {matchingRoles.slice(0, 12).map((r) => (
                <div
                  key={r.roleId}
                  className="flex flex-col gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">
                      {r.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {r.companyName} — {r.location}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {r.matchedSkills.slice(0, 5).map((s) => (
                        <Badge
                          key={s}
                          className="bg-green-400/15 text-green-700 dark:text-green-400 text-xs"
                        >
                          {s}
                        </Badge>
                      ))}
                      {r.missingSkills.slice(0, 3).map((s) => (
                        <Badge
                          key={s}
                          className="bg-red-400/10 text-red-500 dark:text-red-400 text-xs"
                        >
                          +{s}
                        </Badge>
                      ))}
                      {r.missingSkills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{r.missingSkills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-xl font-bold ${matchColor(r.matchPercent)}`}>
                        {r.matchPercent}%
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase">
                        Match
                      </p>
                    </div>
                    <div className="hidden w-20 sm:block">
                      <div className="h-1.5 rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all ${matchBarColor(r.matchPercent)}`}
                          style={{ width: `${r.matchPercent}%` }}
                        />
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium ${confidenceColor(r.dataConfidence)}`}
                    >
                      {r.dataConfidence}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border py-10 text-center">
              <p className="text-sm text-muted-foreground">
                No matching roles found. Try adding more skills to broaden your matches.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
