"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const SUGGESTED_SKILLS = [
  "NextJS",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "HTML/CSS",
  "Python",
  "Java",
  "Docker",
  "AWS",
  "Git",
]

interface SkillsFormProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

export function SkillsForm({ skills, setSkills }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-gray-400">Add your technical skills and expertise</p>
      </div>

      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g., React, Node.js)"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleAddSkill()
            }
          }}
        />
        <Button onClick={handleAddSkill}>Add</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} className="px-3 py-1 flex items-center gap-2">
            {skill}
            <X 
              className="h-4 w-4 cursor-pointer" 
              onClick={() => handleRemoveSkill(skill)}
            />
          </Badge>
        ))}
      </div>
    </div>
  )
}

