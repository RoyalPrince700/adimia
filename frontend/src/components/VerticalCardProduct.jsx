import React, { useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import fetchAllProducts from '../helpers/fetchAllProducts';
import ProductGridCard from './ProductGridCard';

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(10).fill(null);

  const fetchData = async () => {
    setLoading(true);
    let productData;
    if (category === "all") {
      productData = await fetchAllProducts();
    } else {
      productData = await fetchCategoryWiseProduct(category);
    }
    setLoading(false);
    setData(productData?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full px-4 sm:px-10 lg:px-16 py-10">
      <section className="mx-auto max-w-7xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-950">
          {heading || "Trending Preorders"}
        </h2>
        <p className="mt-2 text-slate-500">Marketplace-style product discovery powered by your local asset catalog.</p>
        <div className="mx-auto mt-3 h-[2px] w-16 sm:w-24 bg-amber-500"></div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {loadingList.map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-square animate-pulse bg-slate-200"></div>
              <div className="p-4">
                <div className="mb-2 h-4 animate-pulse rounded bg-slate-200"></div>
                <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-slate-200"></div>
                <div className="h-10 animate-pulse rounded-xl bg-slate-100"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data?.map((product) => (
            <ProductGridCard key={product?._id} product={product} />
          ))}
        </div>
      )}
      </section>
    </div>
  );
};

export default VerticalCardProduct;
