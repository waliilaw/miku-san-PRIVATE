"use client"

import { SignIn, useSignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative">
      <div className="relative z-10 ">
        <SignIn 
          path="/sign-in" 
          routing="path" 
          fallbackRedirectUrl="/create"
          redirectUrl="/sign-in/sso-callback"
        />
 
      </div>
    </div>
  );
} 
