import { ArrowLeft } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { useLandingContent, useServiceWaLink } from "@/lib/landing-content";

export function Services() {
  const { data } = useLandingContent();
  const getServiceLink = useServiceWaLink();
  const { content, services } = data;

  return (
    <section
      id="services"
      className="scroll-mt-20 bg-rizqun-cream-warm py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="font-serif text-sm font-medium uppercase tracking-luxe text-rizqun-gold-deep">
            আমাদের সেবাসমূহ
          </span>
          <h2
            className="mt-3 text-balance text-2xl font-bold leading-snug text-rizqun-ink sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
          >
            {content.servicesHeading}
          </h2>
          <p className="mt-4 text-pretty text-base text-rizqun-muted sm:text-lg">
            আমরা বিশ্বস্তভাবে আপনার দরজায় পৌঁছে দেব। দাম বা ক্যাটালগ নিয়ে বিরক্ত
            হবেন না—শুধু হোয়াটসঅ্যাপে লিখে জানান।
          </p>
        </SectionReveal>

        {/* photo-card grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <SectionReveal key={s.id} delay={i * 0.06} as="article">
              <a
                href={getServiceLink(s.whatsappKey)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rizqun-border bg-rizqun-paper shadow-warm transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg"
              >
                {/* photo top */}
                <div className="relative aspect-[16/10] overflow-hidden bg-rizqun-gold-light/30">
                  {s.imageUrl && (
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  {/* fallback emoji */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">{s.emoji}</span>
                  </div>
                  {/* emoji badge over photo */}
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rizqun-paper/95 text-xl shadow-warm backdrop-blur">
                    {s.emoji}
                  </div>
                </div>

                {/* text bottom */}
                <div className="flex flex-1 flex-col p-5">
                  <h3
                    className="text-lg font-bold text-rizqun-ink"
                    style={{
                      fontFamily: "var(--font-hind-siliguri), sans-serif",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-rizqun-muted">
                    {s.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rizqun-gold-deep transition-all group-hover:gap-2">
                    বিস্তারিত দেখুন
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </span>
                </div>
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
