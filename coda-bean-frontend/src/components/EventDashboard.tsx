import { useState } from "react";
import { FiCalendar, FiCoffee, FiUsers, FiHome } from "react-icons/fi";
import EventList from "./EventList";
import EventForm from "./EventForm";

const EventDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setIsEditing(false);
    setCurrentEvent(null);
    setRefreshKey((prev) => prev + 1); // Trigger refresh of EventList
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#4A6B57] text-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">The Coda Bean Events</h1>
          <nav>
            <button className="bg-[#D4A96A] text-[#3E3E3E] px-4 py-2 rounded">
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow">
            <nav>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="flex items-center p-3 rounded hover:bg-gray-100"
                  >
                    <FiHome className="mr-2" />
                    Home
                  </a>
                </li>
                <li>
                  <button className="w-full flex items-center p-3 rounded bg-[#4A6B57] text-white">
                    <FiCalendar className="mr-2" />
                    Events
                  </button>
                </li>
                <li>
                  <a
                    href="/products"
                    className="flex items-center p-3 rounded hover:bg-gray-100"
                  >
                    <FiCoffee className="mr-2" />
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="/users"
                    className="flex items-center p-3 rounded hover:bg-gray-100"
                  >
                    <FiUsers className="mr-2" />
                    Users
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Panel */}
          <main className="flex-1">
            {isEditing ? (
              <EventForm
                event={currentEvent}
                onCancel={() => {
                  setIsEditing(false);
                  setCurrentEvent(null);
                }}
                onSuccess={handleSuccess}
              />
            ) : (
              <EventList key={refreshKey} />
            )}

            {/* Dashboard Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500">Total Events</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500">Upcoming Events</h3>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500">Total Attendees</h3>
                <p className="text-2xl font-bold">142</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
