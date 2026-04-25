import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUserDoctor, FaBolt, FaAward, FaBriefcase, FaBullseye } from 'react-icons/fa6';

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

const stats = [
  { value: 1.5, suffix: '+', label: 'Years Experience', icon: FaBolt },
  { value: 5, suffix: '+', label: 'Certifications', icon: FaAward },
  { value: 3, suffix: '+', label: 'Work Roles', icon: FaBriefcase },
];

const traits = [
  'HCP Engagement Expert',
  'Healthcare Brand Builder',
  'Clinical Knowledge',
  'Communication Strategy',
  'Pharma Science B.Pharm',
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-pad relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/0 via-blue-950/5 to-navy-900/0 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Get to know me</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ── LEFT: About card ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="glass-card p-8 md:p-10 relative overflow-hidden" style={{ animation: 'borderGlow 4s ease-in-out infinite' }}>
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-tr-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl glass-card-blue flex items-center justify-center text-2xl text-blue-400">
                    <FaUserDoctor />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">Vishnu Kumar Kesharwani</h3>
                    <p className="font-accent text-blue-400 text-sm">B.Pharm | Pharma Marketing</p>
                  </div>
                </div>

                <p className="font-body text-white/70 text-base leading-relaxed mb-6">
                  Commercially aware <span className="text-blue-400 font-medium">pharma professional</span> with a solid foundation in pharmaceutical science and regulatory pathways.
                  I leverage clinical knowledge and business strategy to drive brand growth and market engagement.
                </p>

                <p className="font-body text-white/60 text-sm leading-relaxed mb-8">
                  Currently pursuing <span className="text-blue-400 font-medium">B.Pharm (2022–2026)</span>, I have 1.5 years of clinical experience as a Hospital and Assistant Pharmacist, 
                  plus industrial training at leading companies like <span className="text-blue-400 font-medium">Alkem Laboratories</span>. I am focused on bridging the gap between clinical science and marketing excellence.
                </p>

                {/* Traits */}
                <div className="flex flex-wrap gap-2">
                  {traits.map((t) => (
                    <span key={t} className="px-3 py-1.5 text-xs font-accent font-semibold text-blue-300 glass-card-blue rounded-full border border-blue-400/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Stats ── */}
          <div className="space-y-6">
            {stats.map(({ value, suffix, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              >
                <div className="glass-card p-6 flex items-center gap-6 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group cursor-default">
                  <div className="w-16 h-16 rounded-2xl glass-card-blue flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 text-blue-400">
                    <Icon />
                  </div>
                  <div>
                    <div className="font-heading text-4xl font-black gradient-text">
                      {inView ? (
                        <AnimatedCounter
                          end={value}
                          decimals={value % 1 !== 0 ? 1 : 0}
                          duration={2.5}
                          delay={0.3 + i * 0.1}
                          suffix={suffix}
                        />
                      ) : `0${suffix}`}
                    </div>
                    <div className="font-accent text-white/60 text-sm font-medium mt-1">{label}</div>
                  </div>

                  {/* Progress bar */}
                  <div className="ml-auto">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                      className="w-1 h-12 bg-gradient-to-b from-blue-500 to-blue-300 rounded-full origin-bottom"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Extra info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl text-blue-500 mt-1"><FaBullseye /></span>
                <div>
                  <h4 className="font-accent font-semibold text-white mb-1">Career Objective</h4>
                  <p className="font-body text-white/50 text-sm leading-relaxed">
                    To establish myself as a leading pharma marketing professional by leveraging my clinical background and business acumen to create impactful healthcare brand stories.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
