"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Code,
  BarChart3,
  ClipboardList,
  ArrowRight,
  Zap,
} from "lucide-react"

// Define types
interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: "Development" | "Project Management" | "Data Analysis"
  impact?: string
}

interface Experience {
  id: string
  title: string
  company: string
  companyUrl?: string
  location: string
  startDate: string
  endDate: string
  type: "Development" | "Project Management" | "Data Analysis" | "Hybrid"
  description: string[]
  achievements: string[]
  technologies: string[]
  relatedProjects: string[]
}

// Sample data
const experiences: Experience[] = [
  {
    id: "junior-fullstack-dev",
    title: "Junior Fullstack Developer",
    company: "TechStart Lagos",
    companyUrl: "https://techstart.example.com",
    location: "Ikeja, Lagos",
    startDate: "2023-06",
    endDate: "Present",
    type: "Development",
    description: [
      "Developed responsive web applications using React and Node.js",
      "Collaborated with senior developers to implement new features and fix bugs",
      "Participated in code reviews and learned best practices for clean code",
    ],
    achievements: [
      "Successfully delivered 3 client projects within deadlines",
      "Improved application performance by 30% through code optimization",
      "Contributed to team knowledge sharing sessions on modern JavaScript",
    ],
    technologies: ["React", "Node.js", "JavaScript", "MongoDB", "Git", "CSS"],
    relatedProjects: ["ecommerce-platform", "chat-application"],
  },
  {
    id: "frontend-intern",
    title: "Frontend Developer Intern",
    company: "Digital Solutions NG",
    companyUrl: "https://digitalsolutions.example.com",
    location: "Remote",
    startDate: "2023-01",
    endDate: "2023-05",
    type: "Development",
    description: [
      "Built user interfaces using HTML, CSS, and JavaScript",
      "Worked closely with design team to implement pixel-perfect designs",
      "Learned version control with Git and collaborative development workflows",
    ],
    achievements: [
      "Completed 5 landing page projects with 100% client satisfaction",
      "Reduced page load times by 25% through image optimization",
      "Received 'Outstanding Intern' recognition for dedication and growth",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"],
    relatedProjects: ["customer-segmentation"],
  },
  {
    id: "freelance-developer",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Ikeja, Lagos",
    startDate: "2022-08",
    endDate: "2022-12",
    type: "Development",
    description: [
      "Created websites for local businesses and startups",
      "Managed client relationships and project timelines independently",
      "Learned to translate business requirements into technical solutions",
    ],
    achievements: [
      "Delivered 8 successful projects for local businesses",
      "Built a client base through referrals and quality work",
      "Gained experience in client communication and project management",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
    relatedProjects: ["ecommerce-platform"],
  },
]

const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "Built a responsive e-commerce website with React, Node.js, and MongoDB for a local business.",
    technologies: ["React", "Node.js", "MongoDB", "CSS", "Stripe"],
    category: "Development",
    impact: "Increased client's online sales by 150%",
  },
  {
    id: "chat-application",
    title: "Real-time Chat Application",
    description: "Developed a WebSocket-based chat app with user authentication and message history.",
    technologies: ["JavaScript", "Socket.io", "Express", "HTML", "CSS"],
    category: "Development",
    impact: "Successfully handles 100+ concurrent users",
  },
  {
    id: "customer-segmentation",
    title: "Business Landing Pages",
    description: "Created multiple responsive landing pages for local businesses with modern designs.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    category: "Development",
    impact: "Improved client conversion rates by 40%",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Built a personal portfolio website showcasing projects and skills with modern animations.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Development",
    impact: "Attracted 5+ freelance opportunities",
  },
  {
    id: "task-manager",
    title: "Task Management App",
    description: "Developed a full-stack task management application with user authentication and CRUD operations.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "Development",
    impact: "Used by 50+ beta testers with positive feedback",
  },
]

// Helper functions
const getTypeIcon = (type: Experience["type"]) => {
  switch (type) {
    case "Development":
      return <Code className="h-5 w-5" />
    case "Project Management":
      return <ClipboardList className="h-5 w-5" />
    case "Data Analysis":
      return <BarChart3 className="h-5 w-5" />
    case "Hybrid":
      return <Zap className="h-5 w-5" />
    default:
      return <Briefcase className="h-5 w-5" />
  }
}

