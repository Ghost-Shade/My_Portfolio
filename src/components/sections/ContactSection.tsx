import React from "react";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sendEmail } from '../../utils/email';
import { ContactForm } from '../../types';
import { COLORS, FONTS } from '../../constants';

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await sendEmail(formData);
      setSubmitStatus(success ? 'success' : 'error');
      if (success) {
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      id="contact"
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
            Get In Touch
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              variants={itemVariants}
            >
              <div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: COLORS.text }}
                >
                  Let's Connect
                </h3>
                <p
                  className="text-lg mb-6"
                  style={{ color: COLORS.textSecondary }}
                >
                  I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${COLORS.accent}20` }}
                  >
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <div
                      className="font-semibold"
                      style={{ color: COLORS.text }}
                    >
                      Email
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: COLORS.textSecondary }}
                    >
                      jamsonanjera@gmail.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${COLORS.accent}20` }}
                  >
                    <span className="text-xl">🌐</span>
                  </div>
                  <div>
                    <div
                      className="font-semibold"
                      style={{ color: COLORS.text }}
                    >
                      Web
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: COLORS.textSecondary }}
                    >
                      www.jamsonanjera.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${COLORS.accent}20` }}
                  >
                    <span className="text-xl">💼</span>
                  </div>
                  <div>
                    <div
                      className="font-semibold"
                      style={{ color: COLORS.text }}
                    >
                      LinkedIn
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: COLORS.textSecondary }}
                    >
                      /in/jamsonanjera
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: COLORS.text }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: `${COLORS.background}CC`,
                      borderColor: COLORS.accent,
                      color: COLORS.text,
                    }}
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: COLORS.text }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: `${COLORS.background}CC`,
                      borderColor: COLORS.accent,
                      color: COLORS.text,
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: COLORS.text }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 resize-none"
                    style={{
                      backgroundColor: `${COLORS.background}CC`,
                      borderColor: COLORS.accent,
                      color: COLORS.text,
                    }}
                    placeholder="Your message..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: `${COLORS.accent}20`,
                      color: COLORS.accent,
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: '#ef444420',
                      color: '#ef4444',
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ❌ Failed to send message. Please try again later.
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-semibold transition-all"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.text,
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}