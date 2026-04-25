import { FaLinkedinIn, FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#020817] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-heading font-black text-2xl shadow-lg shadow-blue-500/20">
                VK
              </div>
              <div>
                <span className="block font-heading text-white text-xl font-bold leading-none">Vishnu Kumar</span>
                <span className="block font-accent text-blue-400 text-xs uppercase tracking-widest mt-1">Pharma Professional</span>
              </div>
            </div>
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-sm">
              Dedicated pharmaceutical professional blending clinical science with marketing strategy to drive healthcare growth and trust.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/vishnu-gupta-2b8a3b295/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card-blue flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-600/20 transition-all duration-300"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="mailto:guptavishnucollege152@gmail.com"
                className="w-10 h-10 rounded-lg glass-card-blue flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-600/20 transition-all duration-300"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-heading text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-accent text-sm text-white/40 hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4">
                {['Brand Strategy', 'HCP Engagement', 'Market Analysis', 'Clinical Support'].map((s) => (
                  <li key={s} className="font-accent text-sm text-white/40">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact info Col */}
          <div>
            <h4 className="font-heading text-white font-bold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg glass-card-blue flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <FaPhone />
                </div>
                <span className="font-body text-white/60 text-sm">+91 6264761698</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg glass-card-blue flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope />
                </div>
                <span className="font-body text-white/60 text-sm">guptavishnucollege152@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg glass-card-blue flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <FaLocationDot />
                </div>
                <span className="font-body text-white/60 text-sm">Bhopal, Madhya Pradesh</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-accent text-white/20 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Vishnu Kumar Kesharwani. All rights reserved.
          </p>
          <p className="font-accent text-white/20 text-xs tracking-widest uppercase">
            Built with <span className="text-blue-500/50 mx-1">React & Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
