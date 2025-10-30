import React from "react";
import { motion } from 'framer-motion';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { COLORS, FONTS } from '../../constants';

export default function HeroSection() {
  const { scrollToSection } = useScrollToSection();

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative"
      style={{ backgroundColor: COLORS.background }}
    >
      <motion.div
        className="text-center z-10 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          style={{
            color: COLORS.text,
            fontFamily: FONTS.primary,
            background: COLORS.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          variants={itemVariants}
        >
          Jamson Anjera
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl lg:text-3xl mb-8 space-y-2"
          style={{ color: COLORS.textSecondary }}
          variants={itemVariants}
        >
          <div>Cyber Security Enthusiast</div>
          <div>Creative Technologist</div>
          <div>Software Developer</div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
            style={{
              backgroundColor: COLORS.accent,
              color: COLORS.text,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 rounded-full font-semibold border-2 transition-all transform hover:scale-105"
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
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-6 h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: COLORS.accent }}
          >
            <motion.div
              className="w-1 h-3 rounded-full mt-2"
              style={{ backgroundColor: COLORS.accent }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-20"
        style={{ backgroundColor: COLORS.accent }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-10"
        style={{ backgroundColor: COLORS.accent }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
    </section>
  );
}