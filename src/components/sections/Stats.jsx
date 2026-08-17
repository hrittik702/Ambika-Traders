import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Ambika Traders — Section 04: Trust / Statistics (Stage 03)
 * Uses verified client numbers (90+ Years Experience, 180+ Projects Completed, 12 Design Specialists).
 */
export function Stats() {
  const statRefs = useRef([]);

  const statsData = [
    {
      value: '90+',
      label: 'Years of Experience',
      hinglishSub: 'Peedhiyon ka bharosa aur technical expertise',
    },
    {
      value: '180+',
      label: 'Projects Completed',
      hinglishSub: 'Residential aur commercial executed sites',
    },
    {
      value: '12',
      label: 'Design Specialists',
      hinglishSub: 'Trained in-house fabrication team',
    },
  ];

  useEffect(() => {
    statRefs.current.forEach((el, index) => {
      if (!el) return;
      const targetValue = parseInt(statsData[index].value);
      const suffix = statsData[index].value.replace(/[0-9]/g, '');

      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          toggleActions: 'play none none none',
          once: true,
        },
        onUpdate: () => {
          el.innerHTML = Math.floor(obj.val) + suffix;
        },
      });
    });
  }, []);

  return (
    <div data-stats-section className="w-full pt-12 pb-8 md:pt-16 md:pb-12">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-mono-500/30">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              data-stat-card
              className={`flex flex-col justify-between ${idx > 0 ? 'pt-6 md:pt-0 md:pl-10' : ''}`}
            >
              <div>
                <div 
                  ref={(el) => (statRefs.current[idx] = el)}
                  className="text-display-xl font-bold tracking-tighter text-mono-0 font-intern"
                >
                  0{statsData[idx].value.replace(/[0-9]/g, '')}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-mono-500/30">
                <h3 className="text-heading-sm font-semibold text-mono-0 tracking-tight">
                  {stat.label}
                </h3>
                <p className="text-xs font-mono text-mono-300 mt-1">
                  {stat.hinglishSub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;

