import { RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const handleGetClasses: RequestHandler = async (req, res) => {
  try {
    const teacherId = req.query.teacher_id as string;

    let query = supabase.from("classes").select("*");

    if (teacherId) {
      query = query.eq("teacher_id", teacherId);
    }

    const { data: classes, error } = await query;

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(classes);
  } catch (error) {
    console.error("Get classes error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetClassById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: classData, error } = await supabase
      .from("classes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !classData) {
      res.status(404).json({ error: "Class not found" });
      return;
    }

    res.json(classData);
  } catch (error) {
    console.error("Get class error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleCreateClass: RequestHandler = async (req, res) => {
  try {
    const { name, teacher_id, section, grade_level } = req.body;

    if (!name || !teacher_id || !section || !grade_level) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const { data: newClass, error } = await supabase
      .from("classes")
      .insert({
        name,
        teacher_id,
        section,
        grade_level,
        total_students: 0,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json(newClass);
  } catch (error) {
    console.error("Create class error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetStudents: RequestHandler = async (req, res) => {
  try {
    const classId = req.query.class_id as string;

    if (!classId) {
      res.status(400).json({ error: "Class ID is required" });
      return;
    }

    const { data: students, error } = await supabase
      .from("students")
      .select("*")
      .eq("class_id", classId);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(students);
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleCreateStudent: RequestHandler = async (req, res) => {
  try {
    const { name, roll_number, email, class_id } = req.body;

    if (!name || !roll_number || !class_id) {
      res.status(400).json({ error: "Name, roll number, and class are required" });
      return;
    }

    const { data: newStudent, error } = await supabase
      .from("students")
      .insert({
        name,
        roll_number,
        email,
        class_id,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
