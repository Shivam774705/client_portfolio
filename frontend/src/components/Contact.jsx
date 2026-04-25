import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPhone, FaEnvelope, FaLocationDot, FaPaperPlane, FaCircleCheck, FaLinkedinIn } from 'react-icons/fa6';

const contactInfo = [
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+91 6264761698',
    href: 'tel:+916264761698',
    color: '#3b82f6',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'guptavishnucollege152@gmail.com',
    href: 'mailto:guptavishnucollege152@gmail.com',
    color: '#6366f1',
  },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vishnu-gupta',
    href: 'https://www.linkedin.com/in/vishnu-gupta-2b8a3b295/',
    color: '#0ea5e9',
  },
  {
    icon: FaLocationDot,
    label: 'Location',
    value: 'Bhopal, Madhya Pradesh',
    href: '#',
    color: '#10b981',
  },
];

export default function Contact() {
  const [formState, setFormState] = useState('idle'); // idle, sending, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://vishnu-backend-fx35.onrender.com';
      const response = await fetch(`${apiUrl}/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
        setTimeout(() => setFormState('idle'), 3000);
      } else {
        const errorData = await response.json();
        console.error('Submission failed:', errorData.error);
        setFormState('idle');
        alert('Failed to send message: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormState('idle');
      alert('Error connecting to server. Please ensure the backend is running.');
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden" ref={ref}>
      {/* BG Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-label"
          >
            Get in Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-black text-white mt-3"
          >
            Let's Build Something <span className="gradient-text">Great</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ── LEFT: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-8">
              <h3 className="font-heading text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-5 group p-4 rounded-2xl hover:bg-white/5 transition-colors"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}
                    >
                      <item.icon />
                    </div>
                    <div>
                      <p className="font-accent text-xs text-white/40 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="font-body text-white font-medium text-lg">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Status indicator */}
              <div className="mt-12 p-6 glass-card-blue rounded-2xl border border-blue-500/20">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                  </div>
                  <p className="font-body text-blue-100 text-sm">Available for new opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-accent text-xs text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white font-body focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-accent text-xs text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white font-body focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-accent text-xs text-white/40 uppercase tracking-widest ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Inquiry regarding roles"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white font-body focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-accent text-xs text-white/40 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can I help you?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white font-body focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-70"
              >
                {formState === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
                {formState === 'sending' && (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {formState === 'success' && (
                  <>
                    <span>Sent Successfully</span>
                    <FaCircleCheck className="text-xl" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
