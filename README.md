# Source

The default theme for [Ghost](http://github.com/tryghost/ghost/). This is the latest development version of Source! If you're just looking to download the latest release, head over to the [releases](https://github.com/TryGhost/Source/releases) page.

&nbsp;

# First time using a Ghost theme?

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes.

This theme has lots of code comments to help explain what's going on just by reading the code. Once you feel comfortable with how everything works, we also have full [theme API documentation](https://ghost.org/docs/themes/) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The parent template file, which includes your global header/footer
- `home.hbs` - The homepage
- `index.hbs` - The main template to generate a list of posts
- `post.hbs` - The template used to render individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives, eg. "all posts tagged with `news`"
- `author.hbs` - Used for author archives, eg. "all posts written by Jamie"

One neat trick is that you can also create custom one-off templates by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for an `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive


# Development

Source styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/) and [pnpm](https://pnpm.io/). After that, from the theme's root directory:

```bash
# install dependencies
pnpm install

# run development server
pnpm dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
# create .zip file
pnpm zip
```

# PostCSS Features Used

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.


# SVG Icons

Source uses inline SVG icons, included via Handlebars partials. You can find all icons inside `/partials/icons`. To use an icon just include the name of the relevant file, eg. To include the SVG icon in `/partials/icons/rss.hbs` - use `{{> "icons/rss"}}`.

You can add your own SVG icons in the same manner.

# Translations

Please see [@TryGhost/Themes/theme-translations/README.md](https://github.com/TryGhost/Themes/blob/main/packages/theme-translations/README.md) for how to build, edit, or contribute translations.

# Copyright & License

Copyright (c) 2013-2026 Ghost Foundation - Released under the [MIT license](LICENSE).


Version jeff30: mobile hamburger pinned to the right edge whenever the mobile header appears.


Version jeff31: mobile Search and Menu are absolutely pinned to the right edge of the header.


Version jeff32: About page restyled to match the warm homepage visual system.

Version jeff33: About page top spacing tightened and signup card made compact to match the homepage/footer newsletter treatment.

Version jeff34: About page top spacing tightened and signup card redesigned into a compact horizontal utility card.


Version jeff35: hard-reset About-page Ghost signup card to a compact horizontal layout.


Version jeff36: centered About-page content column and increased line spacing.


Version jeff37: center About-page subscribe card content and form within the box.


Version jeff38: About signup restyled to match the homepage Weeklyish card.


Version jeff39: widened the About-page Weeklyish signup card and removed the squished layout.


Version jeff40: expanded About-page Weeklyish content and form to fill the card width.


Version jeff41: rebuilt About-page Weeklyish signup block with custom layout while preserving Ghost signup functionality.


Version jeff42: centered About-page Subscribe button label.


Version jeff43: tightened post-type icon-to-label spacing.


Version jeff44: navigation now uses real Essays/Notes/Links/Media archive routes backed by internal Ghost tags. Includes routes.yaml.


### v21 link-post cleanup
On Link feed/archive cards, the first external destination URL is used for the external title/domain and its standalone URL row (or Bookmark card) is hidden. The full URL remains visible on the individual post page.


## Jeff46 production cleanup

- Consolidated the iterative About-page CSS into one final rule set.
- Removed duplicate JeffPerry overrides from `assets/built/screen.css`; custom styling now lives only in `assets/css/jeffperry-stream.css`.
- Removed redundant CSS/JavaScript preload hints so first-paint resources get priority.
- Stopped preloading italic font files that are not needed above the fold.
- Added image decoding/loading priority hints for feed and article feature images.
- Removed redundant About-page JavaScript and development source maps.
- Fixed the archive CSS that had literal escaped newline characters from an earlier automated append.

This pass is intentionally conservative: layout, post-type behavior, internal-tag archives, Link-post routing, and the About-page Weeklyish form are unchanged.


## Jeff47 performance pass

- Merged Source, JeffPerry stream, and post-type CSS into `assets/built/jeffperry.css` so the browser has one theme stylesheet request.
- Homepage/archive pages no longer download Source's full lightbox/imagesLoaded/reframe bundle. They use a small menu + Link-post script instead.
- Ghost editor-card assets are limited to the Signup card. Existing Markdown, images, embeds (including Spotify/YouTube), Link posts, and the About signup remain supported.
- If native Ghost Audio, Video, Toggle, Gallery, Product, etc. cards are intentionally added later, re-enable those card assets in `package.json`.


## Jeff48
Restored full Ghost card assets after the Jeff47 performance pass so Bookmark and other editor cards retain their native styling while keeping the consolidated CSS and lightweight stream-page JavaScript optimizations.

## Jeff49 archive metadata spacing
Added dedicated vertical spacing before Link and Media archive permalink/date metadata so dates no longer crowd rich content or blockquotes.
