"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

export function DeletePortfolioDialog({ username }: { username: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api", {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Portfolio deleted successfully")
        router.push("/")
      } else {
        toast.error("Failed to delete portfolio")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="destructive"
            className="bg-black/60 backdrop-blur-md border border-red-500/30 
              text-white hover:bg-black/80 group flex items-center gap-2"
          >
            <Trash className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            Delete Portfolio
          </Button>
        </motion.div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black/90 backdrop-blur-md border border-red-500/30">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete your portfolio and remove all data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black/60 hover:bg-black/80 border-gray-800">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/30"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Portfolio"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

