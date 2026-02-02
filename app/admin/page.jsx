"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, GraduationCap, CheckCircle, XCircle, Search, Lock } from 'lucide-react';
// Ensure your getSpecs.js has these new exports!
import { getCourses, getApplications, getEnrollments } from '@/lib/getSpecs';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('courses');
  const [data, setData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  // 1. Password Protection Logic
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "AGT2026") { // Set your own private password here
      setIsAuthorized(true);
    } else {
      alert("Unauthorized Access Detected.");
    }
  };

  // 2. Multi-Tab Data Fetching
  useEffect(() => {
    if (!isAuthorized) return;

    async function load() {
      let result = [];
      if (activeTab === 'courses') result = await getCourses();
      if (activeTab === 'apps') result = await getApplications();
      if (activeTab === 'enrolls') result = await getEnrollments();
      setData(result);
    }
    load();
  }, [activeTab, isAuthorized]);

  // LOGIN SCREEN
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          <Lock className="text-robot-blue mb-6 mx-auto" size={40} />
          <h1 className="text-2xl font-black text-center uppercase tracking-tighter mb-8">Secure Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Admin Key" 
              className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-robot-blue outline-none text-center font-mono"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-robot-blue text-black font-black py-4 rounded-xl uppercase tracking-widest text-xs">
              Initialize Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // MAIN ADMIN INTERFACE
  return (
    <div className="min-h-screen bg-black text-white flex font-sans">
      {/* SIDEBAR */}
      <div className="w-72 border-r border-white/5 p-8 flex flex-col bg-[#050505]">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-8 h-8 bg-robot-blue rounded-lg shadow-[0_0_15px_rgba(0,210,255,0.4)]" />
          <h2 className="text-lg font-black tracking-tighter uppercase">AGT Control</h2>
        </div>
        
        <nav className="flex flex-col gap-2">
          <TabBtn active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={<LayoutDashboard size={18}/>} label="Course Catalog" />
          <TabBtn active={activeTab === 'apps'} onClick={() => setActiveTab('apps')} icon={<Users size={18}/>} label="Teacher Apps" />
          <TabBtn active={activeTab === 'enrolls'} onClick={() => setActiveTab('enrolls')} icon={<GraduationCap size={18}/>} label="Student Enrolls" />
        </nav>
      </div>

      {/* MAIN VIEW */}
      <div className="flex-1 p-12 bg-black">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
              {activeTab === 'courses' ? 'Courses' : activeTab === 'apps' ? 'Applications' : 'Enrollments'}
            </h1>
            <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Global Operations / Secure Link Active</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
               <Search size={14} className="text-gray-500" />
               <input type="text" placeholder="Search records..." className="bg-transparent outline-none text-xs w-40" />
             </div>
          </div>
        </header>

        {/* DATA TABLE */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02] text-[10px] font-mono uppercase text-gray-500 border-b border-white/5">
              <tr>
                <th className="p-6">Entity Details</th>
                <th className="p-6">Submission Info</th>
                <th className="p-6 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.length > 0 ? data.map((item, i) => (
                <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                  <td className="p-6">
                    {/* Dynamically show name or title based on the tab */}
                    <div className="font-bold text-gray-200">{item.name || item.title || "Record Found"}</div>
                    <div className="text-[10px] text-gray-600 mt-1 font-mono uppercase">{item.role || item.price || "Processing..."}</div>
                  </td>
                  <td className="p-6">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-robot-blue/10 border border-robot-blue/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-robot-blue animate-pulse" />
                      <span className="text-[10px] font-bold text-robot-blue uppercase tracking-tighter">Live / Active</span>
                    </div>
                    {item.timestamp && <div className="text-[9px] text-gray-700 mt-2">{item.timestamp}</div>}
                  </td>
                  <td className="p-6">
                    <div className="flex justify-end gap-3">
                      <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all">
                        <CheckCircle size={14} className="text-green-500" /> Approve
                      </button>
                      <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all">
                        <XCircle size={14} className="text-red-500" /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-gray-600 font-mono text-xs uppercase tracking-widest">
                    No records found in this sector.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-robot-blue text-black shadow-[0_0_20px_rgba(0,210,255,0.2)]' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}>
      {icon} <span className="text-sm font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}