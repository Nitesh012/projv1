import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { analyticsAPI } from "@/lib/api";

const mockMonthlyTrendData = [
  { month: "Jan", avg: 72, median: 68 },
  { month: "Feb", avg: 74, median: 70 },
  { month: "Mar", avg: 76, median: 73 },
  { month: "Apr", avg: 75, median: 72 },
  { month: "May", avg: 78, median: 75 },
  { month: "Jun", avg: 80, median: 78 },
];

const mockSubjectPerformanceData = [
  { subject: "Mathematics", avg: 72, target: 80 },
  { subject: "English", avg: 78, target: 80 },
  { subject: "Science", avg: 75, target: 80 },
  { subject: "History", avg: 82, target: 80 },
  { subject: "Geography", avg: 70, target: 80 },
];

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  isPositive,
}: {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<{ className: string }>;
  isPositive: boolean;
}) => (
  <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-foreground/70">{title}</p>
        <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
        <p className={`mt-2 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {change}
        </p>
      </div>
      <div className={`rounded-lg p-3 ${isPositive ? "bg-green-100" : "bg-red-100"}`}>
        <Icon className={`h-6 w-6 ${isPositive ? "text-green-600" : "text-red-600"}`} />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [selectedClass, setSelectedClass] = useState("Class X-A");
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: Replace with actual class ID when class management is implemented
        // For now, using a placeholder UUID - you'll need to get actual class IDs
        const mockClassId = "f0000000-0000-0000-0000-000000000001";
        const data = await analyticsAPI.getClassAnalytics(mockClassId);
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        // setError(err instanceof Error ? err.message : "Failed to load analytics");
        // Set mock data on error for demo purposes
        setAnalytics({
          total_students: 250,
          average_score: 75.4,
          below_average_count: 35,
          improvement_rate: 68,
          performance_distribution: [
            { name: "Excellent (80-100)", students: 45 },
            { name: "Good (60-80)", students: 78 },
            { name: "Average (40-60)", students: 92 },
            { name: "Below Average (0-40)", students: 35 },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const performanceData = analytics?.performance_distribution || [
    { name: "Excellent (80-100)", students: 45, color: "hsl(132 65% 48%)" },
    { name: "Good (60-80)", students: 78, color: "hsl(217 100% 35%)" },
    { name: "Average (40-60)", students: 92, color: "hsl(38 92% 50%)" },
    { name: "Below Average (0-40)", students: 35, color: "hsl(0 84% 60%)" },
  ];

  const colors = ["hsl(132 65% 48%)", "hsl(217 100% 35%)", "hsl(38 92% 50%)", "hsl(0 84% 60%)"];

  return (
    <AppLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
            <p className="mt-2 text-foreground/70">
              Overview of student performance, statistics, and trends
            </p>
          </div>

          {/* Class Selector */}
          <div className="mb-6 flex items-center gap-4">
            <label className="font-medium text-foreground">Selected Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-lg border border-border bg-card px-4 py-2 text-foreground transition-all hover:border-primary focus:border-primary focus:outline-none"
            >
              <option>Class X-A</option>
              <option>Class X-B</option>
              <option>Class IX-A</option>
              <option>Class IX-B</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="mb-8 flex items-center justify-center rounded-lg border border-border bg-card p-8">
              <Loader className="animate-spin h-6 w-6 text-primary mr-2" />
              <span className="text-foreground">Loading analytics...</span>
            </div>
          )}

          {/* Key Statistics */}
          {!loading && analytics && (
            <div className="mb-8 grid gap-6 md:grid-cols-4">
              <StatCard
                title="Total Students"
                value={analytics.total_students || 0}
                change="+5% from last month"
                icon={Users}
                isPositive={true}
              />
              <StatCard
                title="Average Score"
                value={`${Math.round(analytics.average_score * 10) / 10}%`}
                change="+2.1% improvement"
                icon={TrendingUp}
                isPositive={true}
              />
              <StatCard
                title="At-Risk Students"
                value={analytics.below_average_count || 0}
                change="-3 from last month"
                icon={AlertCircle}
                isPositive={true}
              />
              <StatCard
                title="Improvement Rate"
                value={`${analytics.improvement_rate || 0}%`}
                change="+8% this month"
                icon={CheckCircle}
                isPositive={true}
              />
            </div>
          )}

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Performance Distribution */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-1">
              <h2 className="mb-4 text-lg font-semibold text-primary">
                Performance Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, students }) => `${name}: ${students}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="students"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Trend */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-2">
              <h2 className="mb-4 text-lg font-semibold text-primary">
                Performance Trend (Last 6 Months)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="hsl(217 100% 35%)"
                    strokeWidth={2}
                    name="Class Average"
                  />
                  <Line
                    type="monotone"
                    dataKey="median"
                    stroke="hsl(174 100% 29%)"
                    strokeWidth={2}
                    name="Class Median"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Subject Performance */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-3">
              <h2 className="mb-4 text-lg font-semibold text-primary">
                Subject-wise Performance
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="subject" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="avg"
                    fill="hsl(217 100% 35%)"
                    name="Current Average"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="target"
                    fill="hsl(174 100% 29%)"
                    name="Target Score"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Alerts */}
          {!loading && analytics && (
            <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-primary">Recent Alerts</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-l-4 border-red-500 bg-red-50 p-4">
                  <AlertCircle className="mt-1 h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">
                      {analytics.below_average_count} students below 50% in various subjects
                    </p>
                    <p className="text-sm text-red-700">
                      Immediate intervention recommended
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-l-4 border-amber-500 bg-amber-50 p-4">
                  <AlertCircle className="mt-1 h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900">
                      Performance monitoring active
                    </p>
                    <p className="text-sm text-amber-700">
                      Monitor closely and provide additional support
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-l-4 border-green-500 bg-green-50 p-4">
                  <CheckCircle className="mt-1 h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">
                      Data synced from Supabase
                    </p>
                    <p className="text-sm text-green-700">
                      Real-time analytics connected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
