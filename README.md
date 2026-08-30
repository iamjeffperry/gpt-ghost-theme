# GPT Ghost Theme

A mixed-format personal publishing theme for [Ghost](https://ghost.org). Publish essays, notes, links, photos, media, and quotes together in one chronological stream.

> **Public beta:** `v0.2.0-beta.4` supports Ghost 6. Test it before using it on a production publication, keep a copy of your current theme, and report reproducible problems through [GitHub Issues](https://github.com/iamjeffperry/gpt-ghost-theme/issues).

## What it includes

- Six post formats selected with Ghost internal tags
- A prominent featured post followed by the chronological feed
- Responsive images, galleries, video, audio, and embeds
- Configurable labels, tag colors, and bundled Lucide icons
- Public, members-only, paid, and tier-specific post states
- Search, comments, sharing, related posts, RSS, and Ghost Members
- Paginated archives for each format
- Responsive navigation and accessible keyboard controls

## Requirements

- Ghost 6.0 or newer
- Node.js 22.12 or newer and pnpm 11.21 for local development

## Install

1. Download `gpt-ghost-theme.zip` from the latest [GitHub release](https://github.com/iamjeffperry/gpt-ghost-theme/releases).
2. In Ghost Admin, open **Settings → Design & branding → Change theme**.
3. Upload the ZIP and activate the theme.
4. Open **Customize → Theme** to choose labels, icons, typography, and post options.
5. To enable format archives, upload the release's `routes.yaml` under **Settings → Labs → Routes**.

Ghost does not install `routes.yaml` with the theme ZIP. Review and merge it with any routes you already use.

### Update an installed theme

Upload the ZIP for the newer version and activate it. If the public site still shows an older design, confirm the version in Ghost Admin and reload the page in a new private window.

## Post formats

Add one internal tag to choose a format:

| Internal tag | Format | Use it for |
| --- | --- | --- |
| `#essay` | Essay | Articles and long-form writing |
| `#note` | Note | Short observations and title-light posts |
| `#link` | Link | External links with commentary or excerpts |
| `#photo` | Photo | Photography, illustration, and galleries |
| `#media` | Media | Video, audio, podcasts, and embeds |
| `#quote` | Quote | Quotations, attribution, and response |

Use only one internal format tag per post. Public tags remain available for topics and navigation. For compatibility, `#micro` works as a Note and `#image` works as a Photo.

Posts without a format tag use their first public tag as the visible marker. Untagged posts show no marker.

### Format notes

- **Essays** support excerpts and optional feature images.
- **Notes** display their body directly in the feed and work best when kept concise.
- **Links** use the first Ghost Bookmark, external link, or plain external URL as the destination. The title opens that destination; without one, it opens the local post.
- **Photos** can use either a Ghost feature image or Image/Gallery cards. Images are rounded and constrained to sensible display sizes.
- **Media** keeps supported Ghost media and embed cards responsive.
- **Quotes** use a transparent blockquote with a rounded outline and heavier left edge in the post or tag accent color.

## Featured posts

Use Ghost's **Feature this post** toggle. The newest featured post becomes the homepage hero. Any additional featured posts continue in the normal feed, newest first, without duplication.

## Customize the theme

Open **Ghost Admin → Settings → Design & branding → Customize → Theme**.

| Setting | What it controls |
| --- | --- |
| Site background | The page color and related neutral surfaces |
| Ghost accent color | Subscribe actions, signup-card tint, and fallback accents |
| Tag accent color | Format markers, icons, blockquotes, and related details |
| Heading and body fonts | Display and reading typography |
| Show images in feed | Global homepage image visibility |
| Format labels and icons | The name and Lucide icon used for each format |
| Post metadata | Author, date, reading time, and Share button |
| Drop caps | Optional first-letter treatment on supported posts |
| Related articles | Additional posts shown below an individual post |

Set tag colors under **Ghost Admin → Settings → Tags**. Signup cards use a light, desaturated tint derived from the Ghost accent color, even when the card has a fixed editor background.

### Icons

Each format accepts any lowercase, kebab-case name from the [Lucide icon directory](https://lucide.dev/icons/), such as `check-check`, `camera`, or `notebook-pen`.

Enter only the icon name. The Lucide sprite is bundled with the theme, so the published site does not require an icon CDN.

## Membership and protected posts

Ghost's **Post access** setting works with every format and featured posts:

- Public
- Members only
- Paid members only
- Specific tiers

Visitors without access see a safe teaser and membership prompt; protected body content is not rendered in the feed. Ghost Portal handles signup, sign-in, and plan selection.

## Archive routes

The included `routes.yaml` adds native paginated archives:

| URL | Content |
| --- | --- |
| `/essays/` | Essays |
| `/notes/` | Notes and Micro posts |
| `/links/` | Links |
| `/photos/` | Photos and Image posts |
| `/media/` | Media |
| `/quotes/` | Quotes |
| `/archive/` | All posts, newest first |

Add any archive you want readers to see under **Settings → Navigation**.

## Development

```sh
git clone --branch shareable-theme-v1 https://github.com/iamjeffperry/gpt-ghost-theme.git
cd gpt-ghost-theme
corepack enable
pnpm install
```

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Watch assets and run LiveReload |
| `pnpm build` | Build production CSS and JavaScript |
| `pnpm zip` | Create `dist/gpt-ghost-theme.zip` |
| `pnpm verify` | Build the ZIP and run GScan on the source and artifact |

The `dist/` directory is intentionally excluded from Git.

### Publish a beta

1. Update the version in `package.json`.
2. Update `CHANGELOG.md` and `docs/RELEASE_NOTES.md`.
3. Run `pnpm verify`.
4. Commit the source and generated `assets/built/` files.
5. Push a commit containing `[release beta]` in its message.

GitHub Actions creates the version tag and prerelease with the ZIP, SHA-256 checksum, and `routes.yaml`.

## Support

- [Beta testing guide](docs/BETA_TESTING.md)
- [Known limitations](docs/KNOWN_LIMITATIONS.md)
- [Security policy](SECURITY.md)
- [Issue tracker](https://github.com/iamjeffperry/gpt-ghost-theme/issues)

Include the theme version, Ghost version, browser, reproduction steps, and screenshots with bug reports. Report security-sensitive problems through the security policy rather than a public issue.

## Credits and license

GPT Ghost Theme is based on Ghost's Source theme and includes Lucide icons. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for attribution.

The theme was developed through an AI-assisted conversational workflow—often called vibe coding—using ChatGPT and Codex. Jeff Perry provided the design direction, testing, and release decisions.

Released under the [MIT License](LICENSE).
