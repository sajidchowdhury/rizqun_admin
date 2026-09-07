import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./whatsapp-button";

const NAV_LINKS = [
  { href: "#neki", label: "নেকির ঝুড়ি" },
  { href: "#services", label: "সেবা" },
  { href: "#trust", label: "কেন আমরা" },
  { href: "#about", label: "আমাদের কথা" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-rizqun-cream/90 shadow-sm shadow-black/5 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="রিজকুন — হোম"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rizqun-emerald text-white shadow-sm">
            <RizqunMark className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-rizqun-emerald-deep">
              রিজকুন
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-rizqun-muted">
              Rizqun BD
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-rizqun-ink/80 transition-colors hover:text-rizqun-emerald"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton size="sm">অর্ডার করুন</WhatsAppButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-rizqun-emerald-deep transition-colors hover:bg-rizqun-emerald-light/60 md:hidden"
          aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "fixed inset-0 top-16 z-40 bg-rizqun-ink/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <nav
          className={cn(
            "fixed inset-x-0 top-16 z-50 origin-top border-b border-rizqun-emerald-light/50 bg-rizqun-cream px-4 py-4 shadow-lg transition-all duration-300",
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0 pointer-events-none",
          )}
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-rizqun-ink/90 transition-colors hover:bg-rizqun-emerald-light/50 hover:text-rizqun-emerald-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <WhatsAppButton className="w-full" size="lg">
              অর্ডার করতে নক করুন
            </WhatsAppButton>
          </div>
        </nav>
      </div>
    </header>
  );
}

function RizqunMark({ className }: { className?: string }) {
  // a stylized "র" inside a basket-ish mark
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 9h9a3 3 0 0 1 0 6h-2l3 3M6 9l1.5 9M6 9l.8-3h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
