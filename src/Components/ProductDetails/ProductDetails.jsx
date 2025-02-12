import axios from "axios";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";

function ProductDetails() {
  const { addItemToCart, setCartItems } = useContext(CartContext);
  let sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  async function addItem(id) {
    const response = await addItemToCart(id);
    if (response.data.status === "success") {
      setCartItems(response.data.numOfCartItems);
      toast.success("Added to cart", { position: "top-right" });
    }
  }

  const { id } = useParams();
  const { data: productDetails, isLoading, isError, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data.data.data,
  });

  if (isError) {
    return <div className="text-center text-red-500 font-semibold">Error: {error.message}</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl">
          {/* Image Slider Section */}
          <div className="md:col-span-1 p-5 flex justify-center">
            <Slider ref={(slider) => (sliderRef = slider)} {...settings} className="w-full max-w-lg">
              {productDetails?.images.map((i, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    src={i}
                    alt="Product"
                    className="w-full h-80 object-contain rounded-xl shadow-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Product Details Section */}
          <div className="md:col-span-1 p-6 dark:text-white">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {productDetails?.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {productDetails?.description}
            </p>

            <div className="text-lg text-green-600 font-semibold mt-4">
              Category: {productDetails?.category?.name}
            </div>

            <div className="flex justify-between items-center mt-5">
              <p className="text-3xl font-bold text-green-700">{productDetails?.price} EGY</p>
              <div className="flex items-center text-xl">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">
                  {productDetails?.ratingsAverage}
                </span>
                <FaStar className="text-yellow-400 ml-1" />
              </div>
            </div>

            <button
              onClick={() => addItem(productDetails._id)}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-all duration-200 rounded-lg py-3 text-lg text-white font-semibold shadow-md"
            >
              <FaCartPlus /> Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
