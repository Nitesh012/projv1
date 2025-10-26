import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, LogOut, Settings } from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Student Analytics", path: "/student-analytics" },
  { label: "Remedial Plans", path: "/remedial-plans" },
  { label: "Resources", path: "/resources" },
  { label: "Reports", path: "/reports" },
  { label: "User Management", path: "/user-management" },
];

export default function AppLayout({
  children,
  isHomePage = false,
}: {
  children: React.ReactNode;
  isHomePage?: boolean;
}) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white font-bold text-lg">
              M
            </div>
            <span className="hidden text-lg font-bold text-primary sm:inline">
              Mentor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center gap-1 px-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden rounded-lg p-2 hover:bg-muted sm:inline">
              <Settings className="h-5 w-5 text-foreground" />
            </button>
            <button className="hidden rounded-lg p-2 hover:bg-muted sm:inline">
              <LogOut className="h-5 w-5 text-foreground" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 hover:bg-muted md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-border px-6 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      {isHomePage ? (
        children
      ) : (
        <main className="flex-1 overflow-auto bg-background">
          <div className="h-full">{children}</div>
        </main>
      )}
    </div>
  );
}
