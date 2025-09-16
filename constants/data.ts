export interface Course {
  id: string
  title: string
  description: string
  year: string
  semester: string
  thumbnail: string
  slug: string
  status: "current" | "past"
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
}

export interface Instructor {
  id: string
  name: string
  title: string
  department: string
  image: string
  bio: string
  expertise: string[]
  email: string
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Embedded Systems",
    description: "Learn the fundamentals of embedded systems programming with Arduino and Raspberry Pi.",
    year: "2024",
    semester: "Fall",
    thumbnail: "/embedded-systems-arduino.jpg",
    slug: "intro-embedded-systems",
    status: "current",
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    description: "Explore the basics of machine learning algorithms and their practical applications.",
    year: "2024",
    semester: "Fall",
    thumbnail: "/machine-learning-neural-network.jpg",
    slug: "ml-fundamentals",
    status: "current",
  },
  {
    id: "3",
    title: "Web Development with React",
    description: "Build modern web applications using React, Next.js, and modern JavaScript.",
    year: "2024",
    semester: "Spring",
    thumbnail: "/react-web-development.png",
    slug: "web-development-react",
    status: "past",
  },
  {
    id: "4",
    title: "Digital Signal Processing",
    description: "Understanding signal processing techniques and their applications in engineering.",
    year: "2023",
    semester: "Fall",
    thumbnail: "/digital-signal-processing-waves.jpg",
    slug: "digital-signal-processing",
    status: "past",
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    role: "Faculty Advisor",
    image: "/professional-woman-professor.png",
    bio: "Professor of Electrical Engineering with expertise in embedded systems and IoT.",
  },
  {
    id: "2",
    name: "Marcus Williams",
    role: "President",
    image: "/student-leader-male.jpg",
    bio: "Senior in Computer Engineering, passionate about robotics and automation.",
  },
  {
    id: "3",
    name: "Aisha Patel",
    role: "Vice President",
    image: "/student-leader-female.jpg",
    bio: "Junior in Electrical Engineering, specializing in power systems and renewable energy.",
  },
  {
    id: "4",
    name: "Jordan Chen",
    role: "Technical Lead",
    image: "/student-programmer.jpg",
    bio: "Senior in Computer Science, focused on machine learning and AI applications.",
  },
]

export const projects: Project[] = [
  {
    id: "1",
    title: "Smart Campus IoT System",
    description: "IoT sensors monitoring campus energy usage and environmental conditions.",
    image: "/iot-sensors-campus-technology.jpg",
    technologies: ["Arduino", "Raspberry Pi", "Python", "MQTT"],
  },
  {
    id: "2",
    title: "Autonomous Drone Navigation",
    description: "Computer vision-based drone navigation system for search and rescue operations.",
    image: "/autonomous-drone-technology.jpg",
    technologies: ["OpenCV", "Python", "ROS", "Machine Learning"],
  },
  {
    id: "3",
    title: "Renewable Energy Monitor",
    description: "Real-time monitoring system for solar panel efficiency and power generation.",
    image: "/solar-panels-monitoring-system.jpg",
    technologies: ["React", "Node.js", "InfluxDB", "Grafana"],
  },
]

export const instructors: Instructor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Professor of Electrical Engineering",
    department: "Electrical & Computer Engineering",
    image: "/professional-woman-professor.png",
    bio: "Dr. Johnson has over 15 years of experience in embedded systems and IoT research. She leads multiple NSF-funded projects and has published over 50 papers in top-tier conferences.",
    expertise: ["Embedded Systems", "IoT", "Microcontrollers", "Real-time Systems"],
    email: "s.johnson@howard.edu",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    title: "Associate Professor of Computer Science",
    department: "Computer Science",
    image: "/professor-male-asian.jpg",
    bio: "Specializing in machine learning and artificial intelligence, Dr. Chen brings industry experience from Google and Microsoft to his teaching and research.",
    expertise: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing"],
    email: "m.chen@howard.edu",
  },
  {
    id: "3",
    name: "Dr. Amara Williams",
    title: "Assistant Professor of Computer Engineering",
    department: "Electrical & Computer Engineering",
    image: "/professor-female-african-american.jpg",
    bio: "Dr. Williams focuses on digital signal processing and communications systems. She has extensive experience in both academic research and industry applications.",
    expertise: ["Digital Signal Processing", "Communications", "MATLAB", "FPGA Design"],
    email: "a.williams@howard.edu",
  },
  {
    id: "4",
    name: "Prof. David Rodriguez",
    title: "Senior Lecturer in Web Technologies",
    department: "Computer Science",
    image: "/professor-male-hispanic.jpg",
    bio: "With 10 years of full-stack development experience, Prof. Rodriguez teaches modern web development technologies and leads student projects with industry partners.",
    expertise: ["React", "Node.js", "Full-Stack Development", "Database Design"],
    email: "d.rodriguez@howard.edu",
  },
  {
    id: "5",
    name: "Dr. Lisa Park",
    title: "Professor of Systems Engineering",
    department: "Systems & Computer Engineering",
    image: "/professor-female-korean.jpg",
    bio: "Dr. Park's research focuses on autonomous systems and robotics. She has led several DARPA-funded projects and collaborates with NASA on space robotics.",
    expertise: ["Robotics", "Autonomous Systems", "Control Theory", "ROS"],
    email: "l.park@howard.edu",
  },
]

export const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/howard_ieee",
    icon: "instagram",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/howard-ieee",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:ieee@howard.edu",
    icon: "mail",
  },
  {
    name: "Linktree",
    url: "https://linktr.ee/howard_ieee",
    icon: "link",
  },
]
