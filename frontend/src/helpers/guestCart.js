const GUEST_CART_KEY = 'adimia_guest_cart_v1';

export function getGuestCartItems() {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveGuestCartItems(items) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

export function getGuestCartLineCount() {
  return getGuestCartItems().length;
}

export function addGuestCartItem(productId) {
  const id = String(productId);
  const items = getGuestCartItems();
  if (items.some((x) => x.productId === id)) {
    return { success: false, error: 'duplicate' };
  }
  items.push({ productId: id, quantity: 1 });
  saveGuestCartItems(items);
  return { success: true };
}

export function updateGuestCartQuantity(productId, quantity) {
  const id = String(productId);
  const items = getGuestCartItems().map((row) =>
    row.productId === id ? { ...row, quantity: Math.max(1, Number(quantity) || 1) } : row
  );
  saveGuestCartItems(items);
}

export function removeGuestCartItem(productId) {
  const id = String(productId);
  saveGuestCartItems(getGuestCartItems().filter((row) => row.productId !== id));
}

export function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
}

/**
 * One synchronous step: read guest items and clear storage.
 * Stops parallel merge runs (App + callback + strict mode) from all POSTing the same addtocart and creating duplicate lines.
 */
export function takeGuestCartForMerge() {
  const items = getGuestCartItems();
  if (!items.length) {
    return [];
  }
  clearGuestCart();
  return items;
}
