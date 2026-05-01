/**
 * Checkout statuses that mean payment is captured / prepaid pipeline (not unpaid POD backlog).
 */
const PREPAID_OR_PAID_STATUSES = ['Paid', 'Processing', 'Shipped', 'Delivered'];

export function orderCountsTowardRevenue(order) {
  const s = order?.status;
  if (!s || s === 'Cancelled') return false;
  return PREPAID_OR_PAID_STATUSES.includes(s);
}

export function orderIsDelivered(order) {
  return order?.status === 'Delivered';
}

/** Status label for charts: legacy Paystack "Paid" shows as Processing. */
export function orderStatusBucket(order) {
  const s = order?.status || 'Unknown';
  if (s === 'Paid') return 'Processing';
  return s;
}
