"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

const SSOCallback = () => {
  const router = useRouter();
  const { isSignedIn, user } = useSignIn();

  useEffect(() => {
    if (isSignedIn && user) {
      const username = user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0] || `user-${user.id}`;
      router.push(`/${username}/create`); // Redirect to the create page
    }
  }, [isSignedIn, user, router]);

  return <div>Loading...</div>; // You can add a loading spinner or message here
};

export default SSOCallback;
