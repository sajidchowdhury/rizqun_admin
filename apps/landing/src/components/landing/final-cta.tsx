import { SectionReveal } from "./section-reveal";
import { WhatsAppButton } from "./whatsapp-button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-rizqun-cream py-16 md:py-24">
      <div aria-hidden className="absolute inset-0 bg-pattern-dots opacity-50" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionReveal className="overflow-hidden rounded-[2rem] border border-rizqun-emerald/20 bg-gradient-to-br from-rizqun-emerald to-rizqun-emerald-deep px-6 py-12 text-center shadow-2xl shadow-rizqun-emerald/20 sm:px-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-rizqun-gold/20 blur-2xl"
          />

          <div className="relative">
            <h2 className="text-balance text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl">
              একটি ক্লিকেই আপনার প্রয়োজন আমাদের জানান।
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-white/85 sm:text-lg">
              কোনো অ্যাপ ডাউনলোড নেই, কোনো লগইন নেই। শুধু হোয়াটসঅ্যাপে একটি
              মেসেজ—বাকিটা আমাদের দায়িত্ব।
            </p>

            <div className="mt-8 flex justify-center">
              <WhatsAppButton
                size="lg"
                className="w-full bg-white text-rizqun-emerald-deep shadow-xl hover:bg-rizqun-cream hover:text-rizqun-emerald-deep sm:w-auto"
              >
                আজই অর্ডার করুন
              </WhatsAppButton>
            </div>

            <p className="mt-4 text-sm text-white/70">
              সকাল ৮টা — রাত ১০টা পর্যন্ত সেবা চালু
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
