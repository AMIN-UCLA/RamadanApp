"use client";

import { useState } from "react";
import { PrayerTimeData } from '@/lib/getPrayerTimes';
import { ChevronDown } from "lucide-react";

interface PrayerTimesViewProps {
    prayerTimes: PrayerTimeData;
}

// Formatter for salah times in Los Angeles (time-zone aware)
const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'America/Los_Angeles' });

type PrayerId = keyof PrayerTimeData;
const prayerNameLookup: Record<PrayerId, string> = {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asrShafi: 'Asr (Shafi)',
    asrHanafi: 'Asr (Hanafi)',
    maghrib: 'Maghrib',
    isha: 'Isha',
};

const SUHOOR_DUA = {
    label: "Suhoor",
    ar: "نَوَيْتُ أَنْ أَصُومَ غَداً مِنْ شَهْرِ رَمَضَانَ",
    transliteration: "Nawaytu an asūma ghadan min shahri Ramaḍān.",
    en: "I intend to fast tomorrow in the month of Ramadan.",
};

const IFTAR_DUA = {
    label: "Iftar",
    ar: "اللّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration: "Allāhumma laka ṣumtu wa bika āmantu wa ʿalayka tawakkaltu wa ʿalā rizqika aftartu.",
    en: "O Allah, I fasted for You, and I believe in You, and I put my trust in You, and I break my fast with Your sustenance.",
};

export default function PrayerTimesView({ prayerTimes }: PrayerTimesViewProps) {
    const [expandedDua, setExpandedDua] = useState<"fajr" | "maghrib" | null>(null);

    return (
        <div className="mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Prayer Times
            </h3>
            <ul className="space-y-0 text-sm md:text-base border-b border-gray-200 dark:border-gray-600 pb-2 text-gray-800 dark:text-gray-200">
                {Object.entries(prayerTimes).map(([prayerId, time]) => {
                    const id = prayerId as PrayerId;
                    const isFajr = id === "fajr";
                    const isMaghrib = id === "maghrib";
                    const hasDua = isFajr || isMaghrib;
                    const isExpanded = (isFajr && expandedDua === "fajr") || (isMaghrib && expandedDua === "maghrib");
                    const dua = isFajr ? SUHOOR_DUA : isMaghrib ? IFTAR_DUA : null;

                    return (
                        <li key={prayerId} className="flex flex-col">
                            {hasDua ? (
                                <button
                                    type="button"
                                    onClick={() => setExpandedDua(isExpanded ? null : (isFajr ? "fajr" : "maghrib"))}
                                    className="w-full grid grid-cols-[1fr_auto] gap-3 items-center min-h-[44px] py-2.5 px-0 rounded-lg text-left touch-manipulation active:opacity-70"
                                    aria-expanded={isExpanded}
                                    aria-label={`${dua?.label} dua`}
                                >
                                    <span className="flex items-center gap-1.5 capitalize min-w-0">
                                        {prayerNameLookup[id]}
                                        <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                                    </span>
                                    <span className="tabular-nums text-right shrink-0 w-16">{TIME_FORMATTER.format(time)}</span>
                                </button>
                            ) : (
                                <div className="grid grid-cols-[1fr_auto] gap-3 items-center min-h-[44px] py-2.5 px-0">
                                    <span className="capitalize min-w-0">{prayerNameLookup[id]}</span>
                                    <span className="tabular-nums text-right shrink-0 w-16">{TIME_FORMATTER.format(time)}</span>
                                </div>
                            )}
                            {hasDua && isExpanded && dua && (
                                <div className="mt-1 mb-2 pl-0 pr-0 pt-3 pb-2 px-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 text-left">
                                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                                        Dua for {dua.label}
                                    </h4>
                                    <p className="text-base text-gray-900 dark:text-gray-100 leading-relaxed" dir="rtl" lang="ar">
                                        {dua.ar}
                                    </p>
                                    {"transliteration" in dua && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 italic">
                                            {dua.transliteration}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 italic">
                                        {dua.en}
                                    </p>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
