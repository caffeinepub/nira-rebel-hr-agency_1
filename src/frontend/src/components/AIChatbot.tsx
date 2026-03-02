import { Bot, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Job } from "../backend.d";
import { useGetAllJobs } from "../hooks/useQueries";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
}

// ─── Bot Logic ────────────────────────────────────────────────────────────────
function getBotResponse(input: string, jobs: Job[]): string {
  const q = input.toLowerCase().trim();

  // Greeting
  if (/^(hello|hi|hey|helo|namaste|namaskar|hii|hiii|hai)\b/.test(q)) {
    return "Namaste! 🙏 Main Nira Rebel HR ka AI Assistant hoon. Aap mujhse job vacancies, salary, education requirements, age limit, ya kisi bhi cheez ke baare mein puch sakte hain. Main aapki poori madad karunga! 😊";
  }

  // Salary
  if (
    /salary|vetan|paisa|ctc|pay|income|earning|kitna milega|kitne milenge/.test(
      q,
    )
  ) {
    const activeSalaries = jobs
      .filter((j) => j.isActive && Number(j.salary) > 0)
      .map((j) => Number(j.salary));
    if (activeSalaries.length > 0) {
      const minSal = Math.min(...activeSalaries);
      const maxSal = Math.max(...activeSalaries);
      return `💰 **Salary Information:**\n\nHamare jobs mein salary ₹${minSal.toLocaleString("en-IN")} se lekar ₹${maxSal.toLocaleString("en-IN")} per month tak hai, position aur experience ke according.\n\n• Banking roles (SBI, PNB, Axis): ₹18,000–₹45,000/month\n• ATM/Cash roles (Hitachi): ₹15,000–₹28,000/month\n• E-Commerce (Blinkit, Zepto, Swiggy): ₹12,000–₹22,000/month\n• Metro roles: ₹16,000–₹35,000/month\n\nExact salary jaanne ke liye WhatsApp karein: +91 9891331853 📞`;
    }
    return "💰 Salary details ke liye WhatsApp karein: +91 9891331853. Banking roles mein ₹18,000–₹45,000/month, ATM roles mein ₹15,000–₹28,000/month milte hain. 📞";
  }

  // Age
  if (/age|umar|umer|aayu|kitne saal|minimum age|maximum age/.test(q)) {
    return "📅 **Age Requirements:**\n\n• **Banking Roles** (SBI, PNB, Axis Bank): 18–35 years\n• **ATM/Cash Roles** (Hitachi): 18–40 years\n• **E-Commerce** (Blinkit, Zepto, Swiggy, Flipkart, Amazon): 18–35 years\n• **Metro Department**: 18–38 years\n• **Floor Coordinator**: 20–35 years\n\nSaari positions ke liye minimum age **18 years** hai. Valid ID proof zaroori hai. 🪪";
  }

  // Education / Qualification
  if (
    /education|padhai|qualification|degree|study|10th|12th|graduate|graduation|ssc|hssc|matric/.test(
      q,
    )
  ) {
    return "🎓 **Education Requirements:**\n\n• **10th Pass**: ATM Operator, Cash Sorter, Loader, Packer, Picker, Metro Delivery\n• **12th Pass**: Floor Coordinator, Credit Card Opening, Token Checker, Customer Service\n• **Graduation Preferred**: Sales Manager, Branch Relationship Executive/Manager, Operations Manager, Branch Manager\n• **Any Graduate**: CASA, Clerk, Team Leader\n\nFresh graduates bhi apply kar sakte hain! Koi experience zaroori nahi kuch roles ke liye. 💪";
  }

  // Department
  if (/department|vibhag|sector|field|stream|company|companies|kahan/.test(q)) {
    const departments = [
      ...new Set(jobs.filter((j) => j.isActive).map((j) => j.department)),
    ];
    if (departments.length > 0) {
      const deptList = departments.map((d) => `• ${d}`).join("\n");
      return `🏢 **Available Departments:**\n\n${deptList}\n\nSab departments mein abhi vacancies hain! Kisi bhi department ke liye apply karein. 📞 WhatsApp: +91 9891331853`;
    }
    return "🏢 Hamare paas SBI Bank, PNB Bank, Axis Bank, Hitachi Cash Management, Blinkit/Zepto/Swiggy, aur Metro department mein vacancies hain! Details ke liye WhatsApp: +91 9891331853";
  }

  // SBI Bank
  if (/sbi|state bank/.test(q)) {
    const sbiJobs = jobs.filter(
      (j) => j.isActive && /sbi|state bank/i.test(j.company),
    );
    if (sbiJobs.length > 0) {
      const list = sbiJobs
        .map(
          (j) =>
            `• ${j.position} — ₹${Number(j.salary).toLocaleString("en-IN")}/month`,
        )
        .join("\n");
      return `🏦 **SBI Bank Vacancies:**\n\n${list}\n\nApply karne ke liye WhatsApp: +91 9891331853 📞`;
    }
    return "🏦 **SBI Bank Vacancies:**\n\n• Floor Coordinator\n• Floor Coordinator Team Leader\n• ATM Executive Operator\n• Credit Card Opening\n• Sales Manager\n• Branch Relationship Executive\n\nApply karne ke liye WhatsApp: +91 9891331853 📞";
  }

  // PNB Bank
  if (/pnb|punjab national/.test(q)) {
    const pnbJobs = jobs.filter(
      (j) => j.isActive && /pnb|punjab/i.test(j.company),
    );
    if (pnbJobs.length > 0) {
      const list = pnbJobs.map((j) => `• ${j.position}`).join("\n");
      return `🏦 **PNB Bank Vacancies:**\n\n${list}\n\nApply karne ke liye WhatsApp: +91 9891331853 📞`;
    }
    return "🏦 **PNB Bank Vacancies:**\n\n• Credit Card Opening\n• Sales Manager\n• Branch Relationship Executive\n• Branch Relationship Manager\n• Clerk\n\nApply karne ke liye WhatsApp: +91 9891331853 📞";
  }

  // Axis Bank
  if (/axis/.test(q)) {
    const axisJobs = jobs.filter((j) => j.isActive && /axis/i.test(j.company));
    if (axisJobs.length > 0) {
      const list = axisJobs.map((j) => `• ${j.position}`).join("\n");
      return `🏦 **Axis Bank Vacancies:**\n\n${list}\n\nApply karne ke liye WhatsApp: +91 9891331853 📞`;
    }
    return "🏦 **Axis Bank Vacancies:**\n\n• CASA\n• Loan Department\n• Account Opener\n• Operation Manager\n• Branch Manager\n• Brand Relationship Manager\n• Clerk\n\nApply karne ke liye WhatsApp: +91 9891331853 📞";
  }

  // Hitachi
  if (/hitachi|cash management|atm cash/.test(q)) {
    const hitachiJobs = jobs.filter(
      (j) => j.isActive && /hitachi/i.test(j.company),
    );
    if (hitachiJobs.length > 0) {
      const list = hitachiJobs.map((j) => `• ${j.position}`).join("\n");
      return `🏧 **Hitachi Cash Management Vacancies:**\n\n${list}\n\nApply karne ke liye WhatsApp: +91 9891331853 📞`;
    }
    return "🏧 **Hitachi Cash Management Vacancies:**\n\n• ATM Operator\n• TOM Operator\n• MST\n• Cash Sorter\n• Reporter\n• Team Leader\n\nApply karne ke liye WhatsApp: +91 9891331853 📞";
  }

  // E-Commerce / Blinkit / Zepto / Swiggy / Flipkart / Amazon
  if (
    /blinkit|zepto|swiggy|flipkart|amazon|ecommerce|e-commerce|warehouse|delivery/.test(
      q,
    )
  ) {
    return "📦 **E-Commerce Vacancies (Blinkit, Zepto, Swiggy, Flipkart, Amazon):**\n\n• Picker\n• Packer\n• Mover\n• Inventory Associate\n• Putter\n• Loader\n• And more...\n\nLocations: Delhi, Gurugram, Noida aur aas-paas\n\nApply karne ke liye WhatsApp: +91 9891331853 📞";
  }

  // Metro
  if (/metro/.test(q)) {
    return "🚇 **Metro Department Vacancies:**\n\n• TOM Operator\n• Metro Delivery\n• Customer Service\n• Security Guard\n• House Cleaner\n• House Cleaner Team Leader\n• Fare Man\n\nLocations: Delhi, Gurugram\n\nApply karne ke liye WhatsApp: +91 9891331853 📞";
  }

  // Apply / How to apply / Contact / WhatsApp
  if (
    /apply|kaise apply|how to|contact|join|register|interview|selection|whatsapp karein/.test(
      q,
    )
  ) {
    return "📋 **Apply Karne Ka Tarika:**\n\n1️⃣ WhatsApp karein: **+91 9891331853**\n2️⃣ Email karein: **rebelhrjobs1451@gmail.com**\n3️⃣ WhatsApp Group join karein\n4️⃣ Office visit karein:\n   38, Central Ave, Pocket C, Raju Park, Sangam Vihar, New Delhi - 110080\n\n⏰ Timing: Monday–Saturday, 10 AM – 6 PM\n\nApna naam, position aur location batayein, hum aapko guide karenge! 😊";
  }

  // Location
  if (
    /location|city|where|kahan|delhi|gurugram|gurgaon|sonipat|rewari|farukhnagar|agra|etawah|uttar pradesh|up|bihar|patna|pan india/.test(
      q,
    )
  ) {
    return "📍 **Job Locations:**\n\n**NCR Region:**\n• Delhi\n• Gurugram\n• Sonipat\n• Rewari\n• Farrukhnagar\n\n**UP/Other:**\n• Agra\n• Etawah\n• Uttar Pradesh (various cities)\n\n**Bihar:**\n• Patna\n• Bihar (various cities)\n\n✅ **Pan India** positions bhi available hain!\n\nApni preferred location batayein: +91 9891331853 📞";
  }

  // All Jobs / Vacancy / Opening
  if (
    /job|vacancy|opening|position|post|available|abhi|current|list|sabhi|sab/.test(
      q,
    )
  ) {
    const activeJobs = jobs.filter((j) => j.isActive);
    if (activeJobs.length > 0) {
      const byCompany: Record<string, Job[]> = {};
      for (const j of activeJobs) {
        if (!byCompany[j.company]) byCompany[j.company] = [];
        byCompany[j.company].push(j);
      }
      const summary = Object.entries(byCompany)
        .slice(0, 4)
        .map(
          ([company, cJobs]) =>
            `**${company}:** ${cJobs.map((j) => j.position).join(", ")}`,
        )
        .join("\n");
      return `💼 **Current Job Vacancies (${activeJobs.length} positions):**\n\n${summary}\n\n...aur bhi positions available hain!\n\nKisi bhi job ke liye apply karein: +91 9891331853 📞`;
    }
    return "💼 **Current Vacancies:**\n\nSBI Bank, PNB Bank, Axis Bank, Hitachi, E-Commerce (Blinkit/Zepto/Swiggy), aur Metro mein bahut saari vacancies hain!\n\nComplete list ke liye WhatsApp: +91 9891331853 📞";
  }

  // ATM specific
  if (/atm|cash load|cash sorter|tom operator/.test(q)) {
    return "🏧 **ATM Related Jobs:**\n\n• **ATM Executive Operator** (SBI Bank)\n• **ATM Operator** (Hitachi) — ATM maintenance & servicing\n• **TOM Operator** (Hitachi) — Cash loading & management\n• **Cash Sorter** (Hitachi) — Currency sorting\n• **TOM Operator** (Metro)\n\nEligibility: 10th pass, age 18–40 years\nSalary: ₹15,000–₹28,000/month\n\nApply: +91 9891331853 📞";
  }

  // Credit Card
  if (/credit card|card opening/.test(q)) {
    return "💳 **Credit Card Opening Jobs:**\n\nYeh field sales job hai jisme aap customers ko credit card open karne mein help karte hain.\n\n• **SBI Bank** — Credit Card Opening\n• **PNB Bank** — Credit Card Opening\n\n📋 Requirements:\n• 12th pass minimum\n• Good communication skills\n• Age 18–35 years\n• Salary: ₹18,000–₹25,000 + incentives\n\nApply: +91 9891331853 📞";
  }

  // Sales Manager
  if (/sales manager|sales|branch manager|relationship/.test(q)) {
    return "📊 **Sales & Relationship Roles:**\n\n• **Sales Manager** (SBI, PNB Banks)\n• **Branch Relationship Executive** (SBI, PNB, Axis)\n• **Branch Relationship Manager** (PNB, Axis)\n• **Brand Relationship Manager** (Axis)\n\n📋 Requirements:\n• Graduation preferred\n• Good communication & sales skills\n• Age 21–35 years\n• Salary: ₹22,000–₹45,000/month + incentives\n\nApply: +91 9891331853 📞";
  }

  // Documents required
  if (/document|id proof|aadhar|pan card|photo|certificate|papers/.test(q)) {
    return "📄 **Required Documents:**\n\n• Aadhar Card (mandatory)\n• PAN Card\n• 10th/12th Marksheet\n• Graduation Certificate (if applicable)\n• Passport Size Photos (2–4)\n• Bank Account Details\n• Police Verification Certificate (for some roles)\n\nSab documents ki self-attested photocopy lekar aayein.\n\nInterview ke liye contact karein: +91 9891331853 📞";
  }

  // Office / Address
  if (
    /office|address|kahan hai|location of office|visit|headquarters/.test(q)
  ) {
    return "🏢 **Office Address:**\n\nNira Rebel HR Agency Pvt Ltd\n38, Central Ave, Pocket C,\nRaju Park, Sangam Vihar,\nNew Delhi, Delhi 110080\n\n📞 Phone: +91 9891331853\n📧 Email: rebelhrjobs1451@gmail.com\n\n⏰ Office Hours: Monday–Saturday, 10 AM – 6 PM";
  }

  // Default fallback
  return "🤔 Mujhe samajh nahi aaya. Kripya in topics mein se koi ek puchein:\n\n• **Jobs/Vacancies** — available positions\n• **Salary** — pay details\n• **Age Limit** — eligibility\n• **Education** — qualification needed\n• **How to Apply** — application process\n• **Location** — job cities\n• **Company** — SBI, PNB, Axis, Hitachi, etc.\n\nYa seedha WhatsApp karein: **+91 9891331853** 📞";
}

