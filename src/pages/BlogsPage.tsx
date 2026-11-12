import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts } from '../lib/blogs';
import { COLORS, FONTS } from '../constants';

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <section
      className="min-h-screen pt-32 pb-20 px-6"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: COLORS.text, fontFamily: FONTS.primary }}
          >
            Blogs
          </h1>
          <p className="mb-12" style={{ color: COLORS.textSecondary }}>
            CTF writeups and bug bounty reports.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <p style={{ color: COLORS.textSecondary }}>No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/blogs/${post.slug}`}
                  className="block p-6 rounded-lg border transition-all hover:-translate-y-1"
                  style={{
                    borderColor: `${COLORS.accent}30`,
                    backgroundColor: `${COLORS.background}CC`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
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
                  <h2 className="text-xl font-bold mb-2" style={{ color: COLORS.text }}>
                    {post.title}
                  </h2>
                  <p className="text-sm" style={{ color: COLORS.textSecondary }}>
                    {post.summary}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
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
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}