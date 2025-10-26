import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Upload, FileText, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { analyticsAPI } from "@/lib/api";

export default function StudentAnalytics() {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadStatus('idle');

      // Parse CSV file (simplified - in production use a proper CSV parser)
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',');

      const marks = lines.slice(1).filter(line => line.trim()).map(line => {
        const values = line.split(',');
        return {
          student_id: values[0],
          subject_id: values[1],
          marks_obtained: parseFloat(values[2]),
          total_marks: parseFloat(values[3]),
          assessment_date: new Date().toISOString().split('T')[0],
          assessment_type: 'Unit Test',
        };
      });

      // Upload marks via API
      const response = await analyticsAPI.uploadMarks(
        marks,
        'f0000000-0000-0000-0000-000000000001', // Mock class ID
        'f0000000-0000-0000-0000-000000000002'  // Mock teacher ID
      );

      setUploadStatus('success');
      setUploadMessage(`Successfully uploaded ${response.count} student records`);
    } catch (error) {
      setUploadStatus('error');
      setUploadMessage(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Student Analytics</h1>
            <p className="mt-2 text-foreground/70">
              Upload and analyze student marks, generate reports, and automatically sort students based on performance
            </p>
          </div>

          <div className="space-y-6">
            {/* Upload Section */}
            <div className="rounded-lg border-2 border-dashed border-primary bg-primary-50 p-12 text-center">
              <Upload className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 text-xl font-semibold text-primary">Upload Student Marks</h2>
              <p className="mt-2 text-foreground/70">
                Upload CSV or Excel files containing student performance data
              </p>
              <div className="mt-6">
                <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-700 transition-all">
                  {uploading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Upload File
                    </>
                  )}
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Upload Status Messages */}
              {uploadStatus === 'success' && (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-100 p-4 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>{uploadMessage}</span>
                </div>
              )}
              {uploadStatus === 'error' && (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-red-100 p-4 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <span>{uploadMessage}</span>
                </div>
              )}

              <p className="mt-4 text-xs text-foreground/60">
                CSV format: student_id, subject_id, marks_obtained, total_marks
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <FileText className="mb-3 h-8 w-8 text-secondary" />
                <h3 className="font-semibold text-secondary">Generate Reports</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Create comprehensive reports on student performance
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <FileText className="mb-3 h-8 w-8 text-accent" />
                <h3 className="font-semibold text-accent">Auto-Sort Students</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Automatically categorize students by performance levels
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-foreground/70">
                Start by uploading your first student performance dataset to get detailed analytics and insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
