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
import { GitCompareArrows } from "lucide-react";

export default function CollegeCompare() {
  const colleges = useQuery(api.compare.getAllColleges);

  const [college1Id, setCollege1Id] = useState<string>("");
  const [branch1Id, setBranch1Id] = useState<string>("");
  const [college2Id, setCollege2Id] = useState<string>("");
  const [branch2Id, setBranch2Id] = useState<string>("");

  const branches1 = useQuery(
    api.compare.getBranchesByCollege,
    college1Id ? { collegeId: college1Id as any } : "skip"
  );
  const branches2 = useQuery(
    api.compare.getBranchesByCollege,
    college2Id ? { collegeId: college2Id as any } : "skip"
  );

  const branch1 = useMemo(
    () => branches1?.find((b) => b._id === branch1Id),
    [branches1, branch1Id]
  );
  const branch2 = useMemo(
    () => branches2?.find((b) => b._id === branch2Id),
    [branches2, branch2Id]
  );

  const comparison = useMemo(() => {
    if (!branch1 || !branch2) return null;
    const set1 = new Set(branch1.skills.map((s) => s.toLowerCase()));
    const set2 = new Set(branch2.skills.map((s) => s.toLowerCase()));
    const allSkills = new Set([...set1, ...set2]);

    const common: string[] = [];
    const only1: string[] = [];
    const only2: string[] = [];

    for (const skill of allSkills) {
      const in1 = set1.has(skill);
      const in2 = set2.has(skill);
      const original =
        branch1.skills.find((s) => s.toLowerCase() === skill) ||
        branch2.skills.find((s) => s.toLowerCase() === skill) ||
        skill;
      if (in1 && in2) common.push(original);
      else if (in1) only1.push(original);
      else only2.push(original);
    }

    return {
      common: common.sort(),
      only1: only1.sort(),
      only2: only2.sort(),
      college1Name: colleges?.find((c) => c._id === college1Id)?.name ?? "",
      college2Name: colleges?.find((c) => c._id === college2Id)?.name ?? "",
    };
  }, [branch1, branch2, colleges, college1Id, college2Id]);

  if (colleges === undefined) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Loading…
      </div>
    );
  }

  const dedupedBranches = (list: typeof branches1) => {
    if (!list) return [];
    const seen = new Set<string>();
    return list.filter((b) => {
      const key = `${b.campus}|${b.branchName}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  return (
    <div className="space-y-8">
      {/* Selection */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Side 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">College A</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select
              value={college1Id}
              onValueChange={(v) => {
                setCollege1Id(v);
                setBranch1Id("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select college" />
              </SelectTrigger>
              <SelectContent>
                {colleges.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={branch1Id}
              onValueChange={setBranch1Id}
              disabled={!college1Id}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={college1Id ? "Select branch" : "Select college first"}
                />
              </SelectTrigger>
              <SelectContent>
                {dedupedBranches(branches1).map((b) => (
                  <SelectItem key={b._id} value={b._id}>
                    {b.branchName} — {b.campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {branch1 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {branch1.skills.map((s) => (
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
            <CardTitle className="text-base">College B</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select
              value={college2Id}
              onValueChange={(v) => {
                setCollege2Id(v);
                setBranch2Id("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select college" />
              </SelectTrigger>
              <SelectContent>
                {colleges.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={branch2Id}
              onValueChange={setBranch2Id}
              disabled={!college2Id}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={college2Id ? "Select branch" : "Select college first"}
                />
              </SelectTrigger>
              <SelectContent>
                {dedupedBranches(branches2).map((b) => (
                  <SelectItem key={b._id} value={b._id}>
                    {b.branchName} — {b.campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {branch2 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {branch2.skills.map((s) => (
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
                <GitCompareArrows className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">Comparison Results</CardTitle>
                <CardDescription>
                  {branch1?.branchName} ({comparison.college1Name}) vs{" "}
                  {branch2?.branchName} ({comparison.college2Name})
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Common */}
            <div>
              <p className="mb-2 text-xs font-semibold text-green-600 dark:text-green-400 uppercase">
                Common Skills ({comparison.common.length})
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
                Only in {branch1?.branchName} ({comparison.only1.length})
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
                Only in {branch2?.branchName} ({comparison.only2.length})
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
          </CardContent>
        </Card>
      )}

      {!comparison && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <GitCompareArrows className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">
            Select two colleges and branches to compare their skill exposure side by side.
          </p>
        </div>
      )}
    </div>
  );
}
