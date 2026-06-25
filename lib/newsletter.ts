import fs from "fs";
import path from "path";

const OUTPUT_DIR = "/Users/dukjae/content-system/output";

export interface NewsletterMeta {
  date: string;
  title: string;
  excerpt: string;
  slug: string;
}

export interface NewsletterArticle extends NewsletterMeta {
  htmlContent: string;
}

function extractTitle(html: string): string {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  return m ? m[1].trim() : "오늘의 부동산 이야기";
}

function extractExcerpt(html: string): string {
  const matches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
  if (!matches) return "";
  for (const p of matches) {
    const text = p.replace(/<[^>]+>/g, "").trim();
    if (text.length > 20) return text.slice(0, 120) + (text.length > 120 ? "…" : "");
  }
  return "";
}

function extractBodyContent(html: string): string {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return m ? m[1].trim() : html;
}

export function getNewsletterList(): NewsletterMeta[] {
  if (!fs.existsSync(OUTPUT_DIR)) return [];

  const dirs = fs
    .readdirSync(OUTPUT_DIR)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .reverse();

  const articles: NewsletterMeta[] = [];
  for (const date of dirs) {
    const blogDir = path.join(OUTPUT_DIR, date, "blog");
    if (!fs.existsSync(blogDir)) continue;
    const htmlFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith(".html"));
    for (const file of htmlFiles) {
      const html = fs.readFileSync(path.join(blogDir, file), "utf-8");
      articles.push({
        date,
        slug: date,
        title: extractTitle(html),
        excerpt: extractExcerpt(html),
      });
    }
  }
  return articles;
}

export function getNewsletterArticle(date: string): NewsletterArticle | null {
  const blogDir = path.join(OUTPUT_DIR, date, "blog");
  if (!fs.existsSync(blogDir)) return null;

  const htmlFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith(".html"));
  if (htmlFiles.length === 0) return null;

  const html = fs.readFileSync(path.join(blogDir, htmlFiles[0]), "utf-8");
  return {
    date,
    slug: date,
    title: extractTitle(html),
    excerpt: extractExcerpt(html),
    htmlContent: extractBodyContent(html),
  };
}
