import React from 'react';
import scrollTop from '../helpers/scrollTop';
import displayNARCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const formatCategory = (value) =>
    String(value || '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
      {loading
        ? loadingList.map((_, index) => (
            <div
              key={index}
              className="flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:rounded-[28px]"
              aria-hidden
            >
              <div className="relative overflow-hidden bg-white px-3 pt-3 sm:px-6 sm:pt-6">
                <div className="absolute left-3 top-3 z-10 h-5 w-[4.5rem] rounded-full bg-slate-200/90 animate-pulse sm:left-5 sm:top-5" />
                <div className="absolute right-3 top-3 z-10 h-5 w-10 rounded-full bg-slate-200/90 animate-pulse sm:right-5 sm:top-5" />
                <div className="relative flex h-40 items-center justify-center sm:h-64">
                  <div className="absolute inset-x-6 bottom-3 h-8 rounded-full bg-slate-200/40 blur-2xl sm:inset-x-10 sm:bottom-5 sm:h-10" />
                  <div className="relative z-[1] h-32 w-32 rounded-2xl bg-slate-100/90 animate-pulse sm:h-44 sm:w-44" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5">
                <div className="space-y-2">
                  <div className="h-4 w-full rounded-md bg-slate-200/90 animate-pulse sm:h-5" />
                  <div className="h-4 w-[88%] rounded-md bg-slate-200/90 animate-pulse sm:h-5" />
                  <div className="h-3 w-full rounded-md bg-slate-200/50 animate-pulse sm:h-4" />
                  <div className="h-3 w-3/4 rounded-md bg-slate-200/50 animate-pulse sm:h-4" />
                </div>
                <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pt-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="h-3 w-14 rounded bg-slate-200/60 animate-pulse" />
                    <div className="h-6 w-24 rounded-md bg-slate-200/90 animate-pulse sm:h-7 sm:w-28" />
                  </div>
                  <div className="h-10 w-full max-w-full rounded-full border border-slate-200/80 bg-slate-50/90 animate-pulse sm:h-11 sm:max-w-[7.5rem]" />
                </div>
              </div>
            </div>
          ))
        : data.map((product) => (
            <Link
              to={`/product/${product?._id}`}
              key={product?._id}
              onClick={scrollTop}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:rounded-[28px]"
            >
              <div className="relative overflow-hidden bg-white px-3 pt-3 sm:px-6 sm:pt-6">
                <div className="absolute left-3 top-3 z-10 max-w-[55%] truncate rounded-full border border-white/70 bg-white/80 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 backdrop-blur sm:left-5 sm:top-5 sm:max-w-none sm:px-3 sm:text-[11px] sm:tracking-[0.18em]">
                  {formatCategory(product?.category)}
                </div>
                <div className="absolute right-3 top-3 z-10 rounded-full bg-slate-900 px-2 py-1 text-[9px] font-medium text-white sm:right-5 sm:top-5 sm:px-3 sm:text-[11px]">
                  New
                </div>

                <div className="relative flex h-40 items-center justify-center sm:h-64">
                  <div className="absolute inset-x-6 bottom-3 h-8 rounded-full bg-slate-300/30 blur-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-400/30 sm:inset-x-10 sm:bottom-5 sm:h-10"></div>
                  <img
                    src={product?.productImage?.[0]}
                    alt={product?.productName}
                    className="relative z-[1] h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5">
                <div className="space-y-2">
                  <h3 className="line-clamp-2 text-sm font-semibold tracking-[-0.02em] text-slate-950 sm:text-lg">
                    {product?.productName}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                    {product?.description || `Premium ${product?.category} designed for everyday use.`}
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pt-4">
                  <div className="flex flex-col">
                    {product?.price > 0 && (
                      <p className="text-xs text-slate-400 line-through sm:text-sm">
                        {displayNARCurrency(product?.price)}
                      </p>
                    )}
                    <p className="text-base font-semibold tracking-[-0.03em] text-slate-950 sm:text-xl">
                      {displayNARCurrency(product?.sellingPrice)}
                    </p>
                  </div>

                  <div className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition-all duration-300 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white sm:w-auto sm:gap-2 sm:px-4 sm:text-sm">
                    View
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCard;
