'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from './(root)/_components/EventCard';
import { useState, useEffect } from 'react';
import { useAuth } from './(auth)/_components/auth-provider';
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
            <div className='flex'>
                <div className='flex flex-col justify-center'>
                    <h1 className='text-tertiary underline underline-offset-8'>Welcome to Duck Events</h1>
                    <p className='text-base'>
                        We display all the current events happening around the world. See anything interesting? Don't forget to sign
                        up for the event in time!
                    </p>
                </div>
                <div className='grid min-h-[140px] w-full place-items-center rounded-lg p-6 lg:overflow-visible'>
                    <img className='object-cover object-center rounded-full h-96 w-96' src="https://images.unsplash.com/photo-1579822269843-3769559ce9bc?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="ducks" />
                </div>
            </div>
                <h3 className='flex mt-16 justify-center items-center italic'>
                    Our current events!
                </h3>
            <div className='flex md:mt-10 space-x-5'>
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
