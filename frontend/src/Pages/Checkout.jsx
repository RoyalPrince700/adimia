import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import displayNARCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';
import Context from '../context';

const inputClass =
  'mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200';

const labelClass = 'text-sm font-medium text-slate-800';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchUserAddToCart } = useContext(Context);

  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    number: '',
    address: '',
    note: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPayOnDeliveryLoading, setIsPayOnDeliveryLoading] = useState(false);

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateShippingDetails = () => {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!shippingDetails.name || !shippingDetails.number || !shippingDetails.address) {
      toast.error('Name, Phone Number, and Address are required.');
      return false;
    }
    if (!phoneRegex.test(shippingDetails.number)) {
      toast.error('Invalid phone number format.');
      return false;
    }
    return true;
  };

  const handlePayOnDelivery = async () => {
    if (!validateShippingDetails()) return;

    setIsPayOnDeliveryLoading(true);
    try {
      const payload = {
        name: shippingDetails.name,
        number: shippingDetails.number,
        address: shippingDetails.address,
        note: shippingDetails.note || '',
        cartItems,
        totalPrice: totalPrice,
        paymentMethod: 'Pay on Delivery',
      };

      const response = await fetch(SummaryApi.checkout.url, {
        method: SummaryApi.checkout.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to process order');

      toast.success('Your order has been placed successfully!');
      await fetchUserAddToCart();
      navigate('/account/orders');
    } catch (error) {
      console.error('Error during Pay on Delivery:', error);
      toast.error('Error processing your order. Please try again.');
    } finally {
      setIsPayOnDeliveryLoading(false);
    }
  };

  const handleFlutterwavePayment = async () => {
    if (!validateShippingDetails()) return;

    setIsLoading(true);
    try {
      const response = await fetch(SummaryApi.payment.url, {
        method: SummaryApi.payment.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          shippingDetails,
        }),
      });

      const data = await response.json();

      if (data.success && data.data?.link) {
        window.location.href = data.data.link;
      } else {
        toast.error(data.message || 'Failed to initiate payment');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error initiating Flutterwave payment:', error);
      toast.error('Error processing payment. Please try again.');
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white px-4 pb-12 pt-0 sm:mt-6 sm:px-8 lg:mt-2 lg:px-16">
        <div className="mx-auto max-w-2xl pt-10 sm:pt-14">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50/80 px-6 py-12 text-center sm:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Checkout</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
              Your bag is empty
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
              Add items from your cart before you can complete checkout.
            </p>
            <Link
              to="/cart"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalQty = cartItems.reduce((sum, item) => sum + (item?.quantity || 0), 0);

  return (
    <div className="bg-white px-0 pb-12 pt-0 sm:px-8 sm:pt-[24px] lg:px-16 lg:pt-[24px]">
      <section className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-none border border-b border-x-0 border-t-0 border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] shadow-none sm:rounded-[36px] sm:border sm:shadow-[0_30px_120px_rgba(15,23,42,0.10)]">
          <div className="grid min-w-0 gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-12">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-900" />
                Secure checkout
              </div>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl">
                Delivery &amp; payment
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                Enter where we should send your order, then pay online or choose pay on delivery—same clean layout as
                the rest of the store.
              </p>
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="min-w-0 rounded-3xl border border-slate-200 bg-white/85 px-5 py-5">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{cartItems.length}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Products</p>
              </div>
              <div className="min-w-0 rounded-3xl border border-slate-200 bg-white/85 px-5 py-5">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{totalQty}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Items total</p>
              </div>
              <div className="min-w-0 rounded-3xl border border-slate-200 bg-white/85 px-5 py-5">
                <p className="break-words text-2xl font-semibold tabular-nums tracking-[-0.04em] text-slate-950">
                  {displayNARCurrency(totalPrice)}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Order value</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 flex min-w-0 max-w-7xl flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full min-w-0 max-w-4xl flex-1 px-4 sm:px-0">
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Shipping</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl">
              Where should we deliver?
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Use a reachable phone number—couriers and support may contact you about this order.
            </p>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <label htmlFor="checkout-name" className={labelClass}>
                  Full name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  name="name"
                  value={shippingDetails.name}
                  onChange={handleChange}
                  placeholder="As it should appear on delivery"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="checkout-phone" className={labelClass}>
                  Phone number
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  name="number"
                  value={shippingDetails.number}
                  onChange={handleChange}
                  placeholder="10–15 digits"
                  required
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="checkout-address" className={labelClass}>
                  Full address
                </label>
                <textarea
                  id="checkout-address"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleChange}
                  placeholder="Street, city, landmarks"
                  required
                  rows={4}
                  className={`${inputClass} min-h-[120px] resize-y`}
                />
              </div>
              <div>
                <label htmlFor="checkout-note" className={labelClass}>
                  Order note <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <textarea
                  id="checkout-note"
                  name="note"
                  value={shippingDetails.note}
                  onChange={handleChange}
                  placeholder="Delivery instructions, gate code, etc."
                  rows={3}
                  className={`${inputClass} min-h-[96px] resize-y`}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="w-full min-w-0 px-4 sm:px-0 lg:sticky lg:top-28 lg:max-w-md">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Order summary</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">Review &amp; pay</h2>

            <div className="mt-6 max-h-72 space-y-3 overflow-y-auto pr-1">
              {cartItems.map((item) => {
                const pid = item?.productId;
                const name = pid?.productName || item?.name || 'Product';
                const img = pid?.productImage?.[0];
                const unit = Number(pid?.sellingPrice) || Number(item?.price) || 0;
                const qty = item?.quantity || 0;
                return (
                  <div
                    key={item?._id || `${name}-${qty}`}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                      {img ? (
                        <img src={img} alt="" className="h-full w-full object-contain p-1" />
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400">No img</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-slate-900">{name}</p>
                      <p className="mt-1 text-xs text-slate-500">Qty {qty}</p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {displayNARCurrency(unit * qty)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 rounded-[24px] border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Line items</span>
                <span className="font-semibold text-slate-900">{cartItems.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Units</span>
                <span className="font-semibold text-slate-900">{totalQty}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm font-medium text-slate-600">Total</span>
                <span className="text-lg font-semibold tabular-nums text-slate-950">
                  {displayNARCurrency(totalPrice.toFixed(2))}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                className={`w-full rounded-full bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 disabled:opacity-50 ${
                  isPayOnDeliveryLoading ? 'pointer-events-none opacity-60' : ''
                }`}
                onClick={handleFlutterwavePayment}
                disabled={isLoading || isPayOnDeliveryLoading}
              >
                {isLoading ? 'Redirecting to payment…' : `Pay ${displayNARCurrency(totalPrice.toFixed(2))}`}
              </button>
              <button
                type="button"
                className="w-full rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50"
                onClick={handlePayOnDelivery}
                disabled={isLoading || isPayOnDeliveryLoading}
              >
                {isPayOnDeliveryLoading ? 'Placing order…' : 'Pay on delivery'}
              </button>
            </div>

            <Link
              to="/cart"
              className="mt-5 block text-center text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              ← Back to cart
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
