# GPT Ghost Theme

A responsive, mixed-format personal publishing theme for [Ghost](https://ghost.org), built from Ghost's Source theme.

The theme turns one chronological homepage into a flexible stream of essays, notes, links, photos, media, quotations, and ordinary tagged posts. Each format has its own presentation while sharing one typography system, color system, footer, responsive layout, and individual-post experience.

> **Public beta:** `v0.2.0-beta.1` targets Ghost 6. It is suitable for staging and early adopters, but beta testers should keep a copy of their current theme and report problems through [GitHub Issues](https://github.com/iamjeffperry/gpt-ghost-theme/issues). The beta is translation-ready but officially supported in English only.

## Highlights

- Six explicit post types selected with Ghost internal tags
- Ordinary posts can use their first public tag instead of being forced into an Essay category
- Configurable labels, tag colors, and any bundled Lucide icon
- Link-post titles that point directly to an external destination
- Automatic Link bookmark creation and placement
- One prominent featured post followed by a chronological mixed-format stream
- Rounded, consistently sized images and media across the homepage and post pages
- Responsive navigation, centered mobile actions, and touch-friendly controls
- Ghost typography and accent-color settings honored throughout the site
- Newsletter signup, social accounts, RSS, comments, search, sharing, and related posts
- Dedicated archive pages for every internal post type
- Production build, ZIP packaging, and GScan compatibility scripts

## Requirements

- Ghost 6.0 or newer
- Node.js 22.12 or newer for local development
- pnpm 11.21 or a compatible newer pnpm release

## Install the theme

1. Download `gpt-ghost-theme.zip` from the latest [GitHub release](https://github.com/iamjeffperry/gpt-ghost-theme/releases), or build it locally.
2. Open **Ghost Admin → Settings → Design & branding**.
3. Select **Change theme → Upload theme**.
4. Upload the ZIP and activate it.
5. Configure the theme under **Customize → Theme**.
6. If you want the post-type archive URLs, upload `routes.yaml` separately under **Settings → Labs → Routes**.

Ghost does not install `routes.yaml` from a theme ZIP. It must be uploaded separately.

### Updating an existing installation

Every released ZIP should use a new `version` in `package.json`. Ghost uses versioned asset URLs, so installing a ZIP with an unchanged version can leave an older stylesheet in browser or CDN caches.

After uploading an update:

1. Confirm the new theme version in Ghost Admin.
2. Activate the updated theme if Ghost did not activate it automatically.
3. Reload the public site. A hard refresh may help if a browser tab was already open.

## Post types

Add one internal tag to a post to select its format.

| Internal tag | Default label | Best for | Homepage behavior |
| --- | --- | --- | --- |
| `#essay` | Essay | Articles and long-form writing | Title, excerpt, optional feature image, date, and reading time |
| `#note` | Note | Short observations and title-free thoughts | Full post content appears directly in the stream |
| `#link` | Link | External links with optional commentary | Title opens the external destination; destination row is hidden |
| `#photo` | Photo | Photography, illustration, and galleries | Visual content is prioritized and kept within a sensible maximum size |
| `#media` | Media | Video, audio, podcasts, and embeds | Media is displayed responsively inside the stream |
| `#quote` | Quote | Quotations, attribution, and response | Full quotation content appears directly in the stream |

Use only one internal post-type tag per post. Public tags can still be added for topics, navigation, and organization.

For compatibility with older versions:

- `#micro` is an alias for `#note`.
- `#image` is an alias for `#photo`.

### Posts without an internal post-type tag

An untyped post is not automatically labeled Essay.

- If it has a public tag, the first public tag becomes its visible marker and uses that tag's Ghost accent color.
- If it has no public tags, no marker is displayed.
- Add `#essay` explicitly when the post should use the configured Essay label and icon.

## Authoring each format

### Essays

1. Add the `#essay` internal tag.
2. Add a title and body.
3. Optionally add a custom excerpt and feature image.

Essay feature images use the same rounded-corner treatment as other media. On homepage cards, metadata moves below the feature image so the visual and its date remain a coherent unit.

### Notes

1. Add `#note`.
2. Write the note in the body.
3. A title may exist in Ghost for URLs and administration, but the homepage emphasizes the body content.

Notes are intended for short posts. Very long Note bodies will also be rendered directly in the feed.

### Link posts

1. Add `#link`.
2. Use the post title as the headline readers should see.
3. Put the external destination in the body as one of the following:
   - a Ghost Bookmark card;
   - clickable text pointing to an external URL; or
   - a plain external URL.
4. Add commentary, a quotation, or supporting context after the destination.

The theme finds the first external destination using this precedence:

1. Ghost Bookmark card
2. External clickable link
3. Plain external URL in a paragraph, list item, or caption

The title points directly to that external destination on both the homepage and the individual post page.

On the homepage, the destination row or bookmark is hidden so it does not duplicate the title. On the individual post page, the bookmark is moved to the top. If the source was plain text or clickable text, the theme creates a compact bookmark containing its label, hostname, and URL.

This enhancement runs in the browser because Ghost's Handlebars context does not expose an arbitrary link from the post body. If JavaScript is disabled or no external destination is found, the title falls back to the post's normal internal URL.

### Photo posts

Add `#photo` and use either approach:

- **Feature image:** set the image in Ghost's post settings.
- **Image in the body:** add an Image or Gallery card in the editor.

Feature images and body images receive consistent rounded corners. Individual Photo feature images are centered and constrained by both viewport height and content width so portrait photography does not become excessively large. Photo metadata appears below the feature image.

### Media posts

1. Add `#media`.
2. Add a video, audio, podcast, or embed card.
3. Add optional commentary beneath it.

Embedded media remains responsive and contained within the stream. Some third-party embeds may not appear in browser printouts or automated screenshots even when they work on the live site.

### Quote posts and blockquotes

Add `#quote`, then use Ghost Blockquote cards for the quotation and attribution.

Blockquotes use one treatment across the homepage, post-type archives, and individual posts:

- a flat 5px left edge using the post or tag accent color;
- the same deeper neutral background used by the homepage featured card;
- square left corners and rounded right corners;
- body typography that remains consistent with Link excerpts.

The colored edge identifies the post type without filling the entire quotation with a strong accent color.

## Featured posts

Use Ghost's built-in **Feature this post** toggle.

- The homepage displays the newest featured post in one prominent card.
- Its feature image is prioritized for loading.
- Ghost orders featured posts before unfeatured posts, then orders each group newest first.
- If multiple posts are featured, the newest becomes the prominent card and the remaining featured posts continue as ordinary cards directly beneath it.
- Every post remains in Ghost's native paginated collection, so featured posts are neither duplicated nor lost from later pages.
- If no post is featured, the normal chronological feed is shown.

The featured card uses a slightly deeper version of the site background, a restrained border, rounded corners, and a subtle shadow.

## Theme settings

Open **Ghost Admin → Settings → Design & branding → Customize → Theme**.

### Brand and typography

| Setting | Effect |
| --- | --- |
| Site background color | Sets the paper-like background and derives related neutral surfaces |
| Header and footer color | Uses either the site background or Ghost accent color |
| Heading font | Controls headings, post titles, publication title, footer headings, and other display text |
| Body font | Controls paragraphs, navigation-supporting text, metadata, forms, and post content |

The theme supports Ghost's Modern sans-serif, Elegant serif, and Consistent mono heading choices, plus Modern sans-serif or Elegant serif body text.

### Homepage controls

| Setting | Default | Purpose |
| --- | --- | --- |
| Show images in feed | Enabled | Globally displays or suppresses homepage card images |
| Essay label | Essay | Visible label for `#essay` |
| Essay icon | `file-text` | Lucide icon for `#essay` |
| Note label | Note | Visible label for `#note` and `#micro` |
| Note icon | `message-circle` | Lucide icon for Notes |
| Link label | Link | Visible label for `#link` |
| Link icon | `link` | Lucide icon for Links |
| Photo label | Photo | Visible label for `#photo` and `#image` |
| Photo icon | `image` | Lucide icon for Photos |
| Media label | Media | Visible label for `#media` |
| Media icon | `play` | Lucide icon for Media |
| Quote label | Quote | Visible label for `#quote` |
| Quote icon | `quote` | Lucide icon for Quotes |

### Individual-post controls

| Setting | Default | Purpose |
| --- | --- | --- |
| Show post metadata | Enabled | Shows author, publish date, reading time, and Share button |
| Enable drop caps on posts | Disabled | Adds a drop cap to supported post content |
| Show related articles | Enabled | Shows up to four additional posts beneath an individual post |

## Icons

Every post-type icon field accepts any lowercase, kebab-case name from the [Lucide icon directory](https://lucide.dev/icons/).

Examples:

```text
check-check
notebook-pen
camera
headphones
book-open
```

Enter only the icon name—do not add HTML, brackets, `lucide-`, or an SVG extension.

The complete Lucide set is bundled in `assets/icons/lucide.svg`, so the published site does not depend on a third-party icon CDN or a Lucide package during production builds. Legacy dropdown values from older theme versions remain mapped for compatibility.

An invalid icon name produces an empty SVG reference. Check spelling and confirm that the name exists in the Lucide directory.

## Colors

The theme uses three related color sources:

1. **Site background:** configured in Theme settings and used to derive neutral surfaces.
2. **Ghost accent color:** used for subscribe actions, the newsletter icon, and fallback accents.
3. **Tag accent color:** configured on each Ghost tag and used by post-type markers, icons, blockquote edges, and related details.

To configure a post-type color:

1. Open **Ghost Admin → Settings → Tags**.
2. Open the internal tag, such as `#quote` or `#link`.
3. Choose its accent color.
4. Save the tag.

The theme checks internal post-type tag colors even when a public tag is the post's primary tag.

## Images and media

- Homepage images use responsive WebP `srcset` candidates.
- Featured-card images load eagerly; other feed images are lazy-loaded.
- Feature images, Photo images, gallery cards, embedded video, and relevant media receive consistent rounded corners.
- Individual Photo feature images use a maximum height of `min(720px, 70vh)` and preserve their natural aspect ratio.
- Image cards without feature images can size to their content instead of stretching across the entire stream.
- Ghost feature-image captions and alt text are preserved.

## Header, navigation, and mobile behavior

Navigation is managed in Ghost Admin rather than hard-coded in the theme.

The responsive header provides:

- publication icon or logo;
- publication title;
- optional description on larger screens;
- primary navigation;
- search;
- subscription action;
- a mobile menu with centered actions and deliberate spacing between links.

The homepage, featured card, images, embeds, newsletter form, footer, and post layouts collapse to a single readable column on small screens. Interactive controls retain touch-friendly dimensions.

## Newsletter, footer, and membership

The footer includes:

- a newsletter card using Ghost Members when enabled;
- an envelope icon and Subscribe button using the Ghost accent color;
- rounded email and button controls;
- an RSS alternative when Members is disabled or the visitor is already a member;
- publication title and description;
- Ghost-managed footer navigation;
- configured Ghost social accounts;
- a permanent RSS link;
- copyright and Ghost attribution.

Ghost Portal powers subscription and membership flows. The theme does not implement a separate mailing-list backend.

### Members-only and paid posts

Ghost's **Post access** setting is supported across every post format, including featured posts and related-post cards.

| Post access | Visitor without access | Visitor with access |
| --- | --- | --- |
| Public | The normal card and full post | The normal card and full post |
| Members only | A lock badge, safe feed teaser, and membership prompt | The normal card and full post |
| Paid members only | A paid-member badge, safe feed teaser, and plan prompt | The normal card and full post |
| Specific tiers | A selected-member badge, safe feed teaser, and plan prompt | The normal card and full post |

Locked feed cards may show the title, public tag, date, custom excerpt, and featured image, but they do not render the protected body. This is especially important for Note, Quote, Link, Photo, and Media posts, whose body content normally appears directly in the feed. Locked Link titles continue to open the local post instead of being rewritten to an external destination.

On the individual post URL, Ghost remains responsible for calculating `access`. Any public preview created in the editor appears above the theme's membership card. Signed-out visitors can subscribe or sign in through Portal; signed-in visitors without the required access can open the plan selector.

To restrict a post, open it in Ghost Admin, expand **Post settings**, and choose the desired value under **Post access**. No internal tag is required.

## Archive routes

The included `routes.yaml` defines:

| URL | Template | Included internal tags |
| --- | --- | --- |
| `/essays/` | `essays.hbs` | `#essay` |
| `/notes/` | `notes.hbs` | `#note`, `#micro` |
| `/links/` | `links.hbs` | `#link` |
| `/photos/` | `photos.hbs` | `#photo`, `#image` |
| `/media/` | `media.hbs` | `#media` |
| `/quotes/` | `quotes.hbs` | `#quote` |
| `/archive/` | `archive.hbs` | All posts, newest first |

These routes use Ghost channels, so they have native pagination and RSS support instead of a fixed post limit. Add any archive URL you want exposed under **Ghost Admin → Settings → Navigation**.

## Development

Clone the maintained branch:

```sh
git clone --branch shareable-theme-v1 https://github.com/iamjeffperry/gpt-ghost-theme.git
cd gpt-ghost-theme
```

Install dependencies:

```sh
corepack enable
pnpm install
```

Start the asset watcher and LiveReload server:

```sh
pnpm dev
```

Build production CSS and JavaScript:

```sh
pnpm build
```

Create `dist/gpt-ghost-theme.zip`:

```sh
pnpm zip
```

Run Ghost's compatibility scanner against the source theme:

```sh
pnpm test:theme
```

Build the installable ZIP and validate both source and artifact:

```sh
pnpm verify
```

The release ZIP is built from an explicit allowlist. Development files, source maps, package-manager files, and `node_modules` are excluded.

### Release checklist

1. Start from the latest `shareable-theme-v1`.
2. Make the source changes.
3. Run `pnpm build`.
4. Run `pnpm verify`.
5. Increment the `version` in `package.json`.
6. Run `pnpm zip` again after the version change.
7. Commit source files, generated files in `assets/built/`, and `package.json`.
8. Push the commit and version tag to GitHub.
9. Publish a GitHub prerelease with the ZIP, checksum, and `routes.yaml`.
10. Test the release ZIP on a Ghost 6 staging site before promoting it.

The `dist/` directory is intentionally ignored by Git. Release ZIPs are build artifacts rather than source files.

## Project structure

```text
assets/
  built/                 Compiled production CSS and JavaScript
  css/                   Source, stream, and icon styles
  icons/lucide.svg       Bundled Lucide sprite
  js/stream.js           Link-post detection and bookmark behavior
partials/
  components/            Navigation, footer, stream, and featured components
  channel-feed.hbs       Native channel feed and pagination
  post-card.hbs          Mixed-format homepage/archive rendering
  post-type-icon.hbs     Lucide icon selection and legacy mappings
default.hbs              Global document, typography, assets, header, and footer
home.hbs                 Mixed-format homepage
archive.hbs              Chronological archive channel
post.hbs                 Individual post presentation
essays.hbs               Essay archive
notes.hbs                Note archive
links.hbs                Link archive
photos.hbs               Photo archive
media.hbs                Media archive
quotes.hbs               Quote archive
routes.yaml              Optional custom Ghost routes
gulpfile.js              Build, watch, and ZIP tasks
package.json             Theme metadata, settings, scripts, and version
```

## Troubleshooting

### The site still shows an older design after uploading

- Confirm the ZIP contains a newer `package.json` version.
- Confirm the updated theme is active, not merely uploaded.
- Reload the page or open it in a new private window.
- Inspect the stylesheet URL and verify that its version query changed.

### A Link title still points to the internal post

- Confirm the post has `#link`.
- Put at least one external `http://` or `https://` destination in the body.
- Make sure the destination is not only stored in metadata or the excerpt.
- Check the browser console for JavaScript errors.

### A Link bookmark appears twice

Keep one destination card or URL at the beginning of the post. The theme uses the first external destination it can find.

### An archive URL returns 404

Upload `routes.yaml` under Ghost Labs, restart Ghost if your hosting environment requires it, and add the URL to Navigation if it should be visible in the header or footer.

### An icon is missing

Use the exact lowercase, kebab-case Lucide name. For example, use `check-check`, not `Check Check` or `lucide-check-check`.

### Theme ZIP will not upload

Run:

```sh
pnpm verify
```

Resolve fatal GScan errors, rebuild the ZIP, and verify that `package.json` is at the ZIP root rather than inside an extra parent directory.

## Beta testing and support

Before installing on a production publication, read [Beta testing](docs/BETA_TESTING.md) and [Known limitations](docs/KNOWN_LIMITATIONS.md). Bug reports should include the theme version, Ghost version, browser, hosting environment, public URL when possible, reproduction steps, and screenshots.

This project is community-supported through [GitHub Issues](https://github.com/iamjeffperry/gpt-ghost-theme/issues). Security-sensitive reports should follow [SECURITY.md](SECURITY.md) instead of being posted publicly.

## Accessibility and performance

- Semantic headings, navigation landmarks, article elements, figures, and time elements are retained.
- A keyboard-visible skip link moves focus to the main content.
- The mobile menu exposes its expanded state, supports Escape, and contains keyboard focus while open.
- Newsletter email fields have programmatic labels, and interactive controls receive visible focus treatment.
- Images preserve alt text and use responsive sources.
- Decorative post-type icons are hidden from assistive technology.
- External Link bookmarks use `noopener noreferrer` when opening a new tab.
- Color is paired with text labels and icons rather than being the only post-type signal.
- Production assets are concatenated and minified into one stylesheet and one JavaScript bundle.

## License and credits

MIT. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The theme is derived from Ghost's Source theme and includes bundled Lucide icons. Copyright and license notices for Ghost Foundation, Lucide contributors, and Jeff Perry are retained in the repository.
