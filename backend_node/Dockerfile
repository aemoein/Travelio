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
ENV MONGO_URI_LOCAL=mongodb://localhost:27017/
ENV MONGO_URI_REMOTE=mongodb+srv://aemoein:ae123%40ae@travelio.gb2iom0.mongodb.net/travelio?retryWrites=true&w=majority&appName=Travelio
ENV PORT=8080
ENV JWT_SECRET=eH6Q2Ji3Vn3bT6Tn4GfDn7Sp2Ue7Nz3Rj8Sd1Ws5Fg9Uk0Li2Ym5Gk3Yb7Ja5S
ENV STRIPE_SECRET_KEY=sk_test_51PZcKZDydtnbvjAQ6nNRefH3Zw7dEj8P6emJmpfv64ofhMe5RbdmXEgiuoMs2aYsC5oCzZcziVTQyMZPfkJH5dhH00OZocVzfc
ENV CLOUDINARY_API_KEY=446117655322995
ENV CLOUDINARY_API_SECRET=3Z4XHUqy7rbKdCXFkMVu7ai49u0
ENV CLOUDINARY_CLOUD_NAME=dkabonlzl
ENV ACCESS_TOKEN=qvsnlN7n2OT1ooFBMtS0vz1wq3nb
ENV CLIENT_ID=KJcf4aGewF0G3fF32fRIrGNWVVFRL20z
ENV CLIENT_SECRET=qgXGYxrthINKKz83
ENV GOOGLE_API_KEY=AIzaSyA92-YGwUSmDHFjldbLlXysT0F2VAhEzOI
ENV HOST=https://travelio-production.up.railway.app
ENV FRONTEND=https://travelio-gold.vercel.app
ENV REDIS_URL=redis://default:g2lMmUnz0QSbLWRAABsBiEGSaQvVLg9Z@redis-18691.c339.eu-west-3-1.ec2.redns.redis-cloud.com:18691
ENV NODE_ENV=production

# Expose the port your app runs on.
EXPOSE 8080

# Command to run your application.
CMD ["npm", "start"]
