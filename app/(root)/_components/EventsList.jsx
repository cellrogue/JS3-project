'use client';

import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';
import { useEvents } from './events-provider';

export const EventsList = () => {
    const { events } = useEvents();

    return (
        <div className='bg-primary rounded-xl border-b border-gray-900/10 shadow-sm overflow-x-auto'>
            {events && events.length ? (
                <table className='text-slate-900 w-full table-auto mb-2'>
                    <thead className='border-b border-gray-900/10 pb-12'>
                        <tr className=' bg-slate-700/10'>
                            <th className='p-4 text-left font-semibold text-sm'>
                                Event name
                            </th>
                            <th className='p-4 text-left font-semibold text-sm truncate'>
                                Location
                            </th>
                            <th className='p-4 text-left font-semibold text-sm truncate'>
                                Date
                            </th>
                            <th className='p-4 text-right font-semibold text-sm truncate'>
                                Places
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr
                                key={event.name}
                                className='border-b border-gray-900/10 last:border-0'>
                                <td className='px-4 py-3 text-left text-sm font-medium text-ellipsis truncate overflow-hidden'>
                                    {event.name}
                                </td>
                                <td className='px-4 py-3 text-left text-sm text-ellipsis truncate overflow-hidden'>
                                    {event.location}
                                </td>
                                <td className='px-4 py-3 text-left text-sm text-ellipsis truncate overflow-hidden'>
                                    {event.date}
                                </td>
                                <td className='px-4 py-3 text-right text-sm text-ellipsis truncate overflow-hidden'>
                                    {event.numberOfSpots}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className='flex justify-center items-center my-2'>
                    <p className='text-secondary font-semibold'>
                        No events found!
                    </p>
                </div>
            )}
        </div>
    );
};
