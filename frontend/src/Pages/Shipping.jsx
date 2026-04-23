import React from 'react';

const Shipping = () => {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-kicker">Policy Center</span>
        <h1 className="page-title">Shipping & Delivery</h1>
        <p className="page-subtitle">
          Delivery guidance for Preordify orders, preorder timelines, shipping fees, and tracking support.
        </p>
      </header>

      <div className="page-grid">
        <section className="page-card">
          <h2 className="page-card-title">Delivery times</h2>
          <div className="space-y-4">
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Standard delivery</p>
              <p className="mt-1 text-sm text-slate-600">3 to 5 business days. Free on orders over ₦50,000.</p>
            </div>
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Express delivery</p>
              <p className="mt-1 text-sm text-slate-600">1 to 2 business days with a ₦5,000 additional fee.</p>
            </div>
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Same day delivery</p>
              <p className="mt-1 text-sm text-slate-600">Available in Lagos on qualifying orders placed before 12 PM.</p>
            </div>
          </div>
        </section>

        <section className="page-card-muted">
          <h2 className="page-card-title">Shipping costs and coverage</h2>
          <p className="page-copy">
            Shipping rates are calculated at checkout based on location, order size, and service level. Delivery is available across major cities in Nigeria, with selected international options available on request.
          </p>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="page-list-item"><span className="page-list-bullet">1</span><span>Free shipping on orders above ₦50,000.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">2</span><span>Standard rate of ₦2,500 for lower-value orders.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">3</span><span>Remote areas may require longer delivery windows.</span></div>
          </div>
        </section>
      </div>

      <section className="page-dark-card mt-6">
        <h2 className="text-2xl font-bold">Order tracking</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Preordify keeps buyers informed with order status updates by SMS, email, and in-app tracking where available.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"><span className="page-contact-label">Phone:</span><div className="mt-2 text-white">07019277357</div></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"><span className="page-contact-label">Email:</span><div className="mt-2 text-white">support@preordify.com</div></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"><span className="page-contact-label">Hours:</span><div className="mt-2 text-white">Mon-Fri 9AM-6PM</div></div>
        </div>
      </section>

      <section className="page-card mt-6">
        <h2 className="page-card-title text-center">Important shipping notes</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="page-soft-panel text-center">
            <p className="text-2xl">📦</p>
            <h3 className="mt-3 font-semibold text-slate-900">Secure packaging</h3>
            <p className="mt-2 text-sm text-slate-600">Orders are packed to reduce damage during transit and preserve presentation.</p>
          </div>
          <div className="page-soft-panel text-center">
            <p className="text-2xl">🚚</p>
            <h3 className="mt-3 font-semibold text-slate-900">Reliable logistics</h3>
            <p className="mt-2 text-sm text-slate-600">We work with vetted delivery partners for consistent handoff and tracking.</p>
          </div>
          <div className="page-soft-panel text-center">
            <p className="text-2xl">📞</p>
            <h3 className="mt-3 font-semibold text-slate-900">Delivery support</h3>
            <p className="mt-2 text-sm text-slate-600">Support is available if you need help with delivery timing or tracking issues.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;