"use client"

import React, { useState, useEffect } from "react";
import ThemeSelector from "@/components/ThemeSelector";
import { themes } from "@/lib/themes";
import { Portfolio } from "@/types/portfolio"; // Adjust the import path as necessary

interface ThemeHandlerProps {
  portfolio: Portfolio; // Use the defined Portfolio type
}

const ThemeHandler: React.FC<ThemeHandlerProps> = ({ portfolio }) => {
  const defaultTheme: keyof typeof themes = (portfolio.theme as keyof typeof themes) || "pink";
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);

  useEffect(() => {
    const theme = themes[selectedTheme as keyof typeof themes];
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--background-color', theme.background);
    document.documentElement.style.setProperty('--text-color', theme.text);
  }, [selectedTheme]);

  return (
    <ThemeSelector
      defaultTheme={selectedTheme}
      onThemeChange={(theme) => setSelectedTheme(theme)}
    />
  );
};

export default ThemeHandler; 