import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommunicationFeedback = ({ patient, currentDate, setUnreadMessages }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'patient',
      name: patient.name,
      message: 'Hi Dr. Mitchell, I completed today\'s exercises but felt some stiffness in my knee during the flexion exercises. Is this normal?',
      timestamp: new Date('2025-11-06T09:30:00Z'),
      read: true,
    },
    {
      id: 2,
      sender: 'doctor',
      name: 'Dr. Sarah Mitchell',
      message: 'Hello Swayam! Some stiffness is normal, especially in the early stages. Make sure you\'re warming up properly before exercises. Try applying a warm compress for 10-15 minutes before your session.',
      timestamp: new Date('2025-11-06T10:15:00Z'),
      read: true,
    },
    {
      id: 3,
      sender: 'patient',
      name: patient.name,
      message: 'Thank you! I\'ll try that. Also, should I increase my protein intake? I noticed the AI suggested 78g/day.',
      timestamp: new Date('2025-11-06T10:45:00Z'),
      read: false,
    },
    {
      id: 4,
      sender: 'patient',
      name: patient.name,
      message: 'One more question - when can I start light jogging? I\'m feeling much better now.',
      timestamp: new Date('2025-11-06T11:00:00Z'),
      read: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showVideoConsult, setShowVideoConsult] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const quickResponses = [
    { text: 'Great progress! Keep it up! 👍', icon: '👍' },
    { text: 'Please reduce intensity and rest for 48 hours', icon: '😴' },
    { text: 'Schedule a follow-up appointment', icon: '📅' },
    { text: 'I\'ve updated your exercise plan', icon: '🔄' },
  ];

  const quickActions = [
    { label: 'Modify Plan', icon: '🩹', color: 'from-[#22d3ee] to-[#06b6d4]' },
    { label: 'Add Mindfulness', icon: '🧘', color: 'from-[#a855f7] to-[#9333ea]' },
    { label: 'Update Nutrition', icon: '🍎', color: 'from-[#10b981] to-[#059669]' },
    { label: 'Prescribe Rest', icon: '😴', color: 'from-[#f59e0b] to-[#d97706]' },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'doctor',
        name: 'Dr. Sarah Mitchell',
        message: newMessage,
        timestamp: currentDate,
        read: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setUnreadMessages(0);
    }
  };

  const handleQuickResponse = (text) => {
    setNewMessage(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#10b981] via-[#22d3ee] to-[#a855f7] rounded-3xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">Communication & Feedback</h2>
            <p className="text-white/90 text-lg mb-2">
              Direct interaction with {patient.name}
            </p>
            <p className="text-sm text-white/80">
              Secure messaging • Video consultation • File sharing • Real-time updates
            </p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl"
          >
            💬
          </motion.div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 flex flex-col h-[700px]">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#22d3ee] to-[#a855f7] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0f172a]">{patient.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                      <span className="text-sm text-gray-600">Active now</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowVideoConsult(true)}
                    className="p-3 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-full hover:shadow-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.sender === 'doctor' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl p-4 ${
                      msg.sender === 'doctor'
                        ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">
                      {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Responses */}
            {showQuickActions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 pb-4"
              >
                <div className="grid grid-cols-2 gap-2">
                  {quickResponses.map((response, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickResponse(response.text)}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm text-left transition-all flex items-center gap-2"
                    >
                      <span className="text-xl">{response.icon}</span>
                      <span className="text-gray-700">{response.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className={`p-3 rounded-full transition-all ${
                    showQuickActions
                      ? 'bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </motion.button>

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#22d3ee]"
                />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Notes */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-[#0f172a] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 bg-gradient-to-r ${action.color} text-white rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all`}
                >
                  <span className="text-2xl">{action.icon}</span>
                  {action.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Prescription Upload */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-[#0f172a] mb-4">Upload Prescription/Notes</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#22d3ee] transition-all cursor-pointer">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm font-semibold text-gray-700 mb-1">Click to upload</p>
              <p className="text-xs text-gray-500">PDF, DOC, or Image files</p>
            </div>

            {attachedFile && (
              <div className="mt-4 p-3 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] rounded-xl border border-[#22d3ee]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#22d3ee]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-800">{attachedFile}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}

            <textarea
              placeholder="Add notes or instructions..."
              className="w-full mt-4 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#22d3ee] resize-none"
              rows="4"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-3 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-semibold shadow-lg"
            >
              Upload & Send to Patient
            </motion.button>
          </div>

          {/* Recent Interactions */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-[#0f172a] mb-4">Recent Interactions</h3>
            <div className="space-y-3">
              {[
                { action: 'Plan Modified', date: '2025-11-05', icon: '🔄' },
                { action: 'Prescription Sent', date: '2025-11-03', icon: '💊' },
                { action: 'Video Consultation', date: '2025-11-01', icon: '📹' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{item.action}</p>
                    <p className="text-xs text-gray-600">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Consultation Modal */}
      <AnimatePresence>
        {showVideoConsult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowVideoConsult(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#0f172a]">Video Consultation</h3>
                <button
                  onClick={() => setShowVideoConsult(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl mb-6 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📹</div>
                  <p className="text-xl font-semibold mb-2">Start Video Call</p>
                  <p className="text-sm opacity-75">Connect with {patient.name}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  Start Call
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowVideoConsult(false)}
                  className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-all"
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

export default CommunicationFeedback;