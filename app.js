"use client";
import { useEffect, useState } from 'react';
import { getCourses } from './lib/getSpecs'; 
import { Bot, Zap, Users, Mail, Play, Cpu, ShieldCheck } from 'lucide-react';
import Hero from './Hero';
import ChatBot from './compnents/ChatBot'; // Importing your ChatBot component

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* --- 1. NAVIGATION BAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-cyan-900/30 bg-[#020617]/80 backdrop-blur-md px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
          <Bot className="text-cyan-400" />
          <span>ALUMNO <span className="text-cyan-400">GT</span></span>
        </div>
        
        <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-400">
          <a href="#courses" className="hover:text-cyan-400 transition-all">Courses</a>
          <a href="#teachers" className="hover:text-cyan-400 transition-all">Careers</a>
          <a href="#about" className="hover:text-cyan-400 transition-all">About</a>
        </div>

        <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-full text-xs font-black uppercase transition-transform active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          Admin Login
        </button>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <Hero />

      {/* --- 3. DYNAMIC COURSES SECTION --- */}
      <section id="courses" className="py-24 px-6 container mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-2">
            <Cpu size={20} className="text-cyan-500 animate-pulse" />
            <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase">System Database</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center uppercase">
            Available <span className="text-cyan-400">Programs</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="group relative bg-[#0A192F]/40 border border-cyan-900/40 p-8 rounded-3xl hover:border-cyan-400/60 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className="absolute -top-6 -right-4 bg-cyan-400 p-3 rounded-2xl text-black opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl scale-75 group-hover:scale-100 rotate-12">
                  <Bot size={24} className="animate-bounce" />
                </div>

                <div className="mb-6 overflow-hidden rounded-xl border border-cyan-900/50">
                   <img src={course.image_url || "https://placehold.co/600x400/0a192f/cyan?text=AGT+Robotics"} alt={course.title} className="w-full h-40 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-xl font-black mb-3 text-white uppercase tracking-tight">{course.title}</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-3 italic">
                  "{course.description}"
                </p>

                <div className="flex justify-between items-center border-t border-cyan-900/30 pt-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Investment</span>
                    <span className="text-cyan-400 font-mono text-xl font-bold">{course.price}</span>
                  </div>
                  <button className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-xl border border-cyan-500/30 hover:bg-cyan-400 hover:text-black transition-all font-bold text-xs uppercase">
                    <Zap size={14} /> Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- 4. JOIN AS TEACHER SECTION --- */}
      <section id="teachers" className="py-24 bg-gradient-to-b from-transparent to-cyan-950/20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto bg-[#0A192F] border border-cyan-500/20 p-12 rounded-[3rem] shadow-2xl relative">
            <ShieldCheck className="text-cyan-500 mx-auto mb-6" size={48} />
            <h2 className="text-3xl font-black mb-4 uppercase italic">Build the Future with Us</h2>
            <p className="text-slate-400 mb-8">Are you an expert in your field? Join the Alumno Got Talent faculty and mentor the next generation of engineers.</p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors flex items-center gap-3 mx-auto">
              <Users size={18} /> Apply as Teacher
            </button>
          </div>
        </div>
      </section>

      {/* --- 5. ABOUT SECTION --- */}
      <section id="about" className="py-20 bg-[#020617] border-y border-cyan-900/20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full"></div>
            <img 
              src="https://placehold.co/600x400/0a192f/cyan?text=The+Robotic+Interface" 
              className="rounded-3xl border border-cyan-500/30 relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
              alt="About Alumno GT"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">Our <span className="text-cyan-400">Protocol</span></h2>
            <p className="text-slate-400 leading-relaxed">
              Alumno Got Talent is more than a learning platform. We are an automated ecosystem designed to identify human talent and augment it with AI-driven curriculum.
            </p>
            <ul className="space-y-4">
              {["Sentient AI Tutors", "Dynamic Career Pipelines", "Low-Power Architectural Design"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-cyan-100">
                  <div className="h-2 w-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,1)]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer id="contact" className="py-12 border-t border-cyan-900/30">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-black text-lg mb-2">ALUMNO GOT TALENT</h4>
            <p className="text-slate-500 text-sm">© 2026 Artificial Intelligence Learning Lab</p>
          </div>
          <div className="flex gap-6">
            <button className="p-3 bg-cyan-950 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"><Mail size={20}/></button>
            <button className="p-3 bg-cyan-950 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"><Play size={20}/></button>
          </div>
        </div>
      </footer>

      {/* --- 7. FLOATING CHATBOT --- */}
      <ChatBot />

    </div>
  );
}