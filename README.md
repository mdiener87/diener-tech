# DienerTech

This repository contains the code for [DienerTech](https://www.diener.tech), my personal website and blog.

![DienerTech Screenshot](/public/website-screenshot.webp)

## About

DienerTech is my personal platform for sharing technical deep dives, reflections on software engineering, and creative projects. The site is built using modern web technologies, focusing on performance, accessibility, and design.

## Technologies

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [Nuxt Content](https://content.nuxtjs.org/)
- **Deployment**: Cloudflare Pages
- **Analytics**: Cloudflare Analytics

## Development Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/diener-tech.git
   cd diener-tech
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your specific configuration.

4. Start the development server:
   ```bash
   npm run dev
   ```

The site will be available at `http://localhost:3000`.

### Image Metadata Hygiene

This project uses `pre-commit` to automatically strip EXIF metadata from images before committing them:

```bash
# Install pre-commit (Python 3 required)
pip install pre-commit
pre-commit install
```

## Project Structure

- `/content/blog/` - Blog posts written in Markdown
- `/components/` - Vue components
- `/pages/` - Application pages
- `/public/` - Static assets
- `/assets/` - CSS and other processed assets

## Contributing

Contributions are welcome! This project is open-sourced to:

- Serve as a learning resource for others building personal websites
- Allow community improvements to the platform (not the content)
- Encourage best practices through collaborative development

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

**Note:** While the codebase is open-source under the MIT license, all blog content is copyrighted. See [LICENSE](LICENSE) for details.

## Deployment

The site is deployed to Cloudflare Pages. Any push to the main branch will trigger a new build and deployment.

## License

This project has a dual license:
- **Code**: MIT License
- **Content**: Copyright © 2025 Michael Diener, all rights reserved

See the [LICENSE](LICENSE) file for details.