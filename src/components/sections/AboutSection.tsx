import React from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { COLORS, FONTS } from '../../constants';

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-6"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="container mx-auto max-w-4xl">
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
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              variants={itemVariants}
            >
              <p
                className="text-lg leading-relaxed"
                style={{ color: COLORS.text }}
              >
                I'm a passionate <span style={{ color: COLORS.accent }}>Creative Technologist</span> with a deep love for building innovative digital experiences. My journey in technology has been driven by curiosity and a relentless pursuit of excellence.
              </p>
              
              <p
                className="text-lg leading-relaxed"
                style={{ color: COLORS.text }}
              >
                With a strong foundation in <span style={{ color: COLORS.accent }}>cybersecurity</span>, I bring a security-first mindset to every project, ensuring that the solutions I create are not just functional, but also robust and secure.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={itemVariants}
            >
              <p
                className="text-lg leading-relaxed"
                style={{ color: COLORS.text }}
              >
                My expertise in <span style={{ color: COLORS.accent }}>Artificial Intelligence</span> and <span style={{ color: COLORS.accent }}>Software Development</span> allows me to bridge the gap between cutting-edge technology and practical applications that solve real-world problems.
              </p>
              
              <p
                className="text-lg leading-relaxed"
                style={{ color: COLORS.text }}
              >
                I believe in the power of continuous learning and staying at the forefront of technological innovation to deliver solutions that make a meaningful impact.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={itemVariants}
          >
            {[
              { label: 'Projects', value: '50+' },
              { label: 'Technologies', value: '20+' },
              { label: 'Years Experience', value: '5+' },
              { label: 'Happy Clients', value: '30+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 rounded-lg border"
                style={{ borderColor: COLORS.accent }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: COLORS.accent }}
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
        </motion.div>
      </div>
    </section>
  );
}