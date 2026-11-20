import React, { useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Play, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Sparkles, 
  MessageSquare, 
  ShieldAlert, 
  Code
} from 'lucide-react';

export default function HeroSection({ onExploreCourses, onContactClick }) {
  const [activeTab, setActiveTab] = useState('react');
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([
    'IT LIVE Cyber Engine v2.6.0 initialized...',
    'Loading AI & Web Development modules...',
    'Ready: 7 Professional Tracks active'
  ]);

  const codeSnippets = {
    react: `// IT LIVE: Frontend Component
import React, { useState } from "react";
import { CyberButton } from "@itlive/ui";

export function FutureDeveloper() {
  const [skills, setSkills] = useState(["React", "Tailwind", "Next.js"]);
  const [level, setLevel] = useState("Junior");

  const levelUp = () => {
    setSkills(prev => [...prev, "FullStack Architect"]);
    setLevel("Senior Tech Lead 🚀");
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/30">
      <h3 className="text-sky-400 font-bold">Status: {level}</h3>
      <CyberButton onClick={levelUp}>O'z ustingda ishla</CyberButton>
    </div>
  );
}`,
    python: `# IT LIVE: High-Performance Backend
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import ai_pipeline

app = FastAPI(title="IT LIVE Core API")

@app.post("/api/career/boost")
async def accelerate_career(student_id: int):
    skills = await ai_pipeline.train_skills(
        skills=["Python", "FastAPI", "PostgreSQL", "Docker"],
        mentorship=True
    )
    return {
        "status": "Career Accelerated",
        "ready_for_market": True,
        "salary_growth": "+350%"
    }`,
    ai: `# IT LIVE: Neural Network & AI Model
import torch
import torch.nn as nn

class ITLiveNeuralAgent(nn.Module):
    def __init__(self, vocab_size=50000, embed_dim=768):
        super().__init__()
        self.transformer = nn.TransformerEncoder(
            encoder_layer=nn.TransformerEncoderLayer(d_model=embed_dim, nhead=12),
            num_layers=12
        )
        self.classifier = nn.Linear(embed_dim, 1)

    def forward(self, x):
        features = self.transformer(x)
        return torch.sigmoid(self.classifier(features.mean(dim=1)))
`
  };

  const runCode = () => {
    setIsRunning(true);
    setConsoleOutput(prev => [...prev, `[EXEC] Compiling ${activeTab} module in IT LIVE sandbox...`]);
    
    setTimeout(() => {
      setConsoleOutput(prev => [
        ...prev,
        `✓ [200 OK] ${activeTab.toUpperCase()} Build Succeeded in 142ms`,
        `✓ AI Validation: 100% tests passed. Ready for production deployment! 🎉`
      ]);
      setIsRunning(false);
    }, 900);
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Dynamic Background Glows & Mesh Grids */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-sky-600/20 via-indigo-600/20 to-purple-600/20 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-600/15 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Cyber Grid SVG pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Action Buttons */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/30 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                🚀 PROFESSIONAL IT TA'LIM PLATFORMASI
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Kelajagingni <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                IT bilan yarat!
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              IT LIVE — zamonaviy texnologiyalarni o‘rgan, o‘z mahoratingni rivojlantir va kelajak kasbingni bugundan boshlagin!
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Kurslarni ko‘rish</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onContactClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-white/10 hover:border-sky-500/50 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-sky-400" />
                <span>Biz bilan bog‘lanish</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3">
              <div className="p-2 sm:p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <p className="text-lg sm:text-2xl font-black text-sky-400 font-mono">100%</p>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Amaliy Loyihalar</p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <p className="text-lg sm:text-2xl font-black text-indigo-400 font-mono">96%</p>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Ishga joylashish</p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <p className="text-lg sm:text-2xl font-black text-purple-400 font-mono">24/7</p>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Mentor yordami</p>
              </div>
            </div>

          </div>

          {/* Right Column: 3D-styled Cyber IDE & Technology Sandbox */}
          <div className="lg:col-span-6 relative">
            
            {/* Floating tech badges */}
            <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0d1428]/90 border border-sky-500/40 backdrop-blur-xl shadow-xl shadow-sky-500/10 animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
              <span className="text-xs font-mono font-bold text-sky-300">React.js 19</span>
            </div>

            <div className="absolute -bottom-5 -left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0d1428]/90 border border-indigo-500/40 backdrop-blur-xl shadow-xl shadow-indigo-500/10 animate-bounce" style={{ animationDuration: '7s' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400"></div>
              <span className="text-xs font-mono font-bold text-indigo-300">Python & FastAPI</span>
            </div>

            <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0d1428]/90 border border-purple-500/40 backdrop-blur-xl shadow-xl shadow-purple-500/10 animate-bounce" style={{ animationDuration: '5s' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
              <span className="text-xs font-mono font-bold text-purple-300">AI & Deep Learning</span>
            </div>

            {/* IDE Glassmorphic Container */}
            <div className="relative rounded-2xl bg-[#080d1e]/90 border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all hover:border-sky-500/40 group">
              
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0c1329] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-sky-400" /> itlive-workspace
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('react')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                      activeTab === 'react' 
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    App.jsx
                  </button>
                  <button
                    onClick={() => setActiveTab('python')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                      activeTab === 'python' 
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    server.py
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                      activeTab === 'ai' 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ai_agent.py
                  </button>
                </div>

                {/* Run Action */}
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  <Play className={`w-3 h-3 fill-emerald-300 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Yuklanmoqda...' : 'Ishga tushirish'}</span>
                </button>
              </div>

              {/* Code Editor View */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto max-h-[300px] text-slate-300 bg-[#060a17]">
                <pre className="text-left font-mono">
                  <code>{codeSnippets[activeTab]}</code>
                </pre>
              </div>

              {/* Terminal / Live Console Simulation */}
              <div className="p-3.5 bg-[#030611] border-t border-white/10 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-slate-500">
                  <span className="flex items-center gap-1.5 text-sky-400">
                    <Terminal className="w-3.5 h-3.5" /> IT LIVE Terminal Output
                  </span>
                  <span className="text-[10px] text-emerald-400">STATUS: ACTIVE</span>
                </div>
                <div className="space-y-1 text-slate-400 max-h-[85px] overflow-y-auto">
                  {consoleOutput.map((msg, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-sky-500 select-none">&gt;</span>
                      <span className={msg.includes('✓') ? 'text-emerald-400 font-bold' : msg.includes('[EXEC]') ? 'text-yellow-300' : 'text-slate-300'}>
                        {msg}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

