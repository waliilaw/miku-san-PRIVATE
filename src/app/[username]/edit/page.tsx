"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile-form"
import { ProjectsForm } from "@/components/projects-form"
import { SkillsForm } from "@/components/skills-form"
import { SocialForm } from "@/components/social-form"
import { ThemeForm } from "@/components/theme-form"
import { Button } from "@/components/ui/button"
import Loading from "@/components/Loading"
import { Card } from "@/components/ui/card"
import Dither from "@/components/Dither"
import { ArrowLeft, ArrowRight, Save, Eye, Home } from "lucide-react"
import { UserButton } from "@clerk/clerk-react"
import { themes } from "@/lib/themes"
import type { ThemeType } from "@/lib/themes"
import React from "react"

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

const EditPortfolio = ({ params }: any ) => {
  const { user } = useUser()
  const router = useRouter()
  const [step, setStep] = useState<"profile" | "skills" | "projects" | "social" | "theme">("profile")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [direction, setDirection] = useState(0)
  const [theme, setTheme] = useState<ThemeType>("pink")

  // Form states
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [avatar, setAvatar] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [socialLinks, setSocialLinks] = useState<{
    github?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }>({})
  const [bio, setBio] = useState("")
  const [projects, setProjects] = useState<any[]>([])

  // Unwrap params using React.use()
  const [username, setUsername] = useState<string>("")

  useEffect(() => {
    const fetchUsername = async () => {
      const unwrappedParams = await params
      setUsername(unwrappedParams.username)
    }

    fetchUsername()
  }, [params])

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!username) return

      try {
        const response = await fetch(`/api/${username}`)
        if (response.ok) {
          const data = await response.json()
          // Populate form states
          setName(data.name)
          setTitle(data.title)
          setAvatar(data.avatar || "")
          setSkills(data.skills || [])
          setEmail(data.email)
          setLocation(data.location)
          setSocialLinks(data.socialLinks || {})
          setBio(data.bio || "")
          setProjects(data.projects || [])
          setTheme(data.theme || "pink")
        } else {
          toast.error("Failed to fetch portfolio")
          router.push("/")
        }
      } catch (error) {
        toast.error("Failed to fetch portfolio")
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [username, router])

  useEffect(() => {
    if (theme) {
      const themeData = themes[theme]
      document.documentElement.style.setProperty("--primary-color", themeData.primary)
      document.documentElement.style.setProperty("--background-color", themeData.background)
      document.documentElement.style.setProperty("--text-color", themeData.text)
    }
  }, [theme])

  const handleSubmit = async () => {
    setLoading(true)
    setSaving(true)

    try {
      const response = await fetch(`/api/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          title,
          avatar,
          skills,
          email,
          location,
          socialLinks,
          bio,
          projects,
          theme,
        }),
      })

      if (response.ok) {
        toast.success("Portfolio updated successfully!")
        router.push(`/${username}`)
      } else {
        const error = await response.json()
        toast.error(error.message)
      }
    } catch (error) {
      toast.error("Failed to update portfolio")
    } finally {
      setSaving(false)
      setLoading(false)
    }
  }

  const navigateTab = (newStep: "profile" | "skills" | "projects" | "social" | "theme") => {
    const currentIndex = TABS.indexOf(step)
    const newIndex = TABS.indexOf(newStep)

    setDirection(newIndex > currentIndex ? 1 : -1)
    setStep(newStep)
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

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      <div className="fixed top-0 py-3 w-full z-50 flex left-0 gap-6 bg-black/30 backdrop-blur-sm item-center  text-white hover:bg-black/50 ">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          className=" text-white"
        >
          <Home className="w-5 h-5 mr-2" />
          Home
        </Button>
        <Button
          onClick={() => router.push(`/${username}`)}
          variant="ghost"
          className="text-white"
        >
          <Eye className="w-5 h-5 mr-2" />
          View Portfolio
        </Button>
        <div className="fixed right-4 top-4">
        <UserButton />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#39c5bb] to-pink-400 text-transparent bg-clip-text">
            Edit Your Portfolio
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Update your portfolio to showcase your latest skills and projects
          </p>
        </motion.div>

        <Card className="bg-black/40 backdrop-blur-md border-none shadow-[0_0_15px rgba(57,197,187,0.2)] rounded-xl overflow-hidden">
          <Tabs 
            value={step} 
            onValueChange={(value: string) => {
              if (["profile", "skills", "projects", "social", "theme"].includes(value)) {
                navigateTab(value as "profile" | "skills" | "projects" | "social" | "theme");
              }
            }} 
            className="w-full"
          >
            <div className="px-0 sm:px-6 pt-6 overflow-x-auto">
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
 
                  <TabsContent value="profile" className="mt-0">
                    <ProfileForm
                      setName={setName}
                      setTitle={setTitle}
                      setAvatar={setAvatar}
                      setBio={setBio}
                      setEmail={setEmail}
                      setLocation={setLocation}
                      name={name}
                      title={title}
                      bio={bio}
                      email={email}
                      location={location}
                    />
                  </TabsContent>
                  <TabsContent value="skills" className="mt-0">
                    <SkillsForm skills={skills} setSkills={setSkills} />
                  </TabsContent>
                  <TabsContent value="projects" className="mt-0">
                    <ProjectsForm projects={projects} setProjects={setProjects}  />
                  </TabsContent>
                  <TabsContent value="social" className="mt-0">
                    <SocialForm socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
                  </TabsContent>
                  <TabsContent value="theme" className="mt-0">
                    <ThemeForm theme={theme} setTheme={setTheme} />
                  </TabsContent>
          
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
              disabled={saving}
              className="bg-gradient-to-r from-[#39c5bb] to-pink-400 hover:opacity-90 text-black font-medium px-8 w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>

            <Button
              onClick={nextTab}
              disabled={step === "theme"}
              className="bg-[#39c5bb] hover:bg-[#39c5bb]/80 text-black w-full sm:w-auto"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default EditPortfolio

