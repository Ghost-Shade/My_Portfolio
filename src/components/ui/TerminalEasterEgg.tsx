import React from "react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants';

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLine, setCurrentLine] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

  const terminalLines = [
    '> Initializing portfolio system...',
    '> Loading creative modules... ✓',
    '> Activating security protocols... ✓',
    '> Deploying AI algorithms... ✓',
    '> Portfolio ready for interaction.',
    '> Welcome to Jamson Anjera\'s digital space.',
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 't') {
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && lineIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setHistory(prev => [...prev, terminalLines[lineIndex]]);
        setLineIndex(prev => prev + 1);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isOpen, lineIndex]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentLine.trim()) {
      const response = processCommand(currentLine.trim());
      setHistory(prev => [...prev, `> ${currentLine}`, response]);
      setCurrentLine('');
    }
  };

  const processCommand = (command: string): string => {
    const cmd = command.toLowerCase();
    
    switch (cmd) {
      case 'help':
        return 'Available commands: help, about, skills, projects, contact, clear, exit';
      case 'about':
        return 'Jamson Anjera - Creative Technologist | Security Enthusiast | Software Developer';
      case 'skills':
        return 'React, TypeScript, Three.js, Node.js, Python, Cybersecurity, AI/ML';
      case 'projects':
        return 'Security Software, 3D Portfolio, AI Analytics, Blockchain Auditor, Cloud Monitor';
      case 'contact':
        return 'Email: hello@jamsonanjera.com | Web: www.jamsonanjera.com';
      case 'clear':
        setHistory([]);
        return '';
      case 'exit':
        setIsOpen(false);
        return '';
      default:
        return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="w-full max-w-4xl h-96 bg-black rounded-lg border border-green-500/30 font-mono text-sm overflow-hidden"
            style={{ backgroundColor: '#0a0a0a' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-green-500/30">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-green-400 text-xs">terminal@jamsonanjera</div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-green-400 hover:text-green-300"
              >
                ✕
              </button>
            </div>

            {/* Terminal Content */}
            <div className="p-4 h-full overflow-y-auto">
              <div className="text-green-400 space-y-1">
                {history.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {line}
                  </motion.div>
                ))}
                
                {/* Current Input Line */}
                <div className="flex items-center">
                  <span className="text-green-400">{'> '}</span>
                  <input
                    type="text"
                    value={currentLine}
                    onChange={(e) => setCurrentLine(e.target.value)}
                    onKeyDown={handleCommand}
                    className="flex-1 bg-transparent outline-none text-green-400 ml-1"
                    placeholder="Type 'help' for commands..."
                    autoFocus
                  />
                  <motion.div
                    className="w-2 h-4 bg-green-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-2 left-4 text-xs text-green-400/60">
              Press Ctrl+T to toggle • Type 'exit' to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}