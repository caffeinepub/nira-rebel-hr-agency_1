import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  CheckCircle2,
  Loader2,
  Upload,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { CandidateApplication } from "../backend.d";
import { useSubmitApplication } from "../hooks/useQueries";

const NOTIFY_NUMBERS = ["919031863042"];

const QUALIFICATIONS = [
  "10th Pass",
  "12th Pass",
  "Diploma",
  "B.A.",
  "B.Com",
  "B.Sc",
  "B.Tech / B.E.",
  "BBA",
  "BCA",
  "M.A.",
  "M.Com",
  "M.Sc",
  "M.Tech",
  "MBA",
  "MCA",
  "Other",
];

const EXPERIENCE_OPTIONS = [
  "Fresher (0 years)",
  "0-6 months",
  "6 months - 1 year",
  "1-2 years",
  "2-3 years",
  "3-5 years",
  "5+ years",
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
];

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
}

const EMPTY_FORM = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  qualification: "",
  college: "",
  subject: "",
  experience: "",
  district: "",
  state: "",
  preferredLocation: "",
  applyingFor: "",
};

function buildWhatsAppMessage(
  appData: typeof EMPTY_FORM,
  resumeName: string,
): string {
  const lines = [
    "NEW APPLICATION RECEIVED",
    "",
    `Name: ${appData.name}`,
    `Phone: ${appData.phone}`,
    `Email: ${appData.email}`,
    `Age: ${appData.age} | Gender: ${appData.gender}`,
    `Qualification: ${appData.qualification}${appData.subject ? ` (${appData.subject})` : ""}`,
    `College: ${appData.college}`,
    `Experience: ${appData.experience}`,
    `Location: ${appData.district}, ${appData.state}`,
    `Applying For: ${appData.applyingFor}`,
    `Resume: ${resumeName}`,
    "",
    "Nira Rebel HR Agency - Admin Panel mein full details dekhein.",
  ];
  return encodeURIComponent(lines.join("\n"));
}

