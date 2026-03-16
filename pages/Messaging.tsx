import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { MessageSquare, Send, Users, User, Search, Clock, MoreVertical, CheckCheck, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Messaging: React.FC = () => {
  const { branding, team, currentUser } = useApp();
  const { showToast } = useToast();
  const [selectedRecipient, setSelectedRecipient] = useState<string>('All');
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState([
    { id: '1', sender: 'Alex Thompson', content: 'Team, let\'s focus on the Q1 healthcare push. Check the new training materials.', timestamp: '10:30 AM', isMe: false },
    { id: '2', sender: 'Me', content: 'Understood Alex. Sarah and I are reviewing the City Hospital proposal today.', timestamp: '10:45 AM', isMe: true },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (messageText.trim() && !isSending) {
      setIsSending(true);
      
      // Simulate network delay
      setTimeout(() => {
        const newMessage = {
          id: Date.now().toString(),
          sender: 'Me',
          content: messageText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: true
        };
        setChatHistory(prev => [...prev, newMessage]);
        setMessageText('');
        setIsSending(false);
        showToast('Message sent!', 'success');
        
        // Simulate a reply
        if (selectedRecipient !== 'All') {
          setTimeout(() => {
            const reply = {
              id: (Date.now() + 1).toString(),
              sender: team.find(t => t.id === selectedRecipient)?.name || 'Team Member',
              content: "Thanks for the update! I'll look into it.",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isMe: false
            };
            setChatHistory(prev => [...prev, reply]);
          }, 2000);
        }
      }, 800);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6 animate-fade-in">
      {/* Sidebar / Contacts */}
      <div className="w-80 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
          />
        </div>
        
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-slate-950/30">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Conversations</h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setSelectedRecipient('All')}
              className={`w-full p-4 flex items-center gap-3 transition-colors border-b border-slate-800/50 ${
                selectedRecipient === 'All' ? 'bg-slate-800/50' : 'hover:bg-slate-800/30'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Users size={20} />
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-100">All Sales Team</span>
                  <span className="text-[10px] text-slate-500">10:30 AM</span>
                </div>
                <p className="text-xs text-slate-400 truncate">Alex: Team, let's focus on the Q1...</p>
              </div>
            </button>

            {team.filter(m => m.id !== currentUser?.id).map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedRecipient(member.id)}
                className={`w-full p-4 flex items-center gap-3 transition-colors border-b border-slate-800/50 ${
                  selectedRecipient === member.id ? 'bg-slate-800/50' : 'hover:bg-slate-800/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${branding.gradientTheme} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-100">{member.name}</span>
                    <span className="text-[10px] text-slate-500">Yesterday</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{member.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedRecipient === 'All' ? (
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Users size={20} />
              </div>
            ) : (
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${branding.gradientTheme} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                {team.find(t => t.id === selectedRecipient)?.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                {selectedRecipient === 'All' ? 'All Sales Team' : team.find(t => t.id === selectedRecipient)?.name}
              </h3>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</p>
            </div>
          </div>
          <button className="p-2 text-slate-500 hover:text-slate-200 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
          <div className="flex justify-center">
            <span className="px-3 py-1 rounded-full bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-800">
              Today
            </span>
          </div>

          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {!msg.isMe && <span className="text-[10px] font-bold text-slate-400">{msg.sender}</span>}
                  <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                </div>
                <div 
                  className={`p-3 rounded-2xl text-sm ${
                    msg.isMe 
                      ? 'rounded-tr-none text-white shadow-lg' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                  }`}
                  style={msg.isMe ? { backgroundColor: branding.primaryColor } : {}}
                >
                  {msg.content}
                </div>
                {msg.isMe && (
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCheck size={12} className="text-blue-500" />
                    <span className="text-[10px] text-slate-500">Read</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-950/30 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isSending}
              placeholder="Type your message..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
              style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
            />
            <button
              onClick={handleSendMessage}
              disabled={isSending || !messageText.trim()}
              className="p-3 rounded-xl text-white shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: branding.primaryColor }}
            >
              {isSending ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
