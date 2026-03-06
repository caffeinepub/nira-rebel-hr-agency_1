import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Download,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { CandidateApplication } from "../backend.d";
import {
  useDeleteApplication,
  useGetAllApplications,
} from "../hooks/useQueries";
import JobsSection from "./JobsSection";

interface AdminPanelProps {
  onClose: () => void;
}

// Helpers
function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function downloadResume(app: CandidateApplication) {
  if (!app.resumeBase64) return;
  const ext = app.resumeFileName.split(".").pop()?.toLowerCase() ?? "pdf";
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  const mime = mimeTypes[ext] ?? "application/octet-stream";
  const binary = atob(app.resumeBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const blob = new Blob([bytes], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = app.resumeFileName || `resume_${app.name}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Application Card
function ApplicationCard({
  app,
  index,
}: { app: CandidateApplication; index: number }) {
  const deleteMutation = useDeleteApplication();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(app.id);
      toast.success(`${app.name} ki application delete ho gayi.`);
    } catch {
      toast.error("Application delete nahi ho saki. Dobara try karein.");
    }
  };

  const genderColor =
    app.gender === "Male"
      ? { bg: "oklch(0.92 0.04 240)", text: "oklch(0.35 0.12 240)" }
      : app.gender === "Female"
        ? { bg: "oklch(0.92 0.06 330)", text: "oklch(0.35 0.12 330)" }
        : { bg: "oklch(0.92 0.02 100)", text: "oklch(0.4 0.06 100)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-xl p-5 space-y-3"
      data-ocid={`admin.application.card.${index + 1}` as string}
      style={{
        backgroundColor: "oklch(0.99 0 0)",
        border: "1px solid oklch(0.9 0.02 240)",
        boxShadow: "0 2px 12px oklch(0.55 0.18 255 / 0.05)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-display font-bold text-base"
              style={{ color: "oklch(0.18 0.06 255)" }}
            >
              {app.name}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{
                backgroundColor: genderColor.bg,
                color: genderColor.text,
              }}
            >
              {app.gender}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: "oklch(0.95 0.03 80)",
                color: "oklch(0.45 0.12 80)",
              }}
            >
              Age: {app.age}
            </span>
          </div>
          {app.applyingFor && (
            <p
              className="text-xs font-semibold mt-0.5"
              style={{ color: "oklch(0.55 0.18 255)" }}
            >
              → {app.applyingFor}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {app.resumeBase64 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadResume(app)}
              data-ocid={
                `admin.application.download.button.${index + 1}` as string
              }
              className="h-8 gap-1 text-xs"
              style={{
                borderColor: "oklch(0.78 0.16 150)",
                color: "oklch(0.45 0.14 150)",
              }}
            >
              <Download className="w-3 h-3" />
              Resume
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                data-ocid={
                  `admin.application.delete_button.${index + 1}` as string
                }
                className="h-8 w-8 p-0"
                style={{
                  borderColor: "oklch(0.8 0.1 27)",
                  color: "oklch(0.55 0.22 27)",
                }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-ocid="admin.application.dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Application Delete Karein?</AlertDialogTitle>
                <AlertDialogDescription>
                  <strong>{app.name}</strong> ki application permanently delete
                  ho jaayegi. Yeh action undo nahi ho sakta.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="admin.application.cancel_button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  data-ocid="admin.application.confirm_button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  style={{ backgroundColor: "oklch(0.55 0.22 27)" }}
                >
                  {deleteMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                  ) : null}
                  Delete Karein
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <a
          href={`mailto:${app.email}`}
          className="flex items-center gap-1 hover:underline"
          style={{ color: "oklch(0.45 0.1 255)" }}
        >
          <Mail className="w-3 h-3" />
          {app.email}
        </a>
        <a
          href={`tel:${app.phone}`}
          className="flex items-center gap-1 hover:underline"
          style={{ color: "oklch(0.45 0.14 150)" }}
        >
          <Phone className="w-3 h-3" />
          {app.phone}
        </a>
      </div>

      {/* Education + Experience */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <span
          className="flex items-center gap-1"
          style={{ color: "oklch(0.4 0.05 240)" }}
        >
          <GraduationCap className="w-3 h-3" />
          {app.qualification}
          {app.subject ? ` — ${app.subject}` : ""}
          {app.college ? ` | ${app.college}` : ""}
        </span>
        <span
          className="flex items-center gap-1"
          style={{ color: "oklch(0.4 0.05 240)" }}
        >
          <Briefcase className="w-3 h-3" />
          {app.experience}
        </span>
      </div>

      {/* Location */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <span
          className="flex items-center gap-1"
          style={{ color: "oklch(0.4 0.05 240)" }}
        >
          <MapPin className="w-3 h-3" />
          {app.district}, {app.state}
          {app.preferredLocation
            ? ` → Preferred: ${app.preferredLocation}`
            : ""}
        </span>
      </div>

      {/* Submitted at */}
      <div
        className="flex items-center gap-1 text-xs"
        style={{ color: "oklch(0.6 0.02 240)" }}
      >
        <Calendar className="w-3 h-3" />
        Submitted: {formatDate(app.submittedAt)}
      </div>
    </motion.div>
  );
}

// Applications Tab
function ApplicationsTab() {
  const { data: applications, isLoading } = useGetAllApplications();

  if (isLoading) {
    return (
      <div data-ocid="admin.applications.loading_state" className="space-y-4">
        {["sk1", "sk2", "sk3"].map((key) => (
          <div
            key={key}
            className="rounded-xl p-5 space-y-3"
            style={{
              backgroundColor: "oklch(0.99 0 0)",
              border: "1px solid oklch(0.9 0.02 240)",
            }}
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-3 w-40" />
          </div>
        ))}
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div
        data-ocid="admin.applications.empty_state"
        className="text-center py-16"
      >
        <Users
          className="w-12 h-12 mx-auto mb-3"
          style={{ color: "oklch(0.78 0.06 240)" }}
        />
        <h3
          className="font-display font-bold text-base mb-1"
          style={{ color: "oklch(0.35 0.06 255)" }}
        >
          Koi Application Nahi Mili
        </h3>
        <p className="text-sm" style={{ color: "oklch(0.55 0.02 240)" }}>
          Abhi tak koi candidate ne apply nahi kiya.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-ocid="admin.applications.list">
      {applications.map((app, idx) => (
        <ApplicationCard key={app.id.toString()} app={app} index={idx} />
      ))}
    </div>
  );
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { data: applications } = useGetAllApplications();
  const applicationCount = applications?.length ?? 0;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
    >
      {/* Admin header bar */}
      <div
        className="py-4 px-4 border-b"
        style={{
          backgroundColor: "oklch(0.15 0.05 255)",
          borderColor: "oklch(0.25 0.05 255)",
        }}
      >
        <div className="container mx-auto flex items-center gap-4">
          <Button
            data-ocid="admin.back.button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="gap-2"
            style={{ color: "oklch(0.88 0.12 80)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Button>
          <div className="flex items-center gap-2">
            <Shield
              className="w-5 h-5"
              style={{ color: "oklch(0.78 0.16 75)" }}
            />
            <span
              className="font-display font-bold text-sm"
              style={{ color: "oklch(0.88 0.12 80)" }}
            >
              Admin Panel — Nira Rebel HR Agency
            </span>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-4"
      >
        <div
          className="rounded-lg p-4 mb-2 flex items-start gap-3"
          style={{
            backgroundColor: "oklch(0.78 0.16 75 / 0.1)",
            border: "1px solid oklch(0.78 0.16 75 / 0.3)",
          }}
        >
          <Shield
            className="w-5 h-5 mt-0.5 flex-shrink-0"
            style={{ color: "oklch(0.78 0.16 75)" }}
          />
          <div>
            <p
              className="font-semibold text-sm mb-1"
              style={{ color: "oklch(0.55 0.16 65)" }}
            >
              Administrator Access
            </p>
            <p className="text-xs" style={{ color: "oklch(0.5 0.02 240)" }}>
              Jobs manage karein, candidates ki applications dekhein, resumes
              download karein.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="container mx-auto px-4 pb-12">
        <Tabs defaultValue="jobs">
          <TabsList
            className="mb-6 w-full sm:w-auto"
            style={{
              backgroundColor: "oklch(0.92 0.01 240)",
              border: "1px solid oklch(0.87 0.02 240)",
            }}
            data-ocid="admin.tabs"
          >
            <TabsTrigger
              value="jobs"
              data-ocid="admin.jobs.tab"
              className="gap-2 data-[state=active]:shadow-sm"
            >
              <Briefcase className="w-4 h-4" />
              Job Listings
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              data-ocid="admin.applications.tab"
              className="gap-2 data-[state=active]:shadow-sm"
            >
              <User className="w-4 h-4" />
              Applications
              {applicationCount > 0 && (
                <Badge
                  className="ml-1 text-xs px-1.5 py-0 h-5"
                  style={{
                    backgroundColor: "oklch(0.55 0.22 27)",
                    color: "white",
                  }}
                >
                  {applicationCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" data-ocid="admin.jobs.panel">
            <JobsSection isAdmin={true} />
          </TabsContent>

          <TabsContent
            value="applications"
            data-ocid="admin.applications.panel"
            className="mt-0"
          >
            <div className="py-2">
              <h2
                className="font-display font-bold text-xl mb-4"
                style={{ color: "oklch(0.18 0.06 255)" }}
              >
                Candidate Applications
                {applicationCount > 0 && (
                  <span
                    className="ml-2 text-sm font-normal"
                    style={{ color: "oklch(0.55 0.1 255)" }}
                  >
                    ({applicationCount} total)
                  </span>
                )}
              </h2>
              <ApplicationsTab />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
