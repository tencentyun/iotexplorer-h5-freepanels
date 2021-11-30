/**
 * Capitalize first letter of string
 * @private
 * @param  {string} - String
 * @return {string} - String with first letter capitalized
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

/**
 * Clamp position between a range
 * @param  {number} - Value to be clamped
 * @param  {number} - Minimum value in range
 * @param  {number} - Maximum value in range
 * @return {number} - Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
