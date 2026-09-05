import { supabase } from "@/lib/supabase";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Upload, FileText, Trash2, Download, Loader2 } from "lucide-react";

const BUCKET = "resumes";

interface StoredFile {
  name: string;
  id?: string;
  created_at?: string;
  metadata?: { size?: number };
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function ResumeUpload() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const listFiles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list("", { sortBy: { column: "created_at", order: "desc" } });
    if (error) {
      // Bucket might not exist yet — that's fine
      setFiles([]);
    } else {
      setFiles((data as unknown as StoredFile[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    listFiles();
  }, [listFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF, DOCX, DOC, or TXT files are accepted.");
      return;
    }

    // Validate file size (5 MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5 MB.");
      return;
    }

    setUploading(true);
    const path = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file);
    setUploading(false);

    if (error) {
      toast.error(error.message.includes("bucket")
        ? "Storage bucket not found. Create a \"resumes\" bucket in your Supabase dashboard under Storage."
        : `Upload failed: ${error.message}`);
    } else {
      toast.success("File uploaded.");
      listFiles();
    }

    // Reset the input so the same file can be re-selected
    e.target.value = "";
  };

  const handleDownload = async (fileName: string) => {
    const { data } = await supabase.storage.from(BUCKET).createSignedUrl(fileName, 60);
    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    } else {
      toast.error("Could not generate download link.");
    }
  };

  const handleDelete = async (fileName: string) => {
    const { error } = await supabase.storage.from(BUCKET).remove([fileName]);
    if (error) {
      toast.error("Delete failed.");
    } else {
      toast.success("File removed.");
      listFiles();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume & Documents</CardTitle>
        <CardDescription>
          Upload your resume or related documents. Stored securely via Supabase Storage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload button */}
        <div>
          <label htmlFor="resume-upload">
            <Button asChild disabled={uploading} className="cursor-pointer gap-2">
              <span>
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {uploading ? "Uploading…" : "Upload file"}
              </span>
            </Button>
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
            onChange={handleUpload}
          />
          <span className="ml-3 text-xs text-muted-foreground">
            PDF, DOCX, DOC, or TXT — max 5 MB
          </span>
        </div>

        {/* File list */}
        {loading ? (
          <div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading files…
          </div>
        ) : files.length === 0 ? (
          <p className="py-6 text-sm text-muted-foreground text-center">
            No files uploaded yet.
          </p>
        ) : (
          <div className="space-y-2">
            {files.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {f.metadata?.size != null ? formatBytes(f.metadata.size) : ""}
                      {f.created_at ? ` · ${new Date(f.created_at).toLocaleDateString()}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDownload(f.name)}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(f.name)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
