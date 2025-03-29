"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { motion } from "framer-motion"

export function EditButton({ username }: { username: string }) {
  const router = useRouter()

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={() => router.push(`/${username}/edit`)}
        className="bg-black/60 backdrop-blur-md border border-[#39c5bb]/30 text-white 
          hover:bg-black/80 transition-all duration-300 group flex items-center gap-2"
      >
        <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
        Edit Portfolio
      </Button>
    </motion.div>
  )
}

