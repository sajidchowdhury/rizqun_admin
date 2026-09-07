import { prisma } from '../../config/prisma';
import { AppError } from '../../utils/AppError';
import type {
  UpdateLandingContentInput,
  CreateServiceInput,
  UpdateServiceInput,
  CreateTestimonialInput,
  UpdateTestimonialInput,
  PublicLandingContent,
  PublicLandingService,
  PublicLandingTestimonial,
  PublicLandingData,
} from './landing-content.dto';

// ─── Helpers ────────────────────────────────────────────────────
//
// The Prisma model's @map column names are resolved automatically by
// Prisma — we always query using the camelCase field names from the
// schema and Prisma handles the snake_case ↔ camelCase translation.

function toPublicContent(c: {
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
  updatedAt: Date;
}): PublicLandingContent {
  return {
    id: c.id,
    heroGreeting: c.heroGreeting,
    heroQuestion: c.heroQuestion,
    nekiTitle: c.nekiTitle,
    nekiSubtitle: c.nekiSubtitle,
    nekiPercentage: c.nekiPercentage,
    nekiMonthlyGoal: c.nekiMonthlyGoal,
    nekiCollected: c.nekiCollected,
    whatsappNumber: c.whatsappNumber,
    whatsappMessage: c.whatsappMessage,
    openingTime: c.openingTime,
    closingTime: c.closingTime,
    founderMessage: c.founderMessage,
    founderName: c.founderName,
    logoUrl: c.logoUrl,
    servicesHeading: c.servicesHeading,
    trustHeading: c.trustHeading,
    updatedAt: c.updatedAt,
  };
}

function toPublicService(s: {
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
}): PublicLandingService {
  return {
    id: s.id,
    order: s.order,
    emoji: s.emoji,
    title: s.title,
    description: s.description,
    imageUrl: s.imageUrl,
    whatsappKey: s.whatsappKey,
    isActive: s.isActive,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  };
}

function toPublicTestimonial(t: {
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
}): PublicLandingTestimonial {
  return {
    id: t.id,
    order: t.order,
    name: t.name,
    location: t.location,
    quote: t.quote,
    initials: t.initials,
    rating: t.rating,
    isActive: t.isActive,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
}

// ─── Landing content (singleton, id=1) ─────────────────────────

/**
 * Get the singleton LandingContent row (id=1). If it does not yet
 * exist, upsert it with schema defaults (all @default values from
 * the Prisma model). All fields are public — the landing page
 * renders them directly.
 */
export async function getLandingContent(): Promise<PublicLandingContent> {
  const content = await prisma.landingContent.upsert({
    where: { id: 1 },
    create: {},
    update: {},
  });
  return toPublicContent(content);
}

/**
 * Update the singleton LandingContent row (id=1). Creates it with
 * defaults if missing, then applies the provided patch. Returns the
 * updated row.
 */
export async function updateLandingContent(
  input: UpdateLandingContentInput,
): Promise<PublicLandingContent> {
  const updated = await prisma.landingContent.upsert({
    where: { id: 1 },
    create: { id: 1, ...input },
    update: input,
  });
  return toPublicContent(updated);
}

// ─── Services CRUD ──────────────────────────────────────────────

/**
 * List ALL services (including isActive=false) ordered by `order`
 * ascending. Used by the admin panel — the public endpoint uses
 * `getFullLandingData()` instead which filters to active only.
 */
export async function listServices(): Promise<PublicLandingService[]> {
  const services = await prisma.landingService.findMany({
    orderBy: { order: 'asc' },
  });
  return services.map(toPublicService);
}

export async function createService(input: CreateServiceInput): Promise<PublicLandingService> {
  const service = await prisma.landingService.create({
    data: {
      emoji: input.emoji,
      title: input.title,
      description: input.description,
      ...(input.order !== undefined && { order: input.order }),
      ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
      ...(input.whatsappKey !== undefined && { whatsappKey: input.whatsappKey }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  });
  return toPublicService(service);
}

export async function updateService(
  id: number,
  input: UpdateServiceInput,
): Promise<PublicLandingService> {
  const existing = await prisma.landingService.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, 'Service not found');
  }

  const updated = await prisma.landingService.update({
    where: { id },
    data: {
      ...(input.emoji !== undefined && { emoji: input.emoji }),
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.order !== undefined && { order: input.order }),
      ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
      ...(input.whatsappKey !== undefined && { whatsappKey: input.whatsappKey }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  });

  return toPublicService(updated);
}

export async function deleteService(id: number): Promise<{ id: number }> {
  const existing = await prisma.landingService.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, 'Service not found');
  }

  await prisma.landingService.delete({ where: { id } });
  return { id };
}

// ─── Testimonials CRUD ──────────────────────────────────────────

/**
 * List ALL testimonials (including isActive=false) ordered by `order`
 * ascending. Used by the admin panel — the public endpoint filters
 * to active only via `getFullLandingData()`.
 */
export async function listTestimonials(): Promise<PublicLandingTestimonial[]> {
  const testimonials = await prisma.landingTestimonial.findMany({
    orderBy: { order: 'asc' },
  });
  return testimonials.map(toPublicTestimonial);
}

export async function createTestimonial(
  input: CreateTestimonialInput,
): Promise<PublicLandingTestimonial> {
  const testimonial = await prisma.landingTestimonial.create({
    data: {
      name: input.name,
      location: input.location,
      quote: input.quote,
      ...(input.initials !== undefined && { initials: input.initials }),
      ...(input.rating !== undefined && { rating: input.rating }),
      ...(input.order !== undefined && { order: input.order }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  });
  return toPublicTestimonial(testimonial);
}

export async function updateTestimonial(
  id: number,
  input: UpdateTestimonialInput,
): Promise<PublicLandingTestimonial> {
  const existing = await prisma.landingTestimonial.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, 'Testimonial not found');
  }

  const updated = await prisma.landingTestimonial.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.location !== undefined && { location: input.location }),
      ...(input.quote !== undefined && { quote: input.quote }),
      ...(input.initials !== undefined && { initials: input.initials }),
      ...(input.rating !== undefined && { rating: input.rating }),
      ...(input.order !== undefined && { order: input.order }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  });

  return toPublicTestimonial(updated);
}

export async function deleteTestimonial(id: number): Promise<{ id: number }> {
  const existing = await prisma.landingTestimonial.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(404, 'Testimonial not found');
  }

  await prisma.landingTestimonial.delete({ where: { id } });
  return { id };
}

// ─── Public combined payload ────────────────────────────────────

/**
 * Return everything the public landing page needs in one round-trip:
 *   - content (the singleton row, created on demand if missing)
 *   - services filtered to isActive=true
 *   - testimonials filtered to isActive=true
 *
 * The landing page calls GET /api/landing-content (no auth) which
 * resolves here.
 */
export async function getFullLandingData(): Promise<PublicLandingData> {
  // Use upsert so a fresh database without a seeded row still works.
  const content = await prisma.landingContent.upsert({
    where: { id: 1 },
    create: {},
    update: {},
  });

  const [services, testimonials] = await Promise.all([
    prisma.landingService.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.landingTestimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return {
    content: toPublicContent(content),
    services: services.map(toPublicService),
    testimonials: testimonials.map(toPublicTestimonial),
  };
}
