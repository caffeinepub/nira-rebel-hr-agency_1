import { MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-16 md:py-20"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.06 258) 0%, oklch(0.18 0.06 255) 60%, oklch(0.2 0.07 250) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="font-display font-bold text-2xl md:text-4xl mb-3"
            style={{ color: "oklch(0.98 0 0)" }}
          >
            Get In Touch
          </h2>
          <div
            className="h-1 w-16 mx-auto rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.78 0.16 75), oklch(0.88 0.12 80))",
            }}
          />
          <p className="mt-4 text-sm" style={{ color: "oklch(0.75 0.03 240)" }}>
            For career guidance, job placement, and recruitment solutions
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            data-ocid="contact.address.card"
            className="rounded-xl p-8 text-center"
            style={{
              backgroundColor: "oklch(0.25 0.06 255 / 0.5)",
              border: "1px solid oklch(0.78 0.16 75 / 0.2)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "oklch(0.78 0.16 75 / 0.15)" }}
            >
              <MapPin
                className="w-5 h-5"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
            </div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "oklch(0.7 0.05 75)" }}
            >
              Office Address
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.88 0.02 240)" }}
            >
              38, Central Ave, Pocket C,
              <br />
              Raju Park, Sangam Vihar,
              <br />
              New Delhi, Delhi 110080
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
