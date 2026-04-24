import SummaryApi from '../common';

export async function validateProductForCart(productId) {
  const res = await fetch(SummaryApi.productDetails.url, {
    method: SummaryApi.productDetails.method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ productId }),
  });
  const json = await res.json();
  const product = json?.data;
  if (!product) {
    return { ok: false, message: 'Product not found.' };
  }
  if (product.productStatus !== 'Available') {
    return { ok: false, message: 'This product is currently unavailable.' };
  }
  if (!product.sellingPrice || product.sellingPrice <= 0) {
    return { ok: false, message: 'Add product from the Extra section.' };
  }
  return { ok: true, product };
}
