import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="space-y-4">
      {/* Header with Upload button */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <h2 className="font-bold text-lg text-gray-800">All Products</h2>
        <button
          className="border-2 hover:text-white transition-all 
          hover:bg-blue-600 border-blue-600 
          text-blue-600 font-medium py-1 px-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All Products Grid */}
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] content-start gap-5 bg-gray-50 px-4 py-4"
      >
        {allProduct.length > 0 ? (
          allProduct.map((product, index) => (
            <AdminProductCard
              data={product}
              key={index + 'allProduct'}
              fetchdata={fetchAllProduct}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No products available.
          </p>
        )}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
