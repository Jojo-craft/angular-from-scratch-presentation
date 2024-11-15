const max = 1300;
const min = 300;

export const randomDelayInMs = (): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
