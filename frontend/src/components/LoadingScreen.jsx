import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const doneRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Ambient blobs */}
      <div className="absolute w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] top-1/4 left-1/4 blob-anim" />
      <div className="absolute w-80 h-80 rounded-full bg-indigo-600/10 blur-[100px] bottom-1/4 right-1/4 blob-anim" style={{ animationDelay: '3s' }} />

      {/* Logo emblem */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-2xl glass-card-blue flex items-center justify-center glow-blue">
          <span className="text-4xl font-heading font-black gradient-text">VK</span>
        </div>
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-3 rounded-2xl border border-blue-500/30"
          style={{ borderTopColor: 'rgba(59,130,246,0.8)' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-6 rounded-3xl border border-blue-400/15"
          style={{ borderRightColor: 'rgba(99,102,241,0.6)' }}
        />
      </motion.div>

      {/* Name reveal */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-2"
      >
        Vishnu Kumar Kesharwani
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="font-accent text-blue-400 tracking-[4px] text-sm uppercase text-center"
      >
        Pharma Marketing Professional
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ delay: 1.3, duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="mt-4 text-xs text-white/40 font-accent tracking-widest"
      >
        Loading Portfolio...
      </motion.p>
    </motion.div>
  );
}
