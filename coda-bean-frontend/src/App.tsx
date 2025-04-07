import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthContext";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import HighlightsPage from "./pages/HighlightsPage";
import { BookingPage } from "./pages/BookingPage";
import { ContactPage } from "./pages/ContactPage";
import AdminDashboard from "./components/AdminDashboard";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#F7F4F0] text-[#3E3E3E]">
          <Navbar />

          {/* Main content with padding to account for fixed navbar */}
          <main className="pt-20 pb-10 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />

              {/* Protected routes for authenticated users */}
              <Route element={<ProtectedRoute />}>
                <Route path="/highlights" element={<HighlightsPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/blog" element={<BlogPage />} />
              </Route>

              <Route path="/register" element={<RegisterComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/products" element={<ProductPage />} />

              {/* Protected admin route */}
              <Route element={<ProtectedRoute adminOnly />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
