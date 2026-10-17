import mediumPosts from "@/features/content/data/medium.generated.json";

export type Article = {
  title: string;
  meta: string;
  href: string;
};

export const articles: Article[] = mediumPosts as Article[];
