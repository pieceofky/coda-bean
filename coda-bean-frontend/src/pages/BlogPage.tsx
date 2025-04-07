import React from "react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Latte: Mastering Coffee Milk Textures",
      excerpt:
        "Learn how professional baristas create those perfect silky microfoam textures for latte art.",
      date: "May 15, 2023",
      readTime: "5 min read",
      category: "Barista Skills",
      image:
        "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    },
    {
      id: 2,
      title: "Single Origin vs. Blend: Understanding Coffee Terroir",
      excerpt:
        "Explore how geography affects flavor profiles and when to choose single origin over blends.",
      date: "April 28, 2023",
      readTime: "7 min read",
      category: "Coffee Knowledge",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    },
    {
      id: 3,
      title: "Cold Brew Revolution: Why It's More Than Just Iced Coffee",
      excerpt:
        "Discover the science behind cold extraction and why cold brew has taken the coffee world by storm.",
      date: "April 10, 2023",
      readTime: "6 min read",
      category: "Brewing Methods",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 4,
      title: "Sustainable Coffee: From Farm to Your Cup",
      excerpt:
        "How ethical sourcing and sustainable practices are changing the coffee industry for the better.",
      date: "March 22, 2023",
      readTime: "8 min read",
      category: "Sustainability",
      image:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80",
    },
    {
      id: 5,
      title: "Home Espresso: Setting Up Your Personal Coffee Bar",
      excerpt:
        "Essential equipment and tips for creating café-quality espresso drinks in your own kitchen.",
      date: "March 5, 2023",
      readTime: "9 min read",
      category: "Home Brewing",
      image:
        "https://images.unsplash.com/photo-1608355024223-649f5d4aaf0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 6,
      title: "The Psychology of Coffee Shop Ambiance",
      excerpt:
        "How lighting, music, and layout affect your coffee experience more than you realize.",
      date: "February 18, 2023",
      readTime: "5 min read",
      category: "Coffee Culture",
      image:
        "https://images.unsplash.com/photo-1453614512568-cdac6e8a082d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
  ];

  // Popular categories
  const categories = [
    { name: "All", count: 12 },
    { name: "Brewing Methods", count: 4 },
    { name: "Coffee Knowledge", count: 3 },
    { name: "Barista Skills", count: 2 },
    { name: "Sustainability", count: 2 },
    { name: "Coffee Culture", count: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4F0] py-12 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A6B57]/10 to-[#D4A96A]/10"></div>
      </div>

      {/* Blog Header */}
      <div className="relative z-10 text-center mb-16">
        <div className="inline-block mb-6">
          <div className="w-24 h-1 bg-[#D4A96A] mx-auto mb-4"></div>
          <h1 className="text-5xl font-bold text-[#4A6B57] mb-4 font-serif tracking-tight">
            Coffee Chronicles
          </h1>
          <div className="w-24 h-1 bg-[#D4A96A] mx-auto mt-4"></div>
        </div>
        <p className="text-xl text-[#6E7C6E] max-w-2xl mx-auto italic">
          Stories, techniques, and insights from the world of specialty coffee.
        </p>
        <div className="flex justify-center mt-6 space-x-2">
          {["☕", "📖", "🌱", "🌎"].map((icon, index) => (
            <span key={index} className="text-2xl opacity-75">
              {icon}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Blog Posts */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border-2 border-[#272727] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-[#D4A96A]">
                        {post.category}
                      </span>
                      <span className="text-sm text-[#6E7C6E]">
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#4A6B57] mb-2 font-serif">
                      {post.title}
                    </h2>
                    <p className="text-[#6E7C6E] mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6E7C6E]">
                        {post.date}
                      </span>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-[#4A6B57] font-semibold hover:text-[#D4A96A] transition-colors duration-200 flex items-center"
                      >
                        Read more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-[#D4A96A] rounded-md text-[#4A6B57] hover:bg-[#D4A96A] hover:text-white transition-colors duration-200">
                  Previous
                </button>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    className={`px-4 py-2 rounded-md ${num === 1 ? "bg-[#D4A96A] text-white" : "text-[#4A6B57] hover:bg-[#D4A96A]/20"}`}
                  >
                    {num}
                  </button>
                ))}
                <button className="px-4 py-2 border border-[#D4A96A] rounded-md text-[#4A6B57] hover:bg-[#D4A96A] hover:text-white transition-colors duration-200">
                  Next
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* About Section */}
            <div className="bg-white border-2 border-[#272727] rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#4A6B57] mb-4 font-serif">
                About Our Blog
              </h2>
              <p className="text-[#6E7C6E] mb-4">
                Welcome to Coffee Chronicles, where we explore the fascinating
                world of specialty coffee. Our baristas and coffee experts share
                their knowledge, tips, and stories from behind the counter.
              </p>
              <div className="flex items-center space-x-2 text-[#D4A96A]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold">
                  New posts every Wednesday
                </span>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white border-2 border-[#272727] rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#4A6B57] mb-4 font-serif">
                Categories
              </h2>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex justify-between items-center text-[#6E7C6E] hover:text-[#D4A96A] transition-colors duration-200"
                    >
                      <span>{category.name}</span>
                      <span className="bg-[#F7F4F0] px-2 py-1 rounded-full text-xs">
                        {category.count}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Posts */}
            <div className="bg-white border-2 border-[#272727] rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#4A6B57] mb-4 font-serif">
                Popular Reads
              </h2>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#4A6B57]">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#6E7C6E]">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative z-10 mt-16 max-w-4xl mx-auto bg-[#4A6B57] rounded-lg shadow-lg p-8 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 font-serif">
            Stay Brew-tifully Updated
          </h2>
          <p className="mb-6 opacity-90">
            Subscribe to our newsletter for the latest coffee tips and shop news
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-md text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#D4A96A]"
            />
            <button className="bg-[#D4A96A] text-[#272727] font-semibold px-6 py-2 rounded-md hover:bg-[#e8c07d] transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Decorative footer element */}
      <div className="relative z-10 mt-16 text-center">
        <div className="inline-block px-8 py-2 border-t border-b border-[#D4A96A]">
          <p className="text-[#6E7C6E] italic">
            Brewed with love, served with passion
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
