/** Landing content types — mirrors backend `PublicLandingContent`,
 * `PublicLandingService`, `PublicLandingTestimonial` (see
 * apps/operation/api/src/modules/landing-content/landing-content.dto.ts). */

// ─── Singleton content (LandingContent table, row id=1) ───────────

export interface LandingContent {
  id: number;
  heroGreeting: string;
  heroQuestion: string;
  nekiTitle: string;
  nekiSubtitle: string;
  nekiPercentage: number;
  nekiMonthlyGoal: number;
  nekiCollected: number;
  whatsappNumber: string;
  whatsappMessage: string;
  openingTime: string;
  closingTime: string;
  founderMessage: string;
  founderName: string;
  logoUrl: string | null;
  servicesHeading: string;
  trustHeading: string;
  updatedAt: string; // ISO date string
}

// ─── Services (LandingService table) ──────────────────────────────

export interface LandingService {
  id: number;
  order: number;
  emoji: string;
  title: string;
  description: string;
  imageUrl: string | null;
  whatsappKey: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Testimonials (LandingTestimonial table) ──────────────────────

export interface LandingTestimonial {
  id: number;
  order: number;
  name: string;
  location: string;
  quote: string;
  initials: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── API response envelopes ───────────────────────────────────────

export interface LandingDataResponse {
  content: LandingContent;
  services: LandingService[];
  testimonials: LandingTestimonial[];
}

export interface LandingContentResponse {
  content: LandingContent;
}

export interface LandingServiceResponse {
  service: LandingService;
}

export interface LandingTestimonialResponse {
  testimonial: LandingTestimonial;
}

// Admin GET returns the same shape as the public GET (content + services +
// testimonials), the only difference being that services/testimonials include
// inactive rows. Same type, alias for readability at call sites.
export type LandingDataAdminResponse = LandingDataResponse;

// ─── Form / mutation payload shapes ───────────────────────────────

/** PUT /landing-content — any subset of content fields except id/updatedAt. */
export type LandingContentUpdate = Partial<Omit<LandingContent, 'id' | 'updatedAt'>>;

export interface LandingServiceCreateForm {
  emoji: string;
  title: string;
  description: string;
  imageUrl: string | null;
  whatsappKey: string;
  order: number;
  isActive: boolean;
}

export type LandingServiceUpdateForm = Partial<LandingServiceCreateForm>;

export interface LandingTestimonialCreateForm {
  name: string;
  location: string;
  quote: string;
  initials: string;
  rating: number;
  order: number;
  isActive: boolean;
}

export type LandingTestimonialUpdateForm = Partial<LandingTestimonialCreateForm>;
