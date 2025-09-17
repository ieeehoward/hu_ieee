-- Enable Row Level Security on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

-- Simple policies for courses table
CREATE POLICY "Allow all operations for authenticated users on courses" ON courses
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Simple policies for team_members table
CREATE POLICY "Allow all operations for authenticated users on team_members" ON team_members
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Simple policies for projects table
CREATE POLICY "Allow all operations for authenticated users on projects" ON projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Simple policies for instructors table
CREATE POLICY "Allow all operations for authenticated users on instructors" ON instructors
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow anonymous users to read data (for public website)
CREATE POLICY "Allow anonymous users to read courses" ON courses
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous users to read team_members" ON team_members
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous users to read projects" ON projects
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous users to read instructors" ON instructors
  FOR SELECT TO anon USING (true);
