import type { Request, Response } from 'express';
import {
  updateLandingContentSchema,
  createServiceSchema,
  updateServiceSchema,
  createTestimonialSchema,
  updateTestimonialSchema,
} from './landing-content.dto';
// Import the service as a namespace so the controller can export
// handler functions with the same names (e.g. `listServices`) without
// clashing with the service's `listServices` function.
import * as service from './landing-content.service';
import { sendSuccess } from '../../utils/response';
import { AppError } from '../../utils/AppError';

// ─── GET /landing-content ──────────────────────────────────────
// Public (no auth). Returns content + active services + active
// testimonials in a single payload for the landing page.
export async function getPublic(_req: Request, res: Response): Promise<void> {
  const data = await service.getFullLandingData();
  sendSuccess(res, data, 'Landing content');
}

// ─── GET /landing-content/admin ────────────────────────────────
// Auth required. Returns content + ALL services + ALL testimonials
// (including inactive ones) so the admin can manage them.
export async function getAdmin(_req: Request, res: Response): Promise<void> {
  const [content, services, testimonials] = await Promise.all([
    service.getLandingContent(),
    service.listServices(),
    service.listTestimonials(),
  ]);
  sendSuccess(res, { content, services, testimonials }, 'Admin landing content');
}

// ─── PUT /landing-content ──────────────────────────────────────
// super_admin only. Updates the singleton content row.
export async function update(req: Request, res: Response): Promise<void> {
  const parsed = updateLandingContentSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? 'Invalid input');
  }

  const content = await service.updateLandingContent(parsed.data);
  sendSuccess(res, { content }, 'Landing content updated');
}

// ─── GET /landing-content/services ─────────────────────────────
// Auth required. Returns ALL services (including inactive).
export async function listServices(_req: Request, res: Response): Promise<void> {
  const services = await service.listServices();
  sendSuccess(res, { data: services }, 'Services retrieved');
}

// ─── POST /landing-content/services ────────────────────────────
// super_admin only.
export async function createService(req: Request, res: Response): Promise<void> {
  const parsed = createServiceSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? 'Invalid input');
  }

  const created = await service.createService(parsed.data);
  sendSuccess(res, { service: created }, 'Service created', 201);
}

// ─── PATCH /landing-content/services/:id ───────────────────────
// super_admin only.
export async function updateService(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    throw new AppError(400, 'Invalid service id');
  }

  const parsed = updateServiceSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? 'Invalid input');
  }

  const updated = await service.updateService(id, parsed.data);
  sendSuccess(res, { service: updated }, 'Service updated');
}

// ─── DELETE /landing-content/services/:id ──────────────────────
// super_admin only.
export async function deleteService(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    throw new AppError(400, 'Invalid service id');
  }

  const result = await service.deleteService(id);
  sendSuccess(res, { service: result }, 'Service deleted');
}

// ─── GET /landing-content/testimonials ─────────────────────────
// Auth required. Returns ALL testimonials (including inactive).
export async function listTestimonials(_req: Request, res: Response): Promise<void> {
  const testimonials = await service.listTestimonials();
  sendSuccess(res, { data: testimonials }, 'Testimonials retrieved');
}

// ─── POST /landing-content/testimonials ────────────────────────
// super_admin only.
export async function createTestimonial(req: Request, res: Response): Promise<void> {
  const parsed = createTestimonialSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? 'Invalid input');
  }

  const created = await service.createTestimonial(parsed.data);
  sendSuccess(res, { testimonial: created }, 'Testimonial created', 201);
}

// ─── PATCH /landing-content/testimonials/:id ───────────────────
// super_admin only.
export async function updateTestimonial(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    throw new AppError(400, 'Invalid testimonial id');
  }

  const parsed = updateTestimonialSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? 'Invalid input');
  }

  const updated = await service.updateTestimonial(id, parsed.data);
  sendSuccess(res, { testimonial: updated }, 'Testimonial updated');
}

// ─── DELETE /landing-content/testimonials/:id ──────────────────
// super_admin only.
export async function deleteTestimonial(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    throw new AppError(400, 'Invalid testimonial id');
  }

  const result = await service.deleteTestimonial(id);
  sendSuccess(res, { testimonial: result }, 'Testimonial deleted');
}
