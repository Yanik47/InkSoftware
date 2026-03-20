import { useCityWeather } from "../../lib/utils";

type WeatherCardProps = {
  city: string;
};

function formatObservedAt(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function WeatherCard({ city }: WeatherCardProps) {
  const { status, data, errorMessage, retry } = useCityWeather(city);

  if (status === "loading" || status === "idle") {
    return (
      <section className="weather-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-weather-accent">
              Live weather
            </p>
            <h3 className="text-sm font-semibold text-text-primary">
              Loading current conditions…
            </h3>
          </div>

          <div className="h-10 w-10 animate-pulse rounded-full border border-weather-chip-border bg-weather-chip/70" />
        </div>

        <div className="mt-4 grid gap-2">
          <div className="h-4 w-32 animate-pulse rounded bg-weather-chip/80" />
          <div className="h-4 w-24 animate-pulse rounded bg-weather-chip/60" />
        </div>
      </section>
    );
  }

  if (status === "not_found") {
    return (
      <section className="weather-card p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-weather-accent">
          Live weather
        </p>
        <h3 className="mt-1 text-sm font-semibold text-text-primary">
          Weather unavailable
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          {errorMessage ?? `No city match found for "${city}".`}
        </p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="weather-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-weather-accent">
              Live weather
            </p>
            <h3 className="mt-1 text-sm font-semibold text-text-primary">
              Could not load weather
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              {errorMessage ?? "Something went wrong while fetching weather."}
            </p>
          </div>

          <button
            type="button"
            onClick={retry}
            className="weather-action"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="weather-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-weather-accent">
            Live weather
          </p>
          <h3 className="mt-1 text-sm font-semibold text-text-primary">
            {data.resolvedName}, {data.country}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{data.weatherLabel}</p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-semibold leading-none text-text-primary">
            {Math.round(data.temperature)}°C
          </p>
          <p className="mt-1 text-xs text-weather-accent">
            Feels like {Math.round(data.apparentTemperature)}°C
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="weather-chip">
          {data.isDay ? "Day" : "Night"}
        </span>

        <span className="weather-chip">
          Wind {Math.round(data.windSpeed)} km/h
        </span>

        <span className="weather-chip">
          Updated {formatObservedAt(data.observedAt)}
        </span>
      </div>
    </section>
  );
}