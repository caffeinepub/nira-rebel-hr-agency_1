import { Users, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function WhatsAppGroupBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          data-ocid="whatsapp_group.banner"
          className="relative z-50 flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium"
          style={{
            background: "linear-gradient(90deg, #128C7E, #25D366, #128C7E)",
            color: "#fff",
          }}
        >
          <Users className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm">
            Join our WhatsApp Group for instant job alerts!
          </span>
          <a
            href="https://chat.whatsapp.com/Ij6uY2RChCtBoP5uqaM4Oc"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="whatsapp_group.join.button"
            className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            Join Now
          </a>
          <button
            type="button"
            data-ocid="whatsapp_group.close.button"
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
