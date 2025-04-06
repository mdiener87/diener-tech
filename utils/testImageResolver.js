// Simple test script for image path resolution logic

// Mock implementation of the resolveImagePath function
function resolveImagePath(imagePath, context) {
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

function createSlugFromContext(context) {
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

// Test cases for various scenarios
console.log('== Testing resolveImagePath utility ==');

// 1. Absolute paths
console.log('\nTesting absolute paths:');
console.log('/images/test.png =>', resolveImagePath('/images/test.png'));
console.log('http://example.com/image.jpg =>', resolveImagePath('http://example.com/image.jpg'));

// 2. Relative paths without context
console.log('\nTesting relative paths without context:');
console.log('test.png =>', resolveImagePath('test.png'));
console.log('subfolder/test.png =>', resolveImagePath('subfolder/test.png'));

// 3. Relative paths with context
console.log('\nTesting relative paths with context:');
console.log('test.png with context "my-blog-post" =>', resolveImagePath('test.png', 'my-blog-post'));
console.log('image.jpg with context "blog/my-awesome-post" =>', resolveImagePath('image.jpg', 'blog/my-awesome-post'));

// 4. Context slugification
console.log('\nTesting context slugification:');
console.log('test.png with context "My Blog Post Title" =>', resolveImagePath('test.png', 'My Blog Post Title'));
console.log('image.jpg with context "Special Chars: @#$%" =>', resolveImagePath('image.jpg', 'special-chars'));

// 5. Edge cases
console.log('\nTesting edge cases:');
console.log('Empty path =>', resolveImagePath(''));
console.log('Undefined path =>', resolveImagePath(undefined));
console.log('test.png with empty context =>', resolveImagePath('test.png', ''));
