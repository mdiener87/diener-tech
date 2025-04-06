/**
 * Composable for handling content image paths, particularly for handling
 * relative paths in blog post images with nuxt-content-assets.
 */
export const useContentImage = () => {
  /**
   * Resolves an image path, handling both absolute and relative paths.
   * For relative paths in content, it constructs the correct path based on
   * where nuxt-content-assets would copy the image.
   * 
   * @param {any} doc - The content document object
   * @param {string} imageProp - The property name containing the image path (default: 'titleImage')
   * @returns {string} - The resolved image path
   */
  const resolveContentImagePath = (doc: any, imageProp: string = 'titleImage'): string => {
    // Get the image path from the document
    const imagePath = doc[imageProp];
    
    // If there's no image, return empty string
    if (!imagePath) {
      return '';
    }
    
    // If it's already an absolute path, use it as is
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    
    // If it's a relative path, we need to construct a path that works with nuxt-content-assets
    // Get the content path
    const contentPath = doc._path;
    
    // Try different possible path structures that nuxt-content-assets might be using
    
    // Option 1: The most likely path structure based on documentation
    // Extract the post slug from the path (last part of the path)
    const pathParts = contentPath.split('/');
    const slug = pathParts[pathParts.length - 1];
    
    // Construct path with the blog post slug and image name
    // For a post at /blog/return-of-the-notes with return-of-the-notes.png
    // This would create /blog/return-of-the-notes/return-of-the-notes.png
    return `${contentPath}/${imagePath}`;
  };

  return {
    resolveContentImagePath
  };
};
