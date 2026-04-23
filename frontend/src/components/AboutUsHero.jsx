import React from 'react';
import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Clarity',
    text: 'Straight answers about what you are buying and what happens after you order.',
  },
  {
    title: 'Respect',
    text: 'Your time matters—fewer steps, no noisy hype, and help when something goes wrong.',
  },
  {
    title: 'Care',
    text: 'A small, focused team that treats support as part of the product, not an afterthought.',
  },
];

const AboutUsHero = () => {
  return (
    <section className="w-full px-0 sm:px-8 lg:px-16" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-none border border-b border-x-0 border-t-0 border-stone-200/90 bg-[linear-gradient(165deg,_#fafaf9_0%,_#f4f4f5_38%,_#e7e5e4_100%)] shadow-none sm:rounded-[36px] sm:border sm:border-slate-200/80 sm:shadow-[0_28px_100px_rgba(28,25,23,0.10)]">
        <div className="grid items-start gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:gap-14 lg:px-14 lg:py-14">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-3 rounded-full border border-stone-300/80 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-600">
              <span className="h-2 w-2 rounded-full bg-stone-800"></span>
              Our story
            </div>

            <h1
              id="about-heading"
              className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-stone-950 sm:text-5xl lg:text-[3.2rem] lg:leading-[1.06]"
            >
              About Adimia: the people and purpose behind the store.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
              Adimia is not a generic product grid with a logo slapped on top. We are a small, intentional team
              building a calmer way to buy tech and everyday essentials—where honest information, fast support, and
              thoughtful curation come before pushy sales copy.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
              When you read our policies, message us about an order, or unwrap your delivery, you are dealing with
              the same values we lead with on this page: trust, clarity, and respect for your time.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-stone-800"
              >
                Get in touch
              </Link>
              <Link
                to="/product-category"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white/90 px-6 py-3 text-sm font-semibold text-stone-800 transition-all duration-300 hover:border-stone-400 hover:bg-white"
              >
                Browse the store
              </Link>
            </div>

            <ul className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {values.map((v) => (
                <li
                  key={v.title}
                  className="rounded-2xl border border-stone-200/90 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold tracking-[-0.02em] text-stone-950">{v.title}</p>
                  <p className="mt-2 text-xs leading-5 text-stone-600 sm:text-[13px] sm:leading-6">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-[32px] border border-stone-200 bg-white/95 p-8 shadow-sm sm:p-10">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-stone-200/40 blur-3xl" aria-hidden />
              <div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-stone-300/30 blur-3xl" aria-hidden />

              <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">What guides us</p>
              <blockquote className="relative mt-5 border-l-2 border-stone-800 pl-5">
                <p className="text-lg font-medium leading-8 text-stone-800 sm:text-xl sm:leading-9">
                  &ldquo;We exist to make buying tech and essentials feel calmer: fewer surprises, clearer answers, and
                  support that actually shows up.&rdquo;
                </p>
              </blockquote>
              <p className="relative mt-6 text-sm text-stone-500">— How we work at Adimia</p>

              <div className="relative mt-8 rounded-2xl border border-dashed border-stone-300/90 bg-stone-50/80 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">Based on</p>
                <ul className="mt-3 space-y-2 text-sm text-stone-700">
                  <li className="flex gap-2">
                    <span className="text-stone-400" aria-hidden>
                      ·
                    </span>
                    Straightforward policies you can read without a dictionary
                  </li>
                  <li className="flex gap-2">
                    <span className="text-stone-400" aria-hidden>
                      ·
                    </span>
                    Real humans for order questions, not endless menus
                  </li>
                  <li className="flex gap-2">
                    <span className="text-stone-400" aria-hidden>
                      ·
                    </span>
                    Curation that favors dependable gear over empty trends
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
