/**
 * Ambika Traders — Global Navigation Data
 * Clean, accessible navbar links and utility bar items.
 */

export const navigationData = {
  utilityBar: {
    tagline: 'Premium Aluminium, Sanitaryware & Interior Solutions',
    phone: '+91 98765 43210', // Authentic format placeholder
    email: 'info@ambikatraders.com',
    hours: 'Mon – Sat: 9:30 AM – 8:00 PM',
    locationShort: 'Showroom & Workshop',
  },
  brand: {
    name: 'AMBIKA TRADERS',
    shortName: 'Ambika',
    tagline: 'Aluminium Works & Interior Solutions',
    hinglishMotto: 'Aapki zaroorat ke hisaab se sahi solution.',
  },
  primaryNav: [
    { label: 'Home', path: '/', isExternal: false },
    { label: 'Products', path: '/products', isExternal: false },
    { label: 'Services', path: '/services', isExternal: false },
    { label: 'Projects', path: '/projects', isExternal: false },
    { label: 'About', path: '/about', isExternal: false },
    { label: 'Contact', path: '/contact', isExternal: false },
  ],
  primaryCta: {
    label: 'Enquiry Karein',
    path: '/contact',
    subtext: 'Direct baat karein expert team se',
  },
  footerNav: {
    quickLinks: [
      { label: 'Home', path: '/' },
      { label: 'Products Catalog', path: '/products' },
      { label: 'Our Services', path: '/services' },
      { label: 'Recent Projects', path: '/projects' },
      { label: 'About Ambika Traders', path: '/about' },
      { label: 'Contact & Showroom', path: '/contact' },
    ],
    productCategories: [
      { label: 'Aluminium Doors & Windows', path: '/products?category=aluminium-doors-windows' },
      { label: 'Sliding Systems & Partitions', path: '/products?category=sliding-systems-partitions' },
      { label: 'Sanitaryware & Bath', path: '/products?category=sanitaryware' },
      { label: 'Modular Kitchen Solutions', path: '/products?category=kitchen-solutions' },
      { label: 'Wardrobes & Profile Shutters', path: '/products?category=wardrobes-interiors' },
      { label: 'False Ceiling & Grids', path: '/products?category=false-ceiling-materials' },
    ],
    servicesList: [
      { label: 'Custom Aluminium Fabrication', path: '/services/custom-aluminium-fabrication' },
      { label: 'Glass Partitions & Systems', path: '/services/sliding-partitions-glass-works' },
      { label: 'Complete Interior Fitouts', path: '/services/complete-interior-fitouts' },
      { label: 'False Ceiling Installation', path: '/services/false-ceiling-gypsum-installation' },
      { label: 'Renovation & Upgrades', path: '/services/renovation-remodelling-services' },
    ],
  }
};

export default navigationData;
