import AppLayout from "@/components/AppLayout";
import { BookOpen, Lightbulb, GraduationCap, Download } from "lucide-react";

const resources = [
  {
    title: "Innovative Teaching Methods",
    description: "Explore cutting-edge pedagogical approaches and classroom techniques",
    icon: Lightbulb,
  },
  {
    title: "Reference Materials",
    description: "Comprehensive guides and reference documents for different subjects",
    icon: BookOpen,
  },
  {
    title: "Professional Development",
    description: "Capacity building courses and training modules for educators",
    icon: GraduationCap,
  },
];

export default function Resources() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Teaching Resources</h1>
            <p className="mt-2 text-foreground/70">
              Capacity building materials with teaching tips, innovative methods, and reference materials
            </p>
          </div>

          {/* Resource Categories */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="rounded-lg border border-border bg-card p-8 transition-all hover:shadow-md hover:border-primary-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-primary">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-foreground/70">
                    {resource.description}
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-50">
                    <Download className="h-4 w-4" />
                    Explore
                  </button>
                </div>
              );
            })}
          </div>

          {/* Featured Resources */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-primary">Featured Resources</h2>
            <div className="space-y-4">
              {[
                "Differentiated Instruction: A Complete Guide",
                "Active Learning Strategies for Better Engagement",
                "Assessment Methods for Formative Feedback",
                "Technology in the Classroom: Best Practices",
                "Supporting Students with Learning Differences",
              ].map((title, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-primary-200">
                  <div className="flex items-center gap-4">
                    <Download className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="font-semibold text-primary">{title}</p>
                      <p className="text-sm text-foreground/70">PDF • 2.4 MB</p>
                    </div>
                  </div>
                  <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary-600">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="mb-6 text-2xl font-bold text-primary">Quick Teaching Tips</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Use visual aids to explain complex concepts",
                "Create a supportive classroom environment",
                "Provide regular feedback to students",
                "Use peer teaching opportunities",
                "Incorporate real-world applications",
                "Encourage critical thinking",
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 border-b border-border pb-4 last:border-b-0">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent-100">
                    <span className="text-sm font-bold text-accent">✓</span>
                  </div>
                  <p className="text-foreground/80">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
