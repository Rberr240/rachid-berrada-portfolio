import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Problems } from "@/components/sections/Problems";
import { Industries } from "@/components/sections/Industries";
import { Method } from "@/components/sections/Method";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Problems />
      <Industries />
      <Method />
      <About />
      <Projects />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
