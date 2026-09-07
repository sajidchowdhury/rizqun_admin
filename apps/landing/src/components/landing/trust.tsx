import { BadgePercent, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import { SectionReveal } from "./section-reveal";

const POINTS = [
  {
    icon: BadgePercent,
    title: "বাজার মূল্য",
    desc: "আপনি বাজারের চেয়ে এক টাকাও বেশি দেবেন না। স্বচ্ছ ও সৎ মূল্য।",
  },
  {
    icon: ShieldCheck,
    title: "যাচাই করা পণ্য",
    desc: "মেয়াদ শেষ বা ভেজাল পণ্যের কোনো সম্ভাবনা নেই। প্রতিটি পণ্য যাচাই করে দেওয়া হয়।",
  },
  {
    icon: Truck,
    title: "নিরাপদ ডেলিভারি",
    desc: "আমাদের কর্মীরা আমানতদার এবং বিনয়ী। আপনার আমানত বুকে ধরে রাখি।",
  },
  {
    icon: MessageCircle,
    title: "হোয়াটসঅ্যাপ সাপোর্ট",
    desc: "কোনো ঝামেলা ছাড়াই সরাসরি মেসেজে অর্ডার। কোনো লগইন বা অ্যাপ নেই।",
  },
];

export function Trust() {
  return (
    <section id="trust" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-rizqun-emerald-light/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-rizqun-emerald-deep">
            আমানত ও পবিত্রতা
          </span>
          <h2 className="mt-4 text-balance text-2xl font-bold leading-snug text-rizqun-ink sm:text-3xl md:text-4xl">
            কেন রিজকুন?
          </h2>
          <p className="mt-3 text-pretty text-base text-rizqun-muted sm:text-lg">
            আমরা শুধু পণ্য পৌঁছে দিই না—আপনার আমানত ও সময় রক্ষা করি।
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.07} as="article">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-rizqun-emerald/10 bg-rizqun-cream/60 p-5 transition-colors hover:border-rizqun-emerald/25 hover:bg-rizqun-emerald-tint/40 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rizqun-emerald text-white shadow-sm shadow-rizqun-emerald/30">
                  <p.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-rizqun-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-rizqun-muted">
                    {p.desc}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
