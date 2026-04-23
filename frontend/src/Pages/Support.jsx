import React, { useState } from 'react';

const Support = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'To place an order, select the product, add it to your cart, and proceed to checkout. You will receive a confirmation call to finalize your order.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order during the order confirmation call.',
    },
    {
      question: 'What payment methods are available?',
      answer: 'We only accept online payment methods.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Delivery is within 14 days.',
    },
    {
      question: 'What should I do if I have an issue with my order?',
      answer: 'Contact us at 09075799282 or email us at adimiaofficial@gmail.com, and we’ll assist you promptly.',
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="page-shell max-w-5xl">
      <header className="page-header">
        <span className="page-kicker">Support Center</span>
        <h1 className="page-title">Help for orders, delivery, and account questions.</h1>
        <p className="page-subtitle">
          Adimia support is designed to keep shoppers informed with quick answers, clear next steps, and direct contact options.
        </p>
      </header>

      <div className="page-card">
        <h2 className="page-card-title">Frequently asked support questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <button
                className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-900"
                onClick={() => toggleFaq(index)}
              >
                <span className="pr-4">{faq.question}</span>
                <span className="text-xl text-amber-600">{activeIndex === index ? '−' : '+'}</span>
              </button>
              {activeIndex === index && (
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="page-dark-card mt-6">
        <h2 className="text-2xl font-bold">Contact Adimia support</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          Reach out for help with order issues, preorder timing, payments, or tracking updates.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Phone</p>
            <a href="tel:09075799282" className="mt-2 block text-lg font-semibold text-white">09075799282</a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Email</p>
            <a href="mailto:adimiaofficial@gmail.com" className="mt-2 block text-lg font-semibold text-white">adimiaofficial@gmail.com</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
