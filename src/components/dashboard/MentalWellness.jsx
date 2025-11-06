import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MentalWellness = ({ userData, userProgress, updateProgress }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);

  const activities = [
    {
      id: 1,
      title: 'Guided Meditation',
      duration: '10 min',
      icon: '🧘',
      gradient: 'from-[#a855f7] to-[#9333ea]',
      type: 'meditation',
      description: 'Deep breathing and body scan meditation to reduce stress and promote healing',
      benefits: ['Reduces inflammation', 'Improves sleep quality', 'Decreases anxiety'],
    },
    {
      id: 2,
      title: 'CBT Journaling',
      duration: '15 min',
      icon: '📝',
      gradient: 'from-[#22d3ee] to-[#06b6d4]',
      type: 'journal',
      description: 'Cognitive Behavioral Therapy exercises to manage pain-related thoughts',
      benefits: ['Improves pain management', 'Builds resilience', 'Tracks emotional patterns'],
    },
    {
      id: 3,
      title: 'Breathing Exercises',
      duration: '5 min',
      icon: '🌬️',
      gradient: 'from-[#10b981] to-[#059669]',
      type: 'breathing',
      description: 'Box breathing and diaphragmatic breathing for relaxation',
      benefits: ['Lowers heart rate', 'Reduces pain perception', 'Calms nervous system'],
    },
    {
      id: 4,
      title: 'Positive Affirmations',
      duration: '5 min',
      icon: '💭',
      gradient: 'from-[#f59e0b] to-[#d97706]',
      type: 'affirmation',
      description: 'Daily positive statements to boost mental strength',
      benefits: ['Increases motivation', 'Improves outlook', 'Builds confidence'],
    },
  ];

  const moods = [
    { id: 'great', emoji: '😊', label: 'Great' },
    { id: 'good', emoji: '🙂', label: 'Good' },
    { id: 'okay', emoji: '😐', label: 'Okay' },
    { id: 'stressed', emoji: '😰', label: 'Stressed' },
    { id: 'anxious', emoji: '😟', label: 'Anxious' },
  ];

  const affirmations = [
    "My body is healing stronger every day",
    "I trust in my recovery journey",
    "Each movement brings me closer to full health",
    "I am patient and kind with my healing process",
    "My mind and body work together for recovery",
  ];

  const startActivity = (activity) => {
    setSelectedActivity(activity);
    setIsActive(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0f172a] mb-3">
          Mental <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Wellness</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Support your physical recovery with mental and emotional well-being practices
        </p>
      </div>

      {/* Mood Check-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8"
      >
        <h3 className="text-xl font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
          <span className="text-2xl">💓</span>
          How are you feeling today?
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedMood === mood.id
                  ? 'border-[#a855f7] bg-[#a855f7]/10 shadow-lg'
                  : 'border-gray-200 hover:border-[#a855f7]/50'
              }`}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <p className="text-sm font-medium text-gray-700">{mood.label}</p>
            </motion.button>
          ))}
        </div>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-[#f0f9ff] rounded-xl border border-[#22d3ee]/30"
          >
            <p className="text-sm text-gray-700">
              ✓ Mood recorded! We'll use this to personalize your wellness recommendations.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Activities Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-br ${activity.gradient} rounded-2xl p-6 text-white shadow-lg cursor-pointer`}
            onClick={() => startActivity(activity)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">{activity.icon}</div>
              <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                {activity.duration}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
            <p className="text-white/90 mb-4">{activity.description}</p>
            <div className="space-y-2">
              {activity.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Daily Affirmation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-2xl p-8 shadow-lg border-2 border-[#f59e0b]/30 text-center mb-8"
      >
        <h3 className="text-xl font-semibold text-[#0f172a] mb-4">Today's Affirmation</h3>
        <motion.p
          key={affirmations[new Date().getDate() % affirmations.length]}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-gray-800 italic mb-4"
        >
          "{affirmations[new Date().getDate() % affirmations.length]}"
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white/50 hover:bg-white/70 rounded-full font-semibold text-gray-800 transition-all"
        >
          Share Affirmation
        </motion.button>
      </motion.div>

      {/* Mood & Pain Correlation Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-xl font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
          <span className="text-2xl">📈</span>
          Wellness Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-4 border border-[#22d3ee]/20">
            <h4 className="font-semibold text-[#0f172a] mb-2">Mood Trend</h4>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-[#22d3ee] to-[#10b981]"></div>
              </div>
              <span className="text-sm font-bold text-[#10b981]">Improving</span>
            </div>
            <p className="text-sm text-gray-700">
              Your mood has been steadily improving over the past week. Keep up the great work!
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl p-4 border border-[#10b981]/20">
            <h4 className="font-semibold text-[#0f172a] mb-2">Pain-Mood Connection</h4>
            <p className="text-sm text-gray-700 mb-3">
              AI analysis shows that your meditation sessions correlate with 30% reduction in reported pain levels.
            </p>
            <span className="inline-block px-3 py-1 bg-[#10b981]/20 text-[#10b981] rounded-full text-xs font-semibold">
              Strong Positive Impact
            </span>
          </div>
        </div>
      </motion.div>

      {/* Activity Modal */}
      {isActive && selectedActivity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setIsActive(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{selectedActivity.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-[#0f172a]">{selectedActivity.title}</h2>
                  <p className="text-gray-600">{selectedActivity.duration}</p>
                </div>
              </div>
              <button
                onClick={() => setIsActive(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedActivity.type === 'journal' ? (
              <div>
                <h3 className="font-semibold text-[#0f172a] mb-4">Today's Journal Entry</h3>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Write about your thoughts, feelings, and progress today..."
                  className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-[#22d3ee] focus:outline-none resize-none"
                />
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold"
                  >
                    Save Entry
                  </motion.button>
                </div>
              </div>
            ) : selectedActivity.type === 'breathing' ? (
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    times: [0, 0.5, 1],
                  }}
                  className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-[#22d3ee] to-[#10b981] rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-2xl font-bold">Breathe</span>
                </motion.div>
                <p className="text-lg text-gray-700 mb-2">Follow the circle</p>
                <p className="text-gray-600">Inhale as it expands, exhale as it contracts</p>
              </div>
            ) : (
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="text-9xl mb-6"
                >
                  {selectedActivity.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-[#0f172a] mb-4">
                  Meditation in Progress
                </h3>
                <p className="text-gray-600">
                  Find a comfortable position and focus on your breath...
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MentalWellness;