const getTypeColor = (type: Experience["type"]) => {
  switch (type) {
    case "Development":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Project Management":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Data Analysis":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Hybrid":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const scrollToProjects = (projectIds: string[]) => {
  const projectsSection = document.getElementById("projects")
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: "smooth" })

    // Highlight related projects after scrolling
    setTimeout(() => {
      projectIds.forEach((id) => {
        const projectElement = document.querySelector(`[data-project-id="${id}"]`)
        if (projectElement) {
          projectElement.classList.add("ring-2", "ring-primary", "ring-offset-2")
          setTimeout(() => {
            projectElement.classList.remove("ring-2", "ring-primary", "ring-offset-2")
          }, 3000)
        }
      })
    }, 1000)
  }
}

const calculateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = endDate === "Present" ? new Date() : new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))

  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`
  } else {
    const years = Math.floor(diffMonths / 12)
    const months = diffMonths % 12
    return `${years} year${years > 1 ? "s" : ""}${months > 0 ? ` ${months} month${months > 1 ? "s" : ""}` : ""}`
  }
}

// Main component
export default function WorkTimeline() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<"All" | Experience["type"]>("All")

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const filteredExperiences = experiences.filter((exp) => filter === "All" || exp.type === filter)

  const getRelatedProjects = (projectIds: string[]) => {
    return projects.filter((project) => projectIds.includes(project.id))
  }

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {["All", "Development", "Project Management", "Data Analysis", "Hybrid"].map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterType as typeof filter)}
            className="gap-2"
          >
            {filterType !== "All" && getTypeIcon(filterType as Experience["type"])}
            {filterType}
          </Button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-8">
          <AnimatePresence>
            {filteredExperiences.map((experience, index) => {
              const isExpanded = expandedItems.has(experience.id)
              const relatedProjects = getRelatedProjects(experience.relatedProjects)
              const duration = calculateDuration(experience.startDate, experience.endDate)

              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block" />

                  {/* Experience Card */}
                  <Card className="md:ml-16 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="cursor-pointer" onClick={() => toggleExpanded(experience.id)}>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <CardTitle className="text-xl">{experience.title}</CardTitle>
                            <Badge className={`gap-1 ${getTypeColor(experience.type)}`}>
                              {getTypeIcon(experience.type)}
                              {experience.type}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {experience.companyUrl ? (
                                <a
                                  href={experience.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {experience.company}
                                  <ExternalLink className="h-3 w-3 inline ml-1" />
                                </a>
                              ) : (
                                experience.company
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {experience.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {experience.startDate.split("-")[0]} -{" "}
                              {experience.endDate === "Present" ? "Present" : experience.endDate.split("-")[0]}
                              <span className="text-xs">({duration})</span>
                            </div>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm" className="ml-2">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardHeader>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="space-y-6">
                            {/* Description */}
                            <div>
                              <h4 className="font-semibold mb-2">Role Description</h4>
                              <ul className="space-y-1">
                                {experience.description.map((desc, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">{desc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Key Achievements */}
                            <div>
                              <h4 className="font-semibold mb-2">Key Achievements</h4>
                              <ul className="space-y-1">
                                {experience.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="font-semibold mb-2">Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, i) => (
                                  <Badge key={i} variant="secondary">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Related Projects */}
                            {relatedProjects.length > 0 && (
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold">Related Projects ({relatedProjects.length})</h4>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => scrollToProjects(experience.relatedProjects)}
                                    className="gap-2"
                                  >
                                    View Projects
                                    <ArrowRight className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="grid gap-3">
                                  {relatedProjects.map((project) => (
                                    <motion.div
                                      key={project.id}
                                      className="p-3 border rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                                      onClick={() => scrollToProjects([project.id])}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                          <h5 className="font-medium text-sm">{project.title}</h5>
                                          <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
                                          {project.impact && (
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                                              Impact: {project.impact}
                                            </p>
                                          )}
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                          {project.category}
                                        </Badge>
                                      </div>
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {project.technologies.slice(0, 3).map((tech, i) => (
                                          <Badge key={i} variant="secondary" className="text-xs px-1.5 py-0.5">
                                            {tech}
                                          </Badge>
                                        ))}
                                        {project.technologies.length > 3 && (
                                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                            +{project.technologies.length - 3} more
                                          </Badge>
                                        )}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 p-6 bg-muted/50 rounded-lg"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">2+</div>
          <div className="text-sm text-muted-foreground">Years Experience</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{projects.length}</div>
          <div className="text-sm text-muted-foreground">Projects Built</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">3</div>
          <div className="text-sm text-muted-foreground">Companies</div>
        </div>
      </motion.div>
    </div>
  )
}
