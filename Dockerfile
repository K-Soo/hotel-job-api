# Base
FROM node:20.18.0-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.14.4 --activate
COPY pnpm-lock.yaml package.json ./

# Stage - Production Build
FROM base AS build
RUN pnpm install --frozen-lockfile
COPY . /app
RUN pnpm run build
RUN find /app/dist -name "*.hbs" || (echo "❌ .hbs 파일 없음!" && exit 1)


# Stage - Local
FROM base AS local
RUN pnpm install --frozen-lockfile
COPY . /app
EXPOSE 8010
CMD ["pnpm", "run", "start:local"]

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
RUN echo "[확인] .hbs 포함 여부:" && find ./dist -name "*.hbs" || (echo "prod .hbs 없음!" && exit 1)
RUN apk add --no-cache tree && \
    echo "📦 dist 구조:" && \
    tree /app/dist

EXPOSE 8020
CMD ["pnpm", "run", "start:prod"]