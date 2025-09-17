export interface Course {
  id: string
  title: string
  description: string
  year: string
  semester: string
  thumbnail: string
  slug: string
  status: "current" | "past"
  duration: string
  enrolled: number
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
  course: string
  members: string[]
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
    title: "HOPE (Hands-On PCB Engineering)",
    description: "Hands-on PCB design and engineering course using KiCAD for creating electronic projects and prototypes.",
    year: "2025",
    semester: "Fall",
    thumbnail: "/embedded-systems-arduino.jpg",
    slug: "hope-pcb-engineering",
    status: "current",
    duration: "8 weeks",
    enrolled: 10,
  },
  {
    id: "2",
    title: "FPGA Design",
    description: "Field Programmable Gate Array design and implementation using Verilog and Vivado development tools.",
    year: "2024/2025",
    semester: "Fall/Spring",
    thumbnail: "/digital-signal-processing-waves.jpg",
    slug: "fpga-design",
    status: "past",
    duration: "8 weeks",
    enrolled: 0,
  },
  {
    id: "3",
    title: "VIVA (VLSI Implementation, Verification and Architecture)",
    description: "Advanced VLSI design course covering Verilog, SystemVerilog, UVM, and Cadence Xcelium for processor design.",
    year: "2025",
    semester: "Fall",
    thumbnail: "/solar-panels-monitoring-system.jpg",
    slug: "viva-vlsi-verification",
    status: "current",
    duration: "8 weeks",
    enrolled: 8,
  },
  {
    id: "4",
    title: "Drone Academy",
    description: "Hands-on drone assembly, configuration, and flight systems training for practical aerospace applications.",
    year: "2024/2025",
    semester: "Fall/Spring",
    thumbnail: "/autonomous-drone-technology.jpg",
    slug: "drone-academy",
    status: "past",
    duration: "8 weeks",
    enrolled: 0,
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Jeff Allo",
    role: "President",
    image: "/placeholder-user.jpg",
    bio: "Leading the IEEE chapter with a vision for innovation and community building.",
  },
  {
    id: "2",
    name: "Bishesh Adhikari",
    role: "Vice President",
    image: "/placeholder-user.jpg",
    bio: "Supporting the chapter's mission and coordinating key initiatives.",
  },
  {
    id: "3",
    name: "Noëlle Crawford",
    role: "Treasurer",
    image: "/placeholder-user.jpg",
    bio: "Managing chapter finances and budget planning for events and activities.",
  },
  {
    id: "4",
    name: "Jahmelia McCarthy",
    role: "Secretary",
    image: "/placeholder-user.jpg",
    bio: "Keeping detailed records and maintaining chapter communications.",
  },
  {
    id: "5",
    name: "Dimitri Cromarty",
    role: "Technical Programs Chair",
    image: "/placeholder-user.jpg",
    bio: "Organizing technical workshops, seminars, and hands-on learning opportunities.",
  },
  {
    id: "6",
    name: "Nathaniel Crosse",
    role: "Programs Chair",
    image: "/placeholder-user.jpg",
    bio: "Coordinating chapter events, meetings, and special programs.",
  },
  {
    id: "7",
    name: "Jeff Chalumeau",
    role: "Hope Chair",
    image: "/placeholder-user.jpg",
    bio: "Leading initiatives focused on community outreach and social impact.",
  },
  {
    id: "8",
    name: "Ibukunoluwa Adeloye",
    role: "Mentorship Chair",
    image: "/placeholder-user.jpg",
    bio: "Connecting students with mentors and fostering professional development.",
  },
  {
    id: "9",
    name: "Kylan Jones",
    role: "Membership Chair",
    image: "/placeholder-user.jpg",
    bio: "Managing member recruitment, retention, and engagement strategies.",
  },
  {
    id: "10",
    name: "TaeZha Maduro",
    role: "Public Relations",
    image: "/placeholder-user.jpg",
    bio: "Managing chapter communications and external relationships.",
  },
  {
    id: "11",
    name: "Jamoya Mondle",
    role: "Community Service Chair",
    image: "/placeholder-user.jpg",
    bio: "Organizing volunteer activities and community service projects.",
  },
  {
    id: "12",
    name: "Jadon Ogala",
    role: "Freshman Liaison",
    image: "/placeholder-user.jpg",
    bio: "Welcoming new students and helping them integrate into the IEEE community.",
  },
  {
    id: "13",
    name: "Ayooluwa Olotu",
    role: "Conference Planning Chair",
    image: "/placeholder-user.jpg",
    bio: "Organizing conferences, symposiums, and major chapter events.",
  },
]

