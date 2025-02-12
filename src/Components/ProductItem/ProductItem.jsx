import { useState, useContext, useEffect } from "react";
import { FaHeart, FaStar, FaRegHeart, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

function ProductItem({ product }) {
  const { addItemToCart, setCartItems } = useContext(CartContext);
  const { addUserWishList, deleteUserWishList, setisInWishList } = useContext(WishListContext);

  const [isKeptWishlist, setIsKeptWishlist] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false); 
  const [isLoadingCart, setIsLoadingCart] = useState(false); 
  const {token} = useContext(UserContext);
    const headers = {
        token
    };

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    async function getUserWishlist() {
      setIsLoadingWishlist(true);
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers
        });
        const wishlistIds = data.data.map((item) => item._id);
        setIsKeptWishlist(wishlistIds.includes(product._id));
      } catch (error) {
        error
      } finally {
        setIsLoadingWishlist(false);
      }
    }
    getUserWishlist();
  }, [product._id]);

  async function handleWishlistToggle(id) {
    setIsLoadingWishlist(true);
    if (isKeptWishlist) {
      const response = await deleteUserWishList(id);
      if (response.data.status === "success") {
        setisInWishList(response?.data.data);
        toast.success("Removed from wishlist");
      }
    } else {
      const response = await addUserWishList(id);
      if (response.data.status === "success") {
        setisInWishList(response?.data.data);
        toast.success("Added to wishlist");
      }
    }
    setIsKeptWishlist(!isKeptWishlist);
    setIsLoadingWishlist(false);
  }

  async function addItem(id) {
    setIsLoadingCart(true);
    const response = await addItemToCart(id);
    if (response.data.status === "success") {
      setCartItems(response.data.numOfCartItems);
      toast.success("Added to cart");
    }
    setIsLoadingCart(false);
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-700 dark:border dark:border-gray-500 border rounded-sm hover:shadow-[0_2px_10px_-3px_rgba(26,50,0.3)]">
      <div className="group relative">
        {/* Heart Icon */}
        <button disabled={isLoadingWishlist} onClick={() => handleWishlistToggle(product._id)}>
          {isLoadingWishlist ? (
            <FaSpinner className="absolute top-8 end-3 text-2xl z-50 text-green-600 animate-spin" />
          ) : isKeptWishlist ? (
            <FaHeart className="absolute top-8 end-3 text-2xl z-50 text-red-600" />
          ) : (
            <FaRegHeart className="absolute top-8 end-3 text-2xl z-50 text-green-600" />
          )}
        </button>

        <Link to={`/ProductDetails/${product._id}`}>
          <img src={product.imageCover} alt="" className="w-3/4 m-auto object-cover p-2" />
          <div className="px-5">
            <p className="text-green-600 line-clamp-3 my-2 text-sm">{product.category.name}</p>
            <h3 className="my-3 truncate h4 dark:text-white">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h3>
            <div className="flex justify-between mx-2 mb-2 dark:text-white">
              <p>{product.price} EGY</p>
              <p className="flex items-center">
                {product.ratingsAverage}
                <FaStar className="text-yellow-400 ms-1" />
              </p>
            </div>
          </div>
        </Link>

        <div className="flex justify-center items-center">
        <button
            disabled={isLoadingCart}
            onClick={() => addItem(product._id)}
            className="w-3/4 mb-4 disabled:bg-green-200 disabled:text-gray-500  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 translate-y-full bg-green-600 text-white py-2 rounded-md opacity-0 flex justify-center items-center"
          >
            {isLoadingCart ? <FaSpinner className="animate-spin" /> : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
