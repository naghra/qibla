FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_SITE_ORIGIN
ARG VITE_ADMIN_PASSWORD
ENV VITE_SITE_ORIGIN=$VITE_SITE_ORIGIN
ENV VITE_ADMIN_PASSWORD=$VITE_ADMIN_PASSWORD

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

EXPOSE 3000
CMD ["node", "server/index.js"]
