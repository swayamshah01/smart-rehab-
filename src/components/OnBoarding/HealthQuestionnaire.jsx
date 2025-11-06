import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HealthQuestionnaire = ({ data, onNext, onBack }) => {
  const [painLevel, setPainLevel] = useState(data.painLevel || 5);
  const [mobilityLevel, setMobilityLevel] = useState(data.mobilityLevel || 5);
  const [activityLevel, setActivityLevel] = useState(data.activityLevel || 'moderate');
  const [dailyAvailability, setDailyAvailability] = useState(data.dailyAvailability || '30-60');

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', icon: '🪑', desc: 'Mostly sitting, minimal movement' },
    { id: 'light', label: 'Light Activity', icon: '🚶', desc: 'Some walking, light tasks' },
    { id: 'moderate', label: 'Moderate', icon: '🏃', desc: 'Regular movement, active lifestyle' },
    { id: 'active', label: 'Very Active', icon: '💪', desc: 'Frequent exercise, high energy' },
  ];

  const availabilityOptions = [
    { id: '15-30', label: '15-30 min/day', icon: '⏱️' },
    { id: '30-60', label: '30-60 min/day', icon: '⏰' },
    { id: '60-90', label: '60-90 min/day', icon: '🕐' },
    { id: '90+', label: '90+ min/day', icon: '⌚' },
  ];

  const getPainEmoji = (level) => {
    if (level <= 2) return '😊';
    if (level <= 4) return '🙂';
    if (level <= 6) return '😐';
    if (level <= 8) return '😣';
    return '😰';
  };

  const getMobilityEmoji = (level) => {
    if (level <= 2) return '🚫';
    if (level <= 4) return '🐌';
    if (level <= 6) return '🚶';
    if (level <= 8) return '🏃';
    return '🏃‍♂️💨';
  };

  const handleNext = () => {
    onNext({
      painLevel,
      mobilityLevel,
      activityLevel,
      dailyAvailability,
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#1e293b]/50 to-[#581c87]/30 backdrop-blur-xl rounded-3xl p-8 border border-[#a855f7]/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-3">
          Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">Assessment</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Help us understand your current condition and daily routine
        </p>
      </motion.div>

      {/* Pain Level Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold text-lg">Current Pain Level</h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{getPainEmoji(painLevel)}</span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
              {painLevel}/10
            </span>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(parseInt(e.target.value))}
            className="w-full h-3 bg-[#334155] rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-[#22d3ee] [&::-webkit-slider-thumb]:to-[#a855f7]
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#a855f7]/50
              [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r
              [&::-moz-range-thumb]:from-[#22d3ee] [&::-moz-range-thumb]:to-[#a855f7]"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #f59e0b ${painLevel * 5}%, #ef4444 ${painLevel * 10}%, #334155 ${painLevel * 10}%, #334155 100%)`
            }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>No Pain</span>
          <span>Mild</span>
          <span>Moderate</span>
          <span>Severe</span>
          <span>Worst</span>
        </div>
      </motion.div>

      {/* Mobility Level Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold text-lg">Mobility Range</h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{getMobilityEmoji(mobilityLevel)}</span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">
              {mobilityLevel}/10
            </span>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max="10"
            value={mobilityLevel}
            onChange={(e) => setMobilityLevel(parseInt(e.target.value))}
            className="w-full h-3 bg-[#334155] rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-[#a855f7] [&::-webkit-slider-thumb]:to-[#ec4899]
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#ec4899]/50
              [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r
              [&::-moz-range-thumb]:from-[#a855f7] [&::-moz-range-thumb]:to-[#ec4899]"
            style={{
              background: `linear-gradient(to right, #22d3ee ${mobilityLevel * 10}%, #334155 ${mobilityLevel * 10}%, #334155 100%)`
            }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Very Limited</span>
          <span>Limited</span>
          <span>Fair</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
      </motion.div>

      {/* Activity Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h3 className="text-white font-semibold text-lg mb-4">Current Activity Level</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {activityLevels.map((level) => (
            <motion.button
              key={level.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivityLevel(level.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                activityLevel === level.id
                  ? 'bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20 border-[#a855f7] shadow-lg shadow-[#a855f7]/30'
                  : 'bg-[#1e293b]/50 border-[#334155] hover:border-[#a855f7]/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{level.icon}</span>
                <span className="text-white font-semibold">{level.label}</span>
              </div>
              <p className="text-gray-400 text-sm">{level.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Daily Availability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h3 className="text-white font-semibold text-lg mb-4">Daily Availability for Rehab</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {availabilityOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDailyAvailability(option.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                dailyAvailability === option.id
                  ? 'bg-gradient-to-r from-[#22d3ee]/20 to-[#a855f7]/20 border-[#22d3ee] shadow-lg shadow-[#22d3ee]/30'
                  : 'bg-[#1e293b]/50 border-[#334155] hover:border-[#a855f7]/50'
              }`}
            >
              <div className="text-3xl mb-2">{option.icon}</div>
              <div className="text-white text-sm font-medium">{option.label}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-[#a855f7]/20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-3 rounded-full font-semibold bg-[#1e293b] text-white border-2 border-[#a855f7]/50 hover:bg-[#a855f7]/10 transition-all"
        >
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white shadow-lg shadow-[#a855f7]/50 hover:shadow-[#a855f7]/80 transition-all flex items-center gap-2"
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default HealthQuestionnaire;