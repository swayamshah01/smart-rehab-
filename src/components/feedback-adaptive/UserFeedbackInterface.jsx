import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UserFeedbackInterface = ({ onSubmit, userData, userProgress, currentDate, userLogin }) => {
  const [painLevel, setPainLevel] = useState(5);
  const [mood, setMood] = useState(7);
  const [difficulty, setDifficulty] = useState('just-right');
  const [fatigue, setFatigue] = useState('moderate');
  const [stiffness, setStiffness] = useState(false);
  const [painNote, setPainNote] = useState('');
  const [preferGuided, setPreferGuided] = useState('yes');
  const [doctorComments, setDoctorComments] = useState('');

  const moodEmojis = [
    { value: 1, emoji: '😢', label: 'Very Bad', color: '#ef4444' },
    { value: 3, emoji: '😟', label: 'Bad', color: '#f59e0b' },
    { value: 5, emoji: '😐', label: 'Okay', color: '#eab308' },
    { value: 7, emoji: '🙂', label: 'Good', color: '#22d3ee' },
    { value: 9, emoji: '😊', label: 'Great', color: '#10b981' },
    { value: 10, emoji: '🤩', label: 'Excellent', color: '#10b981' },
  ];

  const handleSubmit = () => {
    if (painLevel > 0) {
      onSubmit({
        painLevel,
        mood,
        difficulty,
        fatigue,
        stiffness,
        painNote,
        preferGuided,
        doctorComments,
        submittedAt: currentDate.toISOString(),
        submittedBy: userLogin,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#ec4899] rounded-3xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">Share Your Weekly Experience</h2>
            <p className="text-white/90 text-lg mb-2">
              Your feedback helps our AI create the perfect recovery plan for you
            </p>
            <p className="text-sm text-white/80">
              User: <strong>{userLogin}</strong> • Week 6 Feedback • {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl"
          >
            🗣️
          </motion.div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-6">
        {/* Pain Intensity */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💊</span>
              <div>
                <h3 className="text-xl font-bold text-[#0f172a]">Pain Intensity During Exercises</h3>
                <p className="text-sm text-gray-600">Rate your average pain level this week</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-[#f59e0b]">{painLevel}/10</p>
              <p className="text-sm text-gray-600">
                {painLevel <= 3 ? 'Minimal' : painLevel <= 5 ? 'Moderate' : painLevel <= 7 ? 'Significant' : 'Severe'}
              </p>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #f59e0b ${painLevel * 10}%, #e5e7eb ${painLevel * 10}%, #e5e7eb 100%)`,
            }}
          />

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>No Pain</span>
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe</span>
            <span>Worst</span>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Describe your pain or discomfort (optional)
            </label>
            <textarea
              value={painNote}
              onChange={(e) => setPainNote(e.target.value)}
              placeholder="E.g., Sharp pain in the knee during flexion exercises..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#22d3ee] resize-none"
              rows="3"
            />
          </div>
        </div>

        {/* Mood & Motivation */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">😊</span>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a]">Mood & Motivation Check</h3>
              <p className="text-sm text-gray-600">How have you been feeling emotionally?</p>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3">
            {moodEmojis.map((item) => (
              <motion.button
                key={item.value}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMood(item.value)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  mood === item.value
                    ? 'border-[#22d3ee] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <p className="text-xs font-semibold text-gray-700">{item.label}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Workout Experience */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏋️</span>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a]">Workout Experience</h3>
              <p className="text-sm text-gray-600">Help us adjust the difficulty level</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Were the exercises too difficult or too easy?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'too-easy', label: 'Too Easy', icon: '😴', color: 'from-[#22d3ee] to-[#06b6d4]' },
                  { value: 'just-right', label: 'Just Right', icon: '👍', color: 'from-[#10b981] to-[#059669]' },
                  { value: 'too-hard', label: 'Too Hard', icon: '😰', color: 'from-[#f59e0b] to-[#d97706]' },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDifficulty(option.value)}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      difficulty === option.value
                        ? `bg-gradient-to-br ${option.color} text-white shadow-lg`
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Fatigue */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Did you experience fatigue?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'low', label: 'Low Fatigue', icon: '⚡' },
                  { value: 'moderate', label: 'Moderate', icon: '😓' },
                  { value: 'high', label: 'High Fatigue', icon: '😫' },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFatigue(option.value)}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      fatigue === option.value
                        ? 'bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Stiffness */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <input
                  type="checkbox"
                  checked={stiffness}
                  onChange={(e) => setStiffness(e.target.checked)}
                  className="w-5 h-5 text-[#22d3ee] rounded focus:ring-2 focus:ring-[#22d3ee]"
                />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-700">I experienced stiffness or reduced mobility</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a]">Session Preferences</h3>
              <p className="text-sm text-gray-600">How would you like to proceed?</p>
            </div>
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Do you prefer more guided sessions next week?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'yes', label: 'Yes, Guide Me', icon: '🧭' },
              { value: 'no', label: 'I Prefer Flexibility', icon: '🆓' },
            ].map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreferGuided(option.value)}
                className={`p-4 rounded-xl font-semibold transition-all ${
                  preferGuided === option.value
                    ? 'bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Doctor Comments */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">👨‍⚕️</span>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a]">Doctor Comments or Prescriptions</h3>
              <p className="text-sm text-gray-600">Upload new recommendations from your healthcare provider (optional)</p>
            </div>
          </div>

          <textarea
            value={doctorComments}
            onChange={(e) => setDoctorComments(e.target.value)}
            placeholder="Paste any recommendations from your doctor or physiotherapist..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#22d3ee] resize-none"
            rows="4"
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        className="w-full py-4 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#22d3ee]/50 transition-all flex items-center justify-center gap-3"
      >
        <span>Submit Feedback & Analyze</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </motion.button>

      {/* Info */}
      <div className="mt-6 p-4 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl border border-[#f59e0b]/30">
        <p className="text-sm text-gray-800 flex items-start gap-2">
          <svg className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>Privacy Note:</strong> Your feedback is encrypted and only used to optimize your recovery plan. Our AI analyzes patterns while keeping your data secure.
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default UserFeedbackInterface;