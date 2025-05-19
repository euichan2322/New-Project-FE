# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./

#RUN pnpm install --frozen-lockfile
RUN pnpm install

COPY tsconfig.json next.config.ts ./
COPY public ./public
COPY src ./src

RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]