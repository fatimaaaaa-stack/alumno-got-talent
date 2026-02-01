"use client";
import { useEffect, useState } from 'react';
import { Bot, Users, BarChart3, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  // Simple gatekeeper check
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "AGT_2026_SECURE") { // Replace with your own pass
      setAuthorized(true);
    } else {
      alert("Unauthorized Access Detected.");
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-[#0A192F] border border-cyan-500/30 p-8 rounded-3xl w-full max-w-md text-center">
          <Bot className="mx-auto text-cyan-400 mb-4" size={48} />
          <h1 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Admin Protocol</h1>
          <input 
            type="password" 
            placeholder="Enter Access Key" 
            className="w-full bg-black/40 border border-cyan-900 p-3 rounded-xl mb-4 text-cyan-400 outline-none focus:border-cyan-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-cyan-500 text-black font-bold py-3 rounded-xl uppercase text-xs tracking-widest">Execute Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="flex justify-between items-center mb-12">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft size={18} /> Back to Site
        </Link>
        <div className="flex items-center gap-4">
          <BarChart3 className="text-cyan-400" />
          <h1 className="text-xl font-black uppercase">Command Center</h1>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Total Students", value: "1,204", icon: Users },
          { label: "Teacher Apps", value: applications.length, icon: Bot },
          { label: "Avg Sentiment", value: "88%", icon: CheckCircle }
        ].map((stat, i) => (
          <div key={i} className="bg-[#0A192F] border border-cyan-900/40 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <stat.icon className="text-cyan-500" size={20} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Feed</span>
            </div>
            <p className="text-slate-400 text-xs mb-1 uppercase">{stat.label}</p>
            <p className="text-3xl font-black text-white font-mono">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* CRM Table (Teacher Applications) */}
      <div className="bg-[#0A192F] border border-cyan-900/40 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-cyan-900/40">
          <h2 className="font-bold uppercase tracking-tight">Teacher Application Queue</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-black/20 text-slate-500 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Expertise</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-900/20">
            {/* You will map your Sheet Data here */}
            <tr>
              <td className="p-4 font-medium">Dr. Aris Robotnik</td>
              <td className="p-4 text-slate-400">Computer Architecture</td>
              <td className="p-4"><span className="text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md text-[10px] font-bold">PENDING</span></td>
              <td className="p-4 flex gap-2">
                <button className="text-cyan-400 hover:underline">Review</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}