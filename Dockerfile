## Base
FROM node:lts-alpine AS base
RUN yarn global add serve
RUN mkdir -p /app && chown node:node /app
RUN mkdir -p /home/node/app && chown node:node /app
WORKDIR /app
USER node
COPY --chown=node:node ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
RUN yarn build

## Production
FROM base AS production
COPY --chown=node:node --from=base /app/build /home/node/app
ENV PORT=3004
EXPOSE $PORT
CMD ["serve", "-s", "build"]