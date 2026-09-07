"use client";

import { SectionReveal } from "./section-reveal";
import { WhatsAppButton } from "./whatsapp-button";
import { WheatMark, RizqunLogo } from "./rizqun-logo";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-dark-section py-16 text-rizqun-cream md:py-24">
      {/* wheat watermarks */}
      <WheatMark className="pointer-events-none absolute -right-16 top-10 h-72 w-72 text-rizqun-gold/[0.08]" />
      <WheatMark className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rotate-12 text-rizqun-gold/[0.06]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <SectionReveal>
          {/* white logo */}
          <RizqunLogo
            className="[&_*]:!text-rizqun-cream [&_.text-rizqun-gold]:!text-rizqun-gold"
            size="lg"
          />

          <div className="ornament-divider my-8">
            <Sparkle />
          </div>

          <h2
            className="text-balance text-3xl font-bold leading-snug text-rizqun-cream sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
          >
            আজই শুরু করুন!
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-rizqun-cream/70 sm:text-lg">
            আপনার পরিবারের সাথে আমাদের H2H সম্পর্কে যুক্ত হোন। একটি মেসেজেই
            শুরু হবে আমানতের যাত্রা।
          </p>

          <div className="mt-8 flex justify-center">
            <WhatsAppButton
              size="lg"
              variant="gold"
              className="w-full sm:w-auto"
            >
              আপনার অর্ডার জমা দিন
            </WhatsAppButton>
          </div>

          <p className="mt-5 text-xs text-rizqun-cream/40">
            সকাল ৮টা — রাত ১০টা পর্যন্ত সেবা চালু • লাইসেন্স নং: RL-২০২৫-৭৭৪২
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-rizqun-gold"
      aria-hidden
    >
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
    </svg>
  );
}
