import React, { useState } from 'react';
import { FiX, FiSave, FiCalendar, FiClock, FiUser, FiUsers, FiMail, FiInfo } from 'react-icons/fi';

interface EventDTO {
    id?: number;
    eventName: string;
    eventDate: string;
    eventTime: string;
    description: string;
    attendes: number;
    customerName: string;
    contactInfo: string;
}

interface EventFormProps {
    event: EventDTO | null;
    onCancel: () => void;
    onSuccess: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onCancel, onSuccess }) => {
    const [formData, setFormData] = useState<EventDTO>({
        eventName: event?.eventName || '',
        eventDate: event?.eventDate || '',
        eventTime: event?.eventTime || '',
        description: event?.description || '',
        attendes: event?.attendes || 0,
        customerName: event?.customerName || '',
        contactInfo: event?.contactInfo || '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'attendes' ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Replace with your actual API call
            console.log('Submitting event:', formData);
            // await (event?.id ? updateEvent(event.id, formData) : createEvent(formData));

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save event');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                    {event?.id ? 'Edit Event' : 'Create New Event'}
                </h3>
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <FiX size={24} />
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Name */}
                    <div className="space-y-2">
                        <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                            Event Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiInfo className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="eventName"
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleChange}
                                required
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A6B57] focus:ring-[#4A6B57] py-2 border"
                                placeholder="Enter event name"
                            />
                        </div>
                    </div>

                    {/* Customer Name */}
                    <div className="space-y-2">
                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                            Customer Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A6B57] focus:ring-[#4A6B57] py-2 border"
                                placeholder="Enter customer name"
                            />
                        </div>
                    </div>

                    {/* Event Date */}
                    <div className="space-y-2">
                        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                            Event Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiCalendar className="text-gray-400" />
                            </div>
                            <input
                                type="date"
                                id="eventDate"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                required
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A6B57] focus:ring-[#4A6B57] py-2 border"
                            />
                        </div>
                    </div>

                    {/* Event Time */}
                    <div className="space-y-2">
                        <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">
                            Event Time <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiClock className="text-gray-400" />
                            </div>
                            <input
                                type="time"
                                id="eventTime"
                                name="eventTime"
                                value={formData.eventTime}
                                onChange={handleChange}
                                required
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A6B57] focus:ring-[#4A6B57] py-2 border"
                            />
                        </div>
                    </div>

                    {/* Number of Attendees */}
                    <div className="space-y-2">
                        <label htmlFor="attendes" className="block text-sm font-medium text-gray-700">
                            Number of Attendees
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUsers className="text-gray-400" />
                            </div>
                            <input
                                type="number"
                                id="attendes"
                                name="attendes"
                                min="0"
                                value={formData.attendes}
                                onChange={handleChange}
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A6B57] focus:ring-[#4A6B57] py-2 border"
                                placeholder="Enter number of attendees"
                            />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-2">
                        <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                            Contact Information <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="contactInfo"
                                name="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleChange}
                                required
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A6B57] focus:ring-[#4A6B57] py-2 border"
                                placeholder="Email or phone number"
                            />
                        </div>
                    </div>

                    {/* Description (full width) */}
                    <div className="md:col-span-2 space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Event Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A6B57] focus:ring-[#4A6B57] py-2 border"
                            placeholder="Enter event description"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6B57]"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A6B57] hover:bg-[#3E3E3E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6B57] disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        <FiSave className="mr-2" />
                        {isSubmitting ? 'Saving...' : 'Save Event'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;