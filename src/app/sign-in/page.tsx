"use client"

import { SignIn, useSignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const { isSignedIn, user } = useSignIn();

  useEffect(() => {
    if (isSignedIn && user) {
      // Redirect to the create page or the user's edit page after signing in
      const username = user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0] || `user-${user.id}`;
      router.push(`/${username}/create`); // Redirect to the edit page
    }
  }, [isSignedIn, user, router]);

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
