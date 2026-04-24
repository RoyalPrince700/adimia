import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/apple/Apple macbook pro 16 .png';

const ctaClass = {
  primary:
    'inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800',
  secondary:
    'inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50',
};

const HeroCta = ({ cta, variant }) => {
  if (!cta?.children) return null;
  const className = ctaClass[variant] || ctaClass.primary;
  if (cta.href) {
    return (
      <a href={cta.href} className={className}>
        {cta.children}
      </a>
    );
  }
  return (
    <Link to={cta.to} className={className}>
      {cta.children}
    </Link>
  );
};

const defaultStats = [
  { value: 'Tech + Fashion', label: 'Collections' },
  { value: '30+', label: 'Products' },
  { value: '100%', label: 'Visual-first' },
];

const Hero = ({
  eyebrow = 'Tech and fashion, curated',
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  showStats = true,
  customStats = defaultStats,
  imageSrc = heroImg,
  imageAlt = 'Premium tech and fashion collection',
  showImageTags = true,
  imageTagLeft = 'Minimal product storytelling',
  imageTagRight = 'Refined browsing experience',
}) => {
  if (!headline) {
    return (
      <section className="w-full px-0 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-none border border-b border-x-0 border-t-0 border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] shadow-none sm:rounded-[36px] sm:border sm:shadow-[0_30px_120px_rgba(15,23,42,0.10)]">
          <div className="grid items-center gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-14">
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 backdrop-blur sm:mb-6">
                <span className="h-2 w-2 rounded-full bg-slate-900"></span>
                Tech and fashion, curated
              </div>

              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
                <span className="sm:hidden">Shop standout tech and style in one place.</span>
                <span className="hidden sm:inline">
                  Smart tech and fashion essentials, presented with a cleaner premium feel.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                <span className="sm:hidden">Phones, fits, and everyday essentials without the extra noise.</span>
                <span className="hidden sm:inline">
                  Explore a refined mix of smartphones, accessories, and fashion pieces in a sleek
                  shopping experience built to feel polished, modern, and easy to trust.
                </span>
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/product-category"
                  className={ctaClass.primary}
                >
                  <span className="sm:hidden">Shop Now</span>
                  <span className="hidden sm:inline">Explore Collection</span>
                </Link>
                <Link
                  to="/"
                  className={ctaClass.secondary}
                >
                  <span className="sm:hidden">See Latest</span>
                  <span className="hidden sm:inline">Browse Latest Picks</span>
                </Link>
              </div>

              {showStats && (
                <div className="mt-10 hidden max-w-xl grid-cols-3 gap-3 sm:grid">
                  {defaultStats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-3xl border border-slate-200 bg-white/85 px-4 py-4"
                    >
                      <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{s.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-x-12 bottom-6 h-16 rounded-full bg-slate-300/40 blur-3xl"></div>
              {showImageTags && (
                <>
                  <div className="absolute left-0 top-6 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
                    {imageTagLeft}
                  </div>
                  <div className="absolute bottom-10 right-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
                    {imageTagRight}
                  </div>
                </>
              )}

              <div className="relative w-full rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(226,232,240,0.85)_58%,_rgba(203,213,225,0.70))] p-6 sm:p-8">
                <img
                  className="relative z-[1] w-full object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.18)]"
                  src={imageSrc}
                  alt={imageAlt}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-0 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-none border border-b border-x-0 border-t-0 border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] shadow-none sm:rounded-[36px] sm:border sm:shadow-[0_30px_120px_rgba(15,23,42,0.10)]">
        <div className="grid items-center gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-14">
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 backdrop-blur sm:mb-6">
              <span className="h-2 w-2 rounded-full bg-slate-900"></span>
              {eyebrow}
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
              {headline}
            </h1>

            {subhead && (
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">{subhead}</p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <HeroCta cta={primaryCta} variant="primary" />
                <HeroCta cta={secondaryCta} variant="secondary" />
              </div>
            )}

            {showStats && customStats?.length > 0 && (
              <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {customStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-3xl border border-slate-200 bg-white/85 px-4 py-4"
                  >
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{s.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-x-12 bottom-6 h-16 rounded-full bg-slate-300/40 blur-3xl"></div>
            {showImageTags && (
              <>
                <div className="absolute left-0 top-6 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
                  {imageTagLeft}
                </div>
                <div className="absolute bottom-10 right-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
                  {imageTagRight}
                </div>
              </>
            )}

            <div className="relative w-full rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(226,232,240,0.85)_58%,_rgba(203,213,225,0.70))] p-6 sm:p-8">
              <img
                className="relative z-[1] w-full object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.18)]"
                src={imageSrc}
                alt={imageAlt}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
