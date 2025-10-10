"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    //@ts-ignore
    console.log(window);
  }, []);
  return <div className="flex h-full"></div>;
}

