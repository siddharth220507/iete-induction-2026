// Central content and configuration for the portal.
// Edit these values to update the page — no component changes needed.

/**
 * TODO (before going live): replace with the real WhatsApp group invite URL.
 * The success state links here after submission.
 */
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/EGACqoqqIWqJUJnmQKc0Yp";

export const CONTACT_EMAIL = "ietebits@gmail.com";

export const CLUB_NAME = "IETE Students' Forum";
export const FULL_CLUB_NAME = "Institution of Electronics & Telecommunication Engineers";
export const BATCH = "Batch 2026";

export interface Domain {
  no: string;
  name: string;
  category: "Build" | "Create" | "Compete" | "Lead";
  description: string;
}

export const DOMAINS: Domain[] = [
  { no: "01", name: "Artificial Intelligence", category: "Build", description: "Agents, automation and applied intelligence. From concept to working demo." },
  { no: "02", name: "Machine Learning", category: "Build", description: "Training models on real data and presenting results that hold up to questions." },
  { no: "03", name: "Competitive Programming", category: "Compete", description: "Contest teams, problem-setting and the discipline of clean algorithms." },
  { no: "04", name: "Graphic Design", category: "Create", description: "Posters, identity systems and the visual language of the forum." },
  { no: "05", name: "Web Development", category: "Build", description: "The forum's web presence — this portal is a first taste of that work." },
  { no: "06", name: "IoT & Robotics", category: "Build", description: "Sensors, microcontrollers and machines that move. Hardware you can hold." },
  { no: "07", name: "Video Editing", category: "Create", description: "Event films, recaps and motion pieces that document everything we do." },
  ];

export const CATEGORY_ORDER = ["Build", "Create", "Compete"] as const;

export const BRANCHES = [
  "CSE",
  "CSE(CyberSecurity)",
  "IT",
  "ECE",
  "Electrical",
  "Mechanical",
  "Chemical Eng.",
  "Civil",
  "Metallurgy",
  "Mining",
  "Production & Industrial Eng.",
] as const;

export interface Step {
  no: string;
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  { no: "01", title: "Application", description: "Fill the induction form below. Your first step towards joining IETE-SF" },
  { no: "02", title: "Screening & Learning", description: "A short screening, followed by resources and a guided task to put your learning into practice." },
  { no: "03", title: "Personal Interview", description: "A conversation with the core team. Bring your curiosity." },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "Who can apply for the induction?",
    answer:
      "Any enrolled student of the institute, from any branch and any year, who genuinely wants to build, create, compete or lead with us. First-years are encouraged — interest matters more than experience.",
  },
  {
    question: "Can I apply to more than one domain?",
    answer:
      "Apply to the one you care about most in this form — you can mention secondary interests in the descriptions. During the interview there is room to discuss switching or holding dual roles across domains.",
  },
  {
    question: "Is prior experience required?",
    answer:
      "No. The interactive guided task and interview are designed to see how you think, not what you already know. You don’t need experience. Just curiosity and the willingness to learn.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "You will get a confirmation, then takes place screening followed by a guided domain specific task within a few days. Complete it at your own pace, then appear for a short personal interview with the core team.",
  },
  
];
