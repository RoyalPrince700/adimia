import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import moment from 'moment';
import displayNARCurrency from '../helpers/displayCurrency';
import { useSocket } from '../context/SocketContext';
import { toast } from 'react-toastify';

const statusStyles = {
  Delivered: 'bg-emerald-50 text-emerald-800 ring-emerald-600/20',
  Pending: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  Cancelled: 'bg-red-50 text-red-800 ring-red-600/20',
};

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.payondeliveryorder.url, {
        method: SummaryApi.payondeliveryorder.method,
        credentials: 'include',
      });

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error('Failed to fetch user orders', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleOrderStatusChange = (updateData) => {
      setData((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updateData.orderId ? { ...order, status: updateData.newStatus } : order
        )
      );

      toast.info(`Order #${updateData.orderId.slice(-6)} status updated to ${updateData.newStatus}`, {
        position: 'top-right',
        autoClose: 5000,
      });
    };

    socket.on('order-status-changed', handleOrderStatusChange);

    return () => {
      socket.off('order-status-changed', handleOrderStatusChange);
    };
  }, [socket]);

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl">Order history</h2>
        <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
          Track recent purchases, totals, and delivery details. Status updates may also appear here in real time.
        </p>
      </div>

      {loading ? (
        <div className="mt-8 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      ) : !data.length ? (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-14 text-center">
          <p className="text-base font-medium text-slate-800">You have not placed an order yet</p>
          <p className="mt-2 text-sm text-slate-600">When you check out, your orders will show up here.</p>
          <Link
            to="/product-category"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {data.map((item) => {
            const shortId = item._id ? item._id.slice(-6).toUpperCase() : '—';
            const statusClass =
              statusStyles[item.status] || 'bg-slate-100 text-slate-800 ring-slate-600/15';

            return (
              <article
                key={item._id}
                className="overflow-hidden rounded-[28px] border border-slate-200/90 bg-[linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(248,250,252,0.96))] shadow-sm"
              >
                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Order</p>
                    <p className="mt-1 font-mono text-sm font-semibold text-slate-950">#{shortId}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      Placed {moment(item.createdAt).format('LL')}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusClass}`}
                    >
                      {item.status || 'Pending'}
                    </span>
                    <p className="text-lg font-semibold tracking-tight text-slate-950">
                      {displayNARCurrency(item.totalPrice)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 p-5 sm:p-6">
                  {item.cartItems?.map((product) => (
                    <div
                      key={product._id}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-white/90 p-4"
                    >
                      <img
                        src={product?.productId?.productImage?.[0] || 'https://via.placeholder.com/100'}
                        alt={product?.productId?.productName || 'Product'}
                        className="h-20 w-20 shrink-0 rounded-xl border border-slate-100 object-contain"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100';
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                          {product?.productId?.productName || 'Product no longer available'}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">Qty {product?.quantity}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {product?.productId?.sellingPrice
                            ? displayNARCurrency(product.productId.sellingPrice)
                            : product?.price
                              ? displayNARCurrency(product.price)
                              : '—'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {item.address ? (
                  <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Shipping address
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item.address}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
