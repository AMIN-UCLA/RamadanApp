"use client";

import { useState, useEffect } from "react";
import PrayerTimes from "./PrayerTimes";
import EventList from "./EventList";
import { BASE_DATE } from "@/constants/baseDate";

interface DayScheduleProps {
    day: "today" | "tomorrow" | "dayAfterTomorrow";
    prayerTimes: { [key: string]: string } | undefined;
    baseDate?: Date;
    nextDayPrayerTimes?: { [key: string]: string };
}

export default function DaySchedule({
    day,
    prayerTimes,
    baseDate,
    nextDayPrayerTimes,
}: DayScheduleProps) {
    const [date, setDate] = useState<Date>(new Date());
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [countdownLabel, setCountdownLabel] =
        useState<string>("Time until Iftaar:");

    useEffect(() => {
        const base = baseDate ? new Date(baseDate) : new Date(BASE_DATE);
        if (day === "tomorrow") {
            base.setDate(base.getDate() + 1);
        } else if (day === "dayAfterTomorrow") {
            base.setDate(base.getDate() + 2);
        }
        setDate(base);
    }, [day, baseDate]);

    const normalizedCurrent = new Date();
    normalizedCurrent.setHours(0, 0, 0, 0);
    const normalizedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
    const isToday = normalizedDate.getTime() === normalizedCurrent.getTime();
    const hijriDate = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);

    let prefix = "";
    const normalizedTomorrow = new Date(normalizedCurrent);
    normalizedTomorrow.setDate(normalizedTomorrow.getDate() + 1);
    if (day === "today" && isToday) {
        prefix = "Today, ";
    } else if (
        day === "tomorrow" &&
        normalizedDate.getTime() === normalizedTomorrow.getTime()
    ) {
        prefix = "Tomorrow, ";
    }

    // Dynamic countdown: before maghrib shows "Time until Iftaar:" (target = today's maghrib)
    // If current time is after maghrib and before tomorrow's fajr, show "Time until Fajr:" (target = tomorrow's fajr)
    useEffect(() => {
        if (
            prayerTimes &&
            prayerTimes["maghrib"] &&
            nextDayPrayerTimes &&
            nextDayPrayerTimes["fajr"]
        ) {
            const [mHour, mMinute] = prayerTimes["maghrib"]
                .split(":")
                .map(Number);
            const iftaarTime = new Date(date);
            iftaarTime.setHours(mHour, mMinute, 0, 0);

            const tomorrow = new Date(date);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const [fajrHour, fajrMinute] = nextDayPrayerTimes["fajr"]
                .split(":")
                .map(Number);
            const tomFajrTime = new Date(tomorrow);
            tomFajrTime.setHours(fajrHour, fajrMinute, 0, 0);

            function updateCountdown() {
                const now = new Date();
                if (now < iftaarTime) {
                    setTimeLeft(iftaarTime.getTime() - now.getTime());
                    setCountdownLabel("Time until Iftaar:");
                } else if (now >= iftaarTime && now < tomFajrTime) {
                    setTimeLeft(tomFajrTime.getTime() - now.getTime());
                    setCountdownLabel("Time until Fajr:");
                } else {
                    // After tomorrow's fajr, switch back to iftaar countdown (new day)
                    setTimeLeft(0);
                    setCountdownLabel("Time until Iftaar:");
                }
            }
            updateCountdown();
            const intervalId = setInterval(updateCountdown, 1000);
            return () => clearInterval(intervalId);
        } else if (prayerTimes && prayerTimes["maghrib"]) {
            const [mHour, mMinute] = prayerTimes["maghrib"]
                .split(":")
                .map(Number);
            const iftaarTime = new Date(date);
            iftaarTime.setHours(mHour, mMinute, 0, 0);
            function updateCountdown() {
                const now = new Date();
                if (now < iftaarTime) {
                    setTimeLeft(iftaarTime.getTime() - now.getTime());
                    setCountdownLabel("Time until Iftaar:");
                } else {
                    setTimeLeft(0);
                    setCountdownLabel("Time until Iftaar:");
                }
            }
            updateCountdown();
            const intervalId = setInterval(updateCountdown, 1000);
            return () => clearInterval(intervalId);
        }
    }, [prayerTimes, nextDayPrayerTimes, date]);

    return (
        <div
            className={`rounded-xl p-4 md:p-6 h-full ${
                isToday
                    ? "border-2 border-blue-500 shadow-lg bg-white"
                    : "bg-white shadow-md"
            }`}
        >
            <h2 className="text-xl md:text-2xl font-semibold mb-1 md:mb-1">
                {prefix +
                    normalizedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
            </h2>
            <p className="text-xs text-gray-500">
                {normalizedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                })}
                {", "}
                {hijriDate}
            </p>
            {/* Dynamic Countdown on Today card only */}
            {prayerTimes && timeLeft >= 0 && day === "today" && (
                <p className="text-xs text-blue-500 mt-2">
                    {countdownLabel}{" "}
                    {timeLeft < 60000
                        ? `${Math.floor(timeLeft / 1000)}s`
                        : `${Math.floor(timeLeft / 3600000)}h ${Math.floor(
                              (timeLeft % 3600000) / 60000
                          )}m`}
                </p>
            )}
            <p className="text-xs text-gray-500 mb-2 border-b pb-2 md:mb-2"></p>
            {prayerTimes ? (
                <PrayerTimes prayerTimes={prayerTimes} />
            ) : (
                <div className="text-center text-gray-500">
                    Prayer times not available
                </div>
            )}
            <EventList date={date} />
        </div>
    );
}
