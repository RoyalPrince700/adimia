import React from 'react';
import {
  SITE_NAME,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  SUPPORT_HOURS,
} from '../constants/siteContact';
import ContentPageShell, { kicker, sectionH2, body, card, cardMuted, soft, num, grid2 } from '../components/ContentPageShell';

const Returns = () => {
  return (
    <ContentPageShell
      eyebrow="Policy"
      headline="Returns & Exchanges"
      subhead={`${SITE_NAME} aims to keep returns clear, fair, and easy to understand before you buy.`}
      imageTagLeft="Hassle-free"
      imageTagRight="Fair process"
    >
      <div className={grid2}>
        <section className={card}>
          <h2 className={sectionH2}>Return and exchange policy</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            {[
              ['Return window', 'Items can be returned within 14 days of delivery.'],
              ['Condition requirements', 'Items must be unused, in original packaging, and include original tags where applicable.'],
              [
                'Exchange option',
                'Exchanges are available based on stock with a ₦2,000 processing fee and free exchange shipping.',
              ],
            ].map(([a, b]) => (
              <div key={a} className={soft}>
                <p className="font-semibold text-slate-900">{a}</p>
                <p className="mt-1">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={cardMuted}>
          <h2 className={sectionH2}>How the return process works</h2>
          <ol className="mt-6 space-y-3 text-slate-600">
            {[
              `Contact ${SITE_NAME} using the phone or email on our Contact page to start your return request.`,
              'Securely package the item using the original packaging where possible.',
              'Ship it using the approved return method or courier instructions provided.',
              'Refunds are typically processed within 5 to 7 business days after inspection.',
            ].map((line, i) => (
              <li key={line} className="flex gap-3 text-sm sm:text-base">
                <span className={num}>{i + 1}</span>
                <span className="leading-7">{line}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className={cardMuted}>
        <p className={kicker}>Returns</p>
        <h2 className={sectionH2}>Contact the returns team</h2>
        <p className={`${body} mt-3`}>Our team can guide you through exchange eligibility, damaged item claims, or refund processing.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Phone', el: <a href={CONTACT_PHONE_TEL} className="mt-1 block font-semibold text-slate-950 hover:underline">{CONTACT_PHONE}</a> },
            { label: 'Email', el: <a href={CONTACT_EMAIL_HREF} className="mt-1 block break-all font-semibold text-slate-950 hover:underline">{CONTACT_EMAIL}</a> },
            { label: 'Hours', el: <span className="mt-1 block font-semibold text-slate-950">{SUPPORT_HOURS}</span> },
          ].map((row) => (
            <div key={row.label} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm shadow-sm">
              <p className="font-medium text-slate-500">{row.label}</p>
              {row.el}
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className={`${sectionH2} text-center`}>Items not eligible for return</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['✂️', 'Altered items', 'Products that have been customized, cut, or modified after delivery.'],
            ['🧴', 'Used products', 'Items showing signs of use, wear, or handling beyond inspection.'],
            ['🏷️', 'Missing tags', 'Products returned without the original labels, tags, or identifying packaging.'],
            ['📦', 'Poor packaging', 'Returns damaged during transit because they were not packaged securely.'],
          ].map(([icon, t, p]) => (
            <div key={t} className={`${soft} text-center`}>
              <p className="text-2xl">{icon}</p>
              <h3 className="mt-3 font-semibold text-slate-900">{t}</h3>
              <p className="mt-2 text-sm text-slate-600">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </ContentPageShell>
  );
};

export default Returns;
