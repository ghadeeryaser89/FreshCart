import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { FaRegTrashAlt } from "react-icons/fa";
import CartItem from '../CartItem/CartItem';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from './../Loading/Loading';
import EmptyCart from '../EmptyCart/EmptyCart';
import { Helmet } from 'react-helmet';

function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getUserCart, clearCart } = useContext(CartContext);

  // Get User Cart
  async function getLoggedUserCart() {
    setIsLoading(true);
    const response = await getUserCart();
    if (response?.data.status === "success") {
      setCartDetails(response?.data.data);
    }
    setIsLoading(false);
  }

  // Clear cart
  async function clearAllCart() {
    setIsLoading(true);
    const response = await clearCart();
    if (response.data.message === "success") {
      setCartDetails({ ...cartDetails, products: [], totalCartPrice: "0" });
      toast.success('Cart cleared successfully');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartDetails && cartDetails.products.length === 0 && cartDetails?.totalCartPrice == 0 ? (
        <EmptyCart />
      ) : (
        <div className="max-w-5xl mx-auto my-6 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
          {/* Cart Header */}
          <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">Your Shopping Cart</h2>
            <div className="flex justify-between items-center mt-2">
              <h3 className="text-lg">
                Total Price: <span className="text-green-600 font-semibold">{cartDetails?.totalCartPrice} EGY</span>
              </h3>
              <button
                onClick={clearAllCart}
                className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-300 hover:bg-red-600"
              >
                <FaRegTrashAlt />
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-gray-200 dark:bg-gray-700 dark:text-white py-4 px-4 rounded-b-lg">
            {cartDetails?.products.map(p => (
              <CartItem
                key={p._id}
                count={p.count}
                price={p.price}
                product={p.product}
                setCartDetails={setCartDetails}
              />
            ))}

            {/* Checkout Button */}
            <div className="flex justify-center mt-6">
              <Link
                to={'/checkout/' + cartDetails?._id}
                className="bg-green-600 hover:bg-green-700 transition duration-300 text-white py-3 px-6 rounded-lg text-lg font-semibold"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
