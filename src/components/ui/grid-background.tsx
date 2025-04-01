"use client"

import type React from "react"
import { cn } from "~/lib/utils"

export function GridBackground({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) {
  return (
    <div className={cn("relative w-full overflow-hidden", containerClassName)}>
      <div className={cn("relative z-10", className)}>{children}</div>
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gray-700 bg-dot-white/[0.30]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/0" />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-r from-black via-black/50 to-black/0" />
      </div>
    </div>
  )
}

