"use client";

import { ArrowLeft } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { waLinks } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Service = {
  emoji: string;
  title: string;
  desc: string;
  link: string;
};

const SERVICES: Service[] = [
  {
    emoji: "🛒",
    title: "গ্রোসারি",
    desc: "তাজা শাকসবজি, পরিষ্কার মুদির প্যাকেজ ও নিত্যপ্রয়োজনীয় পণ্য।",
    link: waLinks.grocery,
  },
  {
    emoji: "⚡",
    title: "ইলেকট্রিক",
    desc: "ইলেকট্রিশিয়ান ও ইলেকট্রিক সাপোর্ট — বিশ্বস্ত কর্মী দিয়ে।",
    link: waLinks.electric,
  },
  {
    emoji: "📱",
    title: "ইলেকট্রনিক্স",
    desc: "ইলেকট্রনিক্স পণ্য ও গ্যাজেট — যাচাই করে ডেলিভারি।",
    link: waLinks.electronics,
  },
  {
    emoji: "💊",
    title: "মেডিসিন",
    desc: "প্রেসক্রিপশন অনুযায়ী ওষুধ, ফার্মেসি থেকে যাচাই করে।",
    link: waLinks.medicine,
  },
  {
    emoji: "🩸",
    title: "ব্লাড",
    desc: "জরুরি রক্তের প্রয়োজনে দ্রুত সহায়তা — যখন সবচেয়ে দরকার।",
    link: waLinks.blood,
  },
  {
    emoji: "🚑",
    title: "এম্বুলেন্স",
    desc: "এম্বুলেন্স সেবা — নিরাপদ ও দ্রুত পরিবহন।",
    link: waLinks.ambulance,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-rizqun-cream-warm py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="font-serif text-sm font-medium uppercase tracking-luxe text-rizqun-gold-deep">
            আমাদের সেবা
          </span>
          <h2
            className="mt-3 text-balance text-2xl font-bold leading-snug text-rizqun-ink sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
          >
            আপনার দৈনন্দিন যেকোনো প্রয়োজন
          </h2>
          <p className="mt-4 text-pretty text-base text-rizqun-muted sm:text-lg">
            আমরা বিশ্বস্তভাবে আপনার দরজায় পৌঁছে দেব। দাম বা ক্যাটালগ নিয়ে বিরক্ত
            হবেন না—শুধু হোয়াটসঅ্যাপে লিখে জানান।
          </p>
        </SectionReveal>

        {/* 3×2 icon grid — clean, airy, like the reference app */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <SectionReveal key={s.title} delay={i * 0.06} as="article">
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center rounded-2xl border border-rizqun-border bg-rizqun-paper p-6 text-center shadow-warm transition-all duration-300 hover:-translate-y-1 hover:border-rizqun-gold/40 hover:shadow-warm-lg md:p-8"
              >
                {/* Icon container — large emoji in a soft circle */}
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full bg-rizqun-gold-light/40 text-3xl transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20 md:text-4xl",
                  )}
                  aria-hidden
                >
                  {s.emoji}
                </div>
                <h3
                  className="mt-5 text-lg font-bold text-rizqun-ink md:text-xl"
                  style={{
                    fontFamily: "var(--font-hind-siliguri), sans-serif",
                  }}
                >
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-rizqun-muted">
                  {s.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rizqun-gold-deep transition-all group-hover:gap-2">
                  অর্ডার করুন
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </span>
              </a>
            </SectionReveal>
          ))}
        </div>

        {/* future e-commerce note */}
        <SectionReveal delay={0.3}>
          <p className="mt-10 text-center text-sm text-rizqun-muted">
            <span className="font-serif italic">
              শীঘ্রই আসছে অনলাইন ক্যাটালগ ও চেকআউট সিস্টেম।
            </span>{" "}
            এখন পর্যন্ত সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন (H2H)।
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
