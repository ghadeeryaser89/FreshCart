import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
    const { setToken } = useContext(UserContext);
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const schema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
        newPassword: Yup.string()
            .required("Password is required")
            .matches(
                /^[A-Z].{5,}/,
                "Password must start with an uppercase letter and be at least 6 characters long"
            ),
    });

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: "", newPassword: "" },
        validationSchema: schema,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
        setIsLoading(true);
        try {
            const { data } = await axios.put(
                "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                values
            );
            setToken(data);
            navigate("/login");
        } catch (error) {
            setErrMsg(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-700 px-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-500 shadow-lg rounded-xl p-8">
                    <h2 className="text-2xl font-semibold text-center text-green-700 dark:text-green-400">
                        Reset Your Password
                    </h2>
                    <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
                        Enter your email and new password below.
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
                            <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:scale-90 peer-focus:text-green-600 dark:peer-focus:text-green-400">
                                Email Address
                            </label>
                            {formik.errors.email && formik.touched.email && (
                                <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <input
                                {...formik.getFieldProps("newPassword")}
                                type="password"
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-green-500 focus:border-green-500 placeholder-transparent"
                                placeholder="New Password"
                            />
                            <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:scale-90 peer-focus:text-green-600 dark:peer-focus:text-green-400">
                                New Password
                            </label>
                            {formik.errors.newPassword && formik.touched.newPassword && (
                                <p className="text-sm text-red-600 mt-1">{formik.errors.newPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-all flex items-center justify-center"
                        >
                            {isLoading ? <FaSpinner className="animate-spin" /> : "Reset Password"}
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
