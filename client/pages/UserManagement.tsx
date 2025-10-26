import AppLayout from "@/components/AppLayout";
import { Users, Plus, Edit2, Trash2, Shield, Lock } from "lucide-react";

export default function UserManagement() {
  const teachers = [
    { id: 1, name: "Dr. Sarah Johnson", email: "sarah.johnson@school.edu", classes: "Class X-A, X-B", role: "Teacher" },
    { id: 2, name: "Prof. Michael Chen", email: "m.chen@school.edu", classes: "Class IX-A", role: "Teacher" },
    { id: 3, name: "Ms. Emma Wilson", email: "emma.wilson@school.edu", classes: "Class X-C, IX-C", role: "Teacher" },
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">User Management</h1>
              <p className="mt-2 text-foreground/70">
                Manage teacher accounts, assigned classes, and permissions
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-700">
              <Plus className="h-5 w-5" />
              Add Teacher
            </button>
          </div>

          {/* Security & Access Section */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold text-primary">Secure Login</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Teachers can securely log in with email and password authentication
              </p>
              <button className="mt-4 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-50">
                Configure Authentication
              </button>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mt-4 font-semibold text-secondary">Role-Based Access</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Control what data and features each teacher can access
              </p>
              <button className="mt-4 rounded-lg border border-secondary px-4 py-2 text-sm font-semibold text-secondary hover:bg-secondary-50">
                Manage Roles
              </button>
            </div>
          </div>

          {/* Teachers List */}
          <div className="mb-8 rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-primary">Teachers & Assigned Classes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Assigned Classes</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-border hover:bg-muted/30">
                      <td className="px-6 py-4 font-medium text-foreground">{teacher.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground/70">{teacher.email}</td>
                      <td className="px-6 py-4 text-sm text-foreground/70">{teacher.classes}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary">
                          {teacher.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg p-2 hover:bg-muted">
                            <Edit2 className="h-4 w-4 text-secondary" />
                          </button>
                          <button className="rounded-lg p-2 hover:bg-muted">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Data Management */}
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="mb-6 text-2xl font-bold text-primary">Student Data Management</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 border-b border-border pb-4">
                <Users className="mt-1 h-6 w-6 text-primary" />
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">View & Update Student Information</h3>
                  <p className="mt-1 text-sm text-foreground/70">
                    Teachers can view, update, and manage student data assigned to their classes
                  </p>
                  <button className="mt-3 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-50">
                    Manage Student Data
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-border pb-4 pt-4">
                <Shield className="mt-1 h-6 w-6 text-secondary" />
                <div className="flex-1">
                  <h3 className="font-semibold text-secondary">Privacy & Permissions</h3>
                  <p className="mt-1 text-sm text-foreground/70">
                    Control access to sensitive student data and ensure GDPR compliance
                  </p>
                  <button className="mt-3 rounded-lg border border-secondary px-4 py-2 text-sm font-semibold text-secondary hover:bg-secondary-50">
                    Configure Permissions
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4">
                <Lock className="mt-1 h-6 w-6 text-accent" />
                <div className="flex-1">
                  <h3 className="font-semibold text-accent">Audit Log</h3>
                  <p className="mt-1 text-sm text-foreground/70">
                    Track all changes and access to student data for security and compliance
                  </p>
                  <button className="mt-3 rounded-lg border border-accent px-4 py-2 text-sm font-semibold text-accent hover:bg-accent-50">
                    View Audit Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
