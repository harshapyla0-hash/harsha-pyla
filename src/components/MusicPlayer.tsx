import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "NEURAL_STATIC.EXE",
    artist: "MACHINE_01",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#00ffff"
  },
  {
    id: 2,
    title: "VOID_PROTOCOL.SO",
    artist: "VOID_RUNNER",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#ff00ff"
  },
  {
    id: 3,
    title: "CRYPTO_BEATS.RAW",
    artist: "BLOCK_DAEMON",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#00ff00"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="w-full max-w-md bg-black/80 border-2 border-cyan-glow p-6 relative overflow-hidden group">
      {/* Glitch Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-t from-magenta-glow to-transparent animate-pulse" />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-widest text-magenta-glow animate-pulse">
            [ SYSTEM_AUDIO_STREAM ]
          </div>
          <Volume2 size={12} className="text-cyan-glow opacity-50" />
        </div>

        <div className="h-32 w-full bg-cyan-glow/5 border border-cyan-glow/20 flex items-center justify-center relative overflow-hidden">
             {/* Simple visualizer bars */}
             <div className="flex gap-1 items-end h-16">
                 {[...Array(12)].map((_, i) => (
                     <motion.div
                         key={i}
                         animate={{
                             height: isPlaying ? [10, 40, 20, 50, 10] : 4,
                         }}
                         transition={{
                             duration: 0.5 + Math.random(),
                             repeat: Infinity,
                             ease: "linear"
                         }}
                         className="w-2 bg-cyan-glow"
                     />
                 ))}
             </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-sm truncate glitch-text" data-text={currentTrack.title}>
            {currentTrack.title}
          </h2>
          <p className="text-[10px] text-magenta-glow opacity-70">
            {currentTrack.artist}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-cyan-glow/20 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-magenta-glow shadow-[0_0_10px_#ff00ff]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-8 mt-2">
          <button onClick={handlePrev} className="hover:text-magenta-glow transition-colors cursor-pointer">
            <SkipBack size={20} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full border-2 border-cyan-glow flex items-center justify-center hover:bg-cyan-glow hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,255,0.4)]"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          <button onClick={handleNext} className="hover:text-magenta-glow transition-colors cursor-pointer">
            <SkipForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
