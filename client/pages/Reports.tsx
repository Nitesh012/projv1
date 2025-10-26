import AppLayout from "@/components/AppLayout";
import { BarChart3, TrendingUp, PieChart, Download } from "lucide-react";

export default function Reports() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Reports & Visuals</h1>
            <p className="mt-2 text-foreground/70">
              Charts, graphs, and tables to visualize student performance and improvement over time
            </p>
          </div>

          {/* Report Types */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-8 transition-all hover:shadow-md hover:border-primary-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary">
                Performance Comparison
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                Compare student performance across subjects and time periods
              </p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-700">
                Generate Report
              </button>
            </div>

            <div className="rounded-lg border border-border bg-card p-8 transition-all hover:shadow-md hover:border-primary-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-secondary">
                Progress Trends
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                Analyze improvement trends for individual students
              </p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary-700">
                Generate Report
              </button>
            </div>

            <div className="rounded-lg border border-border bg-card p-8 transition-all hover:shadow-md hover:border-primary-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100">
                <PieChart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-accent">
                Distribution Analysis
              </h3>
              <p className="mt-2 text-sm text-foreground/70">
                View distribution of performance levels in your class
              </p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-700">
                Generate Report
              </button>
            </div>
          </div>

          {/* Generated Reports */}
          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-bold text-primary">Recent Reports</h2>
            <div className="space-y-4">
              {[
                { name: "Class X-A Performance Summary", date: "Jan 15, 2024", type: "Summary" },
                { name: "Monthly Progress Analysis", date: "Jan 10, 2024", type: "Trend" },
                { name: "Subject-wise Comparison", date: "Jan 8, 2024", type: "Comparison" },
                { name: "At-Risk Students Report", date: "Jan 5, 2024", type: "Alert" },
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-primary-200"
                >
                  <div className="flex items-center gap-4">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="font-semibold text-primary">{report.name}</p>
                      <p className="text-sm text-foreground/70">{report.date} • {report.type}</p>
                    </div>
                  </div>
                  <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-700">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Customization Options */}
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="mb-6 text-2xl font-bold text-primary">Create Custom Report</h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-foreground">Select Class</label>
                  <select className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground">
                    <option>Class X-A</option>
                    <option>Class X-B</option>
                    <option>Class IX-A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground">Report Type</label>
                  <select className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground">
                    <option>Performance Summary</option>
                    <option>Progress Trend</option>
                    <option>Subject Analysis</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground">Date Range</label>
                <div className="mt-2 flex gap-2">
                  <input type="date" className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground" />
                  <input type="date" className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground" />
                </div>
              </div>
              <button className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-700">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
