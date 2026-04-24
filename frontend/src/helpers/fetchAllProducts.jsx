import SummaryApi from '../common';

const fetchAllProducts = async () => {
  try {
    const response = await fetch(SummaryApi.allProduct.url, {
      method: SummaryApi.allProduct.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    console.error('fetchAllProducts:', err);
    return { data: [] };
  }
};

export default fetchAllProducts;
