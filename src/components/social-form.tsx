"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"

interface SocialLinks {
  github?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}

export function SocialForm({ socialLinks, setSocialLinks }: { socialLinks: SocialLinks, setSocialLinks: (socialLinks: SocialLinks) => void }) {
  const [githubUsername, setGithubUsername] = useState(socialLinks.github?.split('/').pop() || "")
  const [twitterUsername, setTwitterUsername] = useState(socialLinks.twitter?.split('/').pop() || "")
  const [linkedinUsername, setLinkedinUsername] = useState(socialLinks.linkedin?.split('/').pop() || "")
  const [instagramUsername, setInstagramUsername] = useState(socialLinks.instagram?.split('/').pop() || "")

  const handleSave = () => {
    setSocialLinks({
      github: githubUsername ? `https://github.com/${githubUsername}` : undefined,
      twitter: twitterUsername ? `https://twitter.com/${twitterUsername}` : undefined,
      linkedin: linkedinUsername ? `https://linkedin.com/in/${linkedinUsername}` : undefined,
      instagram: instagramUsername ? `https://instagram.com/${instagramUsername}` : undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Social Links</h2>
        <p className="text-gray-400">Add your social media profiles</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>GitHub</Label>
          <Input 
            placeholder="username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            onBlur={handleSave}
          />
        </div>
        <div>
          <Label>Twitter</Label>
          <Input 
            placeholder="username"
            value={twitterUsername}
            onChange={(e) => setTwitterUsername(e.target.value)}
            onBlur={handleSave}
          />
        </div>
        <div>
          <Label>LinkedIn</Label>
          <Input 
            placeholder="username"
            value={linkedinUsername}
            onChange={(e) => setLinkedinUsername(e.target.value)}
            onBlur={handleSave}
          />
        </div>
        <div>
          <Label>Instagram</Label>
          <Input 
            placeholder="username"
            value={instagramUsername}
            onChange={(e) => setInstagramUsername(e.target.value)}
            onBlur={handleSave}
          />
        </div>
      </div>
    </div>
  )
}