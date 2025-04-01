"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "~/lib/utils"

export function SparkleText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>(
    [],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        opacity: Math.random() * 0.5 + 0.5,
      }

      setSparkles((prev) => [...prev, newSparkle])

      setTimeout(() => {
        setSparkles((prev) => prev.filter((sparkle) => sparkle.id !== newSparkle.id))
      }, 700)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn("relative inline-block", className)}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: sparkle.opacity, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#22c55e" />
          </svg>
        </motion.div>
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

