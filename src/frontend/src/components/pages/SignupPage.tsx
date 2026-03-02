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
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, LogIn, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useGetDepartments } from "../../hooks/useQueries";
import Footer from "../Footer";

const experienceLevels = [
  "Fresher (0–1 year)",
  "Experienced (1–3 years)",
  "Experienced (3–5 years)",
  "Senior (5+ years)",
];

export default function SignupPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { actor } = useActor();
  const { data: departments } = useGetDepartments();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    jobInterest: "",
    experience: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Please login first to register.");
      return;
    }
    if (!form.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    setIsSubmitting(true);
    try {
      await actor.saveCallerUserProfile({ name: form.name.trim() });
      setSuccess(true);
      toast.success("Registration successful! We will contact you shortly.");
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.06 258) 0%, oklch(0.18 0.06 255) 50%, oklch(0.22 0.07 250) 100%)",
        }}
      >
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                backgroundColor: "oklch(0.78 0.16 75 / 0.15)",
                color: "oklch(0.78 0.16 75)",
                border: "1px solid oklch(0.78 0.16 75 / 0.3)",
              }}
            >
              <UserPlus className="w-3 h-3" />
              Candidate Registration
            </div>
            <h1
              className="font-display font-bold text-3xl md:text-4xl mb-3"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              Register as a Candidate
            </h1>
            <p
              className="text-sm md:text-base max-w-lg mx-auto"
              style={{ color: "oklch(0.78 0.04 240)" }}
            >
              Submit your details and our team will reach out with matching job
              opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            {/* Not logged in — show login CTA */}
            {!identity ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-8 text-center border"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  borderColor: "oklch(0.88 0.01 240)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "oklch(0.78 0.16 75 / 0.1)" }}
                >
                  <LogIn
                    className="w-7 h-7"
                    style={{ color: "oklch(0.78 0.16 75)" }}
                  />
                </div>
                <h2
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "oklch(0.18 0.06 255)" }}
                >
                  Login to Register
                </h2>
                <p
                  className="text-sm mb-6 leading-relaxed"
                  style={{ color: "oklch(0.5 0.02 240)" }}
                >
                  Please login to submit your candidate profile. Your data is
                  securely stored on the Internet Computer.
                </p>
                <Button
                  data-ocid="signup.login.button"
                  onClick={login}
                  disabled={isLoggingIn}
                  size="lg"
                  className="font-semibold gap-2"
                  style={{
                    backgroundColor: "oklch(0.78 0.16 75)",
                    color: "oklch(0.12 0.04 250)",
                  }}
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  {isLoggingIn ? "Logging in..." : "Login to Continue"}
                </Button>
              </motion.div>
            ) : success ? (
              /* Success state */
              <motion.div
                data-ocid="signup.success_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-10 text-center border"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  borderColor: "oklch(0.88 0.01 240)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "oklch(0.55 0.2 140 / 0.1)" }}
                >
                  <CheckCircle2
                    className="w-8 h-8"
                    style={{ color: "oklch(0.55 0.2 140)" }}
                  />
                </div>
                <h2
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "oklch(0.18 0.06 255)" }}
                >
                  Registration Successful!
                </h2>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "oklch(0.5 0.02 240)" }}
                >
                  Thank you, <strong>{form.name}</strong>! Our team will review
                  your profile and reach out with suitable job openings soon.
                </p>
                <a
                  href="https://wa.me/919891331853?text=Hi, I just registered on your website. Please update me on job openings."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="signup.whatsapp.button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm"
                  style={{
                    backgroundColor: "#25D366",
                    color: "#fff",
                  }}
                >
                  Follow up on WhatsApp
                </a>
              </motion.div>
            ) : (
              /* Registration Form */
              <motion.form
                data-ocid="signup.modal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 md:p-8 border space-y-5"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  borderColor: "oklch(0.88 0.01 240)",
                }}
              >
                <div>
                  <h2
                    className="font-display font-bold text-lg mb-1"
                    style={{ color: "oklch(0.18 0.06 255)" }}
                  >
                    Your Details
                  </h2>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.6 0.02 240)" }}
                  >
                    Logged in as:{" "}
                    <span
                      className="font-mono"
                      style={{ color: "oklch(0.55 0.16 65)" }}
                    >
                      {identity.getPrincipal().toString().slice(0, 20)}...
                    </span>
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.3 0.03 240)" }}
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    data-ocid="signup.name.input"
                    placeholder="e.g. Ravi Kumar"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.3 0.03 240)" }}
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    data-ocid="signup.phone.input"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.3 0.03 240)" }}
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    data-ocid="signup.email.input"
                    type="email"
                    placeholder="e.g. ravi@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="city"
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.3 0.03 240)" }}
                  >
                    City / Location
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    data-ocid="signup.city.input"
                    placeholder="e.g. Delhi, Gurugram, Patna"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>

                {/* Job Interest */}
                <div className="space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.3 0.03 240)" }}
                  >
                    Job Interest / Department
                  </Label>
                  <Select
                    value={form.jobInterest}
                    onValueChange={(v) =>
                      setForm((prev) => ({ ...prev, jobInterest: v }))
                    }
                  >
                    <SelectTrigger data-ocid="signup.job_interest.select">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {(
                        departments ?? [
                          "SBI Bank",
                          "PNB Bank",
                          "Axis Bank",
                          "Hitachi Cash Management",
                          "E-Commerce / Logistics",
                          "Metro Department",
                        ]
                      ).map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience */}
                <div className="space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.3 0.03 240)" }}
                  >
                    Experience Level
                  </Label>
                  <Select
                    value={form.experience}
                    onValueChange={(v) =>
                      setForm((prev) => ({ ...prev, experience: v }))
                    }
                  >
                    <SelectTrigger data-ocid="signup.experience.select">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>
                          {lvl}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="message"
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.3 0.03 240)" }}
                  >
                    Additional Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    data-ocid="signup.message.textarea"
                    placeholder="Tell us about yourself, skills, or any specific role you're looking for..."
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  data-ocid="signup.submit_button"
                  disabled={isSubmitting}
                  className="w-full font-semibold gap-2"
                  size="lg"
                  style={{
                    backgroundColor: "oklch(0.18 0.06 255)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
