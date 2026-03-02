import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";
import JobsSection from "./JobsSection";

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
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
              Admin Panel — Manage Job Listings
            </span>
          </div>
        </div>
      </div>

      {/* Admin description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6"
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
              You can add new jobs, edit existing listings, and delete job
              postings. Use the "Add New Job" button or the edit/delete icons on
              each card.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Reuse JobsSection with admin=true */}
      <JobsSection isAdmin={true} />
    </div>
  );
}
