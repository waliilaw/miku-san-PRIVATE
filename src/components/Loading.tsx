"use client"

import React from "react";
import Image from 'next/image'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <Image 
        src="/loading.gif" 
        alt="Loading..." 
        className="w-72 h-72" 
        width={288}
        height={288}
      />
    </div>
  );
};

export default Loading; 