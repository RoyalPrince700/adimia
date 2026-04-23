import { getLocalProductsBySubCategory } from "../data/localProducts";

const fetchSubCategoryWiseProduct = async (subCategory) => {
  // Backend version kept here for easy reactivation later.
  // const response = await fetch(SummaryApi.subCategoryWiseProduct.url, {
  //   method: SummaryApi.subCategoryWiseProduct.method,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //       subCategory: subCategory,
  //   }),
  // });
  //
  // const dataResponse = await response.json();
  // return dataResponse;

  return { data: getLocalProductsBySubCategory(subCategory) };
};

export default fetchSubCategoryWiseProduct;
