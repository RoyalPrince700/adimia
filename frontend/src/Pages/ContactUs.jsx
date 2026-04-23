import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import VerticalCard from '../components/VerticalCard';
import { localProducts } from '../data/localProductCatalog';

const inputClass =
  'mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200';

const ContactUs = () => {
  const featured = localProducts.slice(0, 4);

  return (
    <div className="mt-0 bg-white pb-10 pt-0 sm:mt-6 sm:px-8 lg:mt-2 lg:px-16">
      <Hero
        eyebrow="Contact"
        headline="We would love to hear from you."
        subhead="Send a message about an order, a product, or anything else. Prefer voice? Call us directly—we are ready to help."
        primaryCta={{ href: 'tel:08168831108', children: 'Call 08168831108' }}
        secondaryCta={{ to: '/cart', children: 'View your cart' }}
        showStats={false}
        imageTagLeft="Quick replies"
        imageTagRight="Real people"
      />

      <section className="mx-auto mt-10 flex max-w-7xl flex-col gap-8 lg:mt-12 lg:flex-row lg:items-start">
        <div className="w-full min-w-0 max-w-3xl flex-1 px-4 sm:px-0">
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Message us</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">Send a note</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Share your name, email, and a short message. We will follow up as soon as we can.
            </p>

            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-800">
                  Your name
                </label>
                <input type="text" id="name" className={inputClass} placeholder="Your name" autoComplete="name" />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-800">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={inputClass}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium text-slate-800">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`${inputClass} resize-y min-h-[120px]`}
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 sm:w-auto"
              >
                Send message
              </button>
            </form>
          </div>
        </div>

        <div className="w-full px-4 sm:px-0 lg:sticky lg:top-28 lg:max-w-sm">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Direct line</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">Prefer to talk now?</h2>

            <div className="mt-6 space-y-4 rounded-[24px] border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <p>Phone</p>
                <a href="tel:08168831108" className="font-semibold text-slate-950 hover:underline">
                  08168831108
                </a>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500">Email</p>
                <a
                  href="mailto:Imisiadigun@gmail.com"
                  className="mt-1 block break-all text-sm font-semibold text-slate-950 hover:underline"
                >
                  Imisiadigun@gmail.com
                </a>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500">Social</p>
                <div className="mt-2 flex flex-col gap-2 text-sm font-semibold text-slate-950">
                  <a
                    href="https://www.tiktok.com/@adimia.world"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    TikTok — @adimia.world
                  </a>
                  <a
                    href="https://www.instagram.com/adimia.worldwide/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Instagram — @adimia.worldwide
                  </a>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Shopping something today? Add items in the product feed, then review everything in one place before
              checkout.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/cart"
                className="w-full rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
              >
                Open cart
              </Link>
              <Link
                to="/product-category"
                className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 px-4 sm:px-8 lg:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-wide text-slate-800 sm:text-3xl md:text-4xl">While you are here</h2>
            <p className="mt-2 text-slate-500">Explore the same product cards used across the store.</p>
            <div className="mx-auto mt-3 h-0.5 w-16 bg-slate-800 sm:w-24" />
          </div>
          <VerticalCard loading={false} data={featured} />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
