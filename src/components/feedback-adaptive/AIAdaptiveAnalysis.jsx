import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AIAdaptiveAnalysis = ({ feedbackData, aiAnalysis, userProgress, onComplete, isProcessing, currentDate }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (aiAnalysis && !isProcessing) {
      setTimeout(() => setShowDetails(true), 500);
    }
  }, [aiAnalysis, isProcessing]);

  if (!aiAnalysis) return null;

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'from-[#ef4444] to-[#dc2626]';
      case 'medium': return 'from-[#f59e0b] to-[#d97706]';
      case 'low': return 'from-[#10b981] to-[#059669]';
      default: return 'from-[#22d3ee] to-[#06b6d4]';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-[#ef4444] text-white',
      medium: 'bg-[#f59e0b] text-white',
      low: 'bg-[#10b981] text-white',
    };
    return colors[priority] || colors.medium;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      {/* AI Analysis Header */}
      <div className="bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#f59e0b] rounded-3xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">AI Analysis Complete</h2>
            <p className="text-white/90 text-lg mb-2">
              Advanced algorithms have processed your feedback and performance data
            </p>
            <p className="text-sm text-white/80">
              Analysis completed at {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
            </p>
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl"
          >
            🧠
          </motion.div>
        </div>
      </div>

      {/* Risk Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRiskColor(aiAnalysis.riskLevel)} flex items-center justify-center`}>
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a]">Risk Assessment</h3>
            <p className="text-gray-600">
              Current Status: <span className={`font-bold ${
                aiAnalysis.riskLevel === 'high' ? 'text-[#ef4444]' : 
                aiAnalysis.riskLevel === 'medium' ? 'text-[#f59e0b]' : 
                'text-[#10b981]'
              }`}>
                {aiAnalysis.riskLevel.toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        {aiAnalysis.alerts && aiAnalysis.alerts.length > 0 && (
          <div className="space-y-3">
            {aiAnalysis.alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gradient-to-r from-[#fef3c7] to-[#fde68a] border-l-4 border-[#f59e0b] p-4 rounded-r-xl"
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-800 font-medium">{alert}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {(!aiAnalysis.alerts || aiAnalysis.alerts.length === 0) && (
          <div className="bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7] border-l-4 border-[#10b981] p-4 rounded-r-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-800 font-medium">
                No major concerns detected. Your recovery is progressing safely and effectively.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Performance Trends Analysis</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl p-6 border border-[#f59e0b]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#f59e0b] rounded-full flex items-center justify-center">
                <span className="text-xl">💊</span>
              </div>
              <h4 className="font-bold text-[#0f172a]">Pain Trend</h4>
            </div>
            <p className="text-3xl font-bold text-[#f59e0b] mb-2 capitalize">
              {aiAnalysis.performanceTrends.painTrend}
            </p>
            <p className="text-sm text-gray-700">
              {aiAnalysis.performanceTrends.painTrend === 'improving' 
                ? 'Pain levels are consistently decreasing'
                : 'Pain levels remain stable'
              }
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-xl p-6 border border-[#a855f7]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#a855f7] rounded-full flex items-center justify-center">
                <span className="text-xl">🤸</span>
              </div>
              <h4 className="font-bold text-[#0f172a]">Mobility Trend</h4>
            </div>
            <p className="text-3xl font-bold text-[#a855f7] mb-2 capitalize">
              {aiAnalysis.performanceTrends.mobilityTrend}
            </p>
            <p className="text-sm text-gray-700">
              Range of motion is {aiAnalysis.performanceTrends.mobilityTrend === 'excellent' ? 'significantly' : ''} improving
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-6 border border-[#22d3ee]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#22d3ee] rounded-full flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <h4 className="font-bold text-[#0f172a]">Adherence Trend</h4>
            </div>
            <p className="text-3xl font-bold text-[#22d3ee] mb-2 capitalize">
              {aiAnalysis.performanceTrends.adherenceTrend}
            </p>
            <p className="text-sm text-gray-700">
              Consistency rate: {userProgress.consistencyRate}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🤖</span>
          <h3 className="text-2xl font-bold text-[#0f172a]">AI Recommendations</h3>
        </div>

        <div className="space-y-4">
          {aiAnalysis.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="border-l-4 border-[#22d3ee] bg-gradient-to-r from-[#f0f9ff] to-white rounded-r-xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#0f172a]">{rec.category}</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityBadge(rec.priority)}`}>
                  {rec.priority.toUpperCase()}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Current</p>
                  <p className="font-bold text-gray-800">{rec.current}</p>
                </div>
                <div className="bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 rounded-lg p-3 border border-[#10b981]/20">
                  <p className="text-xs text-gray-600 mb-1">Suggested</p>
                  <p className="font-bold text-[#10b981]">{rec.suggested}</p>
                </div>
              </div>

              <div className="bg-white/50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong className="text-[#22d3ee]">AI Reasoning:</strong> {rec.reason}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="w-full py-4 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#a855f7]/50 transition-all flex items-center justify-center gap-3"
      >
        <span>Generate Adjusted Plan</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default AIAdaptiveAnalysis;