/**
 * Date utility functions for ID card generation
 */

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Format a Date or date string to "DD MMM, YYYY" (e.g. "03 Mar, 2026")
 */
export function formatCardDate(dateInput: Date | string): string {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return String(dateInput);

  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTHS_SHORT[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

/**
 * Convert Date to YYYY-MM-DD for <input type="date">
 */
export function toInputDateFormat(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Calculate the expiry date 2 years after the given issue date
 * Matches standard ID card validity (e.g., Issue: 2026-09-24 -> Expire: 2028-09-23)
 */
export function calculateExpiryDate(issueDateStr: string, yearsToAdd = 2): string {
  if (!issueDateStr) return '';
  const issue = new Date(issueDateStr);
  if (isNaN(issue.getTime())) return '';

  const expiry = new Date(issue);
  expiry.setFullYear(expiry.getFullYear() + yearsToAdd);
  // Subtract 1 day so it ends on the eve of the 2-year anniversary (e.g. 03 Mar 2026 -> 02 Mar 2028)
  expiry.setDate(expiry.getDate() - 1);

  return toInputDateFormat(expiry);
}

/**
 * Generate a random StepSkill Bangladesh Freelancer ID
 * Format: SSB-XXXXXX
 */
export function generateFreelancerId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `SSB-${randomNum}`;
}
