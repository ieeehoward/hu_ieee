"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Save, Plus } from "lucide-react"
import type { Instructor } from "@/types"

interface InstructorFormProps {
  instructor?: Instructor
  onSave: (instructor: Instructor) => void
  onCancel: () => void
}

export function InstructorForm({ instructor, onSave, onCancel }: InstructorFormProps) {
  const [formData, setFormData] = useState<Instructor>(
    instructor || {
      id: "",
      name: "",
      title: "",
      department: "",
      image: "",
      bio: "",
      expertise: [],
      email: "",
    }
  )

  const [newExpertise, setNewExpertise] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (field: keyof Instructor, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addExpertise = () => {
    if (newExpertise.trim() && !formData.expertise.includes(newExpertise.trim())) {
      handleChange("expertise", [...formData.expertise, newExpertise.trim()])
      setNewExpertise("")
    }
  }

  const removeExpertise = (skill: string) => {
    handleChange("expertise", formData.expertise.filter(s => s !== skill))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{instructor ? "Edit Instructor" : "Add New Instructor"}</CardTitle>
        <CardDescription>
          {instructor ? "Update instructor information" : "Add a new course instructor"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title/Position</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g., Professor, Chair"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                placeholder="e.g., IEEE Student Chapter"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="instructor@university.edu"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Profile Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="/instructor-image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Enter instructor bio and background"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Areas of Expertise</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.expertise.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeExpertise(skill)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                placeholder="Add expertise area"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addExpertise())}
              />
              <Button type="button" onClick={addExpertise} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {instructor ? "Update Instructor" : "Add Instructor"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
