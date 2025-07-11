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
  Award,
  Timer,
  Globe,
  Shuffle,
  Volume2,
  VolumeX,
  Users2,
  Briefcase,
  GraduationCap,
  Video,
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
  const [countdown, setCountdown] = useState({ days: 5, hours: 8, minutes: 45, seconds: 30 })
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [ideaGenerated, setIdeaGenerated] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  // Enhanced chatbot knowledge base
  const chatbotKnowledge = {
    registration: {
      keywords: ["register", "signup", "sign up", "join", "participate", "how to register"],
      response:
        "🚀 Ready to launch your cosmic journey? Registration is 100% FREE! Click the 'Register Now' button to access our Google Form. Registration deadline is July 10th! Early registration gets you priority support and exclusive resources!",
    },
    team: {
      keywords: ["team", "group", "solo", "alone", "members", "teammates"],
      response:
        "👥 You have cosmic flexibility! Participate SOLO as a lone space explorer OR form teams of 2-4 members. Both solo and team participants are welcome! Teams can collaborate better but solo innovators get full creative control. Choose what works best for your cosmic journey!",
    },
    dates: {
      keywords: ["when", "date", "time", "schedule", "calendar"],
      response:
        "📅 PitchStorm 2025 Timeline: Registration Deadline - July 10th, 2nd Round (Prototype) - July 15th, Grand Finale (Judges) - July 22nd. All rounds will be conducted via Google Meet for maximum accessibility!",
    },
    prizes: {
      keywords: ["prize", "reward", "money", "cash", "award", "win"],
      response:
        "🏆 Exciting SURPRISE PRIZES await! We're keeping the rewards mysterious to add to the cosmic excitement! What we can tell you is that winners will receive amazing prizes, recognition, mentorship opportunities, and resources to launch their ideas into the universe!",
    },
    ideas: {
      keywords: ["idea", "pitch", "concept", "innovation", "solution", "problem"],
      response:
        "💡 All cosmic ideas welcome! Tech innovations, social impact solutions, sustainability projects, healthcare breakthroughs, education tools, fintech, AI/ML, blockchain, IoT - if it can change the world, we want to hear it! Need inspiration? Try our Idea Generator!",
    },
    location: {
      keywords: ["where", "location", "venue", "address", "place", "google meet"],
      response:
        "📍 PitchStorm 2025 is a fully ONLINE event conducted via Google Meet! This means you can participate from anywhere in the universe! All rounds - registration review, prototype presentation, and finale - will be virtual. Meeting links will be shared with registered participants.",
    },
    eligibility: {
      keywords: ["who", "eligible", "age", "student", "professional", "requirements"],
      response:
        "🌟 OPEN TO ALL cosmic dreamers! Students, professionals, entrepreneurs, researchers, creators, freelancers - anyone with innovative ideas! No age limits, no qualification barriers, no experience required. We celebrate diversity and believe great ideas come from everywhere in the universe!",
    },
    rounds: {
      keywords: ["round", "stage", "phase", "prototype", "finale"],
      response:
        "🎯 Three Cosmic Rounds: 1) Registration & Initial Review (Deadline: July 10th), 2) Prototype Round (July 15th) - Present your working prototype or detailed concept, 3) Grand Finale (July 22nd) - Final pitches to expert judges via Google Meet!",
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

  // Countdown timer effect - counting down to July 10th registration deadline
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const deadline = new Date("2025-07-15T23:59:59").getTime()
      const timeLeft = deadline - now

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

        setCountdown({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Mouse tracking for interactive effects (disabled on mobile for performance)
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
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
        setTimeout(step, (index + 1) * 1000) // Reduced timing for better performance
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
        "🌟 Great question! I'm here to help you navigate your cosmic journey. Ask me about registration, teams, timeline, prizes, or anything else about PitchStorm!"

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
          "🚀 Hello cosmic explorer! Welcome to PitchStorm 2025! I'm Karzo, your personal space guide. I can help you with registration, timeline, event details, and much more. What would you like to know?"
      } else if (userMessage.includes("thank")) {
        botResponse =
          "🌟 You're welcome, space explorer! I'm always here to help you on your cosmic journey. Don't forget to register before July 10th deadline! Any other questions about PitchStorm?"
      } else if (userMessage.includes("cost") || userMessage.includes("fee") || userMessage.includes("free")) {
        botResponse =
          "💫 PitchStorm is 100% FREE! No registration fees, no hidden costs, no barriers - just pure innovation! We believe great ideas shouldn't be limited by finances. Plus, surprise prizes await winners!"
      }

      setChatMessages((prev) => [...prev, { type: "bot", message: botResponse }])
    }, 800)
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
          {/* Reduced stars for better performance */}
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Portal effect */}
        <div
          className={`absolute inset-0 transition-all duration-2000 ${welcomeStep >= 1 ? "scale-150 opacity-20" : "scale-100 opacity-100"}`}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-64 md:w-96 h-64 md:h-96 border-4 border-blue-500 rounded-full animate-spin-slow opacity-30"></div>
            <div className="absolute inset-4 md:inset-8 border-4 border-purple-500 rounded-full animate-spin-reverse opacity-40"></div>
            <div className="absolute inset-8 md:inset-16 border-4 border-pink-500 rounded-full animate-spin-slow opacity-50"></div>
          </div>
        </div>

        <div
          className={`text-center z-10 space-y-6 md:space-y-8 px-4 transition-all duration-1000 ${welcomeStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="relative">
            <div className="w-32 md:w-48 h-32 md:h-48 mx-auto mb-6 md:mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse-glow"></div>
              <div className="absolute inset-2 md:inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <Rocket className="absolute inset-0 m-auto w-16 md:w-24 h-16 md:h-24 text-white animate-rocket-launch" />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow-medium">
              PitchStorm
            </h1>
            <div className="space-y-2 md:space-y-3">
              <p className="text-2xl md:text-4xl text-blue-300 font-light animate-fade-in-up">2025</p>
              <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay px-4">
                "Launch Your Idea Beyond the Stars"
              </p>
              <p className="text-base md:text-xl text-purple-300 animate-fade-in-up-delay-2">
                Online Event • Google Meet
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 animate-fade-in-up-delay-2 px-4">
                <Badge className="bg-green-600 text-white px-3 md:px-4 py-2 text-sm md:text-lg">100% FREE</Badge>
                <Badge className="bg-purple-600 text-white px-3 md:px-4 py-2 text-sm md:text-lg">OPEN TO ALL</Badge>
                <Badge className="bg-blue-600 text-white px-3 md:px-4 py-2 text-sm md:text-lg">SURPRISE PRIZES</Badge>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 px-4 ${welcomeStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Button
              onClick={handleWelcomeComplete}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 md:px-16 py-4 md:py-8 text-lg md:text-2xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50"
            >
              <Rocket className="w-5 md:w-8 h-5 md:h-8 mr-2 md:mr-4" />
              Begin Your Cosmic Mission
              <Sparkles className="w-5 md:w-8 h-5 md:h-8 ml-2 md:ml-4" />
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

      {/* Interactive cursor trail - only on desktop */}
      {typeof window !== "undefined" && window.innerWidth >= 768 && (
        <div
          className="fixed w-4 h-4 bg-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100 hidden md:block"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transform: "scale(0.8)",
          }}
        />
      )}

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/95 backdrop-blur-xl border-b border-purple-500/30 shadow-lg shadow-purple-500/10">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3 group cursor-pointer" onClick={scrollToTop}>
            <div className="relative">
              <Rocket className="w-8 md:w-10 h-8 md:h-10 text-blue-400 group-hover:text-purple-400 transition-all duration-300 group-hover:rotate-12" />
              <div className="absolute -inset-1 md:-inset-2 bg-blue-400/20 rounded-full group-hover:bg-purple-400/20 transition-all duration-300 animate-pulse"></div>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PitchStorm
              </span>
              <p className="text-xs text-gray-400">2025 • Open to All</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
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
                <span className="text-sm lg:text-base">{item.name}</span>
                <div
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                    currentSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></div>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Music Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleMusic} className="hidden md:flex hover:bg-purple-500/20">
              {musicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>

            <Button
              className="hidden md:flex bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 lg:px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              onClick={() => window.open("https://forms.gle/cZPivc3f62excH877", "_blank")}
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
                    window.open("https://forms.gle/cZPivc3f62excH877", "_blank")
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
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative pt-16 md:pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-black">
          {/* Reduced constellation for mobile performance */}
          {[...Array(window.innerWidth < 768 ? 50 : 150)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center z-10">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            {/* Enhanced Countdown Timer */}
            <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 border border-purple-500/40 shadow-2xl">
              <div className="flex items-center justify-center space-x-2 md:space-x-3 mb-4 md:mb-6">
                <Timer className="w-6 md:w-8 h-6 md:h-8 text-purple-300" />
                <p className="text-lg md:text-2xl text-purple-300 font-bold">🚀 Registration Deadline</p>
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm md:max-w-lg mx-auto">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg md:rounded-xl p-2 md:p-4 mb-2 md:mb-3 shadow-lg">
                      <span className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
                        {item.value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm md:text-base text-yellow-300 mt-4 font-semibold">July 10th, 2025</p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow-medium">
                  Mission Control
                </h1>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-6">
                  <Badge className="bg-green-600 text-white px-3 md:px-6 py-2 md:py-3 text-sm md:text-lg font-bold animate-pulse">
                    <Gift className="w-4 md:w-5 h-4 md:h-5 mr-1 md:mr-2" />
                    100% FREE
                  </Badge>
                  <Badge className="bg-purple-600 text-white px-3 md:px-6 py-2 md:py-3 text-sm md:text-lg font-bold animate-pulse">
                    <Globe className="w-4 md:w-5 h-4 md:h-5 mr-1 md:mr-2" />
                    OPEN TO ALL
                  </Badge>
                  <Badge className="bg-blue-600 text-white px-3 md:px-6 py-2 md:py-3 text-sm md:text-lg font-bold animate-pulse">
                    <Trophy className="w-4 md:w-5 h-4 md:h-5 mr-1 md:mr-2" />
                    SURPRISE PRIZES
                  </Badge>
                  <Badge className="bg-red-600 text-white px-3 md:px-6 py-2 md:py-3 text-sm md:text-lg font-bold animate-pulse">
                    <Video className="w-4 md:w-5 h-4 md:h-5 mr-1 md:mr-2" />
                    GOOGLE MEET
                  </Badge>
                </div>
              </div>

              <p className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                🌟 Welcome aboard the ultimate space station where{" "}
                <span className="text-blue-400 font-semibold">dreams take flight</span>. No barriers. No limits. Just{" "}
                <span className="text-purple-400 font-semibold">creative minds across the galaxy</span> pitching the
                future online!
              </p>

              {/* Enhanced Event highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto">
                {[
                  {
                    icon: Gift,
                    title: "Surprise Prizes",
                    desc: "Mystery Rewards",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: Users2,
                    title: "Solo or Team",
                    desc: "Your Choice",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Calendar,
                    title: "3 Rounds",
                    desc: "July 10-22",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: Video,
                    title: "Online Event",
                    desc: "Google Meet",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-lg rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group transform hover:scale-105"
                  >
                    <div
                      className={`w-8 md:w-12 h-8 md:h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:animate-pulse-glow`}
                    >
                      <item.icon className="w-4 md:w-6 h-4 md:h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-lg">{item.title}</h3>
                    <p className="text-xs md:text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 group"
                onClick={() => window.open("https://forms.gle/cZPivc3f62excH877", "_blank")}
              >
                <Rocket className="w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3 group-hover:rotate-12 transition-transform" />
                Register FREE Now
                <Sparkles className="w-5 md:w-6 h-5 md:h-6 ml-2 md:ml-3 group-hover:animate-spin" />
              </Button>
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 md:px-10 py-4 md:py-6 text-base md:text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                onClick={() => scrollToSection("characters")}
              >
                🛰️ Explore Universe
              </Button>
            </div>

            {/* Idea Generator */}
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 border border-indigo-500/30 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2 md:space-x-3 mb-4 md:mb-6">
                <Lightbulb className="w-6 md:w-8 h-6 md:h-8 text-yellow-400" />
                <h3 className="text-xl md:text-2xl font-bold text-white">Cosmic Idea Generator</h3>
              </div>
              <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                Need inspiration? Let the universe spark your next big idea!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center">
                <Button
                  onClick={generateIdea}
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full"
                >
                  <Shuffle className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                  Generate Idea
                </Button>
                {ideaGenerated && (
                  <div className="bg-gray-800/50 rounded-lg p-3 md:p-4 flex-1 w-full">
                    <p className="text-blue-300 font-semibold text-sm md:text-base">{ideaGenerated}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Registration incentives */}
            <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 border border-yellow-500/40 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-4 md:mb-6">
                <Timer className="w-6 md:w-8 h-6 md:h-8 text-yellow-400" />
                <p className="text-xl md:text-3xl font-bold text-yellow-300">Don't Miss Out!</p>
              </div>
              <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-6">
                Register before July 10th deadline and secure your spot:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: Users, text: "Solo or team participation - your choice!" },
                  { icon: Video, text: "Convenient online event via Google Meet" },
                  { icon: Gift, text: "Exciting surprise prizes for winners" },
                  { icon: GraduationCap, text: "Recognition and networking opportunities" },
                ].map((perk, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <perk.icon className="w-4 md:w-5 h-4 md:h-5 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm md:text-base">{perk.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 md:w-10 h-8 md:h-10 text-blue-400" />
        </div>
      </section>

      {/* Enhanced Cosmic Characters Section */}
      <section id="characters" className="py-12 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 md:mb-6 animate-glow-medium">
              Cosmic Characters
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              🌌 Meet the legendary space explorers representing different types of innovators and dreamers.
              <span className="text-blue-400"> Choose your cosmic identity and join your tribe!</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
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

                <CardContent className="p-6 md:p-8 text-center space-y-4 md:space-y-6 relative z-10">
                  <div className="relative">
                    <div
                      className={`w-20 md:w-28 h-20 md:h-28 mx-auto rounded-full bg-gradient-to-r ${character.color} flex items-center justify-center text-3xl md:text-5xl group-hover:animate-pulse-glow shadow-lg group-hover:shadow-2xl transition-all duration-500`}
                    >
                      {character.emoji}
                    </div>
                    <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 animate-spin-slow transition-all duration-500"></div>
                    <Badge className="absolute -top-1 md:-top-2 -right-1 md:-right-2 bg-blue-600 text-white text-xs md:text-sm">
                      {character.percentage}
                    </Badge>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {character.name}
                    </h3>
                    <p className="text-xs md:text-sm font-semibold text-purple-400">{character.title}</p>
                    <p className="text-gray-400 leading-relaxed text-xs md:text-sm">{character.description}</p>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
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
                    <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-lg p-3 md:p-4 border border-gray-600/50">
                      <p className="text-xs md:text-sm text-blue-300 italic leading-relaxed">"{character.quote}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <p className="text-base md:text-lg text-gray-300 mb-4 md:mb-6 px-4">
              🎭 Which cosmic character represents your innovation style?
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full transform hover:scale-105 transition-all duration-300"
              onClick={() => window.open("https://forms.gle/cZPivc3f62excH877", "_blank")}
            >
              Join Your Cosmic Tribe
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section
        id="timeline"
        className="py-12 md:py-24 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-6 animate-glow-medium">
              Mission Timeline
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              🚀 Your epic journey from registration to cosmic finale - every great mission has a detailed flight plan
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Enhanced timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 md:w-2 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>

              {[
                {
                  icon: Users,
                  title: "📋 Registration & Initial Review",
                  date: "Deadline: July 10, 2025",
                  time: "11:59 PM",
                  description:
                    "Submit your innovative idea through our Google Form. Our cosmic council will review all submissions and select participants for the next round.",
                  details: [
                    "Solo or team participation",
                    "Free registration via Google Form",
                    "Idea submission required",
                    "Selection notification by July 12th",
                  ],
                  position: "left",
                },
                {
                  icon: Code,
                  title: "🔧 Prototype Round",
                  date: "July 15, 2025",
                  time: "Google Meet Session",
                  description:
                    "Present your prototype or detailed concept to our expert panel. Show your progress and demonstrate the feasibility of your cosmic idea.",
                  details: [
                    "5-minute presentation",
                    "Working prototype or detailed mockup",
                    "Q&A with expert panel",
                    "Technical feasibility assessment",
                  ],
                  position: "right",
                },
                {
                  icon: Trophy,
                  title: "🌌 Grand Finale",
                  date: "July 22, 2025",
                  time: "Google Meet Event",
                  description:
                    "The ultimate cosmic showdown! Present your final pitch to our distinguished judges and compete for surprise prizes and recognition.",
                  details: [
                    "Final pitch presentations",
                    "Expert judge panel",
                    "Live audience voting",
                    "Surprise prize distribution",
                  ],
                  position: "left",
                },
              ].map((phase, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-12 md:mb-16 ${phase.position === "right" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-full md:w-1/2 ${phase.position === "right" ? "md:pl-8 lg:pl-12" : "md:pr-8 lg:pr-12"}`}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border-gray-700 hover:border-purple-500/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                          <div
                            className={`w-12 md:w-16 h-12 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:animate-pulse-glow transition-all duration-300`}
                          >
                            <phase.icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg md:text-2xl font-bold text-white mb-1">{phase.title}</h3>
                            <p className="text-blue-400 font-semibold text-sm md:text-base">{phase.date}</p>
                            <p className="text-purple-300 text-xs md:text-sm">{phase.time}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                          {phase.description}
                        </p>
                        <div className="space-y-1 md:space-y-2">
                          {phase.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center space-x-2">
                              <Star className="w-3 md:w-4 h-3 md:h-4 text-yellow-400" />
                              <span className="text-xs md:text-sm text-gray-400">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:block w-4 md:w-6 h-4 md:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 md:border-4 border-black z-10 shadow-lg shadow-purple-500/50"></div>
                  <div className="hidden md:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Prizes Section */}
      <section id="prizes" className="py-12 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4 md:mb-6 animate-glow-medium">
              Cosmic Rewards
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              🏆 Exciting surprise prizes await the most innovative cosmic explorers. Your ideas deserve recognition
              across the galaxy!
            </p>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 backdrop-blur-lg rounded-2xl md:rounded-3xl p-8 md:p-12 border border-purple-500/40 shadow-2xl mb-12 md:mb-16">
              <div className="text-6xl md:text-8xl mb-6 md:mb-8">🎁</div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">Surprise Prizes Await!</h3>
              <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8">
                We're keeping the rewards mysterious to add to the cosmic excitement! What we can reveal is that winners
                will receive:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
                {[
                  { icon: Trophy, text: "Amazing prizes" },
                  { icon: Award, text: "Recognition certificates" },
                  { icon: Users, text: "Mentorship opportunities" },
                  { icon: Briefcase, text: "Startup resources" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-800/50 rounded-lg p-3 md:p-4">
                    <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <item.icon className="w-4 md:w-5 h-4 md:h-5 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm md:text-base font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl md:text-2xl text-gray-300 mb-6 md:mb-8">
                💫 Ready to discover what cosmic rewards await you?
              </p>
              <Button
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl rounded-full transform hover:scale-110 transition-all duration-300"
                onClick={() => window.open("https://forms.gle/cZPivc3f62excH877", "_blank")}
              >
                <Trophy className="w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3" />
                Register for Surprise Rewards
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Registration Section */}
      <section
        id="register"
        className="py-12 md:py-24 relative bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-glow-medium">
                Ready to Launch?
              </h2>
              <p className="text-lg md:text-2xl text-gray-300 leading-relaxed px-4">
                🚀 Join the cosmic community of innovators and pitch your idea to the stars via{" "}
                <span className="text-blue-400 font-semibold">Google Meet</span>
              </p>
            </div>

            {/* Registration benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  icon: Gift,
                  title: "100% Free",
                  desc: "No costs, just pure innovation",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Video,
                  title: "Online Event",
                  desc: "Join from anywhere via Google Meet",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Users,
                  title: "Solo or Team",
                  desc: "Your choice, your journey",
                  color: "from-purple-500 to-pink-500",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-12 md:w-16 h-12 md:h-16 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:animate-pulse-glow`}
                  >
                    <benefit.icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2 md:mb-3 text-lg md:text-xl">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="relative">
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white px-12 md:px-20 py-6 md:py-10 text-xl md:text-3xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 group"
                onClick={() => window.open("https://forms.gle/cZPivc3f62excH877", "_blank")}
              >
                <Rocket className="w-6 md:w-10 h-6 md:h-10 mr-3 md:mr-4 group-hover:rotate-12 transition-transform" />
                Register FREE Now!
                <ExternalLink className="w-5 md:w-8 h-5 md:h-8 ml-3 md:ml-4" />
              </Button>
            </div>

            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 border border-red-500/40 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-4">
                <Timer className="w-6 md:w-8 h-6 md:h-8 text-red-400" />
                <p className="text-xl md:text-2xl font-bold text-red-300">Registration Deadline: July 10th!</p>
              </div>
              <p className="text-base md:text-lg text-gray-300 mb-4">
                Don't miss your chance to join the cosmic innovation journey:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 md:w-5 h-4 md:h-5 text-red-400" />
                  <span className="text-gray-300 text-sm md:text-base">Solo or team participation welcome</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 md:w-5 h-4 md:h-5 text-red-400" />
                  <span className="text-gray-300 text-sm md:text-base">100% free online event</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 md:w-5 h-4 md:h-5 text-red-400" />
                  <span className="text-gray-300 text-sm md:text-base">Exciting surprise prizes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 md:w-5 h-4 md:h-5 text-red-400" />
                  <span className="text-gray-300 text-sm md:text-base">Google Meet convenience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team/Hosts Section */}
      <section id="team" className="py-12 md:py-24 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4 md:mb-6 animate-glow-medium">
              Cosmic Hosts
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              🌟 Meet the legendary organizations and space commanders orchestrating this cosmic journey across the
              innovation galaxy
            </p>
          </div>

          {/* Host Organizations */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">
              🏢 Hosting Organizations
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 lg:space-x-16">
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-blue-500/70 shadow-2xl hover:shadow-blue-500/30">
                  <Image
                    src="/images/nexora-logo.jpg"
                    alt="Nexora - Innovation & Entrepreneurship"
                    width={250}
                    height={125}
                    className="rounded-lg md:rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg mx-auto"
                  />
                  <div className="mt-4 md:mt-6 text-center">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Nexora</h4>
                    <p className="text-blue-400 font-semibold text-sm md:text-base">Innovation & Entrepreneurship</p>
                    <p className="text-gray-400 mt-2 text-xs md:text-sm">
                      Empowering the next generation of innovators and entrepreneurs
                    </p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-yellow-500/70 shadow-2xl hover:shadow-yellow-500/30">
                  <Image
                    src="/images/saranda-logo.jpg"
                    alt="Saranda - The House of Excellence and Innovation"
                    width={250}
                    height={125}
                    className="rounded-lg md:rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg mx-auto"
                  />
                  <div className="mt-4 md:mt-6 text-center">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Saranda</h4>
                    <p className="text-yellow-400 font-semibold text-sm md:text-base">
                      The House of Excellence and Innovation
                    </p>
                    <p className="text-gray-400 mt-2 text-xs md:text-sm">
                      Fostering excellence and innovation in every endeavor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Crew */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">🧑‍🚀 Mission Crew</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
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
                  <CardContent className="p-6 md:p-8 text-center space-y-4 md:space-y-6">
                    <div className="relative">
                      <div
                        className={`w-20 md:w-28 h-20 md:h-28 mx-auto bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center group-hover:animate-pulse-glow shadow-lg text-3xl md:text-4xl`}
                      >
                        {member.emoji}
                      </div>
                      <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 animate-spin-slow transition-all duration-500"></div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 mb-2 font-semibold text-sm md:text-base">{member.role}</p>
                      <Badge
                        variant="secondary"
                        className="bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 mb-3 text-xs md:text-sm"
                      >
                        {member.specialty}
                      </Badge>
                      <p className="text-gray-400 text-xs md:text-sm">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 md:mt-16 space-y-4 md:space-y-6">
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto px-4">
              🤝 Powered by innovation communities dedicated to launching the next generation of cosmic ideas and
              stellar entrepreneurs across the universe
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full transform hover:scale-105 transition-all duration-300"
              onClick={() => window.open("https://forms.gle/cZPivc3f62excH877", "_blank")}
            >
              Join Our Cosmic Community
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section id="faq" className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 md:mb-6 animate-glow-medium">
              Mission Intel
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              🛰️ Everything you need to know for a successful cosmic launch - your complete mission briefing
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
              {[
                {
                  question: "🚀 What is PitchStorm 2025?",
                  answer:
                    "PitchStorm is the ultimate space-themed online ideathon where innovators from across the galaxy come together to pitch their most creative ideas via Google Meet. It's a 3-round event (July 10-22, 2025) open to all types of ideas - tech, social impact, sustainability, healthcare, education, or any innovative solution that can change the world. It's 100% FREE and open to everyone!",
                },
                {
                  question: "💫 How do I register and is it really free?",
                  answer:
                    "Yes, it's completely FREE! Simply click the 'Register Now' button to access our Google Form at https://forms.gle/cZPivc3f62excH877. No hidden costs, no registration fees, no barriers. Registration deadline is July 10th, 2025. We believe innovation should be accessible to everyone!",
                },
                {
                  question: "👥 Can I participate solo or do I need a team?",
                  answer:
                    "Both options are welcome! You can participate as a SOLO space explorer or form teams of 2-4 members. Solo participants get full creative control, while teams can collaborate and combine different skills. Choose what works best for your cosmic journey!",
                },
                {
                  question: "🏆 What prizes and rewards are available?",
                  answer:
                    "We have exciting SURPRISE PRIZES for winners! We're keeping the rewards mysterious to add cosmic excitement. What we can reveal is that winners will receive cash prizes, recognition certificates, mentorship opportunities, and startup resources to help launch their ideas into the universe!",
                },
                {
                  question: "📅 What is the event timeline?",
                  answer:
                    "Three cosmic rounds: 1) Registration Deadline - July 10th, 2025, 2) Prototype Round - July 15th, 2025 (present your prototype via Google Meet), 3) Grand Finale - July 22nd, 2025 (final pitches to expert judges via Google Meet). All rounds are conducted online for maximum accessibility!",
                },
                {
                  question: "📍 Where is the event happening?",
                  answer:
                    "PitchStorm 2025 is a fully ONLINE event conducted via Google Meet! This means you can participate from anywhere in the universe. All rounds - registration review, prototype presentation, and finale - will be virtual. Meeting links will be shared with registered participants.",
                },
                {
                  question: "🎯 Who can participate?",
                  answer:
                    "PitchStorm is OPEN TO ALL cosmic dreamers! Students, professionals, entrepreneurs, researchers, creators, freelancers, anyone with innovative ideas - you're welcome! No age restrictions, no qualification barriers, no experience required. We celebrate diversity and believe the best ideas can come from anywhere in the universe.",
                },
                {
                  question: "🛠️ What do I need for the prototype round?",
                  answer:
                    "For the prototype round on July 15th, you'll need to present your working prototype, detailed mockup, or comprehensive concept via Google Meet. You'll have 5 minutes to present followed by Q&A with our expert panel. Technical feasibility and innovation will be key evaluation criteria.",
                },
                {
                  question: "💡 What types of ideas are welcome?",
                  answer:
                    "ALL cosmic ideas are welcome! Technology innovations, social impact solutions, sustainability projects, healthcare breakthroughs, education tools, fintech, AI/ML, blockchain, IoT, gaming, entertainment, agriculture, space tech - if it can change the world or solve a problem, we want to hear it! Use our Idea Generator for inspiration.",
                },
                {
                  question: "🌐 How can I stay updated?",
                  answer:
                    "Stay connected with the cosmic community! Chat with Karzo (our AI assistant) anytime for real-time updates, follow our social media channels, and check your email after registration. We'll keep you informed about all cosmic developments and send Google Meet links for each round!",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg rounded-lg px-4 md:px-6"
                >
                  <AccordionTrigger className="text-left text-white hover:text-blue-400 transition-colors py-4 md:py-6">
                    <span className="flex items-center space-x-2 md:space-x-3 text-base md:text-lg">
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4 md:pb-6 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 md:py-16 border-t border-gray-800 bg-gradient-to-r from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 md:space-y-12">
            <div className="flex justify-center items-center space-x-3 md:space-x-4 mb-6 md:mb-8">
              <div className="relative">
                <Rocket className="w-10 md:w-12 h-10 md:h-12 text-blue-400" />
                <div className="absolute -inset-1 md:-inset-2 bg-blue-400/20 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  PitchStorm 2025
                </span>
                <p className="text-gray-400 text-sm md:text-base">Launch Your Idea Beyond the Stars</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
              <div>
                <h4 className="font-bold text-white mb-3 md:mb-4 text-base md:text-lg">🗓️ Event Details</h4>
                <div className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                  <p>📅 July 10-22, 2025</p>
                  <p>📍 Online via Google Meet</p>
                  <p>⏰ 3 Rounds of Innovation</p>
                  <p>🌐 Global Participation</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-3 md:mb-4 text-base md:text-lg">🎯 Quick Links</h4>
                <div className="space-y-1 md:space-y-2">
                  <button
                    onClick={() => window.open("https://forms.gle/cZPivc3f62excH877", "_blank")}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-left text-sm md:text-base"
                  >
                    Register Free
                  </button>
                  <button
                    onClick={() => scrollToSection("timeline")}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-left text-sm md:text-base"
                  >
                    Event Timeline
                  </button>
                  <button
                    onClick={() => scrollToSection("prizes")}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-left text-sm md:text-base"
                  >
                    Surprise Prizes
                  </button>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-left text-sm md:text-base"
                  >
                    FAQ & Support
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-3 md:mb-4 text-base md:text-lg">🏢 Hosts</h4>
                <div className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                  <p>Nexora</p>
                  <p>Innovation & Entrepreneurship</p>
                  <p>Saranda</p>
                  <p>House of Excellence</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-3 md:mb-4 text-base md:text-lg">🌐 Connect</h4>
                <div className="flex justify-center md:justify-start space-x-3 md:space-x-4">
                  <Button variant="ghost" size="icon" className="hover:text-blue-400 hover:bg-blue-400/10">
                    <span className="text-xl md:text-2xl">📧</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-blue-400 hover:bg-blue-400/10">
                    <span className="text-xl md:text-2xl">📱</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-blue-400 hover:bg-blue-400/10">
                    <span className="text-xl md:text-2xl">💼</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-blue-400 hover:bg-blue-400/10">
                    <span className="text-xl md:text-2xl">🌐</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 pt-6 md:pt-8 border-t border-gray-800">
              <p className="text-gray-400 italic text-base md:text-lg">
                "Every idea begins with a spark that can light up the universe"
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                © 2025 Kartik Chilkoti . Launching dreams beyond the stars. 🚀✨
              </p>
              <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 text-xs text-gray-500">
                <span>Open to All</span>
                <span>•</span>
                <span>100% Free</span>
                <span>•</span>
                <span>Online Event</span>
                <span>•</span>
                <span>Innovation for Everyone</span>
                <span>•</span>
                <span>Made By Kartik Chilkoti</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Karzo Chatbot */}
      <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50">
        {!chatOpen ? (
          <div className="relative group">
            <Button
              onClick={() => setChatOpen(true)}
              className="w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 animate-pulse-glow"
            >
              <div className="text-center">
                <MessageCircle className="w-6 md:w-8 h-6 md:h-8 mb-1" />
                <span className="text-xs font-bold">Karzo</span>
              </div>
            </Button>
            <div className="absolute -top-12 md:-top-16 right-0 bg-gray-900 text-white px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              🤖 Ask me anything about PitchStorm!
            </div>
          </div>
        ) : (
          <Card className="w-80 md:w-96 h-96 md:h-[600px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-purple-500/50 shadow-2xl shadow-purple-500/20">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse-glow">
                  <span className="text-lg md:text-xl">🤖</span>
                </div>
                <div>
                  <span className="font-bold text-white text-base md:text-lg">Karzo</span>
                  <p className="text-xs text-gray-400">Your Cosmic Karzo Guide</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)} className="hover:text-red-400">
                <X className="w-4 md:w-5 h-4 md:h-5" />
              </Button>
            </div>

            <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3 md:space-y-4 h-64 md:h-96">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 md:p-4 rounded-2xl text-xs md:text-sm ${
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

            <div className="p-3 md:p-4 border-t border-gray-700">
              <div className="flex space-x-2 md:space-x-3 mb-2 md:mb-3">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about registration, timeline..."
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 rounded-full text-sm md:text-base"
                  onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                />
                <Button
                  onClick={handleChatSend}
                  size="icon"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full"
                >
                  <Send className="w-3 md:w-4 h-3 md:h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {["Register", "Timeline", "Prizes", "Solo/Team"].map((topic) => (
                  <Button
                    key={topic}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setChatInput(topic)
                      handleChatSend()
                    }}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1"
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
          className="fixed bottom-4 md:bottom-6 left-4 md:left-6 w-12 md:w-14 h-12 md:h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl z-40 transform hover:scale-110 transition-all duration-300"
          size="icon"
        >
          <ArrowUp className="w-5 md:w-6 h-5 md:h-6" />
        </Button>
      )}
    </div>
  )
}
