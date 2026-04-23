import React from 'react';
import { Link } from 'react-router-dom';
import { FaTiktok, FaInstagram } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="mt-16 px-4 pb-10 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[36px] border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.96)_40%,_rgba(241,245,249,0.98))] shadow-[0_30px_120px_rgba(15,23,42,0.08)]">
          <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:px-10 lg:py-10">
            <div>
              <Logo />
              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
                A refined shopping destination for modern devices and curated essentials,
                designed with a cleaner, more premium browsing experience.
              </p>
              <div className="mt-6 flex items-center gap-3 text-lg text-slate-600">
                <a
                  href="https://www.tiktok.com/@adimia.world"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Adimia on TikTok"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-slate-300 hover:text-slate-950"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://www.instagram.com/adimia.worldwide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Adimia on Instagram"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-slate-300 hover:text-slate-950"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Shop</p>
              <div className="mt-5 flex flex-col gap-4 text-sm text-slate-600">
                <Link to="/" className="transition hover:text-slate-950">Home</Link>
                <Link to="/collection" className="transition hover:text-slate-950">Collection</Link>
                <Link to="/cart" className="transition hover:text-slate-950">Cart</Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Company</p>
              <div className="mt-5 flex flex-col gap-4 text-sm text-slate-600">
                <Link to="/about-us" className="transition hover:text-slate-950">About Adimia</Link>
                <Link to="/contact-us" className="transition hover:text-slate-950">Contact</Link>
                <Link to="/support" className="transition hover:text-slate-950">Support</Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Contact</p>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <p>08168831108</p>
                <p>Imisiadigun@gmail.com</p>
                <p>Always here to help with orders, questions, and product support.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200/80 px-6 py-5 text-sm text-slate-500 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <p>&copy; 2024 Adimia. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <a href="/privacy" className="transition hover:text-slate-950">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
