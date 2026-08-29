# Known limitations

These constraints are intentional or unresolved in `0.2.0-beta.1`.

- **English-only support:** Theme text is translation-ready and ships with `locales/en.json`, but other languages are not officially supported in this beta.
- **Ghost 6 baseline:** The beta is validated against Ghost 6 and is not supported on Ghost 5.
- **Routes install separately:** Ghost does not install `routes.yaml` with a theme ZIP. Format archives require a separate routes upload and may need to be merged with a publication's existing routes.
- **One format tag per post:** Use only one of `#essay`, `#note`, `#link`, `#photo`, `#media`, or `#quote`. Alias tags `#micro` and `#image` remain supported. Combining formats has no defined precedence guarantee.
- **Link enhancement requires JavaScript:** Ghost templates cannot read an arbitrary URL from post HTML. Link posts use browser JavaScript to locate the first external destination; without JavaScript they safely link to the local post.
- **Third-party embeds vary:** Video, podcast, and social embeds are controlled partly by their providers. Some do not render in printouts, automated screenshots, strict privacy modes, or when third-party scripts are blocked.
- **Custom icon names are not prevalidated:** An invalid Lucide name produces an empty icon reference. The label remains visible.
- **Publisher-selected contrast:** The theme pairs colors with text and icons, but a very low-contrast Ghost accent or tag color can still reduce readability. Publishers should test their chosen palette.
- **Demo content is not included:** Posts, tags, routes installation, navigation items, members, tiers, and social accounts must be configured in Ghost Admin.

Please open a [compatibility report](https://github.com/iamjeffperry/gpt-ghost-theme/issues/new/choose) when a host, browser, content card, or Ghost configuration behaves unexpectedly.
