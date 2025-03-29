"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus } from "lucide-react"

interface Project {
  id?: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string | null
  githubUrl: string | null
  portfolioId?: string
  order: number
}

interface ProjectsFormProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export function ProjectsForm({ projects, setProjects }: ProjectsFormProps) {
  const [newProject, setNewProject] = useState<Project>({
    title: "",
    description: "",
    image: "",
    technologies: [],
    liveUrl: null,
    githubUrl: null,
    order: 0
  })
  const [technology, setTechnology] = useState("")
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLoading(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setNewProject({ ...newProject, image: data.url })
      } else {
        alert("Image upload failed.")
      }
      setLoading(false)
    }
  }

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, {
        ...newProject,
        id: crypto.randomUUID(),
        portfolioId: "",  // or get from props if available
        order: projects.length
      }])
      setNewProject({
        title: "",
        description: "",
        image: "",
        technologies: [],
        liveUrl: null,
        githubUrl: null,
        order: projects.length + 1
      })
    }
  }

  const addTechnology = () => {
    if (technology && !newProject.technologies.includes(technology)) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, technology]
      })
      setTechnology("")
    }
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-gray-400">Add your projects to showcase your work</p>
      </div>

      <Card className="p-4 space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="Enter project title"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Describe your project"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <Label>Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                placeholder="Add a technology..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && technology.trim()) {
                    e.preventDefault()
                    addTechnology()
                  }
                }}
              />
              <Button onClick={addTechnology} type="button">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newProject.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  {tech}
                  <button onClick={() => removeProject(index)} className="hover:bg-background/20 rounded-full p-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Project Image</Label>
            <div className="flex gap-2">
              <Input
                id="Image"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                placeholder="Enter image URL or upload"
              />
              <Button variant="outline" className="gap-2" onClick={() => document.getElementById('image-upload')?.click()}>
                <Upload className="w-4 h-4" />
                Upload
              </Button>
              <input
                type="file"
                id="image-upload"
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            {loading && <p>Loading...</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="liveUrl">Live Demo URL</Label>
              <Input
                id="liveUrl"
                value={newProject.liveUrl || ""}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value as string | null })}
                placeholder="https://..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                value={newProject.githubUrl || ""}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value as string | null })}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>

        <Button onClick={addProject} className="w-full" disabled={loading}>
          <Plus className="w-4 h-4 mr-2" />
          {loading ? "Uploading..." : "Add Project"}
        </Button>
      </Card>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-[#39c5bb]/20 text-[#39c5bb] px-2 py-1 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

