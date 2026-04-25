import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaBullhorn, 
  FaComments, 
  FaRobot, 
  FaFileExcel, 
  FaSuitcaseMedical, 
  FaChartPie, 
  FaPills, 
  FaHospitalUser 
} from 'react-icons/fa6';

const certifications = [
  { icon: FaBullhorn, title: 'Empowering Pharma Marketing', issuer: 'Pharma State Academy', year: '2023', color: '#3b82f6' },
  { icon: FaComments, title: 'Soft Skill Training for PDP', issuer: 'SIRTS-Pharmacy, Bhopal', year: '2024', color: '#6366f1' },
  { icon: FaRobot, title: 'AI Tools Workshop (10x)', issuer: 'be 10x', year: '2024', color: '#8b5cf6' },
  { icon: FaFileExcel, title: 'Excel Data Management', issuer: 'Spreadsheet Applications', year: '2023', color: '#0ea5e9' },
  { icon: FaSuitcaseMedical, title: 'Intro to Pharmacovigilance', issuer: 'Biopharma Institute', year: '2025', color: '#10b981' },
  { icon: FaChartPie, title: 'Parenteral Drug Admin.', issuer: 'SIRTS-Pharmacy, Bhopal', year: '2024', color: '#f59e0b' },
  { icon: FaPills, title: 'Experimental Pharmacology', issuer: 'SIRTS-Pharmacy', year: '2024', color: '#ec4899' },
  { icon: FaHospitalUser, title: 'Pharmacovigilance Certification', issuer: 'Pharmuni', year: '2024', color: '#14b8a6' },
];

function CertCard({ cert }) {
  const Icon = cert.icon;
  return (
    <div className="mx-3 flex-shrink-0" style={{ width: '280px' }}>
      <div
        className="glass-card p-5 h-full transition-all duration-300 hover:scale-105 cursor-default group"
        style={{ borderColor: `${cert.color}40`, border: `1px solid ${cert.color}30` }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-colors duration-300"
            style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40`, color: cert.color }}
          >
            <Icon />
          </div>
          <div className="min-w-0">
            <h4 className="font-accent font-bold text-white text-sm leading-snug mb-1 truncate">{cert.title}</h4>
            <p className="font-body text-white/40 text-xs truncate">{cert.issuer}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cert.color }} />
              <span className="font-accent text-xs" style={{ color: cert.color }}>{cert.year}</span>
              <span className="text-xs text-white/20">• Certified ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ direction = 'left', speed = 40 }) {
  const items = [...certifications, ...certifications];
  const duration = speed;

  return (
    <div className="overflow-hidden py-2 marquee-container">
      <div
        className="flex marquee-inner"
        style={{
          animation: `${direction === 'left' ? 'marqueeLeft' : 'marqueeRight'} ${duration}s linear infinite`,
          width: 'max-content',
        }}
      >
        {items.map((cert, i) => (
          <CertCard key={`${cert.title}-${i}`} cert={cert} />
        ))}
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-container:hover .marquee-inner {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="section-pad relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-blue-950/10 to-[#020817] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-label">Credentials</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="font-body text-white/50 text-base mt-4 max-w-lg mx-auto">
            Continuously learning and upskilling in pharma and beyond
          </p>
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #020817, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #020817, transparent)' }} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <MarqueeRow direction="left" speed={45} />
          <MarqueeRow direction="right" speed={38} />
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-3xl mx-auto px-6 mt-12"
      >
        <div className="glass-card p-6 flex flex-wrap justify-center gap-8">
          {[
            { val: '5+', label: 'Certifications Earned' },
            { val: '3', label: 'Technical Skills' },
            { val: '2024', label: 'Latest Certified' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading text-3xl font-black gradient-text">{val}</p>
              <p className="font-accent text-xs text-white/40 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
