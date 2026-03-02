import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShoppingCart,
  Train,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import ContactSection from "../ContactSection";
import Footer from "../Footer";

const departments = [
  {
    name: "SBI Bank",
    icon: Building2,
    color: "oklch(0.55 0.18 255)",
    positions: [
      "Floor Coordinator",
      "Floor Coordinator Team Leader",
      "ATM Executive Operator",
      "Credit Card Opening",
      "Sales Manager",
      "Branch Relationship Executive",
    ],
  },
  {
    name: "PNB Bank",
    icon: Building2,
    color: "oklch(0.5 0.2 260)",
    positions: [
      "Credit Card Opening",
      "Sales Manager",
      "Branch Relationship Executive",
      "Branch Relationship Manager",
      "Clerk",
    ],
  },
  {
    name: "Axis Bank",
    icon: Building2,
    color: "oklch(0.6 0.22 270)",
    positions: [
      "Cashier",
      "Loan Department",
      "Account Opener",
      "Operation Manager",
      "Branch Manager",
      "Brand Relationship Manager",
      "Clerk",
    ],
  },
  {
    name: "Hitachi Cash Management Services Pvt Ltd",
    icon: CreditCard,
    color: "oklch(0.65 0.2 30)",
    positions: [
      "ATM Operator",
      "TOM Operator",
      "MST",
      "Cash Sorter",
      "Reporter",
      "Team Leader",
    ],
  },
  {
    name: "E-Commerce / Logistics",
    icon: ShoppingCart,
    color: "oklch(0.72 0.18 75)",
    subtitle: "Blinkit, Zepto, Swiggy, Flipkart, Amazon & more",
    positions: [
      "Picker",
      "Packer",
      "Movers",
      "Inventory Associate",
      "Putter",
      "Loaders",
    ],
  },
  {
    name: "Metro Department",
    icon: Train,
    color: "oklch(0.58 0.18 200)",
    positions: [
      "TOM Operator",
      "Metro Delivery",
      "Customer Service",
      "Security Guard",
      "Housekeeping",
      "Housekeeping Team Leader",
      "Fore Man",
    ],
  },
];

const locations = [
  "Delhi",
  "Gurugram",
  "Sonipat",
  "Rewari",
  "Farrukhnagar",
  "Agra",
  "Etawah",
  "Uttar Pradesh",
  "Bihar",
  "Patna",
  "Pan India",
];

const services = [
  {
    title: "Job Placement",
    desc: "We connect skilled candidates with top companies across banking, logistics, and government sectors.",
    icon: Users,
  },
  {
    title: "Credit Card Opening",
    desc: "Specialized positions for field agents managing credit card applications and customer onboarding.",
    icon: CreditCard,
  },
  {
    title: "ATM Cash Loading",
    desc: "Expert operators for ATM cash management and maintenance under Hitachi and banking partners.",
    icon: Building2,
  },
  {
    title: "Pan India Operations",
    desc: "We operate across 10+ cities and states ensuring nationwide job placement coverage.",
    icon: MapPin,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesPage() {
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
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.16 75) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.78 0.16 75) 0%, transparent 40%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{
                backgroundColor: "oklch(0.78 0.16 75 / 0.15)",
                color: "oklch(0.78 0.16 75)",
                border: "1px solid oklch(0.78 0.16 75 / 0.3)",
              }}
            >
              Our Services
            </div>
            <h1
              className="font-display font-bold text-3xl md:text-5xl mb-4 leading-tight"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              Placement Services
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.78 0.04 240)" }}
            >
              Nira Rebel HR Agency connects job seekers with leading employers
              across banking, logistics, metro, and e-commerce sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What we offer */}
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
              What We Offer
            </h2>
            <div
              className="h-1 w-12 mx-auto rounded-full"
              style={{ backgroundColor: "oklch(0.78 0.16 75)" }}
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} variants={itemVariants}>
                  <Card
                    className="h-full border hover:shadow-lg transition-shadow"
                    style={{ borderColor: "oklch(0.88 0.01 240)" }}
                  >
                    <CardHeader className="pb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                        style={{ backgroundColor: "oklch(0.78 0.16 75 / 0.1)" }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: "oklch(0.78 0.16 75)" }}
                        />
                      </div>
                      <CardTitle
                        className="text-base font-bold"
                        style={{ color: "oklch(0.18 0.06 255)" }}
                      >
                        {s.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "oklch(0.5 0.02 240)" }}
                      >
                        {s.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Departments */}
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
              Departments & Positions
            </h2>
            <p className="text-sm" style={{ color: "oklch(0.5 0.02 240)" }}>
              We recruit across multiple sectors — browse available roles by
              department
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <motion.div key={dept.name} variants={itemVariants}>
                  <Card className="h-full bg-white border-0 shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                    <div
                      className="h-1.5 w-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${dept.color}20` }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: dept.color }}
                          />
                        </div>
                        <div>
                          <CardTitle
                            className="text-sm md:text-base font-bold leading-snug"
                            style={{ color: "oklch(0.18 0.06 255)" }}
                          >
                            {dept.name}
                          </CardTitle>
                          {dept.subtitle && (
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: "oklch(0.6 0.04 240)" }}
                            >
                              {dept.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {dept.positions.map((pos) => (
                          <li
                            key={pos}
                            className="flex items-center gap-2 text-sm"
                            style={{ color: "oklch(0.35 0.02 240)" }}
                          >
                            <CheckCircle2
                              className="w-3.5 h-3.5 flex-shrink-0"
                              style={{ color: dept.color }}
                            />
                            {pos}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2
              className="font-display font-bold text-2xl md:text-3xl mb-3"
              style={{ color: "oklch(0.18 0.06 255)" }}
            >
              Pan India Operations
            </h2>
            <p className="text-sm" style={{ color: "oklch(0.5 0.02 240)" }}>
              We place candidates across these cities and states
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto"
          >
            {locations.map((loc, i) => (
              <motion.div
                key={loc}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Badge
                  className="px-4 py-1.5 text-sm font-semibold rounded-full"
                  style={{
                    backgroundColor:
                      loc === "Pan India"
                        ? "oklch(0.18 0.06 255)"
                        : "oklch(0.78 0.16 75 / 0.1)",
                    color:
                      loc === "Pan India"
                        ? "oklch(0.99 0 0)"
                        : "oklch(0.35 0.1 70)",
                    border: `1px solid ${loc === "Pan India" ? "transparent" : "oklch(0.78 0.16 75 / 0.3)"}`,
                  }}
                >
                  <MapPin className="w-3 h-3 mr-1 inline" />
                  {loc}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
