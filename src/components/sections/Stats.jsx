import React from 'react';
import Section from '@/components/ui/Section';

/**
 * Ambika Traders — Section 04: Trust / Statistics (Stage 03)
 * Uses verified client numbers (90+ Years Experience, 180+ Projects Completed, 12 Design Specialists).
 */
export function Stats() {
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

  return (
    <Section
      data-stats-section
      variant="darkSoft"
      spacing="sm"
      container={false}
      className="border-b border-mono-800"
    >
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-mono-800">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              data-stat-card
              className={`flex flex-col justify-between ${idx > 0 ? 'pt-6 md:pt-0 md:pl-10' : ''}`}
            >
              <div>
                <span className="font-mono text-eyebrow text-mono-500 uppercase tracking-widest block mb-1">
                  [0{idx + 1} — STATISTIC]
                </span>
                <div className="text-display-xl font-bold tracking-tighter text-mono-0 font-intern">
                  {stat.value}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-mono-800">
                <h3 className="text-heading-sm font-semibold text-mono-100 tracking-tight">
                  {stat.label}
                </h3>
                <p className="text-xs font-mono text-mono-400 mt-1">
                  {stat.hinglishSub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Stats;
