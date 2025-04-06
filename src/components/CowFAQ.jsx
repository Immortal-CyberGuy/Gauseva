import React, { useState } from "react";
import "../style/CowFAQ.css";

const faqs = [
  { question: "What is the best diet for dairy cows?", answer: "A balanced diet includes high-quality forage, grains, vitamins, and minerals." },
  { question: "How to improve milk production naturally?", answer: "Ensure proper nutrition, clean water, comfortable housing, and stress-free milking." },
  { question: "What are the common diseases in cattle?", answer: "Common diseases include mastitis, foot-and-mouth disease, brucellosis, and bovine respiratory disease." },
  { question: "How often should cows be milked?", answer: "Cows are typically milked twice a day, but high-yielding breeds may require three times a day." },
  { question: "What is the ideal housing for dairy cows?", answer: "A well-ventilated, dry, and spacious shelter with proper drainage is ideal for dairy cows." },
  { question: "How to manage cattle during extreme weather?", answer: "Provide shade and water in summers; shelter and warmth in winters; and ensure proper ventilation in all seasons." }
];

const CowFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className={`faq-toggle ${openIndex === index ? "open" : ""}`}>
                {openIndex === index ? "▲" : "▼"}
              </span>
            </button>
            <div className={`faq-answer ${openIndex === index ? "show" : ""}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CowFAQ;
