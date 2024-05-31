'use client';

import Image from 'next/image';
import { useEvents } from '/app/(root)/_components/events-provider';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUsers } from '../_components/users-provider';
import { FaLocationDot, FaPeopleGroup } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';

const EventDetailsPage = () => {
    const { id } = useParams();
    const { event, setEvent, fetchEventById } = useEvents();
    const {
        bookEventFunction,
        isMaxUsers,
        numberOfBookedUsers,
        hasBooked
    } = useUsers();

    useEffect(() => {
        fetchEventById(id).then((event) => {
            setEvent(event);
        });       
    }, [id]);

    return (
        <div className='rounded-xl p-5 border border-secondary mt-8'>
            {event && (
                <>
                <div>
                    <div className='grid min-h-[140px] w-full place-items-center rounded-lg p-6 lg:overflow-visible'>
                        <Image
                            src={event.image}
                            width={400}
                            height={400}
                            alt='event'
                            className='object-cover rounded-full h-96 w-96'
                            />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='px-3 py-1.5 font-bold tracking-tight text-secondary bg-tertiary'>
                            {event.name}
                        </h1>
                        <h3 className='my-0 flex items-center gap-1 bg-primary w-fit px-3 py-1.5 font-bold text-black tracking-tight'>
                            <FaLocationDot />
                            <span>{event.location}</span>
                        </h3>
                    </div>
                </div>
                <div className='flex m-8 justify-center items-center flex-col'>
                    <div className='flex justify-center items-center'>
                        <h3 className='w-1/2 rounded-xl p-5 border border-secondary'>
                            {event.description}
                        </h3>
                    </div>
                    <div>
                        <dl className='bg-tertiary p-8 my-8 text-secondary divide-y divide-gray-800/10 rounded-md shadow-md'>
                            <div className='py-4 flex justify-center items-center flex-col w-full'>
                                <dt className='mb-2'>
                                    <FaRegCalendarAlt className='size-4' />
                                </dt>
                                <dd className='font-semibold'>
                                    {event.date}
                                </dd>
                            </div>
                            <div className='py-4 flex justify-center items-center flex-col w-full'>
                                <dt className='mb-2'>
                                    <FaPeopleGroup className='size-4' />
                                </dt>
                                <dd className='font-semibold'>
                                    <span>
                                        {event.numberOfSpots -
                                            numberOfBookedUsers}
                                    </span>
                                    <span className='ml-1'>
                                        spots left
                                    </span>
                                </dd>
                            </div>
                            <div className='p-4 w-full flex justify-center items-center'>
                                <button
                                    onClick={() => bookEventFunction()}
                                    className={`rounded p-5 text-sm font-bold m-5 ${
                                        isMaxUsers ? 'opacity-50 border-tertiary cursor-not-allowed' : ''
                                    }`}>
                                    {hasBooked ? 'Undo booking' : 'Book now!'}
                                </button>
                            </div>
                        </dl>
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default EventDetailsPage;
