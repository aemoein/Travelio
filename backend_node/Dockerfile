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

# Set environment variables (default values).
ENV PORT=8080
ENV NODE_ENV=production

# Expose the port your app runs on.
EXPOSE 8080

# Command to run your application.
CMD ["npm", "start"]
