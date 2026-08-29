# Beta testing

Thank you for testing GPT Ghost Theme. The goal of this beta is to find real-world content, membership, browser, and hosting combinations that are difficult to reproduce with a demo publication.

## Before you install

1. Use Ghost 6 or newer.
2. Download the ZIP and checksum from the GitHub prerelease.
3. Keep a copy of your currently active theme.
4. Prefer a staging publication for the first installation.
5. Upload `routes.yaml` separately in **Ghost Admin → Settings → Labs → Routes** if you want the format archives.

Changing routes can affect existing custom URLs. Compare the provided file with your current routes and merge intentionally rather than overwriting publication-specific routing.

## High-priority test matrix

Test the combinations that match your publication. You do not need to complete every row before reporting a problem.

| Area | Test cases | Expected result |
| --- | --- | --- |
| Homepage | No featured posts, one featured post, two or more featured posts | Newest featured post is the hero; other featured posts remain ordinary cards; no post is duplicated or lost |
| Pagination | More than 12 total posts and more than 12 posts of one format | Older/newer navigation works and every post is reachable |
| Post formats | Essay, Note, Link, Photo, Media, Quote, and untyped posts | Each internal tag selects the intended layout; untyped posts use their first public tag or no marker |
| Access | Public, members-only, paid, and specific-tier posts | Unauthorized visitors see safe teasers and an appropriate prompt; authorized members see the content |
| Images | Feature image, image card, gallery, portrait, landscape, caption, alt text | Media stays contained, keeps its aspect ratio, and uses consistent rounded corners |
| Links | Bookmark, linked text, plain external URL, and no external URL | The first external URL becomes the title destination; missing destinations fall back to the local post |
| Design | Accent color, heading font, body font, light/dark accent colors | Controls follow the accent color and typography follows Ghost's font selections |
| Navigation | Short and long desktop navigation, mobile menu, search | Links remain usable; mobile menu is centered, keyboard-operable, and closes with Escape |
| Newsletter | Members enabled/disabled; signed in/out | Email control or RSS alternative appears correctly; Portal actions open |
| Archives | All seven custom routes, page 2, RSS | Correct posts appear and native pagination/RSS work |
| Browsers | Current Chrome, Firefox, Safari, and Edge; iOS/Android when available | Layout, keyboard focus, forms, embeds, and navigation behave consistently |

## Keyboard check

1. Reload the page and press Tab.
2. Confirm the **Skip to content** link becomes visible and moves focus to the page content.
3. Continue tabbing and confirm every interactive item has a visible focus indicator.
4. On a narrow viewport, open the menu with the keyboard, cycle through its controls, then press Escape.

## Reporting a bug

Use the [beta bug report](https://github.com/iamjeffperry/gpt-ghost-theme/issues/new/choose). Include:

- theme version;
- Ghost version and hosting provider;
- browser, operating system, and device;
- post format, access level, and relevant theme settings;
- exact reproduction steps;
- expected and actual behavior;
- screenshots or a screen recording;
- a public test URL when safe.

Do not put private member information, unpublished content, access tokens, or security vulnerabilities in a public issue. Follow [SECURITY.md](../SECURITY.md) for sensitive reports.
