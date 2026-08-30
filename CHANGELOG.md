# Changelog

All notable changes to this project are documented here. This project follows [Semantic Versioning](https://semver.org/); prerelease versions may still contain breaking changes.

## [0.2.0-beta.1] - 2026-08-29

First public beta for Ghost 6.

### Added

- Mixed-format cards and individual-post layouts for Essays, Notes, Links, Photos, Media, and Quotes.
- Arbitrary bundled Lucide icon names for all six post-type markers.
- Members-only, paid-member, and specific-tier feed and post gates.
- Featured-post hero with native Ghost pagination and multiple-featured-post handling.
- Paginated channel archives for every format and a chronological `/archive/` route.
- Translation-ready theme strings with an English locale.
- Skip link, labeled newsletter forms, visible keyboard focus, and an accessible mobile menu.
- GitHub Actions validation, structured beta issue forms, and a beta test checklist.

### Changed

- Untyped posts now show their first public tag, or no marker when no public tag exists.
- Blockquotes now use a neutral surface with a flat tag-color rail and rounded right corners.
- Images, featured images, embeds, subscribe controls, and Share buttons use consistent rounded corners.
- Ghost heading and body font selections now apply throughout the theme.
- Accent-dependent controls, including newsletter icons and Subscribe buttons, follow Ghost's accent color.
- The release ZIP now contains only runtime, license, route, and user documentation files.
- Correct Photo/Image metadata placement
- Essay metadata remaining in the text column
- GitHub Actions and pnpm fixes

### Fixed

- Format archives no longer stop at 100 posts.
- Featured posts are no longer omitted or duplicated across paginated homepage results.
- Protected body content is no longer rendered in locked feed cards.
- Photo and Essay metadata is positioned consistently below featured images.
- Post-type icons are optically aligned with their labels.

### Known limitations

See [docs/KNOWN_LIMITATIONS.md](docs/KNOWN_LIMITATIONS.md).
