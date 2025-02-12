import { FaShareAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import AmazonLogo from "../../assets/imgs/Amazon-Pay-logo.svg";
import AmericanExpress from "../../assets/imgs/american-express.svg";
import MasterCard from "../../assets/imgs/mastercard.svg";
import PayPal from "../../assets/imgs/paypal.svg";
import Visa from "../../assets/imgs/visa-1.svg";
import AppStore from "../../assets/imgs/app-store.svg";
import GoogleStore from "../../assets/imgs/google-store.svg";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 mt-10">
      <div className="container mx-auto px-6 lg:px-10 py-12">
        {/* App Download Section */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Get the FreshCart App
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            We’ll send you a link. Open it on your phone to download the app.
          </p>
          <form className="flex flex-col md:flex-row items-center gap-4 mt-6">
            <input
              type="email"
              className="w-full md:w-2/3 p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            >
              <FaShareAlt />
              <span className="font-medium">Share App Link</span>
            </button>
          </form>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        {/* Payment & Download Options */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-lg text-gray-800 dark:text-white">Payment Partners:</span>
            {[AmazonLogo, AmericanExpress, MasterCard, PayPal, Visa].map((logo, index) => (
              <img key={index} src={logo} alt="Payment Method" className="w-[80px] h-[50px] object-contain opacity-80 hover:opacity-100 transition-opacity" />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-lg text-gray-800 dark:text-white">Get deliveries with FreshCart:</span>
            {[AppStore, GoogleStore].map((logo, index) => (
              <img key={index} src={logo} alt="App Store" className="w-[140px] h-[200px] object-contain opacity-80 hover:opacity-100 transition-opacity" />
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        {/* Social Media Links */}
        <div className="text-center text-lg font-medium text-gray-800 dark:text-white mb-3">
          You can find us:
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-2xl"><FaFacebook /></a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 text-2xl"><FaTwitter /></a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 text-2xl"><FaInstagram /></a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 text-2xl"><FaLinkedin /></a>
        </div>

        {/* Footer Copyright */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          © 2025 FreshCart eCommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
