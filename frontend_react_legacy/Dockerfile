# Stage 1: Build the React app
FROM node:14 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using Express
FROM node:14 AS server
WORKDIR /app
COPY --from=build /app/build ./build
COPY server.js ./
COPY package.json package-lock.json ./
RUN npm install express cors

EXPOSE 3000
CMD ["node", "server.js"]