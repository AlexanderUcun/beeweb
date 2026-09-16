import DOMPurify from 'dompurify';

/**
 * Enterprise-grade Security Utilities
 */

// Memory map for client-side rate limiting (IP/Client submission throttling)
const submissionTracker = new Map<string, number[]>();

/**
 * Sanitizes user input string using DOMPurify to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  // Clean HTML/Script tags and sanitize string
  const clean = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  return clean.trim();
}

/**
 * Validates email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates phone number format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
  return phoneRegex.test(phone.trim());
}

/**
 * Rate limiting check (e.g. max 3 form submissions per minute)
 */
export function checkRateLimit(actionKey: string = 'form_submit', maxAllowed: number = 3, windowMs: number = 60000): boolean {
  const now = Date.now();
  const timestamps = submissionTracker.get(actionKey) || [];
  
  // Filter timestamps within the current window
  const recentTimestamps = timestamps.filter((time) => now - time < windowMs);
  
  if (recentTimestamps.length >= maxAllowed) {
    return false; // Rate limit exceeded
  }

  recentTimestamps.push(now);
  submissionTracker.set(actionKey, recentTimestamps);
  return true; // Allowed
}

/**
 * Anti-Bot Honeypot validator
 * Returns true if bot detected (honeypot field filled), false if human
 */
export function isBotSubmission(honeypotValue: string): boolean {
  return honeypotValue !== undefined && honeypotValue !== null && honeypotValue.trim().length > 0;
}
