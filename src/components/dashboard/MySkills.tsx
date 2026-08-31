import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { CheckCircle2, Plus, X, Save } from "lucide-react";

export default function MySkills() {
  const profile = useQuery(api.userProfiles.getMyProfile);
  const colleges = useQuery(api.compare.getAllColleges);
  const branches = useQuery(
    api.compare.getBranchesByCollege,
    profile?.collegeId ? { collegeId: profile.collegeId } : "skip"
  );
  const skillsByCategory = useQuery(api.compare.getSkillsByCategory);
  const upsertProfile = useMutation(api.userProfiles.upsertProfile);

  const [selectedCollege, setSelectedCollege] = useState<string | undefined>(
    profile?.collegeId ?? undefined
  );
  const [selectedBranch, setSelectedBranch] = useState<string | undefined>(
    profile?.branchId ?? undefined
  );
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(
    new Set(profile?.skills ?? [])
  );
  const [saving, setSaving] = useState(false);

  // Sync local state when profile loads
  useMemo(() => {
    if (profile) {
      setSelectedCollege(profile.collegeId ?? undefined);
      setSelectedBranch(profile.branchId ?? undefined);
      setSelectedSkills(new Set(profile.skills));
    }
  }, [profile]);

  const branchList = useMemo(() => {
    if (!branches) return [];
    // Deduplicate by branchName + campus
    const seen = new Set<string>();
    return branches.filter((b) => {
      const key = `${b.campus}|${b.branchName}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [branches]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) next.delete(skill);
      else next.add(skill);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertProfile({
        skills: Array.from(selectedSkills),
        collegeId: (selectedCollege as any) ?? undefined,
        branchId: (selectedBranch as any) ?? undefined,
      });
      toast.success("Profile saved");
    } catch {
      toast.error("Failed to save profile");
    }
    setSaving(false);
  };

  if (profile === undefined || colleges === undefined) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* College & Branch selection */}
      <Card>
        <CardHeader>
          <CardTitle>Your College & Branch</CardTitle>
          <CardDescription>
            Select your college and branch so we can tailor comparisons for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                College
              </label>
              <Select
                value={selectedCollege}
                onValueChange={(v) => {
                  setSelectedCollege(v);
                  setSelectedBranch(undefined);
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
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Branch
              </label>
              <Select
                value={selectedBranch}
                onValueChange={setSelectedBranch}
                disabled={!selectedCollege}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      selectedCollege
                        ? "Select branch"
                        : "Select college first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {branchList.map((b) => (
                    <SelectItem key={b._id} value={b._id}>
                      {b.branchName} ({b.campus})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>
                Click skills to add or remove them from your profile.{" "}
                <span className="font-medium text-foreground">
                  {selectedSkills.size} selected
                </span>
              </CardDescription>
            </div>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving…" : "Save Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Selected skills */}
          {selectedSkills.size > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
                Your current skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(selectedSkills)
                  .sort()
                  .map((s) => (
                    <Badge
                      key={s}
                      variant="default"
                      className="cursor-pointer bg-[oklch(0.70_0.18_165)] text-[oklch(0.15_0.04_270)] hover:bg-[oklch(0.65_0.18_165)]"
                      onClick={() => toggleSkill(s)}
                    >
                      {s}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Skills by category */}
          {skillsByCategory &&
            Object.entries(skillsByCategory).map(([cat, skills]) => (
              <div key={cat}>
                <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
                  {cat}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => {
                    const active = selectedSkills.has(s);
                    return (
                      <Badge
                        key={s}
                        variant={active ? "default" : "outline"}
                        className={`cursor-pointer transition-all ${
                          active
                            ? "bg-[oklch(0.70_0.18_165)] text-[oklch(0.15_0.04_270)] hover:bg-[oklch(0.65_0.18_165)]"
                            : "hover:border-[oklch(0.70_0.18_165)]/40 hover:text-foreground"
                        }`}
                        onClick={() => toggleSkill(s)}
                      >
                        {active && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {s}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ))}

          {!skillsByCategory && (
            <p className="text-sm text-muted-foreground">
              Loading skills…
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
