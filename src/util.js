/**
 * 
 * @param {Date} d 
 */
export function toISO8601String(d) {
  return d.toISOString().replace('T', ' ').replace('Z', '')
}
