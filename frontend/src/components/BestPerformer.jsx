import { motion } from 'framer-motion';
import { FaCrown, FaStar } from 'react-icons/fa6';

const bestPerformerImg = "/da7cd350-9143-4408-8023-d6b7b90fa464.jpg";

export default function BestPerformer() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 border-blue-500/30"
        >
          {/* Image Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl rotate-6 opacity-20" />
            <div className="absolute inset-0 border-2 border-blue-500/30 rounded-2xl -rotate-3" />
            <img
              src={bestPerformerImg}
              alt="Vishnu Kumar Kesharwani - Best Performer Award 2026 Bhopal"
              className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-700"
              loading="lazy"
            />
            {/* Badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-amber-400 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center shadow-lg z-20 border-4 border-navy-950">
              <FaCrown className="text-white text-3xl" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 mb-4">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-6">
              Best Performer <br />
              <span className="gradient-text">of the Year 2026</span>
            </h2>
            <p className="font-body text-white/70 text-lg leading-relaxed mb-8">
              Recognized for exceptional dedication, clinical excellence, and significant contributions to patient care and pharmacy management. This award reflects a commitment to the highest standards of professional practice and leadership.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 font-accent font-bold tracking-widest uppercase text-sm">
              <FaCrown className="text-amber-400" /> Annual Recognition Award
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
