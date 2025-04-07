import axios from "axios";
import {
  BookingRequestDto,
  BookingResponseDto,
  VenueDto,
} from "../types/venue.dto";

const API_URL = "http://localhost:8080/api/venues";

export const getAvailableVenues = async (): Promise<VenueDto[]> => {
  const response = await axios.get<VenueDto[]>(`${API_URL}`);
  return response.data;
};

export const checkAvailability = async (
  data: AvailabilityCheckDto,
): Promise<boolean> => {
  const response = await axios.post<boolean>(
    `${API_URL}/check-availability`,
    data,
  );
  return response.data;
};

export const createBooking = async (
  bookingData: BookingRequestDto,
): Promise<BookingResponseDto> => {
  const response = await axios.post<BookingResponseDto>(
    `${API_URL}/book`,
    bookingData,
  );
  return response.data;
};

export const getUserBookings = async (): Promise<BookingResponseDto[]> => {
  const response = await axios.get<BookingResponseDto[]>(
    `${API_URL}/my-bookings`,
  );
  return response.data;
};

export const cancelBooking = async (bookingId: number): Promise<void> => {
  await axios.post(`${API_URL}/cancel/${bookingId}`);
};
