"use client";

import { Quote } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { WheatMark } from "./rizqun-logo";

export function Founder() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-rizqun-espresso py-16 text-rizqun-cream md:py-24"
    >
      {/* wheat watermark */}
      <WheatMark className="pointer-events-none absolute -right-16 top-10 h-72 w-72 text-rizqun-gold/[0.08]" />
      <WheatMark className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rotate-12 text-rizqun-gold/[0.06]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <SectionReveal>
          <Quote
            className="mx-auto h-10 w-10 text-rizqun-gold"
            aria-hidden
            strokeWidth={1}
          />
          <p
            className="mt-6 text-balance text-xl font-medium leading-relaxed sm:text-2xl md:text-[1.7rem] md:leading-relaxed"
            style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
          >
            আমরা চাই, আপনার পরিবারের সাথে আমাদের সম্পর্ক হোক{" "}
            <span className="text-rizqun-gold">H2H (Heart to Heart)</span>।
            আমরা শুধু পণ্য দিচ্ছি না, আমরা আপনার আমানত বুকে ধরে রাখছি। আপনার
            বিশ্বস্ততাই আমাদের আখিরাতের সওয়াবের কারণ।
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-rizqun-gold/40 bg-rizqun-gold/10 text-rizqun-gold">
              <WheatMark className="h-7 w-7" />
            </div>
            <div>
              <p
                className="font-semibold"
                style={{
                  fontFamily: "var(--font-hind-siliguri), sans-serif",
                }}
              >
                রিজকুন টিম
              </p>
              <p className="font-serif text-sm italic text-rizqun-cream/60">
                Heart to Heart সেবা
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
