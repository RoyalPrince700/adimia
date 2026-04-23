import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SITE_NAME,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  SUPPORT_HOURS,
} from '../constants/siteContact';
import ContentPageShell, { sectionH2, body, card, cardMuted, defaultPolicyPrimary } from '../components/ContentPageShell';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqCategories = [
    {
      title: "Ordering & Payment",
      faqs: [
        {
          question: "How do I place an order?",
          answer: "Browse our fabric collection, add items to your cart, and proceed to checkout. You'll receive a confirmation call to finalize your order details and payment."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit/debit cards, bank transfers, and digital payment methods including PayPal, Flutterwave, and direct bank transfers."
        },
        {
          question: "Is it safe to make payments on your website?",
          answer: "Yes, we use industry-standard SSL encryption and work with trusted payment processors to ensure your payment information is secure."
        },
        {
          question: "Can I modify my order after placing it?",
          answer: `Orders can be modified within 1 hour of placement. Please contact us immediately at ${CONTACT_PHONE} to make changes.`
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      faqs: [
        {
          question: "How long does delivery take?",
          answer: "Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available for ₦5,000 additional fee. Same-day delivery is available in Lagos for ₦10,000."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! Free standard shipping on all orders over ₦50,000. Orders under this amount have a ₦2,500 shipping fee."
        },
        {
          question: "Can I track my order?",
          answer: "Yes, you'll receive tracking information via SMS and email once your order ships. You can also track your order through your account dashboard."
        },
        {
          question: "What if my package is damaged during delivery?",
          answer: "Please take photos of the damaged packaging and contact us immediately. We'll arrange for a replacement or full refund at no cost to you."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 14 days of delivery. Items must be unused, in original packaging, and with tags attached. Customer pays return shipping unless the item is defective."
        },
        {
          question: "How do I return an item?",
          answer: "Contact our customer service team, receive a return authorization, package the item securely, and ship it back using our preferred courier. We'll process your refund within 5-7 business days."
        },
        {
          question: "Can I exchange an item for a different one?",
          answer: "Yes, exchanges are available within 14 days. There's a ₦2,000 processing fee, but shipping is free. Exchanges are subject to stock availability."
        },
        {
          question: "How long do refunds take to process?",
          answer: "Refunds are processed within 5-7 business days after we receive your returned item. The time for the refund to appear in your account depends on your payment method."
        }
      ]
    },
    {
      title: "Products & Quality",
      faqs: [
        {
          question: "Are your fabrics authentic and high quality?",
          answer: "Yes, we source our fabrics directly from reputable manufacturers and only sell genuine, high-quality materials. Each fabric undergoes quality control checks before shipping."
        },
        {
          question: "Do you provide fabric samples?",
          answer: "We offer fabric swatches for most items. You can request samples during checkout or by contacting our customer service team."
        },
        {
          question: "What care instructions do you provide?",
          answer: "Each fabric comes with detailed care instructions. Our team can also provide guidance on washing, ironing, and maintaining your fabrics."
        },
        {
          question: "Can you help me choose the right fabric for my project?",
          answer: "Absolutely! Our experienced team can provide recommendations based on your project needs, budget, and preferences. Contact us for personalized advice."
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ContentPageShell
      eyebrow="Support"
      headline="Frequently asked questions"
      subhead={`Quick answers about ordering, payments, shipping, returns, and product quality on ${SITE_NAME}.`}
      primaryCta={defaultPolicyPrimary}
      secondaryCta={{ to: '/product-category', children: 'Shop products' }}
      imageTagLeft="Quick answers"
      imageTagRight="Real support"
    >
      <div className="space-y-6">
        {faqCategories.map((category, categoryIndex) => (
          <section key={category.title} className={card}>
            <h2 className="mb-6 border-b border-slate-200 pb-4 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
              {category.title}
            </h2>

            <div className="space-y-4">
              {category.faqs.map((faq, faqIndex) => {
                const globalIndex = `${categoryIndex}-${faqIndex}`;
                return (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-900 transition-colors hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-lg"
                      onClick={() => toggleFaq(globalIndex)}
                    >
                      <span className="pr-4">{faq.question}</span>
                      <span className="flex-shrink-0 text-xl font-bold text-slate-400">
                        {activeIndex === globalIndex ? '−' : '+'}
                      </span>
                    </button>
                    {activeIndex === globalIndex && (
                      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className={cardMuted}>
        <h2 className={`${sectionH2} text-center`}>Still have questions?</h2>
        <p className={`${body} mt-3 text-center`}>
          Can&apos;t find what you&apos;re looking for? Reach us using the same details as on our{' '}
          <Link to="/contact-us" className="font-semibold text-slate-950 underline underline-offset-2 hover:text-slate-600">
            Contact
          </Link>{' '}
          page.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Call us',
              sub: SUPPORT_HOURS,
              node: (
                <a href={CONTACT_PHONE_TEL} className="mt-1 block font-semibold text-slate-950 hover:underline">
                  {CONTACT_PHONE}
                </a>
              ),
              icon: '📞',
            },
            {
              title: 'Email us',
              sub: 'We reply as soon as we can',
              node: (
                <a href={CONTACT_EMAIL_HREF} className="mt-1 block break-all font-semibold text-slate-950 hover:underline">
                  {CONTACT_EMAIL}
                </a>
              ),
              icon: '✉️',
            },
            {
              title: 'Social and messages',
              sub: 'TikTok and Instagram — links on Contact',
              node: null,
              icon: '💬',
            },
          ].map((col) => (
            <div key={col.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg">
                {col.icon}
              </div>
              <h3 className="font-semibold text-slate-900">{col.title}</h3>
              {col.node ? <div className="mt-1 text-sm">{col.node}</div> : null}
              <p className={`text-sm text-slate-500 ${col.node ? 'mt-2' : 'mt-1'}`}>{col.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
};

export default FAQ;
