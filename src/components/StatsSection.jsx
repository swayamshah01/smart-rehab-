import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: 50000, suffix: '+', label: 'Active Users', icon: '👥' },
    { value: 95, suffix: '%', label: 'Success Rate', icon: '📈' },
    { value: 1000000, suffix: '+', label: 'Exercises Completed', icon: '💪' },
    { value: 24, suffix: '/7', label: 'AI Support', icon: '🤖' },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Thousands</span>
          </h2>
          <p className="text-slate-600 text-lg">Real results from real people on their recovery journey</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-100 text-center relative overflow-hidden group shadow-lg shadow-blue-100/20 hover:shadow-blue-200/30"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/5 to-blue-500/0"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="text-5xl mb-4"
      >
        {stat.icon}
      </motion.div>

      <motion.div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-2">
        {formatNumber(count)}
        {stat.suffix}
      </motion.div>

      <div className="text-slate-600 font-medium">{stat.label}</div>
    </motion.div>
  );
};

export default StatsSection;