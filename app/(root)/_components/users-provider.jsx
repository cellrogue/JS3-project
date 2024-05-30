'use client';

import { createContext, useContext, useState } from 'react';
import { useEvents } from './events-provider';
import { useAuth } from '../../(auth)/_components/auth-provider';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
    const [inc, setInc] = useState(true);
    const [eventList, setEventList] = useState([]);
    const [eventListOriginal, setEventListOriginal] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const { event, setEvent } = useEvents();
    const { user } = useAuth();
    const { id } = useParams();

    const onSearch = (e) => {
        setSearchValue(e.target.value);
        const newList = eventListOriginal.filter((x) =>
            x.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setEventList(newList);
    };

    const onSort = () => {
        if (inc) {
            const newList = eventListOriginal.sort(
                (a, b) => a.numberOfSpots - b.numberOfSpots
            );
            setEventList(newList);
            setInc(false);
        } else {
            const newList = eventListOriginal.sort(
                (a, b) => b.numberOfSpots - a.numberOfSpots
            );
            setEventList(newList);
            setInc(true);
        }
    };

    const currentlyBookedUsers =
        event && event.bookedUsers ? event.bookedUsers : [];

    const numberOfBookedUsers =
        event && event.bookedUsers ? event.bookedUsers.length : 0;

    const isMaxUsers =
        event && Number(numberOfBookedUsers) === Number(event.numberOfSpots);

    const hasBooked =
        event &&
        event.bookedUsers &&
        event.bookedUsers.some((u) => u.id === user?.uid);

    const bookEventFunction = async () => {
        await fetch('http://localhost:3000/api/events/booked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: id,
                id: user?.uid,
                email: user?.email,
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    if (data.message) {
                        const bookings = event.bookedUsers
                        const filteredBookings = bookings.filter((x) => x.id !== user?.uid)
                        setEvent((prevState) => ({
                            ...prevState,
                            bookedUsers: filteredBookings
                        })); 
                        toast.success('Booking removed!');
                    } else {
                        setEvent((prevState) => ({
                            ...prevState,
                            bookedUsers: [
                                ...currentlyBookedUsers,
                                { id: user?.uid, email: user?.email },
                            ],
                        }));
                        toast.success('Event booked successfully!');
                    }
                });
            } else {
                toast.error('Failed to book event, please try again.');
            }
        });
    };

    const value = {
        onSearch,
        onSort,
        inc,
        searchValue,
        eventList,
        setEventList,
        setEventListOriginal,
        bookEventFunction,
        isMaxUsers,
        numberOfBookedUsers,
        hasBooked
    };

    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    );
};

export default UsersContextProvider;

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context)
        throw new Error('useUsers must be used within an UsersContextProvider');
    return context;
};
