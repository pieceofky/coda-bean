import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { authService, CustomerDto } from "../services/auth.service";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<
    Omit<CustomerDto, "address" | "phone">
  >({
    username: "",
    password: "",
    email: "",
    fullName: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await authService.registerCustomer(formData); // Send the formData (which matches CustomerDto excluding address and phone)
      setSuccessMessage("Registration successful! You can now log in.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err?.response?.data || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#f9f7f2]"
      style={{
        backgroundImage:
          "radial-gradient(#D4A96A 0.5px, transparent 0.5px), radial-gradient(#D4A96A 0.5px, #f9f7f2 0.5px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold text-[#4A6B57] mb-2">
            The Coda Bean
          </h1>
          <p className="text-lg text-[#6E7C6E]">Create a new account</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D4A96A]/30">
          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#4A6B57] mb-1"
                >
                  Username
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-[#D4A96A]" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-[#D4A96A]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-[#4A6B57] text-[#2e312e] placeholder-[#D4A96A]/70"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#4A6B57] mb-1"
                >
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-[#D4A96A]" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-[#D4A96A]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-[#4A6B57] text-[#2e312e] placeholder-[#D4A96A]/70"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-[#4A6B57] mb-1"
                >
                  Full Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-[#D4A96A]" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-[#D4A96A]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-[#4A6B57] text-[#2e312e] placeholder-[#D4A96A]/70"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#4A6B57] mb-1"
                >
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-[#D4A96A]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-[#D4A96A]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-[#4A6B57] text-[#2e312e] placeholder-[#D4A96A]/70"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-[#4A6B57] mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-[#D4A96A]" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-[#D4A96A]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-[#4A6B57] text-[#2e312e] placeholder-[#D4A96A]/70"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
                    isLoading
                      ? "bg-[#4A6B57]/70"
                      : "bg-[#4A6B57] hover:bg-[#2e2a22]"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6B57] transition-colors`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="px-8 py-4 bg-[#f8f4e9] border-t border-[#D4A96A]/30 text-center">
            <p className="text-sm text-[#6E7C6E]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#4A6B57] hover:text-[#2e2a22]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#6E7C6E]">
            By continuing, you agree to our{" "}
            <Link
              to="/terms"
              className="font-medium text-[#4A6B57] hover:text-[#2e2a22]"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="font-medium text-[#4A6B57] hover:text-[#2e2a22]"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
