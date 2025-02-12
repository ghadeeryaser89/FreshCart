import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";

function ForgetPassword() {
  const { setToken } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      if (response.data.statusMsg === "success") {
        setToken(response.data.token);
        localStorage.setItem("userEmail", values.email);
        navigate("/verifyResetCode");
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-center text-green-700 dark:text-green-400">
            Forgot Your Password?
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
            Enter your email to receive a password reset link.
          </p>

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-all flex items-center justify-center"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Send Reset Link"}
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-5">
            Remember your password?{" "}
            <a href="/login" className="text-green-600 hover:underline dark:text-green-400">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
