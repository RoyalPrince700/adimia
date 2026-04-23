import React from 'react';

const Privacy = () => {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-kicker">Policy Center</span>
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-subtitle">
          Learn how Preordify collects, uses, and protects customer data across browsing, checkout, preorder updates, and support interactions.
        </p>
      </header>

      <div className="space-y-6">
        <section className="page-card">
          <h2 className="page-card-title">Information we collect</h2>
          <div className="page-grid">
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Personal information</p>
              <p className="mt-2 text-sm text-slate-600">Name, email address, phone number, and shipping address when you create an account or place an order.</p>
            </div>
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Payment information</p>
              <p className="mt-2 text-sm text-slate-600">Payment details are processed securely through authorized payment partners and are not stored in plain text.</p>
            </div>
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Usage data</p>
              <p className="mt-2 text-sm text-slate-600">We track pages viewed, actions taken, and product interest signals to improve the storefront experience.</p>
            </div>
            <div className="page-soft-panel">
              <p className="font-semibold text-slate-900">Support history</p>
              <p className="mt-2 text-sm text-slate-600">Messages, order references, and service history may be stored so we can resolve issues efficiently.</p>
            </div>
          </div>
        </section>

        <section className="page-card-muted">
          <h2 className="page-card-title">How we use your information</h2>
          <div className="page-list">
            <div className="page-list-item"><span className="page-list-bullet">1</span><span>Process and fulfill purchases, preorders, and delivery updates.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">2</span><span>Provide customer support and respond to service inquiries.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">3</span><span>Send important transactional notifications related to orders and account activity.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">4</span><span>Improve site performance, merchandising, and user experience.</span></div>
            <div className="page-list-item"><span className="page-list-bullet">5</span><span>Deliver marketing updates only when you have given consent.</span></div>
          </div>
        </section>

        <section className="page-card">
          <h2 className="page-card-title">Sharing and security</h2>
          <p className="page-copy">
            Preordify does not sell or rent customer data. Information may be shared only with trusted service providers, payment processors,
            logistics partners, or when required by law. We protect data using SSL encryption, access controls, secure payment processing,
            and internal security practices designed to reduce unauthorized access.
          </p>
        </section>

        <section className="page-grid">
          <section className="page-card">
            <h2 className="page-card-title">Your rights</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-900">Access and update</p>
                <p className="mt-1 text-sm text-slate-600">You can review and update your account information at any time.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Deletion requests</p>
                <p className="mt-1 text-sm text-slate-600">You may request deletion of your personal information, subject to operational and legal requirements.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Marketing opt-out</p>
                <p className="mt-1 text-sm text-slate-600">You can unsubscribe from promotional communications whenever you choose.</p>
              </div>
            </div>
          </section>

          <section className="page-dark-card">
            <h2 className="text-2xl font-bold">Privacy contact</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              If you have questions about how your information is handled, contact the Preordify privacy team.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div><span className="page-contact-label">Email:</span> privacy@preordify.com</div>
              <div><span className="page-contact-label">Phone:</span> 07019277357</div>
              <div><span className="page-contact-label">Address:</span> Lagos, Nigeria</div>
            </div>
          </section>
        </section>

        <section className="page-card-muted text-center">
          <h2 className="page-card-title">Policy updates</h2>
          <p className="page-copy max-w-3xl mx-auto">
            This policy may be updated from time to time to reflect operational, legal, or platform changes. Updated versions will be posted on this page.
          </p>
          <p className="mt-4 text-sm text-slate-500">Last updated: January 14, 2026</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;