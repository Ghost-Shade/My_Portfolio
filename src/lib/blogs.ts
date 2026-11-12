import { load as yamlLoad } from 'js-yaml';
import type { BlogPost } from '../types';

// Vite inlines every markdown file as a raw string at build time.
// Add/edit posts only by committing files to content/blogs/.
const postModules = import.meta.glob('/content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  // 1. Normalize line endings (\r\n -> \n) and strip any UTF-8 BOM from Windows
  const normalized = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  
  // 2. Must start with '---\n'
  if (!normalized.startsWith('---\n')) {
    return { data: {}, content: normalized };
  }
  
  // 3. Find the closing '---'
  const endIndex = normalized.indexOf('\n---', 4);
  if (endIndex === -1) {
    return { data: {}, content: normalized };
  }

  const yamlPart = normalized.slice(4, endIndex);
  // 4. Skip the closing '---' (4 chars) and trim any leading blank lines from the body
  const body = normalized.slice(endIndex + 4).replace(/^\n+/, '');

  let data: Record<string, unknown> = {};
  try {
    data = (yamlLoad(yamlPart) as Record<string, unknown>) ?? {};
  } catch (err) {
    console.error('Failed to parse frontmatter YAML:', err);
  }
  
  return { data, content: body };
}

const slugFromPath = (path: string): string =>
  path.split('/').pop()?.replace(/\.md$/i, '') ?? '';

const formatDate = (value: unknown): string => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '');
};

const normalizeTags = (tags: unknown): string[] => {
  if (Array.isArray(tags)) return tags.map((t) => String(t));
  if (typeof tags === 'string') {
    return tags.split(',').map((t) => t.trim()).filter(Boolean);
  }
  return [];
};

export function getAllPosts(): BlogPost[] {
  return Object.entries(postModules)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const slug = slugFromPath(path);
      return {
        slug,
        title: String(data.title ?? slug),
        date: formatDate(data.date),
        category: String(data.category ?? 'Blog'),
        summary: String(data.summary ?? ''),
        tags: normalizeTags(data.tags),
        content,
      } satisfies BlogPost;
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}