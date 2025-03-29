"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Twitter, Users, Star, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { useUser } from "@clerk/nextjs"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])



  if (!mounted) return null

  return (
   
<div>

      <header className=" fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm">
        <div className=" container mx-auto  py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-[#39c5bb] to-pink-400 text-transparent bg-clip-text"
          >
            Miku-san
          </Link>
          <div className="flex items-center gap-4">
            <Link href="https://twitter.com">
              <Twitter className="w-5 h-5 text-[#39c5bb] hover:text-pink-400 transition-colors" />
            </Link>
            <Link href="https://github.com">
              <Github className="w-5 h-5 text-[#39c5bb] hover:text-pink-400 transition-colors" />
            </Link>
            <Button className="bg-[#39c5bb] hover:bg-pink-400 text-black"        onClick={() => router.push('/create')}>Get Started</Button>
            <Button className="bg-gray-500 hover:bg-gray-600 text-white" onClick={() => router.push('/create?trial=true')}>
              Trial
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0">
         

          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 z-10">
            <div className="flex-1 text-center lg:text-left ">
              <motion.h1
                className="text-5xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Create Your
                <span className="block bg-gradient-to-r from-[#39c5bb] to-pink-400 text-transparent bg-clip-text">
                  Digital Portfolio
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Express yourself through a stunning portfolio website. Quick, easy, and uniquely you.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button className="bg-[#39c5bb] hover:bg-pink-400 text-black text-lg px-8 py-6"        onClick={() => router.push('/create')}>
                  Create Your Own
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/miku-7oxt99Xa5omgg3KiAYjOqzcJgblPm1.png"
                alt="Miku Illustration"
                width={600}
                height={600}
                className="drop-shadow-[0_0_90px_rgba(57,197,187,0.3)] pt-0 lg:pt-10 lg:mt-10 pl-10"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <Card className="bg-gray-900/50 border-[#39c5bb]/20 p-6">
                <div className="flex items-center gap-4 mb-2">
                  <Star className="w-6 h-6 text-[#39c5bb]" />
                  <span className="text-2xl font-bold">5.2k+</span>
                </div>
                <p className="text-gray-400">Portfolios Created</p>
              </Card>
              <Card className="bg-gray-900/50 border-[#39c5bb]/20 p-6">
                <div className="flex items-center gap-4 mb-2">
                <Users className="w-6 h-6 text-[#39c5bb]" />
                  <span className="text-2xl font-bold">10k+</span>
                </div>
                <p className="text-gray-400">Active Users</p>
              </Card>
              <Card className="bg-gray-900/50 border-[#39c5bb]/20 p-6">
                <div className="flex items-center gap-4 mb-2">
                  <GitFork className="w-6 h-6 text-[#39c5bb]" />
                  <span className="text-2xl font-bold">150+</span>
                </div>
                <p className="text-gray-400">Templates Available</p>
              </Card>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Asura?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Build your professional identity with our intuitive portfolio creation platform. Stand out in the
                digital world with customizable templates and unique designs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center pb-5">
              <div className="order-2 md:order-1">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/28837-1-hatsune-miku-clipart-t4KTZOzd7QVmXRryIOG5lL4AvAE2ni.png"
                  alt="Miku Tech"
                  width={400}
                  height={600}
                  className="mx-auto drop-shadow-[0_0_15px_rgba(57,197,187,0.3)]"
                />
              </div>
              <div className="flex flex-col items-center justify-center order-1 md:order-2 space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Easy Customization</h3>
                  <p className="text-gray-400">
                    Drag-and-drop interface with real-time preview. Make your portfolio truly yours.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Professional Templates</h3>
                  <p className="text-gray-400">Choose from our collection of professionally designed templates.</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Mobile Responsive</h3>
                  <p className="text-gray-400">Your portfolio looks perfect on any device, automatically.</p>
                  <Button 
                    className="bg-[#39c5bb] hover:bg-pink-400 text-black mt-10" 
                    onClick={() => router.push('/create')}
                  >
                    Explore Features
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    
      <footer className="bg-transparent py-8 border-t border-[#2ca3a0]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">© 2025 Asura. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-[#39c5bb]">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#39c5bb]">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#39c5bb]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

