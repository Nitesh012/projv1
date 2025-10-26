import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, BookOpen, TrendingUp, Target, Zap } from "lucide-react";
import AppLayout from "@/components/AppLayout";

export default function Index() {
  return (
    <AppLayout isHomePage={true}>
      <div className="min-h-screen bg-gradient-to-b from-background to-primary-50">
        {/* Hero Section */}
        <section className="relative px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Identify & Support Slow Learners
            </h1>
            <p className="mb-8 text-lg text-foreground/80 sm:text-xl">
              A modern, data-driven platform designed for colleges to identify struggling students early and provide targeted remedial support through innovative teaching strategies.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/student-analytics"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-3 font-semibold text-primary transition-all hover:bg-primary-50"
              >
                Analyze Students
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-primary sm:text-4xl">
              Powerful Features for Educators
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1: Dashboard */}
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary-200">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  Dashboard
                </h3>
                <p className="text-foreground/70">
                  Get an overview of student performance, key statistics, and performance trends at a glance.
                </p>
              </div>

              {/* Feature 2: Student Analytics */}
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary-200">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-secondary">
                  Student Analytics
                </h3>
                <p className="text-foreground/70">
                  Upload student marks, analyze performance, generate detailed reports, and automatically sort by performance.
                </p>
              </div>

              {/* Feature 3: Remedial Plans */}
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary-200">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-accent">
                  Remedial Plans
                </h3>
                <p className="text-foreground/70">
                  Receive AI-powered suggestions for remedial teaching methods and track student progress over time.
                </p>
              </div>

              {/* Feature 4: Teaching Resources */}
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary-200">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                  <BookOpen className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-teal-600">
                  Teaching Resources
                </h3>
                <p className="text-foreground/70">
                  Access capacity building materials, innovative teaching methods, and reference materials for educators.
                </p>
              </div>

              {/* Feature 5: Reports & Visuals */}
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary-200">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-blue-600">
                  Reports & Visuals
                </h3>
                <p className="text-foreground/70">
                  Beautiful charts, graphs, and tables to visualize student performance and improvement trends.
                </p>
              </div>

              {/* Feature 6: User Management */}
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary-200">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-purple-600">
                  User Management
                </h3>
                <p className="text-foreground/70">
                  Secure login for teachers, view assigned classes, and manage student data with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-primary-50 px-6 py-16 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary">
              Ready to Support Your Students?
            </h2>
            <p className="mb-8 text-lg text-foreground/70">
              Start identifying slow learners and planning targeted remedial interventions today.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary-700 hover:shadow-lg"
            >
              Access Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h4 className="mb-4 font-semibold text-primary">Mentor</h4>
                <p className="text-sm text-foreground/70">
                  Supporting educational excellence through data-driven insights.
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold text-foreground">Features</h4>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
                  <li><Link to="/student-analytics" className="hover:text-primary">Analytics</Link></li>
                  <li><Link to="/remedial-plans" className="hover:text-primary">Remedial Plans</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold text-foreground">Resources</h4>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li><Link to="/resources" className="hover:text-primary">Teaching Materials</Link></li>
                  <li><Link to="/reports" className="hover:text-primary">Reports</Link></li>
                  <li><Link to="/user-management" className="hover:text-primary">Management</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold text-foreground">Support</h4>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li><a href="#" className="hover:text-primary">Documentation</a></li>
                  <li><a href="#" className="hover:text-primary">Help Center</a></li>
                  <li><a href="#" className="hover:text-primary">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-8 text-center text-sm text-foreground/60">
              <p>&copy; 2024 Mentor. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
}
