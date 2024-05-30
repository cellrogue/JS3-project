'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export const EventCard = ({
    name,
    image,
    location,
    date,
    eventId,
    numberOfSpots,
    bookedUsers,
}) => {
    const router = useRouter();

    const numberOfBookedUsers = bookedUsers ? bookedUsers.length : 0;

    const goToEvent = () => {
        router.push(`/${eventId}`);
    };

    return (
        <div className='relative w-94 mx-auto mt-20'>
            <div className='w-full'>
            <Image
                src={image || '/assets/placeholder.jpg'}
                width={200}
                height={200}
                alt='Event image'
                className='h-64 w-full object-cover rounded-md'
                />
            </div>
            <div className='absolute inset-0 bg-background opacity-60 rounded-md'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
                <h3 className='text-white text-2xl font-semibold'>
                    {name}
                </h3>
            </div>
        <div
            onClick={goToEvent}
            className='p-6 hover:bg-tertiary bg-secondary-muted hover:scale-105 text-primary hover:text-secondary rounded-md shadow-lg ring-1 ring-gray-900/5 transform transition duration-500 cursor-pointer m-5 max-w-96 w-full sm:w-[370px] h-[360px] sm:h-auto text-gray-800 flex flex-col'>
            <div>
                </div>
                    <div className='flex flex-col gap-2  text-sm'>
                        <span>
                            <span className='font-semibold'>Location: </span>
                            {location}
                        </span>
                        <span>
                            <span className='font-semibold'>Date: </span>
                            {date}
                        </span>
                        <span>
                            <span className='font-semibold'>Booked: </span>
                            {numberOfBookedUsers}/{numberOfSpots}
                        </span>
                    </div>
                </div>
            </div>
    );
};
