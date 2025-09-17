"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Save, Plus } from "lucide-react"
import type { Project } from "@/types"

interface ProjectFormProps {
  project?: Project
  onSave: (project: Project) => void
  onCancel: () => void
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: "",
      title: "",
      description: "",
      image: "",
      technologies: [],
      course: "",
      members: [],
    }
  )

  const [newTechnology, setNewTechnology] = useState("")
  const [newMember, setNewMember] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (field: keyof Project, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      handleChange("technologies", [...formData.technologies, newTechnology.trim()])
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech: string) => {
    handleChange("technologies", formData.technologies.filter(t => t !== tech))
  }

  const addMember = () => {
    if (newMember.trim() && !formData.members.includes(newMember.trim())) {
      handleChange("members", [...formData.members, newMember.trim()])
      setNewMember("")
    }
  }

  const removeMember = (member: string) => {
    handleChange("members", formData.members.filter(m => m !== member))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{project ? "Edit Project" : "Add New Project"}</CardTitle>
        <CardDescription>
          {project ? "Update project information" : "Add a new student project"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter project description"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Project Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="/project-image.jpg"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                value={formData.course}
                onChange={(e) => handleChange("course", e.target.value)}
                placeholder="e.g., HOPE, FPGA, VIVA"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Team Members</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.members.map((member) => (
                <Badge key={member} variant="outline" className="flex items-center gap-1">
                  {member}
                  <button
                    type="button"
                    onClick={() => removeMember(member)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="Add team member"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMember())}
              />
              <Button type="button" onClick={addMember} size="sm">
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
              {project ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
