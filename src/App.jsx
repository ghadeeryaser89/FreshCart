import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import CheckOut from './Components/CheckOut/CheckOut';
import Categories from './Components/Categories/Categories';
import SubCategories from './Components/SubCategories/SubCategories';
import Layout from './Components/Layout/Layout';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Allorders from './Components/Allorders/Allorders';
import WishList from './Components/WishList/WishList';
import WishListContextProvider from './Context/WishListContext';
import ForgetPassword from './Components/Password/ForgetPassword';
import VerifyResetCode from './Components/Password/VerifyResetCode';
import ResetPassword from './Components/Password/ResetPassword';
import { Offline } from 'react-detect-offline';
import Profile from './Components/Profile/Profile';

function App() {
  const router = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verifyResetCode", element: <VerifyResetCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "register", element: <Register /> },
        { path: "notFound", element: <NotFound /> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "checkout/:cartId", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><Allorders /></ProtectedRoute> },
        { path: "ProductDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "subcategories/:categoryId", element: <ProtectedRoute><SubCategories /></ProtectedRoute> },
        { path:"profile", element:<ProtectedRoute><Profile/></ProtectedRoute> },  
        { path: "*", element: <NotFound /> },
      ]
    }
  ]);

  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <Offline>
                <div className="fixed top-0 left-0 w-full p-4 text-center text-white bg-red-600">
                  You are currently offline!
                </div>
              </Offline>
            </WishListContextProvider>
          </CartContextProvider>
        </UserContextProvider>
        <Toaster toastOptions={{
          success: {
            style: { backgroundColor: "green", color: "white" },
            position: "top-right"
          },
          error: {
            style: { backgroundColor: "red", color: "white" },
            position: "top-right"
          }
        }} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App;
