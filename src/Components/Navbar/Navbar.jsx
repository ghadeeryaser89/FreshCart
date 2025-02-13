import logo from "../../assets/imgs/fav.png";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes, FaHeart, FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-white dark:bg-gray-900 py-4 border-b border-gray-300 dark:border-gray-700 shadow-lg relative z-50">
      <div className="max-w-[1400px] flex items-center justify-between mx-auto py-4 px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center hover:scale-110 transition-transform">
          <img src={logo} alt="FreshCart" className="w-12 h-10" />
          <h1 className="text-black dark:text-green-400 text-3xl font-extrabold ms-4">FreshCart</h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-2xl text-gray-800 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition md:hidden"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl text-gray-800 dark:text-gray-300">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        

        {/* Navigation Links */}
        <div className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:flex items-center md:space-x-8 text-gray-900 dark:text-gray-300 text-lg font-medium p-6 md:p-0 shadow-md md:shadow-none transition-transform ${menuOpen ? "flex flex-col" : "hidden"}`}>
          {token && (
            <>
              <Link to="/" className="block md:inline-block hover:text-green-700 dark:hover:text-green-400 transition">Home</Link>
              <Link to="/products" className="block md:inline-block hover:text-green-700 dark:hover:text-green-400 transition">Products</Link>
              <Link to="/categories" className="block md:inline-block hover:text-green-700 dark:hover:text-green-400 transition">Categories</Link>
              <Link to="/brands" className="block md:inline-block hover:text-green-700 dark:hover:text-green-400 transition">Brands</Link>
              <Link to="/allorders" className="block md:inline-block hover:text-green-700 dark:hover:text-green-400 transition">Orders</Link>
              {/* Extra options for small screens */}
              <div className="md:hidden flex flex-col space-y-2 mt-4">
                <Link to="/wishlist" className="block hover:text-green-700 dark:hover:text-green-400 transition">Wishlist</Link>
                <Link to="/cart" className="block hover:text-green-700 dark:hover:text-green-400 transition">Cart ({cartItems})</Link>
                <Link to="/profile" className="block hover:text-green-700 dark:hover:text-green-400 transition">Profile</Link>
              </div>
            </>
          )}
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-2xl text-gray-800 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Login & Register or User Actions */}
          {!token ? (
            <>
              <Link to="/login" className="text-lg hover:text-green-500 transition dark:text-gray-300">Log In</Link>
              <Link to="/register" className="text-lg hover:text-green-500 transition dark:text-gray-300">Register</Link>
            </>
          ) : (
            <>
              <Link to="/wishlist" className="text-lg hover:text-green-500 transition text-red-500"><FaHeart className="text-2xl" /></Link>
              <Link to="/cart" className="relative text-lg hover:text-green-500 transition dark:text-gray-300"><IoCartOutline className="text-2xl" /><span className="text-sm text-white bg-green-500 rounded-md px-1 absolute top-0 end-0 translate-x-1/2 -translate-y-1/2">{cartItems}</span></Link>
              <Link to="/profile" className="text-lg hover:text-green-500 transition dark:text-gray-300"><FaUserCircle className="text-2xl" /></Link>
              <button onClick={logOut} className="text-lg hover:text-green-500 dark:hover:text-green-400 transition dark:text-gray-300">Log Out</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
