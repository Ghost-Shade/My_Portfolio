import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiBugcrowd, SiHackerone } from 'react-icons/si';
import { COLORS } from '../../constants';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: 'GitHub', href: 'https://github.com/Ghost-Shade', Icon: FaGithub },
    { label: 'Bugcrowd', href: 'https://bugcrowd.com/Ghost-Shade', Icon: SiBugcrowd },
    { label: 'HackerOne', href: 'https://hackerone.com/ghosts_shade', Icon: SiHackerone },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jamson-anjera', Icon: FaLinkedin },
  ];

  return (
    <footer
      className="relative z-10 border-t"
      style={{ backgroundColor: COLORS.background, borderColor: `${COLORS.accent}30` }}
    >
      <div className="container mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm text-center md:text-left"
            style={{ color: COLORS.textSecondary }}
          >
            © {year} Jamson Anjera. All rights reserved.
          </motion.p>

          <div className="flex items-center gap-5">
            {links.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="transition-colors hover:text-purple-400"
                style={{ color: COLORS.textSecondary }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}