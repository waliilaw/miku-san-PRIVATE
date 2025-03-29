"use client"

import { UserButton } from "@clerk/nextjs"
import { motion } from "framer-motion"

export function UserNav() {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50 bg-black/60 backdrop-blur-md 
        border border-[#39c5bb]/30 rounded-full p-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "w-8 h-8",
            userButtonTrigger: "hover:opacity-80 transition-opacity",
          },
        }}
      />
    </motion.div>
  )
}

