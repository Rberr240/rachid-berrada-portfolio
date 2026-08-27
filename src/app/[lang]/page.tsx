import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Problems } from "@/components/sections/Problems";
import { Industries } from "@/components/sections/Industries";
import { Projects } from "@/components/sections/Projects";
import { AiAutomation } from "@/components/sections/AiAutomation";
import { Method } from "@/components/sections/Method";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { notFound } from "next/navigation";
import { getProfile, isLocale } from "@/data/profile";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { siteConfig, services, problems, industries, projects, methodSteps, testimonials, faqs, socialLinks, projectTypes, ui } =
    getProfile(lang);

  const whatsappHref = getWhatsAppLink(siteConfig.whatsappNumber, siteConfig.whatsappDefaultMessage);
  const caseStudyBasePath = lang === "en" ? "/realisations" : "/fr/realisations";

  return (
    <>
      <Hero siteConfig={siteConfig} whatsappHref={whatsappHref} copy={ui.hero} />
      <Services services={services} copy={ui.services} />
      <Problems problems={problems} copy={ui.problems} />
      <Industries industries={industries} copy={ui.industries} />
      <Projects projects={projects} copy={ui.projects} caseStudyBasePath={caseStudyBasePath} />
      <AiAutomation services={services} copy={ui.aiAutomation} />
      <Method methodSteps={methodSteps} copy={ui.method} />
      <About aboutText={siteConfig.aboutText} socialLinks={socialLinks} copy={ui.about} />
      <Testimonials testimonials={testimonials} copy={ui.testimonials} />
      <Faq faqs={faqs} copy={ui.faq} />
      <Contact
        siteConfig={siteConfig}
        whatsappHref={whatsappHref}
        copy={ui.contact}
        formCopy={ui.form}
        projectTypes={projectTypes}
      />
    </>
  );
}
