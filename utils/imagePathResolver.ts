/**
 * Resolves image paths based on context
 * 
 * For absolute paths (starting with / or http), returns the path as-is
 * For relative paths, constructs path using the context (blog post slug) as subdirectory
 * 
 * @param imagePath - The original image path
 * @param context - The context (usually blog post slug) to use as subdirectory
 * @returns The resolved image path
 */
export function resolveImagePath(imagePath: string, context?: string): string {
  // Handle undefined or empty strings
  if (!imagePath) return '';
  
  // If path starts with '/' or 'http', it's already an absolute path
  if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If no context is provided, use a default path
  if (!context) {
    // Just prepend the base path
    return `/images/blog/${imagePath}`;
  }
  
  // Create a slug from the context (usually the blog post title or path)
  const slug = createSlugFromContext(context);
  
  // Return the full constructed path
  return `/images/blog/${slug}/${imagePath}`;
}

/**
 * Creates a slug from the provided context
 * - If context is a path (contains '/'), extracts the last part
 * - Converts to lowercase, replaces spaces with hyphens, removes special chars
 * 
 * @param context - The context to slugify (blog title or path)
 * @returns A slugified version suitable for use in URLs/paths
 */
function createSlugFromContext(context: string): string {
  // If context is a path (contains '/'), extract the last part
  let slug = context;
  if (context.includes('/')) {
    const parts = context.split('/');
    // Get the last non-empty part
    for (let i = parts.length - 1; i >= 0; i--) {
      if (parts[i].trim() !== '') {
        slug = parts[i];
        break;
      }
    }
  }
  
  // If the slug is already a valid slug, return it
  // This handles cases where the context is already the blog directory name
  if (/^[a-z0-9-]+$/.test(slug)) {
    return slug;
  }
  
  // Otherwise, create a slug: lowercase, replace spaces, remove special chars
  return slug
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')             // Trim hyphens from start
    .replace(/-+$/, '');            // Trim hyphens from end
}
