FROM node:16.16.0-alpine3.16 as builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN yarn install

COPY --chown=node:node . .

RUN yarn build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /home/node/app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]