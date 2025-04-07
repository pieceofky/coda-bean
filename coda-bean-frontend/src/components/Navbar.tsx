import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl font-bold text-[#4A6B57] font-serif italic group-hover:text-[#644e33] transition-colors duration-300">
              The Coda Bean
            </span>
            <span className="text-2xl text-[#D4A96A] animate-pulse">☕</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/products">Products</NavLink>
            {/* Conditionally render Booking link */}
            {isAuthenticated && <NavLink to="/booking">Booking</NavLink>}
            {/* Conditionally render Blog link */}
            {isAuthenticated && <NavLink to="/blog">Blog</NavLink>}
            {/* Conditionally render the Admin link */}
            {isAdmin && <NavLink to="/admin">Admin</NavLink>}

            {/* Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-gradient-to-r from-[#D4A96A] to-[#e8c481] text-[#4A6B57] px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-1"
              >
                <span>Logout</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-[#4A6B57] to-[#6E7C6E] text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-1"
              >
                <span>Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-[#4A6B57] focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="relative text-[#4A6B57] hover:text-[#D4A96A] transition-colors duration-300 group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4A96A] transition-all duration-300 group-hover:w-full"></span>
  </Link>
);
