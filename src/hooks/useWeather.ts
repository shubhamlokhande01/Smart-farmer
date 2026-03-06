import { useState, useEffect } from "react";
import { fetchWeatherAlerts, fetchCurrentWeather } from "@/lib/weatherService";
import type { WeatherAlert } from "@/types/farming";

export interface CurrentWeather {
    temp: number;
    description: string;
    humidity: number;
    windSpeed: number;
    cityName: string;
    icon: string;
}

interface UseWeatherResult {
    alerts: WeatherAlert[];
    current: CurrentWeather | null;
    loading: boolean;
}

/**
 * Fetches live weather alerts + current conditions for a given location string.
 */
export function useWeather(location: string | null | undefined): UseWeatherResult {
    const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
    const [current, setCurrent] = useState<CurrentWeather | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!location) return;

        let cancelled = false;
        setLoading(true);

        Promise.all([
            fetchWeatherAlerts(location),
            fetchCurrentWeather(location),
        ])
            .then(([alertData, currentData]) => {
                if (!cancelled) {
                    setAlerts(alertData);
                    setCurrent(currentData);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setAlerts([]);
                    setCurrent(null);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [location]);

    return { alerts, current, loading };
}
