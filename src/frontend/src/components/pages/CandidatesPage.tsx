import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  Building2,
  IndianRupee,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Job } from "../../backend.d";
import { useGetAllJobs, useGetDepartments } from "../../hooks/useQueries";
import Footer from "../Footer";

function JobCard({ job, index }: { job: Job; index: number }) {
  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the "${job.position}" position at ${job.company} (${job.department}). Please share more details.`,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      data-ocid={`candidates.item.${index + 1}`}
      className="rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-all group"
      style={{ borderColor: "oklch(0.88 0.01 240)" }}
    >
      {/* Top bar */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.18 0.06 255), oklch(0.78 0.16 75))",
        }}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold text-base leading-snug truncate"
              style={{ color: "oklch(0.18 0.06 255)" }}
            >
              {job.position}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Building2
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: "oklch(0.55 0.12 70)" }}
              />
              <span
                className="text-xs font-medium truncate"
                style={{ color: "oklch(0.4 0.04 240)" }}
              >
                {job.company}
              </span>
            </div>
          </div>
          <Badge
            className="flex-shrink-0 text-xs font-semibold rounded-full px-2 py-0.5"
            style={{
              backgroundColor: "oklch(0.78 0.16 75 / 0.1)",
              color: "oklch(0.45 0.14 65)",
              border: "1px solid oklch(0.78 0.16 75 / 0.3)",
            }}
          >
            {job.department}
          </Badge>
        </div>

        <div className="space-y-1.5 mb-4">
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "oklch(0.5 0.02 240)" }}
          >
            <MapPin
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: "oklch(0.78 0.16 75)" }}
            />
            <span className="truncate">{job.location || job.address}</span>
          </div>
          {job.salary > 0n && (
            <div
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: "oklch(0.35 0.1 140)" }}
            >
              <IndianRupee className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{job.salary.toLocaleString("en-IN")} / month</span>
            </div>
          )}
          {job.description && (
            <p
              className="text-xs leading-relaxed line-clamp-2"
              style={{ color: "oklch(0.55 0.02 240)" }}
            >
              {job.description}
            </p>
          )}
        </div>

        <a
          href={`https://wa.me/919891331853?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`candidates.apply.button.${index + 1}`}
        >
          <Button
            className="w-full text-sm font-semibold gap-2 group-hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "#25D366",
              color: "#fff",
            }}
          >
            <MessageCircle className="w-4 h-4" />
            Apply via WhatsApp
          </Button>
        </a>
      </div>
    </motion.div>
  );
}

export default function CandidatesPage() {
  const { data: jobs, isLoading, isError } = useGetAllJobs();
  const { data: departments } = useGetDepartments();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = useMemo(() => ["All", ...(departments ?? [])], [departments]);

  const filteredJobs = useMemo<Job[]>(() => {
    if (!jobs) return [];
    let list: Job[] =
      activeFilter === "All"
        ? jobs
        : jobs.filter((j) => j.department === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.position.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q),
      );
    }
    return list;
  }, [jobs, activeFilter, search]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
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
              <Briefcase className="w-3 h-3" />
              For Job Seekers
            </div>
            <h1
              className="font-display font-bold text-3xl md:text-5xl mb-3"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              Find Your Next Job
            </h1>
            <p
              className="text-base md:text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.78 0.04 240)" }}
            >
              Browse all open positions across our partner companies. Apply
              directly via WhatsApp for fast response.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Search + Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "oklch(0.6 0.02 240)" }}
              />
              <Input
                data-ocid="candidates.search_input"
                placeholder="Search by position, company, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  data-ocid="candidates.filter.tab"
                  onClick={() => setActiveFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={
                    activeFilter === f
                      ? {
                          backgroundColor: "oklch(0.18 0.06 255)",
                          color: "oklch(0.99 0 0)",
                        }
                      : {
                          backgroundColor: "oklch(0.94 0.01 240)",
                          color: "oklch(0.4 0.04 240)",
                          border: "1px solid oklch(0.88 0.01 240)",
                        }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div
              data-ocid="candidates.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => (
                <div
                  key={k}
                  className="bg-white rounded-xl border p-5 space-y-3"
                >
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-9 w-full mt-4" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div
              data-ocid="candidates.error_state"
              className="text-center py-16"
            >
              <p className="text-destructive font-medium">
                Failed to load jobs. Please refresh the page.
              </p>
            </div>
          )}

          {/* Jobs Grid */}
          {!isLoading && !isError && filteredJobs.length > 0 && (
            <>
              <p
                className="text-xs font-semibold mb-5 uppercase tracking-wider"
                style={{ color: "oklch(0.6 0.03 240)" }}
              >
                {filteredJobs.length} position
                {filteredJobs.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job, idx) => (
                  <JobCard key={job.id.toString()} job={job} index={idx} />
                ))}
              </div>
            </>
          )}

          {/* Empty */}
          {!isLoading && !isError && filteredJobs.length === 0 && (
            <div
              data-ocid="candidates.empty_state"
              className="text-center py-20"
            >
              <Briefcase
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ color: "oklch(0.18 0.06 255)" }}
              >
                No Jobs Found
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "oklch(0.5 0.02 240)" }}
              >
                {search
                  ? "Try a different search term."
                  : "No openings in this category yet."}
              </p>
              {search && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearch("")}
                  style={{
                    borderColor: "oklch(0.78 0.16 75)",
                    color: "oklch(0.55 0.16 65)",
                  }}
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-12"
        style={{ backgroundColor: "oklch(0.18 0.06 255)" }}
      >
        <div className="container mx-auto px-4 text-center">
          <h3
            className="font-display font-bold text-xl md:text-2xl mb-3"
            style={{ color: "oklch(0.98 0 0)" }}
          >
            Don't see your ideal role?
          </h3>
          <p className="text-sm mb-6" style={{ color: "oklch(0.72 0.03 240)" }}>
            Contact us directly on WhatsApp — we may have unadvertised openings.
          </p>
          <a
            href="https://wa.me/919891331853?text=Hi, I'm looking for a job. Can you help me?"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="candidates.whatsapp.button"
          >
            <Button
              size="lg"
              className="font-semibold gap-2"
              style={{
                backgroundColor: "oklch(0.78 0.16 75)",
                color: "oklch(0.12 0.04 250)",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Message Us on WhatsApp
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
