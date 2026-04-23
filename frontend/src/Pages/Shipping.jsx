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

const Shipping = () => {
  return (
    <ContentPageShell
      eyebrow="Policy"
      headline="Shipping & Delivery"
      subhead={`Delivery guidance for ${SITE_NAME} orders, timelines, shipping fees, and tracking support.`}
      imageTagLeft="On the way"
      imageTagRight="Track orders"
    >
      <div className={grid2}>
        <section className={card}>
          <h2 className={sectionH2}>Delivery times</h2>
          <div className="mt-6 space-y-4">
            {[
              ['Standard delivery', '3 to 5 business days. Free on orders over ₦50,000.'],
              ['Express delivery', '1 to 2 business days with a ₦5,000 additional fee.'],
              ['Same day delivery', 'Available in Lagos on qualifying orders placed before 12 PM.'],
            ].map(([a, b]) => (
              <div key={a} className={soft}>
                <p className="font-semibold text-slate-900">{a}</p>
                <p className="mt-1 text-sm text-slate-600">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={cardMuted}>
          <h2 className={sectionH2}>Shipping costs and coverage</h2>
          <p className={`${body} mt-6`}>
            Shipping rates are calculated at checkout based on location, order size, and service level. Delivery is available across major
            cities in Nigeria, with selected international options available on request.
          </p>
          <ol className="mt-5 space-y-3 text-slate-600">
            {['Free shipping on orders above ₦50,000.', 'Standard rate of ₦2,500 for lower-value orders.', 'Remote areas may require longer delivery windows.'].map(
              (line, i) => (
                <li key={line} className="flex gap-3 text-sm sm:text-base">
                  <span className={num}>{i + 1}</span>
                  <span className="leading-7">{line}</span>
                </li>
              )
            )}
          </ol>
        </section>
      </div>

      <section className={cardMuted}>
        <p className={kicker}>Order tracking</p>
        <h2 className={sectionH2}>Need help with delivery?</h2>
        <p className={`${body} mt-3`}>
          {SITE_NAME} keeps buyers informed with order status updates by SMS, email, and in-app tracking where available. For help, use the same phone and
          email as on our Contact page.
        </p>
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
        <h2 className={`${sectionH2} text-center`}>Important shipping notes</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            ['📦', 'Secure packaging', 'Orders are packed to reduce damage during transit and preserve presentation.'],
            ['🚚', 'Reliable logistics', 'We work with vetted delivery partners for consistent handoff and tracking.'],
            ['📞', 'Delivery support', 'Support is available if you need help with delivery timing or tracking issues.'],
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

export default Shipping;
