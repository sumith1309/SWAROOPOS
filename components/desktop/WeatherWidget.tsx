"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  feelsLike: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  high: number;
  low: number;
}

const WEATHER_ICONS: Record<number, string> = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "🌨️", 73: "🌨️", 75: "❄️",
  80: "🌦️", 81: "🌧️", 82: "⛈️",
  95: "⛈️", 96: "⛈️", 99: "⛈️",
};

const WEATHER_DESC: Record<number, string> = {
  0: "Clear Sky", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Foggy", 48: "Rime Fog",
  51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
  61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
  71: "Light Snow", 73: "Snow", 75: "Heavy Snow",
  80: "Light Showers", 81: "Showers", 82: "Heavy Showers",
  95: "Thunderstorm", 96: "Thunderstorm", 99: "Severe Storm",
};

/**
 * Compact climate readout for the taskbar's top-right cluster —
 * icon + temperature always, condition + high/low on wider screens,
 * full details in the hover tooltip.
 */
export default function WeatherWidget({ isDark }: { isDark: boolean }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather(lat: number, lon: number) {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          weatherCode: data.current.weather_code,
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
        });
      } catch {
        setWeather({ temp: 34, feelsLike: 38, weatherCode: 1, humidity: 55, windSpeed: 12, high: 38, low: 26 });
      }
    }

    // Timezone-based coords — no geolocation permission prompt on load.
    const coords: Record<string, [number, number]> = {
      Calcutta: [22.57, 88.36],
      Kolkata: [22.57, 88.36],
      Dubai: [25.27, 55.3],
      Mumbai: [19.08, 72.88],
      Delhi: [28.61, 77.21],
      London: [51.51, -0.13],
      New_York: [40.71, -74.01],
    };
    const key = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop() || "";
    const [lat, lon] = coords[key] || [25.27, 55.3];
    fetchWeather(lat, lon);
  }, []);

  if (!weather) return null;

  const icon = WEATHER_ICONS[weather.weatherCode] || "🌤️";
  const desc = WEATHER_DESC[weather.weatherCode] || "Clear";

  return (
    <span
      className="flex items-center gap-1.5"
      title={`${desc} · feels like ${weather.feelsLike}° · H ${weather.high}° L ${weather.low}° · humidity ${weather.humidity}% · wind ${weather.windSpeed} km/h`}
      aria-label={`Weather: ${desc}, ${weather.temp} degrees`}
    >
      <span className="text-[13px] leading-none" aria-hidden>{icon}</span>
      <span className={`font-medium ${isDark ? "text-white/85" : "text-[#0F172A]"}`}>{weather.temp}°</span>
      <span className="hidden lg:inline">{desc}</span>
      <span className={`hidden xl:inline ${isDark ? "text-white/40" : "text-[#94A3B8]"}`}>
        H {weather.high}° · L {weather.low}°
      </span>
    </span>
  );
}
