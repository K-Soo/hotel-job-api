FROM node:20.18.0-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.13.2 --activate
COPY pnpm-lock.yaml package.json ./

# # Stage - development
# FROM base AS dev
# RUN pnpm install --frozen-lockfile
# COPY . /app
# EXPOSE 8010
# CMD ["pnpm", "run", "start:dev"]

# production Build Stage
FROM base AS build
RUN pnpm install --frozen-lockfile
COPY . /app
RUN pnpm run build

# Stage - development
FROM base AS dev
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env-cmdrc.json .env-cmdrc.json

RUN ls -a
RUN cat .env-cmdrc.json

EXPOSE 8010

RUN ls -a
RUN pwd
# CMD ["pnpm", "run", "start:dev"]
CMD ["env-cmd", "-e", "development", 'node' , 'dist/main']


# Stage - Production 
FROM base AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env-cmdrc.json .env-cmdrc.json

RUN ls -a
RUN cat .env-cmdrc.json

EXPOSE 8020

RUN ls -a
RUN pwd

CMD ["pnpm", "run", "start:prod"]

# FROM node:20.18.0-alpine

# WORKDIR /app

# RUN corepack enable && corepack prepare pnpm@latest --activate

# COPY pnpm-lock.yaml ./

# COPY package.json ./

# RUN pnpm install

# COPY . /app

# EXPOSE 5500

# CMD ["npm", "run", "start:dev"]