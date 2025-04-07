import apiClient from './apiClient';
import { EventDTO } from '../types/event';

export const getEvents = async (): Promise<EventDTO[]> => {
    const response = await apiClient.get<EventDTO[]>('/events');
    return response.data;
};

export const createEvent = async (event: Omit<EventDTO, 'id'>): Promise<EventDTO> => {
    const response = await apiClient.post<EventDTO>('/events', event);
    return response.data;
};

export const updateEvent = async (id: number, event: EventDTO): Promise<EventDTO> => {
    const response = await apiClient.put<EventDTO>(`/events/${id}`, event);
    return response.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
};