import { RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const handleUploadMarks: RequestHandler = async (req, res) => {
  try {
    const { marks, class_id, teacher_id } = req.body;

    if (!marks || !Array.isArray(marks) || !class_id || !teacher_id) {
      res.status(400).json({ error: "Invalid input data" });
      return;
    }

    const marksToInsert = marks.map((mark: any) => ({
      student_id: mark.student_id,
      subject_id: mark.subject_id,
      class_id,
      marks_obtained: mark.marks_obtained,
      total_marks: mark.total_marks,
      assessment_date: mark.assessment_date,
      assessment_type: mark.assessment_type || "Test",
      teacher_id,
    }));

    const { data: insertedMarks, error } = await supabase
      .from("student_marks")
      .insert(marksToInsert)
      .select();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json({
      success: true,
      count: insertedMarks?.length || 0,
      data: insertedMarks,
    });
  } catch (error) {
    console.error("Upload marks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetClassAnalytics: RequestHandler = async (req, res) => {
  try {
    const classId = req.query.class_id as string;

    if (!classId) {
      res.status(400).json({ error: "Class ID is required" });
      return;
    }

    // Get all marks for the class
    const { data: marks, error: marksError } = await supabase
      .from("student_marks")
      .select("*")
      .eq("class_id", classId);

    if (marksError) {
      res.status(400).json({ error: marksError.message });
      return;
    }

    if (!marks || marks.length === 0) {
      res.json({
        total_students: 0,
        average_score: 0,
        below_average_count: 0,
        improvement_rate: 0,
        performance_distribution: [],
        monthly_trend: [],
        subject_performance: [],
      });
      return;
    }

    // Calculate statistics
    const percentages = marks.map((m: any) => m.percentage || 0);
    const averageScore =
      percentages.reduce((a, b) => a + b, 0) / percentages.length;
    const belowAverageCount = percentages.filter((p: any) => p < 50).length;
    const totalStudents = new Set(marks.map((m: any) => m.student_id)).size;

    // Performance distribution
    const performanceDistribution = [
      {
        name: "Excellent (80-100)",
        students: percentages.filter((p: any) => p >= 80).length,
      },
      {
        name: "Good (60-80)",
        students: percentages.filter((p: any) => p >= 60 && p < 80).length,
      },
      {
        name: "Average (40-60)",
        students: percentages.filter((p: any) => p >= 40 && p < 60).length,
      },
      {
        name: "Below Average (0-40)",
        students: percentages.filter((p: any) => p < 40).length,
      },
    ];

    // Subject performance
    const subjectMap: any = {};
    marks.forEach((mark: any) => {
      if (!subjectMap[mark.subject_id]) {
        subjectMap[mark.subject_id] = {
          subject_id: mark.subject_id,
          scores: [],
        };
      }
      subjectMap[mark.subject_id].scores.push(mark.percentage || 0);
    });

    const subjectPerformance = Object.values(subjectMap).map((subject: any) => ({
      subject_id: subject.subject_id,
      average: subject.scores.reduce((a: any, b: any) => a + b, 0) / subject.scores.length,
      count: subject.scores.length,
    }));

    res.json({
      total_students: totalStudents,
      average_score: Math.round(averageScore * 100) / 100,
      below_average_count: belowAverageCount,
      improvement_rate: 0, // Will be calculated when there are multiple assessment periods
      performance_distribution: performanceDistribution,
      subject_performance: subjectPerformance,
      total_marks: marks.length,
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetStudentMarks: RequestHandler = async (req, res) => {
  try {
    const studentId = req.query.student_id as string;

    if (!studentId) {
      res.status(400).json({ error: "Student ID is required" });
      return;
    }

    const { data: marks, error } = await supabase
      .from("student_marks")
      .select("*")
      .eq("student_id", studentId);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(marks || []);
  } catch (error) {
    console.error("Get student marks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetSubjects: RequestHandler = async (req, res) => {
  try {
    const { data: subjects, error } = await supabase
      .from("subjects")
      .select("*");

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(subjects || []);
  } catch (error) {
    console.error("Get subjects error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
