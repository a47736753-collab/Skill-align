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
import { Building2 } from "lucide-react";

export default function CompanyCompare() {
  const companies = useQuery(api.compare.getAllCompanies);

  const [company1Id, setCompany1Id] = useState<string>("");
  const [role1Id, setRole1Id] = useState<string>("");
  const [company2Id, setCompany2Id] = useState<string>("");
  const [role2Id, setRole2Id] = useState<string>("");

  const roles1 = useQuery(
    api.compare.getRolesByCompany,
    company1Id ? { companyId: company1Id as any } : "skip"
  );
  const roles2 = useQuery(
    api.compare.getRolesByCompany,
    company2Id ? { companyId: company2Id as any } : "skip"
  );

  const role1 = useMemo(
    () => roles1?.find((r) => r._id === role1Id),
    [roles1, role1Id]
  );
  const role2 = useMemo(
    () => roles2?.find((r) => r._id === role2Id),
    [roles2, role2Id]
  );

  const comparison = useMemo(() => {
    if (!role1 || !role2) return null;
    const set1 = new Set(role1.requiredSkills.map((s) => s.toLowerCase()));
    const set2 = new Set(role2.requiredSkills.map((s) => s.toLowerCase()));
    const allSkills = new Set([...set1, ...set2]);

    const common: string[] = [];
    const only1: string[] = [];
    const only2: string[] = [];

    for (const skill of allSkills) {
      const in1 = set1.has(skill);
      const in2 = set2.has(skill);
      const original =
        role1.requiredSkills.find((s) => s.toLowerCase() === skill) ||
        role2.requiredSkills.find((s) => s.toLowerCase() === skill) ||
        skill;
      if (in1 && in2) common.push(original);
      else if (in1) only1.push(original);
      else only2.push(original);
    }

    return {
      common: common.sort(),
      only1: only1.sort(),
      only2: only2.sort(),
    };
  }, [role1, role2]);

  if (companies === undefined) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Selection */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Side 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company A</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select
              value={company1Id}
              onValueChange={(v) => {
                setCompany1Id(v);
                setRole1Id("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
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
              value={role1Id}
              onValueChange={setRole1Id}
              disabled={!company1Id}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    company1Id ? "Select location & role" : "Select company first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {roles1?.map((r) => (
                  <SelectItem key={r._id} value={r._id}>
                    {r.title} — {r.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {role1 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {role1.requiredSkills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Side 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company B</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select
              value={company2Id}
              onValueChange={(v) => {
                setCompany2Id(v);
                setRole2Id("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
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
              value={role2Id}
              onValueChange={setRole2Id}
              disabled={!company2Id}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    company2Id ? "Select location & role" : "Select company first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {roles2?.map((r) => (
                  <SelectItem key={r._id} value={r._id}>
                    {r.title} — {r.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {role2 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {role2.requiredSkills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Comparison Results */}
      {comparison && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.70_0.18_165)]/10 text-[oklch(0.55_0.15_165)]">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">Comparison Results</CardTitle>
                <CardDescription>
                  {role1?.title} ({role1?.companyName} — {role1?.location}) vs{" "}
                  {role2?.title} ({role2?.companyName} — {role2?.location})
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Common */}
            <div>
              <p className="mb-2 text-xs font-semibold text-green-600 dark:text-green-400 uppercase">
                Common Required Skills ({comparison.common.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {comparison.common.map((s) => (
                  <Badge
                    key={s}
                    className="bg-green-400/15 text-green-700 dark:text-green-400"
                  >
                    {s}
                  </Badge>
                ))}
                {comparison.common.length === 0 && (
                  <p className="text-sm text-muted-foreground">None</p>
                )}
              </div>
            </div>

            {/* Only in A */}
            <div>
              <p className="mb-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">
                Only in {role1?.title} at {role1?.companyName} ({comparison.only1.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {comparison.only1.map((s) => (
                  <Badge
                    key={s}
                    className="bg-blue-400/15 text-blue-700 dark:text-blue-400"
                  >
                    {s}
                  </Badge>
                ))}
                {comparison.only1.length === 0 && (
                  <p className="text-sm text-muted-foreground">None</p>
                )}
              </div>
            </div>

            {/* Only in B */}
            <div>
              <p className="mb-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase">
                Only in {role2?.title} at {role2?.companyName} ({comparison.only2.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {comparison.only2.map((s) => (
                  <Badge
                    key={s}
                    className="bg-orange-400/15 text-orange-700 dark:text-orange-400"
                  >
                    {s}
                  </Badge>
                ))}
                {comparison.only2.length === 0 && (
                  <p className="text-sm text-muted-foreground">None</p>
                )}
              </div>
            </div>

            {/* Insights */}
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-sm font-medium text-foreground">
                Key Differences
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {comparison.only1.length > 0 && (
                  <>
                    <strong>{role1?.companyName}</strong> additionally requires{" "}
                    {comparison.only1.slice(0, 3).join(", ")}
                    {comparison.only1.length > 3 &&
                      ` and ${comparison.only1.length - 3} more`}.
                  </>
                )}{" "}
                {comparison.only2.length > 0 && (
                  <>
                    <strong>{role2?.companyName}</strong> additionally requires{" "}
                    {comparison.only2.slice(0, 3).join(", ")}
                    {comparison.only2.length > 3 &&
                      ` and ${comparison.only2.length - 3} more`}.
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {!comparison && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <Building2 className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">
            Select two companies and roles to compare their requirements side by side.
          </p>
        </div>
      )}
    </div>
  );
}
