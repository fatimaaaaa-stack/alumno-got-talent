"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, GraduationCap, CheckCircle, XCircle, Search, Lock, TrendingUp, Eye, Zap } from 'lucide-react';
import { getCourses, getApplications, getEnrollments } from '@/lib/getSpecs';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('courses');
  const [data, setData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState({ visitors: 0, conversion: 0, revenue: 0 });

  // 1. Authorization
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "AGT2026") setIsAuthorized(true);
    else alert("Access Denied.");
  };

  // 2. Load Data & Generate Analytics
  useEffect(() => {
    if (!isAuthorized) return;
    async function load() {
      let result = [];
      if (activeTab === 'courses') result = await getCourses();
      if (activeTab === 'apps') result = await getApplications();
      if (activeTab === 'enrolls') result = await getEnrollments();
      
      setData(result);
      // Simulate real-time analytics based on your data length
      setStats({
        visitors: Math.floor(result.length * 12.5) + 42,
        active_apps: result.filter(i => i.status === 'Approved').length,
        total_items: result.length
      });
    }
    load();
  }, [activeTab, isAuthorized]);

  // 3. Operational Action: Live Status Update
  const handleAction = async (id, status) => {
    try {
      // Points to your Google Apps Script for live row updates
      await fetch(`https://script.google.com/macros/s/AKfycbyjl8Kgbkdixu97ZdHv6s5k2PvXLhRbtRwGLEe4EAe_f-gtuAbFlk0gWVVCb2Jp3qWO/exec?id=${id}&status=${status}&tab=${activeTab}`);
      alert(`System: ${status} Successfully.`);
      window.location.reload(); 
    } catch (e) {
      console.error("Link Error", e);
    }
  };

  if (!isAuthorized) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="p-10 bg-[#0A0A0A] border border-white/10 rounded-[3rem] text-center w-full max-w-sm">
        <Lock className="mx-auto text-robot-blue mb-6" size={40} />
        <h2 className="text-xl font-black uppercase mb-8">Secure AGT Link</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin Key" className="w-full bg-black border border-white/10 p-4 rounded-2xl text-center outline-none focus:border-robot-blue transition-all" />
          <button className="w-full bg-robot-blue text-black font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest">Connect</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex font-sans">
      {/* SIDEBAR */}
      <div className="w-72 border-r border-white/5 p-8 flex flex-col bg-[#050505]">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-robot-blue rounded-lg shadow-[0_0_15px_rgba(0,210,255,0.4)]" />
          <h2 className="text-lg font-black tracking-tighter uppercase">AGT Control</h2>
        </div>
        <nav className="space-y-2">
          <TabBtn active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={<LayoutDashboard size={18}/>} label="Courses" />
          <TabBtn active={activeTab === 'apps'} onClick={() => setActiveTab('apps')} icon={<Users size={18}/>} label="Teacher Apps" />
          <TabBtn active={activeTab === 'enrolls'} onClick={() => setActiveTab('enrolls')} icon={<GraduationCap size={18}/>} label="Enrollments" />
        </nav>
      </div>

      {/* MAIN VIEW */}
      <div className="flex-1 p-12 overflow-y-auto">
        {/* ANALYTICS SUITE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Total Reach" value={stats.visitors} icon={<Eye className="text-robot-blue"/>} />
          <StatCard label="Active Items" value={stats.total_items} icon={<TrendingUp className="text-purple-500"/>} />
          <StatCard label="System Load" value="Optimal" icon={<Zap className="text-yellow-500"/>} />
        </div>

        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter">{activeTab} Management</h1>
        </header>

        {/* DATA TABLE */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] font-mono uppercase text-gray-500 border-b border-white/5">
              <tr>
                <th className="p-6">Details</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((item, i) => (
                <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                  <td className="p-6">
                    <div className="font-bold">{item.name || item.title}</div>
                    <div className="text-[10px] text-gray-600 mt-1 font-mono">{item.role || item.price}</div>
                  </td>
                  <td className="p-6">
                    <span className="px-2 py-1 rounded-md bg-robot-blue/10 text-robot-blue text-[10px] font-bold uppercase">Live</span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleAction(item.id, 'Approved')} className="p-2 bg-white/5 hover:bg-green-500/20 rounded-lg transition-all"><CheckCircle size={18}/></button>
                      <button onClick={() => handleAction(item.id, 'Rejected')} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg transition-all"><XCircle size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// UI COMPONENTS
function TabBtn({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${active ? 'bg-robot-blue text-black font-black shadow-[0_0_20px_rgba(0,210,255,0.2)]' : 'text-gray-500 hover:bg-white/5'}`}>
      {icon} <span className="text-sm uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[2rem] flex items-center justify-between">
      <div>
        <p className="text-[10px] font-mono uppercase text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-black">{value}</p>
      </div>
      <div className="p-3 bg-white/5 rounded-2xl">{icon}</div>
    </div>
  );
}