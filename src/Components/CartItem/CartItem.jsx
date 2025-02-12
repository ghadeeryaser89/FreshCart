import { useContext, useState } from "react";
import { FaRegTrashAlt, FaSpinner } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

function CartItem({ count, price, product, setCartDetails }) {
  const [isIncrementLoading, setIsIncrementLoading] = useState(false);
  const [isDecrementLoading, setIsDecrementLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const { UpdateItemCount, deleteItemCount } = useContext(CartContext);

  // Update Item Count (Decrement or Increment)
  async function UpdateCount(id, newCount, action) {
    if (action === "increment") {
      setIsIncrementLoading(true);
    } else {
      setIsDecrementLoading(true);
    }

    const response = await UpdateItemCount(id, newCount);
    if (response.data.status === "success") {
      setCartDetails(response?.data.data);
      toast.success("Updated");
    }

    setIsIncrementLoading(false);
    setIsDecrementLoading(false);
  }

  // Delete Item from Cart
  async function deleteItemFromCart(id) {
    setIsDeleteLoading(true);
    const response = await deleteItemCount(id);
    if (response.data.status === "success") {
      setCartDetails(response?.data.data);
      toast.success("Deleted");
    }
    setIsDeleteLoading(false);
  }

  return (
    <>
      <div className="flex items-center gap-4 p-4 border-b border-gray-300 dark:border-gray-700">
        {/* Product Image */}
        <img
          src={product?.imageCover}
          alt={product?.title}
          className="h-[100px] w-[100px] object-cover rounded-lg shadow-md"
        />

        {/* Product Details */}
        <div className="flex flex-col flex-1">
          <p className="text-gray-800 dark:text-gray-100 font-medium">{product?.title}</p>
          <p className="text-green-600 text-lg font-semibold flex items-center">
            <FcMoneyTransfer className="mr-1" />
            {price} EGY
          </p>

          {/* Delete Button */}
          <button
            onClick={() => deleteItemFromCart(product.id)}
            className="mt-2 text-red-500 font-medium flex items-center gap-1 transition duration-200 hover:text-red-700"
            aria-label={`Remove ${product?.title} from cart`}>
            {isDeleteLoading ? <FaSpinner className="animate-spin" /> : <FaRegTrashAlt />}
            Remove
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          {/* Decrement Button */}
          <button
            onClick={() => UpdateCount(product.id, count - 1, "decrement")}
            disabled={count === 1 || isDecrementLoading || isDeleteLoading}
            className={`border border-green-500 text-green-600 px-3 py-1 rounded-md font-bold transition duration-200 hover:bg-green-500 hover:text-white ${
              count === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {isDecrementLoading ? <FaSpinner className="animate-spin" /> : "-"}
          </button>

          {/* Quantity Display */}
          <span className="text-lg font-semibold">{count}</span>

          {/* Increment Button */}
          <button
            onClick={() => UpdateCount(product.id, count + 1, "increment")}
            disabled={isIncrementLoading || isDeleteLoading}
            className="border border-green-500 text-green-600 px-3 py-1 rounded-md font-bold transition duration-200 hover:bg-green-500 hover:text-white">
            {isIncrementLoading ? <FaSpinner className="animate-spin" /> : "+"}
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
