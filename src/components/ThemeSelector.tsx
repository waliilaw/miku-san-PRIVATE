"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { themes } from "@/lib/themes"
import type { ThemeType } from "@/lib/themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ThemeSelectorProps {
  defaultTheme: ThemeType
  onThemeChange: (theme: ThemeType) => void
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ defaultTheme, onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(defaultTheme)

  useEffect(() => {
    const theme = themes[selectedTheme]
    document.documentElement.style.setProperty("--primary-color", theme.primary)
    document.documentElement.style.setProperty("--background-color", theme.background)
    document.documentElement.style.setProperty("--text-color", theme.text)
    onThemeChange(selectedTheme)
  }, [selectedTheme, onThemeChange])

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-[#39c5bb]/30">
      <Label htmlFor="theme-selector" className="text-xs text-gray-400 block mb-1">
        Theme
      </Label>
      <Select value={selectedTheme} onValueChange={(value : any )  => setSelectedTheme(value as ThemeType)}>
        <SelectTrigger id="theme-selector" className="w-[140px] bg-black/60 border-[#39c5bb]/30">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-[#39c5bb]/30">
          {Object.keys(themes).map((theme) => (
            <SelectItem key={theme} value={theme} className="hover:bg-[#39c5bb]/20">
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ThemeSelector

