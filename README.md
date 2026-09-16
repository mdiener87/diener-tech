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

This project uses `pre-commit` to strip and validate metadata in raster images
before committing them. Install Python 3 and ExifTool (`sudo apt install
libimage-exiftool-perl` on Ubuntu), then install the hook:

```bash
# Install pre-commit (Python 3 required)
pip install pre-commit
pre-commit install
```

The hook handles PNG, JPEG, WebP, GIF, AVIF, BMP, TIFF, and ICO (case insensitive).
It removes EXIF/GPS, XMP, comments, PNG text/private chunks, and user extended
attributes where supported. Required image/container fields remain. PNG-based
ICO frames are cleaned individually without re-encoding pixels; classic
uncompressed ICO bitmaps are supported too. Unrecognized metadata or unsupported
ICO bitmap layouts block the commit with an error instead of silently passing.
SVG source files are outside this raster policy.

When cleanup changes an image, pre-commit stops the commit. Review and stage the
cleaned image in GitHub Desktop, then commit again. The hook never stages files
itself. If a partially staged image causes an automatic-fix/stash conflict,
pre-commit restores your changes; clean and stage that image before retrying.
The “unstaged files detected” message itself is normal.

All entry points use the same policy:

```bash
bash scripts/dev-utils/validate-metadata.sh  # Read-only check of public/
bash scripts/dev-utils/purge-image-metadata.sh  # Clean public/ in place
pre-commit run --all-files  # Clean all tracked raster images
python3 -B -m unittest discover -s tests -p '*_test.py' -v
```

Both shell utilities accept an optional directory. The legacy `strip_metadata.sh`
delegates to the same cleaner. Extended filesystem attributes are not part of
Git blobs; the cleaner removes `user.*` and `com.apple.*` attributes locally,
while preserving security labels and ACLs. These local hooks cover new commits;
they do not clean existing Git history or enforce uploads when hooks are bypassed.

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
