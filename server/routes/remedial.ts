import { RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const handleCreateRemedialPlan: RequestHandler = async (req, res) => {
  try {
    const {
      student_id,
      class_id,
      teacher_id,
      subject_id,
      title,
      description,
      suggested_methods,
      start_date,
      end_date,
    } = req.body;

    if (!student_id || !class_id || !teacher_id || !subject_id || !title || !start_date) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const { data: plan, error } = await supabase
      .from("remedial_plans")
      .insert({
        student_id,
        class_id,
        teacher_id,
        subject_id,
        title,
        description,
        suggested_methods,
        start_date,
        end_date,
        status: "Active",
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json(plan);
  } catch (error) {
    console.error("Create remedial plan error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetRemedialPlans: RequestHandler = async (req, res) => {
  try {
    const studentId = req.query.student_id as string;
    const classId = req.query.class_id as string;

    let query = supabase.from("remedial_plans").select("*");

    if (studentId) {
      query = query.eq("student_id", studentId);
    }
    if (classId) {
      query = query.eq("class_id", classId);
    }

    const { data: plans, error } = await query;

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(plans || []);
  } catch (error) {
    console.error("Get remedial plans error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleUpdateRemedialPlanProgress: RequestHandler = async (req, res) => {
  try {
    const { plan_id } = req.params;
    const { progress_percentage, notes, assessment_score, completion_status, recorded_by } = req.body;

    if (!plan_id) {
      res.status(400).json({ error: "Plan ID is required" });
      return;
    }

    const { data: progress, error } = await supabase
      .from("remedial_plan_progress")
      .insert({
        remedial_plan_id: plan_id,
        progress_percentage: progress_percentage || 0,
        notes,
        assessment_score,
        completion_status: completion_status || "In Progress",
        recorded_by,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json(progress);
  } catch (error) {
    console.error("Update progress error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetPlanProgress: RequestHandler = async (req, res) => {
  try {
    const planId = req.query.plan_id as string;

    if (!planId) {
      res.status(400).json({ error: "Plan ID is required" });
      return;
    }

    const { data: progress, error } = await supabase
      .from("remedial_plan_progress")
      .select("*")
      .eq("remedial_plan_id", planId);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(progress || []);
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
