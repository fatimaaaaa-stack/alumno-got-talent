"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, GraduationCap, CheckCircle, XCircle, Search } from 'lucide-react';
import { getCourses } from '@/lib/getSpecs';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('courses');
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      // For now, we pull your course data. 
      // Later, you can create a getApplications() function in getSpecs.js
      const courses = await getCourses();
      setData(courses);
    }
    load();
  }, [activeTab]);

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
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{activeTab}</h1>
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
                <th className="p-6">Current Status</th>
                <th className="p-6 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((item, i) => (
                <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-gray-200">{item.title || "Applicant Name"}</div>
                    <div className="text-[10px] text-gray-600 mt-1 font-mono uppercase">{item.id || "ID-99283"}</div>
                  </td>
                  <td className="p-6">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-robot-blue/10 border border-robot-blue/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-robot-blue animate-pulse" />
                      <span className="text-[10px] font-bold text-robot-blue uppercase tracking-tighter">Live / Pending</span>
                    </div>
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
              ))}
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