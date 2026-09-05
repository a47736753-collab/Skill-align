import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  Building2,
  Briefcase,
  Search,
  MapPin,
  Layers,
} from "lucide-react";

type Filter = "all" | "colleges" | "companies" | "roles";

interface CatalogProps {
  onNavigateToCompare?: (tab: "college" | "company") => void;
  onNavigateToCareer?: () => void;
}

export default function Catalog({ onNavigateToCompare, onNavigateToCareer }: CatalogProps) {
  const colleges = useQuery(api.compare.getAllColleges);
  const companies = useQuery(api.compare.getAllCompanies);
  const allRoles = useQuery(api.compare.getAllRoles);
  const profile = useQuery(api.userProfiles.getMyProfile);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [detailItem, setDetailItem] = useState<{
    type: "college" | "company" | "role";
    id: string;
  } | null>(null);

  const q = search.toLowerCase();

  // College branches (all)
  const allBranches = useQuery(api.compare.getBranchesByCollege, detailItem?.type === "college" ? { collegeId: detailItem.id as any } : "skip");

  // Company roles (all)
  const companyRoles = useQuery(api.compare.getRolesByCompany, detailItem?.type === "company" ? { companyId: detailItem.id as any } : "skip");

  const filteredColleges = useMemo(() => {
    if (!colleges) return [];
    if (filter !== "all" && filter !== "colleges") return [];
    if (!q) return colleges;
    return colleges.filter((c) => c.name.toLowerCase().includes(q));
  }, [colleges, filter, q]);

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];
    if (filter !== "all" && filter !== "companies") return [];
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, filter, q]);

  const filteredRoles = useMemo(() => {
    if (!allRoles) return [];
    if (filter !== "all" && filter !== "roles") return [];
    if (!q) return allRoles;
    return allRoles.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.companyName.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
    );
  }, [allRoles, filter, q]);

  // Role match with user skills
  const userSkillSet = useMemo(
    () => new Set((profile?.skills ?? []).map((s: string) => s.toLowerCase())),
    [profile]
  );

  const getRoleMatch = (requiredSkills: string[]) => {
    if (userSkillSet.size === 0) return null;
    const matched = requiredSkills.filter((s) =>
      userSkillSet.has(s.toLowerCase())
    );
    return Math.round((matched.length / requiredSkills.length) * 100);
  };

  const detailCollege = useMemo(
    () => colleges?.find((c) => c._id === detailItem?.id),
    [colleges, detailItem]
  );

  const detailCompany = useMemo(
    () => companies?.find((c) => c._id === detailItem?.id),
    [companies, detailItem]
  );

  const detailRole = useMemo(
    () => allRoles?.find((r) => r._id === detailItem?.id),
    [allRoles, detailItem]
  );

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: (colleges?.length ?? 0) + (companies?.length ?? 0) + (allRoles?.length ?? 0) },
    { id: "colleges", label: "Colleges", count: colleges?.length ?? 0 },
    { id: "companies", label: "Companies", count: companies?.length ?? 0 },
    { id: "roles", label: "Roles", count: allRoles?.length ?? 0 },
  ];

  if (colleges === undefined || companies === undefined || allRoles === undefined) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Loading catalog…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search colleges, companies, or roles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === t.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              <span className="ml-1 opacity-60">{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colleges */}
      {filteredColleges.length > 0 && (
        <section>
          {filter === "all" && (
            <h3 className="mb-3 text-xs font-semibold text-muted-foreground uppercase">
              Colleges
            </h3>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredColleges.map((c) => (
              <Card
                key={c._id}
                className="cursor-pointer transition-colors hover:border-primary/30"
                onClick={() => setDetailItem({ type: "college", id: c._id })}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug">
                        {c.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Click to view details
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Companies */}
      {filteredCompanies.length > 0 && (
        <section>
          {filter === "all" && (
            <h3 className="mb-3 text-xs font-semibold text-muted-foreground uppercase">
              Companies
            </h3>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((c) => (
              <Card
                key={c._id}
                className="cursor-pointer transition-colors hover:border-primary/30"
                onClick={() => setDetailItem({ type: "company", id: c._id })}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug">
                        {c.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Click to view details
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Roles */}
      {filteredRoles.length > 0 && (
        <section>
          {filter === "all" && (
            <h3 className="mb-3 text-xs font-semibold text-muted-foreground uppercase">
              Job Roles
            </h3>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRoles.map((r) => {
              const match = getRoleMatch(r.requiredSkills);
              return (
                <Card
                  key={r._id}
                  className="cursor-pointer transition-colors hover:border-primary/30"
                  onClick={() => setDetailItem({ type: "role", id: r._id })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-snug">
                            {r.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {r.companyName} · {r.location}
                          </p>
                        </div>
                      </div>
                      {match !== null && (
                        <span
                          className={`shrink-0 text-sm font-bold ${
                            match >= 70
                              ? "text-green-600 dark:text-green-400"
                              : match >= 40
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-red-500 dark:text-red-400"
                          }`}
                        >
                          {match}%
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty state */}
      {filteredColleges.length === 0 &&
        filteredCompanies.length === 0 &&
        filteredRoles.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <Search className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              {search
                ? `No results for "${search}"`
                : "No items to display."}
            </p>
          </div>
        )}

      {/* ── Detail Sheet ─────────────────────────────────── */}
      <Sheet
        open={detailItem !== null}
        onOpenChange={(open) => !open && setDetailItem(null)}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {/* College Detail */}
          {detailItem?.type === "college" && detailCollege && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  {detailCollege.name}
                </SheetTitle>
                <SheetDescription>
                  All branches and the skills each branch covers.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {allBranches?.map((b) => (
                  <div key={b._id} className="rounded-lg border border-border/60 p-4">
                    <div className="flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-sm font-medium">{b.branchName}</p>
                      <span className="text-xs text-muted-foreground">
                        · {b.campus}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {b.skills.map((s: string) => {
                        const has = userSkillSet.has(s.toLowerCase());
                        return (
                          <Badge
                            key={s}
                            variant="outline"
                            className={`text-xs ${has ? "border-green-400/40 bg-green-400/5 text-green-700 dark:text-green-400" : ""}`}
                          >
                            {has && "✓ "}
                            {s}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {allBranches?.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No branches found.
                  </p>
                )}
                <button
                  onClick={() => {
                    setDetailItem(null);
                    onNavigateToCompare?.("college");
                  }}
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Compare with another college →
                </button>
              </div>
            </>
          )}

          {/* Company Detail */}
          {detailItem?.type === "company" && detailCompany && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {detailCompany.name}
                </SheetTitle>
                <SheetDescription>
                  All locations, roles, and required skills.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {companyRoles?.map((r) => {
                  const match = getRoleMatch(r.requiredSkills);
                  return (
                    <div key={r._id} className="rounded-lg border border-border/60 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-sm font-medium">{r.title}</p>
                        </div>
                        {match !== null && (
                          <span
                            className={`text-sm font-bold ${
                              match >= 70
                                ? "text-green-600 dark:text-green-400"
                                : match >= 40
                                  ? "text-yellow-600 dark:text-yellow-400"
                                  : "text-red-500 dark:text-red-400"
                            }`}
                          >
                            {match}% match
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {r.location}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.requiredSkills.map((s: string) => {
                          const has = userSkillSet.has(s.toLowerCase());
                          return (
                            <Badge
                              key={s}
                              variant="outline"
                              className={`text-xs ${has ? "border-green-400/40 bg-green-400/5 text-green-700 dark:text-green-400" : ""}`}
                            >
                              {has && "✓ "}
                              {s}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={() => {
                    setDetailItem(null);
                    onNavigateToCompare?.("company");
                  }}
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Compare with another company →
                </button>
              </div>
            </>
          )}

          {/* Role Detail */}
          {detailItem?.type === "role" && detailRole && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  {detailRole.title}
                </SheetTitle>
                <SheetDescription>
                  {detailRole.companyName} · {detailRole.location}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                {/* Match */}
                {(() => {
                  const match = getRoleMatch(detailRole.requiredSkills);
                  if (match === null) return null;
                  return (
                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                          Your Skill Match
                        </p>
                        <span
                          className={`text-lg font-bold ${
                            match >= 70
                              ? "text-green-600 dark:text-green-400"
                              : match >= 40
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-red-500 dark:text-red-400"
                          }`}
                        >
                          {match}%
                        </span>
                      </div>
                      <Progress value={match} className="mt-2 h-1.5" />
                    </div>
                  );
                })()}

                {/* Required Skills */}
                <div>
                  <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {detailRole.requiredSkills.map((s: string) => {
                      const has = userSkillSet.has(s.toLowerCase());
                      return (
                        <Badge
                          key={s}
                          className={
                            has
                              ? "bg-green-400/15 text-green-700 dark:text-green-400"
                              : "bg-red-400/10 text-red-600 dark:text-red-400"
                          }
                        >
                          {has ? "✓ " : "+ "}
                          {s}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Data confidence */}
                {(() => {
                  const ageMs = Date.now() - detailRole.lastUpdated;
                  const days = Math.floor(ageMs / (1000 * 60 * 60 * 24));
                  let conf: "High" | "Medium" | "Low" = "High";
                  if (days > 180) conf = "Low";
                  else if (days > 60) conf = "Medium";
                  return (
                    <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                      Data Confidence:{" "}
                      <span
                        className={
                          conf === "High"
                            ? "font-medium text-green-600 dark:text-green-400"
                            : conf === "Medium"
                              ? "font-medium text-yellow-600 dark:text-yellow-400"
                              : "font-medium text-red-500 dark:text-red-400"
                        }
                      >
                        {conf}
                      </span>{" "}
                      · Updated {days} days ago · Source: {detailRole.source}
                    </div>
                  );
                })()}

                <button
                  onClick={() => {
                    setDetailItem(null);
                    onNavigateToCareer?.();
                  }}
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Check full skill gap analysis →
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
