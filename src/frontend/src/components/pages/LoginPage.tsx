import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, LogIn, LogOut, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import Footer from "../Footer";

export default function LoginPage() {
  const { login, clear, isLoggingIn, identity } = useInternetIdentity();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.06 258) 0%, oklch(0.18 0.06 255) 50%, oklch(0.22 0.07 250) 100%)",
        }}
      >
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                backgroundColor: "oklch(0.78 0.16 75 / 0.15)",
                color: "oklch(0.78 0.16 75)",
                border: "1px solid oklch(0.78 0.16 75 / 0.3)",
              }}
            >
              <Shield className="w-3 h-3" />
              Secure Login
            </div>
            <h1
              className="font-display font-bold text-3xl md:text-4xl mb-3"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              Login to Your Account
            </h1>
            <p
              className="text-sm md:text-base max-w-md mx-auto"
              style={{ color: "oklch(0.78 0.04 240)" }}
            >
              Access job listings, register as a candidate, or manage the
              platform if you're an admin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Card */}
      <section className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {identity ? (
              /* Already logged in */
              <motion.div
                data-ocid="login.success_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-8 border text-center"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  borderColor: "oklch(0.88 0.01 240)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "oklch(0.55 0.2 140 / 0.1)" }}
                >
                  <CheckCircle2
                    className="w-8 h-8"
                    style={{ color: "oklch(0.55 0.2 140)" }}
                  />
                </div>
                <h2
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: "oklch(0.18 0.06 255)" }}
                >
                  You're Logged In
                </h2>
                <p
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.6 0.02 240)" }}
                >
                  Principal ID:
                </p>
                <p
                  className="text-xs font-mono mb-6 break-all px-2"
                  style={{ color: "oklch(0.55 0.16 65)" }}
                >
                  {identity.getPrincipal().toString()}
                </p>
                <Button
                  data-ocid="login.logout.button"
                  onClick={clear}
                  variant="outline"
                  className="w-full gap-2"
                  style={{
                    borderColor: "oklch(0.78 0.16 75)",
                    color: "oklch(0.55 0.16 65)",
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </motion.div>
            ) : (
              /* Login prompt */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  borderColor: "oklch(0.88 0.01 240)",
                }}
              >
                {/* Top accent */}
                <div
                  className="h-1.5"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.18 0.06 255), oklch(0.78 0.16 75))",
                  }}
                />

                <div className="p-8">
                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-md"
                      style={{ borderColor: "oklch(0.78 0.16 75)" }}
                    >
                      <img
                        src="/assets/uploads/WhatsApp-Image-2026-03-02-at-6.45.04-PM-1.jpeg"
                        alt="Nira Rebel HR"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <h2
                    className="font-display font-bold text-xl text-center mb-1"
                    style={{ color: "oklch(0.18 0.06 255)" }}
                  >
                    Welcome Back
                  </h2>
                  <p
                    className="text-sm text-center mb-8"
                    style={{ color: "oklch(0.55 0.02 240)" }}
                  >
                    Login securely to access your account
                  </p>

                  <Button
                    data-ocid="login.submit_button"
                    onClick={login}
                    disabled={isLoggingIn}
                    size="lg"
                    className="w-full font-semibold gap-2 mb-4"
                    style={{
                      backgroundColor: "oklch(0.18 0.06 255)",
                      color: "oklch(0.99 0 0)",
                    }}
                  >
                    {isLoggingIn ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <LogIn className="w-4 h-4" />
                    )}
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </Button>

                  <div
                    className="rounded-lg p-4 mt-4 text-xs space-y-1"
                    style={{
                      backgroundColor: "oklch(0.78 0.16 75 / 0.06)",
                      border: "1px solid oklch(0.78 0.16 75 / 0.2)",
                    }}
                  >
                    <p
                      className="font-semibold flex items-center gap-1.5"
                      style={{ color: "oklch(0.45 0.12 70)" }}
                    >
                      <Shield className="w-3 h-3" />
                      Secure & Private
                    </p>
                    <p style={{ color: "oklch(0.55 0.02 240)" }}>
                      Your login is secured by the Internet Computer. No
                      password required.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
