import type { SocialLink, ExternalLinks } from '@/types'

export const socialLinks: SocialLink[] = [
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

// Centralized external links for the entire application
export const externalLinks: ExternalLinks = {
  // Email and contact
  email: "mailto:ieeehowardbison@gmail.com",
  location: "https://share.google/AoGWHRD38lmKDHIZ3",
  
  // Community and registration
  groupme: "https://groupme.com/join_group/96131081/uo3DOddE",
  registrationForm: "https://forms.gle/xymBWBfqJHvPH6vP8",
  
  // Calendar
  calendarEmbed: "https://calendar.google.com/calendar/embed?src=3695cdde43cb523cdc2d9375046f3b46cdfced769c7846afc5dd57c4061b9900%40group.calendar.google.com&ctz=America%2FNew_York",
  calendarView: "https://calendar.google.com/placeholder",
  
  // Community section anchor
  communityJoin: "#join"
}
