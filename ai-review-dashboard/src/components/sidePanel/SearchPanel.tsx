import {
  REVIEW_FILTER_OPTIONS,
  type ReviewFilter,
} from "../../constants/review";

type SearchPanelProps = {
  query: string;
  onQueryChange: (value: string) => void;
  activeFilter: ReviewFilter;
  onFilterChange: (value: ReviewFilter) => void;
};

export default function SearchPanel({
  query,
  onQueryChange,
  activeFilter,
  onFilterChange,
}: SearchPanelProps) {
  return (
    <div className="grid gap-3">
      <label className="control-ui flex items-center gap-3 px-3 py-3">
        <span className="text-text-muted">⌕</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search conversations"
          className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
        />
      </label>

      <div className="control-ui flex flex-wrap gap-2 p-2">
        {REVIEW_FILTER_OPTIONS.map((filter) => {
          const active = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onFilterChange(filter.value)}
              className={`rounded-[10px] px-3 py-2 text-xs font-medium transition ${
                active
                  ? "bg-bg-muted text-text-primary ring-1 ring-border-accent"
                  : "text-text-secondary hover:bg-bg-muted"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}