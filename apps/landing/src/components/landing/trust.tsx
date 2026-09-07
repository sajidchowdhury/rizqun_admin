"use client";

import { BadgePercent, ShieldCheck, Crown, Smartphone } from "lucide-react";
import { SectionReveal } from "./section-reveal";

const POINTS = [
  {
    icon: BadgePercent,
    title: "বাজার মূল্য",
    desc: "আপনি বাজারের চেয়ে এক টাকাও বেশি দেবেন না। স্বচ্ছ ও সৎ মূল্য।",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: ShieldCheck,
    title: "যাচাই করা পণ্য",
    desc: "মেয়াদ শেষ বা ভেজাল পণ্যের কোনো সম্ভাবনা নেই। প্রতিটি পণ্য যাচাই করা।",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Crown,
    title: "আমানতদার কর্মী",
    desc: "আমাদের কর্মীরা বিনয়ী ও আমানতদার। আপনার আমানত বুকে ধরে রাখি।",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    icon: Smartphone,
    title: "হোয়াটসঅ্যাপ সাপোর্ট",
    desc: "কোনো ঝামেলা ছাড়াই সরাসরি মেসেজে অর্ডার। কোনো লগইন বা অ্যাপ নেই।",
    color: "text-blue-600 bg-blue-50",
  },
];

export function Trust() {
  return (
    <section
      id="trust"
      className="scroll-mt-20 bg-rizqun-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="font-serif text-sm font-medium uppercase tracking-luxe text-rizqun-gold-deep">
            আমানত ও পবিত্রতা
          </span>
          <h2
            className="mt-3 text-balance text-2xl font-bold leading-snug text-rizqun-ink sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
          >
            কেন রিজকুনে বিশ্বাস রাখবেন?
          </h2>
          <p className="mt-4 text-pretty text-base text-rizqun-muted sm:text-lg">
            আমরা শুধু পণ্য পৌঁছে দিই না—আপনার আমানত ও সময় রক্ষা করি।
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.07} as="article">
              <div className="flex h-full flex-col items-center rounded-2xl border border-rizqun-border bg-rizqun-paper p-7 text-center shadow-warm transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${p.color}`}
                >
                  <p.icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h3
                  className="mt-5 text-lg font-bold text-rizqun-ink"
                  style={{
                    fontFamily: "var(--font-hind-siliguri), sans-serif",
                  }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-rizqun-muted">
                  {p.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
