import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { HeartHandshake, Sparkles, BookOpen } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { WhatsAppButton } from "./whatsapp-button";

const NEKI_MESSAGE =
  "আসসালামু আলাইকুম, আমি 'নেকির ঝুড়ি' সম্পর্কে বিস্তারিত জানতে চাই।";

export function NekiMagic() {
  return (
    <section id="neki" className="relative scroll-mt-20 bg-rizqun-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Visual / Neki Meter */}
          <SectionReveal className="order-1 md:order-2">
            <NekiVisual />
          </SectionReveal>

          {/* Copy */}
          <SectionReveal className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-rizqun-gold-light/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-rizqun-gold">
              <Sparkles className="h-3.5 w-3.5" />
              নেকির ঝুড়ি
            </span>
            <h2 className="mt-4 text-balance text-2xl font-bold leading-snug text-rizqun-ink sm:text-3xl md:text-4xl">
              রিজকুন শুধু একটি ডেলিভারি সার্ভিস নয়।
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-rizqun-muted sm:text-lg">
              আপনার প্রতিটি কেনাকাটা থেকে নির্দিষ্ট পারসেন্টেজ সরাসরি{" "}
              <span className="font-semibold text-rizqun-gold">
                ‘নেকির ঝুড়ি’
              </span>{" "}
              ফান্ডে যায়। দুনিয়ার আসবাবকে কাজে লাগিয়ে আখিরাত গড়ুন—আপনার একটি
              অর্ডারে জুটে যাচ্ছে দুটি কাজ: পরিবারের প্রয়োজন আর আলেমদের খেদমত।
            </p>

            <div className="mt-7 space-y-3">
              <NekiMeter />
              <p className="text-sm text-rizqun-muted">
                প্রতিটি অর্ডার থেকে একটি অংশ স্বয়ংক্রিয়ভাবে আলেম ও মাদ্রাসা
                খেদমতে বরাদ্দ হয়।
              </p>
            </div>

            <div className="mt-7">
              <WhatsAppButton variant="gold" message={NEKI_MESSAGE}>
                বিস্তারিত জানুন
              </WhatsAppButton>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function NekiVisual() {
  return (
    <div className="relative">
      {/* image with fallback */}
      <div className="relative overflow-hidden rounded-[2rem] border border-rizqun-gold-light bg-gradient-to-br from-rizqun-gold-light/40 to-rizqun-cream shadow-xl">
        <img
          src="/neki-basket.png"
          alt="একটি ঝুড়ির অংশ আলেমদের খেদমতে — নেকির ঝুড়ি"
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-7xl">🤲</span>
        </div>
      </div>

      {/* flow chips under image */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <FlowChip icon="🧺" label="আপনার অর্ডার" />
        <FlowChip icon="➗" label="একটি অংশ বরাদ্দ" accent />
        <FlowChip icon="🕌" label="আলেমদের খেদমত" />
      </div>
    </div>
  );
}

function FlowChip({
  icon,
  label,
  accent,
}: {
  icon: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "rounded-xl border px-2 py-3 " +
        (accent
          ? "border-rizqun-gold/30 bg-rizqun-gold-light/50"
          : "border-rizqun-emerald/15 bg-white/70")
      }
    >
      <div className="text-xl" aria-hidden>
        {icon}
      </div>
      <div className="mt-1 text-[11px] font-medium leading-tight text-rizqun-ink/80">
        {label}
      </div>
    </div>
  );
}

function NekiMeter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const pct = 5; // 5% of each order goes to the neki fund

  return (
    <div ref={ref} className="rounded-2xl border border-rizqun-gold/20 bg-white/70 p-4">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-medium text-rizqun-ink">
          <BookOpen className="h-4 w-4 text-rizqun-gold" />
          নেকির ঝুড়ি ফান্ড
        </span>
        <span className="font-bold text-rizqun-gold">{pct}%</span>
      </div>
      <div
        className="relative h-3 w-full overflow-hidden rounded-full bg-rizqun-gold-light/60"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="নেকির ঝুড়ি ফান্ড অগ্রগতি"
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rizqun-gold to-amber-400"
          initial={{ width: reduce ? "5%" : "0%" }}
          animate={{ width: inView || reduce ? "5%" : "0%" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-rizqun-muted">
        <HeartHandshake className="h-3.5 w-3.5 text-rizqun-emerald" />
        প্রতিটি অর্ডারের {pct}% সরাসরি খেদমতে
      </div>
    </div>
  );
}
