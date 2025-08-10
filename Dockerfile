FROM node:20-alpine AS base

RUN npm install -g bun

WORKDIR /app

COPY package.json bun.lock* ./

FROM base AS deps
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 80

ENV PORT 80
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
