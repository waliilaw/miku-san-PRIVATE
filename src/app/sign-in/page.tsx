"use client"

import { SignIn, useSignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const { isSignedIn  } : any  = useSignIn();

  useEffect(() => {
    if (isSignedIn) {
      // Redirect to the create page or the user's edit page after signing in
      const username = "user-username"; // Replace with logic to get the actual username
      router.push(`/${username}/edit`); // Redirect to the edit page
    }
  }, [isSignedIn, router]);

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
