"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, Code, Github, MessageSquare, Search, Zap, CheckCircle2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent } from "~/components/ui/card"
import { motion } from "framer-motion"
import { SparklesCore } from "~/components/ui/sparkles"
import { TracingBeam } from "~/components/ui/tracing-beam"
import { HoverEffect } from "~/components/ui/card-hover-effect"
import { AnimatedTooltip } from "~/components/ui/animated-tooltip"
import { MacbookScroll } from "~/components/ui/macbook-scroll"
import { GridBackground } from "~/components/ui/grid-background"
import { FloatingCard } from "~/components/ui/floating-card"
import { SparkleText } from "~/components/ui/sparkle-text"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    document.documentElement.classList.add("dark")
  }, [])

  const features = [
    {
      title: "Semantic Search",
      description: "Find exactly what you're looking for with natural language queries across your entire codebase.",
      icon: Search,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Code Explanations",
      description: "Get detailed explanations of complex code patterns and architecture decisions.",
      icon: Code,
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Instant Answers",
      description: "Get immediate responses to your questions without having to dig through documentation.",
      icon: Zap,
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const people = [
    {
      id: 1,
      name: "John Smith",
      designation: "Software Engineer",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      designation: "Product Manager",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Michael Chen",
      designation: "Data Scientist",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const cards = [
    {
      title: "Semantic Search",
      description: "Find exactly what you're looking for with natural language queries across your entire codebase.",
      icon: <Search className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Code Explanations",
      description: "Get detailed explanations of complex code patterns and architecture decisions.",
      icon: <Code className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Instant Answers",
      description: "Get immediate responses to your questions without having to dig through documentation.",
      icon: <Zap className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Repository Analysis",
      description: "Get insights into your codebase structure, dependencies, and potential issues.",
      icon: <Github className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Team Collaboration",
      description: "Share insights and knowledge with your team to improve productivity.",
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
    },
    {
      title: "AI-Powered Suggestions",
      description: "Receive intelligent suggestions for code improvements and best practices.",
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
    },
  ]

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen dark bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between h-16 py-4">
          <div className="flex items-centergap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Github className="h-6 w-6 text-green-500" />
              <span className="font-bold inline-block text-xl text-white">GitChat</span>
            </Link>
            
          </div>
          <div className="flex items-center gap-2">
            <Link href="/sign-in" passHref>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Log in
              </Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        
        <GridBackground containerClassName="min-h-screen">
        <div className="absolute inset-0 z-0">
              <SparklesCore
                id="tsparticlesbg"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={70}
                className="w-full h-full"
                particleColor="#22c55e"
              />
            </div>
          <section className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Badge variant="outline" className="mb-4 bg-green-900/30 text-green-400 border-green-800">
                    Powered by AI
                  </Badge>
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter max-w-3xl leading-tight text-white mb-6">
                    <SparkleText>GitChat</SparkleText>
                  </h1>
                  <p className="mt-4 text-gray-400 md:text-xl max-w-[700px] mx-auto">
                    Chat with your GitHub repositories. Ask questions, get insights, and understand your codebase
                    faster.
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white group">
                    Get started - it's free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>

              <div className="relative mt-16">
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 shadow-xl overflow-hidden">
                  <MacbookScroll
                    title={<span className="text-base text-gray-300">GitChat - Understanding your code</span>}
                    src="/placeholder.svg?height=1000&width=1600"
                    showGradient={false}
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                    Understand your code like never before
                  </h2>
                  <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    GitChat uses advanced RAG AI to provide deep insights into your GitHub repositories.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 relative">
            <div className="absolute inset-0 z-0">
              <SparklesCore
                id="tsparticlesbg"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={70}
                className="w-full h-full"
                particleColor="#22c55e"
              />
            </div>
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <TracingBeam>
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-8 items-center py-16">
                    <motion.div
                      className={`flex-1 ${index % 2 === 1 ? "md:order-2" : ""}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-900/30">
                        <feature.icon className="h-6 w-6 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{feature.title}</h3>
                      <p className="text-gray-400 mb-4">{feature.description}</p>
                      <Button variant="link" className="p-0 text-green-500 group">
                        Learn more{" "}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>

                    <motion.div
                      className="flex-1"
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                        <div className="bg-gray-800 p-2 flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <div className="ml-4 text-xs text-gray-400">gitchat.com</div>
                        </div>
                        <Image
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          width={600}
                          height={400}
                          className="w-full h-auto"
                        />
                      </div>
                    </motion.div>
                  </div>
                ))}
              </TracingBeam>
            </div>
          </section>

          <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                    Simple setup, powerful results
                  </h2>
                  <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get up and running in minutes with our easy-to-use platform.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <motion.div
                  className="flex flex-col justify-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900/30 text-green-500">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Connect your repository</h3>
                    <p className="text-gray-400">Simply paste your GitHub repository URL and authorize access.</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col justify-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900/30 text-green-500">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">We index your code</h3>
                    <p className="text-gray-400">
                      Our AI analyzes and indexes your codebase for semantic understanding.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col justify-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900/30 text-green-500">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Start chatting</h3>
                    <p className="text-gray-400">
                      Ask questions in natural language and get accurate, contextual answers.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <SparklesCore
                id="tsparticlesfooter"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={60}
                className="w-full h-full"
                particleColor="#ffffff"
              />
            </div>
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to transform how you understand code?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                    Join thousands of developers who are already using GitChat to boost their productivity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard" passHref>
                    <Button size="lg" variant="secondary" className="inline-flex items-center gap-2">
                      Get started for free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </GridBackground>
      </main>
      <footer className="w-full border-t border-gray-800 bg-black">
        <div className="container mx-auto flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">© 2025 GitChat. All rights reserved.</p>
          </div>
          
        </div>
      </footer>
    </div>
  )
}

