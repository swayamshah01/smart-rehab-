import React from 'react';
import { motion } from 'framer-motion';

const PainMoodCheckIn = ({ checkInData, setCheckInData }) => {
  const moods = [
    { id: 'great', emoji: '😊', label: 'Great', color: 'from-[#10b981] to-[#059669]' },
    { id: 'good', emoji: '🙂', label: 'Good', color: 'from-[#22d3ee] to-[#06b6d4]' },
    { id: 'okay', emoji: '😐', label: 'Okay', color: 'from-[#f59e0b] to-[#d97706]' },
    { id: 'bad', emoji: '😣', label: 'Not Good', color: 'from-[#f97316] to-[#ea580c]' },
    { id: 'terrible', emoji: '😰', label: 'Terrible', color: 'from-[#ef4444] to-[#dc2626]' },
  ];

  const getPainEmoji = (level) => {
    if (level <= 2) return '😊';
    if (level <= 4) return '🙂';
    if (level <= 6) return '😐';
    if (level <= 8) return '😣';
    return '😰';
  };

  const getPainColor = (level) => {
    if (level <= 3) return '#10b981';
    if (level <= 5) return '#22d3ee';
    if (level <= 7) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
          Pain & Mood Baseline Check-In
        </h2>
        <p className="text-gray-600">
          This helps us track your progress and adjust your rehab plan accordingly
        </p>
      </div>

      {/* Pain Level Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#0f172a] flex items-center gap-2">
            <span className="text-2xl">💊</span>
            Current Pain Level
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{getPainEmoji(checkInData.painLevel)}</span>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: getPainColor(checkInData.painLevel) }}>
                {checkInData.painLevel}
              </div>
              <div className="text-xs text-gray-500">out of 10</div>
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <input
            type="range"
            min="0"
            max="10"
            value={checkInData.painLevel}
            onChange={(e) => setCheckInData({ ...checkInData, painLevel: parseInt(e.target.value) })}
            className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-4
              [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:border-4
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:shadow-lg"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #22d3ee 20%, #f59e0b 50%, #ef4444 80%, #dc2626 100%)`,
              borderColor: getPainColor(checkInData.painLevel),
            }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-8">
          <span>No Pain</span>
          <span>Mild</span>
          <span>Moderate</span>
          <span>Severe</span>
          <span>Worst</span>
        </div>

        {/* Pain Description */}
        <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-6 border border-[#22d3ee]/30">
          <h4 className="font-semibold text-[#0f172a] mb-3">Pain Level Guide</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-2 bg-[#10b981] rounded-full"></div>
              <span className="text-gray-700"><strong>0-2:</strong> Minimal or no pain</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-2 bg-[#22d3ee] rounded-full"></div>
              <span className="text-gray-700"><strong>3-4:</strong> Mild discomfort</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-2 bg-[#f59e0b] rounded-full"></div>
              <span className="text-gray-700"><strong>5-6:</strong> Moderate pain</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-2 bg-[#f97316] rounded-full"></div>
              <span className="text-gray-700"><strong>7-8:</strong> Severe pain</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-2 bg-[#ef4444] rounded-full"></div>
              <span className="text-gray-700"><strong>9-10:</strong> Worst pain imaginable</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mood Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6"
      >
        <h3 className="text-xl font-semibold text-[#0f172a] mb-6 flex items-center gap-2">
          <span className="text-2xl">😊</span>
          How are you feeling today?
        </h3>

        <div className="grid grid-cols-5 gap-4">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCheckInData({ ...checkInData, mood: mood.id })}
              className={`relative p-6 rounded-2xl border-2 transition-all ${
                checkInData.mood === mood.id
                  ? `bg-gradient-to-br ${mood.color} border-transparent shadow-lg text-white`
                  : 'bg-gray-50 border-gray-200 hover:border-[#22d3ee]/50 text-gray-700'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">{mood.emoji}</div>
                <div className="text-sm font-semibold">{mood.label}</div>
              </div>
              
              {checkInData.mood === mood.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg className="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Additional Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
      >
        <h3 className="text-xl font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
          <span className="text-2xl">📝</span>
          Additional Notes (Optional)
        </h3>
        <textarea
          placeholder="Any specific concerns or symptoms you'd like to mention? (e.g., stiffness in the morning, pain during certain movements)"
          className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#22d3ee] focus:outline-none resize-none text-gray-700 placeholder-gray-400"
        />
      </motion.div>

      {/* Save Confirmation */}
      {checkInData.mood && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 bg-gradient-to-r from-[#10b981]/10 to-[#22d3ee]/10 border border-[#10b981]/30 rounded-xl p-4 flex items-center gap-3"
        >
          <svg className="w-6 h-6 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-[#10b981] font-semibold">Baseline recorded!</p>
            <p className="text-sm text-gray-600">We'll use this to track your progress throughout your recovery journey.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PainMoodCheckIn;