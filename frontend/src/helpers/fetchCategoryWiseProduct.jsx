import SummaryApi from '../common';

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
      method: SummaryApi.categoryWiseProduct.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category }),
    });
    return await response.json();
  } catch (err) {
    console.error('fetchCategoryWiseProduct:', err);
    return { data: [] };
  }
};

export default fetchCategoryWiseProduct;
