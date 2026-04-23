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

const Terms = () => {
  return (
    <ContentPageShell
      eyebrow="Policy"
      headline="Terms & Conditions"
      subhead={`Review the rules and responsibilities that govern how ${SITE_NAME} products, checkout, and platform services are used.`}
      imageTagLeft="Fair use"
      imageTagRight="Clear terms"
    >
      <section className={card}>
        <h2 className={sectionH2}>Acceptance of terms</h2>
        <p className={`${body} mt-6`}>
          By accessing and using the {SITE_NAME} website and services, you agree to these terms. If you do not accept them, please do not use
          the platform.
        </p>
      </section>

      <section className={cardMuted}>
        <h2 className={sectionH2}>Use license</h2>
        <div className="mt-6 space-y-4">
          <div>
            <p className="font-semibold text-slate-900">Permission granted</p>
            <p className="mt-1 text-sm text-slate-600">You may temporarily access materials on the {SITE_NAME} website for personal, non-commercial viewing.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Prohibited uses</p>
            <p className="mt-1 text-sm text-slate-600">You may not modify, reproduce, distribute, sell, or create derivative works from platform materials without approval.</p>
          </div>
        </div>
      </section>

      <div className={grid2}>
        <section className={card}>
          <h2 className={sectionH2}>Product information and pricing</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600 sm:text-base">
            <p>We aim to provide accurate product descriptions, availability, and pricing, but errors may occasionally occur.</p>
            <p>Prices and availability may change without notice, including for limited drops or inventory-based offers.</p>
          </div>
        </section>

        <section className={card}>
          <h2 className={sectionH2}>Orders and payments</h2>
          <ul className="mt-6 space-y-3 text-slate-600">
            {[
              'All orders are subject to acceptance and availability.',
              'Payment must be completed before order processing begins.',
              'We may refuse or cancel an order where necessary.',
              'Payments are processed through authorized payment providers.',
            ].map((line, i) => (
              <li key={line} className="flex gap-3 text-sm sm:text-base">
                <span className={num}>{i + 1}</span>
                <span className="leading-7">{line}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className={card}>
        <h2 className={sectionH2}>Delivery, refunds, and conduct</h2>
        <div className={`${grid2} mt-6`}>
          {[
            ['Shipping and delivery', 'Delivery timelines are estimates and may vary due to carrier performance, demand cycles, or location.'],
            ['Returns and refunds', 'Returns are handled according to our return policy, including condition checks and processing timelines.'],
            [
              'User conduct',
              'Users must not engage in fraud, unlawful activity, service disruption, unauthorized access attempts, or misuse of platform systems.',
            ],
          ].map(([title, t]) => (
            <div key={title} className={title === 'User conduct' ? `${soft} md:col-span-2` : soft}>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-2 text-sm text-slate-600">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={cardMuted}>
        <p className={kicker}>Legal</p>
        <h2 className={sectionH2}>Questions about these terms</h2>
        <p className={`${body} mt-3`}>
          Contact us at the same address and phone we list on our Contact page.
        </p>
        <div className="mt-6 space-y-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 text-sm">
            <span className="text-slate-500">Email</span>
            <a href={CONTACT_EMAIL_HREF} className="shrink-0 break-all text-right text-sm font-semibold text-slate-950 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="text-slate-500">Phone</span>
            <a href={CONTACT_PHONE_TEL} className="font-semibold text-slate-950 hover:underline">
              {CONTACT_PHONE}
            </a>
          </div>
          <p className="pt-1 text-sm text-slate-600">
            <span className="font-medium text-slate-800">Address:</span> {CONTACT_ADDRESS}
          </p>
        </div>
      </section>

      <section className={`${cardMuted} text-center`}>
        <h2 className={sectionH2}>Terms updates</h2>
        <p className={`${body} mx-auto mt-4 max-w-2xl`}>
          These terms may be revised from time to time. Updated versions become effective when published on this page.
        </p>
        <p className="mt-4 text-sm text-slate-500">Last updated: April 23, 2026</p>
      </section>
    </ContentPageShell>
  );
};

export default Terms;
