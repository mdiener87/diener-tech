export interface DateFormatOptions {
  month?: "long" | "short" | "numeric";
  year?: "numeric" | "2-digit";
  day?: "numeric" | "2-digit";
}

/** Publication dates are calendar dates, independent of the reader's timezone. */
export function formatDate(
  dateString: string,
  options: DateFormatOptions = {},
): string {
  if (!dateString) return "";
  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(dateString)
      ? `${dateString}T00:00:00Z`
      : dateString,
  );
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: options.year || "numeric",
    month: options.month || "long",
    day: options.day || "numeric",
    timeZone: "UTC",
  });
}
