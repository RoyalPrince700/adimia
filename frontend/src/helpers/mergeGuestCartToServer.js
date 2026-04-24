import SummaryApi from '../common';
import { takeGuestCartForMerge } from './guestCart';

async function updateLineQuantity(cartItemId, quantity) {
  return fetch(SummaryApi.updateCartProduct.url, {
    method: SummaryApi.updateCartProduct.method,
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      _id: cartItemId,
      quantity: Math.max(1, Number(quantity) || 1),
    }),
  });
}

function coalesceByProductId(items) {
  const map = new Map();
  for (const row of items) {
    const id = String(row.productId);
    const q = Math.max(1, Number(row.quantity) || 1);
    map.set(id, (map.get(id) || 0) + q);
  }
  return Array.from(map.entries(), ([productId, quantity]) => ({ productId, quantity }));
}

/**
 * Merges local guest cart into the authenticated user's server cart.
 * Guest data is taken and cleared synchronously before any network call so parallel invocations cannot duplicate lines.
 */
export async function mergeGuestCartToServer() {
  const items = coalesceByProductId(takeGuestCartForMerge());
  if (!items.length) {
    return;
  }

  for (const { productId, quantity } of items) {
    const gQty = Math.max(1, Number(quantity) || 1);
    const res = await fetch(SummaryApi.addToCartProduct.url, {
      method: SummaryApi.addToCartProduct.method,
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.success) {
      const newId = data?.data?._id;
      if (newId && gQty > 1) {
        await updateLineQuantity(newId, gQty);
      }
    } else if (data?.message && String(data.message).includes('Already added')) {
      const viewRes = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
      });
      const viewJson = await viewRes.json().catch(() => ({}));
      const list = viewJson?.data;
      if (!Array.isArray(list)) continue;
      const line = list.find(
        (p) => String(p?.productId?._id || p?.productId) === String(productId)
      );
      if (line?._id) {
        await updateLineQuantity(line._id, gQty);
      }
    }
  }
}
