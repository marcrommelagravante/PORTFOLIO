import React from "react";

export type ContactCardProps = {
  label: string;
  description: string;
  href?: string;
  icon: React.ReactNode;
  external?: boolean;
};

export function ContactCard({
  label,
  description,
  href,
  icon,
  external = false,
}: ContactCardProps) {
  if (!href) {
    return (
      <div
        aria-disabled="true"
        className="flex flex-col justify-between rounded-xl border border-(--border) bg-(--surface)/40 p-6 opacity-50 sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="text-(--foreground)">{icon}</span>
          <span className="font-mono text-xs text-(--muted)">Coming soon</span>
        </div>
        <div className="mt-5">
          <h2 className="text-lg font-semibold tracking-tight text-(--foreground)">
            {label}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-(--muted)">
            {description}
          </p>
        </div>
      </div>
    );
  }

  const actionHint = external ? "opens in new tab" : "opens mail app";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${label} — ${description} (${actionHint})`}
      className="group flex flex-col justify-between rounded-xl border border-(--border) bg-(--surface)/40 p-6 transition-colors duration-200 hover:border-(--foreground) hover:bg-(--foreground) hover:text-(--background) focus-visible:border-(--foreground) focus-visible:bg-(--foreground) focus-visible:text-(--background) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--foreground) sm:p-7"
    >
      <span className="text-(--foreground) transition-colors duration-200 group-hover:text-(--background) group-focus-visible:text-(--background)">
        {icon}
      </span>
      <div className="mt-5">
        <h2 className="text-lg font-semibold tracking-tight text-(--foreground) transition-colors duration-200 group-hover:text-(--background) group-focus-visible:text-(--background)">
          {label}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-(--muted) transition-colors duration-200 group-hover:text-(--background)/80 group-focus-visible:text-(--background)/80">
          {description}
        </p>
      </div>
    </a>
  );
}

