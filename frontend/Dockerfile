FROM node:20-alpine AS base

WORKDIR /data
COPY package.json package-lock.json /data/
ENV PATH=/data/node_modules/.bin:$PATH

# Development stage
FROM base AS development

ENV NODE_ENV=development
RUN npm install --include=dev

USER node
WORKDIR /data/app

CMD ["npm", "start"]

# Production stage
# Build the app
FROM base AS build

RUN npm install

COPY . /data/app
WORKDIR /data/app

RUN npm run build

# Create the server image
FROM nginx:alpine AS production

COPY --from=build /data/app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]