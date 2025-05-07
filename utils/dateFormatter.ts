export interface DateFormatOptions {
  month?: 'long' | 'short' | 'numeric';
  year?: 'numeric' | '2-digit';
  day?: 'numeric' | '2-digit';
}

/**
 * Format a date string to a localized format, ensuring consistent UTC handling
 * @param dateString - ISO date string
 * @param options - Date formatting options
 * @returns Formatted date string
 */
export function formatDate(dateString: string, options: DateFormatOptions = {}): string {
  if (!dateString) return "";
  
  // Set to noon UTC to avoid date shifting across timezones
  const date = new Date(dateString + 'T12:00:00Z');
  
  return date.toLocaleDateString("en-US", {
    year: options.year || "numeric",
    month: options.month || "long",
    day: options.day || "numeric"
  });
}