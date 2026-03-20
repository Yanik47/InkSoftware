export type WeatherStatus =
  | "idle"
  | "loading"
  | "success"
  | "not_found"
  | "error";

export type WeatherData = {
  resolvedName: string;
  country: string;
  temperature: number;
  apparentTemperature: number;
  windSpeed: number;
  weatherCode: number;
  weatherLabel: string;
  isDay: boolean;
  observedAt: string;
};

type GeocodingResponse = {
  results?: Array<{
    name: string;
    country?: string;
    country_code?: string;
    latitude: number;
    longitude: number;
  }>;
};

type ForecastResponse = {
  current?: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    is_day: number;
    weather_code: number;
    wind_speed_10m: number;
  };
};

const WEATHER_CODE_MAP: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

function getWeatherLabel(code: number) {
  return WEATHER_CODE_MAP[code] ?? "Unknown conditions";
}

function buildNotFoundError(message: string) {
  const error = new Error(message);
  error.name = "NotFoundError";
  return error;
}

export function isNotFoundError(error: unknown) {
  return error instanceof Error && error.name === "NotFoundError";
}

export async function fetchCityWeather(
  city: string,
  signal?: AbortSignal,
): Promise<WeatherData> {
  const normalizedCity = city.trim();

  if (!normalizedCity) {
    throw new Error("City is missing.");
  }

  const geocodingUrl =
    `https://geocoding-api.open-meteo.com/v1/search?` +
    new URLSearchParams({
      name: normalizedCity,
      count: "1",
      language: "en",
      format: "json",
    }).toString();

  const geocodingResponse = await fetch(geocodingUrl, { signal });

  if (!geocodingResponse.ok) {
    throw new Error("Failed to resolve city coordinates.");
  }

  const geocodingData: GeocodingResponse = await geocodingResponse.json();
  const match = geocodingData.results?.[0];

  if (!match) {
    throw buildNotFoundError(`No city match found for "${normalizedCity}".`);
  }

  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?` +
    new URLSearchParams({
      latitude: String(match.latitude),
      longitude: String(match.longitude),
      current:
        "temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m",
      timezone: "auto",
    }).toString();

  const weatherResponse = await fetch(weatherUrl, { signal });

  if (!weatherResponse.ok) {
    throw new Error("Failed to fetch current weather.");
  }

  const weatherData: ForecastResponse = await weatherResponse.json();

  if (!weatherData.current) {
    throw new Error("Current weather is unavailable.");
  }

  return {
    resolvedName: match.name,
    country: match.country ?? match.country_code ?? "Unknown country",
    temperature: weatherData.current.temperature_2m,
    apparentTemperature: weatherData.current.apparent_temperature,
    windSpeed: weatherData.current.wind_speed_10m,
    weatherCode: weatherData.current.weather_code,
    weatherLabel: getWeatherLabel(weatherData.current.weather_code),
    isDay: weatherData.current.is_day === 1,
    observedAt: weatherData.current.time,
  };
}