"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"

interface ProfileFormProps {
  setName: (name: string) => void;
  setTitle: (title: string) => void;
  setAvatar: (avatar: string) => void;
  setBio: (bio: string) => void;
  setEmail: (email: string) => void;
  setLocation: (location: string) => void;
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
}

export function ProfileForm({ setName, setTitle, setAvatar, setBio, setEmail, setLocation, name, title, bio, email, location }: ProfileFormProps) {
  const [localAvatar, setLocalAvatar] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('File selected:', file);
    if (file) {
      setLoading(true)
      const formData = new FormData();
      formData.append("file", file);
      console.log('Uploading file...');
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      console.log('Upload response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Uploaded image URL:', data.url); // This should now log the correct URL
        setLocalAvatar(data.url);
        setAvatar(data.url);
      } else {
        alert("Image upload failed.");
      }
      setLoading(false)
    } else {
      console.log('No file selected.');
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        <p className="text-gray-400">Add your personal information to your portfolio</p>
      </div>

      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={localAvatar || undefined} />
          <AvatarFallback>Upload</AvatarFallback>
        </Avatar>
        <Button variant="outline" className="gap-2" onClick={handleButtonClick} disabled={loading}>
          <Upload className="w-4 h-4" />
          {loading ? "Uploading..." : "Upload Avatar"}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="title">Bio</Label>
          <Input id="title" placeholder="e.g. Full Stack Developer" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g. Tokyo, Japan" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
    </div>
  )
}