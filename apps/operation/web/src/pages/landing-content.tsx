import { useState } from 'react';
import { ExternalLink, Wheat } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ServicesTab } from '@/components/landing-content/services-tab';
import { TestimonialsTab } from '@/components/landing-content/testimonials-tab';
import { useLandingContentAdmin, useUpdateLandingContent } from '@/hooks/use-landing-content';
import type { LandingContent } from '@/types/landing-content';

// Plain <textarea> styled to match the Input component. We don't have a
// textarea.tsx in components/ui/ yet — this keeps the className in one
// place so the styling stays consistent across all the content tabs.
const TEXTAREA_CLASS =
  'flex min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30';

export function LandingContentPage() {
  const { data, isLoading } = useLandingContentAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Website Content</h1>
        <p className="text-sm text-muted-foreground">ল্যান্ডিং পেজের কন্টেন্ট এডিট করুন</p>
      </div>

      {isLoading || !data ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-2xl" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <Tabs defaultValue="hero">
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="hero">Hero &amp; Logo</TabsTrigger>
            <TabsTrigger value="neki">নেকির ঝুড়ি</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="services">সেবাসমূহ</TabsTrigger>
            <TabsTrigger value="founder">রিজকুন টিম</TabsTrigger>
            <TabsTrigger value="testimonials">কাস্টমার</TabsTrigger>
            <TabsTrigger value="hours">সময়</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-4">
            <HeroTab content={data.content} />
          </TabsContent>
          <TabsContent value="neki" className="mt-4">
            <NekiTab content={data.content} />
          </TabsContent>
          <TabsContent value="whatsapp" className="mt-4">
            <WhatsappTab content={data.content} />
          </TabsContent>
          <TabsContent value="services" className="mt-4">
            <ServicesTab services={data.services} />
          </TabsContent>
          <TabsContent value="founder" className="mt-4">
            <FounderTab content={data.content} />
          </TabsContent>
          <TabsContent value="testimonials" className="mt-4">
            <TestimonialsTab testimonials={data.testimonials} />
          </TabsContent>
          <TabsContent value="hours" className="mt-4">
            <HoursTab content={data.content} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

// ─── Hero & Logo tab (items 1, 2) ─────────────────────────────────

function HeroTab({ content }: { content: LandingContent }) {
  const updateContent = useUpdateLandingContent();
  // Local form state, initialized once from the fetched content. The Tabs
  // component unmounts inactive tabs, so switching away and back remounts
  // this component and re-initializes from the latest content — no
  // useEffect sync needed (and doing so would trigger React 19's
  // set-state-in-effect warning).
  const [heroGreeting, setHeroGreeting] = useState(content.heroGreeting);
  const [heroQuestion, setHeroQuestion] = useState(content.heroQuestion);
  const [servicesHeading, setServicesHeading] = useState(content.servicesHeading);
  const [trustHeading, setTrustHeading] = useState(content.trustHeading);
  const [logoUrl, setLogoUrl] = useState(content.logoUrl ?? '');

  function handleSave() {
    updateContent.mutate({
      heroGreeting: heroGreeting.trim(),
      heroQuestion: heroQuestion.trim(),
      servicesHeading: servicesHeading.trim(),
      trustHeading: trustHeading.trim(),
      logoUrl: logoUrl.trim() === '' ? null : logoUrl.trim(),
    });
  }

  const trimmedLogo = logoUrl.trim();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero &amp; Logo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logo-url">Logo URL</Label>
          <Input
            id="logo-url"
            placeholder="https://…  (leave blank for the wheat mark)"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            disabled={updateContent.isPending}
          />
          <p className="text-xs text-muted-foreground">
            If empty, the landing page renders the default wheat-sheaf mark.
          </p>
          {/* Live preview — show the uploaded image, or the wheat mark
              placeholder that the landing uses when logoUrl is null. */}
          <div className="flex items-center gap-3 rounded-md border bg-muted/40 p-3">
            {trimmedLogo !== '' ? (
              <img
                src={trimmedLogo}
                alt="Logo preview"
                className="h-12 w-auto rounded bg-background object-contain p-1"
                onError={(e) => {
                  // Hide a broken URL so the placeholder shows through.
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-background">
                <Wheat className="size-6 text-amber-600" />
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              {trimmedLogo !== '' ? 'Custom logo (preview)' : 'Default wheat mark'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hero-greeting">Hero greeting</Label>
            <Input
              id="hero-greeting"
              placeholder="আসসালামু আলাইকুম"
              value={heroGreeting}
              onChange={(e) => setHeroGreeting(e.target.value)}
              disabled={updateContent.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-question">Hero question</Label>
            <Input
              id="hero-question"
              placeholder="কী দরকার আজ?"
              value={heroQuestion}
              onChange={(e) => setHeroQuestion(e.target.value)}
              disabled={updateContent.isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="services-heading">Services heading</Label>
          <Input
            id="services-heading"
            placeholder="আপনার দৈনন্দিন যেকোনো প্রয়োজন"
            value={servicesHeading}
            onChange={(e) => setServicesHeading(e.target.value)}
            disabled={updateContent.isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="trust-heading">Trust heading</Label>
          <Input
            id="trust-heading"
            placeholder="কেন রিজকুনে বিশ্বাস রাখবেন?"
            value={trustHeading}
            onChange={(e) => setTrustHeading(e.target.value)}
            disabled={updateContent.isPending}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateContent.isPending}>
            {updateContent.isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── নেকির ঝুড়ি tab (items 3, 5) ────────────────────────────────

function NekiTab({ content }: { content: LandingContent }) {
  const updateContent = useUpdateLandingContent();
  const [nekiTitle, setNekiTitle] = useState(content.nekiTitle);
  const [nekiSubtitle, setNekiSubtitle] = useState(content.nekiSubtitle);
  const [nekiPercentage, setNekiPercentage] = useState(content.nekiPercentage);
  const [nekiMonthlyGoal, setNekiMonthlyGoal] = useState(content.nekiMonthlyGoal);
  const [nekiCollected, setNekiCollected] = useState(content.nekiCollected);

  function handleSave() {
    updateContent.mutate({
      nekiTitle: nekiTitle.trim(),
      nekiSubtitle: nekiSubtitle.trim(),
      nekiPercentage,
      nekiMonthlyGoal,
      nekiCollected,
    });
  }

  // Live preview of the landing page's progress bar.
  const goal = Math.max(0, nekiMonthlyGoal || 0);
  const collected = Math.max(0, nekiCollected || 0);
  const progressPct = goal > 0 ? Math.min(100, Math.round((collected / goal) * 100)) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>নেকির ঝুড়ি</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="neki-title">Title</Label>
            <Input
              id="neki-title"
              placeholder="নেকির ঝুড়ি"
              value={nekiTitle}
              onChange={(e) => setNekiTitle(e.target.value)}
              disabled={updateContent.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="neki-subtitle">Subtitle</Label>
            <Input
              id="neki-subtitle"
              placeholder="প্রতিটি অর্ডারে ৫% খেদমতে"
              value={nekiSubtitle}
              onChange={(e) => setNekiSubtitle(e.target.value)}
              disabled={updateContent.isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="neki-percentage">Neki percentage (%)</Label>
          <Input
            id="neki-percentage"
            type="number"
            min={0}
            max={100}
            step={1}
            value={nekiPercentage}
            onChange={(e) => setNekiPercentage(Number(e.target.value) || 0)}
            disabled={updateContent.isPending}
          />
          <p className="text-xs text-muted-foreground">
            The percentage of each order that goes to charity. Shown on the landing as
            “৫% খেদমতে”.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="neki-goal">Monthly goal (৳ BDT)</Label>
            <Input
              id="neki-goal"
              type="number"
              min={0}
              step={1}
              value={nekiMonthlyGoal}
              onChange={(e) => setNekiMonthlyGoal(Number(e.target.value) || 0)}
              disabled={updateContent.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="neki-collected">Collected so far (৳ BDT)</Label>
            <Input
              id="neki-collected"
              type="number"
              min={0}
              step={1}
              value={nekiCollected}
              onChange={(e) => setNekiCollected(Number(e.target.value) || 0)}
              disabled={updateContent.isPending}
            />
          </div>
        </div>

        {/* Live progress preview */}
        <div className="rounded-md border bg-muted/40 p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Progress preview</span>
            <span className="text-muted-foreground">
              ৳{collected.toLocaleString()} / ৳{goal.toLocaleString()} ({progressPct}%)
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateContent.isPending}>
            {updateContent.isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── WhatsApp tab (item 4) ────────────────────────────────────────

function WhatsappTab({ content }: { content: LandingContent }) {
  const updateContent = useUpdateLandingContent();
  const [whatsappNumber, setWhatsappNumber] = useState(content.whatsappNumber);
  const [whatsappMessage, setWhatsappMessage] = useState(content.whatsappMessage);

  function handleSave() {
    updateContent.mutate({
      whatsappNumber: whatsappNumber.trim(),
      whatsappMessage: whatsappMessage.trim(),
    });
  }

  // Build the wa.me preview link the same way the landing page does.
  const trimmedNumber = whatsappNumber.trim();
  const trimmedMessage = whatsappMessage.trim();
  const waLink =
    trimmedNumber !== ''
      ? `https://wa.me/${trimmedNumber}${
          trimmedMessage !== '' ? `?text=${encodeURIComponent(trimmedMessage)}` : ''
        }`
      : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>WhatsApp</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="wa-number">WhatsApp number</Label>
          <Input
            id="wa-number"
            placeholder="8801XXXXXXXXX"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            disabled={updateContent.isPending}
          />
          <p className="text-xs text-muted-foreground">
            8801XXXXXXXXX format — country code (880) then the number, no leading + or spaces.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="wa-message">Default WhatsApp message</Label>
          <textarea
            id="wa-message"
            placeholder="আসসালামু আলাইকুম, আমি রিজকুনে অর্ডার করতে চাই"
            value={whatsappMessage}
            onChange={(e) => setWhatsappMessage(e.target.value)}
            disabled={updateContent.isPending}
            className={TEXTAREA_CLASS}
          />
          <p className="text-xs text-muted-foreground">
            This message is pre-filled when a customer taps any WhatsApp button on the landing.
          </p>
        </div>

        {/* Live wa.me link preview */}
        <div className="space-y-2 rounded-md border bg-muted/40 p-4">
          <div className="text-sm font-medium">Preview link</div>
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 break-all text-sm text-primary underline-offset-4 hover:underline"
            >
              {waLink}
              <ExternalLink className="size-3.5 shrink-0" />
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">
              Enter a number to see the wa.me link.
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateContent.isPending}>
            {updateContent.isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── রিজকুন টিম tab (item 7) ────────────────────────────────────

function FounderTab({ content }: { content: LandingContent }) {
  const updateContent = useUpdateLandingContent();
  const [founderName, setFounderName] = useState(content.founderName);
  const [founderMessage, setFounderMessage] = useState(content.founderMessage);

  function handleSave() {
    updateContent.mutate({
      founderName: founderName.trim(),
      founderMessage: founderMessage.trim(),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>রিজকুন টিম</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="founder-name">Founder / team name</Label>
          <Input
            id="founder-name"
            placeholder="রিজকুন টিম"
            value={founderName}
            onChange={(e) => setFounderName(e.target.value)}
            disabled={updateContent.isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="founder-message">Founder message</Label>
          <textarea
            id="founder-message"
            placeholder="আমরা চাই…  (the full heart-to-heart message)"
            value={founderMessage}
            onChange={(e) => setFounderMessage(e.target.value)}
            disabled={updateContent.isPending}
            className={TEXTAREA_CLASS + ' min-h-[180px]'}
          />
          <p className="text-xs text-muted-foreground">
            The heart-to-heart message shown in the founder section of the landing page.
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateContent.isPending}>
            {updateContent.isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── সময় tab (item 9) ───────────────────────────────────────────

function HoursTab({ content }: { content: LandingContent }) {
  const updateContent = useUpdateLandingContent();
  const [openingTime, setOpeningTime] = useState(content.openingTime);
  const [closingTime, setClosingTime] = useState(content.closingTime);

  function handleSave() {
    updateContent.mutate({
      openingTime: openingTime.trim(),
      closingTime: closingTime.trim(),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>সময় (Opening hours)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="opening-time">Opening time</Label>
            <Input
              id="opening-time"
              placeholder="সকাল ৮টা"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              disabled={updateContent.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="closing-time">Closing time</Label>
            <Input
              id="closing-time"
              placeholder="রাত ১০টা"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              disabled={updateContent.isPending}
            />
          </div>
        </div>

        <div className="rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
          Shown on the landing as: <span className="font-medium text-foreground">{openingTime}</span>
          {' — '}
          <span className="font-medium text-foreground">{closingTime}</span>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateContent.isPending}>
            {updateContent.isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
