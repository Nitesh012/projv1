import AppLayout from "@/components/AppLayout";
import { Target, TrendingUp, BookMarked } from "lucide-react";

export default function RemedialPlans() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Remedial Plans</h1>
            <p className="mt-2 text-foreground/70">
              Suggest remedial teaching methods based on performance data and track student progress
            </p>
          </div>

          <div className="space-y-6">
            {/* Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 font-semibold text-primary">Create Plans</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  AI-powered suggestions for remedial teaching strategies
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mt-4 font-semibold text-primary">Track Progress</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Monitor student improvement over time with detailed metrics
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                  <BookMarked className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-primary">Resources</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Access teaching materials and remedial strategies
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <h2 className="text-2xl font-semibold text-primary">Get Started with Remedial Plans</h2>
              <p className="mt-4 text-foreground/70">
                Select students who need support and generate personalized remedial teaching plans based on their performance data.
              </p>
              <button className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-700">
                Create New Plan
              </button>
            </div>

            {/* Example Plans */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Example Remedial Strategies</h3>
              <div className="space-y-2 rounded-lg border border-border bg-card p-6">
                <div className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <span className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">1</span>
                  <div>
                    <p className="font-semibold text-primary">Concept Reinforcement</p>
                    <p className="text-sm text-foreground/70">Review fundamental concepts with visual aids and real-world examples</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">2</span>
                  <div>
                    <p className="font-semibold text-secondary">Peer Learning Groups</p>
                    <p className="text-sm text-foreground/70">Pair struggling students with high performers for collaborative learning</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">3</span>
                  <div>
                    <p className="font-semibold text-accent">Practice & Assessment</p>
                    <p className="text-sm text-foreground/70">Implement regular short quizzes and practice sessions with feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
