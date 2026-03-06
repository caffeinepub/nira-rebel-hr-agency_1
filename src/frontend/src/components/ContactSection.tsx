import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiWhatsapp,
} from "react-icons/si";

const socialLinks = [
  {
    icon: SiWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/917302361451",
    color: "#25D366",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/reblehr.agency?igsh=amtueXA3MWF4aHRj",
    color: "#E1306C",
  },
  {
    icon: SiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arun-rebel-10a944345",
    color: "#0A66C2",
  },
  {
    icon: SiFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/share/1J1wt847Fw/",
    color: "#1877F2",
  },
];

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
            Reach out to us for career guidance, job placement, and recruitment
            solutions
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <motion.a
            href="tel:7302361451"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            data-ocid="contact.phone.card"
            className="rounded-xl p-6 text-center cursor-pointer transition-all group"
            style={{
              backgroundColor: "oklch(0.25 0.06 255 / 0.5)",
              border: "1px solid oklch(0.78 0.16 75 / 0.2)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "oklch(0.78 0.16 75 / 0.15)" }}
            >
              <Phone
                className="w-5 h-5"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
            </div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.7 0.05 75)" }}
            >
              Phone / WhatsApp
            </p>
            <p
              className="font-bold text-lg"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              7302361451
            </p>
            <p
              className="text-xs mt-1 group-hover:text-gold transition-colors"
              style={{ color: "oklch(0.65 0.03 240)" }}
            >
              Tap to call
            </p>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:rebelhrjobs1451@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            data-ocid="contact.email.card"
            className="rounded-xl p-6 text-center cursor-pointer transition-all group"
            style={{
              backgroundColor: "oklch(0.25 0.06 255 / 0.5)",
              border: "1px solid oklch(0.78 0.16 75 / 0.2)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "oklch(0.78 0.16 75 / 0.15)" }}
            >
              <Mail
                className="w-5 h-5"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
            </div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.7 0.05 75)" }}
            >
              Email
            </p>
            <p
              className="font-bold text-sm break-all"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              rebelhrjobs1451@gmail.com
            </p>
            <p
              className="text-xs mt-1 group-hover:text-gold transition-colors"
              style={{ color: "oklch(0.65 0.03 240)" }}
            >
              Tap to email
            </p>
          </motion.a>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            data-ocid="contact.address.card"
            className="rounded-xl p-6 text-center"
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
              className="text-xs font-semibold uppercase tracking-wider mb-2"
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

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-5"
            style={{ color: "oklch(0.7 0.05 75)" }}
          >
            Follow & Connect
          </p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-ocid={`contact.social.${s.label.toLowerCase()}.button`}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all"
                  style={{
                    backgroundColor: s.color,
                    color: "#fff",
                  }}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
