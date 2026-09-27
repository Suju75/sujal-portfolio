import { Hero } from "@/components/hero";
import { WorkGrid } from "@/components/work-grid";
import { Capabilities } from "@/components/capabilities";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Section } from "@/components/ui/section";
export default function Home() {
  return (
    <>
      <Hero />
      <Section
        id="work"
        label="SELECTED WORK"
        title="Ideas, built into reality."
        intro="Applied AI, a shipped product, and systems that support business decisions."
      >
        <WorkGrid />
      </Section>
      <Section
        id="experience"
        label="THE PATH SO FAR"
        title="Software. Data. Applied AI."
      >
        <Experience />
      </Section>
      <Section
        id="capabilities"
        label="MY TOOLKIT"
        title="The tools behind the work."
      >
        <Capabilities />
      </Section>
      <Contact />
    </>
  );
}
