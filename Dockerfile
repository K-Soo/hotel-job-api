# Base
FROM node:20.18.0-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.13.2 --activate
COPY pnpm-lock.yaml package.json ./

# Stage - Production Build
FROM base AS build
RUN pnpm install --frozen-lockfile
COPY . /app
RUN pnpm run build

# Stage - Development
FROM base AS dev
RUN pnpm install --frozen-lockfile
COPY . /app
EXPOSE 8010
CMD ["pnpm", "run", "start:dev"]

# Stage - Production 
FROM base AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env-cmdrc.json .env-cmdrc.json
EXPOSE 8020
CMD ["pnpm", "run", "start:prod"]