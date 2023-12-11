import { screen } from './theme';

// screen params
const SM = screen.sm;
const MD = screen.md;
const LG = screen.lg;
const mLG = screen.mLg;

export const makeMediaMinWidth = (size: number) =>
  `@media (min-width: ${size}px)`;
export const makeMediaMaxWidth = (size: number) =>
  `@media (max-width: ${size}px)`;

const makeIsLessThen = (compare: number) => (width: number) => width <= compare

export default {
  min: {
    sm: makeMediaMinWidth(SM),
    md: makeMediaMinWidth(MD),
    lg: makeMediaMinWidth(LG),
    mLg: makeMediaMinWidth(mLG),
  },
  max: {
    sm: makeMediaMaxWidth(SM),
    md: makeMediaMaxWidth(MD),
    lg: makeMediaMaxWidth(LG),
  },
  isSM: makeIsLessThen(SM),
  isMD: makeIsLessThen(MD),
  isLG: makeIsLessThen(LG),
};
