"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./whatsapp-button";
import { RizqunLogo } from "./rizqun-logo";

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-rizqun-cream/85 shadow-warm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center"
          aria-label="রিজকুন — হোম"
        >
          <RizqunLogo size="md" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide text-rizqun-ink/70 transition-colors hover:text-rizqun-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton size="sm" variant="ink">
            অর্ডার করুন
          </WhatsAppButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-rizqun-ink transition-colors hover:bg-rizqun-gold-light/40 md:hidden"
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
            "fixed inset-0 top-20 z-40 bg-rizqun-ink/30 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <nav
          className={cn(
            "fixed inset-x-0 top-20 z-50 origin-top border-t border-rizqun-border/60 bg-rizqun-cream px-4 py-5 shadow-warm-lg transition-all duration-300",
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
                  className="block rounded-lg px-4 py-3 text-base font-medium text-rizqun-ink/90 transition-colors hover:bg-rizqun-gold-light/40 hover:text-rizqun-gold-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <WhatsAppButton className="w-full" size="lg" variant="solid">
              অর্ডার করতে নক করুন
            </WhatsAppButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
