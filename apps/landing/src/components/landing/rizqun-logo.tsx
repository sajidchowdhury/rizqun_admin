import { cn } from "@/lib/utils";

/**
 * Rizqun brand mark — a stylized wheat sheaf (ear of grain) in antique gold.
 * References the Arabic word "rizq" (sustenance/provision).
 * Minimalist line art, ~2px stroke, rounded caps.
 */
export function WheatMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Central stalk */}
      <path
        d="M24 44 L24 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Grain pairs — symmetric, tapering toward top */}
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none">
        {/* lowest pair */}
        <path d="M24 38 C20 36, 17 33, 16 29" />
        <path d="M24 38 C28 36, 31 33, 32 29" />
        {/* mid-low pair */}
        <path d="M24 32 C20.5 30, 18 27.5, 17.5 24" />
        <path d="M24 32 C27.5 30, 30 27.5, 30.5 24" />
        {/* mid-high pair */}
        <path d="M24 26 C21 24.5, 19 22, 18.5 19" />
        <path d="M24 26 C27 24.5, 29 22, 29.5 19" />
        {/* upper pair */}
        <path d="M24 20 C21.5 18.5, 20 16.5, 19.5 14" />
        <path d="M24 20 C26.5 18.5, 28 16.5, 28.5 14" />
      </g>
      {/* Top tip — single grain */}
      <path
        d="M24 14 C23 11, 23 8, 24 5 C25 8, 25 11, 24 14 Z"
        fill="currentColor"
        stroke="none"
      />
      {/* Small leaves at base */}
      <path
        d="M24 42 C22 44, 19 44.5, 17 43.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 42 C26 44, 29 44.5, 31 43.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Full Rizqun brand lockup — Bengali wordmark + wheat mark + Latin subtitle.
 * Centered, premium, "quiet luxury" aesthetic.
 */
export function RizqunLogo({
  className,
  variant = "full",
  size = "md",
}: {
  className?: string;
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: { mark: "h-6 w-6", wordmark: "text-lg", subtitle: "text-[9px]" },
    md: { mark: "h-8 w-8", wordmark: "text-2xl", subtitle: "text-[10px]" },
    lg: { mark: "h-12 w-12", wordmark: "text-3xl", subtitle: "text-xs" },
    xl: { mark: "h-20 w-20", wordmark: "text-6xl", subtitle: "text-sm" },
  };
  const s = sizes[size];

  if (variant === "mark") {
    return (
      <WheatMark
        className={cn("text-rizqun-gold", s.mark, className)}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          "font-serif font-semibold tracking-luxe text-rizqun-ink uppercase",
          s.wordmark,
          className,
        )}
      >
        Rizqun
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex flex-col items-center leading-none",
        className,
      )}
    >
      <span className="flex items-center gap-2">
        <WheatMark className={cn("text-rizqun-gold", s.mark)} />
        <span
          className={cn(
            "font-hind font-bold text-rizqun-ink",
            s.wordmark,
          )}
          style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
        >
          রিজকুন
        </span>
      </span>
      <span
        className={cn(
          "mt-1 font-serif font-medium uppercase tracking-luxe text-rizqun-muted",
          s.subtitle,
        )}
      >
        Rizqun
      </span>
    </span>
  );
}
