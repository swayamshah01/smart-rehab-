import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      icon: '📄',
      title: 'Upload Medical Report',
      description: 'Securely upload your medical reports and injury details. Our AI analyzes your condition instantly.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      number: '02',
      icon: '🤖',
      title: 'Get AI-Based Recovery Plan',
      description: 'Receive a personalized rehab plan tailored to your injury, fitness level, and recovery goals.',
      color: 'from-indigo-500 to-blue-600',
    },
    {
      number: '03',
      icon: '📊',
      title: 'Track Progress & Heal',
      description: 'Follow guided exercises, track your progress, and achieve milestones with real-time feedback.',
      color: 'from-blue-500 to-indigo-500',
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
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
            SIMPLE & EFFECTIVE
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Works</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Three simple steps to transform your recovery journey with AI-powered personalization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 origin-left"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-100 h-full relative overflow-hidden group shadow-lg shadow-blue-100/20 hover:shadow-blue-200/30"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100/80 group-hover:to-indigo-100/80 transition-all duration-500" />

                {/* Step Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: 'spring' }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 shadow-lg relative z-10`}
                >
                  <span className="text-3xl">{step.icon}</span>
                </motion.div>

                <div className="absolute top-8 right-8 text-6xl font-bold text-slate-200/50">
                  {step.number}
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4 relative z-10">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Animated Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-blue-500"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg shadow-blue-200/50 hover:shadow-blue-300/80 inline-flex items-center gap-3"
          >
            <span>See It In Action</span>
            <motion.svg
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;