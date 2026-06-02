import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What are the hospital consultation hours?",
      answer: "Our outpatient (OP) consultation hours are from 7:00 AM to 2:00 PM and 5:00 PM to 7:00 PM. Emergency services are available 24/7."
    },
    {
      question: "Is there an emergency surgery facility available at night?",
      answer: "Yes, Dr. B. Sandeep and our surgical team are available for emergency cases 24/7. We handle acute appendix, trauma, and other urgent surgical needs at any time of the night."
    },
    {
      question: "Do you provide laser treatment for piles and fistula?",
      answer: "Yes, we specialize in advanced laser procedures for Piles, Fistula, Fissure, and Varicose Veins, which offer faster recovery and minimal pain."
    },
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment directly through our website form, by calling our helpline numbers, or by visiting the hospital reception in Eluru."
    }
  ];

  return (
    <section className="faq" id="faq">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-tag">Helpful Information</div>
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          <div className="divider"></div>
        </div>
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                <div className="faq-icon">+</div>
              </div>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
