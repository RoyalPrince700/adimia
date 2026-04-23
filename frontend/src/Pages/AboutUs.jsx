import React from 'react';
import { Link } from 'react-router-dom';
import AboutUsHero from '../components/AboutUsHero';
import VerticalCard from '../components/VerticalCard';
import { localProducts } from '../data/localProductCatalog';

const aboutCards = [
  {
    title: 'Our mission',
    body:
      'At Adimia, our mission is to make it simple to find quality products you can trust. We focus on a fast, transparent experience from browse to checkout, with responsive support at every step.',
  },
  {
    title: 'Who we are',
    body:
      'Adimia is an e-commerce platform built for people who value clarity and good design. We curate devices and everyday essentials and back them with dependable service so you can shop with confidence. Shopping online should feel effortless—that is why we invest in a polished storefront, clear product information, and a team that is here when you need help.',
  },
  {
    title: 'What we offer',
    isList: true,
    items: [
      'Curated devices and quality essentials in one place',
      'Secure checkout and clear order updates',
      'Reliable support for orders, delivery, and product questions',
      'Fast, friendly help when you need it',
    ],
  },
];

const AboutUs = () => {
  const featured = localProducts.slice(0, 4);

  return (
    <div className="mt-0 bg-white pb-10 pt-0 sm:mt-6 sm:px-8 lg:mt-2 lg:px-16">
      <AboutUsHero />

      <section className="mx-auto mt-10 flex max-w-7xl flex-col gap-8 lg:mt-12 lg:flex-row lg:items-start">
        <div className="w-full min-w-0 max-w-4xl flex-1 space-y-4 px-4 sm:px-0">
          {aboutCards.map((card) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] sm:p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">About</p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl">{card.title}</h2>
              {card.isList ? (
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{card.body}</p>
              )}
            </div>
          ))}
        </div>

        <div className="w-full px-4 sm:px-0 lg:sticky lg:top-28 lg:max-w-sm">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Get in touch</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">We are here to help</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Questions about products or an order? Reach us on phone or email, or open your bag when you are ready
              to check out.
            </p>

            <div className="mt-6 space-y-4 rounded-[24px] border border-slate-200 bg-white p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Phone</p>
                <a href="tel:09075799282" className="mt-1 block text-sm font-semibold text-slate-950 hover:underline">
                  09075799282
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Email</p>
                <a
                  href="mailto:adimiaofficial@gmail.com"
                  className="mt-1 block break-all text-sm font-semibold text-slate-950 hover:underline"
                >
                  adimiaofficial@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/cart"
                className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
              >
                View your cart
              </Link>
              <Link
                to="/product-category"
                className="w-full rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
              >
                Shop the collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 px-4 sm:px-8 lg:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-wide text-slate-800 sm:text-3xl md:text-4xl">
              The kind of products we stand behind
            </h2>
            <p className="mt-2 text-slate-500">
              A few examples from our catalog—the same curation and presentation you will see in the main shop.
            </p>
            <div className="mx-auto mt-3 h-0.5 w-16 bg-slate-800 sm:w-24" />
          </div>
          <VerticalCard loading={false} data={featured} />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
