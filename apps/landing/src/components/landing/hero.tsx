"use client";

import { ShieldCheck, BadgePercent, Truck } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { WhatsAppButton } from "./whatsapp-button";
import { WheatMark } from "./rizqun-logo";

const TRUST_MICRO = [
  { icon: BadgePercent, label: "বাজার মূল্য" },
  { icon: ShieldCheck, label: "যাচাই করা পণ্য" },
  { icon: Truck, label: "নিরাপদ ডেলিভারি" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-paper-grain"
    >
      {/* decorative wheat watermarks */}
      <WheatMark
        className="pointer-events-none absolute -right-16 top-10 h-72 w-72 text-rizqun-gold/[0.06]"
      />
      <WheatMark
        className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rotate-12 text-rizqun-gold/[0.05]"
      />

      {/* subtle top gradient into cream */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-rizqun-gold-light/20 to-transparent"
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-12 text-center sm:px-6 md:pb-28 md:pt-20">
        {/* Brand lockup — large, centered */}
        <SectionReveal>
          <div className="flex flex-col items-center">
            <WheatMark className="h-16 w-16 text-rizqun-gold md:h-20 md:w-20" />
            <h1
              className="mt-5 text-4xl font-bold text-rizqun-ink md:text-6xl"
              style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
            >
              রিজকুন
            </h1>
            <p className="mt-2 font-serif text-sm font-medium uppercase tracking-luxe text-rizqun-muted md:text-base">
              Rizqun
            </p>
          </div>
        </SectionReveal>

        {/* Tagline */}
        <SectionReveal delay={0.1}>
          <p className="mt-6 font-serif text-lg italic text-rizqun-gold-deep md:text-xl">
            আমানত • পবিত্রতা • নেকি
          </p>
        </SectionReveal>

        {/* Main headline */}
        <SectionReveal delay={0.15}>
          <h2 className="mt-6 text-balance text-2xl font-bold leading-snug text-rizqun-ink sm:text-3xl md:text-[2.5rem] md:leading-[1.3]">
            আপনার বাজার করার ঝামেলা, এখন আমাদের।{" "}
            <span className="text-rizqun-gold-deep">
              আপনার পরিবারের নিরাপত্তা আর সময়—দুটোই বাঁচছে।
            </span>
          </h2>
        </SectionReveal>

        {/* 3F sub-copy */}
        <SectionReveal delay={0.2}>
          <div className="mt-6 space-y-2 text-pretty text-base leading-relaxed text-rizqun-muted sm:text-lg">
            <p>
              <span className="font-semibold text-rizqun-ink">
                ভিড়, ধোঁকা আর সময়ের অভাবে ক্লান্ত?
              </span>{" "}
              প্রতিদিন টুকটাক কিনতে বের হওয়ার ভয় আর নিরাপত্তাহীনতা?
            </p>
            <p>
              ঘরে বসে হোয়াটসঅ্যাপে একটি মেসেজ দিন। বাজার মূল্যে পবিত্র ও বিশুদ্ধ
              পণ্য নিরাপদে পৌঁছে যাবে আপনার হাতে। উপরন্তু, আপনার কেনাকাটা থেকে
              একটি অংশ সরাসরি{" "}
              <span className="font-semibold text-rizqun-gold-deep">
                আলেমদের খেদমতে
              </span>{" "}
              যাবে।
            </p>
          </div>
        </SectionReveal>

        {/* CTAs */}
        <SectionReveal delay={0.3}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <WhatsAppButton size="lg" variant="solid" className="w-full sm:w-auto">
              অর্ডার করতে হোয়াটসঅ্যাপে নক করুন
            </WhatsAppButton>
            <a
              href="#services"
              className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-rizqun-ink/15 px-8 text-base font-semibold text-rizqun-ink transition-all duration-300 hover:border-rizqun-gold hover:bg-rizqun-gold-light/30"
            >
              আমাদের সেবা দেখুন
            </a>
          </div>
        </SectionReveal>

        {/* Trust micro-row */}
        <SectionReveal delay={0.4}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-rizqun-muted">
            {TRUST_MICRO.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-rizqun-gold" />
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>

      {/* elegant divider */}
      <div aria-hidden className="relative">
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className="block h-[30px] w-full fill-rizqun-cream-warm"
        >
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  );
}
