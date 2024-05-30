'use client';

import Image from 'next/image';
import { useEvents } from '/app/(root)/_components/events-provider';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUsers } from '../_components/users-provider';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdPersonAddAlt1 } from 'react-icons/md';

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
        <div>
            {event && (
                <>
                    <Image
                        src={event.image}
                        width={400}
                        height={400}
                        alt='event'
                        className='w-screen max-h-96 object-cover object-center opacity-70'
                    />

                    <div className='relative bottom-8 mx-6 md:mx-16 lg:mx-36'>
                        <h1 className='px-3 py-1.5 font-bold tracking-tight bg-tertiary w-fit'>
                            {event.name}
                        </h1>
                        <h3 className='my-0 flex items-center gap-1 bg-primary w-fit px-3 py-1.5 font-bold text-black tracking-tight'>
                            <FaLocationDot />
                            <span>{event.location}</span>
                        </h3>
                    </div>
                    <div className='px-6 md:px-16 lg:px-36 pb-2 md:py-8'>
                        <h3>{event.description}</h3>
                        <dl className='sm:w-fit my-8 mx-auto sm:mx-0 bg-primary-muted divide-y divide-gray-800/10 rounded-md shadow-md text-gray-800'>
                            <div className='py-4 flex justify-center items-center flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 w-fit'>
                                    <FaRegCalendarAlt className='size-4' />
                                </dt>
                                <dd className='mt-2 mx-7 sm:mx-0 sm:mr-7 text-sm leading-6 sm:mt-0'>
                                    {event.date}
                                </dd>
                            </div>
                            <div className='py-4 flex justify-center items-center flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 w-fit'>
                                    <MdPersonAddAlt1 className='size-4' />
                                </dt>
                                <dd className='mt-2 mx-7 sm:mx-0 sm:mr-7 text-sm leading-6 sm:mt-0'>
                                    <span className='font-semibold'>
                                        {event.numberOfSpots -
                                            numberOfBookedUsers}
                                    </span>
                                    <span className='ml-1'>spots left</span>
                                </dd>
                            </div>
                            <div className='bg-slate-900/10 p-6 sm:flex sm:px-6'>
                                <button
                                    onClick={() => bookEventFunction()}
                                    className={`text-sm text-primary py-3 ${
                                        isMaxUsers ? 'opacity-50' : ''
                                    }`}>
                                    {hasBooked ? 'Undo booking' : 'Book now!'}
                                </button>
                            </div>
                        </dl>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventDetailsPage;
