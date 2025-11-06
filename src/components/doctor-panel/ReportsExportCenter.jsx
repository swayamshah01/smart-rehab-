import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportsExportCenter = ({ patient, userProgress, currentDate }) => {
  const [reportType, setReportType] = useState('weekly');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const reportTypes = [
    { id: 'weekly', label: 'Weekly Summary', icon: '📅', period: 'Last 7 Days' },
    { id: 'monthly', label: 'Monthly Report', icon: '📊', period: 'Last 30 Days' },
    { id: 'stage', label: 'Stage-wise Report', icon: '🎯', period: 'Recovery Phases' },
    { id: 'comprehensive', label: 'Comprehensive Analysis', icon: '📄', period: 'Full History' },
  ];

  const exportFormats = [
    { id: 'pdf', label: 'PDF Document', icon: '📕', description: 'Professional report with charts' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: '📗', description: 'Detailed data tables' },
    { id: 'word', label: 'Word Document', icon: '📘', description: 'Editable text format' },
    { id: 'json', label: 'JSON Data', icon: '📙', description: 'Raw structured data' },
  ];

  // Auto-generated doctor summary
  const doctorSummary = {
    patientName: patient.name,
    username: patient.username,
    reportDate: currentDate.toISOString().split('T')[0],
    reportTime: currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }),
    summary: `Patient ${patient.name} (@${patient.username}) has maintained consistent recovery speed over the past 6 weeks. Pain levels have reduced by 56% (from 8.0/10 to 3.5/10). Mobility score improved from 45% to 72%, representing a 60% gain in range of motion. Adherence rate is exceptional at 92%, with 25 completed exercise sessions. Nutrition compliance averages 85%, and mental wellness score stands at 88%. The patient demonstrates strong commitment and positive adaptation to the rehabilitation program. Current recovery trajectory is 15% ahead of standard timeline. Recommend continuing Phase 3 plan for two additional weeks with gradual intensity increase.`,
    keyMetrics: {
      painReduction: '56%',
      mobilityGain: '60%',
      adherenceRate: '92%',
      nutritionScore: '85%',
      mentalWellness: '88%',
      sessionsCompleted: 25,
      currentStreak: 7,
    },
    recommendations: [
      'Progress to Level 3 exercises starting next week',
      'Add resistance band training (light resistance)',
      'Increase protein intake by 15% for muscle regeneration',
      'Continue mental wellness integration (meditation + journaling)',
      'Schedule follow-up appointment in 2 weeks',
    ],
    nextReview: '2025-11-20',
    doctorName: 'Dr. Sarah Mitchell',
    specialty: 'Orthopedic Specialist',
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const confirmExport = () => {
    console.log(`Exporting ${reportType} report as ${selectedFormat}`);
    // Logic to generate and download report
    setShowExportModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#22d3ee] rounded-3xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">Reports & Export Center</h2>
            <p className="text-white/90 text-lg mb-2">
              Generate, export, and share comprehensive patient progress reports
            </p>
            <p className="text-sm text-white/80">
              HIPAA-compliant secure data sharing • Generated on {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-6xl"
          >
            📁
          </motion.div>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {reportTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setReportType(type.id)}
            className={`p-6 rounded-2xl transition-all ${
              reportType === type.id
                ? 'bg-gradient-to-br from-[#22d3ee] to-[#a855f7] text-white shadow-2xl'
                : 'bg-white hover:shadow-lg border border-gray-200'
            }`}
          >
            <div className="text-5xl mb-3">{type.icon}</div>
            <h3 className={`font-bold text-lg mb-1 ${reportType === type.id ? 'text-white' : 'text-[#0f172a]'}`}>
              {type.label}
            </h3>
            <p className={`text-sm ${reportType === type.id ? 'text-white/80' : 'text-gray-600'}`}>
              {type.period}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Auto-Generated Doctor Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center">
            <span className="text-3xl">📋</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a]">Auto-Generated Doctor Summary</h3>
            <p className="text-gray-600">Professional clinical summary for {patient.name}</p>
          </div>
        </div>

        {/* Report Header */}
        <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-6 border border-[#22d3ee]/20 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Patient Name</p>
              <p className="font-bold text-lg text-[#0f172a]">{doctorSummary.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Username</p>
              <p className="font-bold text-lg text-[#0f172a]">@{doctorSummary.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Report Date</p>
              <p className="font-bold text-lg text-[#0f172a]">{doctorSummary.reportDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Report Time</p>
              <p className="font-bold text-lg text-[#0f172a]">{doctorSummary.reportTime}</p>
            </div>
          </div>
        </div>

        {/* Clinical Summary */}
        <div className="mb-6">
          <h4 className="font-bold text-[#0f172a] mb-3 flex items-center gap-2">
            <span className="text-xl">📝</span>
            Clinical Summary
          </h4>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-gray-800 leading-relaxed">{doctorSummary.summary}</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-6">
          <h4 className="font-bold text-[#0f172a] mb-3 flex items-center gap-2">
            <span className="text-xl">📊</span>
            Key Performance Metrics
          </h4>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(doctorSummary.keyMetrics).map(([key, value], index) => {
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <div key={index} className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-4 border border-[#22d3ee]/20">
                  <p className="text-xs text-gray-600 mb-1">{label}</p>
                  <p className="text-2xl font-bold text-[#22d3ee]">{value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h4 className="font-bold text-[#0f172a] mb-3 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Clinical Recommendations
          </h4>
          <div className="space-y-2">
            {doctorSummary.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#f0fdf4] to-white rounded-lg border border-[#10b981]/20">
                <svg className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-gray-800">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Signature */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Review Scheduled</p>
              <p className="font-bold text-lg text-[#0f172a]">{new Date(doctorSummary.nextReview).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-[#0f172a]">{doctorSummary.doctorName}</p>
              <p className="text-sm text-gray-600">{doctorSummary.specialty}</p>
              <p className="text-xs text-gray-500 mt-1">License #MD-2024-8473</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Export Options */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-6">Export Format</h3>
          
          <div className="space-y-3">
            {exportFormats.map((format, index) => (
              <motion.button
                key={format.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFormat(format.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  selectedFormat === format.id
                    ? 'border-[#22d3ee] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl">{format.icon}</div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#0f172a]">{format.label}</p>
                  <p className="text-sm text-gray-600">{format.description}</p>
                </div>
                {selectedFormat === format.id && (
                  <svg className="w-6 h-6 text-[#22d3ee]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            className="w-full mt-6 py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Generate & Download Report
          </motion.button>
        </motion.div>

        {/* Secure Data Sharing */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-[#0f172a] mb-6">Secure Data Sharing</h3>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl border border-[#10b981]/20">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <h4 className="font-bold text-[#0f172a]">HIPAA Compliant</h4>
              </div>
              <p className="text-sm text-gray-700">End-to-end encryption ensures patient data privacy</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-[#22d3ee]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                <h4 className="font-bold text-[#0f172a]">Share with Team</h4>
              </div>
              <input
                type="email"
                placeholder="Enter email addresses..."
                className="w-full mt-2 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#22d3ee]"
              />
            </div>

            <div className="p-4 bg-gradient-to-br from-[#faf5ff] to-[#f3e8ff] rounded-xl border border-[#a855f7]/20">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-[#a855f7]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <h4 className="font-bold text-[#0f172a]">Insurance Documentation</h4>
              </div>
              <p className="text-sm text-gray-700">Formatted for insurance claim submissions</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share Securely
          </motion.button>
        </motion.div>
      </div>

      {/* Recent Reports Archive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
      >
        <h3 className="text-xl font-bold text-[#0f172a] mb-6">Recent Reports Archive</h3>

        <div className="space-y-3">
          {[
            { name: 'Weekly Report - Nov 6, 2025', size: '2.4 MB', date: '2025-11-06', format: 'PDF' },
            { name: 'Monthly Summary - Oct 2025', size: '5.1 MB', date: '2025-11-01', format: 'PDF' },
            { name: 'Stage 2 Completion Report', size: '3.8 MB', date: '2025-10-25', format: 'Excel' },
            { name: 'Comprehensive Analysis - Q4', size: '8.2 MB', date: '2025-10-15', format: 'PDF' },
          ].map((report, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#0f172a]">{report.name}</p>
                  <p className="text-sm text-gray-600">{report.size} • {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-[#22d3ee]/10 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-[#a855f7]/10 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowExportModal(false)}
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
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Generate Report</h3>
                <p className="text-gray-600">
                  Preparing {reportType} report for {patient.name} in {selectedFormat.toUpperCase()} format
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-6 mb-6 border border-[#22d3ee]/20">
                <h4 className="font-bold text-[#0f172a] mb-3">Report will include:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Comprehensive clinical summary</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Performance analytics and charts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Exercise and nutrition compliance data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Doctor recommendations and next steps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>HIPAA-compliant encryption</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmExport}
                  className="flex-1 py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Report
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowExportModal(false)}
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

export default ReportsExportCenter;