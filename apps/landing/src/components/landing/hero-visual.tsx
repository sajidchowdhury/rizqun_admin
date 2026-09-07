import { motion } from "framer-motion";
import {
  Leaf,
  Zap,
  Smartphone,
  Pill,
  Droplet,
  Ambulance,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { WheatMark } from "./rizqun-logo";
import { useLandingContent } from "@/lib/landing-content";

// Map whatsappKey → icon
const SERVICE_ICONS: Record<string, LucideIcon> = {
  grocery: Leaf,
  electric: Zap,
  electronics: Smartphone,
  medicine: Pill,
  blood: Droplet,
  ambulance: Ambulance,
};

// Map whatsappKey → icon color classes
const SERVICE_COLORS: Record<string, { color: string; bg: string }> = {
  grocery: { color: "text-emerald-600", bg: "bg-emerald-50" },
  electric: { color: "text-amber-600", bg: "bg-amber-50" },
  electronics: { color: "text-blue-600", bg: "bg-blue-50" },
  medicine: { color: "text-teal-600", bg: "bg-teal-50" },
  blood: { color: "text-rose-600", bg: "bg-rose-50" },
  ambulance: { color: "text-red-600", bg: "bg-red-50" },
};

/**
 * Creative "WOW" hero visual — floating card composition.
 * All text is dynamic (from the landing content API).
 */
export function HeroVisual() {
  const { data } = useLandingContent();
  const { content, services } = data;

  return (
    <div className="relative mx-auto w-full max-w-md md:max-w-lg">
      {/* glow behind composition */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-110 rounded-full bg-rizqun-gold/10 blur-3xl"
      />

      {/* Main card — greeting + service grid */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[1.75rem] border border-rizqun-gold-light bg-rizqun-paper/90 p-6 shadow-warm-xl backdrop-blur-sm md:p-8"
      >
        {/* Greeting */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            {content.logoUrl ? (
              <img
                src={content.logoUrl}
                alt="রিজকুন"
                className="h-6 w-auto"
              />
            ) : (
              <WheatMark className="h-6 w-6 text-rizqun-gold" />
            )}
            <span
              className="text-lg font-bold text-rizqun-ink"
              style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
            >
              {content.heroGreeting}
            </span>
          </div>
          <p
            className="mt-1 text-2xl font-bold text-rizqun-gold-deep md:text-3xl"
            style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
          >
            {content.heroQuestion}
          </p>
        </div>

        {/* ornamental divider */}
        <div className="ornament-divider my-5">
          <Sparkles className="h-3 w-3" />
        </div>

        {/* Service tiles — 3×2 grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {services.slice(0, 6).map((s, i) => {
            const Icon = SERVICE_ICONS[s.whatsappKey] ?? Leaf;
            const colors = SERVICE_COLORS[s.whatsappKey] ?? SERVICE_COLORS.grocery;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.06,
                  ease: "backOut",
                }}
                whileHover={{ y: -3, scale: 1.04 }}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-rizqun-border/60 bg-white p-3 shadow-sm transition-shadow hover:shadow-warm"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} ${colors.color} transition-transform group-hover:scale-110`}
                >
                  {s.emoji ? (
                    <span className="text-xl">{s.emoji}</span>
                  ) : (
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </div>
                <span
                  className="text-[11px] font-semibold text-rizqun-ink"
                  style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
                >
                  {s.title}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Neki highlight strip inside card */}
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-gradient-to-r from-rizqun-gold/10 to-rizqun-gold-light/30 p-3">
          <span className="text-2xl" aria-hidden>
            🤲
          </span>
          <div className="flex-1">
            <p
              className="text-sm font-bold text-rizqun-gold-deep"
              style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
            >
              {content.nekiTitle}
            </p>
            <p className="text-[11px] text-rizqun-muted">
              {content.nekiSubtitle}
            </p>
          </div>
          <span className="rounded-full bg-rizqun-gold px-2.5 py-1 text-[10px] font-bold text-white">
            {content.nekiPercentage}%
          </span>
        </div>
      </motion.div>

      {/* Floating badge: ডেলিভারি নিরাপদ ও দ্রুত — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -bottom-4 -right-2 z-20 rotate-[4deg] rounded-2xl border border-rizqun-border bg-rizqun-paper px-4 py-2.5 shadow-warm-lg md:-right-6"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Truck className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-rizqun-muted">
              ডেলিভারি
            </p>
            <p
              className="text-sm font-bold text-rizqun-ink"
              style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
            >
              নিরাপদ ও দ্রুত
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating badge: নেকির অংশ — top left */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -top-4 -left-2 z-20 -rotate-[5deg] rounded-2xl border border-rizqun-gold/30 bg-rizqun-paper px-4 py-2.5 shadow-warm-lg md:-left-6"
      >
        <p className="text-[10px] font-medium uppercase tracking-wide text-rizqun-muted">
          প্রতিটি অর্ডারে
        </p>
        <p
          className="text-sm font-bold text-gold"
          style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
        >
          নেকির অংশ যাচ্ছে
        </p>
      </motion.div>

      {/* Decorative dots */}
      <div
        aria-hidden
        className="absolute -right-8 top-1/3 h-2 w-2 rounded-full bg-rizqun-gold/40"
      />
      <div
        aria-hidden
        className="absolute -left-10 bottom-1/4 h-1.5 w-1.5 rounded-full bg-rizqun-gold/30"
      />
    </div>
  );
}
