import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { IoCheckmarkCircle } from 'react-icons/io5';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const REF_KEYS = ['reference', 'trxref', 'transaction_id'];

/** Paystack normally uses query string; some hosts/SDKs put params in the hash fragment. */
function readPaymentReference(loc) {
  const searchPs = new URLSearchParams(loc.search || '');
  for (const k of REF_KEYS) {
    const v = searchPs.get(k);
    if (v && String(v).trim()) return String(v).trim();
  }

  let h = loc.hash || '';
  if (h.startsWith('#')) h = h.slice(1);
  if (!h) return '';

  const hashQs = h.includes('?') ? h.slice(h.indexOf('?') + 1) : h;
  if (hashQs.includes('=')) {
    const hashPs = new URLSearchParams(hashQs);
    for (const k of REF_KEYS) {
      const v = hashPs.get(k);
      if (v && String(v).trim()) return String(v).trim();
    }
  }

  const loose = /^reference=([^&]+)/i.exec(h);
  if (loose?.[1]) {
    try {
      return decodeURIComponent(loose[1].trim());
    } catch {
      return loose[1].trim();
    }
  }

  return '';
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Success = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [verifyOk, setVerifyOk] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const statusRaw = searchParams.get('status');
  const status = statusRaw ? statusRaw.toLowerCase() : null;

  const verificationKey = readPaymentReference(location);

  const isPaymentAbort = status === 'cancelled' || status === 'failed';

  useEffect(() => {
    if (isPaymentAbort) {
      return;
    }

    let cancelled = false;

    const finish = () => {
      if (!cancelled) {
        setLoading(false);
      }
    };

    (async () => {
      if (verificationKey) {
        /** Server uses `verifyProfile: quick`. One silent retry avoids rare race without stacking long delays (old UX was 5 rounds × heavy server retries). */
        const maxAttempts = 2;
        const delayBeforeRetryMs = 550;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          if (cancelled) return;
          if (attempt > 0) await sleep(delayBeforeRetryMs);
          if (cancelled) return;

          try {
            const response = await fetch(SummaryApi.verifyPayment.url, {
              method: SummaryApi.verifyPayment.method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ reference: verificationKey }),
              credentials: 'include',
            });
            const data = await response.json();
            if (cancelled) return;

            if (data.success) {
              setVerifyOk(true);
              toast.success('Order confirmed!');
              finish();
              return;
            }

            if (attempt === maxAttempts - 1) {
              setVerifyOk(false);
              toast.error(data.message || 'Failed to confirm order');
            }
          } catch {
            if (cancelled) return;
            if (attempt === maxAttempts - 1) {
              setVerifyOk(false);
              toast.error('Error confirming order');
            }
          }
        }

        finish();
        return;
      }

      if (status === 'successful' && !verificationKey) {
        if (!cancelled) {
          setVerifyOk(false);
          toast.error('Missing payment reference. Please contact support if you were charged.');
        }
        finish();
        return;
      }

      if (!status && !verificationKey) {
        if (!cancelled) {
          setVerifyOk(false);
        }
        finish();
        return;
      }

      if (!cancelled) {
        setVerifyOk(false);
      }
      finish();
    })();

    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search, location.hash, isPaymentAbort, status, verificationKey]);

  if (isPaymentAbort) {
    return <Navigate to="/cancel" replace />;
  }

  return (
    <div className="bg-white px-0 pb-12 pt-0 sm:px-8 sm:pt-[24px] lg:px-16 lg:pt-[24px]">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-none border border-b border-x-0 border-t-0 border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] shadow-none sm:rounded-[36px] sm:border sm:shadow-[0_30px_120px_rgba(15,23,42,0.10)]">
          <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="mx-auto max-w-lg text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                Payment
              </div>

              {loading ? (
                <>
                  <div className="mx-auto mt-10 h-16 w-16 animate-pulse rounded-full bg-slate-200" />
                  <h1 className="mt-8 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    Verifying payment…
                  </h1>
                  <p className="mt-4 max-w-md mx-auto text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    Payment has already succeeded with Paystack. We&apos;re attaching it to your
                    account—this usually completes in seconds.
                  </p>
                  <p className="mt-4 max-w-md mx-auto text-xs leading-relaxed text-slate-500 sm:text-sm">
                    You don&apos;t need to keep this tab open. You can visit{' '}
                    <Link
                      to="/account/orders"
                      className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-900"
                    >
                      My orders
                    </Link>{' '}
                    or your inbox later—the order often still completes in the background if you
                    leave early.
                  </p>
                </>
              ) : verifyOk ? (
                <>
                  <IoCheckmarkCircle
                    className="mx-auto mt-10 text-7xl text-emerald-600"
                    aria-hidden
                  />
                  <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    Payment successful
                  </h1>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    Your order is confirmed. You’ll find the details under your account orders.
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                      to="/account/orders"
                      className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 sm:w-auto"
                    >
                      View orders
                    </Link>
                    <Link
                      to="/collection"
                      className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                    >
                      Continue shopping
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="mx-auto mt-10 flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-2xl font-semibold text-slate-500">
                    ?
                  </div>
                  <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    We couldn’t confirm this payment
                  </h1>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    If you completed a charge, check your email or contact support. Otherwise you
                    can return to checkout and try again.
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                      to="/checkout"
                      className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 sm:w-auto"
                    >
                      Back to checkout
                    </Link>
                    <Link
                      to="/cart"
                      className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                    >
                      View cart
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Success;
