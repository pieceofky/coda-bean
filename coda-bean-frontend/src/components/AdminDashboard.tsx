import React, { useState } from "react";
import {
  FiUsers,
  FiCalendar,
  FiCoffee,
  FiShoppingBag,
  FiSettings,
} from "react-icons/fi";
import EventList from "./EventList";
import EventForm from "./EventForm";
import AdminProductsPage from "../pages/AdminProductPage";

type Entity = "products" | "orders" | "events" | "users";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Entity>("products"); // Changed default to 'products'
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [refreshEvents, setRefreshEvents] = useState(0);

  const handleEventSuccess = () => {
    setIsEditingEvent(false);
    setCurrentEvent(null);
    setRefreshEvents((prev) => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "events":
        return isEditingEvent ? (
          <EventForm
            event={currentEvent}
            onCancel={() => setIsEditingEvent(false)}
            onSuccess={handleEventSuccess}
          />
        ) : (
          <EventList
            key={refreshEvents}
            onEdit={(event) => {
              setCurrentEvent(event);
              setIsEditingEvent(true);
            }}
          />
        );
      case "products":
        return <AdminProductsPage />;
      case "orders":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>
            <p className="text-gray-600">
              Order management functionality coming soon
            </p>
          </div>
        );
      case "users":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
            <p className="text-gray-600">
              User management functionality coming soon
            </p>
          </div>
        );
      default:
        return <AdminProductsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow">
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("products");
                      setIsEditingEvent(false);
                    }}
                    className={`w-full flex items-center p-3 rounded ${activeTab === "products" ? "bg-[#4A6B57] text-white" : "hover:bg-gray-100"}`}
                  >
                    <FiCoffee className="mr-2" />
                    Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("orders");
                      setIsEditingEvent(false);
                    }}
                    className={`w-full flex items-center p-3 rounded ${activeTab === "orders" ? "bg-[#4A6B57] text-white" : "hover:bg-gray-100"}`}
                  >
                    <FiShoppingBag className="mr-2" />
                    Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("events");
                      setIsEditingEvent(false);
                    }}
                    className={`w-full flex items-center p-3 rounded ${activeTab === "events" ? "bg-[#4A6B57] text-white" : "hover:bg-gray-100"}`}
                  >
                    <FiCalendar className="mr-2" />
                    Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("users");
                      setIsEditingEvent(false);
                    }}
                    className={`w-full flex items-center p-3 rounded ${activeTab === "users" ? "bg-[#4A6B57] text-white" : "hover:bg-gray-100"}`}
                  >
                    <FiUsers className="mr-2" />
                    Users
                  </button>
                </li>
                <li className="border-t pt-2 mt-4">
                  <button className="w-full flex items-center p-3 rounded hover:bg-gray-100">
                    <FiSettings className="mr-2" />
                    Settings
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Panel */}
          <main className="flex-1">
            {/* Header for the active tab */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold capitalize">
                {activeTab === "products"
                  ? "Product Management"
                  : activeTab === "events"
                    ? "Event Management"
                    : `${activeTab} Management`}
              </h2>
              {activeTab === "events" && !isEditingEvent && (
                <button
                  onClick={() => {
                    setCurrentEvent(null);
                    setIsEditingEvent(true);
                  }}
                  className="flex items-center bg-[#4A6B57] text-white px-4 py-2 rounded hover:bg-[#3E3E3E]"
                >
                  Add New Event
                </button>
              )}
            </div>

            {/* Tab Content */}
            {renderContent()}

            {/* Dashboard Stats - Only show when not editing and on main tabs */}
            {!isEditingEvent &&
              activeTab !== "products" &&
              activeTab !== "orders" &&
              activeTab !== "users" && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Total Events</h3>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Active Products</h3>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Pending Orders</h3>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">Registered Users</h3>
                    <p className="text-2xl font-bold">142</p>
                  </div>
                </div>
              )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
