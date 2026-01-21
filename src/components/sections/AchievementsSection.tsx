import React from "react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Achievement, FunFact } from '../../types';
import { fetchAchievements, fetchFunFacts } from '../../utils/achievements';
import { COLORS, FONTS } from '../../constants';
import { 
  FaBug, 
  FaTrophy, 
  FaStar, 
  FaShieldAlt, 
  FaMedal, 
  FaAward,
  FaCrow,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { SiHackerone } from 'react-icons/si';

export default function AchievementsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [funFacts, setFunFacts] = useState<FunFact[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [achievementsData, funFactsData] = await Promise.all([
          fetchAchievements(),
          fetchFunFacts()
        ]);
        setAchievements(achievementsData);
        setFunFacts(funFactsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (funFacts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [funFacts.length]);

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

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Bugcrowd':
        return <FaCrow className="text-green-500" />;
      case 'HackerOne':
        return <SiHackerone className="text-orange-500" />;
      default:
        return <FaShieldAlt className="text-purple-500" />;
    }
  };

  if (loading) {
    return (
      <section
        id="achievements"
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
      id="achievements"
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
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                color: COLORS.text,
                fontFamily: FONTS.primary,
              }}
            >
              Achievements & Stats
            </h2>
            <p
              className="text-lg"
              style={{ color: COLORS.textSecondary }}
            >
              My bug bounty journey and security research highlights
            </p>
          </motion.div>

          {/* Fun Facts Ticker */}
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
                className="text-sm font-semibold whitespace-nowrap flex items-center gap-2"
                style={{ color: COLORS.accent }}
              >
                <span className="text-xl">✨</span> FUN FACT:
              </span>
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFactIndex}
                    className="text-sm flex items-center gap-3"
                    style={{ color: COLORS.text }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xl">{funFacts[currentFactIndex]?.icon}</span>
                    <span>{funFacts[currentFactIndex]?.fact}</span>
                    <span
                      className="text-xs px-2 py-1 rounded-full ml-auto"
                      style={{
                        backgroundColor: `${COLORS.accent}20`,
                        color: COLORS.accent,
                      }}
                    >
                      {funFacts[currentFactIndex]?.category}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Stats Summary */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            variants={containerVariants}
          >
            {[
              { label: 'Total Bugs', value: '79+', icon: <FaBug className="text-xl" />, color: 'text-red-400' },
              { label: 'Platforms', value: '2', icon: <FaShieldAlt className="text-xl" />, color: 'text-blue-400' },
              { label: 'Rank', value: 'Top 2%', icon: <FaTrophy className="text-xl" />, color: 'text-yellow-400' },
              { label: 'Reputation', value: '5.6k', icon: <FaStar className="text-xl" />, color: 'text-green-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="rounded-lg p-6 text-center border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.background}CC`,
                  backdropFilter: 'blur(10px)',
                }}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className={`${stat.color} mb-2 flex justify-center`}>
                  {stat.icon}
                </div>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: COLORS.text }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm"
                  style={{ color: COLORS.textSecondary }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {achievements.map((achievement) => (
              <motion.article
                key={achievement.id}
                className="rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group h-full"
                style={{
                  backgroundColor: `${COLORS.background}CC`,
                  backdropFilter: 'blur(10px)',
                }}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {getPlatformIcon(achievement.platform)}
                      </div>
                      <div>
                        <span
                          className="text-xs font-semibold px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: `${COLORS.accent}20`,
                            color: COLORS.accent,
                          }}
                        >
                          {achievement.platform}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: COLORS.textSecondary }}
                    >
                      {new Date(achievement.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  {/* Title & Description */}
                  <h3
                    className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors"
                    style={{ color: COLORS.text }}
                  >
                    {achievement.title}
                  </h3>
                  
                  <p
                    className="text-sm mb-4 line-clamp-3 flex-grow"
                    style={{ color: COLORS.textSecondary }}
                  >
                    {achievement.description}
                  </p>
                  
                  {/* Stats */}
                  {achievement.stats && (
                    <div className="mt-auto pt-4 border-t border-purple-500/20">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {achievement.stats.rank && (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-300">
                            {achievement.stats.rank}
                          </span>
                        )}
                        {achievement.stats.reputation && (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300">
                            {achievement.stats.reputation} pts
                          </span>
                        )}
                        {achievement.stats.bugsSubmitted && (
                          <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-300">
                            {achievement.stats.bugsSubmitted} bugs
                          </span>
                        )}
                      </div>
                      {achievement.stats.swagReceived && (
                        <div className="text-xs" style={{ color: COLORS.textSecondary }}>
                          <span className="font-medium">Swag: </span>
                          {achievement.stats.swagReceived.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Link */}
                  {achievement.link && (
                    <motion.a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-semibold mt-4"
                      style={{ color: COLORS.accent }}
                      whileHover={{ x: 5 }}
                    >
                      View Profile <FaExternalLinkAlt className="ml-2" size={12} />
                    </motion.a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Platform Buttons */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://bugcrowd.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold border-2 transition-all flex items-center gap-3"
                style={{
                  borderColor: '#2DDE98',
                  color: '#2DDE98',
                }}
                whileHover={{
                  backgroundColor: '#2DDE98',
                  color: COLORS.text,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCrow /> Bugcrowd Profile
              </motion.a>
              
              <motion.a
                href="https://hackerone.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold border-2 transition-all flex items-center gap-3"
                style={{
                  borderColor: '#FF6B35',
                  color: '#FF6B35',
                }}
                whileHover={{
                  backgroundColor: '#FF6B35',
                  color: COLORS.text,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <SiHackerone /> HackerOne Profile
              </motion.a>
              
              <motion.a
                href="/resume"
                className="px-6 py-3 rounded-full font-semibold border-2 transition-all flex items-center gap-3"
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
                <FaAward /> Full Resume
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}