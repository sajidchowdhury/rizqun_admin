/**
 * Landing page content types — matches the API response from /api/landing-content.
 * These mirror the Prisma models in apps/operation/api/prisma/schema.prisma.
 */

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
  updatedAt: string;
}

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

export interface LandingData {
  content: LandingContent;
  services: LandingService[];
  testimonials: LandingTestimonial[];
}
