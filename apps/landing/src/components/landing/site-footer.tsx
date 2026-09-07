import { Clock, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-button";
import { waLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

const QUICK_LINKS = [
  { href: "#neki", label: "নেকির ঝুড়ি" },
  { href: "#services", label: "আমাদের সেবা" },
  { href: "#trust", label: "কেন আমরা" },
  { href: "#about", label: "আমাদের কথা" },
];

const SERVICES = [
  "গ্রোসারি ও কাঁচাবাজার",
  "মেডিসিন",
  "হোম সার্ভিস",
  "জরুরি সেবা",
];

export function SiteFooter() {
  const displayNumber = WHATSAPP_NUMBER.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{3,})$/,
    "+$1 $2-$3-$4",
  );

  return (
    <footer className="mt-auto bg-rizqun-emerald-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                <span className="text-lg font-bold">র</span>
              </span>
              <span className="text-xl font-bold tracking-tight">রিজকুন</span>
            </div>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-white/70">
              ঘরে বসে হোয়াটসঅ্যাপে অর্ডার করুন। বাজার মূল্যে পবিত্র ও বিশুদ্ধ পণ্য,
              নিরাপদ ডেলিভারি—এবং প্রতিটি কেনাকাটা থেকে নেকির অংশ।
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              হোয়াটসঅ্যাপে অর্ডার
            </a>
          </div>

          {/* quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              দ্রুত লিংক
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/80 transition-colors hover:text-rizqun-gold-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* services + contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              সেবা ও যোগাযোগ
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li
                  key={s}
                  className="text-sm text-white/80"
                >
                  {s}
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-rizqun-gold-light" />
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="transition-colors hover:text-rizqun-gold-light"
                  dir="ltr"
                >
                  {displayNumber}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-rizqun-gold-light" />
                সকাল ৮টা — রাত ১০টা
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rizqun-gold-light" />
                ফেনী, বাংলাদেশ
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} রিজকুন। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rizqun-gold" />
            আমানত ও পবিত্রতার সাথে
          </p>
        </div>
      </div>
    </footer>
  );
}
