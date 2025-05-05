# Use the official Node.js image.
FROM node:20

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Set build-time arguments (default values).
ARG MONGO_URI_REMOTE
ARG JWT_SECRET
ARG STRIPE_SECRET_KEY
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG CLOUDINARY_CLOUD_NAME
ARG ACCESS_TOKEN
ARG CLIENT_ID
ARG CLIENT_SECRET
ARG GOOGLE_API_KEY
ARG HOST
ARG FRONTEND
ARG REDIS_URL

# Set environment variables (if provided).
ENV MONGO_URI_REMOTE=${MONGO_URI_REMOTE}
ENV JWT_SECRET=${JWT_SECRET}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
ENV CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
ENV CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
ENV ACCESS_TOKEN=${ACCESS_TOKEN}
ENV CLIENT_ID=${CLIENT_ID}
ENV CLIENT_SECRET=${CLIENT_SECRET}
ENV GOOGLE_API_KEY=${GOOGLE_API_KEY}
ENV HOST=${HOST}
ENV FRONTEND=${FRONTEND}
ENV REDIS_URL=${REDIS_URL}

# Set default environment variables (in case some are not provided).
ENV PORT=8080
ENV NODE_ENV=production

# Expose the port your app runs on.
EXPOSE 8080

# Command to run your application.
CMD ["npm", "start"]
