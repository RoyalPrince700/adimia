import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import Context from '../context';
import displayNARCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import { getGuestCartItems, removeGuestCartItem, updateGuestCartQuantity } from '../helpers/guestCart';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(context.cartProductCount).fill(null);
    const navigate = useNavigate();
    const user = useSelector((s) => s?.user?.user);

    const buildGuestRows = async () => {
        const rows = getGuestCartItems();
        if (!rows.length) {
            setData([]);
            return;
        }
        const built = await Promise.all(
            rows.map(async (row) => {
                const res = await fetch(SummaryApi.productDetails.url, {
                    method: SummaryApi.productDetails.method,
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ productId: row.productId }),
                });
                const json = await res.json();
                const product = json?.data;
                if (!product) {
                    return null;
                }
                return {
                    _id: `guest-${row.productId}`,
                    productId: product,
                    quantity: row.quantity,
                };
            })
        );
        setData(built.filter(Boolean));
    };

    const fetchData = async () => {
        if (!user) {
            try {
                await buildGuestRows();
            } catch (error) {
                console.error('Error loading guest cart:', error);
                setData([]);
            }
            return;
        }
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (responseData.success) {
                setData(responseData.data);
                return;
            }
        } catch (error) {
            console.error('Error fetching cart products:', error);
        }

        setData([]);
    };

    const handleLoading = async () => {
        setLoading(true);
        await fetchData();
        setLoading(false);
    };

    useEffect(() => {
        handleLoading();
    }, [user?._id]);

    const getGuestProductIdFromRow = (row) => String(row?.productId?._id || row?.productId || '').replace(/^guest-/, '');

    const increaseQty = async (id, qty) => {
        if (!user) {
            const productId = String(id).replace(/^guest-/, '');
            const row = data.find(
                (p) => getGuestProductIdFromRow(p) === productId || p._id === id
            );
            if (row) {
                updateGuestCartQuantity(productId, (row.quantity || 1) + 1);
                await buildGuestRows();
                context.fetchUserAddToCart();
            }
            return;
        }
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1,
            }),
        });

        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty < 2) {
            return;
        }
        if (!user) {
            const productId = String(id).replace(/^guest-/, '');
            const row = data.find(
                (p) => getGuestProductIdFromRow(p) === productId || p._id === id
            );
            if (row) {
                updateGuestCartQuantity(productId, (row.quantity || 1) - 1);
                await buildGuestRows();
                context.fetchUserAddToCart();
            }
            return;
        }
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty - 1,
            }),
        });

        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const deleteCartProduct = async (id) => {
        if (!user) {
            const row = data.find((p) => p._id === id);
            const productId = row
                ? getGuestProductIdFromRow(row)
                : String(id).replace(/^guest-/, '');
            if (productId) {
                removeGuestCartItem(productId);
            }
            await buildGuestRows();
            context.fetchUserAddToCart();
            return;
        }
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    _id: id,
                }),
            });

            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            }
        } catch (error) {
            console.error('Error deleting product from cart:', error);
        }
    };

    const totalQty = data.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
    );
    const totalPrice = data.reduce(
        (prev, curr) => prev + curr.quantity * (Number(curr?.productId?.sellingPrice) || 0),
        0
    );

    const handleCheckout = () => {
        if (data.length === 0) {
            alert('No items in the cart. Please add items to proceed.');
            return;
        }
        if (!user) {
            sessionStorage.setItem('postLoginRedirect', '/checkout');
            navigate('/login');
            return;
        }
        navigate('/checkout', {
            state: {
                cartItems: data,
                totalPrice,
            },
        });
    };

    return (
        <div className="bg-white px-0 pb-10 pt-0 sm:px-8 sm:pt-[24px] lg:px-16 lg:pt-[24px]">
            <section className="mx-auto max-w-7xl">
                <div className="overflow-hidden rounded-none border border-b border-x-0 border-t-0 border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] shadow-none sm:rounded-[36px] sm:border sm:shadow-[0_30px_120px_rgba(15,23,42,0.10)]">
                    <div className="grid min-w-0 gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)] lg:px-14 lg:py-12">
                        <div className="min-w-0">
                            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                <span className="h-2 w-2 rounded-full bg-slate-900"></span>
                                Your cart
                            </div>
                            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-slate-950 sm:text-5xl">
                                Review your picks before checkout.
                            </h1>
                            <p className="mt-4 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                                Keep the same polished browsing experience while
                                updating quantities, removing items, and getting
                                ready to place your order.
                            </p>
                        </div>

                        <div className="grid min-w-0 gap-4 sm:grid-cols-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)]">
                            <div className="min-w-0 rounded-3xl border border-slate-200 bg-white/85 px-5 py-5 lg:hidden">
                                <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{data.length}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Products</p>
                            </div>
                            <div className="min-w-0 rounded-3xl border border-slate-200 bg-white/85 px-5 py-5">
                                <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{totalQty}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Items total</p>
                            </div>
                            <div className="min-w-0 rounded-3xl border border-slate-200 bg-white/85 px-5 py-5 lg:pl-6 lg:pr-6">
                                <p className="text-2xl font-semibold tabular-nums tracking-[-0.04em] text-slate-950 lg:whitespace-nowrap">
                                    {displayNARCurrency(totalPrice)}
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Order value</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto mt-10 flex min-w-0 max-w-7xl flex-col gap-8 lg:flex-row lg:items-start">
                <div className="w-full min-w-0 max-w-4xl">
                    {!loading && data.length === 0 && (
                        <div className="rounded-[32px] border border-slate-200 bg-slate-50/80 px-6 py-10 text-center sm:px-10">
                            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                                Your cart is empty.
                            </h2>
                            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                                Start exploring our latest picks and add the products
                                you love to see them here.
                            </p>
                            <button
                                className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                                onClick={() => navigate('/collection')}
                            >
                                Explore collection
                            </button>
                        </div>
                    )}

                    {loading
                        ? loadingCart.map((_, index) => (
                              <div
                                  key={index}
                                  className="mb-4 h-40 w-full animate-pulse rounded-[30px] border border-slate-200 bg-slate-100"
                              ></div>
                          ))
                        : data.map((product) => (
                              <div
                                  key={product?._id}
                                  className="relative mb-4 overflow-hidden rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] sm:p-5"
                              >
                                  <div className="grid gap-5 sm:grid-cols-[160px,1fr]">
                                      <div className="flex h-40 items-center justify-center rounded-[24px] bg-slate-100 p-4">
                                          <img
                                              src={product?.productId?.productImage[0]}
                                              alt={product?.productId?.productName}
                                              className="h-full w-full object-contain"
                                          />
                                      </div>

                                      <div className="pr-10">
                                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                              {product?.productId?.category || 'Product'}
                                          </p>
                                          <h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950 sm:text-xl">
                                              {product?.productId?.productName}
                                          </h2>
                                          <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
                                              <p className="text-base font-medium text-slate-500">
                                                  {displayNARCurrency(product?.productId?.sellingPrice)}
                                              </p>
                                              <p className="text-lg font-semibold text-slate-950">
                                                  {displayNARCurrency(
                                                      (Number(product?.productId?.sellingPrice) || 0) * product?.quantity
                                                  )}
                                              </p>
                                          </div>

                                          <div className="mt-5 flex flex-wrap items-center gap-4">
                                              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                                                  <button
                                                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
                                                      onClick={() => decreaseQty(product?._id, product?.quantity)}
                                                  >
                                                      -
                                                  </button>
                                                  <span className="min-w-6 text-center text-sm font-semibold text-slate-700">
                                                      {product?.quantity}
                                                  </span>
                                                  <button
                                                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-700 transition hover:bg-slate-950 hover:text-white"
                                                      onClick={() => increaseQty(product?._id, product?.quantity)}
                                                  >
                                                      +
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <button
                                      className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition-all duration-300 hover:border-slate-300 hover:bg-slate-950 hover:text-white"
                                      onClick={() => deleteCartProduct(product?._id)}
                                  >
                                      <MdDelete size={20} />
                                  </button>
                              </div>
                          ))}
                </div>

                {(loading || data[0]) && (
                    <div className="w-full min-w-0 lg:sticky lg:top-28 lg:max-w-sm">
                        {loading ? (
                            <div className="h-72 animate-pulse rounded-[30px] border border-slate-200 bg-slate-100"></div>
                        ) : (
                            <div className="min-w-0 rounded-[32px] border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    Order summary
                                </p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                                    Ready when you are.
                                </h2>

                                <div className="mt-6 min-w-0 space-y-4 rounded-[24px] border border-slate-200 bg-white p-5">
                                    <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
                                        <p className="shrink-0">Products</p>
                                        <p className="min-w-0 text-right font-semibold text-slate-900">{data.length}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
                                        <p className="shrink-0">Quantity</p>
                                        <p className="min-w-0 text-right font-semibold text-slate-900">{totalQty}</p>
                                    </div>
                                    <div className="flex min-w-0 items-start justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500">
                                        <p className="shrink-0">Total price</p>
                                        <p className="min-w-0 shrink break-words text-right text-lg font-semibold tabular-nums text-slate-950">
                                            {displayNARCurrency(totalPrice)}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="mt-6 w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                                    onClick={handleCheckout}
                                >
                                    Proceed to checkout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Cart;
