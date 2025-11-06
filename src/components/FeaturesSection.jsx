import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: '🧍‍♂️',
      title: 'Personalized Exercise Plans',
      description: 'Step-by-step animated rehab workouts tailored to your injury and progress level.',
      gradient: 'from-blue-400 to-indigo-500',
      features: ['3D Exercise Animations', 'Voice Guidance', 'Form Correction AI'],
    },
    {
      icon: '🧠',
      title: 'Mental Wellness Support',
      description: 'Meditations, CBT journaling, and daily affirmations for holistic recovery.',
      gradient: 'from-indigo-400 to-blue-500',
      features: ['Guided Meditations', 'Mood Tracking', 'CBT Journaling'],
    },
    {
      icon: '🍎',
      title: 'Nutrition Guidance',
      description: 'Tailored diet plans, water tracking, and supplement recommendations.',
      gradient: 'from-green-400 to-emerald-500',
      features: ['Custom Meal Plans', 'Macro Tracking', 'Hydration Reminders'],
    },
    {
      icon: '🎮',
      title: 'Gamified Experience',
      description: 'Earn XP, unlock achievements, and compete on leaderboards for motivation.',
      gradient: 'from-pink-400 to-rose-500',
      features: ['Achievement System', 'Leaderboards', 'Streak Rewards'],
    },
    {
      icon: '📱',
      title: 'Real-Time Feedback',
      description: 'AI-powered form analysis and instant corrections during exercises.',
      gradient: 'from-orange-400 to-red-500',
      features: ['Motion Tracking', 'Pain Monitoring', 'Performance Analytics'],
    },
    {
      icon: '👨‍⚕️',
      title: 'Doctor Integration',
      description: 'Share progress with healthcare providers and receive professional feedback.',
      gradient: 'from-violet-400 to-purple-500',
      features: ['Progress Reports', 'Video Consultations', 'Treatment Adjustments'],
    },
  ];

  return (
    <section id="features" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
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
            COMPREHENSIVE FEATURES
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Recover
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A complete ecosystem designed to accelerate your rehabilitation journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-100 h-full relative overflow-hidden shadow-lg shadow-blue-100/20 hover:shadow-blue-200/30">
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <span className="text-3xl">{feature.icon}</span>
                </motion.div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{feature.description}</p>

                {/* Feature List */}
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <svg className={`w-4 h-4 text-blue-500`} fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <motion.div
                  className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;