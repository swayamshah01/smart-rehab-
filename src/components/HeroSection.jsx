import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ isLoaded }) => {
  const navigate = useNavigate();

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -100 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text font-semibold text-sm tracking-wider">
              AI-POWERED REHABILITATION
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight"
          >
            Recover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Smarter.</span>
            <br />
            Heal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Stronger.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-lg mb-8 leading-relaxed"
          >
            Your personalized rehab journey starts here. Experience AI-driven recovery plans, 
            real-time feedback, and gamified progress tracking for faster, smarter healing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/onboarding')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-blue-200/50 hover:shadow-blue-300/80 flex items-center gap-2"
            >
              Start Your Journey
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cyan-400/10 transition-all"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-6 mt-12"
          >
            {[
              { number: '50K+', label: 'Active Users' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'AI Support' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - 3D Visual */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 100 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={floatingAnimation}
            className="relative"
          >
            {/* Main Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-blue-100">
              <div className="space-y-6">
                {/* Exercise Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200/50">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-slate-800 font-semibold">Today's Exercise</h4>
                      <p className="text-slate-600 text-sm">Knee Rehab - Level 3</p>
                    </div>
                    <div className="text-blue-600 font-bold text-lg">75%</div>
                  </div>
                </motion.div>

                {/* Progress Rings */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Strength', value: 85, color: 'cyan' },
                    { label: 'Mobility', value: 70, color: 'purple' },
                    { label: 'Balance', value: 60, color: 'pink' },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.1 }}
                      className="text-center"
                    >
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="transform -rotate-90 w-16 h-16">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-slate-200"
                          />
                          <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - item.value / 100) }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={item.color === 'cyan' ? 'text-blue-500' : item.color === 'purple' ? 'text-indigo-500' : 'text-blue-400'}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-slate-800 text-sm font-bold">{item.value}%</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs font-medium">{item.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Achievement Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: 'spring' }}
                  className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 shadow-md flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-200/50">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-semibold">New Achievement!</h4>
                    <p className="text-slate-600 text-sm">7-Day Streak Master</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-300/50 flex items-center justify-center"
            >
              <span className="text-3xl">💪</span>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-lg shadow-indigo-300/50 flex items-center justify-center"
            >
              <span className="text-3xl">🎯</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;