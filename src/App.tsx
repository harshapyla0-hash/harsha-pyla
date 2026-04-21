import React, { useState, useEffect } from 'react';
import { MusicPlayer } from './components/MusicPlayer';
import { SnakeGame } from './components/SnakeGame';
import { Terminal, Cpu, Database, Wifi } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [timestamp, setTimestamp] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 gap-8">
      {/* Background Effects */}
      <div className="absolute inset-0 noise z-0" />
      <div className="absolute inset-0 scanline z-0" />
      
      {/* Header Decoration */}
      <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center border-b border-cyan-glow/20 bg-black/60 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-magenta-glow" />
          <h1 className="text-xs md:text-sm glitch-text tracking-tighter" data-text="GLITCH_SYNTAX // v0.94-BETA">
            GLITCH_SYNTAX // v0.94-BETA
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[8px] font-mono opacity-50">
          <div className="flex items-center gap-1">
            <Cpu size={10} />
            <span>CORE_LOAD: 24%</span>
          </div>
          <div className="flex items-center gap-1">
            <Database size={10} />
            <span>MEM_AVAIL: 12.8TB</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi size={10} />
            <span>LATENCY: 4MS</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-magenta-glow">
          {timestamp}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16 pb-12">
        
        {/* Left Panel: System Stats / Flavor */}
        <section className="lg:col-span-3 space-y-6 hidden lg:block">
          <div className="border border-cyan-glow/30 p-4 bg-black/40">
            <h3 className="text-[10px] mb-4 text-magenta-glow">LOG_ACCESS_SEQUENCES</h3>
            <div className="space-y-2 font-mono text-[9px] opacity-60">
              <p>{">"} INITIALIZING_KERNEL...</p>
              <p>{">"} MOUNTING_DREAMS.ISO...</p>
              <p className="text-cyan-glow">{">"} CONNECTION_ESTABLISHED</p>
              <p>{">"} BYPASSING_FIREWALLS...</p>
              <p className="text-magenta-glow animate-pulse">{">"} DETECTING_ANOMALIES...</p>
              <p>{">"} LOADING_SYNTH_DRIVERS...</p>
            </div>
          </div>
          
          <div className="border border-cyan-glow/30 p-4 bg-black/40">
            <h3 className="text-[10px] mb-4 text-magenta-glow">ENVIRONMENT_DATA</h3>
            <div className="grid grid-cols-2 gap-2">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-1 bg-cyan-glow/10 relative">
                        <motion.div 
                            animate={{ width: ["10%", "80%", "40%", "90%", "20%"] }}
                            transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-cyan-glow h-full"
                        />
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Center Panel: Snake Game */}
        <section className="lg:col-span-6 flex flex-col items-center">
            <div className="mb-6 text-center">
                <h2 className="text-xl mb-2 glitch-text" data-text="NEURAL_SURVIVAL">NEURAL_SURVIVAL</h2>
                <p className="text-[8px] text-cyan-glow opacity-60 max-w-xs mx-auto">
                    CONSUME_DATA_PACKETS // AVOID_COLLISION_WITH_SELF_AND_ENVIRONMENT
                </p>
            </div>
            <SnakeGame />
        </section>

        {/* Right Panel: Music Player */}
        <section className="lg:col-span-3 space-y-8 flex flex-col items-center lg:items-end w-full">
            <div className="w-full">
                <div className="mb-4 text-center lg:text-right">
                    <h2 className="text-[10px] text-magenta-glow">AUDIO_DECODER</h2>
                </div>
                <MusicPlayer />
            </div>

            <div className="w-full border border-magenta-glow/30 p-4 bg-black/40 hidden lg:block">
                <h3 className="text-[10px] mb-4">SYSTEM_DUMPS</h3>
                <div className="h-32 overflow-hidden flex flex-wrap gap-1 content-start">
                    {[...Array(100)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-1 h-1 ${Math.random() > 0.8 ? 'bg-magenta-glow' : 'bg-cyan-glow opacity-20'}`} 
                        />
                    ))}
                </div>
            </div>
        </section>
      </main>

      {/* Footer Decoration */}
      <footer className="fixed bottom-0 left-0 w-full p-2 flex justify-between items-center text-[7px] font-mono bg-black pointer-events-none opacity-40 z-50">
        <div>UUID: 8b6a-4f51-9c3d-2e7f</div>
        <div className="animate-pulse">PR0T0C0L_V_019 // RUNNING...</div>
        <div>ENCRYPTION: AES-4096-STATIC</div>
      </footer>
    </div>
  );
}

