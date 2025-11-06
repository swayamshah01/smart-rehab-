import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SelectCondition = ({ data, onNext, onBack, isFirstStep }) => {
  const [selectedArea, setSelectedArea] = useState(data.affectedArea || null);
  const [selectedCondition, setSelectedCondition] = useState(data.condition || null);

  const bodyAreas = [
    { id: 'neck', label: 'Neck', icon: '🔴' },
    { id: 'shoulder-left', label: 'Left Shoulder', icon: '🔴' },
    { id: 'shoulder-right', label: 'Right Shoulder', icon: '🔴' },
    { id: 'spine', label: 'Spine', icon: '🔴' },
    { id: 'elbow-left', label: 'Left Elbow', icon: '🔴' },
    { id: 'elbow-right', label: 'Right Elbow', icon: '🔴' },
    { id: 'lower-back', label: 'Lower Back', icon: '🔴' },
    { id: 'hip', label: 'Hip', icon: '🔴' },
    { id: 'knee-left', label: 'Left Knee', icon: '🔴' },
    { id: 'knee-right', label: 'Right Knee', icon: '🔴' },
    { id: 'ankle-left', label: 'Left Ankle', icon: '🔴' },
    { id: 'ankle-right', label: 'Right Ankle', icon: '🔴' },
  ];

  const conditions = [
    { id: 'post-surgery', label: 'Post-Surgery Recovery', icon: '🏥', gradient: 'from-[#22d3ee] to-[#06b6d4]' },
    { id: 'sports-injury', label: 'Sports Injury', icon: '⚽', gradient: 'from-[#a855f7] to-[#9333ea]' },
    { id: 'chronic-pain', label: 'Chronic Pain', icon: '💊', gradient: 'from-[#ec4899] to-[#db2777]' },
    { id: 'arthritis', label: 'Arthritis', icon: '🦴', gradient: 'from-[#f59e0b] to-[#d97706]' },
    { id: 'stroke', label: 'Stroke Recovery', icon: '🧠', gradient: 'from-[#8b5cf6] to-[#7c3aed]' },
    { id: 'other', label: 'Other Condition', icon: '📋', gradient: 'from-[#10b981] to-[#059669]' },
  ];

  const handleNext = () => {
    if (selectedArea && selectedCondition) {
      onNext({ affectedArea: selectedArea, condition: selectedCondition });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 backdrop-blur-xl rounded-3xl p-8 border border-blue-200 shadow-xl shadow-blue-200/30 hover:shadow-2xl hover:shadow-blue-300/30 transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Tell us about your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">condition</span>
        </h2>
        <p className="text-slate-600 text-lg">
          Select the affected area and your condition type to personalize your recovery plan
        </p>
      </motion.div>

      {/* Body Area Selection */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">📍</span> Select Affected Area
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {bodyAreas.map((area, index) => (
            <motion.button
              key={area.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedArea(area.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedArea === area.id
                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-400 shadow-lg shadow-blue-200/50'
                  : 'bg-white border-blue-100 hover:border-blue-300'
              }`}
            >
              <div className="text-2xl mb-1">{area.icon}</div>
              <div className="text-slate-800 text-sm font-medium">{area.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Condition Type Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">🏥</span> What's your condition?
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conditions.map((condition, index) => (
            <motion.button
              key={condition.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCondition(condition.id)}
              className={`p-6 rounded-2xl border-2 transition-all group ${
                selectedCondition === condition.id
                  ? `bg-gradient-to-br from-blue-500 to-indigo-600 border-transparent shadow-lg shadow-blue-200/50 text-white`
                  : 'bg-white border-blue-100 hover:border-blue-300 text-slate-600 hover:shadow-lg hover:shadow-blue-100/20'
              }`}
            >
              <div className="text-4xl mb-3">{condition.icon}</div>
              <div className="font-semibold">{condition.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-blue-100">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          disabled={isFirstStep}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            isFirstStep
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white text-slate-800 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm'
          }`}
        >
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: selectedArea && selectedCondition ? 1.05 : 1 }}
          whileTap={{ scale: selectedArea && selectedCondition ? 0.95 : 1 }}
          onClick={handleNext}
          disabled={!selectedArea || !selectedCondition}
          className={`px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
            selectedArea && selectedCondition
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200/50 hover:shadow-blue-300/80'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
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

export default SelectCondition;