import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

function SitePaused() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "oklch(0.12 0.04 250)" }}
    >
      <Toaster position="top-right" richColors />
      <div
        className="rounded-2xl p-10 max-w-md w-full shadow-2xl"
        style={{
          background: "oklch(0.18 0.05 250)",
          border: "1px solid oklch(0.3 0.06 250)",
        }}
      >
        <div className="mb-6">
          <img
            src="/assets/uploads/WhatsApp-Image-2026-03-02-at-6.45.04-PM-1-1.jpeg"
            alt="Nira Rebel HR Agency"
            className="h-20 w-auto mx-auto object-contain rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: "oklch(0.88 0.12 80)" }}
        >
          Nira Rebel HR Agency
        </h1>
        <div
          className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
          style={{ background: "oklch(0.55 0.18 25)", color: "white" }}
        >
          Website Abhi Band Hai
        </div>
        <p className="text-base mb-2" style={{ color: "oklch(0.75 0.05 240)" }}>
          Hum jald hi wapas aayenge.
        </p>
        <p className="text-sm" style={{ color: "oklch(0.55 0.04 240)" }}>
          We will be back soon. Thank you for your patience.
        </p>
        <div
          className="mt-8 pt-6"
          style={{ borderTop: "1px solid oklch(0.28 0.05 250)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.45 0.04 240)" }}>
            38, Central Ave, Pocket C, Raju Park, Sangam Vihar, New Delhi, Delhi
            110080
          </p>
        </div>
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({ component: Outlet });

const makeRoute = (path: string) =>
  createRoute({ getParentRoute: () => rootRoute, path, component: SitePaused });

const router = createRouter({
  routeTree: rootRoute.addChildren([
    makeRoute("/"),
    makeRoute("/services"),
    makeRoute("/about"),
    makeRoute("/candidates"),
    makeRoute("/blogs"),
    makeRoute("/signup"),
    makeRoute("/login"),
  ]),
  history: createHashHistory(),
  defaultNotFoundComponent: SitePaused,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
