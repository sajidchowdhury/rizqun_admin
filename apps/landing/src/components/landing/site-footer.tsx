import { Clock, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-button";
import { WheatMark } from "./rizqun-logo";
import { useLandingContent, useWaLink } from "@/lib/landing-content";

const QUICK_LINKS = [
  { href: "#neki", label: "নেকির ঝুড়ি" },
  { href: "#services", label: "আমাদের সেবা" },
  { href: "#trust", label: "কেন আমরা" },
  { href: "#about", label: "আমাদের কথা" },
];

export function SiteFooter() {
  const { data } = useLandingContent();
  const waLink = useWaLink();
  const { content, services } = data;

  const displayNumber = content.whatsappNumber.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{3,})$/,
    "+$1 $2-$3-$4",
  );

  return (
    <footer className="mt-auto bg-rizqun-espresso text-rizqun-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              {content.logoUrl ? (
                <img src={content.logoUrl} alt="রিজকুন" className="h-8 w-auto" />
              ) : (
                <WheatMark className="h-8 w-8 text-rizqun-gold" />
              )}
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
              >
                রিজকুন
              </span>
            </div>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-rizqun-cream/70">
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
            <h3 className="font-serif text-sm font-medium uppercase tracking-luxe text-rizqun-gold">
              দ্রুত লিংক
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-rizqun-cream/75 transition-colors hover:text-rizqun-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* services + contact */}
          <div>
            <h3 className="font-serif text-sm font-medium uppercase tracking-luxe text-rizqun-gold">
              সেবা ও যোগাযোগ
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
              {services.map((s) => (
                <li
                  key={s.id}
                  className="rounded-full border border-rizqun-cream/15 px-2.5 py-1 text-xs text-rizqun-cream/70"
                >
                  {s.title}
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-2.5 text-sm text-rizqun-cream/75">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-rizqun-gold" />
                <a
                  href={`tel:+${content.whatsappNumber}`}
                  className="transition-colors hover:text-rizqun-gold"
                  dir="ltr"
                >
                  {displayNumber}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-rizqun-gold" />
                {content.openingTime} — {content.closingTime}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rizqun-gold" />
                ফেনী, বাংলাদেশ
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-rizqun-cream/10 pt-6 text-center text-xs text-rizqun-cream/55 sm:flex-row sm:text-left">
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
