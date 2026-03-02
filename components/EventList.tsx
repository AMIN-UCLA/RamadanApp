"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import scheduleData from "@/data/schedule.json";

function getDirectionsUrl(destination: string): string {
    const query = encodeURIComponent(destination);
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

interface EventListProps {
    date: Date;
}

interface Event {
    type: "taraweeh" | "iftaar" | "Jumaa" | "other";
    time: string;
    location: string;
    /** Optional: exact search string for Apple/Google Maps. If omitted, uses "{location}, UCLA". */
    directionsQuery?: string;
    details?: string;
    name?: string;
    organization?: string;
}

export default function EventList({ date }: EventListProps) {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const dateString = date.toISOString().split("T")[0];
        const dayEvents =
            (scheduleData as Record<string, Event[]>)[dateString] || [];

        setEvents(dayEvents);
    }, [date]);

    return (
        <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Events</h3>
            {events.length === 0 ? (
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    No events scheduled for this day.
                </p>
            ) : (
                <ul className="space-y-2 md:space-y-4 text-gray-800 dark:text-gray-200">
                    {events.map((event, index) => (
                        <li
                            key={index}
                            className="border-b border-gray-200 dark:border-gray-600 pb-2 text-sm md:text-base"
                        >
                            <div className="font-semibold">
                                {event.type === "other"
                                    ? typeof event.name === undefined
                                        ? "Other Event"
                                        : event.name
                                    : event.type.charAt(0).toUpperCase() +
                                      event.type.slice(1)}
                            </div>
                            {event.type !== "iftaar" && (
                                <div>
                                    <span className="inline-block w-20">
                                        Time:
                                    </span>{" "}
                                    {event.time}
                                </div>
                            )}
                            <div className="flex items-baseline gap-1 flex-wrap">
                                <span className="inline-block w-20 shrink-0 text-gray-600 dark:text-gray-400">
                                    Location:
                                </span>
                                <Link
                                    href={getDirectionsUrl(event.directionsQuery ?? `${event.location}, UCLA`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 min-h-[44px] py-2 -my-1 -mx-1 px-1 rounded text-gray-800 dark:text-gray-200 hover:underline underline-offset-2 decoration-gray-400 dark:decoration-gray-500 active:opacity-70 touch-manipulation"
                                    title="Get directions"
                                >
                                    <MapPin className="h-3 w-3 shrink-0 opacity-50" aria-hidden />
                                    <span>{event.location}</span>
                                </Link>
                            </div>
                            {event.details && (
                                <div>
                                    <span className="inline-block w-20">
                                        {event.type === "iftaar" ? "Menu:" : "Details:"}
                                    </span>{" "}
                                    {event.details}
                                </div>
                            )}
                            {event.type === "other" && (
                                <div>
                                    <span className="inline-block w-20">
                                        Org:
                                    </span>{" "}
                                    {event.organization}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
