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
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileText,
  Loader2,
  MapPin,
  Send,
  Upload,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { CandidateApplication } from "../backend.d";
import { useSubmitApplication } from "../hooks/useQueries";

// WhatsApp numbers to notify on resume submission
const NOTIFY_NUMBERS = ["919031863042", "917302361451"];

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const QUALIFICATIONS = [
  "10th Pass",
  "12th Pass",
  "Graduate",
  "Post Graduate",
  "Diploma",
  "ITI",
  "Other",
];

const SUBJECTS = [
  "B.Com",
  "B.Sc",
  "B.A",
  "BCA",
  "BBA",
  "B.Tech",
  "MBA",
  "MCA",
  "M.Com",
  "M.Sc",
  "Diploma",
  "ITI",
  "12th (PCM)",
  "12th (Commerce)",
  "12th (Arts)",
  "Other",
];

const EXPERIENCE_OPTIONS = [
  "Fresher (0 Experience)",
  "Less than 6 months",
  "6 months - 1 year",
  "1-2 years",
  "2-3 years",
  "3-5 years",
  "5+ years",
];

interface FormData {
  name: string;
  age: string;
  phone: string;
  email: string;
  gender: string;
  qualification: string;
  college: string;
  subject: string;
  experience: string;
  district: string;
  state: string;
  preferredLocation: string;
  applyingFor: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialForm: FormData = {
  name: "",
  age: "",
  phone: "",
  email: "",
  gender: "",
  qualification: "",
  college: "",
  subject: "",
  experience: "",
  district: "",
  state: "",
  preferredLocation: "",
  applyingFor: "",
};

interface ApplyFormSectionProps {
  prefilledJob?: string;
  onJobUsed?: () => void;
}

export default function ApplyFormSection({
  prefilledJob,
  onJobUsed,
}: ApplyFormSectionProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeBase64, setResumeBase64] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitMutation = useSubmitApplication();

  // Pre-fill job when user clicks "Apply Now" on a job card
  useEffect(() => {
    if (prefilledJob) {
      setForm((prev) => ({ ...prev, applyingFor: prefilledJob }));
      if (onJobUsed) onJobUsed();
    }
  }, [prefilledJob, onJobUsed]);

  const updateField = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeError("");

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setResumeError("Sirf PDF, DOC, ya DOCX file allowed hai.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResumeError("File size 5MB se zyada nahi honi chahiye.");
      return;
    }

    setResumeFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip data URL prefix
      const base64 = result.split(",")[1] ?? result;
      setResumeBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Naam zaroori hai.";
    if (!form.age) {
      newErrors.age = "Umar zaroori hai.";
    } else {
      const ageNum = Number.parseInt(form.age);
      if (ageNum < 18 || ageNum > 60)
        newErrors.age = "Umar 18-60 ke beech honi chahiye.";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number zaroori hai.";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = "10 digit ka valid phone number dalein.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email zaroori hai.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Valid email address dalein.";
    }
    if (!form.gender) newErrors.gender = "Gender select karein.";
    if (!form.qualification)
      newErrors.qualification = "Qualification select karein.";
    if (!form.experience) newErrors.experience = "Experience select karein.";
    if (!form.district.trim()) newErrors.district = "District zaroori hai.";
    if (!form.state) newErrors.state = "State select karein.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Kripya sab zaroori fields bharein.");
      return;
    }

    const app: CandidateApplication = {
      id: BigInt(0),
      name: form.name.trim(),
      age: form.age,
      phone: form.phone.trim(),
      email: form.email.trim(),
      gender: form.gender,
      qualification: form.qualification,
      college: form.college.trim(),
      subject: form.subject,
      experience: form.experience,
      district: form.district.trim(),
      state: form.state,
      preferredLocation: form.preferredLocation.trim(),
      applyingFor: form.applyingFor.trim(),
      resumeBase64: resumeBase64,
      resumeFileName: resumeFile?.name ?? "",
      submittedAt: new Date().toISOString(),
    };

    try {
      await submitMutation.mutateAsync(app);

      // Send WhatsApp notification to both numbers
      const waMessage = [
        "*New Job Application Received!*",
        "",
        `*Name:* ${app.name}`,
        `*Phone:* ${app.phone}`,
        `*Email:* ${app.email}`,
        `*Age:* ${app.age} | *Gender:* ${app.gender}`,
        `*Applying For:* ${app.applyingFor || "Not specified"}`,
        `*Qualification:* ${app.qualification}${app.subject ? ` (${app.subject})` : ""}`,
        `*College:* ${app.college || "Not mentioned"}`,
        `*Experience:* ${app.experience}`,
        `*Location:* ${app.district}, ${app.state}`,
        `*Preferred Job Location:* ${app.preferredLocation || "Any"}`,
        `*Resume:* ${app.resumeFileName ? `${app.resumeFileName} (attached in admin panel)` : "Not uploaded"}`,
        "",
        "Check admin panel for full details & resume download.",
      ].join("\n");

      const encodedMsg = encodeURIComponent(waMessage);

      // Open WhatsApp for first number, then auto-open second after a delay
      // We use window.open for both (user may need to allow popups)
      for (const number of NOTIFY_NUMBERS) {
        window.open(`https://wa.me/${number}?text=${encodedMsg}`, "_blank");
      }

      setSubmitted(true);
      setForm(initialForm);
      setResumeFile(null);
      setResumeBase64("");
    } catch {
      toast.error(
        "Application submit karne mein error aayi. Please dobara try karein.",
      );
    }
  };

  const fieldStyle = {
    borderColor: "oklch(0.85 0.02 240)",
    backgroundColor: "oklch(0.99 0 0)",
    color: "oklch(0.18 0.06 255)",
  };

  const errorStyle = { color: "oklch(0.55 0.22 27)" };

  const sectionCard = "rounded-2xl p-6 mb-6 space-y-4";
  const sectionCardStyle = {
    backgroundColor: "oklch(0.98 0.005 230)",
    border: "1px solid oklch(0.9 0.02 240)",
    boxShadow: "0 2px 12px oklch(0.55 0.18 255 / 0.05)",
  };

  const sectionHeadingStyle = {
    color: "oklch(0.25 0.08 255)",
  };

  const sectionIconStyle = {
    color: "oklch(0.55 0.18 255)",
  };

  const labelStyle = {
    color: "oklch(0.3 0.06 255)",
    fontWeight: 600,
    fontSize: "0.8rem",
  };

  const requiredMark = <span style={{ color: "oklch(0.55 0.22 27)" }}>*</span>;

  if (submitted) {
    return (
      <section
        id="apply"
        data-ocid="apply.section"
        className="py-16 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.96 0.01 75) 0%, oklch(0.99 0 0) 60%, oklch(0.97 0.01 255) 100%)",
        }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl p-10 text-center"
            data-ocid="apply.success_state"
            style={{
              backgroundColor: "oklch(0.97 0.02 150)",
              border: "2px solid oklch(0.65 0.18 150)",
              boxShadow: "0 8px 40px oklch(0.65 0.18 150 / 0.15)",
            }}
          >
            <CheckCircle2
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "oklch(0.55 0.18 150)" }}
            />
            <h2
              className="font-display font-bold text-2xl md:text-3xl mb-3"
              style={{ color: "oklch(0.2 0.1 150)" }}
            >
              Application Submit Ho Gayi!
            </h2>
            <p
              className="text-sm md:text-base mb-8"
              style={{ color: "oklch(0.35 0.08 150)" }}
            >
              Aapki application humein mil gayi. Hum aapko jald contact karenge.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/917302361451"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="apply.success.whatsapp.button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  boxShadow: "0 4px 16px #25D36655",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Par Contact Karein
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                data-ocid="apply.submit_again.button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105"
                style={{
                  backgroundColor: "oklch(0.99 0 0)",
                  color: "oklch(0.25 0.08 255)",
                  border: "1.5px solid oklch(0.75 0.1 240)",
                }}
              >
                Ek Aur Application Bhejein
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="apply"
      data-ocid="apply.section"
      className="py-16 md:py-20"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.01 75) 0%, oklch(0.99 0 0) 60%, oklch(0.97 0.01 255) 100%)",
      }}
    >
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.78 0.16 75))",
              }}
            />
            <Send
              className="w-5 h-5"
              style={{ color: "oklch(0.78 0.16 75)" }}
            />
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.78 0.16 75), transparent)",
              }}
            />
          </div>
          <h2
            className="font-display font-bold text-2xl md:text-4xl mb-3"
            style={{ color: "oklch(0.18 0.06 255)" }}
          >
            Job Ke Liye Apply Karein
          </h2>
          <p
            className="text-sm md:text-base max-w-lg mx-auto"
            style={{ color: "oklch(0.5 0.02 240)" }}
          >
            Apni poori details bharein — hum aapko contact karenge.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          noValidate
        >
          {/* ── Personal Information ── */}
          <div className={sectionCard} style={sectionCardStyle}>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5" style={sectionIconStyle} />
              <h3
                className="font-display font-bold text-base"
                style={sectionHeadingStyle}
              >
                Personal Information
              </h3>
            </div>

            {/* Name */}
            <div>
              <Label style={labelStyle}>Pura Naam {requiredMark}</Label>
              <Input
                data-ocid="apply.name.input"
                type="text"
                placeholder="Apna pura naam likhein"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                style={fieldStyle}
                className="mt-1"
              />
              {errors.name && (
                <p
                  className="text-xs mt-1"
                  style={errorStyle}
                  data-ocid="apply.name_error"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <Label style={labelStyle}>Umar (Age) {requiredMark}</Label>
                <Input
                  data-ocid="apply.age.input"
                  type="number"
                  placeholder="Jaise: 24"
                  min={18}
                  max={60}
                  value={form.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  style={fieldStyle}
                  className="mt-1"
                />
                {errors.age && (
                  <p
                    className="text-xs mt-1"
                    style={errorStyle}
                    data-ocid="apply.age_error"
                  >
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label style={labelStyle}>Phone Number {requiredMark}</Label>
                <Input
                  data-ocid="apply.phone.input"
                  type="tel"
                  placeholder="10 digit number"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  style={fieldStyle}
                  className="mt-1"
                  maxLength={10}
                />
                {errors.phone && (
                  <p
                    className="text-xs mt-1"
                    style={errorStyle}
                    data-ocid="apply.phone_error"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label style={labelStyle}>Email Address {requiredMark}</Label>
              <Input
                data-ocid="apply.email.input"
                type="email"
                placeholder="aapka@email.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                style={fieldStyle}
                className="mt-1"
              />
              {errors.email && (
                <p
                  className="text-xs mt-1"
                  style={errorStyle}
                  data-ocid="apply.email_error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <Label style={labelStyle}>Gender {requiredMark}</Label>
              <div className="flex gap-3 mt-2" data-ocid="apply.gender.radio">
                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl transition-all text-sm font-semibold"
                    style={
                      form.gender === g
                        ? {
                            backgroundColor: "oklch(0.55 0.18 255)",
                            color: "oklch(0.99 0 0)",
                            border: "2px solid oklch(0.55 0.18 255)",
                          }
                        : {
                            backgroundColor: "oklch(0.99 0 0)",
                            color: "oklch(0.35 0.06 255)",
                            border: "2px solid oklch(0.85 0.04 240)",
                          }
                    }
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={() => updateField("gender", g)}
                      className="sr-only"
                    />
                    {g === "Male"
                      ? "👨 Male"
                      : g === "Female"
                        ? "👩 Female"
                        : "🧑 Other"}
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p
                  className="text-xs mt-1"
                  style={errorStyle}
                  data-ocid="apply.gender_error"
                >
                  {errors.gender}
                </p>
              )}
            </div>
          </div>

          {/* ── Education ── */}
          <div className={sectionCard} style={sectionCardStyle}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5" style={sectionIconStyle} />
              <h3
                className="font-display font-bold text-base"
                style={sectionHeadingStyle}
              >
                Education / Shiksha
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Qualification */}
              <div>
                <Label style={labelStyle}>Qualification {requiredMark}</Label>
                <Select
                  value={form.qualification}
                  onValueChange={(v) => updateField("qualification", v)}
                >
                  <SelectTrigger
                    data-ocid="apply.qualification.select"
                    className="mt-1"
                    style={fieldStyle}
                  >
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUALIFICATIONS.map((q) => (
                      <SelectItem key={q} value={q}>
                        {q}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.qualification && (
                  <p
                    className="text-xs mt-1"
                    style={errorStyle}
                    data-ocid="apply.qualification_error"
                  >
                    {errors.qualification}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <Label style={labelStyle}>Subject / Course</Label>
                <Select
                  value={form.subject}
                  onValueChange={(v) => updateField("subject", v)}
                >
                  <SelectTrigger
                    data-ocid="apply.subject.select"
                    className="mt-1"
                    style={fieldStyle}
                  >
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* College */}
            <div>
              <Label style={labelStyle}>College / School ka Naam</Label>
              <Input
                data-ocid="apply.college.input"
                type="text"
                placeholder="Jaise: Delhi University, DAV College"
                value={form.college}
                onChange={(e) => updateField("college", e.target.value)}
                style={fieldStyle}
                className="mt-1"
              />
            </div>
          </div>

          {/* ── Experience ── */}
          <div className={sectionCard} style={sectionCardStyle}>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5" style={sectionIconStyle} />
              <h3
                className="font-display font-bold text-base"
                style={sectionHeadingStyle}
              >
                Kaam ka Anubhav (Experience)
              </h3>
            </div>

            <div>
              <Label style={labelStyle}>Experience {requiredMark}</Label>
              <Select
                value={form.experience}
                onValueChange={(v) => updateField("experience", v)}
              >
                <SelectTrigger
                  data-ocid="apply.experience.select"
                  className="mt-1"
                  style={fieldStyle}
                >
                  <SelectValue placeholder="Experience select karein" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.experience && (
                <p
                  className="text-xs mt-1"
                  style={errorStyle}
                  data-ocid="apply.experience_error"
                >
                  {errors.experience}
                </p>
              )}
            </div>
          </div>

          {/* ── Location ── */}
          <div className={sectionCard} style={sectionCardStyle}>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5" style={sectionIconStyle} />
              <h3
                className="font-display font-bold text-base"
                style={sectionHeadingStyle}
              >
                Location / Pata
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* District */}
              <div>
                <Label style={labelStyle}>District / Zila {requiredMark}</Label>
                <Input
                  data-ocid="apply.district.input"
                  type="text"
                  placeholder="Jaise: South Delhi, Gurugram"
                  value={form.district}
                  onChange={(e) => updateField("district", e.target.value)}
                  style={fieldStyle}
                  className="mt-1"
                />
                {errors.district && (
                  <p
                    className="text-xs mt-1"
                    style={errorStyle}
                    data-ocid="apply.district_error"
                  >
                    {errors.district}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <Label style={labelStyle}>State / Pradesh {requiredMark}</Label>
                <Select
                  value={form.state}
                  onValueChange={(v) => updateField("state", v)}
                >
                  <SelectTrigger
                    data-ocid="apply.state.select"
                    className="mt-1"
                    style={fieldStyle}
                  >
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
                {errors.state && (
                  <p
                    className="text-xs mt-1"
                    style={errorStyle}
                    data-ocid="apply.state_error"
                  >
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            {/* Preferred Location */}
            <div>
              <Label style={labelStyle}>Preferred Job Location</Label>
              <Input
                data-ocid="apply.preferred_location.input"
                type="text"
                placeholder="Jaise: Delhi, Gurugram, Noida"
                value={form.preferredLocation}
                onChange={(e) =>
                  updateField("preferredLocation", e.target.value)
                }
                style={fieldStyle}
                className="mt-1"
              />
            </div>
          </div>

          {/* ── Job Preference ── */}
          <div className={sectionCard} style={sectionCardStyle}>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5" style={sectionIconStyle} />
              <h3
                className="font-display font-bold text-base"
                style={sectionHeadingStyle}
              >
                Job Preference &amp; Resume
              </h3>
            </div>

            {/* Applying For */}
            <div>
              <Label style={labelStyle}>
                Kaunsi Position ke Liye Apply Kar Rahe Hain?
              </Label>
              <Input
                data-ocid="apply.applying_for.input"
                type="text"
                placeholder="Jaise: ATM Operator, Floor Coordinator, Credit Card Sales"
                value={form.applyingFor}
                onChange={(e) => updateField("applyingFor", e.target.value)}
                style={fieldStyle}
                className="mt-1"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <Label style={labelStyle}>
                Resume Upload karein (PDF/DOC/DOCX, max 5MB)
              </Label>
              <button
                type="button"
                className="mt-1 w-full rounded-xl border-2 border-dashed p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                style={{
                  borderColor: resumeFile
                    ? "oklch(0.55 0.18 150)"
                    : "oklch(0.8 0.04 240)",
                  backgroundColor: resumeFile
                    ? "oklch(0.97 0.02 150)"
                    : "oklch(0.99 0 0)",
                }}
                onClick={() => fileInputRef.current?.click()}
                data-ocid="apply.resume.dropzone"
                aria-label="Resume file upload area"
              >
                {resumeFile ? (
                  <>
                    <CheckCircle2
                      className="w-6 h-6"
                      style={{ color: "oklch(0.55 0.18 150)" }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "oklch(0.3 0.1 150)" }}
                    >
                      {resumeFile.name}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.5 0.06 150)" }}
                    >
                      {(resumeFile.size / 1024).toFixed(0)} KB — Change karne ke
                      liye click karein
                    </span>
                  </>
                ) : (
                  <>
                    <Upload
                      className="w-6 h-6"
                      style={{ color: "oklch(0.6 0.06 240)" }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.45 0.06 240)" }}
                    >
                      Click karein ya file drag karein
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.6 0.03 240)" }}
                    >
                      PDF, DOC, DOCX — Maximum 5MB
                    </span>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="sr-only"
                data-ocid="apply.resume.upload_button"
                aria-label="Resume file input"
              />
              {resumeError && (
                <p
                  className="text-xs mt-1"
                  style={errorStyle}
                  data-ocid="apply.resume_error"
                >
                  {resumeError}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              data-ocid="apply.form.submit_button"
              disabled={submitMutation.isPending}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-base text-white transition-transform hover:scale-105 shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.18 255), oklch(0.45 0.2 265))",
                boxShadow: "0 4px 20px oklch(0.55 0.18 255 / 0.35)",
                height: "auto",
              }}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submit ho raha hai...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Application Submit Karein
                </>
              )}
            </Button>

            <p
              className="text-xs mt-4"
              style={{ color: "oklch(0.6 0.03 240)" }}
            >
              Free job placement | Koi charge nahi | Male &amp; Female dono
              apply kar sakte hain
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
