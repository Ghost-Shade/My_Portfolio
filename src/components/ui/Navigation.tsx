import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { COLORS, SECTIONS } from '../../constants';

type NavItem = { id: string; label: string; type: 'section' | 'route' };

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollToSection } = useScrollToSection();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: SECTIONS.hero, label: 'Home', type: 'section' },
    { id: SECTIONS.about, label: 'About', type: 'section' },
    { id: SECTIONS.projects, label: 'Projects', type: 'section' },
    { id: 'blogs', label: 'Blogs', type: 'route' },
    { id: SECTIONS.contact, label: 'Contact', type: 'section' },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.type === 'route') {
      navigate('/blogs');
    } else if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: item.id } });
    } else {
      scrollToSection(item.id);
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg"
      style={{ backgroundColor: `${COLORS.background}CC` }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-xl font-bold"
            style={{ color: COLORS.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            JA
          </motion.div>

          {/* Desktop */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="hover:text-purple-400 transition-colors"
                style={{ color: COLORS.text }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile button */}
          <motion.button
            className="md:hidden"
            style={{ color: COLORS.text }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.span
                className="w-full h-0.5 bg-current"
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
              />
              <motion.span
                className="w-full h-0.5 bg-current"
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
              />
              <motion.span
                className="w-full h-0.5 bg-current"
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left py-2 hover:text-purple-400 transition-colors"
                style={{ color: COLORS.text }}
                whileHover={{ x: 10 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}