import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { store } from '../store/store';
import { addGuestCartItem } from './guestCart';
import { validateProductForCart } from './validateProductForCart';

const getProductId = (id) => {
  if (id !== null && typeof id === 'object' && 'id' in id) {
    return id.id;
  }
  return id;
};

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const productId = getProductId(id);
  if (!productId) {
    toast.error('Invalid product.');
    return;
  }

  const isLoggedIn = Boolean(store.getState().user.user);

  if (!isLoggedIn) {
    try {
      const { ok, message } = await validateProductForCart(productId);
      if (!ok) {
        toast.error(message || 'This product cannot be added to the cart.');
        return;
      }
      const guest = addGuestCartItem(productId);
      if (guest.error === 'duplicate') {
        toast.error('Already added to cart.');
        return;
      }
      if (guest.success) {
        toast.success('Product added to cart.');
        return { success: true, message: 'Product added to cart.' };
      }
    } catch (err) {
      toast.error('An error occurred. Please try again later.');
      console.error('Error:', err);
    }
    return;
  }

  try {
    const response = await fetch(SummaryApi.addToCartProduct.url, {
      method: SummaryApi.addToCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        productId,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      toast.error(responseData.message || 'Something went wrong!');
      return;
    }

    if (responseData.success) {
      toast.success(responseData.message);
    } else if (responseData.error) {
      toast.error(responseData.message);
    }
    return responseData;
  } catch (err) {
    toast.error('An error occurred. Please try again later.');
    console.error('Error:', err);
  }
};

export default addToCart;
