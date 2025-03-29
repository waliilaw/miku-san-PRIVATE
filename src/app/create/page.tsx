"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile-form"
import { ProjectsForm } from "@/components/projects-form"
import { SkillsForm } from "@/components/skills-form"
import { SocialForm } from "@/components/social-form"
import { ThemeForm } from "@/components/theme-form"
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import Loading from "@/components/Loading"
import { ArrowLeft, ArrowRight, Save, Home } from "lucide-react"
import { themes } from "@/lib/themes"
import type { ThemeType } from "@/lib/themes"
import Dither from "@/components/Dither"

interface projects{
  title: string
  id: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string | null
  githubUrl: string | null
  order: number
}[]

const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const TABS = ["profile", "skills", "projects", "social", "theme"] as const

function CreatePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [step, setStep] = useState<(typeof TABS)[number]>("profile")
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [avatar, setAvatar] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [socialLinks, setSocialLinks] = useState({})
  const [bio, setBio] = useState("")
  const [projects, setProjects] = useState<
    {
      title: string
      id: string
      description: string
      image: string
      technologies: string[]
      liveUrl: string | null
      githubUrl: string | null
      portfolioId: string
      order: number
    }[]
  >([])
  const [checking, setChecking] = useState(true)
  const [direction, setDirection] = useState(0)
  const [theme, setTheme] = useState<ThemeType>("pink")
  const [trialMode, setTrialMode] = useState(false)

  useEffect(() => {
    const checkExistingPortfolio = async () => {
      if (!isLoaded || !user) {
        router.push("/sign-in")
        return
      }

      try {
        // Get username from user object
        const username = user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0] || `user-${user.id}`

        // Check if portfolio exists
        const response = await fetch(`/api/${username}`)

        if (response.ok) {
          toast.success("Redirecting to edit page...")
          router.push(`/${username}/edit`)
          return
        }

        setChecking(false)
      } catch (error) {
        console.error("Error checking portfolio:", error)
        setChecking(false)
      }
    }

    checkExistingPortfolio()
  }, [isLoaded, user, router])

  useEffect(() => {
    if (theme) {
      const themeData = themes[theme]
      document.documentElement.style.setProperty("--primary-color", themeData.primary)
      document.documentElement.style.setProperty("--background-color", themeData.background)
      document.documentElement.style.setProperty("--text-color", themeData.text)
    }
  }, [theme])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get("trial") === "true") {
      setTrialMode(true)
      // Set default values for trial mode
      setName("Trial User")
      setTitle("Trial Portfolio")
      setEmail("trial@example.com")
      setLocation("Trial Location")
      setBio("This is a trial portfolio created for testing purposes.")
      // You can also set default skills and projects if needed
    }
  }, [])

  const handleSubmit = async () => {
    if (!name || !title || !email || !location) {
      toast.error("Please fill in all required fields.")
      return
    }

    if (!user?.id) {
      toast.error("Please sign in to create a portfolio")
      return
    }

    // Use email as username if username is not set
    const username = user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0] || `user-${user.id}`

    const portfolioData = {
      name,
      title,
      avatar,
      skills,
      email,
      location,
      socialLinks,
      bio,
      projects,
      userId: trialMode ? "trial-user" : user.id,
      username: trialMode ? "trial-user" : username,
      theme: theme,
    }

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      })

      if (response.ok) {
        toast.success("Portfolio created successfully!")
        router.push(`/${username}`)
      } else {
        const error = await response.json()
        toast.error(error.message)
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("Failed to create portfolio")
    }
  }

  const navigateTab = (newStep: string) => {
    if (["profile", "skills", "projects", "social", "theme"].includes(newStep)) {
      const currentIndex = TABS.indexOf(step)
      const newIndex = TABS.indexOf(newStep as "profile" | "skills" | "projects" | "social" | "theme")

      setDirection(newIndex > currentIndex ? 1 : -1)
      setStep(newStep as "profile" | "skills" | "projects" | "social" | "theme")
    }
  }

  const nextTab = () => {
    const currentIndex = TABS.indexOf(step)
    if (currentIndex < TABS.length - 1) {
      setDirection(1)
      setStep(TABS[currentIndex + 1])
    }
  }

  const prevTab = () => {
    const currentIndex = TABS.indexOf(step)
    if (currentIndex > 0) {
      setDirection(-1)
      setStep(TABS[currentIndex - 1])
    }
  }

  if (checking) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Dither
        waveColor={[0.22, 0.77, 0.73]}
        waveAmplitude={0.2}
        waveFrequency={2}
        enableMouseInteraction={true}
        mouseRadius={0.5}
      />

      <SignedIn>
        <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
          <UserButton />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#39c5bb] to-pink-400 text-transparent bg-clip-text">
              Create Your Portfolio
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Express yourself through a beautiful and professional portfolio that showcases your skills and projects
            </p>
          </motion.div>

          <Card className="bg-black/40 backdrop-blur-md border-none shadow-[0_0_15px_rgba(57,197,187,0.2)] rounded-xl overflow-hidden">
            <Tabs value={step} onValueChange={navigateTab} className="w-full">
              <div className="px-4 sm:px-6 pt-6 overflow-x-auto">
                <TabsList className="grid grid-cols-5 gap-1 sm:gap-4 bg-black/50 p-1 rounded-lg w-full min-w-max">
                  <TabsTrigger
                    value="profile"
                    className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39c5bb] data-[state=active]:to-[#39c5bb]/80 data-[state=active]:text-black transition-all duration-300"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39c5bb] data-[state=active]:to-[#39c5bb]/80 data-[state=active]:text-black transition-all duration-300"
                  >
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39c5bb] data-[state=active]:to-[#39c5bb]/80 data-[state=active]:text-black transition-all duration-300"
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39c5bb] data-[state=active]:to-[#39c5bb]/80 data-[state=active]:text-black transition-all duration-300"
                  >
                    Social
                  </TabsTrigger>
                  <TabsTrigger
                    value="theme"
                    className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#39c5bb] data-[state=active]:to-[#39c5bb]/80 data-[state=active]:text-black transition-all duration-300"
                  >
                    Theme
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-4 sm:p-6 overflow-hidden">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <TabsContent value="profile" className="mt-0">
                      <ProfileForm
                        setName={setName}
                        setTitle={setTitle}
                        setAvatar={setAvatar}
                        setBio={setBio}
                        name={name}
                        title={title}
                        bio={bio}
                        email={email}
                        location={location}
                        setEmail={setEmail}
                        setLocation={setLocation}
                      />
                    </TabsContent>
                    <TabsContent value="skills" className="mt-0">
                      <SkillsForm
                        skills={skills}
                        setSkills={setSkills as React.Dispatch<React.SetStateAction<string[]>>}
                      />
                    </TabsContent>
                    <TabsContent value="projects" className="mt-0">
                      <ProjectsForm projects={projects} setProjects={setProjects as any}  />
                    </TabsContent>
                    <TabsContent value="social" className="mt-0">
                      <SocialForm socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
                    </TabsContent>
                    <TabsContent value="theme" className="mt-0">
                      <ThemeForm theme={theme} setTheme={setTheme} />
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Tabs>

            <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 bg-black/30 border-t border-[#39c5bb]/20 gap-4">
              <Button
                variant="outline"
                onClick={prevTab}
                disabled={step === "profile"}
                className="border-[#39c5bb]/50 text-white hover:bg-[#39c5bb]/20 w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#39c5bb] to-pink-400 hover:opacity-90 text-black font-medium px-8 w-full sm:w-auto"
              >
                <Save className="w-4 h-4 mr-2" />
                Create Portfolio
              </Button>

              <Button
                onClick={nextTab}
                disabled={step === "theme" || (step === "profile" && (!name || !title || !email || !location))}
                className="bg-[#39c5bb] hover:bg-[#39c5bb]/80 text-black w-full sm:w-auto"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}

export default CreatePage

