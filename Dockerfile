FROM node:20-alpine AS base

RUN if [ "$(uname -m)" = "x86_64" ]; then \
      npm install -g bun; \
    else \
      echo "Using npm for non-x86_64 architecture"; \
    fi

WORKDIR /app

COPY package.json bun.lock* ./

FROM base AS deps
RUN if command -v bun >/dev/null 2>&1; then \
      bun install --frozen-lockfile; \
    else \
      npm ci; \
    fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN if command -v bun >/dev/null 2>&1; then \
      bun run build; \
    else \
      npm run build; \
    fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 80

ENV PORT=80
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
