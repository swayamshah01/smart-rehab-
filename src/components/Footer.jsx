import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Demo', 'Updates'],
    Company: ['About Us', 'Careers', 'Blog', 'Press Kit'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'HIPAA Compliance'],
  };

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', url: '#' },
    { name: 'LinkedIn', icon: 'in', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'YouTube', icon: '▶', url: '#' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-blue-100">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-white" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200/50">
                <span className="text-white font-bold text-2xl">R+</span>
              </div>
              <span className="text-slate-800 font-bold text-2xl">IntelliRehab</span>
            </motion.div>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Transform your recovery journey with AI-powered personalized rehabilitation. 
              Heal smarter, recover faster, and achieve your wellness goals.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 border border-blue-100 rounded-lg flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-200/50 transition-all"
                  aria-label={social.name}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-slate-800 font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <motion.li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: '#3B82F6' }}
                      className="text-slate-600 hover:text-blue-500 transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50/30 backdrop-blur-xl rounded-2xl p-8 border border-blue-100 mb-12 shadow-lg shadow-blue-100/20"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Stay Updated
              </h3>
              <p className="text-slate-600">
                Get the latest updates on new features, rehab tips, and wellness insights.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/90 border border-blue-100 rounded-full px-6 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-300 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-blue-200/50 hover:shadow-blue-300/80 transition-all whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-600 text-sm">
              © 2025 IntelliRehab. All rights reserved. Built with ❤️ for better recovery.
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <motion.a
                href="#"
                whileHover={{ color: '#3B82F6' }}
                className="hover:text-blue-500 transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#3B82F6' }}
                className="hover:text-blue-500 transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#3B82F6' }}
                className="hover:text-blue-500 transition-colors"
              >
                Cookie Settings
              </motion.a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5] 
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"
        />
      </div>
    </footer>
  );
};

export default Footer;