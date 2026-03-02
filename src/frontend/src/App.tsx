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
  return (
    <>
      <HeroSection />
      <JobsSection isAdmin={!!isAdmin} />
      <ContactSection />
      <Footer />
    </>
  );
}

// ─── Root layout (shared shell) ───────────────────────────────────────────────
function RootLayout() {
  const [showAdmin, setShowAdmin] = useState(false);
  const { data: isAdmin } = useIsAdmin();
  const { identity } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" richColors />
      <WhatsAppGroupBanner />
      <Header
        isAdmin={!!isAdmin}
        isLoggedIn={!!identity}
        showAdmin={showAdmin}
        onToggleAdmin={() => setShowAdmin((prev) => !prev)}
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

// ─── Route tree ───────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: RootLayout });

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
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
