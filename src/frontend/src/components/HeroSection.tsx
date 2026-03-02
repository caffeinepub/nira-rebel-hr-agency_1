import { ChevronLeft, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/assets/generated/hero-slide-1.dim_1920x700.jpg",
    tag: "Registered Recruitment Agency",
    title: "Nira Rebel HR Agency",
    subtitle: "Pvt Ltd",
    desc: "Empowering Talent • Innovating Recruitment",
  },
  {
    image: "/assets/generated/hero-slide-2.dim_1920x700.jpg",
    tag: "Pan India Placements",
    title: "Find Your Dream Job",
    subtitle: "Across India",
    desc: "Delhi • Gurugram • Bihar • Patna • UP • Rewari & More",
  },
  {
    image: "/assets/generated/hero-slide-3.dim_1920x700.jpg",
    tag: "Top Banking Partners",
    title: "SBI • PNB • Axis Bank",
    subtitle: "& More",
    desc: "Floor Coordinator • ATM Operator • Sales Manager • Branch Manager",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const scrollToJobs = () => {
    const el = document.getElementById("jobs");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <>
      {/* ─── Sliding Hero Banner ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "520px" }}>
        {/* Slide background */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter: (d: number) => ({
                x: d > 0 ? "100%" : "-100%",
                opacity: 0,
              }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({
                x: d > 0 ? "-100%" : "100%",
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(5,12,38,0.82) 0%, rgba(5,12,38,0.55) 60%, rgba(5,12,38,0.3) 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gold top/bottom lines */}
        <div
          className="absolute top-0 left-0 right-0 h-1 z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.78 0.16 75), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1 z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.78 0.16 75), transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-8 md:px-16">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              {/* Tag badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
                style={{
                  backgroundColor: "oklch(0.78 0.16 75 / 0.18)",
                  color: "oklch(0.88 0.14 80)",
                  border: "1px solid oklch(0.78 0.16 75 / 0.4)",
                }}
              >
                {slide.tag}
              </div>

              {/* Logo + title row */}
              <div className="flex items-center gap-5 mb-3">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 flex-shrink-0 shadow-lg"
                  style={{
                    borderColor: "oklch(0.78 0.16 75)",
                    boxShadow: "0 0 18px oklch(0.78 0.16 75 / 0.5)",
                  }}
                >
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-03-02-at-6.45.04-PM-1.jpeg"
                    alt="Nira Rebel HR Agency Logo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (!t.dataset.fallback) {
                        t.dataset.fallback = "1";
                        t.src =
                          "/assets/uploads/WhatsApp-Image-2026-03-02-at-6.45.04-PM-1-1.jpeg";
                      }
                    }}
                  />
                </div>
                <div>
                  <h1
                    className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-tight"
                    style={{ color: "oklch(0.98 0 0)" }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="font-display text-base md:text-lg font-medium mt-0.5"
                    style={{ color: "oklch(0.88 0.12 80)" }}
                  >
                    {slide.subtitle}
                  </p>
                </div>
              </div>

              <p
                className="text-sm md:text-base tracking-wide mb-8"
                style={{ color: "oklch(0.78 0.04 245)" }}
              >
                {slide.desc}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="hero.primary_button"
                  onClick={scrollToJobs}
                  className="font-semibold px-7 py-3 rounded-md text-sm shadow-lg transition-all hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: "oklch(0.78 0.16 75)",
                    color: "oklch(0.12 0.04 250)",
                  }}
                >
                  Our Services →
                </button>
                <a
                  href="/assets/uploads/WhatsApp-Image-2026-03-02-at-6.45.04-PM-1.jpeg"
                  data-ocid="hero.about_button"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToJobs();
                  }}
                  className="font-semibold px-7 py-3 rounded-md text-sm border-2 transition-all hover:opacity-90 active:scale-95 text-center"
                  style={{
                    borderColor: "oklch(0.35 0.06 255)",
                    backgroundColor: "oklch(0.18 0.06 255)",
                    color: "oklch(0.92 0 0)",
                  }}
                >
                  About Us
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left arrow */}
        <button
          type="button"
          data-ocid="hero.prev_button"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all hover:scale-110"
          style={{
            borderColor: "oklch(0.78 0.16 75 / 0.6)",
            backgroundColor: "oklch(0.08 0.04 250 / 0.6)",
            color: "oklch(0.98 0 0)",
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          data-ocid="hero.next_button"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all hover:scale-110"
          style={{
            borderColor: "oklch(0.78 0.16 75 / 0.6)",
            backgroundColor: "oklch(0.08 0.04 250 / 0.6)",
            color: "oklch(0.98 0 0)",
          }}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((slide, i) => (
            <button
              type="button"
              key={slide.tag}
              data-ocid={`hero.dot.${i + 1}`}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className="rounded-full transition-all"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                backgroundColor:
                  i === current
                    ? "oklch(0.78 0.16 75)"
                    : "oklch(0.78 0.16 75 / 0.35)",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ─── Two Cards Below Slider ──────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Corporate Hiring */}
          <div className="flex flex-col items-center text-center px-8 py-10 hover:bg-gray-50 transition-colors">
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: "oklch(0.62 0.18 55)" }}
            >
              Corporate Hiring
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5 max-w-sm">
              Get connected with us for your hiring need. Share details at{" "}
              <span className="font-medium">rebelhrjobs1451@gmail.com</span>
            </p>
            <a
              href="mailto:rebelhrjobs1451@gmail.com"
              data-ocid="hero.corporate_link"
              className="flex items-center gap-2 font-semibold text-sm hover:underline"
              style={{ color: "oklch(0.25 0.06 258)" }}
            >
              <Mail className="w-4 h-4" />
              Share Details
            </a>
          </div>

          {/* Looking for a Job */}
          <div className="flex flex-col items-center text-center px-8 py-10 hover:bg-gray-50 transition-colors">
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: "oklch(0.62 0.18 55)" }}
            >
              Looking for a Job?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5 max-w-sm">
              We have experience serving as a clients' single point of contact
              under a design build delivery format.
            </p>
            <a
              href="https://wa.me/919891331853"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.job_link"
              className="flex items-center gap-2 font-semibold text-sm hover:underline"
              style={{ color: "oklch(0.25 0.06 258)" }}
            >
              <Phone className="w-4 h-4" />
              Submit Your Resume
            </a>
          </div>
        </div>
      </section>

      {/* ─── Contact strip ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 py-4 px-4"
        style={{ backgroundColor: "oklch(0.14 0.05 258)" }}
      >
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "oklch(0.8 0.03 240)" }}
        >
          <MapPin
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "oklch(0.78 0.16 75)" }}
          />
          <span>
            38, Central Ave, Pocket C, Raju Park, Sangam Vihar, New Delhi 110080
          </span>
        </div>
        <a
          href="tel:9891331853"
          className="flex items-center gap-2 text-sm"
          style={{ color: "oklch(0.8 0.03 240)" }}
        >
          <Phone className="w-4 h-4" style={{ color: "oklch(0.78 0.16 75)" }} />
          9891331853
        </a>
        <a
          href="mailto:rebelhrjobs1451@gmail.com"
          className="flex items-center gap-2 text-sm"
          style={{ color: "oklch(0.8 0.03 240)" }}
        >
          <Mail className="w-4 h-4" style={{ color: "oklch(0.78 0.16 75)" }} />
          rebelhrjobs1451@gmail.com
        </a>
      </motion.div>
    </>
  );
}
