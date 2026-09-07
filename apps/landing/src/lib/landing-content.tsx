import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  LandingData,
  LandingContent,
  LandingService,
  LandingTestimonial,
} from "../types/landing-content";

// ─── Hardcoded fallbacks (used if API is unreachable) ───────────

const DEFAULT_CONTENT: LandingContent = {
  id: 1,
  heroGreeting: "আসসালামু আলাইকুম",
  heroQuestion: "কী দরকার আজ?",
  nekiTitle: "নেকির ঝুড়ি",
  nekiSubtitle: "প্রতিটি অর্ডারে ৫% খেদমতে",
  nekiPercentage: 5,
  nekiMonthlyGoal: 10000,
  nekiCollected: 7300,
  whatsappNumber: "8801000000000",
  whatsappMessage: "আসসালামু আলাইকুম, আমি রিজকুনে অর্ডার করতে চাই",
  openingTime: "সকাল ৮টা",
  closingTime: "রাত ১০টা",
  founderMessage:
    "আমরা চাই, আপনার পরিবারের সাথে আমাদের সম্পর্ক হোক H2H (Heart to Heart)। আমরা শুধু পণ্য দিচ্ছি না, আমরা আপনার আমানত বুকে ধরে রাখছি। আপনার বিশ্বস্ততাই আমাদের আখিরাতের সওয়াবের কারণ।",
  founderName: "রিজকুন টিম",
  logoUrl: null,
  servicesHeading: "আপনার দৈনন্দিন যেকোনো প্রয়োজন",
  trustHeading: "কেন রিজকুনে বিশ্বাস রাখবেন?",
  updatedAt: new Date().toISOString(),
};

const DEFAULT_SERVICES: LandingService[] = [
  { id: 1, order: 0, emoji: "🛒", title: "গ্রোসারি", description: "তাজা শাকসবজি, পরিষ্কার মুদির প্যাকেজ ও নিত্যপ্রয়োজনীয় পণ্য—বাজার মূল্যে।", imageUrl: "/services/grocery.jpg", whatsappKey: "grocery", isActive: true, createdAt: "", updatedAt: "" },
  { id: 2, order: 1, emoji: "⚡", title: "ইলেকট্রিক", description: "ইলেকট্রিশিয়ান ও ইলেকট্রিক সাপোর্ট—বিশ্বস্ত ও অভিজ্ঞ কর্মী দিয়ে।", imageUrl: "/services/electric.jpg", whatsappKey: "electric", isActive: true, createdAt: "", updatedAt: "" },
  { id: 3, order: 2, emoji: "📱", title: "ইলেকট্রনিক্স", description: "ইলেকট্রনিক্স পণ্য ও গ্যাজেট—যাচাই করে নিরাপদে ডেলিভারি।", imageUrl: "/services/electronics.jpg", whatsappKey: "electronics", isActive: true, createdAt: "", updatedAt: "" },
  { id: 4, order: 3, emoji: "💊", title: "মেডিসিন", description: "প্রেসক্রিপশন অনুযায়ী ওষুধ—ফার্মেসি থেকে যাচাই করে ডেলিভারি।", imageUrl: "/services/medicine.jpg", whatsappKey: "medicine", isActive: true, createdAt: "", updatedAt: "" },
  { id: 5, order: 4, emoji: "🩸", title: "ব্লাড", description: "জরুরি রক্তের প্রয়োজনে দ্রুত সহায়তা—যখন সবচেয়ে দরকার।", imageUrl: "/services/blood.jpg", whatsappKey: "blood", isActive: true, createdAt: "", updatedAt: "" },
  { id: 6, order: 5, emoji: "🚑", title: "এম্বুলেন্স", description: "এম্বুলেন্স সেবা—নিরাপদ ও দ্রুত পরিবহন, ২৪/৭ উপলব্ধ।", imageUrl: "/services/ambulance.jpg", whatsappKey: "ambulance", isActive: true, createdAt: "", updatedAt: "" },
];

const DEFAULT_TESTIMONIALS: LandingTestimonial[] = [
  { id: 1, order: 0, name: "আয়েশা সিদ্দিকা", location: "ঢাকা থেকে", quote: "প্রথমে সন্দেহ ছিল, কিন্তু পণ্য হাতে পেয়ে বুঝলাম—দাম ঠিক বাজারের মতো, মান অনেক ভালো। এখন প্রতি সপ্তাহে অর্ডার করি।", initials: "আ", rating: 5, isActive: true, createdAt: "", updatedAt: "" },
  { id: 2, order: 1, name: "মোহাম্মদ রফিক", location: "ফেনী থেকে", quote: "জরুরি মেডিসিন দরকার ছিল রাতে। আধা ঘণ্টায় পৌঁছে দিলেন। নেকির ঝুড়ির কনসেপ্টটাও দারুণ—কেনাকাটায় সওয়াবও জুটছে।", initials: "ম", rating: 5, isActive: true, createdAt: "", updatedAt: "" },
  { id: 3, order: 2, name: "ফাতেমা খাতুন", location: "চট্টগ্রাম থেকে", quote: "কর্মীরা খুব বিনয়ী ও আমানতদার। মেয়াদ শেষ পণ্য কখনো দেয়নি। H2H সম্পর্কটা সত্যি অনুভব করা যায়।", initials: "ফ", rating: 5, isActive: true, createdAt: "", updatedAt: "" },
];

const FALLBACK_DATA: LandingData = {
  content: DEFAULT_CONTENT,
  services: DEFAULT_SERVICES,
  testimonials: DEFAULT_TESTIMONIALS,
};

// ─── API base URL ──────────────────────────────────────────────
// In production: /api/landing-content (Nginx proxies /api to Express)
// In dev: VITE_API_BASE env var or /api (Vite proxy)
const API_BASE =
  (import.meta as any).env?.VITE_API_BASE?.replace(/\/$/, "") || "/api";

// ─── Context ───────────────────────────────────────────────────

interface LandingContentContextValue {
  data: LandingData;
  isLoading: boolean;
  isLive: boolean; // true if fetched from API, false if using fallback
}

const LandingContentContext = createContext<LandingContentContextValue>({
  data: FALLBACK_DATA,
  isLoading: true,
  isLive: false,
});

// ─── Provider ──────────────────────────────────────────────────

export function LandingContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<LandingData>(FALLBACK_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchContent() {
      try {
        const res = await fetch(`${API_BASE}/landing-content`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled) return;
        if (json?.success && json?.data) {
          // Merge with fallback so missing fields use defaults
          const merged: LandingData = {
            content: { ...DEFAULT_CONTENT, ...json.data.content },
            services:
              json.data.services?.length > 0
                ? json.data.services
                : DEFAULT_SERVICES,
            testimonials:
              json.data.testimonials?.length > 0
                ? json.data.testimonials
                : DEFAULT_TESTIMONIALS,
          };
          setData(merged);
          setIsLive(true);
        }
      } catch {
        // Silent fallback — the landing always works
        if (!cancelled) setIsLive(false);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchContent();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <LandingContentContext.Provider value={{ data, isLoading, isLive }}>
      {children}
    </LandingContentContext.Provider>
  );
}

// ─── Hooks ─────────────────────────────────────────────────────

export function useLandingContent() {
  return useContext(LandingContentContext);
}

/**
 * Build a WhatsApp click-to-chat URL using the dynamic number/message
 * from the API (falling back to defaults if API is unreachable).
 */
export function useWaLink() {
  const { data } = useLandingContent();
  return (message?: string) => {
    const msg = message ?? data.content.whatsappMessage;
    return `https://wa.me/${data.content.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };
}

/** Category-specific WhatsApp messages keyed by whatsappKey */
const WHATSAPP_MESSAGES: Record<string, string> = {
  grocery: "আসসালামু আলাইকুম, আমি গ্রোসারি অর্ডার করতে চাই। আমার লিস্ট:",
  electric: "আসসালামু আলাইকুম, আমার ইলেকট্রিক সাপোর্ট দরকার। সমস্যা হলো:",
  electronics: "আসসালামু আলাইকুম, আমি ইলেকট্রনিক্স পণ্য অর্ডার করতে চাই। প্রয়োজন:",
  medicine: "আসসালামু আলাইকুম, আমি মেডিসিন অর্ডার করতে চাই। আমার প্রেসক্রিপশন/লিস্ট:",
  blood: "আসসালামু আলাইকুম, আমার জরুরি রক্ত (ব্লাড) দরকার। ব্লাড গ্রুপ ও অবস্থান:",
  ambulance: "আসসালামু আলাইকুম, আমার এম্বুলেন্স দরকার। অবস্থান ও গন্তব্য:",
  neki: "আসসালামু আলাইকুম, আমি 'নেকির ঝুড়ি' সম্পর্কে বিস্তারিত জানতে চাই।",
};

/** Build a WhatsApp link for a specific service category */
export function useServiceWaLink() {
  const { data } = useLandingContent();
  return (whatsappKey: string) => {
    const msg =
      WHATSAPP_MESSAGES[whatsappKey] ?? data.content.whatsappMessage;
    return `https://wa.me/${data.content.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };
}
