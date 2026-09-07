"use client";

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
    <section
      id="trust"
      className="scroll-mt-20 bg-rizqun-cream-warm py-16 md:py-24"
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
            কেন রিজকুন?
          </h2>
          <p className="mt-4 text-pretty text-base text-rizqun-muted sm:text-lg">
            আমরা শুধু পণ্য পৌঁছে দিই না—আপনার আমানত ও সময় রক্ষা করি।
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.07} as="article">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-rizqun-border bg-rizqun-paper p-6 shadow-warm transition-all duration-300 hover:border-rizqun-gold/30 hover:shadow-warm-lg md:p-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rizqun-gold-light/40 text-rizqun-gold-deep">
                  <p.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-rizqun-ink"
                    style={{
                      fontFamily: "var(--font-hind-siliguri), sans-serif",
                    }}
                  >
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
