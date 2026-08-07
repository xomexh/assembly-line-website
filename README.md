# Assembly Line public website

Standalone public-facing website for [assemblyline.shop](https://www.assemblyline.shop).

This application is intentionally isolated from the internal product at
`app.assemblyline.shop`. It has its own dependencies, build configuration,
assets, routes, and Vercel deployment configuration.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run lint
```

For Vercel, configure `website` as the project root directory. Build output is
generated in `website/dist`.

Build, testimonial, and bench-note content is maintained in `src/data.ts`.