// ─── Quick Reply Chips ────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  "Available Jobs",
  "Salary Info",
  "Age Requirement",
  "Education Required",
  "How to Apply",
  "Contact Us",
];

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const isBot = message.role === "bot";
  // Parse bold text (**text**) into <strong>
  const renderText = (text: string) => {
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={`b-${part}`}>{part}</strong>
      ) : (
        <span key={`s-${i}-${part.slice(0, 8)}`}>{part}</span>
      ),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-chatbot-primary flex items-center justify-center shrink-0 mr-2 mt-1 shadow-sm">
          <Bot size={14} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm whitespace-pre-line ${
          isBot
            ? "bg-chatbot-bot-bg text-chatbot-bot-text rounded-tl-sm"
            : "bg-chatbot-user-bg text-chatbot-user-text rounded-tr-sm"
        }`}
      >
        {renderText(message.text)}
        <div
          className={`text-[10px] mt-1 opacity-50 ${isBot ? "text-left" : "text-right"}`}
        >
          {message.timestamp.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Chatbot Component ───────────────────────────────────────────────────
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [scrollTick, setScrollTick] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: jobs = [] } = useGetAllJobs();

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "bot",
          text: "Namaste! 🙏 Main Nira Rebel HR ka AI Assistant hoon.\n\nAap mujhse job vacancies, salary, education, age limit, ya kisi bhi cheez ke baare mein puch sakte hain. 😊\n\nNeeche diye buttons se quickly puch sakte hain!",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollTick is an intentional trigger
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollTick, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setScrollTick((t) => t + 1);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(
      () => {
        const response = getBotResponse(text, jobs);
        const botMsg: Message = {
          id: `b-${Date.now()}`,
          role: "bot",
          text: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setScrollTick((t) => t + 1);
        setIsTyping(false);
      },
      800 + Math.random() * 400,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-ocid="chatbot.panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-3 md:left-4 z-50 w-[calc(100vw-24px)] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            style={{ height: "min(520px, calc(100dvh - 100px))" }}
          >
            {/* Header */}
            <div className="bg-chatbot-primary px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">
                  HR Assistant
                </p>
                <p className="text-white/70 text-xs">
                  HR सहायक • Always Online
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <button
                  type="button"
                  data-ocid="chatbot.close_button"
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 bg-chatbot-bg">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <div className="w-7 h-7 rounded-full bg-chatbot-primary flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-chatbot-bot-bg rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-chatbot-primary/60"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {QUICK_REPLIES.map((chip, i) => (
                <button
                  type="button"
                  key={chip}
                  data-ocid={`chatbot.quickreply.button.${i + 1}`}
                  onClick={() => sendMessage(chip)}
                  className="shrink-0 text-xs px-2.5 py-1.5 rounded-full border border-chatbot-primary text-chatbot-primary hover:bg-chatbot-primary hover:text-white transition-all duration-200 font-medium whitespace-nowrap"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-2.5 bg-white border-t border-gray-100 flex gap-2 items-center"
            >
              <input
                ref={inputRef}
                data-ocid="chatbot.input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Job ke baare mein kuch puchein..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-chatbot-primary/30 focus:border-chatbot-primary transition-all placeholder:text-gray-400"
              />
              <button
                type="submit"
                data-ocid="chatbot.send_button"
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-chatbot-primary text-white flex items-center justify-center shrink-0 disabled:opacity-40 hover:bg-chatbot-primary-hover transition-colors shadow-sm"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        data-ocid="chatbot.toggle_button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close HR Assistant" : "Open HR Assistant"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-4 left-3 md:left-4 z-50 w-14 h-14 rounded-full bg-chatbot-primary text-white flex items-center justify-center shadow-xl"
        style={{ boxShadow: "0 4px 20px oklch(0.18 0.06 255 / 0.45)" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Bot size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-chatbot-primary animate-ping opacity-40" />
        )}

        {/* Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-chatbot-accent text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
            AI
          </span>
        )}
      </motion.button>
    </>
  );
}
