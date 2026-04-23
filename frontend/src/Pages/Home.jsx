import React from 'react';
import Hero from '../components/Hero';
import VerticalCard from '../components/VerticalCard';
import { localProducts } from '../data/localProductCatalog';

function Home() {
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
              Browse watches, phones, and earbuds in one continuous product feed.
            </p>
            <div className="w-16 sm:w-24 h-[2px] bg-gray-700 mx-auto mt-3"></div>
          </div>

          <VerticalCard loading={false} data={localProducts} />
        </div>
      </section>
    </div>
  );
}

export default Home;