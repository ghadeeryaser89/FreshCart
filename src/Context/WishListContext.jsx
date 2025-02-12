import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const WishListContext = createContext();
export default function WishListContextProvider({ children }) {
    const {token} = useContext(UserContext);
    const headers = {
        token
    };

    const isAuthenticated = Boolean(token);

    // get user wish list 
    function getUserWishList() {
        if (!isAuthenticated) return;
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
            {
                headers
            }

        )
            .then(data => data)
            .catch(err => err)
    }

    // post user wish 
    function addUserWishList(pId) {
        if (!isAuthenticated) return;
        return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
            { productId: pId }
            ,
            {
                headers
            }

        )
            .then(data => data)
            .catch(err => err)
    }

    // delete user wish 
    function deleteUserWishList(id) {
        if (!isAuthenticated) return;
        return axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + id , 
            {
                headers
            }

        )
            .then(data => data)
            .catch(err => err)
    }


    const [isInWishList, setisInWishList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getWish() {
        setIsLoading(true);
        if (!isAuthenticated) return;
        const response = await getUserWishList();
        if (response.data.status == "success") {
            setisInWishList(response.data.data); 
        }
        setIsLoading(false)
    }
        
    useEffect(() => {
        getWish()
    }, [])


    return <WishListContext.Provider value={{isLoading,setIsLoading,   isInWishList, setisInWishList, getUserWishList, getWish, addUserWishList, deleteUserWishList}}>
        {children}
    </WishListContext.Provider>

}