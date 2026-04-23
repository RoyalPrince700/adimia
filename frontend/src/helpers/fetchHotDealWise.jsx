import { getLocalHotDealProducts } from "../data/localProducts";

const fetchHotDealWiseProduct = async (hotDeal) => {
  // Backend version kept here for easy reactivation later.
  // const response = await fetch(SummaryApi.hotDealWiseProduct.url, {
  //   method: SummaryApi.hotDealWiseProduct.method,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     hotDeal: hotDeal,
  //   }),
  // });
  //
  // const dataResponse = await response.json();
  // return dataResponse;

  return { data: getLocalHotDealProducts(hotDeal) };
};

export default fetchHotDealWiseProduct;
