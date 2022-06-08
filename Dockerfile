FROM node:lts AS client
WORKDIR /app

COPY client/package.json client/package.json
RUN cd client && npm i
COPY client ./client
RUN cd client && npm run build:prod

FROM node:lts
WORKDIR /app
COPY /server/package*.json ./server/
RUN  cd server && npm install

COPY /server/tsconfig.json ./server/

# COPY
COPY /server/. ./server/
COPY --from=client /app/client/build admin

WORKDIR /app/server
CMD ["npx", "ts-node", "index.ts"]
