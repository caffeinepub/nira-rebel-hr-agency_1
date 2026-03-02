import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  Edit,
  IndianRupee,
  MapPin,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import type { Job } from "../backend.d";

interface JobCardProps {
  job: Job;
  index: number;
  isAdmin: boolean;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}

export default function JobCard({
  job,
  index,
  isAdmin,
  onEdit,
  onDelete,
}: JobCardProps) {
  const whatsappUrl = `https://wa.me/919891331853?text=Hi, I am interested in the ${encodeURIComponent(job.position)} position at ${encodeURIComponent(job.company)}. Please share more details.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      data-ocid={`jobs.item.${index + 1}`}
      className="bg-card rounded-lg border shadow-card card-hover flex flex-col"
      style={{ borderColor: "oklch(0.88 0.01 240)" }}
    >
      <div className="p-5 flex-1">
        {/* Position & Department badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className="font-display font-bold text-base leading-snug flex-1"
            style={{ color: "oklch(0.18 0.06 255)" }}
          >
            {job.position}
          </h3>
          <Badge
            className="text-xs font-semibold whitespace-nowrap flex-shrink-0"
            style={{
              backgroundColor: "oklch(0.78 0.16 75 / 0.15)",
              color: "oklch(0.55 0.16 65)",
              border: "1px solid oklch(0.78 0.16 75 / 0.3)",
            }}
          >
            {job.department}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-1.5 text-sm">
          <div
            className="flex items-center gap-2"
            style={{ color: "oklch(0.45 0.04 240)" }}
          >
            <Building2
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: "oklch(0.78 0.16 75)" }}
            />
            <span className="font-medium">{job.company}</span>
          </div>
          {job.location && (
            <div
              className="flex items-center gap-2"
              style={{ color: "oklch(0.45 0.04 240)" }}
            >
              <MapPin
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
              <span>{job.location}</span>
            </div>
          )}
          {job.address && (
            <div
              className="flex items-center gap-2"
              style={{ color: "oklch(0.45 0.04 240)" }}
            >
              <Briefcase
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
              <span className="truncate">{job.address}</span>
            </div>
          )}
          <div
            className="flex items-center gap-2"
            style={{ color: "oklch(0.35 0.05 145)" }}
          >
            <IndianRupee
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: "oklch(0.55 0.14 145)" }}
            />
            <span className="font-semibold">
              {job.salary === BigInt(0)
                ? "Negotiable"
                : `₹${job.salary.toString()}/month`}
            </span>
          </div>
        </div>

        {job.description && (
          <p
            className="mt-3 text-sm leading-relaxed line-clamp-2"
            style={{ color: "oklch(0.5 0.02 240)" }}
          >
            {job.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`jobs.apply.button.${index + 1}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-semibold transition-all hover:opacity-90 hover:shadow-md"
          style={{ backgroundColor: "#25D366", color: "#fff" }}
        >
          <MessageCircle className="w-4 h-4" />
          Apply Now
        </a>

        {isAdmin && (
          <>
            <Button
              data-ocid={`jobs.edit.button.${index + 1}`}
              size="sm"
              variant="outline"
              onClick={() => onEdit(job)}
              className="px-3"
              style={{
                borderColor: "oklch(0.78 0.16 75 / 0.5)",
                color: "oklch(0.55 0.16 65)",
              }}
            >
              <Edit className="w-3.5 h-3.5" />
            </Button>
            <Button
              data-ocid={`jobs.delete.button.${index + 1}`}
              size="sm"
              variant="outline"
              onClick={() => onDelete(job)}
              className="px-3"
              style={{
                borderColor: "oklch(0.577 0.245 27.325 / 0.5)",
                color: "oklch(0.577 0.245 27.325)",
              }}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}
