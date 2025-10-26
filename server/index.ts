import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleRegister, handleGetUser } from "./routes/auth";
import {
  handleGetClasses,
  handleGetClassById,
  handleCreateClass,
  handleGetStudents,
  handleCreateStudent,
} from "./routes/classes";
import {
  handleUploadMarks,
  handleGetClassAnalytics,
  handleGetStudentMarks,
  handleGetSubjects,
} from "./routes/analytics";
import {
  handleCreateRemedialPlan,
  handleGetRemedialPlans,
  handleUpdateRemedialPlanProgress,
  handleGetPlanProgress,
} from "./routes/remedial";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/register", handleRegister);
  app.get("/api/auth/user", handleGetUser);

  // Classes routes
  app.get("/api/classes", handleGetClasses);
  app.get("/api/classes/:id", handleGetClassById);
  app.post("/api/classes", handleCreateClass);

  // Students routes
  app.get("/api/students", handleGetStudents);
  app.post("/api/students", handleCreateStudent);

  // Analytics routes
  app.post("/api/marks/upload", handleUploadMarks);
  app.get("/api/analytics/class", handleGetClassAnalytics);
  app.get("/api/marks/student", handleGetStudentMarks);
  app.get("/api/subjects", handleGetSubjects);

  // Remedial plans routes
  app.post("/api/remedial-plans", handleCreateRemedialPlan);
  app.get("/api/remedial-plans", handleGetRemedialPlans);
  app.post("/api/remedial-plans/:plan_id/progress", handleUpdateRemedialPlanProgress);
  app.get("/api/remedial-plans/:plan_id/progress", handleGetPlanProgress);

  return app;
}
