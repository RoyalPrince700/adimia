import React from 'react';

const PurchaseProtection = () => {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-kicker">Policy Center</span>
        <h1 className="page-title">Purchase Protection</h1>
        <p className="page-subtitle">
          Buy with more confidence on Preordify through secure payments, order visibility, and issue resolution support.
        </p>
      </header>

      <div className="page-grid">
        <section className="page-card">
          <h2 className="page-card-title">Protection coverage</h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div className="page-soft-panel"><p className="font-semibold text-slate-900">Secure payment</p><p className="mt-1">Transactions are protected with SSL encryption and handled through verified providers.</p></div>
            <div className="page-soft-panel"><p className="font-semibold text-slate-900">Quality review</p><p className="mt-1">Products are expected to meet listing quality standards before fulfillment or preorder dispatch.</p></div>
            <div className="page-soft-panel"><p className="font-semibold text-slate-900">Order visibility</p><p className="mt-1">Buyers receive confirmation, support access, and updates for qualified order issues.</p></div>
          </div>
        </section>

        <section className="page-card-muted">
          <h2 className="page-card-title">Resolution center</h2>
          <div className="space-y-4 text-sm text-slate-600">
            <p>Our team works to resolve purchase-related concerns quickly and fairly.</p>
            <div className="page-soft-panel"><span className="font-semibold text-slate-900">Response time:</span> within 24 hours</div>
            <div className="page-soft-panel"><span className="font-semibold text-slate-900">Resolution rate:</span> 98% positive outcomes</div>
            <div className="page-soft-panel"><span className="font-semibold text-slate-900">Support hours:</span> Mon-Fri 9AM-6PM</div>
          </div>
        </section>
      </div>

      <section className="page-card mt-6">
        <h2 className="page-card-title text-center">Our protection promise</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="page-soft-panel text-center"><p className="text-2xl">🔒</p><h3 className="mt-3 font-semibold text-slate-900">Secure transactions</h3><p className="mt-2 text-sm text-slate-600">Bank-level protection for payments and personal details.</p></div>
          <div className="page-soft-panel text-center"><p className="text-2xl">✅</p><h3 className="mt-3 font-semibold text-slate-900">Quality support</h3><p className="mt-2 text-sm text-slate-600">Issue handling for defective items, delivery concerns, and listing mismatches.</p></div>
          <div className="page-soft-panel text-center"><p className="text-2xl">🛡️</p><h3 className="mt-3 font-semibold text-slate-900">Buyer confidence</h3><p className="mt-2 text-sm text-slate-600">A clearer path to help when something goes wrong with an order.</p></div>
        </div>
      </section>

      <section className="page-grid mt-6">
        <section className="page-card">
          <h2 className="page-card-title">How to report an issue</h2>
          <div className="page-list text-sm">
            <div className="page-list-item"><span className="page-list-bullet">1</span><span>Contact support at 07019277357 or support@preordify.com.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">2</span><span>Provide your order number and a clear description of the issue.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">3</span><span>Include screenshots or photos when helpful.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">4</span><span>Receive an update or resolution path within 24 to 48 hours.</span></div>
          </div>
        </section>

        <section className="page-dark-card">
          <h2 className="text-2xl font-bold">Protection help</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            The Preordify protection team is available for order disputes, damaged items, and payment concerns.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <div><span className="page-contact-label">Phone:</span> 07019277357</div>
            <div><span className="page-contact-label">Email:</span> protection@preordify.com</div>
            <div><span className="page-contact-label">Live chat:</span> Available on website</div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default PurchaseProtection;