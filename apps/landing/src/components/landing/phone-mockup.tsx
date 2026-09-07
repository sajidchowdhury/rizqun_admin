"use client";

import { cn } from "@/lib/utils";
import { WheatMark } from "./rizqun-logo";
import {
  Home,
  ShoppingCart,
  ClipboardList,
  User,
  Leaf,
  Zap,
  Smartphone,
  Pill,
  Droplet,
  Ambulance,
} from "lucide-react";

/**
 * Phone mockup showing a miniature app UI — the Rizqun service grid
 * inside a device frame. This is the "device-as-hero" element.
 */
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <div className={cn("phone-frame mx-auto w-full max-w-[300px]", className)}>
      <div className="flex h-[600px] flex-col bg-gradient-to-b from-rizqun-cream to-rizqun-cream-warm pt-10">
        {/* App header */}
        <div className="flex items-center justify-between px-5 pb-4">
          <div className="flex items-center gap-2">
            <WheatMark className="h-6 w-6 text-rizqun-gold" />
            <span
              className="text-lg font-bold text-rizqun-ink"
              style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
            >
              রিজকুন
            </span>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rizqun-gold-light/50">
            <span className="text-xs">🔔</span>
          </div>
        </div>

        {/* Greeting */}
        <div className="px-5 pb-4">
          <p className="text-xs text-rizqun-muted">আসসালামু আলাইকুম</p>
          <p
            className="text-sm font-semibold text-rizqun-ink"
            style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
          >
            কী দরকার আজ?
          </p>
        </div>

        {/* 2×3 service grid — matches the landing categories */}
        <div className="grid grid-cols-3 gap-2 px-4">
          <AppTile icon={Leaf} label="গ্রোসারি" color="text-emerald-600 bg-emerald-50" />
          <AppTile icon={Zap} label="ইলেকট্রিক" color="text-amber-600 bg-amber-50" />
          <AppTile icon={Smartphone} label="ইলেকট্রনিক্স" color="text-blue-600 bg-blue-50" />
          <AppTile icon={Pill} label="মেডিসিন" color="text-teal-600 bg-teal-50" />
          <AppTile icon={Droplet} label="ব্লাড" color="text-rose-600 bg-rose-50" />
          <AppTile icon={Ambulance} label="এম্বুলেন্স" color="text-red-600 bg-red-50" />
        </div>

        {/* Promo card */}
        <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-br from-rizqun-gold/15 to-rizqun-gold-light/30 p-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤲</span>
            <div>
              <p
                className="text-xs font-bold text-rizqun-gold-deep"
                style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
              >
                নেকির ঝুড়ি
              </p>
              <p className="text-[10px] text-rizqun-muted">
                প্রতিটি অর্ডারে ৫% খেদমতে
              </p>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom nav */}
        <div className="flex items-center justify-around border-t border-rizqun-border/60 bg-rizqun-paper/80 px-2 py-3 backdrop-blur">
          <NavTab icon={Home} label="হোম" active />
          <NavTab icon={ShoppingCart} label="কার্ট" />
          <NavTab icon={ClipboardList} label="অর্ডার" />
          <NavTab icon={User} label="প্রোফাইল" />
        </div>
      </div>
    </div>
  );
}

function AppTile({
  icon: Icon,
  label,
  color,
}: {
  icon: typeof Leaf;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-2.5 shadow-sm">
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          color,
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <span
        className="text-[9px] font-medium text-rizqun-ink"
        style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

function NavTab({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof Home;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <Icon
        className={cn(
          "h-5 w-5",
          active ? "text-rizqun-gold" : "text-rizqun-muted/60",
        )}
        strokeWidth={active ? 2 : 1.5}
        fill={active ? "currentColor" : "none"}
      />
      <span
        className={cn(
          "text-[8px]",
          active ? "font-semibold text-rizqun-gold" : "text-rizqun-muted/60",
        )}
        style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}
