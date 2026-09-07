import { Quote } from "lucide-react";
import { SectionReveal } from "./section-reveal";

export function Founder() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-rizqun-emerald-deep py-16 text-white md:py-24"
    >
      {/* decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-rizqun-emerald/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-rizqun-gold/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionReveal>
          <Quote className="mx-auto h-10 w-10 text-rizqun-gold" aria-hidden />
          <p className="mt-6 text-balance text-xl font-medium leading-relaxed sm:text-2xl md:text-[1.7rem] md:leading-relaxed">
            আমরা চাই, আপনার পরিবারের সাথে আমাদের সম্পর্ক হোক{" "}
            <span className="text-rizqun-gold">H2H (Heart to Heart)</span>।
            আমরা শুধু পণ্য দিচ্ছি না, আমরা আপনার আমানত বুকে ধরে রাখছি। আপনার
            বিশ্বস্ততাই আমাদের আখিরাতের সওয়াবের কারণ।
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rizqun-gold text-xl font-bold text-white shadow-lg">
              র
            </div>
            <div>
              <p className="font-semibold">রিজকুন টিম</p>
              <p className="text-sm text-white/70">Heart to Heart সেবা</p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
