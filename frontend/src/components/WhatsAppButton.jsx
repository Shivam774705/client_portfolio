import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';

export default function WhatsAppButton() {
  const phoneNumber = '916264761698'; // Updated with real number from resume
  const message = 'Hello Vishnu, I saw your portfolio and would like to connect.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15, rotate: 12 }}
      whileTap={{ scale: 0.9 }}
      className="whatsapp-btn group"
    >
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full bg-green-400/40"
      />
      <FaWhatsapp className="text-2xl text-white relative z-10" aria-hidden="true" />
    </motion.a>
  );
}
