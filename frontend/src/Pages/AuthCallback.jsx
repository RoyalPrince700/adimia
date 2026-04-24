import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Context from '../context';
import { mergeGuestCartToServer } from '../helpers/mergeGuestCartToServer';

function AuthCallback() {
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const handleAuth = async () => {
      if (token) {
        try {
          await fetchUserDetails();
          await mergeGuestCartToServer();
          await fetchUserAddToCart();
          const postLogin = sessionStorage.getItem('postLoginRedirect');
          if (postLogin && postLogin.startsWith('/')) {
            sessionStorage.removeItem('postLoginRedirect');
            navigate(postLogin, { replace: true });
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Auth callback error:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleAuth();
  }, [location, fetchUserDetails, fetchUserAddToCart, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}

export default AuthCallback;

