import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import displayNARCurrency from '../helpers/displayCurrency';
// import SubCategoryWiseProductDisplay from '../components/SubCategoryWiseProductDisplay';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

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

const formatCategory = (value) =>
  String(value || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const ProductDetails = () => {
  const [data, setData] = useState(emptyProduct);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });

  const { fetchUserAddToCart } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

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
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate('/cart');
  };

  return (
    <div
      className="mx-auto mt-[4px] max-w-7xl px-4 sm:px-8 lg:mt-[16px] lg:px-16"
      aria-busy={loading}
    >
      <div
        className={`min-h-[200px] gap-6 overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] p-4 shadow-[0_30px_120px_rgba(15,23,42,0.10)] sm:rounded-[36px] sm:p-6 lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:p-10 ${
          loading ? 'opacity-95' : ''
        }`}
      >
        {/* Gallery + thumbs (matches product card: rounded-2xl / 28px, slate borders, white surface) */}
        <div className="flex flex-col gap-3 lg:h-auto lg:flex-row-reverse lg:gap-4">
          <div
            className="relative h-[340px] w-full overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:h-[420px] sm:rounded-[32px] sm:p-5 lg:h-[460px] lg:w-[460px]"
          >
            {!loading && data?.category && (
              <div className="absolute left-3 top-3 z-10 max-w-[60%] truncate rounded-full border border-white/70 bg-white/80 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 backdrop-blur sm:left-5 sm:top-5 sm:max-w-none sm:px-3 sm:text-[11px] sm:tracking-[0.18em]">
                {formatCategory(data?.category)}
              </div>
            )}
            <div className="absolute right-3 top-3 z-10 rounded-full bg-slate-900 px-2 py-1 text-[9px] font-medium text-white sm:right-5 sm:top-5 sm:px-3 sm:text-[11px]">
              {loading ? '—' : data?.productStatus || 'New'}
            </div>
            <div className="absolute inset-x-6 bottom-4 h-10 rounded-full bg-slate-300/30 blur-2xl sm:inset-x-10 sm:bottom-8 sm:h-12" />
            {loading ? (
              <div className="relative z-[1] h-full w-full rounded-2xl bg-slate-100" />
            ) : (
              <>
                <img
                  src={activeImage}
                  alt="Product"
                  className="relative z-[1] h-full w-full object-contain transition-transform duration-500 hover:scale-[1.03]"
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
                {zoomImage && activeImage && (
                  <div className="absolute -right-[530px] top-0 z-20 hidden min-h-[420px] min-w-[420px] overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:block">
                    <div
                      className="h-full w-full min-h-[400px] min-w-[500px] scale-125"
                      style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div
            className="flex w-full gap-2 overflow-x-auto overflow-y-hidden pb-1 scrollbar-none lg:h-full lg:w-auto lg:max-w-none lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0"
          >
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-16 w-16 shrink-0 rounded-3xl border border-slate-200 bg-slate-100 sm:h-20 sm:w-20"
                  />
                ))
              : data?.productImage?.map((imageURL) => (
                  <div
                    className={`h-16 w-16 shrink-0 rounded-3xl border p-1 transition-all duration-300 sm:h-20 sm:w-20 ${
                      activeImage === imageURL
                        ? 'border-slate-900 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.10)]'
                        : 'border-slate-200 bg-white/90 hover:border-slate-300'
                    }`}
                    key={imageURL}
                  >
                    <img
                      src={imageURL}
                      alt=""
                      className="h-full w-full cursor-pointer rounded-2xl object-contain"
                      onMouseEnter={() => setActiveImage(imageURL)}
                      onClick={() => setActiveImage(imageURL)}
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* Copy + actions — aligned with ProductGridCard / VerticalCard typography */}
        <div className="flex flex-col justify-center gap-4 sm:gap-5">
          {loading ? (
            <>
              <div className="h-4 w-32 rounded-full bg-slate-200" />
              <div className="h-10 max-w-md rounded-2xl bg-slate-200" />
              <div className="h-4 w-24 bg-slate-200" />
              <div className="h-24 rounded-2xl bg-slate-100" />
              <div className="h-12 w-40 rounded-full bg-slate-200" />
            </>
          ) : (
            <>
              <p className="inline-flex w-fit max-w-full items-center rounded-full border border-slate-200 bg-white/85 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
                {data?.brandName}
              </p>
              <h2 className="max-w-2xl text-2xl font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {data?.productName}
              </h2>
              <p className="text-sm font-medium text-slate-500 sm:text-base">
                {formatCategory(data?.category)}
              </p>
              <div className="flex flex-wrap items-center gap-1 text-slate-900">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
                <span className="ml-2 text-sm font-medium text-slate-500">Trusted pick</span>
              </div>
              <div className="order-1 rounded-[24px] border border-slate-200/80 bg-white/95 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:order-none sm:rounded-[28px] sm:p-5">
                <p className="my-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Description</p>
                <p className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{data?.description}</p>
              </div>
              <div className="order-2 flex items-end gap-3 border-t border-slate-200/80 pt-4 sm:order-none sm:pt-5">
                {data?.price > 0 && (
                  <p className="text-sm text-slate-400 line-through">{displayNARCurrency(data?.price)}</p>
                )}
                {data?.sellingPrice > 0 && (
                  <p className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                    {displayNARCurrency(data?.sellingPrice)}
                  </p>
                )}
              </div>
              <div className="order-3 my-2 flex flex-col gap-3 sm:order-none sm:flex-row">
                <button
                  className="inline-flex w-full min-w-[140px] items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 sm:w-auto"
                  type="button"
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                >
                  Buy Now
                </button>
                <button
                  className="inline-flex w-full min-w-[140px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                  type="button"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {!loading && (
        <>
          {/* Extras (subcategory) — re-enable when needed
          {data?.subCategory && (
            <SubCategoryWiseProductDisplay subCategory={data.subCategory} heading="Extras" />
          )}
          */}
          {data?.category && (
            <div className="mt-10">
              <h2 className="mb-6 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                More to explore
              </h2>
              <CategoryWiseProductDisplay category={data.category} heading="" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
