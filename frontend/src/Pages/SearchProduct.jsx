import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const SearchProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qRaw = (searchParams.get('q') || '').trim();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(qRaw);
  const [selectCategory, setSelectCategory] = useState({});
  const [productCategoryOptions, setProductCategoryOptions] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    setInputValue(qRaw);
  }, [qRaw]);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const useAll = !qRaw;
      const response = useAll
        ? await fetch(SummaryApi.allProduct.url, {
            method: SummaryApi.allProduct.method,
            headers: { 'Content-Type': 'application/json' },
          })
        : await fetch(`${SummaryApi.searchProduct.url}?q=${encodeURIComponent(qRaw)}`, {
            method: SummaryApi.searchProduct.method,
            headers: { 'Content-Type': 'application/json' },
          });
      const dataResponse = await response.json();
      setData(dataResponse.data || []);
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [qRaw]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    setSelectCategory({});
    setSortBy('');
  }, [qRaw]);

  const fetchFilterCategories = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.categoryProduct.url, {
        method: SummaryApi.categoryProduct.method,
        headers: { 'content-type': 'application/json' },
      });
      const dataResponse = await response.json();
      const list = dataResponse?.data || [];
      setProductCategoryOptions(
        list.map((p, index) => ({
          id: index + 1,
          label: p.category
            ? p.category.charAt(0).toUpperCase() + p.category.slice(1).replace(/_/g, ' ')
            : '',
          value: p.category,
        }))
      );
    } catch (e) {
      console.error(e);
      setProductCategoryOptions([]);
    }
  }, []);

  useEffect(() => {
    fetchFilterCategories();
  }, [fetchFilterCategories]);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const clearFilters = () => {
    setSelectCategory({});
    setSortBy('');
  };

  const handleOnChangeSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const displayedProducts = useMemo(() => {
    const activeCats = Object.keys(selectCategory).filter((k) => selectCategory[k]);
    let list = [...data];
    if (activeCats.length > 0) {
      list = list.filter((p) => p?.category && activeCats.includes(p.category));
    }
    if (sortBy === 'asc') {
      list.sort((a, b) => (Number(a.sellingPrice) || 0) - (Number(b.sellingPrice) || 0));
    } else if (sortBy === 'dsc') {
      list.sort((a, b) => (Number(b.sellingPrice) || 0) - (Number(a.sellingPrice) || 0));
    }
    return list;
  }, [data, selectCategory, sortBy]);

  const hasActiveFilters = Object.values(selectCategory).some(Boolean) || sortBy !== '';

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const next = inputValue.trim();
    if (next) {
      setSearchParams({ q: next });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="bg-white px-0 pb-10 pt-0 sm:px-8 sm:pt-[24px] lg:px-16 lg:pt-[24px]">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-none border border-b border-x-0 border-t-0 border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] shadow-none sm:rounded-[36px] sm:border sm:shadow-[0_30px_120px_rgba(15,23,42,0.10)]">
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              <span className="h-2 w-2 rounded-full bg-slate-900"></span>
              Search
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl">
              Find products across the catalog.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Search by name or category, then refine with filters and sorting—the same
              clean layout and product cards you see on collection and other pages.
            </p>

            <form
              onSubmit={onSubmitSearch}
              className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Search products</span>
                <GrSearch
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  type="search"
                  name="q"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search by product name or category…"
                  className="h-12 w-full rounded-full border border-slate-200 bg-white/90 py-2 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  autoComplete="off"
                />
              </label>
              <div className="flex shrink-0 gap-2 sm:gap-3">
                <button
                  type="submit"
                  className="inline-flex h-12 min-w-[120px] items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                >
                  Search
                </button>
                {qRaw ? (
                  <button
                    type="button"
                    onClick={() => {
                      setInputValue('');
                      setSearchParams({});
                    }}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </form>
            {qRaw ? (
              <p className="mt-4 text-sm text-slate-500">
                Showing results for{' '}
                <span className="font-medium text-slate-800">&ldquo;{qRaw}&rdquo;</span>
                {' · '}
                <Link
                  to="/collection"
                  className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 transition hover:text-slate-950"
                >
                  Browse collection
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 flex min-w-0 max-w-7xl flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full min-w-0 shrink-0 lg:sticky lg:top-24 lg:max-w-[240px]">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Sort by
              </h2>
              <div className="mt-3 flex flex-col gap-2.5 text-sm text-slate-700">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-400"
                    checked={sortBy === ''}
                    onChange={() => setSortBy('')}
                  />
                  Relevance
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-400"
                    checked={sortBy === 'asc'}
                    onChange={handleOnChangeSortBy}
                    value="asc"
                  />
                  Price — low to high
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-400"
                    checked={sortBy === 'dsc'}
                    onChange={handleOnChangeSortBy}
                    value="dsc"
                  />
                  Price — high to low
                </label>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Category
              </h2>
              <div className="mt-3 max-h-64 overflow-y-auto pr-1">
                <ul className="flex flex-col gap-2.5 text-sm text-slate-700">
                  {productCategoryOptions.map((cat) => (
                    <li key={cat.id}>
                      <label className="flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                          name="category"
                          checked={!!selectCategory[cat.value]}
                          id={`search-cat-${cat.value}`}
                          value={cat.value}
                          onChange={handleSelectCategory}
                        />
                        <span className="capitalize">{cat.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 w-full rounded-2xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                {qRaw ? 'Search results' : 'All products'}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {loading
                  ? 'Loading products…'
                  : `${displayedProducts.length} product${displayedProducts.length === 1 ? '' : 's'}`}
              </p>
            </div>
          </div>

          {displayedProducts.length === 0 && !loading && (
            <div className="rounded-[32px] border border-slate-200 bg-slate-50/80 px-6 py-12 text-center sm:px-10">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                No products match your filters.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                {data.length > 0
                  ? 'Try clearing category filters or adjusting your search.'
                  : qRaw
                    ? 'No products matched that search. Try different keywords or browse the collection.'
                    : 'No products are available right now.'}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                  >
                    Clear filters
                  </button>
                ) : null}
                <Link
                  to="/collection"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
                >
                  View collection
                </Link>
              </div>
            </div>
          )}

          {(displayedProducts.length > 0 || loading) && (
            <VerticalCard loading={loading} data={displayedProducts} />
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchProduct;
