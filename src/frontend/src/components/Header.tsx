import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LogIn,
  LogOut,
  Menu,
  Settings,
  Shield,
  UserPlus,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface HeaderProps {
  isAdmin: boolean;
  isLoggedIn: boolean;
  showAdmin: boolean;
  onToggleAdmin: () => void;
  onAdminLogout?: () => void;
  isLocalAdmin?: boolean;
}

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Candidates", to: "/candidates" },
  { label: "Blogs", to: "/blogs" },
];

export default function Header({
  isAdmin,
  isLoggedIn,
  showAdmin,
  onToggleAdmin,
  onAdminLogout,
  isLocalAdmin,
}: HeaderProps) {
  const { login, clear, isLoggingIn } = useInternetIdentity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const closeMobile = () => setMobileMenuOpen(false);

  const isActive = (to: string) =>
    to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  return (
    <header
      className="sticky top-0 z-40 shadow-md"
      style={{ backgroundColor: "oklch(0.18 0.06 255)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Brand */}
          <Link
            to="/"
            onClick={closeMobile}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div
              className="relative w-16 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 flex-shrink-0"
              style={{ borderColor: "oklch(0.78 0.16 75)" }}
            >
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-02-at-6.45.04-PM-1-1.jpeg"
                alt="Nira Rebel HR Agency Logo"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.fallback) {
                    t.dataset.fallback = "1";
                    t.src =
                      "/assets/uploads/WhatsApp-Image-2026-03-02-at-6.45.04-PM-1.jpeg";
                  }
                }}
              />
            </div>
            <div>
              <h1
                className="font-display font-bold text-sm md:text-base leading-tight"
                style={{ color: "oklch(0.88 0.12 80)" }}
              >
                Nira Rebel HR Agency
              </h1>
              <p
                className="text-xs hidden md:block"
                style={{ color: "oklch(0.7 0.05 240)" }}
              >
                Pvt Ltd
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
                style={{
                  color: isActive(link.to)
                    ? "oklch(0.78 0.16 75)"
                    : "oklch(0.85 0.03 240)",
                  backgroundColor: isActive(link.to)
                    ? "oklch(0.78 0.16 75 / 0.12)"
                    : "transparent",
                  fontFamily: "Trebuchet MS, sans-serif",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Admin button */}
            {isAdmin ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  data-ocid="nav.admin.link"
                  onClick={onToggleAdmin}
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
                  style={{
                    color: "oklch(0.78 0.16 75)",
                    backgroundColor: showAdmin
                      ? "oklch(0.78 0.16 75 / 0.12)"
                      : "transparent",
                  }}
                >
                  <Settings className="inline w-4 h-4 mr-1" />
                  {showAdmin ? "Site Dekhein" : "Admin Panel"}
                </button>
                {isLocalAdmin && onAdminLogout && (
                  <button
                    type="button"
                    data-ocid="nav.admin.logout.button"
                    onClick={onAdminLogout}
                    className="px-2 py-1.5 rounded-md text-xs font-medium transition-all"
                    style={{ color: "oklch(0.65 0.1 25)" }}
                    title="Admin Logout"
                  >
                    <LogOut className="inline w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                data-ocid="nav.admin.link"
                onClick={onToggleAdmin}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all border"
                style={{
                  color: "oklch(0.78 0.16 75)",
                  borderColor: "oklch(0.78 0.16 75 / 0.4)",
                  backgroundColor: "transparent",
                }}
              >
                <Shield className="inline w-4 h-4 mr-1" />
                Admin Login
              </button>
            )}

            <div className="flex items-center gap-2 ml-2">
              {!isLoggedIn && (
                <a href="#/signup">
                  <Button
                    data-ocid="nav.signup.button"
                    variant="outline"
                    size="sm"
                    className="text-xs border font-semibold"
                    style={{
                      borderColor: "oklch(0.78 0.16 75 / 0.5)",
                      color: "oklch(0.88 0.12 80)",
                      backgroundColor: "transparent",
                    }}
                  >
                    <UserPlus className="w-3 h-3 mr-1" />
                    Register
                  </Button>
                </a>
              )}

              {isLoggedIn ? (
                <Button
                  data-ocid="nav.logout.button"
                  variant="outline"
                  size="sm"
                  onClick={clear}
                  className="text-xs border"
                  style={{
                    borderColor: "oklch(0.78 0.16 75)",
                    color: "oklch(0.78 0.16 75)",
                    backgroundColor: "transparent",
                  }}
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  Logout
                </Button>
              ) : (
                <a href="#/login">
                  <Button
                    data-ocid="nav.login.button"
                    size="sm"
                    onClick={isLoggingIn ? undefined : login}
                    disabled={isLoggingIn}
                    className="text-xs font-semibold"
                    style={{
                      backgroundColor: "oklch(0.78 0.16 75)",
                      color: "oklch(0.12 0.04 250)",
                    }}
                  >
                    <LogIn className="w-3 h-3 mr-1" />
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </Button>
                </a>
              )}
            </div>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded"
            style={{ color: "oklch(0.88 0.12 80)" }}
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            data-ocid="nav.mobile.toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t overflow-hidden"
            style={{
              backgroundColor: "oklch(0.16 0.06 255)",
              borderColor: "oklch(0.25 0.05 255)",
            }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                  onClick={closeMobile}
                  className="text-sm py-2.5 px-3 rounded-lg text-left transition-all"
                  style={{
                    color: isActive(link.to)
                      ? "oklch(0.78 0.16 75)"
                      : "oklch(0.85 0.03 240)",
                    backgroundColor: isActive(link.to)
                      ? "oklch(0.78 0.16 75 / 0.1)"
                      : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {isAdmin ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    data-ocid="nav.mobile.admin.link"
                    onClick={() => {
                      onToggleAdmin();
                      closeMobile();
                    }}
                    className="flex-1 text-sm text-left py-2.5 px-3 rounded-lg"
                    style={{
                      color: "oklch(0.78 0.16 75)",
                      backgroundColor: showAdmin
                        ? "oklch(0.78 0.16 75 / 0.08)"
                        : "transparent",
                    }}
                  >
                    <Settings className="inline w-4 h-4 mr-1" />
                    {showAdmin ? "Site Dekhein" : "Admin Panel"}
                  </button>
                  {isLocalAdmin && onAdminLogout && (
                    <button
                      type="button"
                      data-ocid="nav.mobile.admin.logout.button"
                      onClick={() => {
                        onAdminLogout();
                        closeMobile();
                      }}
                      className="px-3 py-2.5 rounded-lg text-xs"
                      style={{ color: "oklch(0.65 0.1 25)" }}
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  data-ocid="nav.mobile.admin.link"
                  onClick={() => {
                    onToggleAdmin();
                    closeMobile();
                  }}
                  className="text-sm text-left py-2.5 px-3 rounded-lg border"
                  style={{
                    color: "oklch(0.78 0.16 75)",
                    borderColor: "oklch(0.78 0.16 75 / 0.35)",
                  }}
                >
                  <Shield className="inline w-4 h-4 mr-1" />
                  Admin Login
                </button>
              )}

              <div
                className="pt-3 border-t flex flex-col gap-2"
                style={{ borderColor: "oklch(0.25 0.05 255)" }}
              >
                {!isLoggedIn && (
                  // biome-ignore lint/a11y/useValidAnchor: hash routing
                  <a href="#/signup" onClick={closeMobile}>
                    <Button
                      data-ocid="nav.mobile.signup.button"
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      style={{
                        borderColor: "oklch(0.78 0.16 75 / 0.4)",
                        color: "oklch(0.88 0.12 80)",
                        backgroundColor: "transparent",
                      }}
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      Register as Candidate
                    </Button>
                  </a>
                )}

                {isLoggedIn ? (
                  <Button
                    data-ocid="nav.mobile.logout.button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clear();
                      closeMobile();
                    }}
                    className="w-full text-xs"
                    style={{
                      borderColor: "oklch(0.78 0.16 75)",
                      color: "oklch(0.78 0.16 75)",
                      backgroundColor: "transparent",
                    }}
                  >
                    <LogOut className="w-3 h-3 mr-1" />
                    Logout
                  </Button>
                ) : (
                  // biome-ignore lint/a11y/useValidAnchor: hash routing
                  <a href="#/login" onClick={closeMobile}>
                    <Button
                      data-ocid="nav.mobile.login.button"
                      size="sm"
                      className="w-full text-xs font-semibold"
                      style={{
                        backgroundColor: "oklch(0.78 0.16 75)",
                        color: "oklch(0.12 0.04 250)",
                      }}
                    >
                      <LogIn className="w-3 h-3 mr-1" />
                      Login
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
