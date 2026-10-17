export type Recommendation = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  source: "linkedin" | "topmate";
  href?: string;
  date?: string;
  avatarUrl?: string;
};
