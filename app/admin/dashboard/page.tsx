"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react"
import type { Course, TeamMember, Project, Instructor } from "@/types"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { CourseForm } from "@/components/admin/course-form"
import { TeamForm } from "@/components/admin/team-form"
import { ProjectForm } from "@/components/admin/project-form"
import { InstructorForm } from "@/components/admin/instructor-form"
import { courseService, teamMemberService, projectService, instructorService } from "@/lib/database"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState<"course" | "team" | "project" | "instructor" | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { signOut } = useAuth()

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [coursesData, teamData, projectsData, instructorsData] = await Promise.all([
          courseService.getAll(),
          teamMemberService.getAll(),
          projectService.getAll(),
          instructorService.getAll()
        ])
        
        setCourses(coursesData)
        setTeamMembers(teamData)
        setProjects(projectsData)
        setInstructors(instructorsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = async () => {
    try {
        const error = await signOut()
        if (error) {
            console.error("Logout failed:", error)
        }
    } catch (error) {
      console.error("Logout failed:", error)
    }
    router.push("/admin/login")
  }

  const handleAddNew = (type: "course" | "team" | "project" | "instructor") => {
    setFormType(type)
    setEditingItem(null)
    setShowForm(true)
  }

  const handleEdit = (type: "course" | "team" | "project" | "instructor", item: any) => {
    setFormType(type)
    setEditingItem(item)
    setShowForm(true)
  }

  const handleSave = async (item: any) => {
    try {
      let result
      if (editingItem) {
        // Update existing item
        if (formType === "course") {
          result = await courseService.update(editingItem.id, item)
          if (result) {
            setCourses(courses.map(c => c.id === editingItem.id ? result! : c))
          }
        } else if (formType === "team") {
          result = await teamMemberService.update(editingItem.id, item)
          if (result) {
            setTeamMembers(teamMembers.map(m => m.id === editingItem.id ? result! : m))
          }
        } else if (formType === "project") {
          result = await projectService.update(editingItem.id, item)
          if (result) {
            setProjects(projects.map(p => p.id === editingItem.id ? result! : p))
          }
        } else if (formType === "instructor") {
          result = await instructorService.update(editingItem.id, item)
          if (result) {
            setInstructors(instructors.map(i => i.id === editingItem.id ? result! : i))
          }
        }
      } else {
        // Create new item
        if (formType === "course") {
          result = await courseService.create(item)
          if (result) {
            setCourses([result, ...courses])
          }
        } else if (formType === "team") {
          result = await teamMemberService.create(item)
          if (result) {
            setTeamMembers([result, ...teamMembers])
          }
        } else if (formType === "project") {
          result = await projectService.create(item)
          if (result) {
            setProjects([result, ...projects])
          }
        } else if (formType === "instructor") {
          result = await instructorService.create(item)
          if (result) {
            setInstructors([result, ...instructors])
          }
        }
      }
      
      if (result) {
        console.log("Item saved successfully:", result)
        // You could add a toast notification here
      } else {
        console.error("Failed to save item")
      }
    } catch (error) {
      console.error("Error saving item:", error)
    }
    
    setShowForm(false)
    setFormType(null)
    setEditingItem(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setFormType(null)
    setEditingItem(null)
  }

  const handleDelete = async (type: "course" | "team" | "project" | "instructor", id: string) => {
    try {
      let success = false
      
      if (type === "course") {
        success = await courseService.delete(id)
        if (success) {
          setCourses(courses.filter(c => c.id !== id))
        }
      } else if (type === "team") {
        success = await teamMemberService.delete(id)
        if (success) {
          setTeamMembers(teamMembers.filter(m => m.id !== id))
        }
      } else if (type === "project") {
        success = await projectService.delete(id)
        if (success) {
          setProjects(projects.filter(p => p.id !== id))
        }
      } else if (type === "instructor") {
        success = await instructorService.delete(id)
        if (success) {
          setInstructors(instructors.filter(i => i.id !== id))
        }
      }
      
      if (success) {
        console.log("Item deleted successfully")
        // You could add a toast notification here
      } else {
        console.error("Failed to delete item")
      }
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  return (
    <ProtectedRoute>
      <div>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                <Image 
                  src="/ieee-logo.png" 
                  alt="IEEE Logo" 
                  width={50} 
                  height={50} 
                  className="mr-3"
                />
                <h1 className="text-xl font-semibold text-gray-800">Admin Portal</h1>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be signed out of the admin portal and redirected to the login page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </div>
            </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading data...</p>
                    </div>
                </div>
            ) : (
            <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm border border-gray-200">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Overview</TabsTrigger>
                <TabsTrigger value="courses" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Courses</TabsTrigger>
                <TabsTrigger value="team" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Team</TabsTrigger>
                <TabsTrigger value="projects" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Projects</TabsTrigger>
                <TabsTrigger value="instructors" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Instructors</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Total Courses</CardTitle>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{courses.length}</div>
                    <p className="text-sm text-gray-600 mt-1">
                        {courses.filter(c => c.status === "current").length} active
                    </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Team Members</CardTitle>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{teamMembers.length}</div>
                    <p className="text-sm text-gray-600 mt-1">
                        Leadership team
                    </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Projects</CardTitle>
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Briefcase className="h-4 w-4 text-purple-600" />
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{projects.length}</div>
                    <p className="text-sm text-gray-600 mt-1">
                        Student projects
                    </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Instructors</CardTitle>
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <GraduationCap className="h-4 w-4 text-orange-600" />
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{instructors.length}</div>
                    <p className="text-sm text-gray-600 mt-1">
                        Course instructors
                    </p>
                    </CardContent>
                </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                    <CardTitle className="text-gray-800">Recent Courses</CardTitle>
                    <CardDescription className="text-gray-600">Latest course offerings</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-3">
                        {courses.slice(0, 3).map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div>
                            <p className="font-medium text-gray-900">{course.title}</p>
                            <p className="text-sm text-gray-600">{course.semester} {course.year}</p>
                            </div>
                            <Badge variant={course.status === "current" ? "default" : "secondary"} className={course.status === "current" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-gray-100 text-gray-600 border-gray-200"}>
                            {course.status}
                            </Badge>
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                    <CardTitle className="text-gray-800">Quick Actions</CardTitle>
                    <CardDescription className="text-gray-600">Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-3">
                        <Button className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300" variant="outline" onClick={() => handleAddNew("course")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Course
                        </Button>
                        <Button className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-700 border-green-200 hover:border-green-300" variant="outline" onClick={() => handleAddNew("team")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Team Member
                        </Button>
                        <Button className="w-full justify-start bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 hover:border-purple-300" variant="outline" onClick={() => handleAddNew("project")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                        </Button>
                        <Button className="w-full justify-start bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200 hover:border-orange-300" variant="outline" onClick={() => handleAddNew("instructor")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Instructor
                        </Button>
                    </div>
                    </CardContent>
                </Card>
                </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
                <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Course Management</h2>
                <Button onClick={() => handleAddNew("course")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                </Button>
                </div>
                
                 <div className="grid gap-4">
                 {courses.map((course) => (
                     <Card key={course.id} className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                     <CardContent className="p-6">
                         <div className="flex items-center justify-between">
                         <div className="space-y-1">
                             <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                             <p className="text-gray-600">{course.description}</p>
                             <div className="flex items-center space-x-4 text-sm text-gray-500">
                             <span>{course.semester} {course.year}</span>
                             <span>{course.duration}</span>
                             <span>{course.enrolled} enrolled</span>
                             </div>
                         </div>
                         <div className="flex items-center space-x-2">
                             <Badge variant={course.status === "current" ? "default" : "secondary"} className={course.status === "current" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-gray-100 text-gray-600 border-gray-200"}>
                             {course.status}
                             </Badge>
                             <Button size="sm" variant="outline" onClick={() => handleEdit("course", course)} className="hover:bg-blue-50 hover:border-blue-200">
                             <Edit className="h-4 w-4" />
                             </Button>
                             <Button size="sm" variant="outline" className="hover:bg-gray-50 hover:border-gray-200">
                             <Eye className="h-4 w-4" />
                             </Button>
                             <AlertDialog>
                               <AlertDialogTrigger asChild>
                                 <Button size="sm" variant="outline" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                                   <Trash2 className="h-4 w-4" />
                                 </Button>
                               </AlertDialogTrigger>
                               <AlertDialogContent>
                                 <AlertDialogHeader>
                                   <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                   <AlertDialogDescription>
                                     This action cannot be undone. This will permanently delete the course "{course.title}".
                                   </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
                                   <AlertDialogAction 
                                     onClick={() => handleDelete("course", course.id)}
                                     className="bg-red-600 hover:bg-red-700"
                                   >
                                     Delete
                                   </AlertDialogAction>
                                 </AlertDialogFooter>
                               </AlertDialogContent>
                             </AlertDialog>
                         </div>
                         </div>
                     </CardContent>
                     </Card>
                 ))}
                </div>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
                <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Team Management</h2>
                <Button onClick={() => handleAddNew("team")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                </Button>
                </div>
                
                 <div className="grid gap-4">
                 {teamMembers.map((member) => (
                     <Card key={member.id} className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                     <CardContent className="p-6">
                         <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-4">
                             <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                             <Users className="h-6 w-6 text-green-600" />
                             </div>
                             <div className="space-y-1">
                                 <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                 <p className="text-gray-600 font-medium">{member.role}</p>
                                 <p className="text-sm text-gray-500">{member.bio}</p>
                             </div>
                         </div>
                         <div className="flex items-center space-x-2">
                             <Button size="sm" variant="outline" onClick={() => handleEdit("team", member)} className="hover:bg-blue-50 hover:border-blue-200">
                             <Edit className="h-4 w-4" />
                             </Button>
                             <AlertDialog>
                               <AlertDialogTrigger asChild>
                                 <Button size="sm" variant="outline" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                                   <Trash2 className="h-4 w-4" />
                                 </Button>
                               </AlertDialogTrigger>
                               <AlertDialogContent>
                                 <AlertDialogHeader>
                                   <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                   <AlertDialogDescription>
                                     This action cannot be undone. This will permanently delete team member "{member.name}".
                                   </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
                                   <AlertDialogAction 
                                     onClick={() => handleDelete("team", member.id)}
                                     className="bg-red-600 hover:bg-red-700"
                                   >
                                     Delete
                                   </AlertDialogAction>
                                 </AlertDialogFooter>
                               </AlertDialogContent>
                             </AlertDialog>
                         </div>
                         </div>
                     </CardContent>
                     </Card>
                 ))}
                </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
                <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Project Management</h2>
                <Button onClick={() => handleAddNew("project")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                </Button>
                </div>
                
                 <div className="grid gap-4">
                 {projects.map((project) => (
                     <Card key={project.id} className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                     <CardContent className="p-6">
                         <div className="flex items-center justify-between">
                         <div className="space-y-1">
                             <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                             <p className="text-gray-600">{project.description}</p>
                             <div className="flex items-center space-x-4 text-sm text-gray-500">
                             <span>Course: {project.course}</span>
                             <span>Technologies: {project.technologies.join(", ")}</span>
                             </div>
                         </div>
                         <div className="flex items-center space-x-2">
                             <Button size="sm" variant="outline" onClick={() => handleEdit("project", project)} className="hover:bg-blue-50 hover:border-blue-200">
                             <Edit className="h-4 w-4" />
                             </Button>
                             <AlertDialog>
                               <AlertDialogTrigger asChild>
                                 <Button size="sm" variant="outline" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                                   <Trash2 className="h-4 w-4" />
                                 </Button>
                               </AlertDialogTrigger>
                               <AlertDialogContent>
                                 <AlertDialogHeader>
                                   <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                   <AlertDialogDescription>
                                     This action cannot be undone. This will permanently delete the project "{project.title}".
                                   </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
                                   <AlertDialogAction 
                                     onClick={() => handleDelete("project", project.id)}
                                     className="bg-red-600 hover:bg-red-700"
                                   >
                                     Delete
                                   </AlertDialogAction>
                                 </AlertDialogFooter>
                               </AlertDialogContent>
                             </AlertDialog>
                         </div>
                         </div>
                     </CardContent>
                     </Card>
                 ))}
                </div>
            </TabsContent>

            {/* Instructors Tab */}
            <TabsContent value="instructors" className="space-y-6">
                <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Instructor Management</h2>
                <Button onClick={() => handleAddNew("instructor")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Instructor
                </Button>
                </div>
                
                 <div className="grid gap-4">
                 {instructors.map((instructor) => (
                     <Card key={instructor.id} className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                     <CardContent className="p-6">
                         <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-4">
                             <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                             <GraduationCap className="h-6 w-6 text-orange-600" />
                             </div>
                             <div className="space-y-1">
                                 <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
                                 <p className="text-gray-600 font-medium">{instructor.title} - {instructor.department}</p>
                                 <p className="text-sm text-gray-500">{instructor.bio}</p>
                                 <div className="flex flex-wrap gap-1 mt-2">
                                     {instructor.expertise.map((skill) => (
                                     <Badge key={skill} variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                                         {skill}
                                     </Badge>
                                     ))}
                                 </div>
                             </div>
                         </div>
                         <div className="flex items-center space-x-2">
                             <Button size="sm" variant="outline" onClick={() => handleEdit("instructor", instructor)} className="hover:bg-blue-50 hover:border-blue-200">
                             <Edit className="h-4 w-4" />
                             </Button>
                             <AlertDialog>
                               <AlertDialogTrigger asChild>
                                 <Button size="sm" variant="outline" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                                   <Trash2 className="h-4 w-4" />
                                 </Button>
                               </AlertDialogTrigger>
                               <AlertDialogContent>
                                 <AlertDialogHeader>
                                   <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                   <AlertDialogDescription>
                                     This action cannot be undone. This will permanently delete instructor "{instructor.name}".
                                   </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
                                   <AlertDialogAction 
                                     onClick={() => handleDelete("instructor", instructor.id)}
                                     className="bg-red-600 hover:bg-red-700"
                                   >
                                     Delete
                                   </AlertDialogAction>
                                 </AlertDialogFooter>
                               </AlertDialogContent>
                             </AlertDialog>
                         </div>
                         </div>
                     </CardContent>
                     </Card>
                 ))}
                </div>
            </TabsContent>
            </Tabs>

            {/* Form Dialog */}
            <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                <DialogTitle>
                    {formType === "course" && (editingItem ? "Edit Course" : "Add New Course")}
                    {formType === "team" && (editingItem ? "Edit Team Member" : "Add New Team Member")}
                    {formType === "project" && (editingItem ? "Edit Project" : "Add New Project")}
                    {formType === "instructor" && (editingItem ? "Edit Instructor" : "Add New Instructor")}
                </DialogTitle>
                </DialogHeader>
                {formType === "course" && (
                <CourseForm
                    course={editingItem}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
                )}
                {formType === "team" && (
                <TeamForm
                    member={editingItem}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
                )}
                {formType === "project" && (
                <ProjectForm
                    project={editingItem}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
                )}
                {formType === "instructor" && (
                <InstructorForm
                    instructor={editingItem}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
                )}
            </DialogContent>
            </Dialog>
            </>
            )}
        </div>
      </div>
    </ProtectedRoute>
  )
}