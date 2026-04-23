import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";
import AuthCallback from "../Pages/AuthCallback";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";
import OrderPage from "../Pages/OrderPage";
import AllOrders from "../Pages/AllOrders";
import Checkout from "../Pages/Checkout";
import FoodProductDetails from "../Pages/FoodProductDetails";
import PayOnDeliveryOrders from "../Pages/PayOnDeliveryOrderPage";
import HRPanel from "../Pages/HrPanel";
import AllLogistics from "../Pages/AllLogisticsAttendants";
import LADashboard from "../Pages/LaPanel";
import ManageOrders from "../Pages/ManageAssignedLAOrder";
import HRAllOrders from "../Pages/HRAllOrders";
import LAAllOrders from "../Pages/LAAllOrders";
import Support from "../Pages/Support";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Collection from "../Pages/Collection";
import Shipping from "../Pages/Shipping";
import Returns from "../Pages/Returns";
import FAQ from "../Pages/FAQ";
import Privacy from "../Pages/Privacy";
import Terms from "../Pages/Terms";
import PurchaseProtection from "../Pages/PurchaseProtection";
import TokenVerification from "../Pages/TokenVerification";
import ResetPassword from "../Pages/ResetPassword";
import AdminOverview from "../Pages/AdminOverview";
import OverviewPage from "../Pages/OverviewPage";
import UsersPage from "../Pages/UsersPage";
import SalesPage from "../Pages/SalesPage";
import AdminOrderPage from "../Pages/AdminOrderPage";
import AssignedOrders from "../Pages/AssignedOrders";
import NotificationsPage from "../Pages/NotificationPage";
import AccountLayout from "../Pages/AccountLayout";
import AccountProfilePage from "../Pages/AccountProfilePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            }, 
            {
                path: "login",
                element: <Login />,
            }, {
                path: "token-verification",
                element: <TokenVerification />,
            },{
                path: "reset-password/:token",
                element: <ResetPassword />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "sign-up",
                element: <SignUp />,
            }, {
                path: "auth/callback",
                element: <AuthCallback />,
            },             {
                path: "support",
                element: <Support />,
            },{
                path: "contact-us",
                element: <ContactUs />,
            },{
                path: "about-us",
                element: <AboutUs />,
            },{
                path: "shipping",
                element: <Shipping />,
            },{
                path: "returns",
                element: <Returns />,
            },{
                path: "faq",
                element: <FAQ />,
            },{
                path: "privacy",
                element: <Privacy />,
            },{
                path: "terms",
                element: <Terms />,
            },{
                path: "purchase-protection",
                element: <PurchaseProtection />,
            },
            {
                path: "collection",
                element: <Collection />,
            },
            {
                path: "product-category",
                element: <CategoryProduct />,
            },
            {
                path: "product/:id",
                element: <ProductDetails />,
            }, {
                path: "foodproduct/:id",
                element: <FoodProductDetails />,
            },
            {
                path: "search/product/:id", // Add this line for searching products
                element: <ProductDetails />, // You can reuse the same component
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "success",
                element: <Success />,
            },
            {
                path: "cancel",
                element: <Cancel />,
            },
            {
                path: "search",
                element: <SearchProduct />,
            },
            {
                path: "account",
                element: <AccountLayout />,
                children: [
                    {
                        index: true,
                        element: <AccountProfilePage />,
                    },
                    {
                        path: "orders",
                        element: <OrderPage />,
                    },
                    {
                        path: "notifications",
                        element: <NotificationsPage />,
                    },
                ],
            },
            {
                path: "order",
                element: <Navigate to="/account/orders" replace />,
            },
            {
                path: "notifications",
                element: <Navigate to="/account/notifications" replace />,
            },
             {
                path: "payondeliveryorder",
                element: <PayOnDeliveryOrders />,
            }, {
                path: "checkout",
                element: <Checkout />,
            }, 
            {
                path: "la-panel",
                element: <LADashboard />,
                children: [
                   {
                        path: "la-all-orders",
                        element: <LAAllOrders />,
                    },
                ],
            },
            {
                path: "admin-overview",
                        element: <AdminOverview />,
                children: [
                    {
                        path: "overview",
                        element: <OverviewPage />,
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />,
                    }, {
                        path: "user-page",
                                element: <UsersPage />,
                    },                    {
                        path: "admin-order-page",
                        element: <AdminOrderPage />,
                    },                    {
                        path: "sale-page",
                        element: <SalesPage />,
                    },

                    {
                        path: "admin-overview",
                        element: <AdminOverview />,
                        children: [
                            {
                                path: "overview",
                                element: <OverviewPage />,
                            },{
                                path: "user-page",
                                element: <UsersPage />
                            },{
                                path: "admin-order-page",
                                element: <AdminOrderPage />
                            },{
                                path: "sale-page",
                                element: <SalesPage />
                            },
                        ]
                    },
                ],
            },
            {
                path: "hr-panel",
                element: <HRPanel />,
                children: [
                    {
                        path: "all-logistics-attendant",
                        element: <AllLogistics />,
                    },{
                        path: "manage-orders",
                        element: <ManageOrders />,
                    },{
                        path: "hr-orders",
                        element: <HRAllOrders />,
                    },
                    {
                        path: "assigned-orders",
                        element: <AssignedOrders />,
                    },
                  
                ],
            },
        ],
    },
]);

export default router;
