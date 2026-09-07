import { Router } from 'express';
import {
  getPublic,
  getAdmin,
  update,
  listServices,
  createService,
  updateService,
  deleteService,
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from './landing-content.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

const router = Router();

// ── Public (no auth) — landing page fetches this ──
router.get('/', asyncHandler(getPublic));

// ── Admin (auth required) ──
router.use(authenticate);

router.get('/admin', asyncHandler(getAdmin));
router.put('/', requireRole('super_admin'), asyncHandler(update));

// Services CRUD
router.get('/services', asyncHandler(listServices));
router.post('/services', requireRole('super_admin'), asyncHandler(createService));
router.patch('/services/:id', requireRole('super_admin'), asyncHandler(updateService));
router.delete('/services/:id', requireRole('super_admin'), asyncHandler(deleteService));

// Testimonials CRUD
router.get('/testimonials', asyncHandler(listTestimonials));
router.post('/testimonials', requireRole('super_admin'), asyncHandler(createTestimonial));
router.patch('/testimonials/:id', requireRole('super_admin'), asyncHandler(updateTestimonial));
router.delete('/testimonials/:id', requireRole('super_admin'), asyncHandler(deleteTestimonial));

export default router;
