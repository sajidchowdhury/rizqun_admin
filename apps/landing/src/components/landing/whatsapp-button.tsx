import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message?: string;
  children: React.ReactNode;
  className?: ClassValue;
  variant?: "solid" | "outline" | "gold" | "ink";
  size?: "default" | "lg" | "sm";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const sizes = {
  sm: "min-h-11 px-5 text-sm",
  default: "min-h-12 px-7 text-base",
  lg: "min-h-14 px-9 text-lg",
};

const variants = {
  solid:
    "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:brightness-105 hover:shadow-xl hover:shadow-[#25D366]/30",
  outline:
    "border-2 border-rizqun-ink/20 bg-transparent text-rizqun-ink hover:border-rizqun-gold hover:bg-rizqun-gold-light/40",
  gold: "bg-rizqun-gold text-white shadow-lg shadow-rizqun-gold/25 hover:bg-rizqun-gold-deep hover:shadow-xl",
  ink: "bg-rizqun-ink text-rizqun-cream shadow-lg shadow-rizqun-ink/20 hover:bg-rizqun-ink-soft hover:shadow-xl",
};

export function WhatsAppButton({
  message,
  children,
  className,
  variant = "solid",
  size = "default",
}: WhatsAppButtonProps) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        typeof children === "string" ? children : "হোয়াটসঅ্যাপে অর্ডার করুন"
      }
      className={cn(base, sizes[size], variants[variant], className)}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      {children}
    </a>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
