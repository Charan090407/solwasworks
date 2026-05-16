import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AmbientOrbs from "@/components/AmbientOrbs";
import ParticleField from "@/components/ParticleField";

const Index = () => (
  <main className="relative bg-background text-foreground">
    {/* Global atmosphere layers — rendered below all content */}
    <AmbientOrbs />
    <ParticleField />

    <Loader />
    <Cursor />
    <SmoothScroll />
    <Nav />
    <Hero />
    <Services />
    <Stats />
    <Process />
    <Testimonials />
    <Team />
    <Contact />
    <Footer />
  </main>
);

export default Index;