import { useState, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load sections below the fold
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Certifications = lazy(() => import('./components/Certifications'));
const Achievements = lazy(() => import('./components/Achievements'));
const BestPerformer = lazy(() => import('./components/BestPerformer'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={handleLoadComplete} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#020817] min-h-screen"
          >
            <Navbar />
            <main>
              <Hero />
              <Suspense fallback={<div className="h-20" />}>
                <About />
                <Skills />
                <Experience />
                <Education />
                <Certifications />
                <Achievements />
                <BestPerformer />
                <Contact />
                <Footer />
                <WhatsAppButton />
              </Suspense>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
