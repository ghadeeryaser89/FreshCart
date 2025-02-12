import { useFormik } from "formik";
import { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function CheckOut() {
  const { cartId } = useParams();
  const { CheckOutSession } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrMsg("");
      try {
        const response = await CheckOutSession(cartId, values);
        if (response.data?.session?.url) {
          window.location.href = response.data.session.url;
        } else {
          throw new Error("Failed to create checkout session.");
        }
      } catch (error) {
        setErrMsg(error.message || "Something went wrong!");
        toast.error("Payment failed, please try again.");
      }
      setIsLoading(false);
    },
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">Checkout</h2>

      {errMsg && <p className="text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded-md mb-4">{errMsg}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Details Input */}
        <div className="relative">
          <input
            {...formik.getFieldProps("details")}
            type="text"
            id="details"
            className="block w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your address details"
          />
        </div>

        {/* Phone Input */}
        <div className="relative">
          <input
            {...formik.getFieldProps("phone")}
            type="tel"
            id="phone"
            className="block w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* City Input */}
        <div className="relative">
          <input
            {...formik.getFieldProps("city")}
            type="text"
            id="city"
            className="block w-full px-3 py-2 border rounded-md text-gray-900 dark:text-white bg-transparent border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your city"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-700 hover:bg-green-800 transition duration-300 text-white py-2 rounded-md flex justify-center items-center gap-2 disabled:bg-green-300 disabled:cursor-not-allowed"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}

export default CheckOut;