export default function ApplyNowModal({
  isOpen,
  onClose,
  jobTitle = "",
}: ApplyNowModalProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM, applyingFor: jobTitle });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeBase64, setResumeBase64] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submitMutation = useSubmitApplication();

  // Sync jobTitle when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({ ...f, applyingFor: jobTitle }));
      setSubmitted(false);
    }
  }, [isOpen, jobTitle]);

  // Lock scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume file 5MB se bada nahi hona chahiye.");
      return;
    }
    setResumeFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      const base64 = result.split(",")[1] ?? "";
      setResumeBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const sendWhatsAppNotification = (
    appData: typeof EMPTY_FORM,
    resumeName: string,
  ) => {
    const msg = buildWhatsAppMessage(appData, resumeName);
    for (const num of NOTIFY_NUMBERS) {
      window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.gender ||
      !form.qualification
    ) {
      toast.error("Naam, phone, email, gender aur qualification zaroori hai.");
      return;
    }
    if (!resumeFile) {
      toast.error("Resume upload karna zaroori hai.");
      return;
    }

    const app: CandidateApplication = {
      id: BigInt(0),
      name: form.name.trim(),
      age: form.age.trim(),
      gender: form.gender,
      phone: form.phone.trim(),
      email: form.email.trim(),
      qualification: form.qualification,
      college: form.college.trim(),
      subject: form.subject.trim(),
      experience: form.experience,
      district: form.district.trim(),
      state: form.state,
      preferredLocation: form.preferredLocation.trim(),
      applyingFor: form.applyingFor.trim(),
      resumeBase64: resumeBase64,
      resumeFileName: resumeFile.name,
      submittedAt: new Date().toISOString(),
    };

    try {
      await submitMutation.mutateAsync(app);
      sendWhatsAppNotification(form, resumeFile.name);
      setSubmitted(true);
      setForm({ ...EMPTY_FORM, applyingFor: jobTitle });
      setResumeFile(null);
      setResumeBase64("");
    } catch {
      toast.error("Application submit nahi ho saki. Dobara try karein.");
    }
  };

  if (!isOpen) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: modal backdrop click-outside
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          backgroundColor: "oklch(0.99 0 0)",
          border: "1px solid oklch(0.88 0.04 255)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.18 0.06 255), oklch(0.22 0.08 260))",
            borderColor: "oklch(0.28 0.06 255)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "oklch(0.78 0.16 75 / 0.2)" }}
            >
              <Briefcase
                className="w-4 h-4"
                style={{ color: "oklch(0.88 0.14 80)" }}
              />
            </div>
            <div>
              <p
                className="font-display font-bold text-sm"
                style={{ color: "oklch(0.98 0 0)" }}
              >
                Job Application Form
              </p>
              {jobTitle && (
                <p className="text-xs" style={{ color: "oklch(0.78 0.16 75)" }}>
                  {jobTitle}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "oklch(0.99 0 0 / 0.15)" }}
          >
            <X className="w-4 h-4" style={{ color: "oklch(0.95 0 0)" }} />
          </button>
        </div>

        {/* Success State */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "oklch(0.9 0.1 145)" }}
            >
              <CheckCircle2
                className="w-8 h-8"
                style={{ color: "oklch(0.45 0.18 145)" }}
              />
            </div>
            <h3
              className="font-display font-bold text-xl mb-2"
              style={{ color: "oklch(0.18 0.06 255)" }}
            >
              Application Submit Ho Gayi!
            </h3>
            <p
              className="text-sm mb-1"
              style={{ color: "oklch(0.45 0.04 240)" }}
            >
              Aapki application successfully submit ho gayi hai.
            </p>
            <p
              className="text-xs mb-6"
              style={{ color: "oklch(0.6 0.02 240)" }}
            >
              Hum jald hi aapse WhatsApp par contact karenge.
            </p>
            <Button
              onClick={onClose}
              style={{
                backgroundColor: "oklch(0.18 0.06 255)",
                color: "oklch(0.99 0 0)",
              }}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            {/* Personal Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User
                  className="w-4 h-4"
                  style={{ color: "oklch(0.78 0.16 75)" }}
                />
                <h4
                  className="font-semibold text-sm"
                  style={{ color: "oklch(0.22 0.06 255)" }}
                >
                  Personal Information
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Full Name{" "}
                    <span style={{ color: "oklch(0.55 0.22 27)" }}>*</span>
                  </Label>
                  <Input
                    placeholder="Apna poora naam likhein"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Age (Umar)
                  </Label>
                  <Input
                    placeholder="Jaise: 24"
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    type="number"
                    min="16"
                    max="60"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Gender{" "}
                    <span style={{ color: "oklch(0.55 0.22 27)" }}>*</span>
                  </Label>
                  <Select
                    value={form.gender}
                    onValueChange={(v) => handleChange("gender", v)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Gender chunein" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male (Purush)</SelectItem>
                      <SelectItem value="Female">Female (Mahila)</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Phone Number{" "}
                    <span style={{ color: "oklch(0.55 0.22 27)" }}>*</span>
                  </Label>
                  <Input
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    type="tel"
                    required
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Email Address{" "}
                    <span style={{ color: "oklch(0.55 0.22 27)" }}>*</span>
                  </Label>
                  <Input
                    placeholder="aapka@email.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    type="email"
                    required
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <div
              className="h-px"
              style={{ backgroundColor: "oklch(0.92 0.01 240)" }}
            />

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="oklch(0.78 0.16 75)"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <h4
                  className="font-semibold text-sm"
                  style={{ color: "oklch(0.22 0.06 255)" }}
                >
                  Education &amp; Experience
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Qualification{" "}
                    <span style={{ color: "oklch(0.55 0.22 27)" }}>*</span>
                  </Label>
                  <Select
                    value={form.qualification}
                    onValueChange={(v) => handleChange("qualification", v)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Highest qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      {QUALIFICATIONS.map((q) => (
                        <SelectItem key={q} value={q}>
                          {q}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Subject / Stream
                  </Label>
                  <Input
                    placeholder="Jaise: B.Com, BSc, Arts"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    College / University
                  </Label>
                  <Input
                    placeholder="College ya University ka naam"
                    value={form.college}
                    onChange={(e) => handleChange("college", e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Work Experience
                  </Label>
                  <Select
                    value={form.experience}
                    onValueChange={(v) => handleChange("experience", v)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Experience kitni hai?" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_OPTIONS.map((ex) => (
                        <SelectItem key={ex} value={ex}>
                          {ex}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div
              className="h-px"
              style={{ backgroundColor: "oklch(0.92 0.01 240)" }}
            />

            {/* Location & Job */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase
                  className="w-4 h-4"
                  style={{ color: "oklch(0.78 0.16 75)" }}
                />
                <h4
                  className="font-semibold text-sm"
                  style={{ color: "oklch(0.22 0.06 255)" }}
                >
                  Location &amp; Job Details
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    District
                  </Label>
                  <Input
                    placeholder="Jaise: New Delhi, Gurugram"
                    value={form.district}
                    onChange={(e) => handleChange("district", e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    State (Rajya)
                  </Label>
                  <Select
                    value={form.state}
                    onValueChange={(v) => handleChange("state", v)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="State chunein" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Preferred Job Location
                  </Label>
                  <Input
                    placeholder="Jaise: Delhi, Noida, Gurugram"
                    value={form.preferredLocation}
                    onChange={(e) =>
                      handleChange("preferredLocation", e.target.value)
                    }
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.35 0.04 240)" }}
                  >
                    Applying For (Post)
                  </Label>
                  <Input
                    placeholder="Jis post ke liye apply kar rahe hain"
                    value={form.applyingFor}
                    onChange={(e) =>
                      handleChange("applyingFor", e.target.value)
                    }
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <div
              className="h-px"
              style={{ backgroundColor: "oklch(0.92 0.01 240)" }}
            />

            {/* Resume Upload */}
            <div>
              <Label
                className="text-xs font-medium"
                style={{ color: "oklch(0.35 0.04 240)" }}
              >
                Resume Upload{" "}
                <span style={{ color: "oklch(0.55 0.22 27)" }}>*</span>
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleResumeChange}
              />
              <button
                type="button"
                className="mt-2 w-full rounded-xl border-2 border-dashed p-4 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  borderColor: resumeFile
                    ? "oklch(0.55 0.18 145)"
                    : "oklch(0.78 0.1 255 / 0.5)",
                  backgroundColor: resumeFile
                    ? "oklch(0.96 0.04 145)"
                    : "oklch(0.97 0.01 255)",
                }}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Resume upload karne ke liye click karein"
              >
                {resumeFile ? (
                  <>
                    <CheckCircle2
                      className="w-6 h-6"
                      style={{ color: "oklch(0.45 0.18 145)" }}
                    />
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "oklch(0.35 0.14 145)" }}
                    >
                      {resumeFile.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.55 0.1 145)" }}
                    >
                      Click karein badalne ke liye
                    </p>
                  </>
                ) : (
                  <>
                    <Upload
                      className="w-6 h-6"
                      style={{ color: "oklch(0.55 0.1 255)" }}
                    />
                    <p
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.35 0.06 255)" }}
                    >
                      Resume upload karein
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.6 0.02 240)" }}
                    >
                      PDF, DOC, DOCX &bull; Max 5MB
                    </p>
                  </>
                )}
              </button>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="text-sm"
                disabled={submitMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="text-sm font-semibold gap-2 min-w-32"
                style={{
                  backgroundColor: "oklch(0.18 0.06 255)",
                  color: "oklch(0.99 0 0)",
                }}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>Submit Application</>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
