import { getAllLocalProducts } from "../data/localProducts";

const fetchAllProducts = async () => {
  // Backend version kept here for easy reactivation later.
  // const response = await fetch(SummaryApi.allProduct.url, {
  //   method: SummaryApi.allProduct.method,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  //
  // const dataResponse = await response.json();
  // return dataResponse;

  return { data: getAllLocalProducts() };
};

export default fetchAllProducts;