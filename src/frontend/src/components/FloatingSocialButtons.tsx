import { Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiWhatsapp,
} from "react-icons/si";

const socialLinks = [
  {
    id: "whatsapp",
    icon: SiWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/919891331853",
    color: "#25D366",
    bgColor: "#25D366",
    ocid: "social.whatsapp.button",
  },
  {
    id: "whatsapp-group",
    icon: Users,
    label: "Join Group",
    href: "https://chat.whatsapp.com/Ij6uY2RChCtBoP5uqaM4Oc",
    color: "#128C7E",
    bgColor: "#128C7E",
    ocid: "social.whatsapp_group.button",
  },
  {
    id: "instagram",
    icon: SiInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/reblehr.agency?igsh=amtueXA3MWF4aHRj",
    color: "#E1306C",
    bgColor: "#E1306C",
    ocid: "social.instagram.button",
  },
  {
    id: "linkedin",
    icon: SiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arun-rebel-10a944345",
    color: "#0A66C2",
    bgColor: "#0A66C2",
    ocid: "social.linkedin.button",
  },
  {
    id: "facebook",
    icon: SiFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/share/1J1wt847Fw/",
    color: "#1877F2",
    bgColor: "#1877F2",
    ocid: "social.facebook.button",
  },
];

export default function FloatingSocialButtons() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className="fixed right-3 md:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5"
      role="complementary"
      aria-label="Social media links"
    >
      {socialLinks.map((link, i) => {
        const Icon = link.icon;
        const isHovered = hoveredId === link.id;
        const isWhatsapp = link.id === "whatsapp";

        return (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="relative flex items-center"
          >
            {/* Label tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-2 px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap pointer-events-none"
                  style={{
                    backgroundColor: link.bgColor,
                    color: "#fff",
                    boxShadow: `0 2px 8px ${link.bgColor}55`,
                  }}
                >
                  {link.label}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={link.ocid}
              aria-label={link.label}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredId(link.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="flex items-center justify-center rounded-full shadow-lg"
              style={{
                backgroundColor: link.bgColor,
                color: "#fff",
                width: isWhatsapp ? "46px" : "38px",
                height: isWhatsapp ? "46px" : "38px",
                boxShadow: isWhatsapp
                  ? `0 4px 15px ${link.bgColor}66`
                  : `0 2px 8px ${link.bgColor}44`,
                animation: isWhatsapp ? "pulse-gold 2.5s infinite" : undefined,
              }}
            >
              <Icon size={isWhatsapp ? 22 : 17} />
            </motion.a>
          </motion.div>
        );
      })}
    </div>
  );
}
