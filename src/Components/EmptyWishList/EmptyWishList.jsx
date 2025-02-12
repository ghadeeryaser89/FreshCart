import { Link } from "react-router-dom";
import emptyWishList from "../../assets/imgs/wishList.svg";

function EmptyWishList() {
  return (
    <div className="h-[60vh] flex flex-col justify-center items-center text-center px-4">
      <img
        src={emptyWishList}
        alt="Empty WishList"
        className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl w-full h-auto mb-6"
      />
      <h4 className="text-lg sm:text-xl text-gray-700 dark:text-gray-100 font-semibold">
        Your wishlist is empty! Time to treat yourself —
        <Link
          to={"/"}
          className="cursor-pointer text-green-600 font-bold ml-2 transition-all duration-300 hover:underline hover:text-green-500"
        >
          Start Shopping!
        </Link>
      </h4>
    </div>
  );
}

export default EmptyWishList;
