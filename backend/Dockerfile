FROM node:20-alpine AS development
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
WORKDIR /app/src
USER node
ENTRYPOINT ["npm", "run", "dev"]

FROM node:20-alpine AS production
WORKDIR /app
COPY ./package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
ENTRYPOINT ["npm", "run", "start"]
