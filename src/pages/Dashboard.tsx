import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "convex/react";
import { Loader2, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import CollegeCompare from "@/components/dashboard/CollegeCompare";
import CompanyCompare from "@/components/dashboard/CompanyCompare";
import CareerGuide from "@/components/dashboard/CareerGuide";
import MySkills from "@/components/dashboard/MySkills";

type Tab = "skills" | "college" | "company" | "career";

const tabs: { id: Tab; label: string }[] = [
  { id: "skills", label: "My Skills" },
  { id: "college", label: "Compare Colleges" },
  { id: "company", label: "Compare Companies" },
  { id: "career", label: "Career Guide" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("skills");
  const isSeeded = useQuery(api.compare.isSeeded);
  const seedAll = useMutation(api.seed.seedAll);

  useEffect(() => {
    if (isSeeded === false) {
      seedAll()
        .then((result) => {
          if (result === "seeded") {
            toast.success("Sample data loaded — colleges, companies & roles ready");
          }
        })
        .catch(() => toast.error("Failed to load sample data"));
    }
  }, [isSeeded, seedAll]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[oklch(0.70_0.18_165)]">
              <span className="text-sm font-bold text-[oklch(0.15_0.04_270)]">
                S
              </span>
            </div>
            <span className="text-base font-semibold text-foreground">
              Skill Align
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.name || user?.email || "Student"}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-1 overflow-x-auto py-1" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {isSeeded === undefined ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {activeTab === "skills" && <MySkills />}
            {activeTab === "college" && <CollegeCompare />}
            {activeTab === "company" && <CompanyCompare />}
            {activeTab === "career" && <CareerGuide />}
          </>
        )}
      </div>
    </main>
  );
}
