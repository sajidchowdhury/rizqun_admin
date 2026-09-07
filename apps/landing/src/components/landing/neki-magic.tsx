"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { WhatsAppButton } from "./whatsapp-button";
import { WheatMark } from "./rizqun-logo";

const NEKI_MESSAGE =
  "আসসালামু আলাইকুম, আমি 'নেকির ঝুড়ি' সম্পর্কে বিস্তারিত জানতে চাই।";

export function NekiMagic() {
  return (
    <section
      id="neki"
      className="relative scroll-mt-20 overflow-hidden bg-dark-section-gradient py-16 text-rizqun-cream md:py-24"
    >
      {/* wheat watermark */}
      <WheatMark className="pointer-events-none absolute -right-16 top-10 h-72 w-72 text-rizqun-gold/[0.08]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: circular visual + flow + progress */}
          <SectionReveal className="order-1">
            <NekiVisual />
          </SectionReveal>

          {/* Right: copy */}
          <SectionReveal className="order-2" delay={0.1}>
            {/* ornamental divider */}
            <div className="ornament-divider mb-5 justify-start">
              <Sparkles className="h-4 w-4" />
            </div>

            <span className="font-serif text-sm font-medium uppercase tracking-luxe text-rizqun-gold">
              নেকির ঝুড়ি
            </span>
            <h2
              className="mt-3 text-balance text-2xl font-bold leading-snug text-rizqun-cream sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
            >
              রিজকুন শুধু একটি ডেলিভারি সার্ভিস নয়—এটি{" "}
              <span className="text-gold">আখিরাতের পাথেয়</span>।
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-rizqun-cream/75 sm:text-lg">
              আপনার প্রতিটি কেনাকাটা থেকে নির্দিষ্ট পারসেন্টেজ সরাসরি{" "}
              <span className="font-semibold text-rizqun-gold">
                ‘নেকির ঝুড়ি’
              </span>{" "}
              ফান্ডে যায়। দুনিয়ার আসবাবকে কাজে লাগিয়ে আখিরাত গড়ুন—আপনার একটি
              অর্ডারে জুটে যাচ্ছে দুটি কাজ: পরিবারের প্রয়োজন আর আলেমদের খেদমত।
            </p>

            <p className="mt-4 text-sm text-rizqun-cream/55">
              পুনর্বিনিয়োগের অপশনও বেছে নিতে পারবেন—অথবা সরাসরি খেদমতে পাঠাতে পারবেন।
            </p>

            <div className="mt-7">
              <WhatsAppButton variant="gold" message={NEKI_MESSAGE}>
                এখনই শুরু করুন
              </WhatsAppButton>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function NekiVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const goalPct = 73; // 73% of this month's neki goal filled

  return (
    <div ref={ref} className="flex flex-col items-center gap-8">
      {/* circular spotlight with basket emoji */}
      <div className="relative">
        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-rizqun-gold/20 to-rizqun-gold-deep/20 shadow-2xl md:h-56 md:w-56">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-rizqun-gold/30 to-rizqun-gold-deep/30 md:h-48 md:w-48">
            <span className="text-6xl md:text-7xl">🧺</span>
          </div>
        </div>
        {/* small check badge */}
        <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* charity flow diagram */}
      <div className="flex items-center gap-3 text-sm">
        <span className="rounded-lg bg-white/10 px-3 py-1.5 font-medium">
          🛒 কেনাকাটা
        </span>
        <ArrowRight className="h-4 w-4 text-rizqun-gold" />
        <span className="rounded-lg bg-rizqun-gold/20 px-3 py-1.5 font-bold text-rizqun-gold">
          ৫%
        </span>
        <ArrowRight className="h-4 w-4 text-rizqun-gold" />
        <span className="rounded-lg bg-white/10 px-3 py-1.5 font-medium">
          🕌 দান
        </span>
      </div>

      {/* progress bar */}
      <div className="w-full max-w-sm">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-medium text-rizqun-cream/80">
            <Heart className="h-3.5 w-3.5 text-emerald-400" fill="currentColor" />
            এই মাসের নেকির লক্ষ্য
          </span>
          <span className="font-bold text-emerald-400">{goalPct}%</span>
        </div>
        <div
          className="progress-track h-3 w-full"
          role="progressbar"
          aria-valuenow={goalPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="এই মাসের নেকির ঝুড়ি লক্ষ্য অগ্রগতি"
        >
          <motion.div
            className="progress-fill h-full"
            initial={{ width: reduce ? `${goalPct}%` : "0%" }}
            animate={{ width: inView || reduce ? `${goalPct}%` : "0%" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <p className="mt-2 text-center text-[11px] text-rizqun-cream/50">
          এই মাসে ৳১০,০০০ লক্ষ্যের ৳৭,৩০০ সংগৃহীত হয়েছে
        </p>
      </div>
    </div>
  );
}
