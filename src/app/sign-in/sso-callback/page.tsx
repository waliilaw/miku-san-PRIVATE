"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const SSOCallback = () => {
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser(); // Include isLoaded to check if user data is ready

  useEffect(() => {
    console.log("isLoaded:", isLoaded);
    console.log("isSignedIn:", isSignedIn);
    console.log("user:", user);
    
    if (isLoaded) {
      if (isSignedIn && user) {
        const username = user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0] || `user-${user.id}`;
        router.push(`/${username}/create`);
      } else {
        router.push("/sign-in");
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  return <div>Loading...</div>; // Show loading message while waiting for user data
};

export default SSOCallback;
