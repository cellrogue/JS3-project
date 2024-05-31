'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const EventsContext = createContext();

const EventsContextProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/events')
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const fetchedEvents = await response.json();
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Could not fetch events:', error.message);
        }
    };

    const fetchEventById = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch event');
            }
            return await response.json();
        } catch (error) {
            toast.error('Failed to fetch event, please try again.');
            console.error('Could not fetch event:', error.message);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const value = {
        events,
        setEvents,
        event,
        setEvent,
        fetchEvents,
        fetchEventById
    };

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    );
};

export default EventsContextProvider;

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context)
        throw new Error(
            'useEvents must be used within an EventsContextProvider'
        );
    return context;
};
