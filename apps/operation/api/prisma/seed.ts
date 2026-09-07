// prisma/seed.ts
// Run with: npx prisma db seed
//
// Seeds:
//   - 3 sections: Grocery, Medicine, Other
//   - 3 groups under Grocery: Cooking, Beverages, General
//   - 3 categories: Spices, Rice, Dairy (each under a group)
//   - 1 super admin user (email + password from .env)

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL ?? 'admin@rizqun.com';
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD ?? 'ChangeMeInProduction123!';
const BCRYPT_COST = 12;

async function main() {
  console.info('\n🌱 Seeding Rizqun database...\n');

  // ─── 1. Sections ────────────────────────────────────────────
  console.info('→ Seeding sections...');
  const sections = [
    { slug: 'grocery', name: 'Grocery' },
    { slug: 'medicine', name: 'Medicine' },
    { slug: 'other', name: 'Other' },
  ];
  for (const s of sections) {
    await prisma.section.upsert({
      where: { slug: s.slug },
      create: s,
      update: { name: s.name },
    });
    console.info(`   ✓ Section: ${s.name}`);
  }
  const grocerySection = await prisma.section.findUnique({ where: { slug: 'grocery' } })!;

  // ─── 2. Groups (under Grocery section) ──────────────────────
  console.info('\n→ Seeding groups...');
  const groups = [
    { slug: 'cooking', name: 'Cooking', sectionId: grocerySection.id },
    { slug: 'beverages', name: 'Beverages', sectionId: grocerySection.id },
    { slug: 'general', name: 'General', sectionId: grocerySection.id },
  ];
  for (const g of groups) {
    await prisma.group.upsert({
      where: { slug: g.slug },
      create: g,
      update: { name: g.name, sectionId: g.sectionId },
    });
    console.info(`   ✓ Group: ${g.name}`);
  }
  const cookingGroup = await prisma.group.findUnique({ where: { slug: 'cooking' } })!;

  // ─── 3. Categories (under Cooking group) ───────────────────
  console.info('\n→ Seeding categories...');
  const categories = [
    { slug: 'spices', name: 'Spices', groupId: cookingGroup.id },
    { slug: 'rice', name: 'Rice', groupId: cookingGroup.id },
    { slug: 'oil', name: 'Oil', groupId: cookingGroup.id },
  ];
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      create: c,
      update: { name: c.name, groupId: c.groupId },
    });
    console.info(`   ✓ Category: ${c.name}`);
  }

  // ─── 4. Super admin ────────────────────────────────────────
  console.info('\n→ Seeding super admin...');
  const passwordHash = await bcrypt.hash(SUPER_ADMIN_PASSWORD, BCRYPT_COST);
  const admin = await prisma.user.upsert({
    where: { email: SUPER_ADMIN_EMAIL },
    create: {
      name: 'Super Admin',
      email: SUPER_ADMIN_EMAIL,
      phone: '+880000000000',
      passwordHash,
      role: UserRole.super_admin,
      categoryAccess: ['all'],
      isActive: true,
    },
    update: {
      role: UserRole.super_admin,
      categoryAccess: ['all'],
      isActive: true,
    },
  });
  console.info(`   ✓ ${admin.email} (role: ${admin.role})`);

  // ─── 5. Landing content (singleton id=1) ───────────────────
  console.info('\n→ Seeding landing content (singleton)...');
  await prisma.landingContent.upsert({
    where: { id: 1 },
    create: { id: 1 },
    update: {},
  });
  console.info('   ✓ LandingContent (id=1)');

  // ─── 6. Landing services (the 6 categories on the landing page) ──
  console.info('\n→ Seeding landing services...');
  const landingServices = [
    {
      order: 0,
      emoji: '🛒',
      title: 'গ্রোসারি',
      description: 'তাজা শাকসবজি, পরিষ্কার মুদির প্যাকেজ ও নিত্যপ্রয়োজনীয় পণ্য—বাজার মূল্যে।',
      whatsappKey: 'grocery',
      isActive: true,
    },
    {
      order: 1,
      emoji: '⚡',
      title: 'ইলেকট্রিক',
      description: 'ইলেকট্রিশিয়ান ও ইলেকট্রিক সাপোর্ট—বিশ্বস্ত ও অভিজ্ঞ কর্মী দিয়ে।',
      whatsappKey: 'electric',
      isActive: true,
    },
    {
      order: 2,
      emoji: '📱',
      title: 'ইলেকট্রনিক্স',
      description: 'ইলেকট্রনিক্স পণ্য ও গ্যাজেট—যাচাই করে নিরাপদে ডেলিভারি।',
      whatsappKey: 'electronics',
      isActive: true,
    },
    {
      order: 3,
      emoji: '💊',
      title: 'মেডিসিন',
      description: 'প্রেসক্রিপশন অনুযায়ী ওষুধ—ফার্মেসি থেকে যাচাই করে ডেলিভারি।',
      whatsappKey: 'medicine',
      isActive: true,
    },
    {
      order: 4,
      emoji: '🩸',
      title: 'ব্লাড',
      description: 'জরুরি রক্তের প্রয়োজনে দ্রুত সহায়তা—যখন সবচেয়ে দরকার।',
      whatsappKey: 'blood',
      isActive: true,
    },
    {
      order: 5,
      emoji: '🚑',
      title: 'এম্বুলেন্স',
      description: 'এম্বুলেন্স সেবা—নিরাপদ ও দ্রুত পরিবহন, ২৪/৭ উপলব্ধ।',
      whatsappKey: 'ambulance',
      isActive: true,
    },
  ];
  // Skip duplicates so re-seeding doesn't blow up — admin edits stay intact.
  await prisma.landingService.createMany({ data: landingServices, skipDuplicates: true });
  console.info(`   ✓ ${landingServices.length} landing services`);

  // ─── 7. Landing testimonials ───────────────────────────────
  console.info('\n→ Seeding landing testimonials...');
  const landingTestimonials = [
    {
      order: 0,
      name: 'আয়েশা সিদ্দিকা',
      location: 'ঢাকা থেকে',
      quote:
        'প্রথমে সন্দেহ ছিল, কিন্তু পণ্য হাতে পেয়ে বুঝলাম—দাম ঠিক বাজারের মতো, মান অনেক ভালো। এখন প্রতি সপ্তাহে অর্ডার করি।',
      initials: 'আ',
      rating: 5,
      isActive: true,
    },
    {
      order: 1,
      name: 'মোহাম্মদ রফিক',
      location: 'ফেনী থেকে',
      quote:
        'জরুরি মেডিসিন দরকার ছিল রাতে। আধা ঘণ্টায় পৌঁছে দিলেন। নেকির ঝুড়ির কনসেপ্টটাও দারুণ—কেনাকাটায় সওয়াবও জুটছে।',
      initials: 'ম',
      rating: 5,
      isActive: true,
    },
    {
      order: 2,
      name: 'ফাতেমা খাতুন',
      location: 'চট্টগ্রাম থেকে',
      quote:
        'কর্মীরা খুব বিনয়ী ও আমানতদার। মেয়াদ শেষ পণ্য কখনো দেয়নি। H2H সম্পর্কটা সত্যি অনুভব করা যায়।',
      initials: 'ফ',
      rating: 5,
      isActive: true,
    },
  ];
  await prisma.landingTestimonial.createMany({ data: landingTestimonials, skipDuplicates: true });
  console.info(`   ✓ ${landingTestimonials.length} landing testimonials`);

  // ─── Summary ────────────────────────────────────────────────
  const sectionCount = await prisma.section.count();
  const groupCount = await prisma.group.count();
  const catCount = await prisma.category.count();
  const userCount = await prisma.user.count();
  const landingServiceCount = await prisma.landingService.count();
  const landingTestimonialCount = await prisma.landingTestimonial.count();
  console.info(
    `\n📊 Totals: ${sectionCount} sections, ${groupCount} groups, ${catCount} categories, ${userCount} user(s), ${landingServiceCount} landing services, ${landingTestimonialCount} landing testimonials`,
  );
  console.info('\n✅ Seed completed.\n');
}

main()
  .catch((err) => {
    console.error('\n❌ Seed failed:\n', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
