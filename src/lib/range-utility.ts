/**
 * This is for making it easier to run .map() on an array of numbers
 * Credit to Josh Comeau for this idea
 */

export const range = (start: number, end?: number, step = 1) => {
  const output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  
  return output;
};
