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
    <footer className="w-full bg-gray-50 dark:bg-gray-900 dark:text-white border-t border-gray-300 dark:border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Payment, Download, and Share Link in One Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-center lg:text-left">

           {/* Share Link Section */}
           <div className="w-full lg:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Get a Download Link
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-md mt-1">
              Enter your email and we'll send you a link.
            </p>
            <form className="flex flex-col md:flex-row items-center gap-3 mt-3">
              <input
                type="email"
                className="w-full md:w-2/3 p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-2 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
              >
                <FaShareAlt />
                <span className="text-md font-medium">Send Link</span>
              </button>
            </form>
          </div>
          

         
 {/* Secure Payment Methods */}
 <div className="w-full lg:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Secure Payments
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-md mt-1">
              We accept all major payment providers.
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-4 mt-3">
              <a href="#" className="group" aria-label="Amazon Pay">
                <img src={AmazonLogo} alt="Amazon Pay" className="w-16 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group" aria-label="American Express">
                <img src={AmericanExpress} alt="American Express" className="w-16 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group" aria-label="MasterCard">
                <img src={MasterCard} alt="MasterCard" className="w-16 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group" aria-label="PayPal">
                <img src={PayPal} alt="PayPal" className="w-16 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group" aria-label="Visa">
                <img src={Visa} alt="Visa" className="w-16 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
         
 {/* Download App Section */}
 <div className="w-full lg:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Download the FreshCart App
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-md mt-1">
              Get groceries delivered fast!
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-4 mt-3">
              <a href="#" aria-label="App Store">
                <img src={AppStore} alt="App Store" className="w-32 h-auto opacity-90 hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" aria-label="Google Play">
                <img src={GoogleStore} alt="Google Play" className="w-32 h-auto opacity-90 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-300 dark:border-gray-700" />

        {/* Social Media Links */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-800 dark:text-white mb-3">
            Follow us:
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" aria-label="Facebook" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-3xl transition">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 text-3xl transition">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 text-3xl transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 text-3xl transition">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Footer Copyright */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-md mt-8">
          © 2025 FreshCart eCommerce. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
