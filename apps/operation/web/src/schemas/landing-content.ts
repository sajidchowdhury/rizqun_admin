import { z } from 'zod';

/**
 * Landing-content form schemas — used by the service and testimonial
 * dialogs in the admin UI. The backend also validates with zod (see
 * apps/operation/api/src/modules/landing-content/landing-content.dto.ts),
 * but we re-validate on the client so the user gets immediate feedback
 * before the round-trip.
 *
 * NOTE: these schemas intentionally match the backend bounds so the
 * two never drift out of sync.
 */

// ─── Services ──────────────────────────────────────────────────────

export const SERVICE_WHATSAPP_KEYS = [
  'grocery',
  'electric',
  'electronics',
  'medicine',
  'blood',
  'ambulance',
  'general',
] as const;

// Backend createServiceSchema:
//   emoji:      string, min 1, max 10
//   title:      string, min 1, max 100
//   description: string, min 1, max 500
//   order:      int, min 0, optional
//   imageUrl:   string, max 500, optional (NO null on create)
//   whatsappKey: string, min 1, max 50, optional
//   isActive:   boolean, optional
//
// On the form we model imageUrl as `string | null` (null = "no image").
// The create hook converts null → undefined before sending so the
// backend's `optional()` (no null) accepts it. The update hook sends
// null as-is (backend update schema accepts null).
export const createServiceSchema = z.object({
  emoji: z.string().trim().min(1, 'Emoji is required').max(10, 'Max 10 characters'),
  title: z.string().trim().min(1, 'Title is required').max(100),
  description: z.string().trim().min(1, 'Description is required').max(500),
  imageUrl: z
    .string()
    .trim()
    .url('Must be a valid URL')
    .nullable()
    .or(z.literal('')),
  whatsappKey: z.string().trim().min(1, 'Select a WhatsApp key').max(50),
  order: z.coerce.number().int().min(0, 'Order must be ≥ 0').max(9999),
  isActive: z.boolean(),
});

export type CreateServiceForm = z.infer<typeof createServiceSchema>;

export type UpdateServiceForm = Partial<CreateServiceForm>;

// ─── Testimonials ─────────────────────────────────────────────────

// Backend createTestimonialSchema:
//   name:      string, min 1, max 100
//   location:  string, min 1, max 100
//   quote:     string, min 1, max 1000
//   initials:  string, min 1, max 5, optional
//   rating:    int, 1–5, optional
//   order:     int, min 0, optional
//   isActive:  boolean, optional
export const createTestimonialSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  location: z.string().trim().min(1, 'Location is required').max(100),
  quote: z.string().trim().min(1, 'Quote is required').max(1000),
  initials: z.string().trim().min(1, 'Initials are required').max(5, 'Max 5 characters'),
  rating: z.coerce.number().int().min(1, 'Min 1').max(5, 'Max 5'),
  order: z.coerce.number().int().min(0, 'Order must be ≥ 0').max(9999),
  isActive: z.boolean(),
});

export type CreateTestimonialForm = z.infer<typeof createTestimonialSchema>;

export type UpdateTestimonialForm = Partial<CreateTestimonialForm>;
