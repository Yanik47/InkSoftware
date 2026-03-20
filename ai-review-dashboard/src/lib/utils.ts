import { useCallback, useEffect, useState } from "react";
import {
  fetchCityWeather,
  isNotFoundError,
  type WeatherData,
  type WeatherStatus,
} from "../lib/weather";

type UseCityWeatherResult = {
  status: WeatherStatus;
  data: WeatherData | null;
  errorMessage: string | null;
  retry: () => void;
};

export function useCityWeather(city: string): UseCityWeatherResult {
  const [status, setStatus] = useState<WeatherStatus>("idle");
  const [data, setData] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const retry = useCallback(() => {
    setRequestVersion((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const normalizedCity = city.trim();

    if (!normalizedCity) {
      setStatus("error");
      setData(null);
      setErrorMessage("City is missing.");
      return;
    }

    const controller = new AbortController();
    let active = true;

    async function loadWeather() {
      setStatus("loading");
      setData(null);
      setErrorMessage(null);

      try {
        const nextData = await fetchCityWeather(normalizedCity, controller.signal);

        if (!active) return;

        setData(nextData);
        setStatus("success");
      } catch (error) {
        if (!active || controller.signal.aborted) return;

        setData(null);

        if (isNotFoundError(error)) {
          setStatus("not_found");
          setErrorMessage(
            error instanceof Error ? error.message : "City was not found.",
          );
          return;
        }

        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching weather.",
        );
      }
    }

    void loadWeather();

    return () => {
      active = false;
      controller.abort();
    };
  }, [city, requestVersion]);

  return { status, data, errorMessage, retry };
}