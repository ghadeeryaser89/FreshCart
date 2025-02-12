import { useContext, useEffect } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import WishListItem from "../WishListItem/WishListItem";
import EmptyWishList from "../EmptyWishList/EmptyWishList";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function WishList() {
  const { addItemToCart, setCartItems } = useContext(CartContext);
  const { isInWishList, setisInWishList, getWish, deleteUserWishList, isLoading, setIsLoading } =
    useContext(WishListContext);

  useEffect(() => {
    getWish();
  }, []);

  // Add product to cart
  async function addItem(id) {
    setIsLoading(true);
    const response = await addItemToCart(id);
    if (response.data.status === "success") {
      setIsLoading(false);
      setCartItems(response.data.numOfCartItems);
      toast.success("Added to cart.");
    }
  }

  // Delete item from wishlist
  async function deleteWish(id) {
    setIsLoading(true);
    const response = await deleteUserWishList(id);
    if (response.data.status === "success") {
      setIsLoading(false);

      // Update wishlist state
      const updatedWishList = isInWishList.filter((item) =>
        response.data.data.includes(item._id)
      );
      setisInWishList(updatedWishList);

      toast.success("Removed from wishlist.");
    }
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>My Wishlist</title>
      </Helmet>

      <div className="container mx-auto px-6 py-10">
        <h1 className="text-center text-4xl font-extrabold text-green-700 mb-8 tracking-wide">
          My Wishlist
        </h1>

        {isInWishList?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-600">
            <EmptyWishList />
           
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isInWishList?.map((w, index) => (
              <div
                key={w?._id || index}
                className="p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105"
              >
                <WishListItem 
                  wishProduct={w} 
                  addItem={() => addItem(w._id)} 
                  deleteWish={() => deleteWish(w._id)} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
