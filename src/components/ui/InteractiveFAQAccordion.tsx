"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface InteractiveFAQAccordionProps {
  faqs: FAQItem[];
  defaultOpenIndex?: number | null;
}

export function InteractiveFAQAccordion({
  faqs,
  defaultOpenIndex = 0,
}: InteractiveFAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    defaultOpenIndex !== null ? [defaultOpenIndex] : []
  );

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-3.5">
      {faqs.map((faq, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-white dark:bg-slate-900 border-brand-violet/40 dark:border-purple-500/40 shadow-card"
                : "bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-subtle"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet transition-colors group"
            >
              <div className="flex items-start gap-3">
                <HelpCircle
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-200 ${
                    isOpen
                      ? "text-brand-violet dark:text-purple-400"
                      : "text-slate-400 dark:text-slate-500 group-hover:text-brand-violet dark:group-hover:text-purple-300"
                  }`}
                />
                <span className="text-sm sm:text-base font-bold text-brand-navy dark:text-white group-hover:text-brand-violet dark:group-hover:text-purple-300 transition-colors">
                  {faq.question}
                </span>
              </div>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? "rotate-180 bg-brand-violet/10 dark:bg-purple-950/50 text-brand-violet dark:text-purple-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-brand-violet/10 group-hover:text-brand-violet"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Smooth animated height container */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-12 sm:pl-14 border-t border-slate-100 dark:border-slate-800/80">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
