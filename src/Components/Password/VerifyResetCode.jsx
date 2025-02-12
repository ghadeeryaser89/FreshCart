import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30); // Resend code cooldown timer
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";
  const inputRefs = useRef([]);

  const { handleSubmit, values, errors, setFieldValue, touched } = useFormik({
    initialValues: {
      resetCode: Array(6).fill(""),
    },
    onSubmit: verify,
    validationSchema: Yup.object({
      resetCode: Yup.array()
        .of(Yup.string().matches(/^\d$/, "Each digit must be a number.").required())
        .test("all-required", "All fields are required.", (value) => value.every((v) => v !== ""))
        .length(6, "Reset code must be exactly 6 digits."),
    }),
  });

  async function verify() {
    setIsLoading(true);
    try {
      const resetCode = values.resetCode.join("");
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      toast.success("Reset code submitted!");
      navigate("/resetPassword");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e, index) => {
    if (!/^\d$/.test(e.key) && !["Backspace", "Delete", "Tab"].includes(e.key)) {
      e.preventDefault();
    }
    if ((e.key === "Backspace" || e.key === "Delete") && index > 0) {
      setFieldValue(`resetCode[${index}]`, "");
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInput = (e, index) => {
    const { value } = e.target;
    if (value) {
      setFieldValue(`resetCode[${index}]`, value);
      if (index < values.resetCode.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (e) => e.target.select();

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${values.resetCode.length}}$`).test(text)) return;
    text.split("").forEach((digit, i) => setFieldValue(`resetCode[${i}]`, digit));
  };

  async function resendCode() {
    setResendDisabled(true);
    setCountdown(30);
    setIsLoading(true);
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email });
      toast.success("A new reset code has been sent to your email!");
      localStorage.removeItem("userEmail");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendDisabled]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Helmet>
        <title>Verify Code</title>
      </Helmet>
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white max-w-md w-full p-6 rounded-xl shadow-lg">
        <h3 className="text-3xl font-bold text-center text-green-600">Email Verification</h3>
        <p className="mt-2 text-center">Enter the 6-digit code sent to your email.</p>
        <hr className="mt-4 mb-4 border-green-400 dark:border-gray-700" />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {values.resetCode.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={handleFocus}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-2xl font-bold text-center border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm"
              />
            ))}
          </div>

          {errors.resetCode && touched.resetCode && (
            <p className="text-red-500 text-center mt-2">{errors.resetCode}</p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 text-lg font-semibold text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-all disabled:bg-green-400"
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Verify"}
          </button>

          <p className="text-center mt-4">
            Didn't receive the code?{" "}
            <button
              onClick={resendCode}
              className="text-green-500 font-semibold hover:underline disabled:opacity-50"
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
