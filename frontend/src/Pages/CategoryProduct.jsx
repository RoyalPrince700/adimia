import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll('category');
  const showAll = urlSearch.get('all') === 'true';

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productCategoryOptions, setProductCategoryOptions] = useState([]);

  const [sortBy, setSortBy] = useState('');

  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url, {
        method: SummaryApi.categoryProduct.method,
        headers: { 'content-type': 'application/json' },
      });
      const dataResponse = await response.json();
      const list = dataResponse?.data || [];
      setCategories(
        list.map((p) => ({
          category: p.category,
          productImage: p.productImage,
        }))
      );
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
      setCategories([]);
      setProductCategoryOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.allProduct.url, {
        method: SummaryApi.allProduct.method,
        headers: { 'content-type': 'application/json' },
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    if (showAll) {
      fetchAllProducts();
    }
  }, [showAll]);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    if (filterCategoryList.length > 0) {
      fetchData();
    } else if (!showAll) {
      setData([]);
    }
  }, [filterCategoryList, showAll]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    if (arrayOfCategory.length > 0) {
      navigate('/product-category?' + urlFormat.join(''));
    } else if (showAll) {
      navigate('/product-category?all=true');
    } else {
      navigate('/product-category');
    }
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === 'asc') {
      setData((preve) => [...preve].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === 'dsc') {
      setData((preve) => [...preve].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className="container mt-[100px] mx-auto p-4">
      <div className="flex flex-col lg:grid lg:grid-cols-[200px,1fr] gap-4">
        <div
          className={`bg-white p-2 lg:min-h-[calc(100vh-120px)] ${
            filterCategoryList.length === 0 && !showAll ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="mb-4">
            <h3 className="text-base border-b pb-1 border-slate-300 uppercase font-medium text-slate-500">Sort by</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                  value={'asc'}
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                  value={'dsc'}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          <div className="">
            <h3 className="text-base border-b pb-1 border-slate-300 uppercase font-medium text-slate-500">Category</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategoryOptions.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3" key={index}>
                    <input
                      type="checkbox"
                      name={'category'}
                      checked={selectCategory[categoryName?.value]}
                      id={categoryName?.value}
                      value={categoryName?.value}
                      onChange={handleSelectCategory}
                    />

                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        <div className="px-4 w-full">
          {filterCategoryList.length === 0 && !showAll ? (
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-slate-800 text-center lg:text-left">
                Shop by Category
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {loading
                  ? new Array(8).fill(null).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse border border-slate-100"
                      >
                        <div className="aspect-square bg-slate-200"></div>
                        <div className="p-4">
                          <div className="h-6 bg-slate-200 rounded w-2/3 mx-auto"></div>
                        </div>
                      </div>
                    ))
                  : categories.map((category, index) => (
                      <Link
                        to={`/product-category?category=${category.category}`}
                        key={index}
                        className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 overflow-hidden text-center flex flex-col"
                        onClick={() => setSelectCategory({ [category.category]: true })}
                      >
                        <div className="aspect-square overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
                          <img
                            src={category?.productImage?.[0]}
                            alt={category.category}
                            className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3 md:p-4 border-t border-slate-50 mt-auto">
                          <h3 className="text-base md:text-lg font-medium text-slate-700 capitalize group-hover:text-orange-600 transition-colors truncate">
                            {category.category}
                          </h3>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="font-medium text-slate-800 text-lg">
                  {showAll && filterCategoryList.length === 0 ? 'All Products' : 'Search Results'} : {data.length}
                </p>
                <button
                  onClick={() => {
                    setSelectCategory({});
                    navigate('/product-category');
                  }}
                  className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                >
                  Clear All
                </button>
              </div>
              <div className="min-h-[calc(100vh-120px)] overflow-y-auto">
                {data.length !== 0 ? (
                  <VerticalCard data={data} loading={loading} />
                ) : (
                  !loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                      <p className="text-slate-500 text-lg">No products found.</p>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
