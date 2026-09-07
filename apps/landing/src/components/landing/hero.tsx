"use client";

import { ShieldCheck, BadgePercent, Truck } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { WhatsAppButton } from "./whatsapp-button";
import { WheatMark } from "./rizqun-logo";
import { PhoneMockup } from "./phone-mockup";

const PAIN_POINTS = [
  { emoji: "😊", text: "বাজারের ভিড় আর সময়ের অভাবে ক্লান্ত?" },
  { emoji: "🛡️", text: "প্রতিদিন টুকটাক কিনতে বের হওয়ার নিরাপত্তাহীনতা?" },
  { emoji: "⚡", text: "এক ক্লিকেই ঘরে বসে অর্ডার—দ্রুত ও নিরাপদ।" },
];

const TRUST_MICRO = [
  { icon: BadgePercent, label: "বাজার মূল্য" },
  { icon: ShieldCheck, label: "যাচাই করা পণ্য" },
  { icon: Truck, label: "নিরাপদ ডেলিভারি" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper-grain">
      {/* decorative wheat watermarks */}
      <WheatMark className="pointer-events-none absolute -right-20 top-10 h-72 w-72 text-rizqun-gold/[0.06]" />
      <WheatMark className="pointer-events-none absolute -left-24 bottom-10 h-64 w-64 rotate-12 text-rizqun-gold/[0.05]" />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-12 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* Left: copy */}
          <SectionReveal className="order-2 md:order-1">
            {/* breadcrumb tag */}
            <span className="inline-flex items-center gap-2 rounded-full bg-rizqun-gold-light/40 px-4 py-1.5 text-xs font-medium tracking-wide-luxe text-rizqun-gold-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-rizqun-gold" />
              বাজার • মেডিসিন • সেবা
            </span>

            {/* H1 with gold-highlighted keywords */}
            <h1
              className="mt-5 text-balance text-3xl font-bold leading-[1.3] text-rizqun-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.25]"
              style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
            >
              আপনার বাজার করার ঝামেলা,{" "}
              <span className="text-gold">এখন</span> আমাদের। আপনার পরিবারের
              নিরাপত্তা আর সময়—দুটোই{" "}
              <span className="text-gold">বাঁচছে</span>।
            </h1>

            {/* pain points with emoji bullets */}
            <ul className="mt-6 space-y-2.5">
              {PAIN_POINTS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-rizqun-muted">
                  <span className="text-lg leading-none" aria-hidden>
                    {p.emoji}
                  </span>
                  <span className="text-pretty">{p.text}</span>
                </li>
              ))}
            </ul>

            {/* sub-copy with gold highlight */}
            <p className="mt-6 text-pretty text-sm leading-relaxed text-rizqun-muted sm:text-base">
              ঘরে বসে হোয়াটসঅ্যাপে একটি মেসেজ দিন। বাজার মূল্যে পবিত্র ও বিশুদ্ধ পণ্য
              নিরাপদে পৌঁছে যাবে আপনার হাতে। উপরন্তু, আপনার কেনাকাটা থেকে একটি অংশ
              সরাসরি <span className="font-semibold text-gold">আলেমদের খেদমতে</span> যাবে।
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton size="lg" variant="solid" className="w-full sm:w-auto">
                বিস্তারিত জানতে ক্লিক করুন
              </WhatsAppButton>
              <a
                href="#services"
                className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-rizqun-ink/15 px-7 text-base font-semibold text-rizqun-ink transition-all duration-300 hover:border-rizqun-gold hover:bg-rizqun-gold-light/30"
              >
                আমাদের সেবা দেখুন
              </a>
            </div>

            {/* trust micro-row */}
            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-rizqun-muted">
              {TRUST_MICRO.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-rizqun-gold" />
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </SectionReveal>

          {/* Right: phone mockup */}
          <SectionReveal delay={0.15} className="order-1 md:order-2">
            <div className="relative mx-auto max-w-[300px] md:max-w-none">
              {/* glow behind phone */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 scale-110 rounded-full bg-rizqun-gold/10 blur-3xl"
              />
              <PhoneMockup />

              {/* floating badge: neki */}
              <div className="absolute -left-2 top-1/3 z-20 hidden rotate-[-6deg] rounded-2xl border border-rizqun-gold/30 bg-rizqun-paper/95 px-3 py-2 shadow-warm-lg sm:block">
                <p className="text-[10px] font-medium uppercase tracking-wide text-rizqun-muted">
                  প্রতিটি অর্ডারে
                </p>
                <p className="text-sm font-bold text-gold">নেকির অংশ যাচ্ছে</p>
              </div>

              {/* floating badge: delivery */}
              <div className="absolute -right-2 bottom-1/4 z-20 rotate-[5deg] rounded-2xl border border-rizqun-border bg-rizqun-paper/95 px-3 py-2 shadow-warm-lg">
                <p className="text-[10px] font-medium uppercase tracking-wide text-rizqun-muted">
                  ডেলিভারি
                </p>
                <p className="text-sm font-bold text-rizqun-ink">নিরাপদ ও দ্রুত</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
