"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Plus, ArrowLeft, Save, Eye } from "lucide-react"
import type { Course, CourseDetails, SyllabusItem } from "@/types"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { courseService, courseDetailsService } from "@/lib/database"

export default function CourseDetailsPage() {
  const [course, setCourse] = useState<Course | null>(null)
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  
  const router = useRouter()
  const params = useParams()
  const { signOut } = useAuth()
  
  const courseId = params.id as string

  // Form data state
  const [formData, setFormData] = useState({
    level: "",
    instructor: "",
    max_capacity: 0,
    prerequisites: [] as string[],
    learning_objectives: [] as string[],
    syllabus: [] as SyllabusItem[],
    resources: [] as string[],
  })

  const [newPrerequisite, setNewPrerequisite] = useState("")
  const [newObjective, setNewObjective] = useState("")
  const [newResource, setNewResource] = useState("")
  const [newSyllabusItem, setNewSyllabusItem] = useState({
    week: 1,
    topic: "",
    description: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [courseData, detailsData] = await Promise.all([
          courseService.getById(courseId),
          courseDetailsService.getByCourseId(courseId)
        ])
        
        setCourse(courseData)
        setCourseDetails(detailsData)
        
        if (detailsData) {
          setFormData({
            level: detailsData.level,
            instructor: detailsData.instructor,
            max_capacity: detailsData.max_capacity,
            prerequisites: detailsData.prerequisites,
            learning_objectives: detailsData.learning_objectives,
            syllabus: detailsData.syllabus,
            resources: detailsData.resources,
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchData()
    }
  }, [courseId])

  const handleSave = async () => {
    if (!course) return
    
    setSaving(true)
    try {
      let result
      if (courseDetails) {
        // Update existing course details
        result = await courseDetailsService.update(courseId, formData)
      } else {
        // Create new course details
        result = await courseDetailsService.create({
          course_id: courseId,
          ...formData
        })
      }
      
      if (result) {
        setCourseDetails(result)
        console.log("Course details saved successfully")
        // You could add a toast notification here
      } else {
        console.error("Failed to save course details")
      }
    } catch (error) {
      console.error("Error saving course details:", error)
    } finally {
      setSaving(false)
    }
  }

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite.trim()]
      }))
      setNewPrerequisite("")
    }
  }

  const removePrerequisite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index)
    }))
  }

  const addObjective = () => {
    if (newObjective.trim()) {
      setFormData(prev => ({
        ...prev,
        learning_objectives: [...prev.learning_objectives, newObjective.trim()]
      }))
      setNewObjective("")
    }
  }

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learning_objectives: prev.learning_objectives.filter((_, i) => i !== index)
    }))
  }

  const addResource = () => {
    if (newResource.trim()) {
      setFormData(prev => ({
        ...prev,
        resources: [...prev.resources, newResource.trim()]
      }))
      setNewResource("")
    }
  }

  const removeResource = (index: number) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }))
  }

  const addSyllabusItem = () => {
    if (newSyllabusItem.topic.trim() && newSyllabusItem.description.trim()) {
      setFormData(prev => ({
        ...prev,
        syllabus: [...prev.syllabus, { ...newSyllabusItem }]
      }))
      setNewSyllabusItem({
        week: prev.syllabus.length + 2,
        topic: "",
        description: ""
      })
    }
  }

  const removeSyllabusItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, i) => i !== index)
    }))
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course details...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!course) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <Button onClick={() => router.push("/admin/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
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
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">Course Details</h1>
                  <p className="text-sm text-gray-600">{course.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => router.push(`/courses/${course.slug}`)}
                  className="hover:bg-blue-50 hover:border-blue-200"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Page
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/admin/dashboard")}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white/70 backdrop-blur-sm border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-800">Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Title</Label>
                    <p className="text-gray-900">{course.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Description</Label>
                    <p className="text-gray-600 text-sm">{course.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Semester</Label>
                      <p className="text-gray-900">{course.semester} {course.year}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Duration</Label>
                      <p className="text-gray-900">{course.duration}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Status</Label>
                    <Badge variant={course.status === "current" ? "default" : "secondary"} 
                           className={course.status === "current" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-gray-100 text-gray-600 border-gray-200"}>
                      {course.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Enrolled</Label>
                    <p className="text-gray-900">{course.enrolled} students</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Details Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/70 backdrop-blur-sm border-gray-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-gray-800">Course Details</CardTitle>
                    <Button onClick={handleSave} disabled={saving}>
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
                      <TabsTrigger value="objectives">Objectives</TabsTrigger>
                      <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                    </TabsList>

                    {/* Basic Information Tab */}
                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="level">Level</Label>
                          <Input
                            id="level"
                            value={formData.level}
                            onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                            placeholder="e.g., Beginner, Intermediate, Advanced"
                          />
                        </div>
                        <div>
                          <Label htmlFor="instructor">Instructor</Label>
                          <Input
                            id="instructor"
                            value={formData.instructor}
                            onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                            placeholder="e.g., Dr. John Smith"
                          />
                        </div>
                        <div>
                          <Label htmlFor="max_capacity">Max Capacity</Label>
                          <Input
                            id="max_capacity"
                            type="number"
                            value={formData.max_capacity}
                            onChange={(e) => setFormData(prev => ({ ...prev, max_capacity: parseInt(e.target.value) || 0 }))}
                            placeholder="30"
                          />
                        </div>
                      </div>

                      {/* Resources */}
                      <div>
                        <Label>Resources</Label>
                        <div className="space-y-2">
                          {formData.resources.map((resource, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Badge variant="secondary" className="flex-1 justify-start">
                                {resource}
                              </Badge>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => removeResource(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex gap-2">
                            <Input
                              value={newResource}
                              onChange={(e) => setNewResource(e.target.value)}
                              placeholder="Add resource"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResource())}
                            />
                            <Button type="button" onClick={addResource}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Prerequisites Tab */}
                    <TabsContent value="prerequisites" className="space-y-4">
                      <div className="space-y-2">
                        {formData.prerequisites.map((prereq, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge variant="secondary" className="flex-1 justify-start">
                              {prereq}
                            </Badge>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => removePrerequisite(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <Input
                            value={newPrerequisite}
                            onChange={(e) => setNewPrerequisite(e.target.value)}
                            placeholder="Add prerequisite"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                          />
                          <Button type="button" onClick={addPrerequisite}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Learning Objectives Tab */}
                    <TabsContent value="objectives" className="space-y-4">
                      <div className="space-y-2">
                        {formData.learning_objectives.map((objective, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge variant="secondary" className="flex-1 justify-start">
                              {objective}
                            </Badge>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => removeObjective(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <Input
                            value={newObjective}
                            onChange={(e) => setNewObjective(e.target.value)}
                            placeholder="Add learning objective"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                          />
                          <Button type="button" onClick={addObjective}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Syllabus Tab */}
                    <TabsContent value="syllabus" className="space-y-4">
                      <div className="space-y-4">
                        {formData.syllabus.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline">Week {item.week}</Badge>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => removeSyllabusItem(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <h4 className="font-semibold">{item.topic}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        ))}
                        <div className="border rounded-lg p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <Label htmlFor="week">Week</Label>
                              <Input
                                id="week"
                                type="number"
                                value={newSyllabusItem.week}
                                onChange={(e) => setNewSyllabusItem(prev => ({ ...prev, week: parseInt(e.target.value) || 1 }))}
                                min="1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="topic">Topic</Label>
                              <Input
                                id="topic"
                                value={newSyllabusItem.topic}
                                onChange={(e) => setNewSyllabusItem(prev => ({ ...prev, topic: e.target.value }))}
                                placeholder="Course topic"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={newSyllabusItem.description}
                              onChange={(e) => setNewSyllabusItem(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Topic description"
                              rows={2}
                            />
                          </div>
                          <Button type="button" onClick={addSyllabusItem}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Syllabus Item
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
