# Contember plugins

- [datagrid](src/datagrid/README.md)
- [deleteEntityButton](src/deleteEntityButton/README.md)
- [discriminatedByBooleanField](src/discriminatedByBooleanField/README.md)
- [editButton](src/editButton/README.md)
- [env](src/env/README.md)
- [gap](src/gap/README.md)
- [image](src/image/README.md)
- [link](src/link/README.md)
- [locale](src/locale/README.md)
- [seo](src/seo/README.md)
- [snappyimg](src/snappyimg/README.md)
- [tenant](src/tenant/README.md)
- [text](src/text/README.md)
- [translations](src/translations/README.md)
- [urlField](src/urlField/README.md)
- [youtube](src/youtube/README.md)

## Development

```sh
npm ci # Install dependencies
npm run dev
```

Go to [localhost:1480](http://localhost:1480/) to check admin components.

Run `npm run contember migration:diff migration-name` to create a new demo migration.

## How to publish new version

```sh
npm version major|minor|patch
git push && git push --tags
```

GitHub CI will publish to GitHub npm registry automatically.
