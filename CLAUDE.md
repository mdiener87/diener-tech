# DienerTech Project Guidelines

## Build Commands
- `npm dev` - Start development server
- `npm build` - Build for production
- `npm generate` - Generate static site
- `npm preview` - Preview production build

## Code Style
- **Vue Components**: Use Composition API with `<script setup>` syntax
- **TypeScript**: Use interfaces over types; avoid enums; use named exports
- **Naming**: Lowercase with dashes for directories, BEM for custom CSS classes
- **Formatting**: Consistent indentation (2 spaces); clear component structure
- **Imports**: Group imports by type (Vue, components, utils, types)

## Conventions
- Mobile-first responsive design with Tailwind CSS
- Functional programming patterns over classes
- Descriptive variable names with auxiliary verbs (isLoading, hasError)
- Error handling with proper try/catch for async operations
- Performance optimization via lazy loading, code splitting, and image optimization

## File Organization
- Each file should contain only related content
- Modular component design following atomic principles
- Place reusable logic in composables folder