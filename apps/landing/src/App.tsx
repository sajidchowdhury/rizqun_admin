import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { NekiMagic } from "@/components/landing/neki-magic";
import { Services } from "@/components/landing/services";
import { Trust } from "@/components/landing/trust";
import { Founder } from "@/components/landing/founder";
import { FinalCta } from "@/components/landing/final-cta";
import { FloatingWhatsApp } from "@/components/landing/floating-whatsapp";
import { SiteFooter } from "@/components/landing/site-footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <NekiMagic />
        <Services />
        <Trust />
        <Founder />
        <FinalCta />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
