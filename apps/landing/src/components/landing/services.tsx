import { Leaf, Pill, Wrench, Ambulance, ArrowLeft } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { waLinks } from "@/lib/whatsapp";

type Service = {
  icon: typeof Leaf;
  emoji: string;
  title: string;
  desc: string;
  link: string;
  accent: string;
};

const SERVICES: Service[] = [
  {
    icon: Leaf,
    emoji: "🥬",
    title: "গ্রোসারি ও কাঁচাবাজার",
    desc: "তাজা শাকসবজি, পরিষ্কার মুদির প্যাকেজ ও নিত্যপ্রয়োজনীয় পণ্য।",
    link: waLinks.grocery,
    accent: "from-emerald-50 to-emerald-100/40",
  },
  {
    icon: Pill,
    emoji: "💊",
    title: "মেডিসিন",
    desc: "প্রেসক্রিপশন অনুযায়ী ওষুধ, ফার্মেসি থেকে যাচাই করে ডেলিভারি।",
    link: waLinks.medicine,
    accent: "from-teal-50 to-emerald-100/40",
  },
  {
    icon: Wrench,
    emoji: "🔧",
    title: "হোম সার্ভিস ও ইলেকট্রিক সাপোর্ট",
    desc: "ইলেকট্রিশিয়ান, প্লাম্বার ও ঘরোয়া মেরামত সেবা — বিশ্বস্ত কর্মী।",
    link: waLinks.home,
    accent: "from-amber-50 to-yellow-100/40",
  },
  {
    icon: Ambulance,
    emoji: "🚑",
    title: "জরুরি সেবা (এম্বুলেন্স ও ব্লাড)",
    desc: "এম্বুলেন্স ও রক্তের প্রয়োজনে দ্রুত সহায়তা — যখন সবচেয়ে দরকার।",
    link: waLinks.emergency,
    accent: "from-rose-50 to-red-100/40",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 bg-pattern-grid bg-rizqun-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-rizqun-emerald-light/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-rizqun-emerald-deep">
            আমাদের সেবা
          </span>
          <h2 className="mt-4 text-balance text-2xl font-bold leading-snug text-rizqun-ink sm:text-3xl md:text-4xl">
            আপনার দৈনন্দিন যেকোনো প্রয়োজন
          </h2>
          <p className="mt-3 text-pretty text-base text-rizqun-muted sm:text-lg">
            আমরা বিশ্বস্তভাবে আপনার দরজায় পৌঁছে দেব। দাম বা ক্যাটালগ নিয়ে বিরক্ত
            হবেন না—শুধু হোয়াটসঅ্যাপে লিখে জানান।
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <SectionReveal key={s.title} delay={i * 0.08} as="article">
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-rizqun-emerald/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rizqun-emerald/30 hover:shadow-xl hover:shadow-rizqun-emerald/10"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-2xl`}
                  aria-hidden
                >
                  {s.emoji}
                </div>
                <h3 className="mt-4 text-lg font-bold text-rizqun-ink">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-rizqun-muted">
                  {s.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rizqun-emerald transition-transform group-hover:gap-2">
                  অর্ডার করুন
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </span>
              </a>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
