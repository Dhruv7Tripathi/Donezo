"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 500); // match fade duration
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500",
        {
          "opacity-0": isFading,
          "opacity-100": !isFading,
        }
      )}
    >
      <Image
        src="/donezo.png"
        alt="App Logo"
        width={150}
        height={150}
        priority
      />
    </div>
  );
}
