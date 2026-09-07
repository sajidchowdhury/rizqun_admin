import { ShieldCheck, BadgePercent, Truck } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { WhatsAppButton } from "./whatsapp-button";

const TRUST_MICRO = [
  { icon: BadgePercent, label: "বাজার মূল্য" },
  { icon: ShieldCheck, label: "যাচাই করা পণ্য" },
  { icon: Truck, label: "নিরাপদ ডেলিভারি" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-rizqun-emerald-tint via-rizqun-cream to-rizqun-cream"
    >
      {/* decorative glow + pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-rizqun-emerald/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-rizqun-gold/10 blur-3xl"
      />
      <div aria-hidden className="absolute inset-0 bg-pattern-dots opacity-40" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-24 md:pt-16">
        {/* Copy */}
        <SectionReveal className="order-2 md:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-rizqun-emerald/20 bg-white/70 px-4 py-1.5 text-xs font-medium text-rizqun-emerald-deep backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rizqun-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rizqun-emerald" />
            </span>
            এখন হোয়াটসঅ্যাপে অর্ডার চালু
          </span>

          <h1 className="mt-5 text-balance text-3xl font-bold leading-[1.25] tracking-tight text-rizqun-ink sm:text-4xl md:text-[2.75rem]">
            আপনার বাজার করার ঝামেলা, এখন আমাদের।{" "}
            <span className="text-rizqun-emerald">
              আপনার পরিবারের নিরাপত্তা আর সময়—দুটোই বাঁচছে।
            </span>
          </h1>

          <div className="mt-5 space-y-2.5 text-pretty text-base leading-relaxed text-rizqun-muted sm:text-lg">
            <p>
              <span className="font-semibold text-rizqun-ink">ভিড়, ধোঁকা আর সময়ের অভাবে ক্লান্ত?</span>{" "}
              প্রতিদিন টুকটাক কিনতে বের হওয়ার ভয় আর নিরাপত্তাহীনতা?
            </p>
            <p>
              ঘরে বসে হোয়াটসঅ্যাপে একটি মেসেজ দিন। বাজার মূল্যে পবিত্র ও বিশুদ্ধ পণ্য
              নিরাপদে পৌঁছে যাবে আপনার হাতে। উপরন্তু, আপনার কেনাকাটা থেকে একটি অংশ
              সরাসরি{" "}
              <span className="font-semibold text-rizqun-gold">আলেমদের খেদমতে</span>{" "}
              যাবে।
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton size="lg" className="w-full sm:w-auto">
              অর্ডার করতে হোয়াটসঅ্যাপে নক করুন
            </WhatsAppButton>
            <a
              href="#services"
              className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-rizqun-emerald/20 px-7 text-base font-semibold text-rizqun-emerald-deep transition-colors hover:border-rizqun-emerald/50 hover:bg-white/60"
            >
              আমাদের সেবা দেখুন
            </a>
          </div>

          {/* trust micro-row */}
          <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-rizqun-muted">
            {TRUST_MICRO.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-rizqun-emerald" />
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>

        {/* Image */}
        <SectionReveal
          delay={0.15}
          className="order-1 md:order-2"
        >
          <HeroVisual />
        </SectionReveal>
      </div>

      {/* wave divider into next section */}
      <div aria-hidden className="relative">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="block h-[40px] w-full fill-rizqun-cream"
        >
          <path d="M0,32 C240,60 480,0 720,18 C960,36 1200,60 1440,28 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md md:max-w-none">
      {/* floating badges */}
      <div className="absolute -left-3 top-6 z-20 hidden rotate-[-6deg] rounded-2xl border border-rizqun-gold/30 bg-white/95 px-4 py-2 shadow-lg sm:block">
        <p className="text-[11px] font-medium uppercase tracking-wide text-rizqun-muted">
          প্রতিটি অর্ডারে
        </p>
        <p className="text-sm font-bold text-rizqun-gold">নেকির অংশ যাচ্ছে</p>
      </div>
      <div className="absolute -right-2 bottom-8 z-20 rotate-[5deg] rounded-2xl border border-rizqun-emerald/20 bg-white/95 px-4 py-2 shadow-lg">
        <p className="text-[11px] font-medium uppercase tracking-wide text-rizqun-muted">
          ডেলিভারি
        </p>
        <p className="text-sm font-bold text-rizqun-emerald">নিরাপদ ও দ্রুত</p>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-rizqun-emerald-deep to-rizqun-emerald shadow-2xl shadow-rizqun-emerald/20">
        {/* image with graceful fallback */}
        <img
          src="/hero-groceries.png"
          alt="তাজা শাকসবজি ও পরিষ্কার মুদির ঝুড়ি — রিজকুন ডেলিভারি"
          className="aspect-[4/3] w-full object-cover"
          loading="eager"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* fallback shown if image missing: keep gradient + icon */}
        <div className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-center">
          <span className="text-7xl">🧺</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-rizqun-emerald-deep/70 to-transparent p-5">
          <p className="text-sm font-medium text-white/90">
            তাজা, পরিষ্কার, বিশুদ্ধ — প্রতিটি পণ্য যাচাই করা।
          </p>
        </div>
      </div>
    </div>
  );
}
