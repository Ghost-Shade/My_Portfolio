import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { getPostBySlug } from '../lib/blogs';
import { COLORS, FONTS } from '../constants';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blogs" replace />;

  return (
    <section
      className="min-h-screen pt-32 pb-20 px-6"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="container mx-auto max-w-3xl">
        <Link
          to="/blogs"
          className="text-sm mb-8 inline-block hover:text-purple-400 transition-colors"
          style={{ color: COLORS.textSecondary }}
        >
          ← Back to Blogs
        </Link>

        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ backgroundColor: `${COLORS.accent}20`, color: COLORS.accent }}
            >
              {post.category}
            </span>
            <span className="text-xs" style={{ color: COLORS.textSecondary }}>
              {post.date}
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: COLORS.text, fontFamily: FONTS.primary }}
          >
            {post.title}
          </h1>
          {post.summary && (
            <p className="mb-6 text-lg" style={{ color: COLORS.textSecondary }}>
              {post.summary}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${COLORS.accent}10`, color: COLORS.textSecondary }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        <article className="blog-content" style={{ color: COLORS.text }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </section>
  );
}