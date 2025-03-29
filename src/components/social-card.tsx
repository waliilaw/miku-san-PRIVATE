"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { SocialPlatform } from "@/types/portfolio"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { SOCIAL_PLATFORMS } from "@/lib/constants"

interface SocialCardProps {
  platform: SocialPlatform
  url: string | null
}

const icons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
}

export function SocialCard({ platform, url }: SocialCardProps) {
  if (!url) return null

  const Icon = icons[platform]
  const platformInfo = SOCIAL_PLATFORMS.find((p) => p.id === platform)

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Card
          className="p-4 bg-black/60 backdrop-blur-md border border-[#39c5bb]/30 
          hover:bg-black/80 transition-all duration-300 flex items-center gap-3"
        >
          <div className={`p-2 rounded-full bg-white/5 ${platformInfo?.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-medium">{platformInfo?.label}</span>
        </Card>
      </a>
    </motion.div>
  )
}

