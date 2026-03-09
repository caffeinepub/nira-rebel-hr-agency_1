import { motion } from "motion/react";

interface ApplyFormSectionProps {
  prefilledJob?: string;
  onJobUsed?: () => void;
}

export default function ApplyFormSection(_props: ApplyFormSectionProps) {
  return (
    <section
      id="apply"
      data-ocid="apply.section"
      className="py-16 md:py-24"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.01 30) 0%, oklch(0.99 0 0) 50%, oklch(0.97 0.01 255) 100%)",
      }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl text-center px-8 py-12 md:px-14 md:py-16"
          style={{
            backgroundColor: "oklch(0.99 0 0)",
            border: "2px solid oklch(0.88 0.06 30)",
            boxShadow:
              "0 8px 48px oklch(0.65 0.18 30 / 0.10), 0 2px 12px oklch(0.65 0.18 30 / 0.06)",
          }}
        >
          {/* Clock icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              type: "spring",
              bounce: 0.4,
            }}
            className="flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.1 30), oklch(0.82 0.14 40))",
              boxShadow: "0 4px 24px oklch(0.65 0.18 30 / 0.25)",
            }}
          >
            <svg
              className="w-9 h-9"
              fill="none"
              stroke="oklch(0.45 0.16 28)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-display font-bold text-2xl md:text-3xl mb-3"
            style={{ color: "oklch(0.22 0.08 30)" }}
          >
            Abhi Applications Band Hain
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-base md:text-lg mb-2 max-w-md mx-auto leading-relaxed"
            style={{ color: "oklch(0.45 0.04 240)" }}
          >
            Applications{" "}
            <strong style={{ color: "oklch(0.35 0.1 30)" }}>
              1 mahine baad
            </strong>{" "}
            phir se shuru hongi.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-xs mt-6"
            style={{ color: "oklch(0.65 0.02 240)" }}
          >
            Free job placement &nbsp;|&nbsp; Male &amp; Female dono
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
