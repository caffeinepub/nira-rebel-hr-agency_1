import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Lock, Shield, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin2024";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Username aur password dono bharein.");
      return;
    }
    setIsLoading(true);
    // Simulate a brief loading state for UX polish
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("nira_admin_auth", "true");
      onSuccess();
      setUsername("");
      setPassword("");
      setError("");
    } else {
      setError("Galat username ya password. Dobara try karein.");
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") void handleLogin();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "oklch(0.05 0.04 255 / 0.85)" }}
          onClick={handleBackdropClick}
          data-ocid="admin.login.modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
            style={{
              backgroundColor: "oklch(0.16 0.06 255)",
              border: "1px solid oklch(0.28 0.06 255)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="px-6 py-5 text-center relative"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.20 0.08 255), oklch(0.14 0.05 255))",
                borderBottom: "1px solid oklch(0.26 0.06 255)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{
                  backgroundColor: "oklch(0.78 0.16 75 / 0.15)",
                  border: "1px solid oklch(0.78 0.16 75 / 0.35)",
                }}
              >
                <Shield
                  className="w-6 h-6"
                  style={{ color: "oklch(0.78 0.16 75)" }}
                />
              </div>
              <h2
                className="font-display font-bold text-lg"
                style={{ color: "oklch(0.92 0.10 80)" }}
              >
                Admin Login
              </h2>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.6 0.04 240)" }}
              >
                Nira Rebel HR Agency — Admin Panel
              </p>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                data-ocid="admin.login.close_button"
                className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{
                  color: "oklch(0.6 0.04 240)",
                  backgroundColor: "oklch(0.22 0.05 255)",
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              {/* Username */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="admin-username"
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "oklch(0.65 0.05 240)" }}
                >
                  Username
                </Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "oklch(0.55 0.05 240)" }}
                  />
                  <Input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="admin"
                    autoComplete="username"
                    autoFocus
                    data-ocid="admin.login.input"
                    className="pl-9 text-sm h-10"
                    style={{
                      backgroundColor: "oklch(0.12 0.04 255)",
                      borderColor: error
                        ? "oklch(0.6 0.2 25)"
                        : "oklch(0.28 0.06 255)",
                      color: "oklch(0.90 0.04 240)",
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="admin-password"
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "oklch(0.65 0.05 240)" }}
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "oklch(0.55 0.05 240)" }}
                  />
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    data-ocid="admin.login.input"
                    className="pl-9 pr-10 text-sm h-10"
                    style={{
                      backgroundColor: "oklch(0.12 0.04 255)",
                      borderColor: error
                        ? "oklch(0.6 0.2 25)"
                        : "oklch(0.28 0.06 255)",
                      color: "oklch(0.90 0.04 240)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "oklch(0.55 0.05 240)" }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error state */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    data-ocid="admin.login.error_state"
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs"
                    style={{
                      backgroundColor: "oklch(0.6 0.2 25 / 0.12)",
                      border: "1px solid oklch(0.6 0.2 25 / 0.35)",
                      color: "oklch(0.75 0.15 25)",
                    }}
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <Button
                type="button"
                onClick={() => void handleLogin()}
                disabled={isLoading}
                data-ocid="admin.login.submit_button"
                className="w-full h-10 font-semibold text-sm mt-1 transition-all"
                style={{
                  backgroundColor: isLoading
                    ? "oklch(0.65 0.13 75)"
                    : "oklch(0.78 0.16 75)",
                  color: "oklch(0.12 0.04 250)",
                }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Admin Login
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
