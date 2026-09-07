"use client";

import { SectionReveal } from "./section-reveal";
import { WhatsAppButton } from "./whatsapp-button";
import { WheatMark } from "./rizqun-logo";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-rizqun-cream py-16 md:py-24">
      <div aria-hidden className="absolute inset-0 bg-pattern-dots opacity-40" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="overflow-hidden rounded-[2rem] border border-rizqun-gold/20 bg-gradient-to-br from-rizqun-espresso to-rizqun-ink-soft px-6 py-14 text-center shadow-warm-xl sm:px-12 md:py-16">
          {/* wheat watermark */}
          <WheatMark className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-rizqun-gold/[0.08]" />
          <WheatMark className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rotate-12 text-rizqun-gold/[0.06]" />

          <div className="relative">
            <WheatMark className="mx-auto h-10 w-10 text-rizqun-gold" />

            <h2
              className="mt-5 text-balance text-2xl font-bold leading-snug text-rizqun-cream sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
            >
              একটি ক্লিকেই আপনার প্রয়োজন আমাদের জানান।
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-rizqun-cream/75 sm:text-lg">
              কোনো অ্যাপ ডাউনলোড নেই, কোনো লগইন নেই। শুধু হোয়াটসঅ্যাপে একটি
              মেসেজ—বাকিটা আমাদের দায়িত্ব।
            </p>

            <div className="mt-8 flex justify-center">
              <WhatsAppButton
                size="lg"
                variant="solid"
                className="w-full bg-[#25D366] text-white hover:brightness-105 sm:w-auto"
              >
                আজই অর্ডার করুন
              </WhatsAppButton>
            </div>

            <p className="mt-4 text-sm text-rizqun-cream/60">
              সকাল ৮টা — রাত ১০টা পর্যন্ত সেবা চালু
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
