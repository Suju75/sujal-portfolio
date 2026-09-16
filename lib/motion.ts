import type { Transition, Variants } from "framer-motion";

/** Long, decelerating ease — the whole site moves with this one curve. */
export const expo = [0.16, 1, 0.3, 1] as const;

export const base: Transition = { duration: 0.9, ease: expo };

/** Copy and headings rise into place from slightly below, never fly in. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: base },
};

export const riseSoft: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: expo } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: expo } },
};

/** Parent that walks its children in sequence. */
export const stagger = (gap = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
