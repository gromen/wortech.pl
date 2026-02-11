/**
 * Google Analytics 4 tracking utilities
 */

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, string | number | boolean>
    ) => void;
    dataLayer?: Array<Record<string, any>>;
  }
}

/**
 * Send a custom event to Google Analytics 4
 * @param eventName - Name of the event (snake_case)
 * @param eventParams - Custom parameters (snake_case keys, string/number/boolean values)
 *
 * @example
 * trackEvent('contact_form_submit', { method: 'email', value: 1 })
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

/**
 * Track contact form submission (custom event to avoid GA4 Enhanced Measurement conflicts)
 * @param method - Contact method (e.g., 'email', 'phone')
 */
export function trackContactFormSubmit(method: string = 'email'): void {
  trackEvent('wortech_contact_submit', {
    method,
    form_name: 'contact_form',
  });
}

/**
 * Track when user starts filling out the contact form
 */
export function trackContactFormStart(): void {
  trackEvent('contact_form_start', {
    form_name: 'contact',
  });
}

/**
 * Track outbound link clicks
 * @param url - The destination URL
 * @param linkText - Optional text/label for the link
 */
export function trackOutboundLink(url: string, linkText?: string): void {
  trackEvent('click', {
    link_url: url,
    link_text: linkText || url,
    outbound: true,
  });
}

/**
 * Check if Google Analytics is loaded and ready
 * @returns true if gtag is available
 */
export function isGAReady(): boolean {
  return typeof window !== 'undefined' && !!window.gtag;
}
