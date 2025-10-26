// API Service Layer for frontend

const API_BASE = '/api';

// Helper function to make API calls
async function apiCall(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `API error: ${response.statusText}`);
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, first_name: string, last_name: string, role?: string) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, first_name, last_name, role }),
    }),

  getUser: (id: string) =>
    apiCall(`/auth/user?id=${id}`),
};

// Classes API
export const classesAPI = {
  getClasses: (teacherId?: string) => {
    const query = teacherId ? `?teacher_id=${teacherId}` : '';
    return apiCall(`/classes${query}`);
  },

  getClassById: (id: string) =>
    apiCall(`/classes/${id}`),

  createClass: (name: string, teacher_id: string, section: string, grade_level: string) =>
    apiCall('/classes', {
      method: 'POST',
      body: JSON.stringify({ name, teacher_id, section, grade_level }),
    }),

  getStudents: (classId: string) =>
    apiCall(`/students?class_id=${classId}`),

  createStudent: (name: string, roll_number: string, class_id: string, email?: string) =>
    apiCall('/students', {
      method: 'POST',
      body: JSON.stringify({ name, roll_number, email, class_id }),
    }),
};

// Analytics API
export const analyticsAPI = {
  uploadMarks: (marks: any[], class_id: string, teacher_id: string) =>
    apiCall('/marks/upload', {
      method: 'POST',
      body: JSON.stringify({ marks, class_id, teacher_id }),
    }),

  getClassAnalytics: (classId: string) =>
    apiCall(`/analytics/class?class_id=${classId}`),

  getStudentMarks: (studentId: string) =>
    apiCall(`/marks/student?student_id=${studentId}`),

  getSubjects: () =>
    apiCall('/subjects'),
};

// Remedial Plans API
export const remedialAPI = {
  createPlan: (
    student_id: string,
    class_id: string,
    teacher_id: string,
    subject_id: string,
    title: string,
    description?: string,
    suggested_methods?: string,
    start_date?: string,
    end_date?: string
  ) =>
    apiCall('/remedial-plans', {
      method: 'POST',
      body: JSON.stringify({
        student_id,
        class_id,
        teacher_id,
        subject_id,
        title,
        description,
        suggested_methods,
        start_date,
        end_date,
      }),
    }),

  getPlans: (studentId?: string, classId?: string) => {
    const params = new URLSearchParams();
    if (studentId) params.append('student_id', studentId);
    if (classId) params.append('class_id', classId);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall(`/remedial-plans${query}`);
  },

  updateProgress: (
    plan_id: string,
    progress_percentage: number,
    recorded_by: string,
    notes?: string,
    assessment_score?: number,
    completion_status?: string
  ) =>
    apiCall(`/remedial-plans/${plan_id}/progress`, {
      method: 'POST',
      body: JSON.stringify({
        progress_percentage,
        notes,
        assessment_score,
        completion_status,
        recorded_by,
      }),
    }),

  getPlanProgress: (plan_id: string) =>
    apiCall(`/remedial-plans/${plan_id}/progress`),
};
