-- Users (Teachers/Admin)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('teacher', 'admin')) DEFAULT 'teacher',
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Classes
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  section TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  total_students INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Students
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  roll_number TEXT NOT NULL,
  email TEXT,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(class_id, roll_number)
);

-- Subjects
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Student Marks/Assessments
CREATE TABLE IF NOT EXISTS student_marks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  marks_obtained NUMERIC NOT NULL,
  total_marks NUMERIC NOT NULL,
  percentage NUMERIC GENERATED ALWAYS AS (
    ROUND((marks_obtained / total_marks) * 100, 2)
  ) STORED,
  assessment_date DATE NOT NULL,
  assessment_type TEXT NOT NULL,
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Remedial Plans
CREATE TABLE IF NOT EXISTS remedial_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  suggested_methods TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT NOT NULL CHECK (status IN ('Active', 'Completed', 'On Hold')) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Remedial Plan Progress
CREATE TABLE IF NOT EXISTS remedial_plan_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  remedial_plan_id UUID NOT NULL REFERENCES remedial_plans(id) ON DELETE CASCADE,
  progress_percentage INTEGER DEFAULT 0,
  notes TEXT,
  assessment_score NUMERIC,
  completion_status TEXT NOT NULL CHECK (completion_status IN ('Not Started', 'In Progress', 'Completed')) DEFAULT 'Not Started',
  recorded_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Teaching Resources
CREATE TABLE IF NOT EXISTS teaching_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  resource_type TEXT NOT NULL,
  content TEXT,
  file_url TEXT,
  category TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  report_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  data JSONB,
  generated_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Dashboard Statistics Cache
CREATE TABLE IF NOT EXISTS dashboard_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  total_students INTEGER DEFAULT 0,
  average_score NUMERIC DEFAULT 0,
  below_average_count INTEGER DEFAULT 0,
  improvement_rate NUMERIC DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_students_class_id ON students(class_id);
CREATE INDEX IF NOT EXISTS idx_student_marks_student_id ON student_marks(student_id);
CREATE INDEX IF NOT EXISTS idx_student_marks_class_id ON student_marks(class_id);
CREATE INDEX IF NOT EXISTS idx_student_marks_subject_id ON student_marks(subject_id);
CREATE INDEX IF NOT EXISTS idx_remedial_plans_student_id ON remedial_plans(student_id);
CREATE INDEX IF NOT EXISTS idx_remedial_plans_class_id ON remedial_plans(class_id);
CREATE INDEX IF NOT EXISTS idx_remedial_plan_progress_plan_id ON remedial_plan_progress(remedial_plan_id);
CREATE INDEX IF NOT EXISTS idx_reports_class_id ON reports(class_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_stats_class_id ON dashboard_statistics(class_id);

-- Insert default subjects
INSERT INTO subjects (name) VALUES 
  ('Mathematics'),
  ('English'),
  ('Science'),
  ('History'),
  ('Geography'),
  ('Physical Education'),
  ('Art'),
  ('Computer Science')
ON CONFLICT DO NOTHING;
