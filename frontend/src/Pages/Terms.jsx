import React from 'react';

const Terms = () => {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-kicker">Policy Center</span>
        <h1 className="page-title">Terms & Conditions</h1>
        <p className="page-subtitle">
          Review the rules and responsibilities that govern how Preordify products, checkout flows, and platform services are used.
        </p>
      </header>

      <div className="space-y-6">
        <section className="page-card">
          <h2 className="page-card-title">Acceptance of terms</h2>
          <p className="page-copy">
            By accessing and using the Preordify website and services, you agree to these terms. If you do not accept them, please do not use the platform.
          </p>
        </section>

        <section className="page-card-muted">
          <h2 className="page-card-title">Use license</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-900">Permission granted</p>
              <p className="mt-1 text-sm text-slate-600">You may temporarily access materials on the Preordify website for personal, non-commercial viewing.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Prohibited uses</p>
              <p className="mt-1 text-sm text-slate-600">You may not modify, reproduce, distribute, sell, or create derivative works from platform materials without approval.</p>
            </div>
          </div>
        </section>

        <section className="page-grid">
          <section className="page-card">
            <h2 className="page-card-title">Product information and pricing</h2>
            <div className="space-y-4 text-sm text-slate-600">
              <p>We aim to provide accurate product descriptions, availability, and pricing, but errors may occasionally occur.</p>
              <p>Prices and availability may change without notice, especially for preorder campaigns, limited drops, or inventory-based offers.</p>
            </div>
          </section>

          <section className="page-card">
            <h2 className="page-card-title">Orders and payments</h2>
            <div className="page-list text-sm">
              <div className="page-list-item"><span className="page-list-bullet">1</span><span>All orders are subject to acceptance and availability.</span></div>
              <div className="page-list-item"><span className="page-list-bullet">2</span><span>Payment must be completed before order processing begins.</span></div>
              <div className="page-list-item"><span className="page-list-bullet">3</span><span>We may refuse or cancel an order where necessary.</span></div>
              <div className="page-list-item"><span className="page-list-bullet">4</span><span>Payments are processed through authorized payment providers.</span></div>
            </div>
          </section>
        </section>

        <section className="page-card">
          <h2 className="page-card-title">Delivery, refunds, and conduct</h2>
          <div className="page-grid">
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Shipping and delivery</p>
              <p className="mt-2 text-sm text-slate-600">Delivery timelines are estimates and may vary due to carrier performance, demand cycles, or location.</p>
            </div>
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Returns and refunds</p>
              <p className="mt-2 text-sm text-slate-600">Returns are handled according to our return policy, including condition checks and processing timelines.</p>
            </div>
            <div className="page-soft-panel md:col-span-2">
              <p className="font-semibold text-slate-900">User conduct</p>
              <p className="mt-2 text-sm text-slate-600">Users must not engage in fraud, unlawful activity, service disruption, unauthorized access attempts, or misuse of platform systems.</p>
            </div>
          </div>
        </section>

        <section className="page-dark-card">
          <h2 className="text-2xl font-bold">Legal contact</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Questions about these terms can be directed to the Preordify legal and compliance team.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <div><span className="page-contact-label">Email:</span> legal@preordify.com</div>
            <div><span className="page-contact-label">Phone:</span> 07019277357</div>
            <div><span className="page-contact-label">Address:</span> Lagos, Nigeria</div>
          </div>
        </section>

        <section className="page-card-muted text-center">
          <h2 className="page-card-title">Terms updates</h2>
          <p className="page-copy max-w-3xl mx-auto">
            These terms may be revised from time to time. Updated versions become effective when published on this page.
          </p>
          <p className="mt-4 text-sm text-slate-500">Last updated: January 14, 2026</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;