type LoadingStateProps = {
  title: string;
  description?: string;
};

export default function LoadingState({
  title,
  description,
}: LoadingStateProps) {
  return (
    <section className="card-ui p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          {description ? (
            <p className="mt-2 text-sm text-text-secondary">{description}</p>
          ) : null}
        </div>

        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-bg-muted" />
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-4 w-32 animate-pulse rounded bg-bg-muted" />
        <div className="h-4 w-24 animate-pulse rounded bg-bg-muted" />
      </div>
    </section>
  );
}