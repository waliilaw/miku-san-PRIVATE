export interface Portfolio {
    theme: string
    avatar: string | null
    name: string
    socialLinks: {
      github: string | null
      twitter: string | null
      linkedin: string | null
      instagram: string | null
      id: string
      portfolioId: string
    } | null
    projects: {
      title: string
      id: string
      description: string
      image: string
      technologies: string[]
      liveUrl: string | null
      githubUrl: string | null
      order: number
    }[]
    email: string
    location: string
    bio: string
    skills: string[]
    userId: string
    username: string
  }
  
  export type SocialPlatform = "github" | "twitter" | "linkedin" | "instagram"
  
  