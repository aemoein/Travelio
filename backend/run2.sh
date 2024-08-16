#!/bin/bash

# Define the Docker images and containers with paths and ports
services=(
    "users Users/ 3001:3001"
    "destinations Destinations/ 3002:3002"
    "trip Trip/ 3003:3003"
    "social SocialMedia/ 3004:3004"
    "payment Payment/ 3005:3005"
    "challenge Challenge/Challenge 3006:3006"
    "challenge_logs Challenge/challnege_logs 3007:3007"
    "challengecities Challenge/ChallengableCities 3008:3008"
    "challengeprofile Challenge/challengProfile 3009:3009"
    "points pointsManagement/ 3010:3010"
    "achievements achievements/ 3012:3012"
    "rewards reward/ 3011:3011"
    "imagemodel ImageModel/ 5555:5555"
)

# Build and run Docker containers
for service_info in "${services[@]}"; do
    read -r service path ports <<< "$service_info"
    
    # Run mvn clean package for specified services
    if [[ $ports =~ ^300[6-9]:300[6-9]$ || $ports == "3010:3010" || $ports == "3011:3011" || $ports == "3012:3012" ]]; then
        echo "Navigating to $path to run mvn clean package for $service..."
        (cd "$path" && mvn clean package)
    fi
    
    echo "Building Docker image for $service..."
    docker build -t "$service" "$path"
    
    echo "Running Docker container for $service on ports $ports..."
    docker run -d --name "$service-container" -p "$ports" "$service"
done

echo "All services have been built and are running."