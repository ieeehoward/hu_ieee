-- Create course_details table
CREATE TABLE IF NOT EXISTS course_details (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  instructor TEXT NOT NULL,
  max_capacity INTEGER NOT NULL,
  prerequisites TEXT[] NOT NULL DEFAULT '{}',
  learning_objectives TEXT[] NOT NULL DEFAULT '{}',
  syllabus JSONB NOT NULL DEFAULT '[]',
  resources TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_details_course_id ON course_details(course_id);

-- Create trigger for updated_at
CREATE TRIGGER update_course_details_updated_at BEFORE UPDATE ON course_details
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE course_details ENABLE ROW LEVEL SECURITY;

-- Create policies for course_details table
CREATE POLICY "Allow all operations for authenticated users on course_details" ON course_details
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow anonymous users to read course details (for public website)
CREATE POLICY "Allow anonymous users to read course_details" ON course_details
  FOR SELECT TO anon USING (true);
