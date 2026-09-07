import { z } from 'zod';

// ─── Update landing content (PUT /landing-content) ──────────
//
// Singleton row (id=1). All fields optional — admin edits only
// the fields they want to change. If no row exists yet, the
// service upserts with these fields + schema defaults.

export const updateLandingContentSchema = z
  .object({
    // ── Hero ──
    heroGreeting: z.string().trim().max(100).optional(),
    heroQuestion: z.string().trim().max(150).optional(),
    // ── Neki ──
    nekiTitle: z.string().trim().max(100).optional(),
    nekiSubtitle: z.string().trim().max(200).optional(),
    nekiPercentage: z
      .number()
      .min(0, 'nekiPercentage must be >= 0')
      .max(100, 'nekiPercentage must be <= 100')
      .optional(),
    nekiMonthlyGoal: z.number().int().min(0, 'nekiMonthlyGoal must be >= 0').optional(),
    nekiCollected: z.number().int().min(0, 'nekiCollected must be >= 0').optional(),
    // ── WhatsApp ──
    whatsappNumber: z.string().trim().max(30).optional(),
    whatsappMessage: z.string().trim().max(500).optional(),
    // ── Hours ──
    openingTime: z.string().trim().max(50).optional(),
    closingTime: z.string().trim().max(50).optional(),
    // ── Founder ──
    founderMessage: z.string().trim().max(2000).optional(),
    founderName: z.string().trim().max(100).optional(),
    // ── Logo ──
    logoUrl: z.string().trim().max(500).nullable().optional(),
    // ── Section headings ──
    servicesHeading: z.string().trim().max(150).optional(),
    trustHeading: z.string().trim().max(150).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateLandingContentInput = z.infer<typeof updateLandingContentSchema>;

// ─── Create landing service (POST /landing-content/services) ──────

export const createServiceSchema = z.object({
  emoji: z.string().trim().min(1, 'emoji is required').max(10),
  title: z.string().trim().min(1, 'title is required').max(100),
  description: z.string().trim().min(1, 'description is required').max(500),
  order: z.number().int().min(0).optional(),
  imageUrl: z.string().trim().max(500).optional(),
  whatsappKey: z.string().trim().min(1).max(50).optional(),
  isActive: z.boolean().optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;

// ─── Update landing service (PATCH /landing-content/services/:id) ─

export const updateServiceSchema = z
  .object({
    emoji: z.string().trim().min(1).max(10).optional(),
    title: z.string().trim().min(1).max(100).optional(),
    description: z.string().trim().min(1).max(500).optional(),
    order: z.number().int().min(0).optional(),
    imageUrl: z.string().trim().max(500).nullable().optional(),
    whatsappKey: z.string().trim().min(1).max(50).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;

// ─── Create landing testimonial (POST /landing-content/testimonials) ──

export const createTestimonialSchema = z.object({
  name: z.string().trim().min(1, 'name is required').max(100),
  location: z.string().trim().min(1, 'location is required').max(100),
  quote: z.string().trim().min(1, 'quote is required').max(1000),
  initials: z.string().trim().min(1).max(5).optional(),
  rating: z
    .number()
    .int()
    .min(1, 'rating must be between 1 and 5')
    .max(5, 'rating must be between 1 and 5')
    .optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;

// ─── Update landing testimonial (PATCH /landing-content/testimonials/:id) ──

export const updateTestimonialSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    location: z.string().trim().min(1).max(100).optional(),
    quote: z.string().trim().min(1).max(1000).optional(),
    initials: z.string().trim().min(1).max(5).optional(),
    rating: z.number().int().min(1).max(5).optional(),
    order: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;

// ─── Public shapes ──────────────────────────────────────────────
//
// Landing content is fully public — the landing page renders it.
// Nothing is stripped; the type exists for clarity + consistency
// with the rest of the codebase (e.g. PublicCategory).

export interface PublicLandingContent {
  id: number;
  // ── Hero ──
  heroGreeting: string;
  heroQuestion: string;
  // ── Neki ──
  nekiTitle: string;
  nekiSubtitle: string;
  nekiPercentage: number;
  nekiMonthlyGoal: number;
  nekiCollected: number;
  // ── WhatsApp ──
  whatsappNumber: string;
  whatsappMessage: string;
  // ── Hours ──
  openingTime: string;
  closingTime: string;
  // ── Founder ──
  founderMessage: string;
  founderName: string;
  // ── Logo ──
  logoUrl: string | null;
  // ── Section headings ──
  servicesHeading: string;
  trustHeading: string;
  // ── Timestamps ──
  updatedAt: Date;
}

export interface PublicLandingService {
  id: number;
  order: number;
  emoji: string;
  title: string;
  description: string;
  imageUrl: string | null;
  whatsappKey: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicLandingTestimonial {
  id: number;
  order: number;
  name: string;
  location: string;
  quote: string;
  initials: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicLandingData {
  content: PublicLandingContent;
  services: PublicLandingService[];
  testimonials: PublicLandingTestimonial[];
}
