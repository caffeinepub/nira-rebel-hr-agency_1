import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import AIChatbot from "./components/AIChatbot";
import AdminLoginModal from "./components/AdminLoginModal";
import AdminPanel from "./components/AdminPanel";
import ContactSection from "./components/ContactSection";
import FloatingSocialButtons from "./components/FloatingSocialButtons";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import JobsSection from "./components/JobsSection";
import WhatsAppGroupBanner from "./components/WhatsAppGroupBanner";
import AboutPage from "./components/pages/AboutPage";
import BlogsPage from "./components/pages/BlogsPage";
import CandidatesPage from "./components/pages/CandidatesPage";
import LoginPage from "./components/pages/LoginPage";
import ServicesPage from "./components/pages/ServicesPage";
import SignupPage from "./components/pages/SignupPage";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useIsAdmin } from "./hooks/useQueries";

// ─── Home page ────────────────────────────────────────────────────────────────
function HomePage() {
  const { data: isAdmin } = useIsAdmin();
  const isLocalAdmin = localStorage.getItem("nira_admin_auth") === "true";
  return (
    <>
      <HeroSection />
      <JobsSection isAdmin={!!isAdmin || isLocalAdmin} />
      <ContactSection />
      <Footer />
    </>
  );
}

// ─── Root layout (shared shell) ───────────────────────────────────────────────
function RootLayout() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLocalAdmin, setIsLocalAdmin] = useState(
    () => localStorage.getItem("nira_admin_auth") === "true",
  );
  const { data: isAdminFromICP } = useIsAdmin();
  const { identity } = useInternetIdentity();

  const isAdmin = !!isAdminFromICP || isLocalAdmin;

  const handleLocalAdminLogin = () => {
    setIsLocalAdmin(true);
    setShowLoginModal(false);
    setShowAdmin(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("nira_admin_auth");
    setIsLocalAdmin(false);
    setShowAdmin(false);
  };

  const handleToggleAdmin = () => {
    if (!isAdmin) {
      setShowLoginModal(true);
    } else {
      setShowAdmin((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" richColors />
      <WhatsAppGroupBanner />
      <Header
        isAdmin={isAdmin}
        isLoggedIn={!!identity}
        showAdmin={showAdmin}
        onToggleAdmin={handleToggleAdmin}
        onAdminLogout={handleAdminLogout}
        isLocalAdmin={isLocalAdmin}
      />
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLocalAdminLogin}
      />
      {showAdmin && isAdmin ? (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      ) : (
        <Outlet />
      )}
      <FloatingSocialButtons />
      <AIChatbot />
    </div>
  );
}

// ─── Not Found fallback ───────────────────────────────────────────────────────
function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: "oklch(0.88 0.12 80)" }}
      >
        Page Not Found
      </h2>
      <p className="mb-4" style={{ color: "oklch(0.7 0.05 240)" }}>
        Yeh page exist nahi karta. Home par wapas jayein.
      </p>
      <a
        href="#/"
        className="px-4 py-2 rounded font-semibold text-sm"
        style={{
          backgroundColor: "oklch(0.78 0.16 75)",
          color: "oklch(0.12 0.04 250)",
        }}
      >
        Home Par Jayein
      </a>
    </div>
  );
}

// ─── Route tree ───────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const candidatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/candidates",
  component: CandidatesPage,
});

const blogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blogs",
  component: BlogsPage,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  aboutRoute,
  candidatesRoute,
  blogsRoute,
  signupRoute,
  loginRoute,
]);

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  history: hashHistory,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
