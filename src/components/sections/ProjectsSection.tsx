import React from "react";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Project } from '../../types';
import { COLORS, FONTS } from '../../constants';

const projects: Project[] = [
  {
    id: '1',
    title: 'Security Software Suite',
    description: 'Advanced cybersecurity platform with real-time threat detection and automated response systems.',
    technologies: ['React', 'Node.js', 'Python', 'Machine Learning'],
    image: '/assets/security-project.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '2',
    title: '3D Portfolio Experience',
    description: 'Interactive 3D portfolio showcasing advanced web graphics and immersive user experiences.',
    technologies: ['Three.js', 'React', 'WebGL', 'GSAP'],
    image: '/assets/3d-portfolio.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Intelligent data visualization platform with predictive analytics and automated insights.',
    technologies: ['TypeScript', 'D3.js', 'TensorFlow.js', 'Next.js'],
    image: '/assets/analytics-dashboard.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: '4',
    title: 'Blockchain Security Auditor',
    description: 'Smart contract security analysis tool with vulnerability detection and audit reports.',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
    image: '/assets/blockchain-auditor.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: '5',
    title: 'Cloud Infrastructure Monitor',
    description: 'Real-time cloud infrastructure monitoring with automated scaling and alert systems.',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Go'],
    image: '/assets/cloud-monitor.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: '6',
    title: 'Mobile Security Framework',
    description: 'Comprehensive mobile app security testing and vulnerability assessment framework.',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    image: '/assets/mobile-security.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

export default function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredProjects = filter === 'featured' 
    ? projects.filter(p => p.featured)
    : projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  return (
    <section
      id="projects"
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
            variants={cardVariants}
          >
            Projects
          </motion.h2>

          {/* Filter Buttons */}
          <motion.div
            className="flex justify-center gap-4 mb-12"
            variants={cardVariants}
          >
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'border border-purple-600 text-purple-600'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === 'featured' ? 'bg-purple-600 text-white' : 'border border-purple-600 text-purple-600'
              }`}
            >
              Featured
            </button>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.background}CC`,
                  backdropFilter: 'blur(10px)',
                }}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                  <div className="text-6xl opacity-50">🚀</div>
                </div>
                
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: COLORS.text }}
                  >
                    {project.title}
                  </h3>
                  
                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: COLORS.textSecondary }}
                  >
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${COLORS.accent}20`,
                          color: COLORS.accent,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ color: COLORS.textSecondary }}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white font-semibold">View Details</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80"
            onClick={() => setSelectedProject(null)}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <div className="text-8xl opacity-50">🚀</div>
              </div>
              
              <div className="p-8">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: COLORS.text }}
                >
                  {selectedProject.title}
                </h3>
                
                <p
                  className="text-lg mb-6"
                  style={{ color: COLORS.text }}
                >
                  {selectedProject.description}
                </p>
                
                <div className="mb-6">
                  <h4
                    className="text-lg font-semibold mb-3"
                    style={{ color: COLORS.accent }}
                  >
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: `${COLORS.accent}20`,
                          color: COLORS.accent,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <motion.button
                    className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                    style={{
                      backgroundColor: COLORS.accent,
                      color: COLORS.text,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔗 Live Demo
                  </motion.button>
                  
                  <motion.button
                    className="px-6 py-3 rounded-lg font-semibold border-2 flex items-center gap-2"
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
                    💻 View Code
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}