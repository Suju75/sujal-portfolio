"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Arrow } from "./icons";

const screens = [
  {
    name: "Revenue & renewals",
    src: "/images/gym-owner-revenue.png",
    alt: "Gym OS owner dashboard showing monthly revenue, overdue memberships, upcoming renewals, revenue per active member, and revenue by plan",
  },
  {
    name: "Membership health",
    src: "/images/gym-owner-membership.png",
    alt: "Gym OS owner dashboard showing the floor-traffic history state, expired-member renewal alert, and membership breakdown by active, expired, suspended, pending, and frozen status",
  },
];

export function GymShowcase({ expanded = false }: { expanded?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];

  function openScreen(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }

  return (
    <div className={`gym-showcase${expanded ? " gym-showcase-expanded" : ""}`}>
      <p className="eyebrow accent-mint">THE OWNER’S VIEW</p>
      <div className="gym-screens">
        {screens.map((item, index) => (
          <figure key={item.src} className="gym-screen">
            <button
              type="button"
              onClick={() => openScreen(index)}
              aria-label={`Enlarge Gym Buddy ${item.name} screenshot`}
              aria-haspopup="dialog"
              className="gym-screen-preview"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={1206}
                height={2622}
                sizes={
                  expanded
                    ? "(max-width:560px) 40vw, 270px"
                    : "(max-width:560px) 40vw, 210px"
                }
              />
              <span className="gym-screen-zoom" aria-hidden="true">
                <Arrow diagonal />
              </span>
            </button>
            <figcaption>
              <span>{item.name}</span>
              <button
                type="button"
                onClick={() => openScreen(index)}
                aria-label={`View ${item.name} at full size`}
              >
                Enlarge <Arrow diagonal />
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="gym-screenshot-note">
        Owner dashboard · revenue, renewals & membership health
      </p>
      <dialog
        ref={dialog}
        className="gym-lightbox"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="gym-lightbox-content">
          <div className="gym-lightbox-heading">
            <h2 id={titleId}>Gym Buddy · {screen.name}</h2>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              aria-label="Close screenshot"
            >
              Close ×
            </button>
          </div>
          <Image
            src={screen.src}
            alt={screen.alt}
            width={1206}
            height={2622}
            sizes="(max-width:560px) 90vw, 440px"
          />
          <a
            className="text-link"
            href={screen.src}
            target="_blank"
            rel="noreferrer"
          >
            Open original image <Arrow diagonal />
          </a>
        </div>
      </dialog>
    </div>
  );
}
