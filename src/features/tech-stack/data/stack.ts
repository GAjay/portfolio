export type TechTool = {
  name: string;
  icon: string;
  /** Payment gateways — icon sits on a white pad (brand colors unchanged). */
  payment?: boolean;
};

/** Icons in `public/assets/tech` (Simple Icons). */
export const techStack: TechTool[] = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "HTML5", icon: "html5" },
  { name: "CSS3", icon: "css3" },
  { name: "Tailwind", icon: "tailwindcss" },
  { name: "Sass", icon: "sass" },
  { name: "Redux", icon: "redux" },
  { name: "GraphQL", icon: "graphql" },
  { name: "Figma", icon: "figma" },
  { name: "Vite", icon: "vite" },
  { name: "Webpack", icon: "webpack" },
  { name: "ESLint", icon: "eslint" },
  { name: "Jest", icon: "jest" },
  { name: "Playwright", icon: "playwright" },
  { name: "Storybook", icon: "storybook" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Stripe", icon: "stripe", payment: true },
  { name: "Razorpay", icon: "razorpay", payment: true },
  { name: "PayPal", icon: "paypal", payment: true },
  { name: "Google Pay", icon: "googlepay", payment: true },
  { name: "Apple Pay", icon: "applepay", payment: true },
  { name: "Docker", icon: "docker" },
  { name: "AWS", icon: "amazonaws" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "GitHub", icon: "github" },
];
