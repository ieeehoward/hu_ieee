"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import type { CourseDetails, SyllabusItem } from "@/types"

interface CourseDetailsFormProps {
  courseDetails: CourseDetails | null
  courseId: string
  onSave: (courseDetails: Omit<CourseDetails, 'id'>) => void
  onCancel: () => void
}

export function CourseDetailsForm({ courseDetails, courseId, onSave, onCancel }: CourseDetailsFormProps) {
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
    if (courseDetails) {
      setFormData({
        level: courseDetails.level,
        instructor: courseDetails.instructor,
        max_capacity: courseDetails.max_capacity,
        prerequisites: courseDetails.prerequisites,
        learning_objectives: courseDetails.learning_objectives,
        syllabus: courseDetails.syllabus,
        resources: courseDetails.resources,
      })
    }
  }, [courseDetails])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      course_id: courseId,
      ...formData
    })
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                  required
                />
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                  placeholder="e.g., Dr. John Smith"
                  required
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
                  required
                />
              </div>
            </div>

            {/* Prerequisites */}
            <div>
              <Label>Prerequisites</Label>
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
            </div>

            {/* Learning Objectives */}
            <div>
              <Label>Learning Objectives</Label>
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
            </div>

            {/* Syllabus */}
            <div>
              <Label>Syllabus</Label>
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

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {courseDetails ? "Update" : "Create"} Course Details
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
