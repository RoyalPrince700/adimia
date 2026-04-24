import SummaryApi from '../common';

const fetchHotDealWiseProduct = async (hotDeal) => {
  try {
    const response = await fetch(SummaryApi.hotDealWiseProduct.url, {
      method: SummaryApi.hotDealWiseProduct.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hotDeal }),
    });
    return await response.json();
  } catch (err) {
    console.error('fetchHotDealWiseProduct:', err);
    return { data: [] };
  }
};

export default fetchHotDealWiseProduct;
