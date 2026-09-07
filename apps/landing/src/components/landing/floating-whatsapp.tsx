"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-button";
import { waLink } from "@/lib/whatsapp";

/**
 * Fixed, always-visible WhatsApp button (bottom-right).
 * Appears after a tiny scroll so it doesn't crowd the hero CTA on first paint.
 * Respects iOS safe-area insets.
 */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="হোয়াটসঅ্যাপে অর্ডার করুন"
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl shadow-black/20 transition-all duration-300 hover:brightness-105",
        "active:scale-95",
        "bottom-[calc(1rem+env(safe-area-inset-bottom))]",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span className="relative flex h-6 w-6">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
        <WhatsAppIcon className="relative h-6 w-6" />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">অর্ডার করুন</span>
    </a>
  );
}
