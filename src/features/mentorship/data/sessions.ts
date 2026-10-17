export type MentorshipSession = {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
};

export const mentorshipSessions: MentorshipSession[] = [
  {
    id: "career",
    title: "Career Guidance",
    duration: "30 mins",
    price: "₹1,000",
    description: "Roadmaps for IC growth, interviews, and role transitions.",
  },
  {
    id: "resume",
    title: "Resume Review",
    duration: "30 mins",
    price: "₹1,000",
    description: "Actionable feedback on structure, impact, and keywords.",
  },
  {
    id: "mock",
    title: "Mock Interview",
    duration: "60 mins",
    price: "₹2,499",
    description: "Technical + behavioral practice with detailed notes.",
  },
  {
    id: "tech",
    title: "Technical Discussion",
    duration: "60 mins",
    price: "₹2,499",
    description: "Architecture, React/Next.js, AI in products, or system design deep dives.",
  },
];
