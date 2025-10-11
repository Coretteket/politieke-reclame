# Politieke Reclame Tracker

Overview of political advertising campaign spending in the Netherlands. Sourced directly from [politiekereclame.nl](https://politiekereclame.nl), a platform established by all advertising organizations to comply with new European legislation on transparency of political advertising.

## Development

```sh
pnpm install
pnpm dev
```

## Production

```sh
docker compose -f compose.prod.yml up -d --build
```

Requires a global Traefik instance. Update the configuration in `compose.prod.yml` before deploying.