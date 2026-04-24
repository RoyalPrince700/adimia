import { Link } from 'react-router-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';

const Cancel = () => {
  return (
    <div className="bg-white px-0 pb-12 pt-0 sm:px-8 sm:pt-[24px] lg:px-16 lg:pt-[24px]">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-none border border-b border-x-0 border-t-0 border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] shadow-none sm:rounded-[36px] sm:border sm:shadow-[0_30px_120px_rgba(15,23,42,0.10)]">
          <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="mx-auto max-w-lg text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Payment
              </div>

              <IoCloseCircleOutline
                className="mx-auto mt-10 text-7xl text-amber-600"
                aria-hidden
              />

              <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Payment cancelled
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                You left the payment screen before completing checkout. Nothing has been charged.
                Your cart is unchanged—continue when you’re ready.
              </p>

              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/checkout"
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 sm:w-auto"
                >
                  Try again
                </Link>
                <Link
                  to="/cart"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                >
                  Back to cart
                </Link>
              </div>

              <Link
                to="/collection"
                className="mt-8 inline-block text-sm font-medium text-slate-500 transition hover:text-slate-950"
              >
                Continue browsing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cancel;
