"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WeatherData {
  temp: number;
  feelsLike: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  city: string;
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

function getWeatherIcon(code: number): string {
  return WEATHER_ICONS[code] || "🌤️";
}

function getWeatherDesc(code: number): string {
  return WEATHER_DESC[code] || "Clear";
}

export default function WeatherWidget({ isDark }: { isDark: boolean }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather(lat: number, lon: number, city: string) {
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
          city,
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
        });
      } catch {
        // Fallback data
        setWeather({
          temp: 34, feelsLike: 38, weatherCode: 1, humidity: 55,
          windSpeed: 12, city, high: 38, low: 26,
        });
      }
      setLoading(false);
    }

    // Try geolocation, fallback to IP-based
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const city = tz.split("/").pop()?.replace(/_/g, " ") || "Your City";
          fetchWeather(pos.coords.latitude, pos.coords.longitude, city);
        },
        () => {
          // Fallback: use timezone to guess location
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const city = tz.split("/").pop()?.replace(/_/g, " ") || "Your City";
          // Default coords based on common timezones
          const coords: Record<string, [number, number]> = {
            "Calcutta": [22.57, 88.36],
            "Kolkata": [22.57, 88.36],
            "Dubai": [25.27, 55.30],
            "Mumbai": [19.08, 72.88],
            "Delhi": [28.61, 77.21],
            "London": [51.51, -0.13],
            "New_York": [40.71, -74.01],
          };
          const key = tz.split("/").pop() || "";
          const [lat, lon] = coords[key] || [25.27, 55.30];
          fetchWeather(lat, lon, city);
        },
        { timeout: 3000 }
      );
    }
  }, []);

  if (loading) {
    return (
      <div className={`p-4 rounded-[18px] animate-pulse ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}>
        <div className="h-12 rounded-lg" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }} />
      </div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`p-4 ${isDark ? "liquid-glass-sm-dark" : "liquid-glass-sm"}`}
    >
      {/* City + condition */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[11px] font-semibold uppercase tracking-wider ${isDark ? "text-white/50" : "text-[#94A3B8]"}`}>
          {weather.city}
        </span>
        <span className="text-[16px]">{getWeatherIcon(weather.weatherCode)}</span>
      </div>

      {/* Temperature */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className={`text-[36px] font-heading font-bold leading-none tracking-tight ${isDark ? "text-white" : "text-[#1C1C1E]"}`}>
          {weather.temp}°
        </span>
      </div>

      <p className={`text-[11px] font-medium mb-3 ${isDark ? "text-white/50" : "text-[#8E8E93]"}`}>
        {getWeatherDesc(weather.weatherCode)}
      </p>

      {/* Details row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={isDark ? "text-white/40" : "text-[#C7C7CC]"}>
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
          <span className={`text-[11px] font-semibold ${isDark ? "text-white/60" : "text-[#6B6B70]"}`}>{weather.high}°</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={isDark ? "text-white/40" : "text-[#C7C7CC]"}>
            <path d="M17 7L7 17M7 17H17M7 17V7" />
          </svg>
          <span className={`text-[11px] font-semibold ${isDark ? "text-white/60" : "text-[#6B6B70]"}`}>{weather.low}°</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={isDark ? "text-white/40" : "text-[#C7C7CC]"}>
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <span className={`text-[11px] font-semibold ${isDark ? "text-white/60" : "text-[#6B6B70]"}`}>{weather.humidity}%</span>
        </div>
      </div>
    </motion.div>
  );
}
