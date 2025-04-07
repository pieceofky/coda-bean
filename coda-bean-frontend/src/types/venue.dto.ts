export interface BookingRequestDto {
  venueId: number;
  startTime: string; // ISO format datetime string
  endTime: string;
  specialRequests: string;
}

export interface VenueDto {
  id: number;
  name: string;
  location: string;
  capacity: number;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  imageUrl: string;
}

export interface BookingResponseDto {
  id: number;
  venue: VenueDto;
  userId: number;
  startTime: string; // ISO format datetime string
  endTime: string;
  totalPrice: number;
  status: string;
  createdAt: string; // ISO format datetime string
  specialRequests: string;
}
