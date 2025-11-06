import React from 'react';
import { motion } from 'framer-motion';

const PatientOverview = ({ patient, userProgress, currentDate }) => {
  const healthMetrics = [
    { label: 'Pain Level', value: patient.painLevel, max: 10, unit: '/10', color: 'from-[#f59e0b] to-[#d97706]', icon: '💊' },
    { label: 'Mobility Score', value: userProgress.mobilityChange, max: 100, unit: '%', color: 'from-[#a855f7] to-[#9333ea]', icon: '🤸' },
    { label: 'Adherence Rate', value: userProgress.consistencyRate, max: 100, unit: '%', color: 'from-[#10b981] to-[#059669]', icon: '✅' },
    { label: 'Mental Wellness', value: userProgress.mentalWellnessScore, max: 100, unit: '%', color: 'from-[#22d3ee] to-[#06b6d4]', icon: '🧠' },
  ];

  const recentActivity = [
    { date: '2025-11-06', activity: 'Completed exercise session', type: 'success' },
    { date: '2025-11-06', activity: 'Pain level reported: 3.5/10', type: 'info' },
    { date: '2025-11-05', activity: 'Logged nutrition data', type: 'success' },
    { date: '2025-11-05', activity: 'Meditation session completed', type: 'success' },
    { date: '2025-11-04', activity: 'AI plan adjustment approved', type: 'warning' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      {/* Patient Bio Card */}
      <div className="bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] rounded-3xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl backdrop-blur-sm">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">{patient.name}</h2>
              <p className="text-white/90 text-lg mb-2">@{patient.username}</p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                  <p className="text-sm font-semibold">{patient.injury}</p>
                </div>
                <div className="px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                  <p className="text-sm font-semibold">{patient.affectedArea}</p>
                </div>
                <div className="px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                  <p className="text-sm font-semibold">Day {patient.daysSinceStart}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90 mb-2">Overall Health Score</p>
            <p className="text-6xl font-bold">{patient.overallScore}%</p>
            <p className="text-sm opacity-90 mt-2">Last Active: {new Date(patient.lastActive).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>

      {/* Real-Time Progress Snapshot */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${metric.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">{metric.icon}</span>
              <div className="text-right">
                <p className="text-sm opacity-90">{metric.label}</p>
                <p className="text-3xl font-bold">{metric.value}{metric.unit}</p>
              </div>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Summary Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">🤖</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#0f172a] mb-4">AI Clinical Summary</h3>
            <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-6 border border-[#22d3ee]/20 mb-4">
              <p className="text-gray-800 leading-relaxed text-lg">
                The patient shows a <strong className="text-[#10b981]">60% improvement in mobility</strong> and <strong className="text-[#10b981]">56% pain reduction</strong> over 6 weeks. 
                Current adherence rate is <strong className="text-[#22d3ee]">92%</strong>, indicating excellent commitment to the recovery program. 
                Mental wellness score of <strong className="text-[#a855f7]">88%</strong> suggests positive emotional adaptation. 
                Recovery trajectory is <strong className="text-[#10b981]">15% ahead of standard timeline</strong>.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl p-4 border border-[#10b981]/20">
                <p className="text-sm text-gray-600 mb-1">Recommendation</p>
                <p className="font-bold text-[#10b981]">Progress to Level 3</p>
              </div>
              <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl p-4 border border-[#f59e0b]/20">
                <p className="text-sm text-gray-600 mb-1">Next Review</p>
                <p className="font-bold text-[#f59e0b]">5 days</p>
              </div>
              <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-4 border border-[#22d3ee]/20">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="font-bold text-[#22d3ee]">On Track</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pain Level Trend (Last 7 Days) */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-6">Pain Level Trend (7 Days)</h3>
          
          <div className="relative h-48 mb-4">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />
              ))}
              
              {/* Pain trend line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
                d="M 0 80 L 16.67 70 L 33.33 60 L 50 50 L 66.67 40 L 83.33 35 L 100 30"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Area fill */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1 }}
                d="M 0 100 L 0 80 L 16.67 70 L 33.33 60 L 50 50 L 66.67 40 L 83.33 35 L 100 30 L 100 100 Z"
                fill="#f59e0b"
              />
            </svg>
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            {['Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5', 'Nov 6'].map((date, i) => (
              <span key={i}>{date}</span>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Log */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-6">Recent Activity Log</h3>
          
          <div className="space-y-3">
            {recentActivity.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.type === 'success' ? 'bg-[#10b981]' :
                  item.type === 'warning' ? 'bg-[#f59e0b]' :
                  'bg-[#22d3ee]'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{item.activity}</p>
                  <p className="text-xs text-gray-600">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
      >
        <h3 className="text-xl font-bold text-[#0f172a] mb-6">Quick Actions</h3>
        
        <div className="grid md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20 hover:border-[#22d3ee] transition-all"
          >
            <div className="text-3xl mb-2">🩹</div>
            <p className="font-semibold text-sm text-gray-800">Modify Plan</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-xl border border-[#a855f7]/20 hover:border-[#a855f7] transition-all"
          >
            <div className="text-3xl mb-2">🧘</div>
            <p className="font-semibold text-sm text-gray-800">Add Mindfulness</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl border border-[#10b981]/20 hover:border-[#10b981] transition-all"
          >
            <div className="text-3xl mb-2">🍎</div>
            <p className="font-semibold text-sm text-gray-800">Update Nutrition</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl border border-[#f59e0b]/20 hover:border-[#f59e0b] transition-all"
          >
            <div className="text-3xl mb-2">📅</div>
            <p className="font-semibold text-sm text-gray-800">Schedule Review</p>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PatientOverview;