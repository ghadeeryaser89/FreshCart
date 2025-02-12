import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

function Register() {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  // Validation Schema
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Must be at least 3 characters")
      .max(10, "Max 10 characters"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z].{5,}/, "Must start with uppercase & be at least 6 characters"),
    rePassword: Yup.string()
      .required("Passwords must match")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian number"),
  });

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (data.message === "success") {
        navigate("/");
        setToken(data.token);
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 text-center">
            Register Now
          </h2>

          {/* Error Message */}
          {errMsg && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="p-3 text-red-800 bg-red-100 dark:bg-red-700 dark:text-white rounded-md text-center my-4"
            >
              {errMsg}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {["name", "email", "password", "rePassword", "phone"].map((field) => (
              <div key={field} className="relative">
                <input
                  {...formik.getFieldProps(field)}
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  className={`block w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                    formik.errors[field] && formik.touched[field] ? "border-red-500" : ""
                  }`}
                  placeholder={`Enter your ${field}`}
                />
                {formik.errors[field] && formik.touched[field] && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-red-500 text-sm mt-1"
                  >
                    {formik.errors[field]}
                  </motion.p>
                )}
              </div>
            ))}

            {/* Submit Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 text-white bg-green-700 hover:bg-green-800 disabled:bg-green-300 font-semibold rounded-lg px-6 py-3 transition-all"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Register;
