import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { EventDTO } from '../types/event';
import { deleteEvent, getEvents } from '../api/eventService';

interface EventListProps {
    onEdit: (event: EventDTO) => void;
}

const EventList: React.FC<EventListProps> = ({ onEdit }) => {
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                setEvents(events.filter(event => event.id !== id));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete event');
            }
        }
    };

    if (loading) return <div className="text-center py-8">Loading events...</div>;
    if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map(event => (
                            <tr key={event.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{event.eventName}</div>
                                    <div className="text-sm text-gray-500 line-clamp-2">{event.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.eventDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.eventTime}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.attendes}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{event.customerName}</div>
                                    <div className="text-sm text-gray-500">{event.contactInfo}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(event)}
                                        className="text-[#4A6B57] hover:text-[#3E3E3E] mr-4"
                                    >
                                        <FiEdit2 className="inline" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FiTrash2 className="inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventList;