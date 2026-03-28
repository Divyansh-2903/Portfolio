import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Most web projects take between 2–4 weeks from kickoff to launch. Video editing and motion graphics projects usually take 1–2 weeks depending on complexity and revision rounds.",
    },
    {
      question: "Do you work with international clients?",
      answer: "Yes, currently serving clients across the US, Canada, UK, and Australia. I'm comfortable adapting to different time zones for meetings and async communication.",
    },
    {
      question: "What's your rate?",
      answer: "Rates depend on the scope and complexity of the project. I offer both project-based pricing (starting at $X) and hourly rates for ongoing work. Let's discuss your specific needs.",
    },
    {
      question: "Do you offer revisions?",
      answer: "Yes, standard projects include 2-3 rounds of revisions to ensure the final product aligns perfectly with your vision.",
    },
    {
      question: "Are you available for long-term contracts?",
      answer: "Absolutely. I'm open to retainers and ongoing partnerships for continuous development, content creation, or maintenance.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden bg-surface/30">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-white/10 w-16"></div>
            <span className="text-primary font-mono text-sm tracking-widest uppercase">07 / FAQ</span>
            <div className="h-px bg-white/10 w-16"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight">
            COMMON QUESTIONS
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="border border-white/10 rounded-2xl bg-bg overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg md:text-xl font-bold text-white pr-8">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
