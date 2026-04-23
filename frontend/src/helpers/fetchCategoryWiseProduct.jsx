import { getLocalProductsByCategory } from "../data/localProducts";

const fetchCategoryWiseProduct = async (category) => {
  // Backend version kept here for easy reactivation later.
  // const response = await fetch(SummaryApi.categoryWiseProduct.url, {
  //   method: SummaryApi.categoryWiseProduct.method,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     category: category,
  //   }),
  // });
  //
  // const dataResponse = await response.json();
  // return dataResponse;

  return { data: getLocalProductsByCategory(category) };
};

export default fetchCategoryWiseProduct;
