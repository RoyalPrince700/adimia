import React from 'react';
import {
  SITE_NAME,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_ADDRESS,
} from '../constants/siteContact';
import ContentPageShell, { kicker, sectionH2, body, card, cardMuted, soft, num, grid2 } from '../components/ContentPageShell';

const Privacy = () => {
  return (
    <ContentPageShell
      eyebrow="Policy"
      headline="Privacy Policy"
      subhead={`Learn how ${SITE_NAME} collects, uses, and protects customer data across browsing, checkout, order updates, and support interactions.`}
      imageTagLeft="Your data"
      imageTagRight="Protected"
    >
      <section className={card}>
        <h2 className={sectionH2}>Information we collect</h2>
        <div className={`${grid2} mt-6`}>
          {[
            ['Personal information', 'Name, email address, phone number, and shipping address when you create an account or place an order.'],
            ['Payment information', 'Payment details are processed securely through authorized payment partners and are not stored in plain text.'],
            ['Usage data', 'We track pages viewed, actions taken, and product interest signals to improve the storefront experience.'],
            ['Support history', 'Messages, order references, and service history may be stored so we can resolve issues efficiently.'],
          ].map(([title, text]) => (
            <div key={title} className={soft}>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={cardMuted}>
        <h2 className={sectionH2}>How we use your information</h2>
        <ol className="mt-6 space-y-3 text-slate-600">
          {[
            'Process and fulfill purchases and delivery updates.',
            'Provide customer support and respond to service inquiries.',
            'Send important transactional notifications related to orders and account activity.',
            'Improve site performance, merchandising, and user experience.',
            'Deliver marketing updates only when you have given consent.',
          ].map((line, i) => (
            <li key={line} className="flex gap-3">
              <span className={num}>{i + 1}</span>
              <span className="text-sm leading-7 sm:text-base">{line}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={card}>
        <h2 className={sectionH2}>Sharing and security</h2>
        <p className={`${body} mt-6`}>
          {SITE_NAME} does not sell or rent customer data. Information may be shared only with trusted service providers, payment
          processors, logistics partners, or when required by law. We protect data using SSL encryption, access controls, secure
          payment processing, and internal security practices designed to reduce unauthorized access.
        </p>
      </section>

      <div className={grid2}>
        <section className={card}>
          <h2 className={sectionH2}>Your rights</h2>
          <div className="mt-6 space-y-4">
            {[
              ['Access and update', 'You can review and update your account information at any time.'],
              ['Deletion requests', 'You may request deletion of your personal information, subject to operational and legal requirements.'],
              ['Marketing opt-out', 'You can unsubscribe from promotional communications whenever you choose.'],
            ].map(([t, b]) => (
              <div key={t}>
                <p className="font-semibold text-slate-900">{t}</p>
                <p className="mt-1 text-sm text-slate-600">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={cardMuted}>
          <p className={kicker}>Get in touch</p>
          <h2 className={sectionH2}>Privacy contact</h2>
          <p className={`${body} mt-3`}>If you have questions about how your information is handled, use the same contact details as on our Contact page.</p>
          <div className="mt-6 space-y-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 text-sm">
              <span className="text-slate-500">Email</span>
              <a href={CONTACT_EMAIL_HREF} className="shrink-0 break-all text-right text-sm font-semibold text-slate-950 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 text-sm">
              <span className="text-slate-500">Phone</span>
              <a href={CONTACT_PHONE_TEL} className="font-semibold text-slate-950 hover:underline">
                {CONTACT_PHONE}
              </a>
            </div>
            <div>
              <p className="text-sm text-slate-500">Address</p>
              <p className="mt-1 text-sm font-semibold text-slate-950">{CONTACT_ADDRESS}</p>
            </div>
          </div>
        </section>
      </div>

      <section className={`${cardMuted} text-center`}>
        <h2 className={sectionH2}>Policy updates</h2>
        <p className={`${body} mx-auto mt-4 max-w-2xl`}>
          This policy may be updated from time to time to reflect operational, legal, or platform changes. Updated versions will be posted
          on this page.
        </p>
        <p className="mt-4 text-sm text-slate-500">Last updated: April 23, 2026</p>
      </section>
    </ContentPageShell>
  );
};

export default Privacy;
