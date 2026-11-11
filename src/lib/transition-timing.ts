// Central timing configuration for the MROA Focus Shift page transition.
// Change TRANSITION_SPEED alone to adjust pacing across the entire sequence.
export const TRANSITION_SPEED = 4; // owner's final choice. 1 = fast, 2 = medium, 4 = current

const base = {
  exit: 130,
  lineDelay: 30,
  line: 200, // first sweep
  title: 150,
  uncover: 200, // second sweep
  titleOut: 90,
  group: 180,
  groupDelay: 20,
  groupStagger: 40,
  loaderDelay: 40,
  loaderTitleIn: 200,
  loaderBar: 320,
  loaderHold: 70,
  loaderTitleOut: 120,
  loaderUncover: 260,
} as const;

export const T = Object.fromEntries(
  Object.entries(base).map(([k, v]) => [k, Math.round(v * TRANSITION_SPEED)])
) as Record<keyof typeof base, number>;

