import React from 'react';
import {
  SITE_NAME,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
} from '../constants/siteContact';
import ContentPageShell, { kicker, sectionH2, body, card, cardMuted, soft, num, grid2 } from '../components/ContentPageShell';

const PurchaseProtection = () => {
  return (
    <ContentPageShell
      eyebrow="Policy"
      headline="Purchase Protection"
      subhead={`Buy with more confidence on ${SITE_NAME} through secure payments, order visibility, and issue resolution support.`}
      imageTagLeft="Secure"
      imageTagRight="Covered"
    >
      <div className={grid2}>
        <section className={card}>
          <h2 className={sectionH2}>Protection coverage</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            {[
              ['Secure payment', 'Transactions are protected with SSL encryption and handled through verified providers.'],
              ['Quality review', 'Products are expected to meet listing quality standards before fulfillment and dispatch.'],
              ['Order visibility', 'Buyers receive confirmation, support access, and updates for qualified order issues.'],
            ].map(([a, b]) => (
              <div key={a} className={soft}>
                <p className="font-semibold text-slate-900">{a}</p>
                <p className="mt-1">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={cardMuted}>
          <h2 className={sectionH2}>Resolution center</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <p>Our team works to resolve purchase-related concerns quickly and fairly.</p>
            {[
              ['Response time', 'within 24 hours'],
              ['Resolution rate', '98% positive outcomes'],
              ['Support hours', 'Mon-Fri 9AM-6PM'],
            ].map(([label, val]) => (
              <div key={label} className={soft}>
                <span className="font-semibold text-slate-900">{label}:</span> {val}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className={card}>
        <h2 className={`${sectionH2} text-center`}>Our protection promise</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            ['🔒', 'Secure transactions', 'Bank-level protection for payments and personal details.'],
            ['✅', 'Quality support', 'Issue handling for defective items, delivery concerns, and listing mismatches.'],
            ['🛡️', 'Buyer confidence', 'A clearer path to help when something goes wrong with an order.'],
          ].map(([icon, t, p]) => (
            <div key={t} className={`${soft} text-center`}>
              <p className="text-2xl">{icon}</p>
              <h3 className="mt-3 font-semibold text-slate-900">{t}</h3>
              <p className="mt-2 text-sm text-slate-600">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <div className={grid2}>
        <section className={card}>
          <h2 className={sectionH2}>How to report an issue</h2>
          <ul className="mt-6 space-y-3 text-slate-600">
            {[
              `Contact us at ${CONTACT_PHONE} or ${CONTACT_EMAIL} (same as our Contact and Support pages).`,
              'Provide your order number and a clear description of the issue.',
              'Include screenshots or photos when helpful.',
              'Receive an update or resolution path within 24 to 48 hours.',
            ].map((line, i) => (
              <li key={line} className="flex gap-3 text-sm sm:text-base">
                <span className={num}>{i + 1}</span>
                <span className="leading-7">{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={cardMuted}>
          <p className={kicker}>Support</p>
          <h2 className={sectionH2}>Protection help</h2>
          <p className={`${body} mt-3`}>
            The {SITE_NAME} team is available for order disputes, damaged items, and payment concerns. Use the same contact details as on our
            Contact page.
          </p>
          <div className="mt-6 space-y-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 text-sm">
              <span className="text-slate-500">Phone</span>
              <a href={CONTACT_PHONE_TEL} className="font-semibold text-slate-950 hover:underline">
                {CONTACT_PHONE}
              </a>
            </div>
            <div className="border-b border-slate-100 pb-3 text-sm">
              <span className="text-slate-500">Email</span>
              <a
                href={CONTACT_EMAIL_HREF}
                className="mt-1 block break-all font-semibold text-slate-950 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <p className="text-sm text-slate-600">Social: TikTok and Instagram links on the Contact page</p>
          </div>
        </section>
      </div>
    </ContentPageShell>
  );
};

export default PurchaseProtection;
