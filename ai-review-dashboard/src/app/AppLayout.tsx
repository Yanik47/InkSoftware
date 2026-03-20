import type { ReactNode } from "react";

type MobilePane = "sidebar" | "main" | "review";

type AppLayoutProps = {
  sidebar: ReactNode;
  main: ReactNode;
  reviewPanel: ReactNode;
  activeMobilePane: MobilePane;
  onChangeMobilePane: (pane: MobilePane) => void;
};

const tabs: Array<{ key: MobilePane; label: string }> = [
  { key: "sidebar", label: "Inbox" },
  { key: "main", label: "Conversation" },
  { key: "review", label: "Review" },
];

export function AppLayout({
  sidebar,
  main,
  reviewPanel,
  activeMobilePane,
  onChangeMobilePane,
}: AppLayoutProps) {
  return (
    <div className="h-dvh overflow-hidden bg-bg-canvas p-3 text-text-primary md:p-4">
      <div className="mx-auto flex h-full min-h-0 max-w-[1700px] flex-col gap-3 rounded-[28px] border border-border-default bg-bg-app p-3 shadow-[var(--shadow-soft)] md:p-4">
        <header className="shrink-0 flex items-center justify-between rounded-[20px] border border-border-subtle bg-bg-surface px-4 py-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-text-muted">
              FE Coding Task
            </p>
            <h1 className="text-lg font-semibold text-text-primary md:text-xl">
              AI Conversation Review Dashboard
            </h1>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <span className="rounded-full border border-border-subtle bg-bg-elevated px-3 py-1 text-xs text-text-secondary">
              -inspired layout
            </span>
          </div>
        </header>

        <div className="grid gap-3 lg:hidden">
          <div className="control-ui flex gap-2 p-1">
            {tabs.map((tab) => {
              const active = activeMobilePane === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onChangeMobilePane(tab.key)}
                  className={`flex-1 rounded-[10px] px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-accent-blue text-text-primary"
                      : "text-text-secondary hover:bg-bg-muted"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <main className="min-h-0 flex-1 overflow-hidden rounded-[24px] border border-border-default bg-bg-surface lg:grid lg:grid-cols-[320px_minmax(0,1fr)_360px]">
          <section
            className={`h-full min-h-0 overflow-hidden ${
              activeMobilePane === "sidebar" ? "block" : "hidden"
            } lg:block lg:border-r lg:border-border-subtle`}
          >
            {sidebar}
          </section>

          <section
            className={`h-full min-h-0 overflow-hidden ${
              activeMobilePane === "main" ? "block" : "hidden"
            } lg:block lg:border-r lg:border-border-subtle`}
          >
            {main}
          </section>

          <aside
            className={`h-full min-h-0 overflow-hidden ${
              activeMobilePane === "review" ? "block" : "hidden"
            } lg:block`}
          >
            {reviewPanel}
          </aside>
        </main>
      </div>
    </div>
  );
}
