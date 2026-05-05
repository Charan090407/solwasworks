import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SmartHome from "@/components/SmartHome";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <main className="relative bg-background text-foreground">
    <Loader />
    <Cursor />
    <SmoothScroll />
    <Nav />
    <Hero />
    <Services />
    <SmartHome />
    <Stats />
    <Process />
    <Testimonials />
    <Team />
    <Contact />
    <Footer />
  </main>
);

export default Index;
