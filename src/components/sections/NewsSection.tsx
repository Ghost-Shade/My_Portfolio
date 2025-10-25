import React from "react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { NewsItem } from '../../types';
import { fetchTechNews } from '../../utils/news';
import { COLORS, FONTS } from '../../constants';

export default function NewsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchTechNews();
        setNews(newsData);
      } catch (error) {
        console.error('Failed to load news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const tickerVariants = {
    hidden: { x: '100%' },
    visible: {
      x: '-100%',
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  if (loading) {
    return (
      <section
        id="news"
        className="py-20 px-6"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div
            className="inline-block w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="news"
      ref={ref}
      className="py-20 px-6"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            style={{
              color: COLORS.text,
              fontFamily: FONTS.primary,
            }}
            variants={itemVariants}
          >
            Tech & Security News
          </motion.h2>

          {/* News Ticker */}
          <motion.div
            className="mb-16 overflow-hidden rounded-lg border border-purple-500/30 p-4"
            variants={itemVariants}
            style={{
              backgroundColor: `${COLORS.background}CC`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center space-x-4">
              <span
                className="text-sm font-semibold whitespace-nowrap"
                style={{ color: COLORS.accent }}
              >
                📰 LATEST:
              </span>
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    className="text-sm"
                    style={{ color: COLORS.text }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-semibold">{news[currentIndex]?.source}:</span>{' '}
                    {news[currentIndex]?.title}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* News Cards Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {news.slice(0, 6).map((item, index) => (
              <motion.article
                key={item.id}
                className="rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group"
                style={{
                  backgroundColor: `${COLORS.background}CC`,
                  backdropFilter: 'blur(10px)',
                }}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${COLORS.accent}20`,
                        color: COLORS.accent,
                      }}
                    >
                      {item.source}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: COLORS.textSecondary }}
                    >
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3
                    className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors"
                    style={{ color: COLORS.text }}
                  >
                    {item.title}
                  </h3>
                  
                  <p
                    className="text-sm mb-4 line-clamp-3"
                    style={{ color: COLORS.textSecondary }}
                  >
                    {item.description}
                  </p>
                  
                  <motion.a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold"
                    style={{ color: COLORS.accent }}
                    whileHover={{ x: 5 }}
                  >
                    Read More →
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div
            className="text-center mt-12"
            variants={itemVariants}
          >
            <motion.button
              className="px-8 py-3 rounded-full font-semibold border-2 transition-all"
              style={{
                borderColor: COLORS.accent,
                color: COLORS.accent,
              }}
              whileHover={{
                backgroundColor: COLORS.accent,
                color: COLORS.text,
              }}
              whileTap={{ scale: 0.95 }}
            >
              View More News
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}