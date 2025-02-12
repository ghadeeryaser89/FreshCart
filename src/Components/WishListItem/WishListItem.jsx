import { FcMoneyTransfer } from "react-icons/fc";
import { MdOutlineHeartBroken } from "react-icons/md";
import { BiCartAdd } from "react-icons/bi";

function WishListItem({wishProduct , addItem , deleteWish}) {
 
  return (
    <div className="bg-gray-100 dark:bg-gray-700">
     
        <div className="border border-slate-300 rounded-md shadow-md flex p-4">
          <div className="flex flex-col gap-3">
            <div>
              <img src={wishProduct?.imageCover} alt={wishProduct?.title} />
            </div>
            <div className="mt-2 px-2">
              
              <h4 className=" line-clamp-1">{wishProduct?.title}</h4>
              <h4 className="text-green-600 text-sm pb-2">
                <FcMoneyTransfer className="inline me-1" />
                {wishProduct?.price} EGY</h4>
            </div>
            {/* buttons */}
            <div className="flex justify-center gap-3">
              <button className="bg-red-600 py-2 px-2 rounded-md text-white"
                onClick={()=>deleteWish(wishProduct?._id)}
              >
                <MdOutlineHeartBroken className="inline me-1" />
                Remove Wish</button>
              <button className="bg-green-500 py-2 px-2 rounded-md text-white"
                onClick={() => addItem(wishProduct?._id)}
              >
                <BiCartAdd className="inline me-1" />
                Add To Cart</button>
            </div>
          </div>
        </div>
     
    </div>


  );
}

export default WishListItem;
