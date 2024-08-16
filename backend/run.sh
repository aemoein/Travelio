#!/bin/bash

# Define the Docker images and containers with paths and ports
services=(
    "users Users/ 3001:3001"
    "destinations Destinations/ 3002:3002"
    "trip Trip/ 3003:3003"
    "social SocialMedia/ 3004:3004"
    "payment Payment/ 3005:3005"
    "challenges Challenges/ 3100:3100"
    "imagemodel ImageModel/ 5555:5555"
)

# Build and run Docker containers
for service_info in "${services[@]}"; do
    read -r service path ports <<< "$service_info"
    
    echo "Building Docker image for $service..."
    docker build -t "$service" "$path"
    
    echo "Running Docker container for $service on ports $ports..."
    docker run -d --name "$service-container" -p "$ports" "$service"
done

echo "All services have been built and are running."