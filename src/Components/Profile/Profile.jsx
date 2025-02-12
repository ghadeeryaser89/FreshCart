import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  function logOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center border border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Profile</h2>
        {user ? (
          <>
            <FaUserCircle className="text-gray-500 dark:text-gray-400 text-9xl mx-auto" />
            <p className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-100">{user.name || "N/A"}</p>
            <p className="text-gray-500 dark:text-gray-400">Joined: {new Date(user.iat * 1000).toLocaleDateString()}</p>
            <div className="flex justify-center gap-4 mt-6">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700">
                Edit Profile
              </button>
              <button 
                onClick={logOut} 
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition dark:bg-red-600 dark:hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Loading user data...</p>
        )}
      </div>
    </div>
  );
}
