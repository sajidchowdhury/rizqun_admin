"use client";

import { Quote, Star } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { WheatMark } from "./rizqun-logo";

const TESTIMONIALS = [
  {
    quote:
      "প্রথমে সন্দেহ ছিল, কিন্তু পণ্য হাতে পেয়ে বুঝলাম—দাম ঠিক বাজারের মতো, মান অনেক ভালো। এখন প্রতি সপ্তাহে অর্ডার করি।",
    name: "আয়েশা সিদ্দিকা",
    location: "ঢাকা থেকে",
    initials: "আ",
  },
  {
    quote:
      "জরুরি মেডিসিন দরকার ছিল রাতে। আধা ঘণ্টায় পৌঁছে দিলেন। নেকির ঝুড়ির কনসেপ্টটাও দারুণ—কেনাকাটায় সওয়াবও জুটছে।",
    name: "মোহাম্মদ রফিক",
    location: "ফেনী থেকে",
    initials: "ম",
  },
  {
    quote:
      "কর্মীরা খুব বিনয়ী ও আমানতদার। মেয়াদ শেষ পণ্য কখনো দেয়নি। H2H সম্পর্কটা সত্যি অনুভব করা যায়।",
    name: "ফাতেমা খাতুন",
    location: "চট্টগ্রাম থেকে",
    initials: "ফ",
  },
];

export function Founder() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-rizqun-cream-warm py-16 md:py-24"
    >
      <WheatMark className="pointer-events-none absolute -left-20 top-10 h-64 w-64 text-rizqun-gold/[0.05]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* large centered quote */}
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <Quote
            className="mx-auto h-10 w-10 text-rizqun-gold"
            aria-hidden
            strokeWidth={1}
          />
          <p
            className="mt-6 text-balance text-xl font-medium leading-relaxed text-rizqun-ink sm:text-2xl md:text-[1.75rem] md:leading-relaxed"
            style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
          >
            আমরা চাই, আপনার পরিবারের সাথে আমাদের সম্পর্ক হোক{" "}
            <span className="text-gold">H2H (Heart to Heart)</span>। আমরা শুধু
            পণ্য দিচ্ছি না, আমরা আপনার আমানত বুকে ধরে রাখছি। আপনার বিশ্বস্ততাই
            আমাদের আখিরাতের সওয়াবের কারণ।
          </p>

          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-rizqun-gold/40 bg-rizqun-gold/10 text-rizqun-gold">
              <WheatMark className="h-7 w-7" />
            </div>
            <p
              className="font-semibold text-rizqun-ink"
              style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
            >
              রিজকুন টিম
            </p>
            <p className="font-serif text-sm italic text-rizqun-muted">
              Heart to Heart সেবা
            </p>
          </div>
        </SectionReveal>

        {/* ornamental divider */}
        <SectionReveal delay={0.15}>
          <div className="ornament-divider my-14">
            <span className="text-xs font-medium uppercase tracking-luxe text-rizqun-muted">
              আমাদের কাস্টমারদের কথা
            </span>
          </div>
        </SectionReveal>

        {/* testimonial cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.08} as="article">
              <div className="flex h-full flex-col rounded-2xl border border-rizqun-border bg-rizqun-paper p-6 shadow-warm">
                {/* stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-rizqun-gold text-rizqun-gold"
                    />
                  ))}
                </div>
                {/* quote */}
                <p className="mt-4 flex-1 text-pretty text-sm italic leading-relaxed text-rizqun-ink/80">
                  “{t.quote}”
                </p>
                {/* author */}
                <div className="mt-5 flex items-center gap-3 border-t border-rizqun-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rizqun-gold-light/50 text-sm font-bold text-rizqun-gold-deep">
                    {t.initials}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-rizqun-ink"
                      style={{
                        fontFamily: "var(--font-hind-siliguri), sans-serif",
                      }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-rizqun-muted">{t.location}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
