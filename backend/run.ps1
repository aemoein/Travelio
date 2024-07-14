# Define the Docker images and containers with paths and ports
$services = @(
    @{ Name="users"; Path="Users/"; Ports="3001:3001" }
    @{ Name="destinations"; Path="Destinations/"; Ports="3002:3002" }
    @{ Name="trip"; Path="Trip/"; Ports="3003:3003" }
    @{ Name="social"; Path="SocialMedia/"; Ports="3004:3004" }
    @{ Name="payment"; Path="Payment/"; Ports="3005:3005" }
    @{ Name="challenge"; Path="Challenge/Challenge"; Ports="3006:3006" }
    @{ Name="challenge_logs"; Path="Challenge/challnege_logs"; Ports="3007:3007" }
    @{ Name="challengecities"; Path="Challenge/ChallengableCities"; Ports="3008:3008" }
    @{ Name="challengeprofile"; Path="Challenge/challengProfile"; Ports="3009:3009" }
    @{ Name="points"; Path="pointsManagement/"; Ports="3010:3010" }
    @{ Name="achievements"; Path="achievements/"; Ports="3012:3012" }
    @{ Name="rewards"; Path="reward/"; Ports="3011:3011" }
    @{ Name="mlmodel"; Path="Challenge/MLmodel"; Ports="5555:5555" }
)

# Build and run Docker containers
foreach ($service in $services) {
    $name = $service.Name
    $path = $service.Path
    $ports = $service.Ports
    
    # Run mvn clean package for specified services
    if ($ports -match "^300[6-9]:300[6-9]$" -or $ports -eq "3010:3010" -or $ports -eq "3011:3011" -or $ports -eq "3012:3012") {
        Write-Output "Navigating to $path to run mvn clean package for $name..."
        Push-Location $path
        & mvn clean package
        Pop-Location
    }
    
    Write-Output "Building Docker image for $name..."
    & docker build -t $name $path
    
    Write-Output "Running Docker container for $name on ports $ports..."
    & docker run -d --name "$name-container" -p $ports $name
}

Write-Output "All services have been built and are running."
