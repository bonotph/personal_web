"use client"

import { motion } from 'motion/react'

const projects = [
  {
    id: 'event-llm-portfolio',
    title:
      'Event-based Multi-modal LLM Portfolio Investment System',
    date: 'September 2025 – May 2026',
    context: 'Under CityU CS Research Mentoring Scheme',
    bullets: [
      'Built a robust data retrieval engine to collect and process multi-source financial options data',
      'Co-developed "Option Query Language" (OQL) to facilitate precise, LLM-driven financial analysis',
      'Developed an automated annotation pipeline for high-quality dataset creation in quantitative research',
    ],
    accent: '#4a6fa5',
  },
  {
    id: 'fyp-unlearning',
    title: 'Explainability-Stable Unlearning / FYP (in progress)',
    date: 'FYP — in progress',
    context: '',
    bullets: [
      'Develop an Explainability-Stable Unlearning Algorithm that penalizes significant shifts in SHAP values for a hold-out "Stability Set" of customers',
      'Simulate non-IID financial heterogeneity with Dirichlet partitioning to create a federated environment where clients have skewed distributions',
      'Quantify the compliance-utility trade-off by measuring computational cost and accuracy loss required to maintain explainability stability',
    ],
    accent: '#8b7355',
  },
]

export default function Applications() {
  return (
    <div className="min-h-screen px-6 md:px-20 py-12">
      <div className="max-w-4xl mx-auto grid gap-8">
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            className="relative rounded-lg border overflow-hidden"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ backgroundColor: 'rgba(255,255,255,0.01)', borderColor: 'rgba(168,174,187,0.06)' }}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif leading-tight" style={{ color: '#e6e8ed' }}>{p.title}</h3>
                  <div className="mt-2 text-[13px] font-mono" style={{ color: 'rgba(168,174,187,0.55)' }}>
                    <span>{p.date}</span>
                    {p.context ? <span className="mx-2">•</span> : null}
                    {p.context ? <span>{p.context}</span> : null}
                  </div>
                </div>

                <div className="hidden md:flex items-center">
                  <div className="h-10 w-10 rounded-full" style={{ background: p.accent, opacity: 0.12 }} />
                </div>
              </div>

              <div className="mt-6">
                <ul className="space-y-3">
                  {p.bullets.map((b, idx) => (
                    <motion.li
                      key={idx}
                      className="text-sm leading-snug"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + idx * 0.06, duration: 0.45 }}
                      style={{ color: 'rgba(168,174,187,0.85)' }}
                    >
                      <span className="inline-block w-3 mr-3" style={{ color: p.accent }}>•</span>
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ height: 4, background: 'linear-gradient(90deg, transparent, ' + p.accent + ', transparent)' }} />
          </motion.article>
        ))}
      </div>
    </div>
  )
}
// ...previous placeholder removed