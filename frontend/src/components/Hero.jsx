import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaPills,
  FaHospital,
  FaDna,
  FaStaffSnake,
  FaChartLine,
  FaMicroscope,
  FaSyringe,
  FaStethoscope,
  FaDownload,
  FaPaperPlane,
  FaBolt,
  FaAward,
  FaBriefcase
} from 'react-icons/fa6';

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!animId) draw();
      } else {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener('resize', handleResize);

    const N = 70;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      if (!canvas || !canvas.offsetWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ── Floating healthcare icons ── */
const icons = [
  { icon: FaPills, color: '#3b82f6' },
  { icon: FaHospital, color: '#60a5fa' },
  { icon: FaDna, color: '#6366f1' },
  { icon: FaStaffSnake, color: '#8b5cf6' },
  { icon: FaChartLine, color: '#0ea5e9' },
  { icon: FaMicroscope, color: '#10b981' },
  { icon: FaSyringe, color: '#3b82f6' },
  { icon: FaStethoscope, color: '#6366f1' }
];

function FloatingIcon({ Icon, style, color }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }}
      className="absolute text-2xl select-none pointer-events-none opacity-20"
      style={{ ...style, color }}
    >
      <Icon />
    </motion.div>
  );
}

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' } }),
};

export default function Hero() {
  return (
    <section id="home" className="hero-gradient relative min-h-screen flex items-center pt-24 pb-24 md:pb-16 overflow-hidden">
      <ParticleCanvas />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-blue-700/20 blur-[140px] blob-anim" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-indigo-600/15 blur-[120px] blob-anim" style={{ animationDelay: '4s' }} />
      <div className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-blue-400/10 blur-[100px]" />

      {/* Floating icons */}
      {icons.map((item, i) => (
        <FloatingIcon
          key={i}
          Icon={item.icon}
          color={item.color}
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div className="space-y-8 order-2 lg:order-1">
            <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible">
              <span className="section-label">Welcome to my portfolio</span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-heading text-[32px] sm:text-5xl md:text-6xl 2xl:text-7xl font-black leading-tight"
            >
              <span className="text-white">Vishnu</span>{' '}
              <span className="gradient-text text-glow">Kumar</span>
              <br />
              <span className="text-white">Kesharwani</span>
            </motion.h1>

            <motion.div custom={2} variants={textVariants} initial="hidden" animate="visible">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-blue-500 to-transparent" />
                <p className="font-accent font-semibold text-blue-400 text-lg tracking-wide">
                  Bachelor of Pharmacy | Pharma Marketing | Based in Bhopal
                </p>
              </div>
              <p className="font-body text-white/60 text-lg leading-relaxed max-w-lg">
                Driving healthcare brands through{' '}
                <span className="text-white/90 font-medium">trust</span>,{' '}
                <span className="text-white/90 font-medium">strategy</span> &{' '}
                <span className="text-white/90 font-medium">growth</span>.
              </p>
            </motion.div>

            {/* Badges */}
            <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
              {['B.Pharm Graduate', 'HCP Engagement', 'Brand Strategy'].map((tag) => (
                <span key={tag} className="glass-card px-4 py-1.5 text-xs font-accent font-semibold text-blue-300 tracking-wide">
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div custom={4} variants={textVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
              <motion.a
                href="/0193PY221102_Vishnu_Kumar_Marketing.pdf"
                download
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary flex items-center gap-2"
              >
                <FaDownload className="text-lg" />
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="btn-outline flex items-center gap-2"
              >
                <FaPaperPlane className="text-lg" />
                Hire Me
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5"
            >
              {[
                { val: '1.5+', label: 'Years Exp.', icon: FaBolt },
                { val: '5+', label: 'Certifications', icon: FaAward },
                { val: '3+', label: 'Work Roles', icon: FaBriefcase },
              ].map(({ val, label, icon: Icon }) => (
                <div key={label} className="text-center group">
                  <div className="flex justify-center mb-1 text-blue-500/40 group-hover:text-blue-500 transition-colors">
                    <Icon className="text-xl" />
                  </div>
                  <div className="font-heading text-2xl xs:text-3xl font-black gradient-text">{val}</div>
                  <div className="font-accent text-[10px] text-white/40 mt-1 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Photo card ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="w-[380px] h-[380px] rounded-full border border-blue-500/10"
                style={{ borderTopColor: 'rgba(59,130,246,0.4)', borderRightColor: 'rgba(99,102,241,0.2)' }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-[300px] h-[300px] rounded-full border border-indigo-500/15"
                style={{ borderBottomColor: 'rgba(59,130,246,0.3)' }}
              />
            </div>

            {/* Photo glass card */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 float-anim"
            >
              <div className="glass-card p-3 glow-blue" style={{ borderRadius: '28px' }}>
                <div
                  className="w-full max-w-[280px] h-80 sm:max-w-[320px] md:max-w-none md:w-80 md:h-[360px] rounded-2xl overflow-hidden flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(29,78,216,0.3) 0%, rgba(99,102,241,0.2) 100%)',
                  }}
                >
                  {/* Placeholder avatar */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-blue-400/30">
                      <img 
                        src="/da7cd350-9143-4408-8023-d6b7b90fa464.jpg" 
                        alt="Vishnu Kumar Kesharwani - Pharma Professional in Bhopal" 
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-accent font-semibold text-white/80 text-sm">B.Pharm</p>
                      <p className="font-body text-blue-400/80 text-xs mt-1">Pharma Professional</p>
                    </div>
                    {/* Decorative icons */}
                    <div className="flex gap-4 flex-wrap justify-center px-6 text-white/40">
                      <FaPills className="text-2xl" />
                      <FaHospital className="text-2xl" />
                      <FaChartLine className="text-2xl" />
                    </div>
                  </div>

                  {/* shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating badge cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-8 top-12 glass-card px-3 py-2 border border-blue-500/30 flex items-center gap-2"
              >
                <FaAward className="text-blue-400" />
                <p className="font-accent text-xs text-blue-400 font-semibold uppercase tracking-tighter">SAGE Award 2024</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-8 bottom-16 glass-card px-3 py-2 border border-indigo-500/30 flex items-center gap-2"
              >
                <FaAward className="text-indigo-400" />
                <p className="font-accent text-xs text-indigo-400 font-semibold uppercase tracking-tighter">B.Pharm 2026</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -right-4 top-8 glass-card px-3 py-2 border border-green-500/30 flex items-center gap-2"
              >
                <FaBolt className="text-green-400" />
                <p className="font-accent text-xs text-green-400 font-semibold uppercase tracking-tighter">VP SAC</p>
              </motion.div>
            </motion.div>

            {/* Bottom glow blob */}
            <div className="absolute bottom-0 w-64 h-32 bg-blue-600/20 blur-[80px] rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-accent text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
