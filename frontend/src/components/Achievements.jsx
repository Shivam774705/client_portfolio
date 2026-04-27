import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBolt, FaAward, FaCrown, FaIndustry } from 'react-icons/fa6';

function AnimatedCounter({ end, decimals = 0, duration = 2.5, suffix = '', delay = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animId;
    let timeoutId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(end * ease);
      
      if (progress < 1) {
        animId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    timeoutId = setTimeout(() => {
      animId = window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [end, duration, delay]);

  return <>{count.toFixed(decimals)}{suffix}</>;
}

const achievements = [
  {
    icon: FaBolt,
    value: 1.5,
    suffix: ' Yrs',
    label: 'Clinical Experience',
    desc: 'Professional pharmacy practice at Ayodhya Shree Hospital and endocrine clinics.',
    color: 'from-blue-600 to-blue-400',
    bgColor: 'rgba(59,130,246,0.1)',
    borderColor: 'rgba(59,130,246,0.3)',
  },
  {
    icon: FaCrown,
    value: 2024,
    suffix: '',
    label: 'Best Performer 2024',
    desc: 'Awarded "Best Performer of the Year" for outstanding clinical and professional contributions.',
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'rgba(96,165,250,0.1)',
    borderColor: 'rgba(96,165,250,0.3)',
    isText: true,
    textValue: 'TOP',
  },
  {
    icon: FaAward,
    value: 1,
    suffix: '',
    prefix: '',
    label: 'SAGE Ideation 2024',
    desc: 'Received the SAGE Ideation Award (2024) for academic excellence and innovation.',
    color: 'from-amber-500 to-yellow-400',
    bgColor: 'rgba(245,158,11,0.1)',
    borderColor: 'rgba(245,158,11,0.3)',
    isText: true,
    textValue: 'SAGE',
  },
  {
    icon: FaCrown,
    value: 1,
    suffix: '',
    label: 'SAC Vice President',
    desc: 'Elected Vice President of the Student Activity Council (SAC) — managed leadership teams.',
    color: 'from-violet-600 to-violet-400',
    bgColor: 'rgba(139,92,246,0.1)',
    borderColor: 'rgba(139,92,246,0.3)',
    isText: true,
    textValue: 'VP',
  },
  {
    icon: FaIndustry,
    value: 1,
    suffix: '',
    label: 'Alkem Visit',
    desc: 'Completed industrial training and visit to Alkem Laboratories, Sikkim, West Bengal.',
    color: 'from-emerald-600 to-emerald-400',
    bgColor: 'rgba(16,185,129,0.1)',
    borderColor: 'rgba(16,185,129,0.3)',
    isText: true,
    textValue: 'Alkem',
  },
];

function AchievementCard({ item, index, inView }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.34, 1.2, 0.64, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div
        className="glass-card p-8 h-full relative overflow-hidden text-center transition-all duration-400 cursor-default"
        style={{ border: `1px solid ${item.borderColor}` }}
      >
        {/* BG glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"
          style={{ background: `radial-gradient(circle at 50% 0%, ${item.bgColor} 0%, transparent 70%)` }}
        />

        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
          className="text-5xl mb-5 flex justify-center text-blue-400 group-hover:text-blue-300 transition-colors"
        >
          <Icon />
        </motion.div>

        {/* Value */}
        <div className={`font-heading text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-3`}>
          {item.isText ? (
            item.textValue
          ) : inView ? (
            <AnimatedCounter
              end={item.value}
              decimals={item.value % 1 !== 0 ? 1 : 0}
              duration={2.5}
              delay={0.2 + index * 0.1}
              suffix={item.suffix}
            />
          ) : `0`}
        </div>

        <h3 className="font-accent font-bold text-white text-base mb-3">{item.label}</h3>
        <p className="font-body text-white/40 text-sm leading-relaxed">{item.desc}</p>

        {/* Bottom accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: '60%' } : {}}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r ${item.color} rounded-full`}
        />
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" className="section-pad relative overflow-hidden" ref={ref}>
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.3, 1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
            className="absolute w-1 h-1 rounded-full bg-blue-400/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Recognition</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3">
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <p className="font-body text-white/50 mt-4 max-w-lg mx-auto">
            Milestones that define my professional journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((item, i) => (
            <AchievementCard key={item.label} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
