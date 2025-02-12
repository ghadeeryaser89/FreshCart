import { Link } from "react-router-dom";
import emptycart from "../../assets/imgs/picsvg_download.svg";

function EmptyCart() {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh] text-center px-4">
      {/* Cart Image */}
      <img src={emptycart} alt="Empty Cart" className="w-[250px] md:w-[300px] lg:w-[350px] h-auto mb-4" />

      {/* Message */}
      <h4 className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-100">
        Your cart is empty! Time to treat yourself —
        <Link to={"/"} className="text-green-600 font-semibold hover:underline ml-2">
          Start Shopping!
        </Link>
      </h4>
    </div>
  );
}

export default EmptyCart;
