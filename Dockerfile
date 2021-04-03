#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#

FROM node:15.13.0-alpine3.13 AS builder

LABEL version="1.0"
LABEL description="Backend for an encrypted events manager"
LABEL maintainer = ["jaycammarano@gmail.com"]
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
# COPY .env ./
COPY ./src ./src
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python && rm -rf /var/cache/apk/*
RUN npm ci --quiet && npm run build

# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:15.13.0-alpine3.13 AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python && rm -rf /var/cache/apk/*
RUN npm ci --quiet --only=production

## We just need the build to execute the command
COPY --from=builder /usr/src/app/build ./build

EXPOSE 1337
CMD ["npm", "run", "start"]