import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanValidationControl = ({ patient, userProgress, currentDate }) => {
  const [selectedPlan, setSelectedPlan] = useState('current');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [doctorOverrides, setDoctorOverrides] = useState({});

  // AI Suggested Plan
  const aiPlan = {
    exercises: [
      { name: 'Knee Flexion', reps: 12, sets: 3, duration: '15 min', aiSuggested: true },
      { name: 'Straight Leg Raise', reps: 10, sets: 3, duration: '12 min', aiSuggested: false },
      { name: 'Side-Lying Leg Raise', reps: 8, sets: 2, duration: '10 min', aiSuggested: true, new: true },
    ],
    nutrition: { protein: 78, calories: 2100, water: 10 },
    wellness: { meditation: 4, journaling: 3, breathing: 5 },
    restDays: 2,
  };

  // Current Plan
  const currentPlan = {
    exercises: [
      { name: 'Knee Flexion', reps: 10, sets: 3, duration: '15 min' },
      { name: 'Straight Leg Raise', reps: 10, sets: 3, duration: '12 min' },
      { name: 'Quad Sets', reps: 15, sets: 2, duration: '10 min' },
    ],
    nutrition: { protein: 68, calories: 2000, water: 10 },
    wellness: { meditation: 2, journaling: 3, breathing: 5 },
    restDays: 1,
  };

  // Audit Log
  const auditLog = [
    {
      timestamp: '2025-11-06T09:30:00Z',
      action: 'AI Plan Generated',
      user: 'AI Engine',
      changes: 'Increased knee flexion reps from 10 to 12',
      status: 'pending',
    },
    {
      timestamp: '2025-11-05T14:20:00Z',
      action: 'Doctor Override',
      user: 'Dr. Sarah Mitchell',
      changes: 'Reduced exercise intensity by 10%',
      status: 'approved',
    },
    {
      timestamp: '2025-11-04T11:15:00Z',
      action: 'AI Plan Approved',
      user: 'Dr. Sarah Mitchell',
      changes: 'Added meditation sessions',
      status: 'approved',
    },
    {
      timestamp: '2025-11-03T16:45:00Z',
      action: 'Plan Modification',
      user: 'Dr. Sarah Mitchell',
      changes: 'Updated nutrition targets',
      status: 'approved',
    },
  ];

  const handleOverride = (category, field, value) => {
    setDoctorOverrides({
      ...doctorOverrides,
      [`${category}-${field}`]: value,
    });
  };

  const handleApprove = () => {
    setShowApprovalModal(true);
  };

  const confirmApproval = () => {
    // Logic to sync changes to dashboard
    console.log('Plan approved and synced to dashboard');
    setShowApprovalModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#f59e0b] via-[#ec4899] to-[#a855f7] rounded-3xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">Plan Validation & Override Control</h2>
            <p className="text-white/90 text-lg mb-2">
              Review and approve AI-generated recommendations for {patient.name}
            </p>
            <p className="text-sm text-white/80">
              Medical supervision ensuring safety and effectiveness • {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-6xl"
          >
            ⚙️
          </motion.div>
        </div>
      </div>

      {/* Plan Comparison View */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8">
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">AI vs Doctor Comparison</h3>

        {/* Exercise Comparison */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="text-2xl">🏋️</span>
            Exercise Routine
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Exercise</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Current Plan</th>
                  <th className="text-center py-3 px-4 font-semibold text-[#22d3ee]">AI Suggestion</th>
                  <th className="text-center py-3 px-4 font-semibold text-[#a855f7]">Doctor Edit</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {aiPlan.exercises.map((exercise, index) => {
                  const currentEx = currentPlan.exercises.find(e => e.name === exercise.name);
                  const isModified = currentEx && (currentEx.reps !== exercise.reps || currentEx.sets !== exercise.sets);
                  
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{exercise.name}</span>
                          {exercise.new && (
                            <span className="px-2 py-0.5 bg-[#10b981] text-white text-xs font-bold rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {currentEx ? (
                          <span className="text-gray-600">{currentEx.reps} × {currentEx.sets}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`font-bold ${isModified ? 'text-[#22d3ee]' : 'text-gray-600'}`}>
                          {exercise.reps} × {exercise.sets}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <input
                            type="number"
                            defaultValue={exercise.reps}
                            onChange={(e) => handleOverride('exercise', `${exercise.name}-reps`, e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-200 rounded text-center focus:outline-none focus:border-[#a855f7]"
                          />
                          <span>×</span>
                          <input
                            type="number"
                            defaultValue={exercise.sets}
                            onChange={(e) => handleOverride('exercise', `${exercise.name}-sets`, e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-200 rounded text-center focus:outline-none focus:border-[#a855f7]"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isModified ? (
                          <span className="px-3 py-1 bg-[#fef3c7] text-[#f59e0b] rounded-full text-xs font-bold">
                            Modified
                          </span>
                        ) : exercise.new ? (
                          <span className="px-3 py-1 bg-[#dcfce7] text-[#10b981] rounded-full text-xs font-bold">
                            New
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                            Same
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nutrition Comparison */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="text-2xl">🍎</span>
            Nutrition Targets
          </h4>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.keys(aiPlan.nutrition).map((key) => {
              const label = key.charAt(0).toUpperCase() + key.slice(1);
              const currentValue = currentPlan.nutrition[key];
              const aiValue = aiPlan.nutrition[key];
              const isModified = currentValue !== aiValue;

              return (
                <div key={key} className={`p-6 rounded-2xl border-2 ${
                  isModified ? 'border-[#22d3ee] bg-gradient-to-br from-[#f0f9ff] to-white' : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className="text-sm text-gray-600 mb-2">{label}</p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-gray-400 line-through">{currentValue}</span>
                    <svg className="w-4 h-4 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-3xl font-bold text-[#22d3ee]">{aiValue}</span>
                  </div>
                  <input
                    type="number"
                    defaultValue={aiValue}
                    onChange={(e) => handleOverride('nutrition', key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#a855f7]"
                    placeholder="Doctor override..."
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Wellness Comparison */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-[#0f172a] mb-4 flex items-center gap-2">
            <span className="text-2xl">🧘</span>
            Mental Wellness Schedule
          </h4>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.keys(aiPlan.wellness).map((key) => {
              const label = key.charAt(0).toUpperCase() + key.slice(1);
              const currentValue = currentPlan.wellness[key];
              const aiValue = aiPlan.wellness[key];
              const isModified = currentValue !== aiValue;

              return (
                <div key={key} className={`p-6 rounded-2xl border-2 ${
                  isModified ? 'border-[#a855f7] bg-gradient-to-br from-[#faf5ff] to-white' : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className="text-sm text-gray-600 mb-2">{label}</p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-gray-400 line-through">{currentValue}</span>
                    <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-3xl font-bold text-[#a855f7]">{aiValue}</span>
                  </div>
                  <input
                    type="number"
                    defaultValue={aiValue}
                    onChange={(e) => handleOverride('wellness', key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#a855f7]"
                    placeholder="Doctor override..."
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApprove}
            className="flex-1 py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-[#10b981]/50 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Approve AI Plan
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApprove}
            className="flex-1 py-4 bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-[#a855f7]/50 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Approve with Overrides
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold text-lg transition-all"
          >
            Reject
          </motion.button>
        </div>
      </div>

      {/* Audit Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Audit Log & History</h3>
        <p className="text-gray-600 mb-6">Complete record of all plan adjustments and approvals</p>

        <div className="space-y-4">
          {auditLog.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="border-l-4 border-[#22d3ee] bg-gradient-to-r from-[#f0f9ff] to-white rounded-r-xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-[#0f172a] mb-1">{log.action}</h4>
                  <p className="text-sm text-gray-600">
                    by {log.user} • {new Date(log.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date(log.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  log.status === 'approved'
                    ? 'bg-[#10b981]/20 text-[#10b981]'
                    : log.status === 'pending'
                    ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                    : 'bg-[#ef4444]/20 text-[#ef4444]'
                }`}>
                  {log.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                <strong>Changes:</strong> {log.changes}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-xl border border-[#f59e0b]/30">
          <p className="text-sm text-gray-800">
            <strong className="text-[#f59e0b]">📋 Accountability:</strong> Every adjustment is timestamped and recorded for medical accountability and progress tracking. All changes sync in real-time to the patient dashboard.
          </p>
        </div>
      </motion.div>

      {/* Approval Modal */}
      <AnimatePresence>
        {showApprovalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowApprovalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Confirm Plan Approval</h3>
                <p className="text-gray-600">
                  This will sync the updated plan to {patient.name}'s dashboard immediately
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-6 mb-6 border border-[#22d3ee]/20">
                <h4 className="font-bold text-[#0f172a] mb-3">Plan Summary:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>3 exercises adjusted (1 new exercise added)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Nutrition targets updated (+10g protein)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Mental wellness sessions increased</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Additional rest day added</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmApproval}
                  className="flex-1 py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-bold shadow-lg"
                >
                  Confirm & Sync to Dashboard
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowApprovalModal(false)}
                  className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-all"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlanValidationControl;