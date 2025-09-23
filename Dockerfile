FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

EXPOSE 3000
