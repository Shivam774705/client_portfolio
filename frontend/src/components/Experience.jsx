import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHospital, FaStaffSnake, FaIndustry, FaSuitcaseMedical } from 'react-icons/fa6';

const experiences = [
  {
    date: 'Jul 2025 – Aug 2025',
    role: 'Industrial Trainee',
    company: 'SIRTS-Pharmacy / RGPV',
    desc: 'Hands-on expertise in formulation and evaluation of solid dosage forms (tablets). Executed processes adhering to industrial quality and safety standards.',
    icon: FaIndustry,
    color: '#3b82f6',
  },
  {
    date: 'Oct 2024 – Mar 2025',
    role: 'Hospital Pharmacist',
    company: 'Ayodhya Shree Hospital, Bhopal',
    desc: 'Managed medication dispensing and prescription validation with 100% accuracy. Collaborated on patient care to enhance safety and outcomes.',
    icon: FaHospital,
    color: '#6366f1',
  },
  {
    date: 'Apr 2024 – Jan 2026',
    role: 'Assistant Pharmacist',
    company: 'Dr. Jaideep Khare (Endocrinologist)',
    desc: 'Assisting in clinical management of endocrine patients, focusing on medication adherence, metabolic health, and care coordination.',
    icon: FaStaffSnake,
    color: '#8b5cf6',
  },
  {
    date: '2024',
    role: 'Industrial Visit',
    company: 'Alkem Laboratories, Sikkim',
    desc: 'Gained practical insights into large-scale manufacturing and GMP standards at one of India\'s leading pharma companies.',
    icon: FaSuitcaseMedical,
    color: '#0ea5e9',
  },
];

function ExperienceItem({ item, index, inView }) {
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  return (
    <div className="relative mb-12 md:mb-24 last:mb-0">
      {/* Center line connector dot */}
      <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-navy-950 border-4 border-blue-600 z-10 flex items-center justify-center">
        <Icon className="text-white text-[10px]" />
      </div>

      <div className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: index * 0.2 }}
          className={`w-full md:w-[45%] ml-12 md:ml-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}
        >
          <div className="glass-card p-6 md:p-8 hover:bg-blue-600/5 transition-colors group">
            <span className="font-accent text-blue-400 font-bold text-sm tracking-widest uppercase mb-2 block">
              {item.date}
            </span>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
              {item.role}
            </h3>
            <p className="font-accent text-white/50 text-sm mb-4 italic">{item.company}</p>
            <p className="font-body text-white/60 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-pad relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label">My Path</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mt-3">
            Professional <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/0 via-blue-600/50 to-blue-600/0 -translate-x-1/2" />

          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <ExperienceItem key={exp.role} item={exp} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
