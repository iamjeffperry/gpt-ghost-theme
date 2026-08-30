# Contributing

Bug reports and focused pull requests are welcome during the public beta.

## Development setup

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Before opening a pull request, run:

```sh
pnpm verify
git diff --check
```

`pnpm verify` builds the production assets and release ZIP, then runs GScan against both the source tree and the installable artifact.

## Pull requests

- Keep changes focused and explain the user-facing result.
- Test desktop and mobile layouts when changing templates or CSS.
- Test keyboard behavior when changing navigation, forms, dialogs, or controls.
- Preserve Ghost helpers and membership checks; never expose protected post content in a feed template.
- Update `README.md`, `CHANGELOG.md`, or beta documentation when behavior changes.
- Do not commit `node_modules`, `dist`, local Ghost data, credentials, member data, or personal test content.

For larger behavior changes, open an issue first so the design can be discussed before implementation.
