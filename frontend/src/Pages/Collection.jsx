import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const categoryContent = {
  airpodes: {
    label: 'Airpodes',
    description:
      'Wireless earbuds and everyday audio picks with a cleaner premium presentation.',
  },
  watches: {
    label: 'Watches',
    description: 'Smart watches that keep fitness, notifications, and style close at hand.',
  },
  mobiles: {
    label: 'Mobiles',
    description: 'Modern smartphones selected for performance, storage, and daily reliability.',
  },
  laptops: {
    label: 'Laptops',
    description: 'Premium laptops designed for work, creativity, portability, and smooth multitasking.',
  },
};

const categoryOrder = ['airpodes', 'watches', 'mobiles', 'laptops'];

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await fetch(SummaryApi.allProduct.url, {
          method: SummaryApi.allProduct.method,
          headers: { 'Content-Type': 'application/json' },
        });
        const json = await response.json();
        setProducts(json?.data || []);
      } catch (e) {
        console.error(e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const byCategory = useMemo(() => {
    const m = new Map();
    for (const p of products) {
      const c = p?.category;
      if (!c) continue;
      if (!m.has(c)) m.set(c, []);
      m.get(c).push(p);
    }
    return m;
  }, [products]);

  const featuredCategories = useMemo(() => {
    const rows = [];
    for (const key of categoryOrder) {
      const list = byCategory.get(key);
      if (list?.length) {
        rows.push({
          id: key,
          value: key,
          label: categoryContent[key]?.label || key,
          description:
            categoryContent[key]?.description ||
            `Explore premium ${key} in a more modern shopping layout.`,
          image: list[0]?.productImage?.[0],
          productCount: list.length,
        });
      }
    }
    for (const [cat, list] of byCategory) {
      if (categoryOrder.includes(cat) || !list.length) continue;
      rows.push({
        id: cat,
        value: cat,
        label: String(cat).charAt(0).toUpperCase() + String(cat).slice(1).replace(/_/g, ' '),
        description: `Shop our ${cat} selection from the live catalog.`,
        image: list[0]?.productImage?.[0],
        productCount: list.length,
      });
    }
    return rows;
  }, [byCategory]);

  const featuredHeroProduct =
    products.find((product) => product?.category === 'airpodes') || products[0];

  return (
    <div className="bg-white px-0 pb-8 pt-0 sm:px-8 sm:py-8 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-none border border-b border-x-0 border-t-0 border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] shadow-none sm:rounded-[36px] sm:border sm:shadow-[0_30px_120px_rgba(15,23,42,0.10)]">
          <div className="grid items-center gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-14">
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 backdrop-blur sm:mb-6">
                <span className="h-2 w-2 rounded-full bg-slate-900"></span>
                Curated collections
              </div>

              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
                Discover a cleaner way to shop your next device.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                Browse standout gadgets, everyday essentials, and fresh arrivals
                presented with the same premium feel used across the rest of the
                storefront.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/search?q=${encodeURIComponent(featuredHeroProduct?.category || 'earbuds')}`}
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                >
                  Shop {featuredHeroProduct?.category === 'airpodes' ? 'Airpodes' : 'Collection'}
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
                >
                  Browse All Products
                </Link>
              </div>

              <div className="mt-10 hidden max-w-xl grid-cols-3 gap-3 sm:grid">
                <div className="rounded-3xl border border-slate-200 bg-white/85 px-4 py-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    {featuredCategories.length}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Device categories</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/85 px-4 py-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{products.length}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Modern picks</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/85 px-4 py-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">24/7</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Easy browsing</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-x-12 bottom-6 h-16 rounded-full bg-slate-300/40 blur-3xl"></div>
              <div className="absolute left-0 top-6 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
                Handpicked essentials
              </div>
              <div className="absolute bottom-10 right-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
                Elevated product discovery
              </div>

              <div className="relative w-full rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(226,232,240,0.85)_58%,_rgba(203,213,225,0.70))] p-6 sm:p-8">
                {featuredHeroProduct?.productImage?.[0] ? (
                  <img
                    className="relative z-[1] h-full min-h-[280px] w-full object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.18)]"
                    src={featuredHeroProduct.productImage[0]}
                    alt={featuredHeroProduct?.productName || 'Adimia collection'}
                  />
                ) : (
                  <div className="relative z-[1] flex min-h-[280px] items-center justify-center text-sm text-slate-500">
                    {loading ? 'Loading…' : 'Products from your catalog will appear here.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-900"></span>
            Browse by category
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Collections designed around how you shop
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Move from category to category with the same polished tone, spacing,
            and product-first browsing experience used throughout the store.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/search?q=${encodeURIComponent(category.value)}`}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-slate-50 px-6 py-6">
                <div className="absolute inset-x-10 bottom-4 h-10 rounded-full bg-slate-300/30 blur-2xl transition-all duration-300 group-hover:scale-110"></div>
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.label}
                    className="relative z-[1] h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-sm text-slate-400">No image</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Category</p>
                  <p className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500">
                    {category.productCount} products
                  </p>
                </div>
                <h3 className="mt-4 text-2xl font-semibold capitalize tracking-[-0.03em] text-slate-950">
                  {category.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{category.description}</p>
                <p className="mt-5 text-sm font-semibold text-slate-700 transition group-hover:text-slate-950">
                  View collection
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl rounded-[32px] border border-slate-200 bg-slate-50/80 px-6 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Why shop with us</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              A collection page that feels as refined as the products.
            </h3>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <h4 className="text-lg font-semibold text-slate-950">Fresh picks</h4>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              We highlight trending products and essential categories so it is
              easy to find what matters fast.
            </p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <h4 className="text-lg font-semibold text-slate-950">Trusted value</h4>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              From smart devices to daily-use products, Adimia brings together
              quality, convenience, and reliable support.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-900"></span>
            Store catalog
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Explore the full product catalog
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            The same products admins upload to the cloud—images and data stay in sync with the rest of the site.
          </p>
        </div>

        <VerticalCard loading={loading} data={products} />
      </section>
    </div>
  );
};

export default Collection;
