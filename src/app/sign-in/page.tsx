"use client"

import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative">
      <div className="relative z-10 ">
        <SignIn 
          path="/sign-in" 
          routing="path" 
          fallbackRedirectUrl="/create"
        />
      </div>
    </div>
  );
} 