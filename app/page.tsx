"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Code,
  BarChart3,
  ClipboardList,
  Moon,
  Sun,
  ChevronRight,
  MapPin,
  Phone,
} from "@/components/ui/icons"
import { TypeAnimation } from "react-type-animation"
import { itemFadeIn } from "@/utils/animations"
import WorkTimeline from "@/components/work-timeline"
import { InteractiveContactForm } from "@/components/interactive-contact-form"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [visibleSection, setVisibleSection] = useState("")

  // Handle intersection observer for scroll animations
  useEffect(() => {
    setMounted(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl">
              Akinola Akintayo
            </Link>
            <Badge variant="outline" className="hidden md:flex">
              Available for Hire
            </Badge>
          </div>
          <nav className="hidden md:flex gap-6">
            {["about", "experience", "projects", "skills", "contact"].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={`text-sm font-medium hover:text-primary transition-colors relative ${
                  visibleSection === section ? "text-primary" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {visibleSection === section && (
                  <motion.span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" layoutId="activeSection" />
                )}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://github.com/coldDev231" target="_blank" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://linkedin.com/in/akinola-israel-akintayo" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="mailto:dt915211@gmail.com" aria-label="Email">
                <Mail className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 space-y-8">
          <motion.div
            className="flex flex-col md:flex-row gap-8 items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="space-y-6 md:w-2/3" variants={fadeIn}>
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">Hello, I'm</p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  <span className="block">Akinola Akintayo</span>
                </h1>
                <div className="text-2xl md:text-3xl font-semibold text-primary">
                  <TypeAnimation
                    sequence={[
                      "Junior Fullstack Developer",
                      2000,
                      "Frontend Developer",
                      2000,
                      "Backend Developer",
                      2000,
                      "Web Developer",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Number.POSITIVE_INFINITY}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  I'm an enthusiastic junior developer with a passion for building modern web applications, learning new
                  technologies, and contributing to meaningful projects that solve real-world problems.
                </p>
                <p className="text-lg text-muted-foreground">
                  Currently based in <span className="font-medium">Ikeja, Lagos</span> • Available for{" "}
                  <span className="font-medium">remote opportunities worldwide</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild className="group">
                  <Link href="#contact" className="flex items-center gap-2">
                    Let's Connect
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" className="gap-2 group bg-transparent">
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  Download Resume
                </Button>
                <Button variant="outline" asChild className="gap-2 bg-transparent">
                  <Link href="#projects">View My Work</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-border/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2+</div>
                  <div className="text-sm text-muted-foreground">Years Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Technologies Explored</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/3 flex justify-center"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20">
                <Image
                  src="/images/profile.png"
                  alt="Akinola Akintayo Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="container py-16 md:py-24 space-y-8 bg-muted/50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">About Me</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Passionate about creating digital solutions that make a real impact
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">My Journey</h3>
                  <p className="text-lg leading-relaxed">
                    I started my career as a curious developer who loved solving complex problems with code. Over the
                    years, I've evolved into a multifaceted professional who bridges the gap between technical
                    excellence and business strategy.
                  </p>
                  <p className="text-lg leading-relaxed">
                    My unique combination of fullstack development skills, project management expertise, and data
                    analysis capabilities allows me to see the bigger picture while delivering precise technical
                    solutions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">What Drives Me</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Building scalable applications that serve thousands of users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Leading teams to deliver projects on time and under budget</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Transforming raw data into actionable business insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Mentoring junior developers and fostering team growth</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">Ikeja, Lagos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium">Junior Level</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability</span>
                      <span className="font-medium text-green-600">Open to Opportunities</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">AWS Certified Solutions Architect</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">PMP Certified Project Manager</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Google Analytics Certified</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Scrum Master Certified</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Work Experience Timeline */}
        <section id="experience" className="container py-16 md:py-24 space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tighter text-center">Work Experience</h2>
            <div className="mt-12">
              <WorkTimeline />
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container py-16 md:py-24 space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tighter text-center">Featured Projects</h2>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="development">Development</TabsTrigger>
                  <TabsTrigger value="management">Project Management</TabsTrigger>
                  <TabsTrigger value="data">Data Analysis</TabsTrigger>
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value="all" className="space-y-8">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <ProjectCard
                        title="E-commerce Platform"
                        description="Built a full-featured e-commerce platform with React, Node.js, and MongoDB."
                        image="/placeholder.svg?height=200&width=400"
                        tags={["React", "Node.js", "MongoDB", "Redux"]}
                        category="Development"
                        icon={<Code className="h-5 w-5" />}
                        projectId="ecommerce-platform"
                      />

                      <ProjectCard
                        title="Enterprise CRM Implementation"
                        description="Led a team of 8 to implement a custom CRM solution for a Fortune 500 company."
                        image="/placeholder.svg?height=200&width=400"
                        tags={["Agile", "Scrum", "Stakeholder Management"]}
                        category="Project Management"
                        icon={<ClipboardList className="h-5 w-5" />}
                        projectId="crm-implementation"
                      />

                      <ProjectCard
                        title="Customer Segmentation Analysis"
                        description="Analyzed customer data to identify key segments and improve targeting strategies."
                        image="/placeholder.svg?height=200&width=400"
                        tags={["Python", "Pandas", "Tableau", "Clustering"]}
                        category="Data Analysis"
                        icon={<BarChart3 className="h-5 w-5" />}
                        projectId="customer-segmentation"
                      />
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="development" className="space-y-8">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <ProjectCard
                        title="E-commerce Platform"
                        description="Built a full-featured e-commerce platform with React, Node.js, and MongoDB."
                        image="/placeholder.svg?height=200&width=400"
                        tags={["React", "Node.js", "MongoDB", "Redux"]}
                        category="Development"
                        icon={<Code className="h-5 w-5" />}
                        projectId="ecommerce-platform"
                      />
                      <ProjectCard
                        title="Real-time Chat Application"
                        description="Developed a WebSocket-based chat application with user authentication and file sharing."
                        image="/placeholder.svg?height=200&width=400"
                        tags={["WebSockets", "React", "Express", "Firebase"]}
                        category="Development"
                        icon={<Code className="h-5 w-5" />}
                        projectId="chat-application"
                      />
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="management" className="space-y-8">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <ProjectCard
                        title="Enterprise CRM Implementation"
                        description="Led a team of 8 to implement a custom CRM solution for a Fortune 500 company."
                        image="/placeholder.svg?height=200&width=400"
                        tags={["Agile", "Scrum", "Stakeholder Management"]}
                        category="Project Management"
                        icon={<ClipboardList className="h-5 w-5" />}
                        projectId="crm-implementation"
                      />
                      <ProjectCard
                        title="Digital Transformation Initiative"
                        description="Managed a cross-functional team to digitize legacy processes, reducing operational costs by 30%."
                        image="/placeholder.svg?height=200&width=400"
                        tags={["Change Management", "Process Optimization", "Budgeting"]}
                        category="Project Management"
                        icon={<ClipboardList className="h-5 w-5" />}
                        projectId="digital-transformation"
                      />
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="data" className="space-y-8">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <ProjectCard
                        title="Customer Segmentation Analysis"
                        description="Analyzed customer data to identify key segments and improve targeting strategies."
                        image="/placeholder.svg?height=200&width=400"
                        tags={["Python", "Pandas", "Tableau", "Clustering"]}
                        category="Data Analysis"
                        icon={<BarChart3 className="h-5 w-5" />}
                        projectId="customer-segmentation"
                      />
                      <ProjectCard
                        title="Sales Forecasting Model"
                        description="Built predictive models to forecast quarterly sales with 92% accuracy."
                        image="/placeholder.svg?height=200&width=400"
                        tags={["R", "Time Series Analysis", "Power BI"]}
                        category="Data Analysis"
                        icon={<BarChart3 className="h-5 w-5" />}
                        projectId="sales-forecasting"
                      />
                    </motion.div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container py-16 md:py-24 space-y-8 bg-muted/50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tighter text-center">Skills & Expertise</h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <InteractiveSkillCard
                title="Development"
                icon={<Code className="h-8 w-8" />}
                skills={[
                  { name: "JavaScript/TypeScript", level: 90 },
                  { name: "React & Next.js", level: 85 },
                  { name: "Node.js & Express", level: 80 },
                  { name: "MongoDB & PostgreSQL", level: 75 },
                  { name: "RESTful APIs", level: 90 },
                  { name: "GraphQL", level: 70 },
                  { name: "AWS & Vercel", level: 75 },
                  { name: "Testing (Jest, Cypress)", level: 65 },
                ]}
              />

              <InteractiveSkillCard
                title="Project Management"
                icon={<ClipboardList className="h-8 w-8" />}
                skills={[
                  { name: "Agile & Scrum", level: 95 },
                  { name: "Waterfall Methodology", level: 85 },
                  { name: "Risk Management", level: 80 },
                  { name: "Stakeholder Communication", level: 90 },
                  { name: "Resource Planning", level: 85 },
                  { name: "Budgeting", level: 75 },
                  { name: "JIRA & Asana", level: 90 },
                  { name: "Technical Documentation", level: 80 },
                ]}
              />

              <InteractiveSkillCard
                title="Data Analysis"
                icon={<BarChart3 className="h-8 w-8" />}
                skills={[
                  { name: "Python & R", level: 85 },
                  { name: "SQL & NoSQL", level: 80 },
                  { name: "Data Visualization", level: 90 },
                  { name: "Statistical Analysis", level: 75 },
                  { name: "Machine Learning", level: 70 },
                  { name: "Tableau & Power BI", level: 85 },
                  { name: "ETL Processes", level: 75 },
                  { name: "A/B Testing", level: 80 },
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="container py-16 md:py-24 space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tighter text-center">Client Testimonials</h2>
            <TestimonialCarousel />
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container py-16 md:py-24 space-y-8 bg-red-950">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Let's Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to bring your next project to life? I'd love to hear about your ideas and discuss how we can
                collaborate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div className="space-y-6" variants={fadeIn}>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Email</div>
                        <a
                          href="mailto:dt915211@gmail.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          dt915211@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">LinkedIn</div>
                        <a
                          href="https://linkedin.com/in/akinola-israel-akintayo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          linkedin.com/in/akinola-israel-akintayo
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Github className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">GitHub</div>
                        <a
                          href="https://github.com/coldDev231"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          github.com/coldDev231
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Location</div>
                        <span className="text-muted-foreground">Ikeja, Lagos</span>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <a
                          href="tel:+2347025320484"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +234 702 532 0484
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <h4 className="font-semibold mb-3">Current Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Available for new projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Open to remote opportunities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Interested in consulting work</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Preferred Project Types</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Web Applications</Badge>
                    <Badge variant="secondary">Data Analytics</Badge>
                    <Badge variant="secondary">Team Leadership</Badge>
                    <Badge variant="secondary">Technical Consulting</Badge>
                    <Badge variant="secondary">Startup Projects</Badge>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <InteractiveContactForm />
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t py-8 md:py-12 bg-muted/30">
        <div className="container bg-red-950 font-serif">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Akinola Akintayo</h3>
              <p className="text-sm text-muted-foreground">
                Fullstack Developer, Project Manager & Data Analyst creating digital solutions that matter.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Available for hire</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <Link
                  href="#about"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#experience"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Experience
                </Link>
                <Link
                  href="#projects"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="#skills"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Skills
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <div className="space-y-2">
                <span className="block text-sm text-muted-foreground">Web Development</span>
                <span className="block text-sm text-muted-foreground">Project Management</span>
                <span className="block text-sm text-muted-foreground">Data Analysis</span>
                <span className="block text-sm text-muted-foreground">Technical Consulting</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Connect</h4>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com/coldDev231" target="_blank" aria-label="GitHub">
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://linkedin.com/in/akinola-israel-akintayo" target="_blank" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="mailto:dt915211@gmail.com" aria-label="Email">
                    <Mail className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                dt915211@gmail.com
                <br />
                Ikeja, Lagos
              </p>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Akinola Akintayo. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({ title, description, image, tags, category, icon, projectId }) {
  return (
    <motion.div variants={itemFadeIn} data-project-id={projectId}>
      <Card className="overflow-hidden h-full group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              {icon}
              {category}
            </Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full gap-2 group bg-transparent">
            View Details
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function InteractiveSkillCard({ title, icon, skills }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="space-y-3">
        {skills.map((skill, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      text: "John's expertise in both development and project management was invaluable. He delivered our web application on time and exceeded our expectations.",
      author: "Sarah Johnson",
      position: "CTO, TechStart Inc.",
    },
    {
      text: "The data analysis John provided gave us critical insights that helped us increase our conversion rate by 35%. Highly recommended!",
      author: "Michael Chen",
      position: "Marketing Director, GrowthCo",
    },
    {
      text: "Working with John was a pleasure. His technical skills combined with project management expertise made our complex project run smoothly.",
      author: "Emily Rodriguez",
      position: "Product Manager, InnovateSoft",
    },
  ]

  return (
    <div className="mt-8 relative">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-card p-6 rounded-lg shadow-sm border"
          >
            <div className="text-lg italic mb-4">"{testimonials[activeIndex].text}"</div>
            <div className="font-semibold">{testimonials[activeIndex].author}</div>
            <div className="text-sm text-muted-foreground">{testimonials[activeIndex].position}</div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === activeIndex ? "bg-primary" : "bg-muted"}`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
