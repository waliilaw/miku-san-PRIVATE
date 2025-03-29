import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import { EditButton } from "@/components/edit-button"
import { DeletePortfolioDialog } from "@/components/delete-portfolio-dialog"
import { Github, Twitter, Linkedin, Instagram, Mail, MapPin } from 'lucide-react'
import { Card } from "@/components/ui/card"
import Dither from "@/components/Dither"
import { themes } from "@/lib/themes"


interface PageProps {
  params: any;
}

const PortfolioPage = async ({ params }: PageProps) => {
  const { userId } = await auth()

  const portfolio = await prisma.portfolio.findFirst({
    where: { username: params.username },
    include: {
      projects: {
        orderBy: { order: "asc" },
      },
      socialLinks: true,
    },
  })

  if (!portfolio) {
    return notFound()
  }

  const isOwner = userId === portfolio.userId

  // Ensure the theme is valid before accessing its properties
  const currentTheme = portfolio.theme as keyof typeof themes
  const themeToUse = themes[currentTheme] || themes.pink // Fallback to 'pink' if the theme is not found

  return (
    <div className="min-h-screen w-full relative">
      <Dither
        waveColor={themeToUse.waveColor}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.3}
        colorNum={4}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />

      <div className="container mx-auto py-8 px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-5xl mx-auto mb-8">
          <Card className="p-8 bg-black/60 backdrop-blur-md border-none  shadow-[0_0_25px rgba(57,197,187,0.2)] rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex-shrink-0">
                <div className="relative">
                <img
  src={portfolio.avatar || "/miku.jpg"}
  alt={portfolio.name}
  width={160}
  height={160}
  className={`w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-[0_0_15px rgba(57,197,187,0.4)] transition-transform duration-300 hover:scale-110`}
/>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-start text-center mx:text-left">
                <h1 className="text-3xl font-bold">{portfolio.name}</h1>
                <p className="text-gray-500">{portfolio.title}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-white" />
                    <a href={`mailto:${portfolio.email}`} className="hover:bg-neutral-400 transition-colors">
                      {portfolio.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-white" />
                    <span>{portfolio.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Social Links Section */}
        <div className="lg:w-full space-y-8 mb-8">
  {/* Social Links Section */}
  <Card className="p-6 bg-black/60 border-none shadow-[0_0_15px rgba(57,197,187,0.2)] rounded-xl">
    <h2 className="text-center text-xl font-bold mb-4 text-white">Links</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {portfolio.socialLinks?.github && (
        <a
          href={portfolio.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-all duration-300 hover:transform hover:scale-105"
        >
          <Github className="w-8 h-8 mb-2 text-primary" />
          <span className="text-sm font-medium">GitHub</span>
        </a>
      )}
      {portfolio.socialLinks?.twitter && (
        <a
          href={portfolio.socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-all duration-300 hover:transform hover:scale-105"
        >
          <Twitter className="w-8 h-8 mb-2 text-primary" />
          <span className="text-sm font-medium">Twitter</span>
        </a>
      )}
      {portfolio.socialLinks?.linkedin && (
        <a
          href={portfolio.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-all duration-300 hover:transform hover:scale-105"
        >
          <Linkedin className="w-8 h-8 mb-2 text-primary" />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
      )}
      {portfolio.socialLinks?.instagram && (
        <a
          href={portfolio.socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-all duration-300 hover:transform hover:scale-105"
        >
          <Instagram className="w-8 h-8 mb-2 text-primary" />
          <span className="text-sm font-medium">Instagram</span>
        </a>
      )}
    </div>
  </Card>
  </div>

        {/* Skills Section */}
        <div className="max-w-5xl mx-auto mb-8">
          <Card className={`p-6 bg-black/60 backdrop-blur-md border-none shadow-[0_0_15px rgba(57,197,187,0.2)] rounded-xl`}>
            <h2 className={`text-2xl font-bold mb-6 text-white text-center`}>
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {portfolio.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-4 py-2 bg-black/50 border border-primary/30 rounded-full text-sm font-medium text-white hover:bg-primary/20 transition-colors duration-300 transform hover:scale-105`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="max-w-5xl mx-auto">
          <h2
            className={`text-3xl font-bold mb-8 text-center text-white`}
          >
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.projects.map((project) => (
              <Card
                key={project.id}
                className={`overflow-hidden bg-black/60 backdrop-blur-md border-none shadow-[0_0_15px rgba(57,197,187,0.2)] rounded-xl transition-all duration-300 hover:shadow-[0_0_25px rgba(57,197,187,0.4)] hover:translate-y-[-5px]`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/miku.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 text-primary`}>{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 bg-primary/10 border border-primary/30 rounded text-xs font-medium text-primary`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-primary hover:text-pink-400 transition-colors font-medium`}
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-gray-300 hover:text-primary transition-colors font-medium`}
                      >
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Edit/Delete Buttons */}
        {isOwner && (
          <div className="flex justify-center space-x-4 mt-12">
            <EditButton username={params.username} />
            <DeletePortfolioDialog username={params.username} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioPage
