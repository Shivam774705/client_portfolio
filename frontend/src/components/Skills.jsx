import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaBullhorn, 
  FaMicroscope, 
  FaUsers, 
  FaBox, 
  FaComments, 
  FaLaptopCode, 
  FaHandshake, 
  FaChartSimple 
} from 'react-icons/fa6';

const skills = [
  { icon: FaBullhorn, label: 'HCP Engagement', level: 92, desc: 'Evidence-based engagement, brand strategy, advocacy' },
  { icon: FaMicroscope, label: 'Therapeutic Expertise', level: 88, desc: 'Endocrinology, Analgesics, Clinical management' },
  { icon: FaUsers, label: 'Strategic Leadership', level: 85, desc: 'Team management, SAC Vice President experience' },
  { icon: FaBox, label: 'Product Evaluation', level: 87, desc: 'Marketed product analysis, data proficiency' },
  { icon: FaComments, label: 'Professional Comm.', level: 93, desc: 'Persuasive presentation, stakeholder management' },
  { icon: FaLaptopCode, label: 'Digital Proficiency', level: 80, desc: 'Data management, spreadsheet applications, AI tools' },
  { icon: FaHandshake, label: 'Relationship Mgmt.', level: 90, desc: 'Key account management, networking, trust building' },
  { icon: FaChartSimple, label: 'Market Analysis', level: 82, desc: 'Market research, reporting, regulatory awareness' },
];

function SkillCard({ skill, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientX - cx) / rect.width) * 20;
    const y = ((e.clientY - cy) / rect.height) * -20;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-8px)`
          : 'perspective(800px) rotateX(0) rotateY(0) translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 20px 60px rgba(59,130,246,0.3), 0 0 0 1px rgba(59,130,246,0.3)' : '',
      }}
      className="skill-card p-6 cursor-default group"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
          <skill.icon />
        </span>
        <span className="font-heading font-black text-2xl gradient-text">{skill.level}%</span>
      </div>

      <h3 className="font-accent font-bold text-white text-base mb-2">{skill.label}</h3>
      <p className="font-body text-white/40 text-xs leading-relaxed mb-4">{skill.desc}</p>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
          style={{ boxShadow: hovered ? '0 0 12px rgba(59,130,246,0.8)' : '' }}
        />
      </div>

      {/* Glow on hover */}
      {hovered && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
        />
      )}
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-pad relative overflow-hidden" ref={ref}>
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/5 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">What I bring</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3">
            Core <span className="gradient-text">Skills</span>
          </h2>
          <p className="font-body text-white/50 text-base mt-4 max-w-lg mx-auto">
            A blend of clinical expertise and marketing mastery — hover to explore
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 relative">
          {skills.map((skill, i) => (
            <SkillCard key={skill.label} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
