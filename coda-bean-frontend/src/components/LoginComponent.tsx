import React, { useState } from "react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { useAuth } from "../providers/AuthContext";
import { authService } from "../services/auth.service";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = await authService.login({
        username,
        password,
      });

      // Determine role from the token (adjust based on your actual token format)
      const role = token.includes("ROLE_ADMIN") ? "ROLE_ADMIN" : "ROLE_USER";

      // Use the context login function
      login(token, username, role, rememberMe);

      console.log("Login successful:", token);
      navigate("/"); // Use navigate instead of window.location.href
    } catch (err: any) {
      setError(err?.response?.data || "Login failed. Please try again.");
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
          <p className="text-lg text-[#6E7C6E]">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D4A96A]/30">
          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-[#D4A96A]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-[#4A6B57] text-[#2e312e] placeholder-[#D4A96A]/70"
                    placeholder="yourusername"
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-[#D4A96A]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A6B57] focus:border-[#4A6B57] text-[#2e312e] placeholder-[#D4A96A]/70"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#4A6B57] focus:ring-[#4A6B57] border-[#D4A96A]/50 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-[#6E7C6E]"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-[#4A6B57] hover:text-[#2e2a22]"
                  >
                    Forgot password?
                  </Link>
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
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="px-8 py-4 bg-[#f8f4e9] border-t border-[#D4A96A]/30 text-center">
            <p className="text-sm text-[#6E7C6E]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-[#4A6B57] hover:text-[#2e2a22]"
              >
                Register
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

export default Login;
