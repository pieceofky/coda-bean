import { useEffect, useState } from "react";
import { VenueDto, BookingResponseDto } from "../types/venue.dto";
import {
  checkAvailability,
  createBooking,
  getAvailableVenues,
  getUserBookings,
} from "../services/venue.service";
import { toast } from "react-hot-toast";

export const BookingPage = () => {
  const [venues, setVenues] = useState<VenueDto[]>([]);
  const [selectedVenueId, setSelectedVenueId] = useState<number>();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(2); // hours
  const [eventDetails, setEventDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] =
    useState<BookingResponseDto | null>(null);
  const [userBookings, setUserBookings] = useState<BookingResponseDto[]>([]);

  useEffect(() => {
    // Load venues
    getAvailableVenues()
      .then(setVenues)
      .catch(() => toast.error("Failed to load venues."));

    // Load user's existing bookings
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    try {
      const bookings = await getUserBookings();
      setUserBookings(bookings);
    } catch (error) {
      toast.error("Failed to load your bookings");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVenueId || !date || !time) {
      toast.error("Please fill all required fields.");
      return;
    }

    const startTime = new Date(`${date}T${time}`);
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

    try {
      // Check availability
      const availability = await checkAvailability({
        venueId: selectedVenueId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });

      if (!availability) {
        toast.error("Venue not available at this time.");
        return;
      }

      // Create booking
      setLoading(true);
      const newBooking = await createBooking({
        venueId: selectedVenueId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        specialRequests: eventDetails,
      });

      setConfirmedBooking(newBooking);
      await loadUserBookings(); // Refresh bookings list
      toast.success("Booking confirmed!");

      // Reset form
      setSelectedVenueId(undefined);
      setDate("");
      setTime("");
      setDuration(2);
      setEventDetails("");
    } catch (err) {
      toast.error("Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-4xl font-bold mb-8 text-center">Venue Booking</h2>

      {confirmedBooking && (
        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">
            Booking Confirmed!
          </h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Venue:</span>{" "}
              {confirmedBooking.venueName}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {formatDate(confirmedBooking.startTime)}
            </p>
            <p>
              <span className="font-medium">Duration:</span>{" "}
              {confirmedBooking.durationHours} hours
            </p>
            <p>
              <span className="font-medium">Reference:</span> #
              {confirmedBooking.id}
            </p>
          </div>
          <button
            onClick={() => setConfirmedBooking(null)}
            className="mt-4 text-sm text-green-600 hover:text-green-800"
          >
            Make another booking
          </button>
        </div>
      )}

      {!confirmedBooking && (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="venue">
              Select Venue
            </label>
            <select
              id="venue"
              className="w-full p-2 border rounded-md"
              value={selectedVenueId ?? ""}
              onChange={(e) => setSelectedVenueId(Number(e.target.value))}
              required
            >
              <option value="">-- Choose Venue --</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name} - {venue.location}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="time">
              Time
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="duration"
            >
              Duration (hours)
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="number"
              id="duration"
              min={1}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="eventDetails"
            >
              Event Details
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              id="eventDetails"
              rows={4}
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
            />
          </div>
          <button
            className="button w-full bg-blue-600 text-white py-2 rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      )}

      {userBookings.length > 0 && (
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Your Bookings</h3>
          <div className="space-y-4">
            {userBookings.map((booking) => (
              <div key={booking.id} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{booking.venueName}</h4>
                    <p className="text-sm text-gray-600">
                      {formatDate(booking.startTime)} for{" "}
                      {booking.durationHours} hours
                    </p>
                    {booking.specialRequests && (
                      <p className="text-sm mt-1">
                        Notes: {booking.specialRequests}
                      </p>
                    )}
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    #{booking.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
