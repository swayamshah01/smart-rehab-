import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PatientListSidebar = ({ patients, selectedPatient, setSelectedPatient, showPatientList, setShowPatientList, currentDate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || patient.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'from-[#ef4444] to-[#dc2626]';
      case 'medium': return 'from-[#f59e0b] to-[#d97706]';
      case 'normal': return 'from-[#10b981] to-[#059669]';
      default: return 'from-[#22d3ee] to-[#06b6d4]';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'normal': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: showPatientList ? 0 : -300 }}
      className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden"
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#0f172a]">Patient List</h3>
          <div className="px-3 py-1 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-full text-xs font-bold">
            {patients.length} Active
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#22d3ee]"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex gap-2">
          {['all', 'high', 'medium', 'normal'].map((priority) => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterPriority === priority
                  ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto">
        {filteredPatients.length > 0 ? (
          <div className="p-3 space-y-2">
            {filteredPatients.map((patient) => (
              <motion.div
                key={patient.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPatient(patient)}
                className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  selectedPatient?.id === patient.id
                    ? 'bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] border-[#22d3ee] shadow-lg'
                    : 'bg-gray-50 border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-white font-bold">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#0f172a]">{patient.name}</p>
                      <p className="text-xs text-gray-600">@{patient.username}</p>
                    </div>
                  </div>
                  <span className="text-lg">{getPriorityIcon(patient.priority)}</span>
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Injury:</span>
                    <span className="font-semibold text-gray-800">{patient.injury}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Pain Level:</span>
                    <span className={`font-bold ${
                      patient.painLevel <= 3 ? 'text-[#10b981]' :
                      patient.painLevel <= 5 ? 'text-[#f59e0b]' :
                      'text-[#ef4444]'
                    }`}>
                      {patient.painLevel}/10
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-bold text-[#22d3ee]">{patient.overallScore}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Day {patient.daysSinceStart}
                  </span>
                  {patient.unreadMessages > 0 && (
                    <div className="px-2 py-0.5 bg-[#ef4444] text-white rounded-full font-bold">
                      {patient.unreadMessages} new
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-6 text-center">
            <div>
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-sm text-gray-600">No patients found</p>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPatientList(!showPatientList)}
        className="absolute -right-10 top-1/2 -translate-y-1/2 w-10 h-20 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-r-xl flex items-center justify-center shadow-lg"
      >
        <svg className={`w-5 h-5 transition-transform ${showPatientList ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default PatientListSidebar;