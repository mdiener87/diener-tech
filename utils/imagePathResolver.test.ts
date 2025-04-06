// Simple test for imagePathResolver utility

import { resolveImagePath } from './imagePathResolver';

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
console.log('image.jpg with context "Special Chars: @#$%" =>', resolveImagePath('image.jpg', 'Special Chars: @#$%'));

// 5. Edge cases
console.log('\nTesting edge cases:');
console.log('Empty path =>', resolveImagePath(''));
console.log('Undefined path =>', resolveImagePath(undefined as any));
console.log('test.png with empty context =>', resolveImagePath('test.png', ''));
