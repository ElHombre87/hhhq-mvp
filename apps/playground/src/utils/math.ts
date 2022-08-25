
/**
 * Checks if a value is close-ish to another value within7 a precision/threshold
 * @param value value to evaluate
 * @param match target value
 * @param precision how much the (abs) value is close to target for the function
 *                  to return true
 * @returns `true` if provided value is within `precision` of `match` value
 */
export function isNearly(value: number, match: number, precision = 0.05) {
  return (match - precision) <= value && value <= (match + precision);
}

export function radToDeg(rad: number): number {
  return rad * (180 / Math.PI);
}
export function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}
