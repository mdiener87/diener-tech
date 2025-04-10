# Contributing to DienerTech

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Important Note on Content vs. Code

This repository has a dual license structure:
- The **codebase** is open-source under the MIT license
- The **content** (blog posts, images, personal information, etc.) is copyrighted

Please ensure your contributions focus on the codebase, infrastructure, or documentation rather than modifying the blog content itself.

## Types of Contributions Welcome

- Bug fixes
- Performance improvements
- Accessibility enhancements
- UI/UX improvements
- Documentation updates
- New features for the platform (not content)
- Code refactoring

## Development Process

### Setting Up for Development

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a branch for your work: `git checkout -b feature/your-feature-name`
5. Run the development server: `npm run dev`

### Code Style

This project follows these conventions:
- Vue Components: Use Composition API with `<script setup>` syntax
- TypeScript: Use interfaces over types; avoid enums; use named exports
- Naming: Lowercase with dashes for directories, BEM for custom CSS classes
- Formatting: Consistent indentation (2 spaces); clear component structure
- Imports: Group imports by type (Vue, components, utils, types)

### Pull Request Process

1. Update documentation if your changes require it
2. Ensure your code follows the existing style
3. Keep pull requests focused on a single feature or fix
4. Write descriptive commit messages
5. Test your changes locally before submitting
6. Create a pull request against the `main` branch

### Commit Message Guidelines

Follow this format for commit messages:
```
type(scope): brief description

longer description if necessary
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Branch Naming

- `feature/short-description` - For new features
- `fix/short-description` - For bug fixes
- `docs/short-description` - For documentation
- `refactor/short-description` - For code refactoring

## Reporting Issues

When reporting issues, please use the appropriate template and include:

- Description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots if applicable
- Environment details (browser, OS, etc.)

## Code of Conduct

Please be respectful of other contributors and maintain a positive environment. Harassment or disrespectful behavior will not be tolerated.

## Questions?

If you have questions about contributing, please open an issue labeled "question" and I'll respond as soon as possible.

Thank you for contributing to DienerTech!