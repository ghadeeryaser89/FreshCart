import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

function Login() {
  const { setToken } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z].{5,}/, "Must start with uppercase & be at least 6 characters"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      if (response.data.message === "success") {
        setToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-semibold text-center text-green-700 dark:text-green-400">Welcome Back!</h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-6">Sign in to continue</p>

          {errMsg && (
            <div className="p-3 mb-4 text-red-800 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
              {errMsg}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <input
                {...formik.getFieldProps("email")}
                type="email"
                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-green-500 focus:border-green-500 placeholder-transparent"
                placeholder="Email Address"
              />
              <label
                className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:scale-90 peer-focus:text-green-600 dark:peer-focus:text-green-400"
              >
                Email Address
              </label>
              {formik.errors.email && formik.touched.email && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                {...formik.getFieldProps("password")}
                type="password"
                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-green-500 focus:border-green-500 placeholder-transparent"
                placeholder="Password"
              />
              <label
                className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:scale-90 peer-focus:text-green-600 dark:peer-focus:text-green-400"
              >
                Password
              </label>
              {formik.errors.password && formik.touched.password && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Forgot Password & Signup Links */}
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <Link to="/forgetPassword" className="hover:text-green-600 dark:hover:text-green-400 transition">
                Forgot password?
              </Link>
              <span>
                Don't have an account?{" "}
                <Link to="/register" className="text-green-600 hover:underline dark:text-green-400">
                  Sign up
                </Link>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-all flex items-center justify-center"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Login"}
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-center text-gray-400 dark:text-gray-500 text-xs mt-5">
            By signing in, you agree to our <Link to="/terms" className="underline">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
