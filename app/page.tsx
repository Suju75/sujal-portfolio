import { Hero } from "@/components/hero";
import { ProofStrip } from "@/components/proof-strip";
import { WorkGrid } from "@/components/work-grid";
import { Capabilities } from "@/components/capabilities";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Section } from "@/components/ui/section";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />

      <Section
        id="work"
        label="Selected work"
        title="Four systems, each built around a failure mode worth designing against."
        intro="Two are publicly verifiable — one on the App Store, one on GitHub. Where source is private, the architecture is described instead of linked, and nothing here is a mock."
      >
        <WorkGrid />
      </Section>

      <Section
        id="capabilities"
        label="Capabilities"
        title="Depth in applied AI, on top of a real analytics and engineering foundation."
        intro="Everything listed here appears in the work above or in a shipped role — the stack cross-references itself rather than standing on its own as a keyword list."
      >
        <Capabilities />
      </Section>

      <Section
        id="experience"
        label="Experience"
        title="From full-stack engineering, through analytics, into applied AI."
      >
        <Experience />
      </Section>

      <Contact />
    </>
  );
}
