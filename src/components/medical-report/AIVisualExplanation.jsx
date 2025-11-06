import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AIVisualExplanation = ({ userData }) => {
  const [viewMode, setViewMode] = useState('anatomical'); // anatomical or simplified

  const injuryData = {
    'knee-left': {
      name: 'Left Knee',
      affected: ['Quadriceps', 'Patellar Tendon', 'Medial Collateral Ligament'],
      severity: 'Moderate',
      inflammation: 65,
    },
    'knee-right': {
      name: 'Right Knee',
      affected: ['Quadriceps', 'Patellar Tendon'],
      severity: 'Mild',
      inflammation: 45,
    },
    'lower-back': {
      name: 'Lower Back',
      affected: ['Lumbar Vertebrae L4-L5', 'Erector Spinae', 'Multifidus'],
      severity: 'Moderate to Severe',
      inflammation: 75,
    },
    'shoulder-left': {
      name: 'Left Shoulder',
      affected: ['Rotator Cuff', 'Deltoid', 'Supraspinatus'],
      severity: 'Moderate',
      inflammation: 60,
    },
    'shoulder-right': {
      name: 'Right Shoulder',
      affected: ['Rotator Cuff', 'Biceps Tendon'],
      severity: 'Mild',
      inflammation: 50,
    },
  };

  const injury = injuryData[userData.affectedArea] || injuryData['knee-left'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0f172a]">
          AI Visual Analysis: {injury.name}
        </h2>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('anatomical')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              viewMode === 'anatomical'
                ? 'bg-white text-[#22d3ee] shadow-sm'
                : 'text-gray-600 hover:text-[#22d3ee]'
            }`}
          >
            Anatomical
          </button>
          <button
            onClick={() => setViewMode('simplified')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              viewMode === 'simplified'
                ? 'bg-white text-[#22d3ee] shadow-sm'
                : 'text-gray-600 hover:text-[#22d3ee]'
            }`}
          >
            Simplified
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Visual Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-2xl p-8 border-2 border-[#22d3ee]/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {viewMode === 'anatomical' ? (
            <div className="relative z-10">
              {/* Anatomical View */}
              <div className="flex items-center justify-center h-80">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative"
                >
                  {/* Knee Joint Illustration */}
                  <svg viewBox="0 0 200 300" className="w-full h-full max-w-[200px]">
                    {/* Femur */}
                    <rect x="70" y="20" width="60" height="100" rx="10" fill="#e0f2fe" stroke="#22d3ee" strokeWidth="2"/>
                    
                    {/* Patella (Kneecap) */}
                    <motion.ellipse
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      cx="100"
                      cy="130"
                      rx="25"
                      ry="30"
                      fill="#fef3c7"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    
                    {/* Tibia */}
                    <rect x="70" y="160" width="60" height="120" rx="10" fill="#e0f2fe" stroke="#22d3ee" strokeWidth="2"/>
                    
                    {/* Inflammation zones */}
                    <motion.circle
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      cx="100"
                      cy="130"
                      r="40"
                      fill="#ef4444"
                      opacity="0.3"
                    />
                    
                    {/* Ligaments */}
                    <line x1="85" y1="120" x2="85" y2="160" stroke="#a855f7" strokeWidth="3" strokeDasharray="5,5"/>
                    <line x1="115" y1="120" x2="115" y2="160" stroke="#a855f7" strokeWidth="3" strokeDasharray="5,5"/>
                  </svg>
                  
                  {/* Hover Points */}
                  {injury.affected.map((part, index) => (
                    <motion.div
                      key={part}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="absolute"
                      style={{
                        top: `${30 + index * 25}%`,
                        right: index % 2 === 0 ? '-20%' : 'auto',
                        left: index % 2 === 1 ? '-20%' : 'auto',
                      }}
                    >
                      <div className="relative group">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          className="w-4 h-4 bg-[#ef4444] rounded-full shadow-lg cursor-pointer"
                        />
                        <div className="absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap">
                          <div className="bg-[#0f172a] text-white px-3 py-1 rounded-lg text-sm">
                            {part}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="relative z-10">
              {/* Simplified Animated View */}
              <div className="flex items-center justify-center h-80">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-center"
                >
                  <div className="text-8xl mb-4">🦵</div>
                  <div className="space-y-2">
                    {injury.affected.map((part, index) => (
                      <motion.div
                        key={part}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center gap-2 bg-white/50 rounded-lg px-4 py-2"
                      >
                        <div className="w-2 h-2 bg-[#ef4444] rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700">{part}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Analysis Details */}
        <div className="space-y-4">
          {/* Severity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Injury Severity
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Severity Level:</span>
              <span className="font-bold text-[#f59e0b]">{injury.severity}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(injury.severity.includes('Severe') ? 80 : injury.severity.includes('Moderate') ? 60 : 40)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[#10b981] via-[#f59e0b] to-[#ef4444]"
              />
            </div>
          </motion.div>

          {/* Inflammation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              Inflammation Level
            </h3>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Current Inflammation:</span>
                <span className="font-bold text-[#ef4444]">{injury.inflammation}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${injury.inflammation}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-gradient-to-r from-[#ef4444] to-[#dc2626]"
                />
              </div>
            </div>
          </motion.div>

          {/* Affected Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Affected Areas
            </h3>
            <div className="space-y-3">
              {injury.affected.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-[#f0f9ff] rounded-lg border border-[#22d3ee]/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 font-medium">{area}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#22d3ee]/10 to-[#a855f7]/10 rounded-xl p-6 border border-[#22d3ee]/30"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[#0f172a] mb-2">AI Key Insight</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Your {injury.name.toLowerCase()} shows {injury.severity.toLowerCase()} damage with 
                  elevated inflammation in the {injury.affected[0].toLowerCase()}. 
                  We recommend starting with gentle range-of-motion exercises to reduce inflammation 
                  before progressing to strength training.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIVisualExplanation;