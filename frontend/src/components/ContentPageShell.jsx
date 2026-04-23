import React from 'react';
import Hero from './Hero';

/** Shared with Contact, About, and policy pages: section titles and panels */
export const kicker = 'text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500';
export const sectionH2 = 'mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl';
export const body = 'text-sm leading-7 text-slate-600 sm:text-base';
export const card = 'overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8';
export const cardMuted = 'rounded-[30px] border border-slate-200 bg-slate-50/80 p-6 shadow-sm sm:p-8';
export const soft = 'rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm';
export const num = 'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700';
export const grid2 = 'grid gap-6 md:grid-cols-2';
export const contactCell =
  'rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm';
export const contactLabel = 'text-sm font-medium text-slate-500';
export const defaultPolicyPrimary = { to: '/contact-us', children: 'Contact us' };
export const defaultPolicySecondary = { to: '/support', children: 'Support' };

const ContentPageShell = ({
  children,
  eyebrow = 'Policy',
  headline,
  subhead,
  primaryCta = defaultPolicyPrimary,
  secondaryCta = defaultPolicySecondary,
  imageTagLeft = 'Policy',
  imageTagRight = 'Clear info',
}) => (
  <div className="mt-0 bg-white pb-10 pt-0 sm:mt-6 sm:px-8 lg:mt-2 lg:px-16">
    <Hero
      eyebrow={eyebrow}
      headline={headline}
      subhead={subhead}
      showStats={false}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      imageTagLeft={imageTagLeft}
      imageTagRight={imageTagRight}
    />
    <div className="mx-auto mt-10 max-w-7xl space-y-6 px-4 sm:px-0 lg:mt-12">{children}</div>
  </div>
);

export default ContentPageShell;
