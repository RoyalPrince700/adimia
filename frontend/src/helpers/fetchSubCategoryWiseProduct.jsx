import SummaryApi from '../common';

const fetchSubCategoryWiseProduct = async (subCategory) => {
  try {
    const response = await fetch(SummaryApi.subCategoryWiseProduct.url, {
      method: SummaryApi.subCategoryWiseProduct.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subCategory }),
    });
    return await response.json();
  } catch (err) {
    console.error('fetchSubCategoryWiseProduct:', err);
    return { data: [] };
  }
};

export default fetchSubCategoryWiseProduct;
