import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import displayNARCurrency from '../helpers/displayCurrency';
import scrollTop from '../helpers/scrollTop';

const ProductGridCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product?._id}`}
      onClick={scrollTop}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-slate-50 p-4">
          <img
            src={product?.productImage?.[0]}
            alt={product?.productName}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
          {product?.badge || 'Preorder'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {product?.category}
        </p>
        <h3 className="mt-2 line-clamp-2 min-h-[48px] text-sm font-semibold leading-6 text-slate-900 sm:text-[15px]">
          {product?.productName}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-amber-500">
            <FaStar className="h-3.5 w-3.5" />
            <span className="font-semibold text-slate-800">{product?.rating || 4.5}</span>
          </div>
          <span className="text-slate-400">({product?.reviewCount || 0})</span>
        </div>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-lg font-bold text-slate-950">
            {displayNARCurrency(product?.sellingPrice)}
          </span>
          {product?.price > 0 && (
            <span className="text-sm text-slate-400 line-through">
              {displayNARCurrency(product?.price)}
            </span>
          )}
        </div>

        <p className="mt-2 text-xs text-slate-500">{product?.soldLabel || 'Preorder available'}</p>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {product?.productStatus || 'preorder'}
          </span>
          <span className="text-sm font-semibold text-amber-600 transition-colors group-hover:text-amber-700">
            View deal
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductGridCard;
