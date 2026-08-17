import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import { getLenis } from '@/lib/lenis';
import { ScrollTrigger } from '@/lib/animations/gsap';

// Pages
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

/**
 * Scroll to top on route change with Lenis synchronization
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Refresh ScrollTrigger positions after page content updates
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export function App() {
  // Initialize Lenis + GSAP ticker synchronization
  useSmoothScroll();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
