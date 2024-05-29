'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from './(root)/_components/EventCard';
import { useState, useEffect } from 'react';
import { useAuth } from './(auth)/_components/auth-provider';
import { getAllEvents } from './lib/event.db';
import { useUsers } from './(root)/_components/users-provider';
import Loading from './(root)/_components/Loading';
import { useEvents } from './(root)/_components/events-provider';

const LandingPage = () => {
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const { events } = useEvents();

    const {
        onSort,
        inc,
        onSearch,
        searchValue,
        eventList,
        setEventList,
        setEventListOriginal,
    } = useUsers();

    useEffect(() => {
        setEventList(events)
        setEventListOriginal(events);
    }, [events]);

    if (loading) {
        return <Loading />;
    }

    if(!user) {
        return <div className='flex justify-center items-center h-screen text-2xl'>Please sign in or register a new account to view the events!</div>
    }

    return (
        <div className='flex flex-col py-12 md:py-28 px-6 md:px-16 lg:px-36 justify-center items-center'>
            <div className='flex flex-col'>
                <h1 className='text-tertiary'>Welcome to Duck Events</h1>
                <p className='text-base'>
                    We display all the current events. See anything interesting? Do not forget to sign
                    up for the event in time!
                </p>
            </div>
            <div className='flex mt-10 md:mt-20 space-x-5'>
                <button
                    className='flex gap-3 items-center'
                    onClick={onSort}>
                    <span>
                        {<FontAwesomeIcon icon={inc ? faSortUp : faSortDown} />}
                    </span>{' '}
                    <span>Sort by availability</span>
                </button>
                <input
                    type='text'
                    value={searchValue}
                    onChange={onSearch}
                    className='text-black text-sm placeholder:text-sm'
                    placeholder='Search for an event...'
                />
            </div>
            <h3 className='flex mt-16 justify-center items-center'>
                Check out the current events!
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 mt-2'>
                {eventList.map((item, i) => {
                    return (
                        <EventCard
                            name={item.name}
                            key={i}
                            image={item.image}
                            location={item.location}
                            date={item.date}
                            numberOfSpots={item.numberOfSpots}
                            eventId={item.id}
                            userId={user?.uid}
                            bookedUsers={item.bookedUsers}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;
