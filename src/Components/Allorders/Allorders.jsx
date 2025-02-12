import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Orders() {
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }, []);

  async function getOrders(id) {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
    return response.data;
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ["getOrders", userId],
    queryFn: () => getOrders(userId),
    enabled: !!userId,
  });

  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.text("Order Invoice", 20, 20);
    doc.text(`Order ID: ${order.id}`, 20, 30);
    doc.text(`Total Price: ${order.totalOrderPrice} EGP`, 20, 40);
    doc.autoTable({
      startY: 50,
      head: [["Product", "Quantity", "Price"]],
      body: order.cartItems.map((item) => [
        item.product.title,
        item.count,
        `${item.price} EGP`,
      ]),
    });
    doc.save(`Order_${order.id}.pdf`);
  };

  const reorder = (order) => {
    alert(`Reordering items from Order ID: ${order.id}`);
  };

  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-100 dark:bg-gray-900  rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center dark:text-gray-300 text-gray-800 mb-6 animate-fadeIn">My Orders</h2>

        {isLoading && <p className="text-center text-blue-500 animate-pulse">Loading...</p>}
        {isError && <p className="text-center text-red-500 animate-bounce">Error fetching orders.</p>}

        {data?.length ? (
          data.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 mb-6 dark:border-gray-800 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-fadeInUp">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-200">Order ID: {order.id}</h3>
              <p className="text-lg text-gray-700 font-medium dark:text-indigo-200">Total Price: <span className="text-green-500">{order.totalOrderPrice} EGP</span></p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center border p-3 rounded-lg shadow-sm dark:bg-gray-4 00 bg-gray-50 transform hover:scale-105 transition-transform duration-300">
                    <img src={item.product.imageCover} alt={item.product.title} className="w-20 h-20 object-cover rounded-lg mr-4 transition-transform duration-300 hover:scale-110" />
                    <div>
                      <h6 className="font-bold text-gray-800">{item.product.title}</h6>
                      <p className="text-gray-600">Quantity: {item.count}</p>
                      <p className="text-gray-600">Price: {item.price} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <button onClick={() => downloadInvoice(order)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition transform hover:scale-105 animate-fadeIn">Download Invoice</button>
                <button onClick={() => reorder(order)} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition transform hover:scale-105 animate-fadeIn">Reorder</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 animate-fadeIn">No orders found.</p>
        )}

        <Link to="/" className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition block w-fit mx-auto transform hover:scale-105 animate-fadeIn">Back to Shopping</Link>
      </div>
    </>
  );
}
