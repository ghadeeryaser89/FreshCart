import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
    const token = localStorage.getItem('token') || "";
    const headers = {
        token 
    };

    const isAuthenticated = Boolean(token);
    // get user cart 
    function getUserCart() {
        if (!isAuthenticated) return;
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart",
            {
                headers
            }
        )
            .then(data => data)
            .catch(err => err)
    }
    // post user cart : add to cart 
    function addItemToCart(pId) {
        if (!isAuthenticated) return;
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart"
            ,
            { productId: pId }
            ,
            {
                headers
            }
        )
            .then(data => data)
            .catch(err => err)
    }
    // update user cart 
    function UpdateItemCount(id, count) {
        if (!isAuthenticated) return;
        return axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + id,
            {
                count: count,
            }
            ,
            {
                headers
            }
        )
            .then(data => data)
            .catch(err => err)
    }
    // delete user cart 
    function deleteItemCount(id) {
        if (!isAuthenticated) return;
        return axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + id,
            {
                headers
            }
        )
            .then(data => data)
            .catch(err => err)
    }
    // clear user cart 
    function clearCart() {
        if (!isAuthenticated) return;
        return axios.delete("https://ecommerce.routemisr.com/api/v1/cart",
            {
                headers
            }
        )
            .then(data => data)
            .catch(err => err)
    }
    //checkout
    function CheckOutSession(cartId, shippingAddress) {
        if (!isAuthenticated) return;
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
            {
                shippingAddress: shippingAddress
            }, {
            headers
        }
        )
            .then(data => data)
            .catch(err => err)
    }

    const [cartItems, setCartItems] = useState(0)
    async function getCart() {
        if (!isAuthenticated) return;
        const response = await getUserCart();
        if (response.data.status == "success") {
            setCartItems(response?.data.numOfCartItems);
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    return <CartContext.Provider value={{ cartItems, setCartItems, getUserCart, addItemToCart, UpdateItemCount, deleteItemCount, clearCart, CheckOutSession }}>
        {children}
    </CartContext.Provider>
}