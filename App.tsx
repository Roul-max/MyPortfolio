import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroLoader from './components/IntroLoader';
import ScrollProgress from './components/ScrollProgress';
import { Toast } from './components/Toast';
import CursorSpotlight from './components/CursorSpotlight';
import QuickActionDock from './components/QuickActionDock';
import { useToast } from './hooks/useToast';
import { useKonami } from './hooks/useKonami';
import { useSmoothScroll } from './hooks/useSmoothScroll';

const Home = lazy(() => import('./sections/Home'));
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Experience = lazy(() => import('./sections/Experience'));
const Interests = lazy(() => import('./sections/Interests'));
const Contact = lazy(() => import('./sections/Contact'));
const LiveStats = lazy(() => import('./sections/LiveStats'));
const DeveloperTerminal = lazy(() => import('./sections/DeveloperTerminal'));
const WhyHireMe = lazy(() => import('./sections/WhyHireMe'));

const titles = [
  'Rohit Kumar | Full Stack Dev',
  'Hey, let\'s build together!',
  'Rohit Kumar | React - Node.js',
  'Open to Work',
];

const App: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const { toasts, showToast, dismissToast } = useToast();

  const handleLoaderComplete = useCallback((): void => setShowLoader(false), []);
  const toggleTheme = useCallback((): void => {
    const nextDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.theme = nextDark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextDark ? '#0A0A0A' : '#f8fafc');
    window.dispatchEvent(new CustomEvent('portfolio:theme-change', { detail: { dark: nextDark } }));
  }, []);
  const handleKonami = useCallback((): void => {
    showToast('You found the secret! Easter egg unlocked.', 'success');
  }, [showToast]);

  useKonami(handleKonami);
  useSmoothScroll();

  useEffect(() => {
    const setVh = (): void => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % titles.length;
      document.title = titles[index] ?? titles[0];
    }, 4000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.card-spotlight');
    const handleMove = (event: MouseEvent): void => {
      const card = event.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };
    cards.forEach((card) => card.addEventListener('mousemove', handleMove));
    return () => cards.forEach((card) => card.removeEventListener('mousemove', handleMove));
  }, [showLoader]);

  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]');
    const markLoaded = (event: Event): void => {
      (event.currentTarget as HTMLImageElement).classList.add('loaded');
    };
    images.forEach((image) => {
      if (image.complete) image.classList.add('loaded');
      image.addEventListener('load', markLoaded);
    });
    return () => images.forEach((image) => image.removeEventListener('load', markLoaded));
  }, [showLoader]);

  return (
    <div className="theme-page relative min-h-screen overflow-x-clip transition-colors duration-200">
      <AnimatePresence>{showLoader && <IntroLoader onComplete={handleLoaderComplete} />}</AnimatePresence>
      {!showLoader && (
        <>
          <ScrollProgress />
          <CursorSpotlight />
          <Navbar onToggleTheme={toggleTheme} />
          <main>
            <Suspense fallback={null}>
              <Home />
              <About />
              <LiveStats />
              <Skills />
              <Projects recruiterMode={false} />
              <Experience />
              <DeveloperTerminal />
              <Interests />
              <WhyHireMe />
              <Contact showToast={showToast} />
            </Suspense>
          </main>
          <Footer />
          <QuickActionDock />
          <Toast toasts={toasts} onDismiss={dismissToast} />
        </>
      )}
    </div>
  );
};

export default App;