export const projects: Project[] = [
  {
    id: "1",
    title: "Enhanced Hand-held Gameboy",
    description: "A modern take on the classic handheld gaming device with enhanced features and capabilities.",
    image: "/autonomous-drone-technology.jpg",
    technologies: ["KiCAD"],
    course: "HOPE",
    members: ["Members"],
  },
  {
    id: "2",
    title: "Gyro Controller",
    description: "Motion-controlled input device using gyroscope sensors for intuitive gaming and applications.",
    image: "/iot-sensors-campus-technology.jpg",
    technologies: ["KiCAD"],
    course: "HOPE",
    members: ["Members"],
  },
  {
    id: "3",
    title: "X-Input Mini Controller",
    description: "Compact gaming controller with X-Input compatibility for PC gaming applications.",
    image: "/embedded-systems-arduino.jpg",
    technologies: ["KiCAD"],
    course: "HOPE",
    members: ["Members"],
  },
  {
    id: "4",
    title: "Digital Pet",
    description: "Interactive digital pet simulation with feeding, care, and growth mechanics.",
    image: "/machine-learning-neural-network.jpg",
    technologies: ["KiCAD"],
    course: "HOPE",
    members: ["Members"],
  },
  {
    id: "5",
    title: "Stopwatch on FPGA",
    description: "High-precision digital stopwatch implemented on FPGA hardware for accurate timing measurements.",
    image: "/digital-signal-processing-waves.jpg",
    technologies: ["Verilog", "Vivado"],
    course: "FPGA",
    members: ["Members"],
  },
  {
    id: "6",
    title: "Single Cycle RISC-V Processor",
    description: "Complete implementation of a single-cycle RISC-V processor with instruction set architecture.",
    image: "/solar-panels-monitoring-system.jpg",
    technologies: ["Verilog", "SystemVerilog", "UVM", "Cadence Xcelium", "Vivado"],
    course: "VIVA",
    members: ["Members"],
  },
  {
    id: "7",
    title: "Drone Assembly Project",
    description: "Hands-on drone assembly and configuration project focusing on hardware integration and flight systems.",
    image: "/autonomous-drone-technology.jpg",
    technologies: ["Drone Assembly", "Flight Controller", "Hardware Integration"],
    course: "Drone Academy",
    members: ["Members"],
  },
]

export const instructors: Instructor[] = [
  {
    id: "1",
    name: "Jeff Chalumeau",
    title: "HOPE Chair",
    department: "IEEE Student Chapter",
    image: "/placeholder-user.jpg",
    bio: "Specializes in hands-on PCB engineering and practical electronics education.",
    expertise: ["PCB Design", "KiCAD", "Electronics", "Hardware Engineering"],
    email: "jeffrey.chalumeau@bison.howard.edu",
  },
  {
    id: "2",
    name: "Dimitri Cromarty",
    title: "VIVA Chair",
    department: "IEEE Student Chapter",
    image: "/placeholder-user.jpg",
    bio: "Expert in FPGA design and VLSI implementation.",
    expertise: ["FPGA Design", "Verilog", "VLSI", "Digital Design"],
    email: "dimitri.cromarty@bison.howard.edu",
  },
]

export const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/ieee_hu/",
    icon: "instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/howard-university-ieee-student-branch/",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:ieeehowardbison@gmail.com",
    icon: "mail",
  },
  {
    name: "Linktree",
    url: "https://linktr.ee/ieee_hu",
    icon: "link",
  },
]
