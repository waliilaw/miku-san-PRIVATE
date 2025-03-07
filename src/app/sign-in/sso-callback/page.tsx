"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const SSOCallback = () => {
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    console.log("isLoaded:", isLoaded);
    console.log("isSignedIn:", isSignedIn);
    console.log("user:", user);

    if (isLoaded) {
      if (isSignedIn && user) {
        const username = user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0] || `user-${user.id}`;
        console.log("Redirecting to:", `/${username}/create`);
        router.push(`/${username}/create`); // Redirect to the create page
      } else {
        console.log("User not signed in, redirecting to /sign-in");
        router.push("/sign-in"); // Redirect to sign-in if not signed in
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  return <div>Loading...</div>; // Show loading message while waiting for user data
};

export default SSOCallback;
