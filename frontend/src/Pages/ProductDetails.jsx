import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import displayNARCurrency from '../helpers/displayCurrency';
import SubCategoryWiseProductDisplay from '../components/SubCategoryWiseProductDisplay';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import VerticalCard from '../components/VerticalCard';
import { getLocalProductById, getRelatedLocalProducts, isLocalProductId } from '../data/localProductCatalog';
import { addLocalProductToCart, buildLocalCheckoutItem } from '../helpers/localCart';

const emptyProduct = {
  productName: '',
  brandName: '',
  category: '',
  subCategory: '',
  productImage: [],
  description: '',
  price: '',
  sellingPrice: '',
};

const ProductDetails = () => {
  const [data, setData] = useState(emptyProduct);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });

  const { fetchUserAddToCart } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const localCatalogProduct = getLocalProductById(params?.id);
  const showingLocalCatalogProduct = isLocalProductId(params?.id) && Boolean(localCatalogProduct);
  const relatedLocalProducts = useMemo(
    () => getRelatedLocalProducts(params?.id, localCatalogProduct?.category),
    [params?.id, localCatalogProduct?.category]
  );
  const formatCategory = (value) =>
    String(value || '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ productId: params?.id }),
      });
      const dataResponse = await response.json();
      if (dataResponse?.data) {
        setData(dataResponse.data);
        setActiveImage(dataResponse.data.productImage?.[0] || '');
      } else {
        setData(emptyProduct);
        setActiveImage('');
      }
    } catch (error) {
      console.error('Error loading product details:', error);
      setData(emptyProduct);
    } finally {
      setLoading(false);
    }
  }, [params?.id]);

  useEffect(() => {
    if (showingLocalCatalogProduct) {
      setData(localCatalogProduct);
      setActiveImage(localCatalogProduct?.productImage?.[0] || '');
      setLoading(false);
      return;
    }
    fetchProductDetails();
  }, [params?.id, showingLocalCatalogProduct, localCatalogProduct, fetchProductDetails]);

  const handleAddToCart = async (e, id) => {
    if (showingLocalCatalogProduct) {
      addLocalProductToCart(data);
      fetchUserAddToCart();
      return;
    }
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    if (showingLocalCatalogProduct) {
      e?.stopPropagation();
      e?.preventDefault();
      navigate('/checkout', {
        state: {
          cartItems: [buildLocalCheckoutItem(data)].filter(Boolean),
          totalPrice: Number(data?.sellingPrice) || 0,
        },
      });
      return;
    }
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate('/cart');
  };

  return (
    <div
      className={`mx-auto mt-[4px] lg:mt-[16px] ${
        showingLocalCatalogProduct ? 'max-w-7xl px-4 sm:px-8 lg:px-16' : 'p-4'
      }`}
      aria-busy={loading && !showingLocalCatalogProduct}
    >
      <div
        className={`min-h-[200px] gap-6 ${
          showingLocalCatalogProduct
            ? 'grid overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] p-4 shadow-[0_30px_120px_rgba(15,23,42,0.10)] sm:rounded-[36px] sm:p-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:p-10'
            : 'flex flex-col lg:flex-row'
        }`}
      >
        <div
          className={`gap-4 ${
            showingLocalCatalogProduct ? 'flex flex-col gap-3 lg:h-auto lg:flex-row-reverse lg:gap-4' : 'flex h-96 flex-col lg:flex-row-reverse'
          }`}
        >
          <div
            className={`relative overflow-hidden ${
              showingLocalCatalogProduct
                ? 'h-[340px] w-full rounded-[24px] border border-slate-200/80 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:h-[420px] sm:rounded-[32px] sm:p-5 lg:h-[460px] lg:w-[460px]'
                : 'bg-slate-200 p-2 lg:h-96 lg:w-96'
            }`}
          >
            {showingLocalCatalogProduct && (
              <>
                <div className="absolute left-3 top-3 z-10 max-w-[60%] truncate rounded-full border border-white/70 bg-white/80 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 backdrop-blur sm:left-5 sm:top-5 sm:max-w-none sm:px-3 sm:text-[11px] sm:tracking-[0.18em]">
                  {formatCategory(data?.category)}
                </div>
                <div className="absolute right-3 top-3 z-10 rounded-full bg-slate-900 px-2 py-1 text-[9px] font-medium text-white sm:right-5 sm:top-5 sm:px-3 sm:text-[11px]">
                  New
                </div>
                <div className="absolute inset-x-6 bottom-4 h-10 rounded-full bg-slate-300/30 blur-2xl sm:inset-x-10 sm:bottom-8 sm:h-12"></div>
              </>
            )}
            <img
              src={activeImage}
              alt="Product"
              className={`h-full w-full object-scale-down ${
                showingLocalCatalogProduct
                  ? 'relative z-[1] object-contain transition-transform duration-500 hover:scale-[1.03]'
                  : 'mix-blend-multiply'
              }`}
              onMouseMove={(e) => {
                const { left, top, width, height } = e.target.getBoundingClientRect();
                setZoomImage(true);
                setZoomImageCoordinate({
                  x: (e.clientX - left) / width,
                  y: (e.clientY - top) / height,
                });
              }}
              onMouseLeave={() => setZoomImage(false)}
            />
            {zoomImage && (
              <div
                className={`absolute top-0 hidden overflow-hidden lg:block ${
                  showingLocalCatalogProduct
                    ? '-right-[530px] min-h-[420px] min-w-[420px] rounded-[32px] border border-slate-200/80 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)]'
                    : '-right-[510px] min-h-[400px] min-w-[400px] bg-slate-200 p-1'
                }`}
              >
                <div
                  className={`h-full w-full min-h-[400px] min-w-[500px] scale-125 ${
                    showingLocalCatalogProduct ? '' : 'mix-blend-multiply'
                  }`}
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div
            className={`flex gap-2 scrollbar-none ${
              showingLocalCatalogProduct
                ? 'w-full overflow-x-auto overflow-y-hidden pb-1 lg:h-full lg:w-auto lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0'
                : 'h-full overflow-scroll lg:flex-col'
            }`}
          >
            {data?.productImage?.map((imageURL) => (
              <div
                className={`shrink-0 p-1 ${
                  showingLocalCatalogProduct
                    ? `h-16 w-16 rounded-3xl border transition-all duration-300 sm:h-20 sm:w-20 ${
                        activeImage === imageURL
                          ? 'border-slate-900 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.10)]'
                          : 'border-slate-200 bg-white/90 hover:border-slate-300'
                      }`
                    : 'h-20 w-20 rounded bg-slate-200'
                }`}
                key={imageURL}
              >
                <img
                  src={imageURL}
                  className={`h-full w-full cursor-pointer object-scale-down ${
                    showingLocalCatalogProduct ? 'object-contain' : 'mix-blend-multiply'
                  }`}
                  onMouseEnter={() => setActiveImage(imageURL)}
                  onClick={() => setActiveImage(imageURL)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={`flex flex-col ${showingLocalCatalogProduct ? 'justify-center gap-4 sm:gap-5' : 'gap-1'}`}>
          <p
            className={`inline-flex w-fit items-center rounded-full ${
              showingLocalCatalogProduct
                ? 'border border-slate-200 bg-white/85 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]'
                : 'rounded-md bg-gray-200 px-2 text-gray-600'
            }`}
          >
            {data?.brandName}
          </p>
          <h2
            className={`${
              showingLocalCatalogProduct
                ? 'max-w-2xl text-2xl font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl'
                : 'text-2xl font-medium lg:text-4xl'
            }`}
          >
            {data?.productName}
          </h2>
          <p
            className={`capitalize ${
              showingLocalCatalogProduct ? 'text-sm font-medium text-slate-500 sm:text-base' : 'text-slate-900'
            }`}
          >
            {formatCategory(data?.category)}
          </p>
          <div
            className={`flex flex-wrap items-center gap-1 ${
              showingLocalCatalogProduct ? 'text-slate-900' : 'text-gray-900'
            }`}
          >
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
            {showingLocalCatalogProduct && (
              <span className="ml-2 text-sm font-medium text-slate-500">Trusted pick</span>
            )}
          </div>
          <div
            className={
              showingLocalCatalogProduct
                ? 'order-1 rounded-[24px] border border-slate-200/80 bg-white/95 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:order-none sm:rounded-[28px] sm:p-5'
                : ''
            }
          >
            <p
              className={`my-1 font-medium ${
                showingLocalCatalogProduct ? 'text-xs uppercase tracking-[0.18em] text-slate-500' : 'text-slate-600'
              }`}
            >
              Description
            </p>
            <p
              className={showingLocalCatalogProduct ? 'text-sm leading-6 text-slate-600 sm:text-base sm:leading-7' : ''}
            >
              {data.description}
            </p>
          </div>
          <div
            className={`flex items-end gap-3 ${
              showingLocalCatalogProduct
                ? 'order-2 border-t border-slate-200/80 pt-4 sm:order-none sm:pt-5'
                : 'items-center space-x-2'
            }`}
          >
            {data?.price > 0 && (
              <p
                className={
                  showingLocalCatalogProduct ? 'text-sm text-slate-400 line-through' : 'text-black line-through'
                }
              >
                {displayNARCurrency(data?.price)}
              </p>
            )}
            {data?.sellingPrice > 0 && (
              <p
                className={
                  showingLocalCatalogProduct
                    ? 'text-3xl font-semibold tracking-[-0.03em] text-slate-950'
                    : 'text-lg font-semibold text-black'
                }
              >
                {displayNARCurrency(data?.sellingPrice)}
              </p>
            )}
          </div>
          <div
            className={`my-2 flex gap-3 ${
              showingLocalCatalogProduct ? 'order-3 flex-col sm:order-none sm:flex-row' : 'items-center'
            }`}
          >
            <button
              className={`min-w-[140px] px-6 py-3 font-semibold transition-all duration-300 ${
                showingLocalCatalogProduct
                  ? 'inline-flex w-full items-center justify-center rounded-full bg-slate-950 text-sm text-white hover:bg-slate-800 sm:w-auto'
                  : 'rounded-lg border-2 border-black bg-gray-100 text-black ease-in-out hover:bg-gray-900 hover:text-[#F5F5DC]'
              }`}
              type="button"
              onClick={(e) => handleBuyProduct(e, data?._id)}
            >
              Buy Now
            </button>
            <button
              className={`min-w-[140px] px-6 py-3 font-semibold transition-all duration-300 ${
                showingLocalCatalogProduct
                  ? 'inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50 sm:w-auto'
                  : 'rounded-lg border-2 border-black bg-gray-100 text-black ease-in-out hover:bg-gray-900 hover:text-[#F5F5DC]'
              }`}
              type="button"
              onClick={(e) => handleAddToCart(e, data?._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showingLocalCatalogProduct ? (
        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
            More To Explore
          </h2>
          <VerticalCard loading={false} data={relatedLocalProducts} />
        </div>
      ) : (
        <>
          {data?.subCategory && (
            <SubCategoryWiseProductDisplay subCategory={data?.subCategory} heading="Extras" />
          )}
          {data?.category && (
            <CategoryWiseProductDisplay
              category={data?.category}
              heading="Recommended Product"
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
