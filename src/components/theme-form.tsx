"use client"

import { motion } from "framer-motion"
import { themes } from "@/lib/themes"
import type { ThemeType } from "@/lib/themes"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { fadeIn, cardVariants } from "@/lib/animations"

interface ThemeFormProps {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

export function ThemeForm({ theme, setTheme }: ThemeFormProps) {
  return (
    <motion.div className="space-y-6" initial={fadeIn.initial} animate={fadeIn.animate} exit={fadeIn.exit}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#39c5bb] to-pink-400 bg-clip-text text-transparent">
          Theme Customization
        </h2>
        <p className="text-gray-400">Choose a theme that matches your style</p>
      </div>

      <RadioGroup
        value={theme}
        onValueChange={(value) => setTheme(value as ThemeType)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {Object.entries(themes).map(([themeName, themeValues]) => (
          <motion.div key={themeName} variants={cardVariants} initial="initial" animate="animate" exit="exit">
            <Label className="cursor-pointer">
              <RadioGroupItem value={themeName} className="sr-only" />
              <Card
                className={`p-4 transition-all duration-300 ${
                  theme === themeName ? "ring-2 ring-[#39c5bb] bg-black/60" : "bg-black/40 hover:bg-black/50"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-medium">{themeName.charAt(0).toUpperCase() + themeName.slice(1)}</span>
                  {theme === themeName && <Check className="w-4 h-4 text-[#39c5bb]" />}
                </div>
                <div
                  className={`h-20 rounded-lg bg-gradient-to-r ${themeValues.gradient} 
                    transition-transform duration-300 hover:scale-105`}
                />
              </Card>
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  )
}

