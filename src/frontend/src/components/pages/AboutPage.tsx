import {
  Award,
  Building2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiWhatsapp,
} from "react-icons/si";
import Footer from "../Footer";

const stats = [
  { label: "Active Job Openings", value: "50+", icon: Building2 },
  { label: "Hiring Partners", value: "6+", icon: Award },
  { label: "Cities Covered", value: "10+", icon: MapPin },
  { label: "Candidates Placed", value: "500+", icon: Users },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Integrity",
    desc: "We are a registered HR recruitment agency committed to transparent and ethical hiring practices.",
  },
  {
    icon: Target,
    title: "Right Fit",
    desc: "We focus on matching the right candidate to the right role — not just filling positions, but building careers.",
  },
  {
    icon: Users,
    title: "Candidate First",
    desc: "Our priority is the success of every job seeker we serve, offering guidance from application to placement.",
  },
  {
    icon: Star,
    title: "Pan India Reach",
    desc: "Operating across Delhi, Gurugram, Agra, Patna, Bihar and more — we bring opportunities to every corner.",
  },
];

const socialLinks = [
  {
    icon: SiWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/919891331853",
    color: "#25D366",
    handle: "+91 9891331853",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/reblehr.agency?igsh=amtueXA3MWF4aHRj",
    color: "#E1306C",
    handle: "@reblehr.agency",
  },
  {
    icon: SiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arun-rebel-10a944345",
    color: "#0A66C2",
    handle: "Arun Rebel",
  },
  {
    icon: SiFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/share/1J1wt847Fw/",
    color: "#1877F2",
    handle: "Nira Rebel HR",
  },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.06 258) 0%, oklch(0.18 0.06 255) 50%, oklch(0.22 0.07 250) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.78 0.16 75) 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div
                className="w-36 h-36 rounded-full overflow-hidden border-4 shadow-2xl"
                style={{
                  borderColor: "oklch(0.78 0.16 75)",
                  boxShadow: "0 0 40px oklch(0.78 0.16 75 / 0.4)",
                }}
              >
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-02-at-6.45.04-PM-1.jpeg"
                  alt="Nira Rebel HR Agency"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style={{
                  backgroundColor: "oklch(0.78 0.16 75 / 0.15)",
                  color: "oklch(0.78 0.16 75)",
                  border: "1px solid oklch(0.78 0.16 75 / 0.3)",
                }}
              >
                <Shield className="w-3 h-3" />
                Registered Recruitment Agency
              </div>
              <h1
                className="font-display font-bold text-3xl md:text-5xl mb-2 leading-tight"
                style={{ color: "oklch(0.98 0 0)" }}
              >
                Nira Rebel HR Agency
              </h1>
              <p
                className="text-lg font-medium mb-4"
                style={{ color: "oklch(0.78 0.16 75)" }}
              >
                Pvt Ltd
              </p>
              <p
                className="text-sm md:text-base leading-relaxed max-w-xl"
                style={{ color: "oklch(0.78 0.04 240)" }}
              >
                A trusted recruitment partner bridging the gap between job
                seekers and leading employers across India. We specialize in
                banking, cash management, e-commerce, and metro operations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-10"
        style={{ backgroundColor: "oklch(0.18 0.06 255)" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <Icon
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: "oklch(0.78 0.16 75)" }}
                  />
                  <p
                    className="font-display font-bold text-2xl md:text-3xl"
                    style={{ color: "oklch(0.98 0 0)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs uppercase tracking-wider mt-1"
                    style={{ color: "oklch(0.65 0.03 240)" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-display font-bold text-2xl md:text-3xl mb-3"
              style={{ color: "oklch(0.18 0.06 255)" }}
            >
              Our Core Values
            </h2>
            <div
              className="h-1 w-12 mx-auto rounded-full"
              style={{ backgroundColor: "oklch(0.78 0.16 75)" }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl p-6 border hover:shadow-md transition-shadow"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    borderColor: "oklch(0.88 0.01 240)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "oklch(0.78 0.16 75 / 0.1)" }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: "oklch(0.78 0.16 75)" }}
                    />
                  </div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: "oklch(0.18 0.06 255)" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.5 0.02 240)" }}
                  >
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section
        className="py-14 md:py-20"
        style={{ backgroundColor: "oklch(0.94 0.01 240)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-display font-bold text-2xl md:text-3xl mb-3"
              style={{ color: "oklch(0.18 0.06 255)" }}
            >
              Contact & Connect
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-5 bg-white shadow-sm border"
              style={{ borderColor: "oklch(0.88 0.01 240)" }}
            >
              <MapPin
                className="w-5 h-5 mb-3"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.55 0.12 70)" }}
              >
                Office Address
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.3 0.02 240)" }}
              >
                38, Central Ave, Pocket C,
                <br />
                Raju Park, Sangam Vihar,
                <br />
                New Delhi, Delhi 110080
              </p>
            </motion.div>

            {/* Phone */}
            <motion.a
              href="tel:9891331853"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-xl p-5 bg-white shadow-sm border hover:shadow-md transition-shadow"
              style={{ borderColor: "oklch(0.88 0.01 240)" }}
            >
              <Phone
                className="w-5 h-5 mb-3"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.55 0.12 70)" }}
              >
                Phone / WhatsApp
              </p>
              <p
                className="text-lg font-bold"
                style={{ color: "oklch(0.18 0.06 255)" }}
              >
                9891331853
              </p>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:rebelhrjobs1451@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-xl p-5 bg-white shadow-sm border hover:shadow-md transition-shadow"
              style={{ borderColor: "oklch(0.88 0.01 240)" }}
            >
              <Mail
                className="w-5 h-5 mb-3"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.55 0.12 70)" }}
              >
                Email
              </p>
              <p
                className="text-sm font-semibold break-all"
                style={{ color: "oklch(0.18 0.06 255)" }}
              >
                rebelhrjobs1451@gmail.com
              </p>
            </motion.a>
          </div>

          {/* Social */}
          <div className="flex flex-wrap gap-4 justify-center">
            {socialLinks.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-sm border hover:shadow-md transition-all"
                  style={{ borderColor: "oklch(0.88 0.01 240)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: s.color }}
                  >
                    <Icon size={16} color="#fff" />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "oklch(0.4 0.03 240)" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "oklch(0.18 0.06 255)" }}
                    >
                      {s.handle}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
