import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "@/components/AppLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <h1 className="text-3xl font-bold text-primary mb-2">Page Not Found</h1>
          <p className="text-lg text-foreground/70 mb-8">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary-700 hover:shadow-lg"
          >
            Return to Home
          </Link>
          <div className="mt-8 text-sm text-foreground/60">
            <p>Requested path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code></p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
