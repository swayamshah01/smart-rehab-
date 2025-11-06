import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      icon: '🤖',
      title: 'Advanced AI Personalization',
      description: 'Our machine learning algorithms adapt to your progress, adjusting difficulty and exercises in real-time.',
    },
    {
      icon: '👨‍⚕️',
      title: 'Doctor-Backed Programs',
      description: 'All rehabilitation plans are created and reviewed by certified physiotherapists and medical professionals.',
    },
    {
      icon: '📊',
      title: 'Adaptive Learning System',
      description: 'Auto-adjusting difficulty based on your performance, pain levels, and recovery speed.',
    },
    {
      icon: '🎯',
      title: 'Goal-Oriented Approach',
      description: 'Set personalized milestones and receive guided pathways to achieve your recovery goals.',
    },
    {
      icon: '🔒',
      title: 'Privacy & Security',
      description: 'HIPAA-compliant data encryption ensuring your medical information stays completely secure.',
    },
    {
      icon: '🌍',
      title: 'Accessible Anywhere',
      description: 'Cross-platform support with offline mode - rehab from home, gym, or on-the-go.',
    },
  ];

  return (
    <section id="why-us" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-40 right-40 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-blue-600 font-semibold tracking-wider text-sm"
          >
            WHY CHOOSE US
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
            Built for Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Success
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Cutting-edge technology meets medical expertise for unparalleled recovery results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-100 h-full relative overflow-hidden group cursor-pointer shadow-lg shadow-blue-100/20 hover:shadow-blue-200/30"
              >
                {/* Animated Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50"
                  initial={{ x: '-100%' }}
                  animate={isInView ? { x: '100%' } : { x: '-100%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />

                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-200/50 group-hover:shadow-blue-300/80 transition-all"
                >
                  <span className="text-4xl">{reason.icon}</span>
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4">{reason.title}</h3>
                <p className="text-slate-600 leading-relaxed">{reason.description}</p>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/40 to-transparent rounded-bl-full" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Pain Slider Demo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-blue-100 shadow-lg shadow-blue-100/20"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Intelligent Pain Monitoring
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our adaptive pain slider adjusts your workout intensity in real-time. 
                The AI learns your pain patterns and automatically modifies exercises to keep you in the optimal recovery zone.
              </p>
              <ul className="space-y-3">
                {['Real-time difficulty adjustment', 'Pain pattern recognition', 'Exercise modification suggestions'].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg shadow-blue-100/20"
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-800 font-semibold">Pain Level</span>
                  <motion.span
                    key={5}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-blue-600 font-bold text-2xl"
                  >
                    5/10
                  </motion.span>
                </div>
                <div className="relative h-4 bg-blue-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '50%' }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 mt-6">
                {[1, 2, 3, 4, 5].map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-12 rounded-lg font-bold transition-all ${
                      level <= 5
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200/50'
                        : 'bg-blue-100 text-slate-400'
                    }`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <p className="text-blue-600 text-sm">
                  ✓ Difficulty adjusted - Switching to modified exercises
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;