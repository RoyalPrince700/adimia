import React, { useState } from 'react';
import { SITE_NAME, CONTACT_PHONE, CONTACT_EMAIL, CONTACT_EMAIL_HREF } from '../constants/siteContact';
import ContentPageShell, { sectionH2, body, card, cardMuted, defaultPolicyPrimary, defaultPolicySecondary } from '../components/ContentPageShell';

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
      answer: `Contact us at ${CONTACT_PHONE} or email us at ${CONTACT_EMAIL}, and we will assist you promptly.`,
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ContentPageShell
      eyebrow="Support"
      headline="Help for orders, delivery, and account"
      subhead={`${SITE_NAME} support is designed to keep shoppers informed with quick answers, clear next steps, and direct contact options.`}
      primaryCta={defaultPolicyPrimary}
      secondaryCta={defaultPolicySecondary}
      imageTagLeft="Help center"
      imageTagRight="We reply fast"
    >
      <section className={card}>
        <h2 className={sectionH2}>Frequently asked support questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-900 transition-colors hover:text-slate-600 focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="pr-4">{faq.question}</span>
                <span className="text-xl text-slate-400">{activeIndex === index ? '−' : '+'}</span>
              </button>
              {activeIndex === index && <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className={cardMuted}>
        <h2 className={sectionH2}>Contact {SITE_NAME} support</h2>
        <p className={`${body} mt-3`}>Reach out for help with order issues, payments, or tracking updates.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Phone</p>
            <a href={`tel:${CONTACT_PHONE}`} className="mt-2 block text-lg font-semibold text-slate-950 hover:underline">
              {CONTACT_PHONE}
            </a>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Email</p>
            <a href={CONTACT_EMAIL_HREF} className="mt-2 block break-all text-lg font-semibold text-slate-950 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </ContentPageShell>
  );
};

export default Support;
