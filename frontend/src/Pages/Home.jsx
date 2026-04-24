import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

function Home() {
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

  return (
    <div className="mt-0 sm:mt-6 lg:mt-2">
      <Hero />

      <section className="px-4 sm:px-8 lg:px-16 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide uppercase text-gray-800">
              Shop Our Latest Picks
            </h2>
            <p className="mt-2 text-gray-500">
              Products uploaded by our team—images served from the cloud, synced from the catalog.
            </p>
            <div className="w-16 sm:w-24 h-[2px] bg-gray-700 mx-auto mt-3"></div>
          </div>

          <VerticalCard loading={loading} data={products} />
        </div>
      </section>
    </div>
  );
}

export default Home;
