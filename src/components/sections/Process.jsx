import React from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

/**
 * Ambika Traders — Section 10: How We Work (Stage 03)
 * Transparent 4-step workflow:
 * 01 Zaroorat Samajhna
 * 02 Sahi Product / Solution
 * 03 Saaf-Suthra Kaam
 * 04 Samadhan Poora Karna
 */
export function Process() {
  const steps = [
    {
      number: '01',
      title: 'Zaroorat Samajhna',
      description: 'Showroom visit ya call par aapke space ki requirement, dimensions aur functional needs samajhna.',
    },
    {
      number: '02',
      title: 'Sahi Product / Solution',
      description: 'Profile thickness, glass specification aur hardware selection ke sath transparent material advisory.',
    },
    {
      number: '03',
      title: 'Saaf-Suthra Kaam',
      description: 'Workshop mein precision fabrication aur site par neat, dust-controlled on-site installation.',
    },
    {
      number: '04',
      title: 'Samadhan Poora Karna',
      description: 'Final leveling, lock calibration, strict quality signoff aur client handover.',
    },
  ];

  return (
    <Section variant="light" spacing="lg" container={false}>
      <div className="content-container">
        <SectionHeading
          index="05"
          eyebrow="WORKFLOW PROCESS"
          title="Kaise Kaam Karta Hai Hamara Process"
          description="Requirement discussion se lekar final on-site installation tak step-by-step transparent execution."
        />

        {/* Process Steps Timeline */}
        <div data-process-grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              data-process-card
              className="relative flex flex-col justify-between border-t-2 border-mono-950 pt-6 space-y-4"
            >
              <div>

                <h3 className="text-heading-md font-semibold text-mono-950 tracking-tight">
                  {step.title}
                </h3>
              </div>

              <p className="text-body-sm text-mono-600 leading-relaxed prose-editorial">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Process;
