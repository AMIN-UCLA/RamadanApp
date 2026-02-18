"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import DaySchedule from "@/components/DaySchedule";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
    const formatDateForInput = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
        return adjustedDate.toISOString().split("T")[0];
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateInput, setDateInput] = useState(formatDateForInput(new Date()));

    const isMobile = useIsMobile();

    // Replace the previous debounced effect with this:
    useEffect(() => {
        if (dateInput && !isNaN(Date.parse(dateInput))) {
            if (isMobile) {
                setSelectedDate(new Date(dateInput + "T00:00:00"));
            } else {
                const timer = setTimeout(() => {
                    setSelectedDate(new Date(dateInput + "T00:00:00"));
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [dateInput, isMobile]);

    const days = ["today", "tomorrow", "dayAfterTomorrow"];

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <div className="container mx-auto px-4 py-8">
                {true &&
                    (isMobile ? (
                        <>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={1}
                                centeredSlides={true}
                                pagination={{
                                    clickable: true,
                                    el: ".swiper-pagination-bottom",
                                }}
                                modules={[Pagination]}
                                className="mb-4 touch-pan-y"
                                touchReleaseOnEdges
                                resistanceRatio={0.85}
                            >
                                {days.map((day, index) => (
                                    <SwiperSlide key={index}>
                                        <DaySchedule
                                            day={
                                                day as
                                                    | "today"
                                                    | "tomorrow"
                                                    | "dayAfterTomorrow"
                                            }
                                            baseDate={selectedDate}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="swiper-pagination-bottom flex justify-center"></div>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {days.map((day, index) => (
                                <DaySchedule
                                    key={index}
                                    day={
                                        day as
                                            | "today"
                                            | "tomorrow"
                                            | "dayAfterTomorrow"
                                    }
                                    baseDate={selectedDate}
                                />
                            ))}
                        </div>
                    ))}
                <div className="mt-8 flex flex-col items-center gap-4 px-1 pb-[env(safe-area-inset-bottom)]">
                    <p className="mb-0 text-sm text-gray-700 dark:text-gray-300">
                        Select date for preview:
                    </p>
                    <input
                        type="date"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        className="min-h-[44px] px-4 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 touch-manipulation w-full max-w-[280px]"
                        min="2026-02-17"
                        max="2026-03-20"
                    />
                    {formatDateForInput(selectedDate) !==
                        formatDateForInput(new Date()) && (
                        <button
                            type="button"
                            className="min-h-[44px] px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 active:opacity-90 touch-manipulation font-medium"
                            onClick={() => {
                                const today = new Date();
                                setDateInput(formatDateForInput(today));
                            }}
                        >
                            Today
                        </button>
                    )}
                </div>
                <Footer />
            </div>
        </main>
    );
}
