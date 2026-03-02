import { Shield, Star } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 px-4 border-t"
      style={{
        backgroundColor: "oklch(0.12 0.05 258)",
        borderColor: "oklch(0.22 0.05 255)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full overflow-hidden border"
              style={{ borderColor: "oklch(0.78 0.16 75 / 0.5)" }}
            >
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-02-at-6.45.04-PM-1-1.jpeg"
                alt="Nira Rebel HR"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p
                className="font-display font-bold text-sm"
                style={{ color: "oklch(0.88 0.12 80)" }}
              >
                Nira Rebel HR Agency Pvt Ltd
              </p>
              <p className="text-xs" style={{ color: "oklch(0.55 0.03 240)" }}>
                Empowering Talent • Innovating Recruitment
              </p>
            </div>
          </div>

          {/* Center - job locations */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star
                className="w-3 h-3"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "oklch(0.78 0.16 75)" }}
              >
                Pan India Operations
              </span>
              <Star
                className="w-3 h-3"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
            </div>
            <p className="text-xs" style={{ color: "oklch(0.5 0.02 240)" }}>
              Delhi • Gurugram • Sonipat • Agra • Etawah • Patna • Bihar & more
            </p>
          </div>

          {/* Right */}
          <div
            className="flex items-center gap-1.5"
            style={{ color: "oklch(0.5 0.02 240)" }}
          >
            <Shield
              className="w-3 h-3"
              style={{ color: "oklch(0.78 0.16 75)" }}
            />
            <p className="text-xs">Registered HR Recruitment Agency</p>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="mt-6 pt-4 border-t flex flex-col md:flex-row items-center justify-between gap-2 text-xs"
          style={{
            borderColor: "oklch(0.22 0.05 255)",
            color: "oklch(0.45 0.02 240)",
          }}
        >
          <p>© {year} Nira Rebel HR Agency Pvt Ltd. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors"
              style={{ color: "oklch(0.78 0.16 75)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
