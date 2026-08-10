import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ArticleMetadata {
  id: string; // The filename without .md
  title: string;
  date: string;
  author: string;
  tags: string[];
  model3d?: string;
  evolutionData?: any[];
}

export interface Article extends ArticleMetadata {
  content: string;
  htmlContent: string;
}

export interface Backlink {
  sourceId: string;
  sourceTitle: string;
  extract: string; // A small snippet of text mentioning the link
}

/**
 * Normalizes a string to serve as an ID (slug)
 * Examples: "Hipertensión Arterial" -> "hipertension-arterial"
 */
export function normalizeId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/\s+/g, '-') // spaces to dashes
    .replace(/[^a-z0-9\-]/g, ''); // keep alphanumeric and dashes
}

/**
 * Recursively reads all .md files from content/ directory and subdirectories
 * Returns a Map where key is the ID (filename without .md) and value is the full path
 */
export function getAllArticleIds(): { id: string; path: string }[] {
  if (!fs.existsSync(contentDirectory)) return [];
  
  const articles: { id: string; path: string }[] = [];
  
  function readDirRecursive(dir: string, baseDir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        readDirRecursive(fullPath, baseDir);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const relativePath = path.relative(baseDir, fullPath);
        const id = relativePath.replace(/\.md$/, '');
        articles.push({ id, path: fullPath });
      }
    }
  }
  
  readDirRecursive(contentDirectory, contentDirectory);
  return articles;
}

/**
 * Builds a map of article titles (lowercase) and normalized titles to their IDs
 * This helps resolve wiki-links that reference titles instead of filenames
 */
function buildTitleToIdMap(): Record<string, string> {
  const articleEntries = getAllArticleIds();
  const titleToIdMap: Record<string, string> = {};
  
  for (const entry of articleEntries) {
    // Read just the frontmatter to get the title
    const fullPath = entry.path;
    if (!fs.existsSync(fullPath)) continue;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const title = matterResult.data.title as string || entry.id;
    
    // Map both the lowercase title and normalized version
    titleToIdMap[title.toLowerCase()] = entry.id;
    titleToIdMap[normalizeId(title)] = entry.id;
    // Also map the ID itself
    titleToIdMap[entry.id.toLowerCase()] = entry.id;
  }
  
  return titleToIdMap;
}

export async function getArticleData(id: string): Promise<Article | null> {
  // Get all articles to find the matching file
  const allArticles = getAllArticleIds();
  const articleEntry = allArticles.find(a => a.id === id || a.id.endsWith('/' + id));
  
  if (!articleEntry) return null;
  
  const fullPath = articleEntry.path;
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Convert [[Link]] to <a href="/article/link" class="internal-link">Link</a>
  // We do a custom regex replace before remark
  let content = matterResult.content;
  const wikiLinkRegex = /\[\[(.*?)\]\]/g;

  // Build title-to-ID map for better wiki-link resolution
  const titleToIdMap = buildTitleToIdMap();

  content = content.replace(wikiLinkRegex, (match, linkText) => {
    // Try to resolve the link using title mapping first, then fallback to normalization
    const targetId = titleToIdMap[linkText.toLowerCase()] || 
                     titleToIdMap[normalizeId(linkText)] || 
                     normalizeId(linkText);
    return `<a href="/nutribrain/n/${targetId}" class="internal-link" data-target="${targetId}">${linkText}</a>`;
  });

  const processedContent = await remark()
    .use(html, { sanitize: false }) // enable raw HTML for our custom links
    .process(content);

  const htmlContent = processedContent.toString();

  return {
    id,
    title: matterResult.data.title || id,
    date: matterResult.data.date || '',
    author: matterResult.data.author || '',
    tags: matterResult.data.tags || [],
    model3d: matterResult.data.model3d || null,
    evolutionData: matterResult.data.evolutionData || null,
    content: matterResult.content,
    htmlContent,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const articleEntries = getAllArticleIds();
  const articles: Article[] = [];
  for (const entry of articleEntries) {
    const article = await getArticleData(entry.id);
    if (article) articles.push(article);
  }
  return articles;
}

export async function getBacklinks(targetId: string): Promise<Backlink[]> {
  const allArticles = await getAllArticles();
  const backlinks: Backlink[] = [];

  // Build title-to-ID map for better resolution
  const titleToIdMap = buildTitleToIdMap();
  const normalizedTargetId = normalizeId(targetId);
  
  // Try to find the actual target ID
  const actualTargetId = titleToIdMap[targetId.toLowerCase()] || 
                         titleToIdMap[normalizedTargetId] || 
                         normalizedTargetId;

  for (const article of allArticles) {
    if (article.id === actualTargetId) continue;

    // Check if original content mentions [[TargetTitle]]
    const wikiLinkRegex = /\[\[(.*?)\]\]/g;

    // We split into lines to capture extract
    const lines = article.content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let hasMatch = false;

      const iterRegex = new RegExp('\\[\\[(.*?)\\]\\]', 'g');
      let localMatch;
      while ((localMatch = iterRegex.exec(line)) !== null) {
        const linkText = localMatch[1];
        const resolvedId = titleToIdMap[linkText.toLowerCase()] || 
                          titleToIdMap[normalizeId(linkText)] || 
                          normalizeId(linkText);
        
        if (resolvedId === actualTargetId) {
          hasMatch = true;
          break;
        }
      }

      if (hasMatch) {
         // Create a small snippet
         const extract = line.replace(/\[\[(.*?)\]\]/g, '$1'); // simplify display
         backlinks.push({
           sourceId: article.id,
           sourceTitle: article.title,
           extract: extract.trim()
         });
         break; // one backlink extraction per article is usually enough
      }
    }
  }

  return backlinks;
}

export interface GraphData {
  nodes: { id: string; name: string; val: number }[];
  links: { source: string; target: string }[];
}

export async function getGraphData(): Promise<GraphData> {
  const allArticles = await getAllArticles();
  const nodes = allArticles.map(article => ({
    id: article.id,
    name: article.title,
    val: 1 + (article.tags.length * 0.5) // size based on complexity/tags
  }));

  const links: { source: string; target: string }[] = [];

  // Map titles to IDs for easier wiki-linking
  const titleToIdMap = buildTitleToIdMap();

  for (const article of allArticles) {
    const wikiLinkRegex = /\[\[(.*?)\]\]/g;
    let match;
    while ((match = wikiLinkRegex.exec(article.content)) !== null) {
      const linkText = match[1];
      
      // Resolve the wiki link using the title mapping
      const targetId = titleToIdMap[linkText.toLowerCase()] || 
                       titleToIdMap[normalizeId(linkText)] || 
                       normalizeId(linkText);

      // Only link if the target exists in our node list
      if (nodes.some(n => n.id === targetId)) {
        links.push({
          source: article.id,
          target: targetId
        });
      }
    }
  }

  return { nodes, links };
}
