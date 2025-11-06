import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AIGeneratedReports = ({ userData, analyticsData, userName, userLogin, daysSinceStart, weeksCompleted, currentDate }) => {
  const [selectedReport, setSelectedReport] = useState('weekly');
  const [showDoctorFeedback, setShowDoctorFeedback] = useState(false);

  const reportTypes = [
    { id: 'weekly', label: 'Weekly Summary', icon: '📅', gradient: 'from-[#22d3ee] to-[#06b6d4]' },
    { id: 'monthly', label: 'Monthly Report', icon: '📊', gradient: 'from-[#10b981] to-[#059669]' },
    { id: 'comprehensive', label: 'Comprehensive Analysis', icon: '📄', gradient: 'from-[#a855f7] to-[#9333ea]' },
  ];

  const aiObservations = [
    {
      category: 'Recovery Trajectory',
      observation: 'Patient is progressing 15% faster than standard recovery timeline for similar injuries.',
      recommendation: 'Ready to advance to Level 3 exercises. Increase resistance training by 10%.',
      priority: 'high',
    },
    {
      category: 'Pain Management',
      observation: 'Pain levels decreased from 8/10 to 3.5/10, showing 56% improvement over 6 weeks.',
      recommendation: 'Continue current pain management protocol. Consider reducing anti-inflammatory medication gradually.',
      priority: 'medium',
    },
    {
      category: 'Mobility Assessment',
      observation: 'Range of motion improved from 45% to 72% of target. Exceeding expectations for week 6.',
      recommendation: 'Introduce dynamic stretching exercises. Target 85% mobility by week 8.',
      priority: 'high',
    },
    {
      category: 'Adherence Pattern',
      observation: '92% exercise completion rate with consistent daily engagement. Mental wellness integration strong.',
      recommendation: 'Maintain current schedule. Consider adding one advanced exercise per week.',
      priority: 'low',
    },
  ];

  const reportSummary = {
    patientInfo: {
      name: userName || 'Swayam Shah',
      username: userLogin || 'swayamshah01',
      injury: userData?.condition || 'Knee Injury',
      affectedArea: userData?.affectedArea || 'Right Knee',
      recoveryPhase: 'Advanced Recovery',
      daysActive: daysSinceStart,
      weeksCompleted: weeksCompleted,
    },
    metrics: {
      sessionsCompleted: analyticsData.sessionsCompleted,
      adherenceRate: analyticsData.consistencyRate,
      painReduction: analyticsData.painImprovement,
      mobilityGain: analyticsData.mobilityChange,
      strengthIncrease: analyticsData.strengthGain,
      nutritionScore: analyticsData.nutritionScore,
      mentalWellness: analyticsData.mentalWellnessScore,
    },
    timeline: {
      startDate: '2025-10-01',
      currentDate: currentDate.toISOString().split('T')[0],
      expectedCompletion: '2025-11-26',
      actualProgress: 65,
    },
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-[#0f172a] mb-3">
          AI-Generated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#a855f7]">Medical Reports</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Professional-level reports for healthcare providers and personal records
        </p>
        <p className="text-sm text-gray-500 mt-2">
          User: <strong>{userLogin}</strong> • Generated: {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
        </p>
      </motion.div>

      {/* Report Type Selector */}
      <div className="flex gap-4 mb-8">
        {reportTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedReport(type.id)}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              selectedReport === type.id
                ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg`
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <span className="text-2xl">{type.icon}</span>
            {type.label}
          </motion.button>
        ))}
      </div>

      {/* Report Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        {/* Report Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                {selectedReport === 'weekly' ? 'Weekly' : selectedReport === 'monthly' ? 'Monthly' : 'Comprehensive'} Recovery Report
              </h3>
              <p className="text-gray-600">
                Generated on {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })}
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-full font-semibold text-sm">
                ✓ AI Verified
              </div>
              <p className="text-xs text-gray-500 mt-2">Report ID: RPT-{currentDate.getTime()}</p>
            </div>
          </div>

          {/* Patient Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-3">Patient Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Name:</span>
                  <span className="font-semibold text-[#0f172a]">{reportSummary.patientInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Username:</span>
                  <span className="font-semibold text-[#0f172a]">{reportSummary.patientInfo.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Condition:</span>
                  <span className="font-semibold text-[#0f172a]">{reportSummary.patientInfo.injury}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Affected Area:</span>
                  <span className="font-semibold text-[#0f172a]">{reportSummary.patientInfo.affectedArea}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-3">Recovery Timeline</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Start Date:</span>
                  <span className="font-semibold text-[#0f172a]">{new Date(reportSummary.timeline.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Days Active:</span>
                  <span className="font-semibold text-[#0f172a]">{reportSummary.patientInfo.daysActive} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Current Phase:</span>
                  <span className="font-semibold text-[#a855f7]">{reportSummary.patientInfo.recoveryPhase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Expected Completion:</span>
                  <span className="font-semibold text-[#0f172a]">{new Date(reportSummary.timeline.expectedCompletion).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-[#0f172a] mb-4">Performance Analytics</h4>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(reportSummary.metrics).map(([key, value], index) => {
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              const isPercentage = ['adherenceRate', 'painReduction', 'mobilityGain', 'strengthIncrease'].includes(key);
              
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-4 border border-[#22d3ee]/20"
                >
                  <p className="text-xs text-gray-600 mb-1">{label}</p>
                  <p className="text-2xl font-bold text-[#22d3ee]">
                    {value}{isPercentage || key.includes('Score') ? '%' : ''}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Observations */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-[#0f172a] mb-4">AI Clinical Observations & Recommendations</h4>
          <div className="space-y-4">
            {aiObservations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`border-l-4 rounded-r-xl p-4 ${
                  item.priority === 'high'
                    ? 'border-[#10b981] bg-gradient-to-r from-[#f0fdf4] to-white'
                    : item.priority === 'medium'
                    ? 'border-[#22d3ee] bg-gradient-to-r from-[#f0f9ff] to-white'
                    : 'border-[#a855f7] bg-gradient-to-r from-[#faf5ff] to-white'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-bold text-[#0f172a]">{item.category}</h5>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.priority === 'high'
                      ? 'bg-[#10b981] text-white'
                      : item.priority === 'medium'
                      ? 'bg-[#22d3ee] text-white'
                      : 'bg-[#a855f7] text-white'
                  }`}>
                    {item.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Observation:</strong> {item.observation}
                </p>
                <p className="text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                  <strong>Recommendation:</strong> {item.recommendation}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            Download PDF
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Email to Doctor
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-gradient-to-r from-[#22d3ee] to-[#06b6d4] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share Report
          </motion.button>
        </div>
      </motion.div>

      {/* Doctor Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#0f172a] flex items-center gap-2">
            <span className="text-3xl">👨‍⚕️</span>
            Healthcare Provider Feedback
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDoctorFeedback(!showDoctorFeedback)}
            className="px-4 py-2 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold text-sm"
          >
            {showDoctorFeedback ? 'Hide' : 'View'} Feedback
          </motion.button>
        </div>

        {showDoctorFeedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-6 border border-[#22d3ee]/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  Dr
                </div>
                <div>
                  <h4 className="font-bold text-[#0f172a]">Dr. Sarah Mitchell</h4>
                  <p className="text-sm text-gray-600">Orthopedic Specialist • Updated 2 days ago</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Excellent progress, Swayam! Your adherence to the exercise protocol is outstanding. The pain reduction trajectory is better than expected for this stage. I'm pleased with the mobility improvements.
              </p>
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-[#0f172a] mb-2">Plan Adjustments:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#10b981] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Progress to Level 3 exercises starting next week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#10b981] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Add resistance band training (light resistance)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#10b981] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Schedule follow-up appointment in 2 weeks</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl border border-[#f59e0b]/20">
              <p className="text-sm text-gray-800">
                <strong className="text-[#f59e0b]">Note:</strong> Plan adjustments have been automatically synced to your dashboard and will take effect from your next session.
              </p>
            </div>
          </motion.div>
        )}

        {/* Report Metadata */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><strong>Report Generated By:</strong> AI Health Analytics Engine v3.2</p>
              <p><strong>User ID:</strong> {userLogin}</p>
            </div>
            <div className="text-right">
              <p><strong>Timestamp:</strong> {currentDate.toISOString()}</p>
              <p><strong>Next Report:</strong> {new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIGeneratedReports;