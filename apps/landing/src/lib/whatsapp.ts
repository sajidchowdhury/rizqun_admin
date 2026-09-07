/**
 * Central WhatsApp configuration for the Rizqun landing page.
 *
 * Every CTA on the page funnels visitors to the same WhatsApp number with a
 * prefilled Bengali message. Change the number here once and it updates
 * everywhere.
 *
 * In production this should match `WHATSAPP_NUMBER` in the admin API's `.env`.
 */

// NOTE: Replace with the real Rizqun business number (8801XXXXXXXXX).
export const WHATSAPP_NUMBER = "8801000000000";

const DEFAULT_MESSAGE = "আসসালামু আলাইকুম, আমি রিজকুনে অর্ডার করতে চাই";

/**
 * Build a wa.me click-to-chat URL with a prefilled message.
 * @param message - optional custom prefilled message (Bengali OK)
 */
export function waLink(message: string = DEFAULT_MESSAGE): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/** Category-specific prefilled messages for the service cards. */
export const waLinks = {
  default: waLink(),
  grocery: waLink(
    "আসসালামু আলাইকুম, আমি গ্রোসারি অর্ডার করতে চাই। আমার লিস্ট:",
  ),
  electric: waLink(
    "আসসালামু আলাইকুম, আমার ইলেকট্রিক সাপোর্ট দরকার। সমস্যা হলো:",
  ),
  electronics: waLink(
    "আসসালামু আলাইকুম, আমি ইলেকট্রনিক্স পণ্য অর্ডার করতে চাই। প্রয়োজন:",
  ),
  medicine: waLink(
    "আসসালামু আলাইকুম, আমি মেডিসিন অর্ডার করতে চাই। আমার প্রেসক্রিপশন/লিস্ট:",
  ),
  blood: waLink(
    "আসসালামু আলাইকুম, আমার জরুরি রক্ত (ব্লাড) দরকার। ব্লাড গ্রুপ ও অবস্থান:",
  ),
  ambulance: waLink(
    "আসসালামু আলাইকুম, আমার এম্বুলেন্স দরকার। অবস্থান ও গন্তব্য:",
  ),
  neki: waLink(
    "আসসালামু আলাইকুম, আমি 'নেকির ঝুড়ি' সম্পর্কে বিস্তারিত জানতে চাই।",
  ),
};
