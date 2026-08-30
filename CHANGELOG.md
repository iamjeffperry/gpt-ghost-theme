# Changelog

Notable changes are listed by release. This project follows [Semantic Versioning](https://semver.org/); beta releases may still include breaking changes.

## [0.2.0-beta.5] - 2026-08-30

### Changed

- Updated documentation

## [0.2.0-beta.4] - 2026-08-30

### Changed

- Signup-card backgrounds now use a light tint derived from the Ghost accent color instead of a fixed editor color.
- Rewrote the README and release documentation for clarity and added an AI-assisted development disclosure.

## [0.2.0-beta.3] - 2026-08-30

### Changed

- Blockquotes now use a transparent background, rounded tag-color outline, and heavier left edge.
- Newsletter email fields no longer change shape or gain a heavy outline when focused.

### Fixed

- Kept source and compiled blockquote styles consistent during ZIP builds.
- Restored the footer surface after correcting the blockquote rules.

## [0.2.0-beta.2] - 2026-08-30

### Changed

- Photo posts place metadata below a featured image.
- Essays keep metadata in the text column when a featured image is present.

### Fixed

- Corrected GitHub Actions, Node.js, and pnpm release configuration.

## [0.2.0-beta.1] - 2026-08-29

First public beta for Ghost 6.

### Added

- Mixed-format feeds and individual-post layouts for Essays, Notes, Links, Photos, Media, and Quotes.
- Featured-post presentation with native Ghost pagination.
- Configurable labels, tag colors, and bundled Lucide icons.
- Members-only, paid, and tier-specific feed and post states.
- Responsive images, media, navigation, newsletter forms, and footer.
- Paginated format archives and a chronological archive.
- Theme and ZIP validation through GScan and GitHub Actions.

### Fixed

- Prevented featured posts from being omitted or duplicated in pagination.
- Prevented protected body content from appearing in locked feed cards.

## Known limitations

See [docs/KNOWN_LIMITATIONS.md](docs/KNOWN_LIMITATIONS.md).
