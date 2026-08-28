# GPT Ghost Theme

A mixed-format personal publishing theme for [Ghost](https://ghost.org), built from Ghost's Source theme.

This repository is in active development. The current `main` branch preserves the imported personal-theme baseline; work toward the reusable theme happens on `shareable-theme-v1`.

## Post types

Assign one internal tag to a post to change its presentation:

| Internal tag | Default label | Intended use |
| --- | --- | --- |
| `#essay` | Essay | Standard articles and long-form writing |
| `#note` | Note | Short, title-free thoughts shown directly in the feed |
| `#link` | Link | External links with optional commentary |
| `#photo` | Photo | Photographs, illustrations, and galleries |
| `#media` | Media | Video, audio, and podcast posts |
| `#quote` | Quote | Quotations with optional attribution and response |

Use only one post-type tag on each post. Regular public tags can still be used for topics and organization.

Posts without one of these internal post-type tags are treated as standard posts, not Essays. Their first public tag and its Ghost accent color appear in the feed. If a post has no public tag, the type/tag marker is omitted. Add `#essay` explicitly when you want the Essay label and color.

For compatibility with the original personal theme, `#micro` is accepted as an alias for `#note`, and `#image` is accepted as an alias for `#photo`.

### Link posts

Add `#link`, then put the destination in the post as the first external raw URL, linked text, or Ghost Bookmark card. The theme makes the title point directly to that destination on both the feed and post page. It hides the destination card in feeds and moves it to the top of the individual post.

An existing Ghost Bookmark keeps its rich preview. Raw URLs and linked text are converted in the browser to a simpler bookmark card containing the supplied label, hostname, and URL.

## Labels, icons, and colors

The visible label and icon for every post type can be changed under **Ghost Admin → Settings → Design & branding → Customize → Theme → Homepage**.

Each icon setting accepts any lowercase, kebab-case name from the [Lucide icon directory](https://lucide.dev/icons/). For example, enter `check-check`, `camera`, or `notebook-pen`—only the icon name, without HTML or brackets. The complete Lucide icon set is bundled with the theme, so the published site does not depend on a third-party icon CDN.

To set a post-type color, open its internal tag in Ghost Admin and choose the tag's accent color. The theme uses that color for the post-type marker and related accents, including the `#essay` color for Essays.

## Archive routes

The included `routes.yaml` adds:

- `/essays/`
- `/notes/`
- `/links/`
- `/photos/`
- `/media/`
- `/quotes/`

Ghost does not activate a theme's `routes.yaml` when the theme ZIP is uploaded. Upload it separately under **Ghost Admin → Settings → Labs → Routes**.

Navigation is controlled by Ghost Admin rather than hard-coded in the theme. Add whichever archive routes you want under **Settings → Navigation**.

## Development

Requires Node.js 22 and pnpm.

```sh
pnpm install
pnpm dev
```

Build production assets:

```sh
pnpm build
```

Run Ghost's theme compatibility scanner:

```sh
pnpm test
```

Create an uploadable theme ZIP in `dist/`:

```sh
pnpm zip
```

## License

MIT. This theme is derived from Ghost Source; the license retains attribution for Ghost Foundation and Jeff Perry.
