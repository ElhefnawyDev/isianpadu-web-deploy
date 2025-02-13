"use client"; // Client-side component

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the FAQ type for props
interface FAQItem {
  question: string;
  answers: string;
}

interface FAQAccordionProps {
  faqData: FAQItem[];
}

const FAQAccordion = ({ faqData }: FAQAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {faqData.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="flex justify-between items-center w-full text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            onClick={() => toggleQuestion(index)}
          >
            <span className="text-lg font-semibold pr-4">{faq.question}</span>
            <span className="text-2xl flex-shrink-0">
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-b-lg px-4 py-3 mt-1 shadow-md"
              >
                <p>{faq.answers}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

export default FAQAccordion;
