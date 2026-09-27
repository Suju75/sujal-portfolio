import Image from "next/image";
import Link from "next/link";
import { work } from "@/lib/content";
import { Arrow } from "./icons";
import { WorkLinkButton } from "./work-links";
import { CopilotShowcase } from "./copilot-showcase";
import { Reveal } from "./ui/reveal";
export function WorkGrid() {
  const [copilot, gym, stock, gemini] = work;
  return (
    <div className="work-collection">
      <Reveal>
        <article className="feature-project copilot-feature">
          <div className="project-story">
            <p className="eyebrow accent-iris">FEATURED / APPLIED AI</p>
            <h3>{copilot.title}</h3>
            <p className="project-deck">
              Ask a question.
              <br />
              Follow the evidence.
            </p>
            <p className="project-description">
              An analytics assistant that routes business questions to SQL,
              document search, or both — with the results and sources attached.
            </p>
            <ul className="feature-points">
              <li>RAG + text-to-SQL routing</li>
              <li>Read-only SQL guardrails</li>
              <li>Routing and number-accuracy evaluations</li>
            </ul>
            <p className="stack-line">
              Python / FastAPI / PostgreSQL / pgvector
            </p>
            <div className="project-actions">
              <WorkLinkButton link={copilot.links[0]} />
              <Link className="text-link" href={`/work/${copilot.slug}`}>
                Read case study <Arrow />
              </Link>
            </div>
          </div>
          <CopilotShowcase />
        </article>
      </Reveal>
      <Reveal>
        <article className="feature-project gym-feature">
          <div className="gym-visual">
            <div className="phone phone-back">
              <Image
                src="/images/gym-plans.jpg"
                alt="The Gym Buddy OS app showing the demo workout plan, classes, and diet navigation"
                width={1284}
                height={2283}
                sizes="(max-width: 600px) 160px, 230px"
              />
            </div>
            <div className="phone phone-front">
              <Image
                src="/images/gym-home.jpg"
                alt="The Gym Buddy OS member home showing check-in, a demo workout, and class booking"
                width={1284}
                height={2283}
                sizes="(max-width: 600px) 180px, 250px"
              />
            </div>
            <p className="image-caption">App screenshots · demo content</p>
          </div>
          <div className="project-story">
            <p className="eyebrow accent-mint">SHIPPED / IOS PRODUCT</p>
            <h3>The Gym Buddy OS</h3>
            <p className="project-deck">
              From backend
              <br />
              to the App Store.
            </p>
            <p className="project-description">
              One gym-management product for owners, trainers, and members.
              Built across the API, mobile app, and release pipeline.
            </p>
            <ul className="feature-points">
              <li>Three roles, one connected product</li>
              <li>Per-record tenant isolation</li>
              <li>Public release on the Apple App Store</li>
            </ul>
            <p className="stack-line">
              React Native / Prisma / PostgreSQL / Docker
            </p>
            <div className="project-actions">
              <WorkLinkButton link={gym.links[0]} />
              <Link className="text-link" href={`/work/${gym.slug}`}>
                Behind the build <Arrow />
              </Link>
            </div>
            <a
              href={gym.links[1].href}
              target="_blank"
              rel="noreferrer"
              className="quiet-link"
            >
              Visit thegymbuddy.in <Arrow diagonal />
            </a>
          </div>
        </article>
      </Reveal>
      <Reveal>
        <article className="impact-project">
          <div className="impact-copy">
            <p className="eyebrow accent-mint">PROFESSIONAL IMPACT / PROJXON</p>
            <h3>Making AI adoption visible.</h3>
            <p>
              Google Workspace logs became a daily reporting pipeline, an
              executive dashboard, and a 30/60/90-day adoption plan.
            </p>
            <Link href={`/work/${gemini.slug}`} className="text-link">
              Explore the Gemini adoption system <Arrow />
            </Link>
            <small>Internal work · public architecture overview</small>
          </div>
          <div className="impact-facts">
            <div>
              <strong>29</strong>
              <span>licenses tracked</span>
            </div>
            <div>
              <strong>6</strong>
              <span>teams covered</span>
            </div>
            <p>
              Admin Reports API <span>→</span> Apps Script <span>→</span> Looker
              Studio
            </p>
          </div>
        </article>
      </Reveal>
      <Reveal>
        <article className="research-project">
          <div>
            <p className="eyebrow">RESEARCH / AGENT ORCHESTRATION</p>
            <h3>{stock.title}</h3>
            <p>
              Separate agents screen, challenge, and decide. An adversarial gate
              filters candidates before Telegram delivery.
            </p>
            <Link href={`/work/${stock.slug}`} className="text-link">
              See the architecture <Arrow />
            </Link>
          </div>
          <div className="research-flow">
            <div>
              <span>Screen</span>
              <Arrow />
              <span>Challenge</span>
              <Arrow />
              <span>Decide</span>
            </div>
            <p>Nifty 100 · Paper-trading only · Private repository</p>
          </div>
        </article>
      </Reveal>
    </div>
  );
}
