import Link from "next/link";
import Image from "next/image";
import { profile, work } from "@/lib/content";
import { Arrow, GithubIcon } from "./icons";
import { Reveal } from "./ui/reveal";

function SystemSculpture() {
  return (
    <div className="system-sculpture" aria-hidden="true">
      <div className="sculpture-grid" />
      <div className="orbit orbit-one">
        <span />
      </div>
      <div className="orbit orbit-two">
        <span />
      </div>
      <div className="orbit orbit-three">
        <span />
      </div>
      <div className="system-core">
        <span>input → insight</span>
        <strong>AI</strong>
        <span>built on evidence</span>
      </div>
      <span className="orbit-label label-data">
        DATA<span>SQL · retrieval</span>
      </span>
      <span className="orbit-label label-ai">
        INTELLIGENCE<span>LLMs · evaluation</span>
      </span>
      <span className="orbit-label label-product">
        PRODUCT<span>APIs · real users</span>
      </span>
      <div className="sculpture-caption">
        <span className="status-dot" />
        Turning business questions into useful systems.
      </div>
    </div>
  );
}
export function Hero() {
  return (
    <section className="hero site-width" aria-labelledby="intro-title">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> AI SPECIALIST INTERN AT PROJXON{" "}
            <span className="hero-location">/ DALLAS, TX</span>
          </p>
          <h1 id="intro-title" className="hero-name">
            <span>Sujal</span>{" "}
            <span className="name-last">
              Jethva<span className="name-period">.</span>
            </span>
          </h1>
          <p className="hero-role">Applied AI / LLM Engineer</p>
          <p className="hero-description">
            I turn business data into AI applications people can use.
            <br className="desktop-break" /> From RAG and text-to-SQL to a
            shipped iOS product.
          </p>
          <div className="hero-actions">
            <Link href="#work" className="button button-primary">
              Explore my work <Arrow />
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="button button-outline"
            >
              View résumé <Arrow diagonal />
            </a>
          </div>
          <p className="hero-education">
            UT Dallas · M.S. Business Analytics · May 2027
          </p>
        </div>
        <Reveal className="hero-art" delay={0.1}>
          <SystemSculpture />
        </Reveal>
      </div>
      <div className="hero-proof">
        <p className="eyebrow">
          OPEN THE WORK
          <span>Code you can read. A product you can download.</span>
        </p>
        <a
          href={work[0].links[0].href}
          target="_blank"
          rel="noreferrer"
          className="proof-link proof-source"
        >
          <GithubIcon />
          <span>
            <strong>Analytics Copilot</strong>
            <small>Explore on GitHub</small>
          </span>
          <Arrow diagonal />
        </a>
        <a
          href={work[1].links[0].href}
          target="_blank"
          rel="noreferrer"
          className="proof-link proof-app"
        >
          <Image className="app-icon" src="/images/gym-os-icon.webp" alt="" width={38} height={38} />
          <span>
            <strong>The Gym Buddy OS</strong>
            <small>Download on the App Store</small>
          </span>
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
