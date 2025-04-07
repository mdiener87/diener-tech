import { resolveImagePath } from '~/utils/imagePathResolver';

/**
 * Composable for handling image path resolution in various components
 * 
 * This provides a consistent way to resolve image paths based on:
 * 1. The current route (for blog posts)
 * 2. An explicit context
 * 3. Path format (absolute or relative)
 */
export function useImagePath() {
  // Get the current route
  const route = useRoute();
  
  /**
   * Extract the blog post slug from the current route
   * @returns The blog post slug or empty string if not in a blog post
   */
  const getBlogSlugFromRoute = () => {
    // Check if this is a blog post route
    if (route.path.startsWith('/blog/')) {
      const pathParts = route.path.split('/');
      if (pathParts.length >= 3) {
        return pathParts[2]; // The blog post slug
      }
    }
    return '';
  };
  
  /**
   * Extract the blog post slug from a path
   * @param path - A path string like /blog/post-title
   * @returns The blog post slug or empty string
   */
  const getBlogSlugFromPath = (path: string) => {
    if (path && path.startsWith('/blog/')) {
      const pathParts = path.split('/');
      if (pathParts.length >= 3) {
        return pathParts[2];
      }
    }
    return '';
  };
  
  /**
   * Resolve an image path based on the current context
   * @param imagePath - The image path to resolve
   * @param context - Optional explicit context to use
   * @returns The resolved image path
   */
  const resolveImage = (imagePath: string, context?: string) => {
    // If explicit context is provided, use it
    if (context) {
      return resolveImagePath(imagePath, context);
    }
    
    // Otherwise, try to extract context from route
    const routeSlug = getBlogSlugFromRoute();
    return resolveImagePath(imagePath, routeSlug);
  };
  
  /**
   * Resolve an image path for a specific blog post
   * @param imagePath - The image path to resolve
   * @param blogPath - The blog post path
   * @returns The resolved image path
   */
  const resolveBlogImage = (imagePath: string, blogPath: string) => {
    const blogSlug = getBlogSlugFromPath(blogPath);
    return resolveImagePath(imagePath, blogSlug);
  };
  
  return {
    resolveImage,
    resolveBlogImage
  };
}
