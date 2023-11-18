
export function percentageDifference(current: number, last: number) {
  return (100 * Math.abs((current - last) / ((current + last) / 2))).toFixed(0);
}