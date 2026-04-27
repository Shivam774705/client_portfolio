import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGraduationCap, FaSchool, FaBookOpen } from 'react-icons/fa6';

const educations = [
  {
    degree: 'Bachelor of Pharmacy (B.Pharm)',
    institution: 'Sagar Institute of Research Technology and Science - Pharmacy (SIRTS), Bhopal',
    duration: '2022 – 2026',
    status: 'CGPA: 7.81/10',
    desc: 'Specializing in pharmaceutical sciences, regulatory pathways, and drug marketing strategies. Currently pursuing with a strong focus on brand management.',
    icon: FaGraduationCap,
    color: '#3b82f6',
  },
  {
    degree: 'Senior Secondary (XII)',
    institution: 'St. Atulanand Residential Academy, Varanasi',
    duration: '2021 – 2022',
    status: '84.20 % (CBSE)',
    desc: 'Completed secondary education with a focus on science and mathematics, achieving high academic distinction in competitive board exams.',
    icon: FaBookOpen,
    color: '#6366f1',
  },
  {
    degree: 'High School (X)',
    institution: 'Shemford Futuristic School, MP',
    duration: '2019 – 2020',
    status: '66.2 % (CBSE)',
    desc: 'Foundation in science and core academic subjects. Developed early interests in healthcare and biology.',
    icon: FaSchool,
    color: '#8b5cf6',
  },
];

function EducationCard({ edu, index, inView }) {
  const Icon = edu.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className="glass-card p-8 h-full relative overflow-hidden transition-all duration-500 hover:border-blue-500/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
        
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl glass-card-blue flex items-center justify-center text-2xl text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon />
          </div>

          <span className="font-accent text-xs font-bold text-blue-400 tracking-widest uppercase block mb-2">
            {edu.duration}
          </span>
          <h3 className="font-heading text-xl font-bold text-white mb-2">{edu.degree}</h3>
          <p className="font-accent text-white/50 text-sm mb-4">{edu.institution}</p>
          
          <div className="w-full h-px bg-white/5 my-5" />
          
          <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
            {edu.desc}
          </p>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-accent text-xs text-white/40 uppercase tracking-widest">{edu.status}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="section-pad relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Academic Path</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3">
            My <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educations.map((edu, i) => (
            <EducationCard key={edu.degree} edu={edu} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
