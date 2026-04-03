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
import ApplyFormSection from "./components/ApplyFormSection";
import ContactSection from "./components/ContactSection";
import ErrorBoundary from "./components/ErrorBoundary";
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

function SiteLayout() {
  const [isLocalAdmin, setIsLocalAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminToggle = () => {
    if (isLocalAdmin) {
      setShowAdmin((p) => !p);
    } else {
      setShowAdminModal(true);
    }
  };

  const handleAdminLogout = () => {
    setIsLocalAdmin(false);
    setShowAdmin(false);
  };

  return (
    <ErrorBoundary>
      <Toaster position="top-right" richColors />
      {showAdmin && isLocalAdmin ? (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      ) : (
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: "oklch(0.12 0.04 258)" }}
        >
          <Header
            isAdmin={isLocalAdmin}
            isLoggedIn={false}
            showAdmin={showAdmin}
            onToggleAdmin={handleAdminToggle}
            onAdminLogout={handleAdminLogout}
            isLocalAdmin={isLocalAdmin}
          />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <FloatingSocialButtons />
          <AIChatbot />
        </div>
      )}
      <AdminLoginModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={() => {
          setIsLocalAdmin(true);
          setShowAdmin(true);
          setShowAdminModal(false);
        }}
      />
    </ErrorBoundary>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatsAppGroupBanner />
      <JobsSection isAdmin={false} />
      <ApplyFormSection />
      <ContactSection />
    </>
  );
}

const rootRoute = createRootRoute({ component: SiteLayout });

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

const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    servicesRoute,
    aboutRoute,
    candidatesRoute,
    blogsRoute,
    signupRoute,
    loginRoute,
  ]),
  history: createHashHistory(),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
