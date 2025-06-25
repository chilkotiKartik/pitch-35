"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  Star,
  Sparkles,
  Users,
  Trophy,
  ChevronDown,
  MessageCircle,
  X,
  Send,
  Menu,
  ExternalLink,
  ArrowUp,
  Calendar,
  Gift,
  Zap,
  Lightbulb,
  Code,
  Mic,
  Award,
  Timer,
  Globe,
  Heart,
  Shuffle,
  Volume2,
  VolumeX,
  MapPin,
  DollarSign,
  Users2,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

export default function PitchStormWebsite() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentSection, setCurrentSection] = useState("welcome")
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message:
        "🚀 Hello Space Explorer! I'm Karzo, your cosmic guide! Ready to launch your idea into the universe? Ask me anything about PitchStorm 2025!",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [welcomeStep, setWelcomeStep] = useState(0)
  const [countdown, setCountdown] = useState({ days: 45, hours: 12, minutes: 30, seconds: 45 })
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [ideaGenerated, setIdeaGenerated] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  // Enhanced chatbot knowledge base
  const chatbotKnowledge = {
    registration: {
      keywords: ["register", "signup", "sign up", "join", "participate", "how to register"],
      response:
        "🚀 Ready to launch your cosmic journey? Registration is 100% FREE! Click the glowing 'Register Now' button to access our Google Form. Early birds (before Feb 1st) get exclusive perks worth ₹50,000 including mentorship sessions, startup toolkit, and VIP networking access!",
    },
    team: {
      keywords: ["team", "group", "solo", "alone", "members", "teammates"],
      response:
        "👥 You have cosmic flexibility! Participate solo as a lone space explorer OR form teams of 2-4 members. We have team matching sessions on Day 1 for solo participants to find their perfect cosmic crew. Teams get collaboration tools and can win the 'Best Team Synergy' award worth ₹25,000!",
    },
    dates: {
      keywords: ["when", "date", "time", "schedule", "calendar"],
      response:
        "📅 PitchStorm 2025 is happening March 15-17, 2025 at Innovation Hub, Tech City! That's just 45 days away! Day 1: Team Formation & Ideation, Day 2: Development Sprint, Day 3: Pitch Presentations & Awards. Early bird registration ends February 1st!",
    },
    prizes: {
      keywords: ["prize", "reward", "money", "cash", "award", "win"],
      response:
        "🏆 Cosmic rewards await! 1st Place: ₹1,00,000 + 6-month incubation, 2nd: ₹50,000 + 3-month mentorship, 3rd: ₹25,000 + startup toolkit. Special awards: Best Innovation (₹15K), Social Impact (₹15K), Tech Excellence (₹15K), People's Choice (₹10K). Total prize pool: ₹2,00,000+!",
    },
    ideas: {
      keywords: ["idea", "pitch", "concept", "innovation", "solution", "problem"],
      response:
        "💡 All cosmic ideas welcome! Tech innovations, social impact solutions, sustainability projects, healthcare breakthroughs, education tools, fintech, AI/ML, blockchain, IoT - if it can change the world, we want to hear it! Need inspiration? Try our Idea Generator below!",
    },
    location: {
      keywords: ["where", "location", "venue", "address", "place"],
      response:
        "📍 Innovation Hub, Tech City! It's a hybrid cosmic event - join us in-person for the full experience OR participate online. Full venue details, maps, accommodation suggestions, and travel info sent after registration. Free parking and refreshments provided!",
    },
    eligibility: {
      keywords: ["who", "eligible", "age", "student", "professional", "requirements"],
      response:
        "🌟 OPEN TO ALL cosmic dreamers! Students, professionals, entrepreneurs, researchers, creators, freelancers - anyone with innovative ideas! No age limits, no qualification barriers, no experience required. We celebrate diversity and believe great ideas come from everywhere in the universe!",
    },
    mentorship: {
      keywords: ["mentor", "guidance", "help", "support", "expert"],
      response:
        "🧑‍🚀 Amazing mentorship awaits! Industry experts, successful entrepreneurs, VCs, and innovation leaders will guide you. Get 1-on-1 sessions, technical support, business advice, and pitch coaching. Mentors from top companies and startups will be available throughout the event!",
    },
    resources: {
      keywords: ["resource", "tool", "support", "facility", "equipment"],
      response:
        "🛠️ Full cosmic support provided! High-speed Wi-Fi, workspaces, presentation equipment, design tools access, technical support team, food & beverages, charging stations, quiet zones, collaboration areas, and 24/7 assistance during the event!",
    },
    networking: {
      keywords: ["network", "connect", "meet", "people", "community"],
      response:
        "🤝 Epic networking opportunities! Meet 500+ innovators from 50+ colleges, industry experts, investors, successful entrepreneurs, and potential co-founders. Special networking sessions, community Discord, LinkedIn group, and post-event meetups!",
    },
  }

  // Idea generator prompts
  const ideaPrompts = [
    "🌱 Sustainable solution for urban farming using AI",
    "🏥 Healthcare app for remote patient monitoring",
    "🎓 EdTech platform for skill-based learning",
    "💰 Fintech solution for micro-investments",
    "🌍 Social platform connecting volunteers with NGOs",
    "🚗 Smart transportation system for cities",
    "🏠 IoT solution for smart home automation",
    "🍔 Food waste reduction marketplace",
    "💼 Freelancer platform with skill verification",
    "🎮 Gamified fitness and wellness app",
    "🔒 Cybersecurity tool for small businesses",
    "🌊 Ocean cleanup technology innovation",
    "🧠 Mental health support AI chatbot",
    "📱 AR/VR solution for remote collaboration",
    "⚡ Renewable energy optimization system",
  ]

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)

      // Update current section based on scroll position
      const sections = ["hero", "characters", "timeline", "prizes", "team", "faq"]
      const currentPos = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (currentPos >= offsetTop && currentPos < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Welcome animation sequence
  useEffect(() => {
    if (showWelcome) {
      const sequence = [
        () => setWelcomeStep(1), // Portal opening
        () => setWelcomeStep(2), // Text fade in
        () => setWelcomeStep(3), // Button appear
      ]

      sequence.forEach((step, index) => {
        setTimeout(step, (index + 1) * 1500)
      })
    }
  }, [showWelcome])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    setCurrentSection("hero")
  }

  // Enhanced chatbot with better AI responses
  const handleChatSend = () => {
    if (!chatInput.trim()) return

    const userMessage = chatInput.toLowerCase()
    setChatMessages((prev) => [...prev, { type: "user", message: chatInput }])
    setChatInput("")

    setTimeout(() => {
      let botResponse =
        "🌟 Great question! I'm here to help you navigate your cosmic journey. Ask me about registration, teams, prizes, dates, ideas, or anything else about PitchStorm!"

      // Find matching response from knowledge base
      for (const [key, data] of Object.entries(chatbotKnowledge)) {
        if (data.keywords.some((keyword) => userMessage.includes(keyword))) {
          botResponse = data.response
          break
        }
      }

      // Special responses for specific queries
      if (userMessage.includes("hello") || userMessage.includes("hi")) {
        botResponse =
          "🚀 Hello cosmic explorer! Welcome to PitchStorm 2025! I'm Karzo, your personal space guide. I can help you with registration, team formation, event details, prizes, and much more. What would you like to know?"
      } else if (userMessage.includes("thank")) {
        botResponse =
          "🌟 You're welcome, space explorer! I'm always here to help you on your cosmic journey. Don't forget to register early for those amazing perks! Any other questions about PitchStorm?"
      } else if (userMessage.includes("cost") || userMessage.includes("fee") || userMessage.includes("free")) {
        botResponse =
          "💫 PitchStorm is 100% FREE! No registration fees, no hidden costs, no barriers - just pure innovation! We believe great ideas shouldn't be limited by finances. Plus, we provide food, resources, and amazing prizes!"
      }

      setChatMessages((prev) => [...prev, { type: "bot", message: botResponse }])
    }, 1000)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const generateIdea = () => {
    const randomIdea = ideaPrompts[Math.floor(Math.random() * ideaPrompts.length)]
    setIdeaGenerated(randomIdea)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setMusicPlaying(!musicPlaying)
    }
  }

  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
        {/* Animated space background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-black">
          {/* Animated stars */}
          {[...Array(300)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
              }}
            />
          ))}

          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Portal effect */}
        <div
          className={`absolute inset-0 transition-all duration-3000 ${welcomeStep >= 1 ? "scale-150 opacity-20" : "scale-100 opacity-100"}`}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 border-4 border-blue-500 rounded-full animate-spin-slow opacity-30"></div>
            <div className="absolute inset-8 border-4 border-purple-500 rounded-full animate-spin-reverse opacity-40"></div>
            <div className="absolute inset-16 border-4 border-pink-500 rounded-full animate-spin-slow opacity-50"></div>
            <div className="absolute inset-24 border-2 border-cyan-400 rounded-full animate-spin-reverse opacity-60"></div>
          </div>
        </div>

        <div
          className={`text-center z-10 space-y-8 transition-all duration-1000 ${welcomeStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="relative">
            <div className="w-48 h-48 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse-glow"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-8 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full animate-pulse-glow"></div>
              <Rocket className="absolute inset-0 m-auto w-24 h-24 text-white animate-rocket-launch" />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow-medium">
              PitchStorm
            </h1>
            <div className="space-y-3">
              <p className="text-4xl md:text-5xl text-blue-300 font-light animate-fade-in-up">2025</p>
              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delay">
                "Launch Your Idea Beyond the Stars"
              </p>
              <p className="text-xl text-purple-300 animate-fade-in-up-delay-2">
                March 15-17, 2025 • Innovation Hub, Tech City
              </p>
              <div className="flex justify-center items-center space-x-4 animate-fade-in-up-delay-2">
                <Badge className="bg-green-600 text-white px-4 py-2 text-lg">100% FREE</Badge>
                <Badge className="bg-purple-600 text-white px-4 py-2 text-lg">OPEN TO ALL</Badge>
                <Badge className="bg-blue-600 text-white px-4 py-2 text-lg">₹2L+ PRIZES</Badge>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${welcomeStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Button
              onClick={handleWelcomeComplete}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-16 py-8 text-2xl rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 animate-pulse-button"
            >
              <Rocket className="w-8 h-8 mr-4" />
              Begin Your Cosmic Mission
              <Sparkles className="w-8 h-8 ml-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/space-ambient.mp3" type="audio/mpeg" />
      </audio>

      {/* Interactive cursor trail */}
      <div
        className="fixed w-6 h-6 bg-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: "scale(0.8)",
        }}
      />

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/95 backdrop-blur-xl border-b border-purple-500/30 shadow-lg shadow-purple-500/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={scrollToTop}>
            <div className="relative">
              <Rocket className="w-10 h-10 text-blue-400 group-hover:text-purple-400 transition-all duration-300 group-hover:rotate-12" />
              <div className="absolute -inset-2 bg-blue-400/20 rounded-full group-hover:bg-purple-400/20 transition-all duration-300 animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PitchStorm
              </span>
              <p className="text-xs text-gray-400">2025 • Open to All</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", href: "hero", icon: Rocket },
              { name: "Characters", href: "characters", icon: Users },
              { name: "Timeline", href: "timeline", icon: Calendar },
              { name: "Prizes", href: "prizes", icon: Trophy },
              { name: "Hosts", href: "team", icon: Star },
              { name: "FAQ", href: "faq", icon: Lightbulb },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`flex items-center space-x-2 transition-all duration-300 group relative px-3 py-2 rounded-lg ${
                  currentSection === item.href
                    ? "text-blue-400 bg-blue-400/10"
                    : "text-gray-300 hover:text-blue-400 hover:bg-blue-400/5"
                }`}
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
                <div
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                    currentSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></div>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Music Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleMusic} className="hidden md:flex hover:bg-purple-500/20">
              {musicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>

            <Button
              className="hidden md:flex bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              onClick={() => window.open("https://forms.google.com/d/e/1FAIpQLSe_example_form_id/viewform", "_blank")}
            >
              <Zap className="w-4 h-4 mr-2" />
              Register FREE
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/98 backdrop-blur-xl border-t border-purple-500/30">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {[
                { name: "Home", href: "hero", icon: Rocket },
                { name: "Characters", href: "characters", icon: Users },
                { name: "Timeline", href: "timeline", icon: Calendar },
                { name: "Prizes", href: "prizes", icon: Trophy },
                { name: "Hosts", href: "team", icon: Star },
                { name: "FAQ", href: "faq", icon: Lightbulb },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-3 hover:text-blue-400 transition-colors py-3 w-full text-left"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-lg">{item.name}</span>
                </button>
              ))}
              <div className="pt-4 border-t border-gray-700">
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 rounded-full text-lg"
                  onClick={() => {
                    window.open("https://forms.google.com/d/e/1FAIpQLSe_example_form_id/viewform", "_blank")
                    setMobileMenuOpen(false)
                  }}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Register FREE Now
                </Button>
                <Button variant="ghost" onClick={toggleMusic} className="w-full mt-2 py-3">
                  {musicPlaying ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
                  {musicPlaying ? "Pause Music" : "Play Space Music"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-black">
          {/* Enhanced constellation */}
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${3 + Math.random() * 5}s`,
              }}
            />
          ))}

          {/* Floating cosmic elements */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`cosmic-${i}`}
              className="absolute animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"></div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 text-center z-10">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Enhanced Countdown Timer */}
            <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/40 shadow-2xl">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Timer className="w-8 h-8 text-purple-300" />
                <p className="text-2xl text-purple-300 font-bold">🚀 Launch Countdown</p>
              </div>
              <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 mb-3 shadow-lg">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        {item.value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow-medium">
                  Mission Control
                </h1>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <Badge className="bg-green-600 text-white px-6 py-3 text-lg font-bold animate-pulse">
                    <Gift className="w-5 h-5 mr-2" />
                    100% FREE
                  </Badge>
                  <Badge className="bg-purple-600 text-white px-6 py-3 text-lg font-bold animate-pulse">
                    <Globe className="w-5 h-5 mr-2" />
                    OPEN TO ALL
                  </Badge>
                  <Badge className="bg-blue-600 text-white px-6 py-3 text-lg font-bold animate-pulse">
                    <Trophy className="w-5 h-5 mr-2" />
                    ₹2L+ PRIZES
                  </Badge>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                🌟 Welcome aboard the ultimate space station where{" "}
                <span className="text-blue-400 font-semibold">dreams take flight</span>. No barriers. No limits. Just{" "}
                <span className="text-purple-400 font-semibold">creative minds across the galaxy</span> pitching the
                future.
              </p>

              {/* Enhanced Event highlights */}
              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    icon: DollarSign,
                    title: "₹2L+ Prizes",
                    desc: "Cash + Resources",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: Users2,
                    title: "500+ Explorers",
                    desc: "From 50+ colleges",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Calendar,
                    title: "3 Epic Days",
                    desc: "March 15-17, 2025",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: MapPin,
                    title: "Hybrid Event",
                    desc: "Online + Offline",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group transform hover:scale-105"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 animate-pulse-button group"
                onClick={() => window.open("https://forms.google.com/d/e/1FAIpQLSe_example_form_id/viewform", "_blank")}
              >
                <Rocket className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Register FREE - Early Bird
                <Sparkles className="w-6 h-6 ml-3 group-hover:animate-spin" />
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                onClick={() => scrollToSection("characters")}
              >
                🛰️ Explore Universe
              </Button>
            </div>

            {/* Idea Generator */}
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-lg rounded-2xl p-8 border border-indigo-500/30 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Lightbulb className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Cosmic Idea Generator</h3>
              </div>
              <p className="text-gray-300 mb-6">Need inspiration? Let the universe spark your next big idea!</p>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button
                  onClick={generateIdea}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-full"
                >
                  <Shuffle className="w-5 h-5 mr-2" />
                  Generate Idea
                </Button>
                {ideaGenerated && (
                  <div className="bg-gray-800/50 rounded-lg p-4 flex-1">
                    <p className="text-blue-300 font-semibold">{ideaGenerated}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Registration incentives */}
            <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/40 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Timer className="w-8 h-8 text-yellow-400" />
                <p className="text-3xl font-bold text-yellow-300">Early Bird Special!</p>
              </div>
              <p className="text-xl text-gray-300 mb-6">Register before February 1st, 2025 and unlock cosmic perks:</p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Users, text: "Exclusive mentorship sessions with industry leaders" },
                  { icon: Briefcase, text: "Startup toolkit & resources worth ₹50,000" },
                  { icon: Heart, text: "Priority team matching & VIP networking" },
                  { icon: GraduationCap, text: "Post-event incubation opportunities" },
                ].map((perk, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <perk.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-300">{perk.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-10 h-10 text-blue-400" />
        </div>
      </section>

      {/* Enhanced Cosmic Characters Section */}
      <section id="characters" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-glow-medium">
              Cosmic Characters
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              🌌 Meet the legendary space explorers representing different types of innovators and dreamers.
              <span className="text-blue-400"> Choose your cosmic identity and join your tribe!</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                emoji: "🧑‍🚀",
                name: "Dreamonaut",
                title: "The Visionary Explorer",
                description: "Big thinkers & innovators who see beyond the horizon",
                quote: "Every great idea starts with a dream that refuses to stay grounded!",
                color: "from-blue-500 via-cyan-500 to-blue-600",
                skills: ["Vision", "Innovation", "Leadership"],
                power: "Imagination Amplifier",
                percentage: "25%",
              },
              {
                emoji: "🪐",
                name: "AstroBuilder",
                title: "The Cosmic Engineer",
                description: "Coders, makers, and tinkerers who build the impossible",
                quote: "I build the impossible, one line of code at a time!",
                color: "from-purple-500 via-pink-500 to-purple-600",
                skills: ["Coding", "Building", "Problem Solving"],
                power: "Reality Constructor",
                percentage: "30%",
              },
              {
                emoji: "📡",
                name: "NovaSpeak",
                title: "The Galactic Communicator",
                description: "Master communicators & presenters who inspire galaxies",
                quote: "The best ideas shine brightest when shared with the universe!",
                color: "from-green-500 via-emerald-500 to-green-600",
                skills: ["Communication", "Presentation", "Inspiration"],
                power: "Cosmic Broadcaster",
                percentage: "20%",
              },
              {
                emoji: "🧠",
                name: "CosmoThinker",
                title: "The Deep Space Analyst",
                description: "Researchers & problem solvers who decode the universe",
                quote: "In the depths of space, I find solutions to earthly problems!",
                color: "from-orange-500 via-red-500 to-orange-600",
                skills: ["Research", "Analysis", "Strategy"],
                power: "Universal Decoder",
                percentage: "25%",
              },
            ].map((character, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border-gray-700 hover:border-purple-500/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group cursor-pointer relative overflow-hidden"
              >
                {/* Animated background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                ></div>

                <CardContent className="p-8 text-center space-y-6 relative z-10">
                  <div className="relative">
                    <div
                      className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-r ${character.color} flex items-center justify-center text-5xl group-hover:animate-pulse-glow shadow-lg group-hover:shadow-2xl transition-all duration-500`}
                    >
                      {character.emoji}
                    </div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 animate-spin-slow transition-all duration-500"></div>
                    <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white">{character.percentage}</Badge>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {character.name}
                    </h3>
                    <p className="text-sm font-semibold text-purple-400">{character.title}</p>
                    <p className="text-gray-400 leading-relaxed text-sm">{character.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {character.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-blue-400 font-semibold">⚡ {character.power}</p>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-lg p-4 border border-gray-600/50">
                      <p className="text-sm text-blue-300 italic leading-relaxed">"{character.quote}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-gray-300 mb-6">🎭 Which cosmic character represents your innovation style?</p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
              onClick={() => window.open("https://forms.google.com/d/e/1FAIpQLSe_example_form_id/viewform", "_blank")}
            >
              Join Your Cosmic Tribe
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section id="timeline" className="py-24 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-glow-medium">
              Mission Timeline
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              🚀 Your epic journey from idea conception to cosmic launch - every great mission has a detailed flight
              plan
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Enhanced timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>

              {[
                {
                  icon: Users,
                  title: "👨‍🚀 Team Formation & Registration",
                  date: "March 15, 2025 - Day 1",
                  time: "10:00 AM - 12:00 PM",
                  description:
                    "Assemble your crew or join forces with fellow space explorers. Team matching sessions, icebreakers, and welcome ceremony.",
                  details: [
                    "Max 4 members per team",
                    "Solo participants welcome",
                    "Skill-based matching available",
                    "Welcome kit distribution",
                  ],
                  position: "left",
                },
                {
                  icon: Lightbulb,
                  title: "🛠️ Ideation & Brainstorming",
                  date: "March 15-16, 2025 - Day 1-2",
                  time: "12:00 PM - 11:59 PM",
                  description:
                    "Brainstorm solutions that could change the universe. Mentorship sessions, idea validation workshops, and cosmic inspiration.",
                  details: [
                    "24-hour ideation marathon",
                    "Expert mentorship sessions",
                    "Resource library access",
                    "Idea validation workshops",
                  ],
                  position: "right",
                },
                {
                  icon: Code,
                  title: "🔧 Development & Prototyping",
                  date: "March 16, 2025 - Day 2",
                  time: "12:00 AM - 6:00 PM",
                  description:
                    "Build your prototype, create your presentation, and prepare for the cosmic showcase with full technical support.",
                  details: [
                    "Technical support 24/7",
                    "Design resources provided",
                    "Progress checkpoints",
                    "Presentation coaching",
                  ],
                  position: "left",
                },
                {
                  icon: Mic,
                  title: "🎤 Pitch Presentations",
                  date: "March 17, 2025 - Day 3",
                  time: "9:00 AM - 4:00 PM",
                  description:
                    "Present your idea to the cosmic council of judges, industry experts, and live audience. Show the universe your innovation!",
                  details: [
                    "5-minute pitch + 3-minute Q&A",
                    "Live streaming available",
                    "Audience voting system",
                    "Expert judge panel",
                  ],
                  position: "right",
                },
                {
                  icon: Trophy,
                  title: "🌌 Awards & Celebration",
                  date: "March 17, 2025 - Day 3",
                  time: "5:00 PM - 8:00 PM",
                  description:
                    "Celebrate the most innovative solutions and their creators in a grand cosmic celebration with prizes and networking.",
                  details: [
                    "Multiple award categories",
                    "₹2L+ prize distribution",
                    "Networking dinner",
                    "Future collaboration opportunities",
                  ],
                  position: "left",
                },
              ].map((phase, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-16 ${phase.position === "right" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-1/2 ${phase.position === "right" ? "pl-12" : "pr-12"}`}>
                    <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border-gray-700 hover:border-purple-500/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group">
                      <CardContent className="p-8">
                        <div className="flex items-center space-x-4 mb-6">
                          <div
                            className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:animate-pulse-glow transition-all duration-300`}
                          >
                            <phase.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{phase.title}</h3>
                            <p className="text-blue-400 font-semibold">{phase.date}</p>
                            <p className="text-purple-300 text-sm">{phase.time}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{phase.description}</p>
                        <div className="space-y-2">
                          {phase.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm text-gray-400">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-black z-10 shadow-lg shadow-purple-500/50"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Prizes Section */}
      <section id="prizes" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-6 animate-glow-medium">
              Cosmic Rewards
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              🏆 Stellar prizes await the most innovative cosmic explorers. Your ideas deserve recognition across the
              galaxy!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              {
                rank: "🥇 1st Place",
                prize: "₹1,00,000",
                icon: "👑",
                color: "from-yellow-500 to-orange-500",
                benefits: [
                  "Cash Prize ₹1,00,000",
                  "6-month Incubation Program",
                  "Dedicated Mentorship",
                  "Startup Resource Kit",
                  "Media Coverage",
                ],
              },
              {
                rank: "🥈 2nd Place",
                prize: "₹50,000",
                icon: "🌟",
                color: "from-gray-400 to-gray-600",
                benefits: [
                  "Cash Prize ₹50,000",
                  "3-month Mentorship",
                  "Networking Access",
                  "Resource Kit",
                  "Certificate of Excellence",
                ],
              },
              {
                rank: "🥉 3rd Place",
                prize: "₹25,000",
                icon: "⭐",
                color: "from-orange-600 to-red-600",
                benefits: [
                  "Cash Prize ₹25,000",
                  "1-month Mentorship",
                  "Startup Toolkit",
                  "Certificate",
                  "Community Access",
                ],
              },
            ].map((prize, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border-gray-700 hover:border-yellow-500/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30 group relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prize.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                ></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div
                    className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${prize.color} flex items-center justify-center text-4xl mb-6 group-hover:animate-pulse-glow shadow-lg`}
                  >
                    {prize.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{prize.rank}</h3>
                  <p className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6">
                    {prize.prize}
                  </p>
                  <div className="space-y-3">
                    {prize.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Best Innovation", prize: "₹15,000", icon: "💡", desc: "Most creative solution" },
              { title: "Social Impact", prize: "₹15,000", icon: "🌍", desc: "Positive social change" },
              { title: "Tech Excellence", prize: "₹15,000", icon: "⚡", desc: "Technical brilliance" },
              { title: "People's Choice", prize: "₹10,000", icon: "❤️", desc: "Audience favorite" },
            ].map((special, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg border-purple-500/30 hover:border-purple-400/70 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{special.icon}</div>
                  <h4 className="font-bold text-white mb-2">{special.title}</h4>
                  <p className="text-purple-300 font-semibold text-lg">{special.prize}</p>
                  <p className="text-gray-400 text-sm mt-2">{special.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl text-gray-300 mb-6">
              💫 Total Prize Pool: <span className="text-yellow-400 font-bold">₹2,00,000+</span>
            </p>
            <Button
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-12 py-6 text-xl rounded-full transform hover:scale-110 transition-all duration-300"
              onClick={() => window.open("https://forms.google.com/d/e/1FAIpQLSe_example_form_id/viewform", "_blank")}
            >
              <Trophy className="w-6 h-6 mr-3" />
              Compete for Cosmic Rewards
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Registration Section */}
      <section
        id="register"
        className="py-24 relative bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-glow-medium">
                Ready to Launch?
              </h2>
              <p className="text-2xl text-gray-300 leading-relaxed">
                🚀 Join the cosmic community of <span className="text-blue-400 font-semibold">500+ innovators</span>{" "}
                from <span className="text-purple-400 font-semibold">50+ colleges</span> and pitch your idea to the
                stars
              </p>
            </div>

            {/* Registration benefits */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Gift,
                  title: "100% Free",
                  desc: "No costs, just pure innovation",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Users,
                  title: "Expert Mentorship",
                  desc: "Learn from industry leaders",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Award,
                  title: "Epic Networking",
                  desc: "Connect with innovators",
                  color: "from-purple-500 to-pink-500",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow`}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-xl">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="relative">
              <Button
                className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white px-20 py-10 text-3xl rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 animate-pulse-button group"
                onClick={() => window.open("https://forms.google.com/d/e/1FAIpQLSe_example_form_id/viewform", "_blank")}
              >
                <Rocket className="w-10 h-10 mr-4 group-hover:rotate-12 transition-transform" />
                Register FREE Now!
                <ExternalLink className="w-8 h-8 ml-4" />
              </Button>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/40 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Timer className="w-8 h-8 text-yellow-400" />
                <p className="text-2xl font-bold text-yellow-300">Early Bird Special - Ends Feb 1st!</p>
              </div>
              <p className="text-lg text-gray-300 mb-4">Register now and unlock exclusive cosmic perks:</p>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Exclusive mentorship sessions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Startup toolkit worth ₹50,000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Priority team matching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">VIP networking access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team/Hosts Section */}
      <section id="team" className="py-24 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-6 animate-glow-medium">
              Cosmic Hosts
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              🌟 Meet the legendary organizations and space commanders orchestrating this cosmic journey across the
              innovation galaxy
            </p>
          </div>

          {/* Host Organizations */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-white mb-12">🏢 Hosting Organizations</h3>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 hover:border-blue-500/70 shadow-2xl hover:shadow-blue-500/30">
                  <Image
                    src="/images/nexora-logo.jpg"
                    alt="Nexora - Innovation & Entrepreneurship"
                    width={300}
                    height={150}
                    className="rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg"
                  />
                  <div className="mt-6 text-center">
                    <h4 className="text-2xl font-bold text-white mb-2">Nexora</h4>
                    <p className="text-blue-400 font-semibold">Innovation & Entrepreneurship</p>
                    <p className="text-gray-400 mt-2">Empowering the next generation of innovators and entrepreneurs</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 hover:border-yellow-500/70 shadow-2xl hover:shadow-yellow-500/30">
                  <Image
                    src="/images/saranda-logo.jpg"
                    alt="Saranda - The House of Excellence and Innovation"
                    width={300}
                    height={150}
                    className="rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg"
                  />
                  <div className="mt-6 text-center">
                    <h4 className="text-2xl font-bold text-white mb-2">Saranda</h4>
                    <p className="text-yellow-400 font-semibold">The House of Excellence and Innovation</p>
                    <p className="text-gray-400 mt-2">Fostering excellence and innovation in every endeavor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Crew */}
          <div>
            <h3 className="text-3xl font-bold text-center text-white mb-12">🧑‍🚀 Mission Crew</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  name: "Captain Nova",
                  role: "Mission Commander",
                  specialty: "Event Leadership & Strategy",
                  emoji: "👨‍🚀",
                  color: "from-blue-500 to-cyan-500",
                  description: "Leading the cosmic mission with vision and expertise",
                },
                {
                  name: "Commander Stellar",
                  role: "Tech Navigator",
                  specialty: "Platform Management & Innovation",
                  emoji: "👩‍💻",
                  color: "from-purple-500 to-pink-500",
                  description: "Navigating the technical cosmos of innovation",
                },
                {
                  name: "Lieutenant Cosmos",
                  role: "Communications Officer",
                  specialty: "Community Engagement & Outreach",
                  emoji: "📡",
                  color: "from-green-500 to-blue-500",
                  description: "Connecting minds across the innovation galaxy",
                },
                {
                  name: "Engineer Quantum",
                  role: "Systems Specialist",
                  specialty: "Technical Support & Infrastructure",
                  emoji: "⚙️",
                  color: "from-orange-500 to-red-500",
                  description: "Building the foundation for cosmic innovation",
                },
                {
                  name: "Pilot Nebula",
                  role: "Operations Chief",
                  specialty: "Event Coordination & Logistics",
                  emoji: "🛸",
                  color: "from-indigo-500 to-purple-500",
                  description: "Orchestrating seamless cosmic operations",
                },
                {
                  name: "Scientist Orbit",
                  role: "Research Lead",
                  specialty: "Innovation Strategy & Analysis",
                  emoji: "🔬",
                  color: "from-teal-500 to-green-500",
                  description: "Researching the frontiers of innovation",
                },
              ].map((member, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border-gray-700 hover:border-purple-500/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group cursor-pointer"
                >
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="relative">
                      <div
                        className={`w-28 h-28 mx-auto bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center group-hover:animate-pulse-glow shadow-lg text-4xl`}
                      >
                        {member.emoji}
                      </div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 animate-spin-slow transition-all duration-500"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 mb-2 font-semibold">{member.role}</p>
                      <Badge
                        variant="secondary"
                        className="bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 mb-3"
                      >
                        {member.specialty}
                      </Badge>
                      <p className="text-gray-400 text-sm">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-16 space-y-6">
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              🤝 Powered by innovation communities dedicated to launching the next generation of cosmic ideas and
              stellar entrepreneurs across the universe
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
              onClick={() => window.open("https://forms.google.com/d/e/1FAIpQLSe_example_form_id/viewform", "_blank")}
            >
              Join Our Cosmic Community
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-glow-medium">
              Mission Intel
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              🛰️ Everything you need to know for a successful cosmic launch - your complete mission briefing
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-6">
              {[
                {
                  question: "🚀 What is PitchStorm 2025?",
                  answer:
                    "PitchStorm is the ultimate space-themed ideathon where innovators from across the galaxy come together to pitch their most creative ideas. It's a 3-day intensive event (March 15-17, 2025) open to all types of ideas - tech, social impact, sustainability, healthcare, education, or any innovative solution that can change the world. It's 100% FREE and open to everyone!",
                },
                {
                  question: "💫 How do I register and is it really free?",
                  answer:
                    "Yes, it's completely FREE! Simply click the 'Register Now' button to access our Google Form. No hidden costs, no registration fees, no barriers. We believe innovation should be accessible to everyone. Early bird registrants (before Feb 1st) get exclusive perks worth ₹50,000 including mentorship, startup toolkit, and VIP access!",
                },
                {
                  question: "👥 Can I participate solo or do I need a team?",
                  answer:
                    "Both options are welcome! You can participate as a solo space explorer or form teams of 2-4 members. We have team matching sessions on Day 1 for solo participants to find their perfect cosmic crew. Teams get access to collaboration tools and can compete for the 'Best Team Synergy' award worth ₹25,000!",
                },
                {
                  question: "🏆 What prizes and rewards are available?",
                  answer:
                    "Amazing cosmic rewards await! 1st Place: ₹1,00,000 + 6-month incubation, 2nd Place: ₹50,000 + 3-month mentorship, 3rd Place: ₹25,000 + startup toolkit. Plus special category awards: Best Innovation (₹15K), Social Impact (₹15K), Tech Excellence (₹15K), People's Choice (₹10K). Total prize pool exceeds ₹2,00,000!",
                },
                {
                  question: "⭐ What are the judging criteria?",
                  answer:
                    "Ideas are evaluated on: Innovation & Creativity (25%), Feasibility & Implementation (25%), Impact Potential (25%), and Presentation Quality (25%). Our cosmic council includes industry experts, successful entrepreneurs, VCs, and innovation leaders who believe in fair and transparent evaluation of all cosmic concepts.",
                },
                {
                  question: "📍 Where is the event happening?",
                  answer:
                    "PitchStorm 2025 takes place at the Innovation Hub, Tech City from March 15-17, 2025. It's a hybrid cosmic event - you can participate both online and offline for maximum flexibility. Full venue details, maps, accommodation suggestions, and travel information will be sent after registration.",
                },
                {
                  question: "🎯 Who can participate?",
                  answer:
                    "PitchStorm is OPEN TO ALL cosmic dreamers! Students, professionals, entrepreneurs, researchers, creators, freelancers, anyone with innovative ideas - you're welcome! No age restrictions, no qualification barriers, no experience required. We celebrate diversity and believe the best ideas can come from anywhere in the universe.",
                },
                {
                  question: "🛠️ What resources and support will be provided?",
                  answer:
                    "Participants get comprehensive cosmic support: Expert mentorship sessions, 24/7 technical support team, Design resources and tools, Startup toolkit, Networking opportunities, Food and refreshments, High-speed Wi-Fi, Presentation equipment, Quiet zones, Collaboration areas, and post-event incubation opportunities.",
                },
                {
                  question: "💡 What types of ideas are welcome?",
                  answer:
                    "ALL cosmic ideas are welcome! Technology innovations, social impact solutions, sustainability projects, healthcare breakthroughs, education tools, fintech, AI/ML, blockchain, IoT, gaming, entertainment, agriculture, space tech - if it can change the world or solve a problem, we want to hear it! Use our Idea Generator for inspiration.",
                },
                {
                  question: "🌐 How can I stay updated?",
                  answer:
                    "Stay connected with the cosmic community! Follow our social media channels, join our Discord server (link sent after registration), subscribe to our newsletter, and chat with Karzo (our AI assistant) anytime for real-time updates. We'll keep you informed about all cosmic developments!",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-white hover:text-blue-400 transition-colors py-6">
                    <span className="flex items-center space-x-3 text-lg">
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-6 leading-relaxed text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 border-t border-gray-800 bg-gradient-to-r from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-12">
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="relative">
                <Rocket className="w-12 h-12 text-blue-400" />
                <div className="absolute -inset-2 bg-blue-400/20 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  PitchStorm 2025
                </span>
                <p className="text-gray-400">Launch Your Idea Beyond the Stars</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div>
                <h4 className="font-bold text-white mb-4">🗓️ Event Details</h4>
                <div className="space-y-2 text-gray-400">
                  <p>📅 March 15-17, 2025</p>
                  <p>📍 Innovation Hub, Tech City</p>
                  <p>⏰ 3 Days of Innovation</p>
                  <p>🌐 Hybrid Event</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">🎯 Quick Links</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => scrollToSection("register")}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-left"
                  >
                    Register Free
                  </button>
                  <button
                    onClick={() => scrollToSection("timeline")}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-left"
                  >
                    Event Timeline
                  </button>
                  <button
                    onClick={() => scrollToSection("prizes")}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-left"
                  >
                    Prizes & Rewards
                  </button>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-left"
                  >
                    FAQ & Support
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">🏢 Hosts</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Nexora</p>
                  <p>Innovation & Entrepreneurship</p>
                  <p>Saranda</p>
                  <p>House of Excellence</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">🌐 Connect</h4>
                <div className="flex justify-center space-x-4">
                  <Button variant="ghost" size="icon" className="hover:text-blue-400 hover:bg-blue-400/10">
                    <span className="text-2xl">📧</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-blue-400 hover:bg-blue-400/10">
                    <span className="text-2xl">📱</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-blue-400 hover:bg-blue-400/10">
                    <span className="text-2xl">💼</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-blue-400 hover:bg-blue-400/10">
                    <span className="text-2xl">🌐</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-800">
              <p className="text-gray-400 italic text-lg">
                "Every idea begins with a spark that can light up the universe"
              </p>
              <p className="text-sm text-gray-500">© 2025 PitchStorm. Launching dreams beyond the stars. 🚀✨</p>
              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <span>Open to All</span>
                <span>•</span>
                <span>100% Free</span>
                <span>•</span>
                <span>₹2L+ Prizes</span>
                <span>•</span>
                <span>Innovation for Everyone</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Karzo Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <div className="relative group">
            <Button
              onClick={() => setChatOpen(true)}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 animate-pulse-glow"
            >
              <div className="text-center">
                <MessageCircle className="w-8 h-8 mb-1" />
                <span className="text-xs font-bold">Karzo</span>
              </div>
            </Button>
            <div className="absolute -top-16 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              🤖 Ask me anything about PitchStorm!
            </div>
          </div>
        ) : (
          <Card className="w-96 h-[600px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-purple-500/50 shadow-2xl shadow-purple-500/20">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse-glow">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <span className="font-bold text-white text-lg">Karzo</span>
                  <p className="text-xs text-gray-400">Your Cosmic AI Guide</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)} className="hover:text-red-400">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 h-96">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-4 rounded-2xl text-sm ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-3 mb-3">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about registration, prizes, timeline..."
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 rounded-full"
                  onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                />
                <Button
                  onClick={handleChatSend}
                  size="icon"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Register", "Prizes", "Timeline", "Teams"].map((topic) => (
                  <Button
                    key={topic}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setChatInput(topic)
                      handleChatSend()
                    }}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300"
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl z-40 transform hover:scale-110 transition-all duration-300"
          size="icon"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}
