import React from 'react';

const Returns = () => {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-kicker">Policy Center</span>
        <h1 className="page-title">Returns & Exchanges</h1>
        <p className="page-subtitle">
          Preordify aims to keep returns clear, fair, and easy to understand before you buy.
        </p>
      </header>

      <div className="page-grid">
        <section className="page-card">
          <h2 className="page-card-title">Return and exchange policy</h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Return window</p>
              <p className="mt-1">Items can be returned within 14 days of delivery.</p>
            </div>
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Condition requirements</p>
              <p className="mt-1">Items must be unused, in original packaging, and include original tags where applicable.</p>
            </div>
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Exchange option</p>
              <p className="mt-1">Exchanges are available based on stock with a ₦2,000 processing fee and free exchange shipping.</p>
            </div>
          </div>
        </section>

        <section className="page-card-muted">
          <h2 className="page-card-title">How the return process works</h2>
          <div className="page-list text-sm">
            <div className="page-list-item"><span className="page-list-bullet">1</span><span>Contact Preordify support to start your return request.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">2</span><span>Securely package the item using the original packaging where possible.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">3</span><span>Ship it using the approved return method or courier instructions provided.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">4</span><span>Refunds are typically processed within 5 to 7 business days after inspection.</span></div>
          </div>
        </section>
      </div>

      <section className="page-dark-card mt-6">
        <h2 className="text-2xl font-bold">Returns contact</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Our returns team can guide you through exchange eligibility, damaged item claims, or refund processing.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"><span className="page-contact-label">Phone:</span><div className="mt-2 text-white">07019277357</div></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"><span className="page-contact-label">Email:</span><div className="mt-2 text-white">returns@preordify.com</div></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"><span className="page-contact-label">Hours:</span><div className="mt-2 text-white">Mon-Fri 9AM-6PM</div></div>
        </div>
      </section>

      <section className="page-card mt-6">
        <h2 className="page-card-title text-center">Items not eligible for return</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="page-soft-panel text-center"><p className="text-2xl">✂️</p><h3 className="mt-3 font-semibold text-slate-900">Altered items</h3><p className="mt-2 text-sm text-slate-600">Products that have been customized, cut, or modified after delivery.</p></div>
          <div className="page-soft-panel text-center"><p className="text-2xl">🧴</p><h3 className="mt-3 font-semibold text-slate-900">Used products</h3><p className="mt-2 text-sm text-slate-600">Items showing signs of use, wear, or handling beyond inspection.</p></div>
          <div className="page-soft-panel text-center"><p className="text-2xl">🏷️</p><h3 className="mt-3 font-semibold text-slate-900">Missing tags</h3><p className="mt-2 text-sm text-slate-600">Products returned without the original labels, tags, or identifying packaging.</p></div>
          <div className="page-soft-panel text-center"><p className="text-2xl">📦</p><h3 className="mt-3 font-semibold text-slate-900">Poor packaging</h3><p className="mt-2 text-sm text-slate-600">Returns damaged during transit because they were not packaged securely.</p></div>
        </div>
      </section>
    </div>
  );
};

export default Returns;