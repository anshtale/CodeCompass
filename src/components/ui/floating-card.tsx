"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "~/lib/utils"

export function FloatingCard({
  children,
  className,
  floatIntensity = 10,
  rotateIntensity = 2,
  initialOffset = { x: 0, y: 0 },
}: {
  children: React.ReactNode
  className?: string
  floatIntensity?: number
  rotateIntensity?: number
  initialOffset?: { x: number; y: number }
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const newX = Math.sin(Date.now() / 2000) * floatIntensity
      const newY = Math.sin(Date.now() / 2500) * floatIntensity

      const rotX = Math.sin(Date.now() / 2800) * rotateIntensity
      const rotY = Math.sin(Date.now() / 3200) * rotateIntensity

      setPosition({ x: newX + initialOffset.x, y: newY + initialOffset.y })
      setRotation({ x: rotX, y: rotY })
    }, 50)

    return () => clearInterval(interval)
  }, [floatIntensity, rotateIntensity, initialOffset])

  return (
    <motion.div
      ref={ref}
      className={cn("relative rounded-xl bg-white/5 backdrop-blur-sm shadow-xl border border-white/10", className)}
      style={{
        x: position.x,
        y: position.y,
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
    >
      {children}
    </motion.div>
  )
}

