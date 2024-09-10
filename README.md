# TRAVELIO

TRAVELIO is a comprehensive travel application designed to assist travelers at every stage of their journey, from choosing a destination to finding the best local restaurant.

## Features

- **Destination Selection:** Explore various travel destinations with detailed information and recommendations.
- **Local Attractions:** Discover popular attractions and activities at your destination.
- **Social Media:** Allows the user to interact with one another by posting about thier trips and developing a community
- **Restaurant Finder:** Find the best local dining options with reviews and ratings.
- **User Profiles:** Create and manage your travel profiles and preferences.
- **Itinerary Planning:** Plan and organize your travel itinerary efficiently.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. **Clone the repository:**
    git clone https://github.com/aemoein/travelio.git

2. **Navigate to the project directory:**
    cd Travelio

3. **Install backend dependencies:**
    cd backend_node
    npm install

4. **Install frontend dependencies:**
    cd ../frontend_react
    npm install

5. **Set up environment variables:**
    **To run the application, you'll need to set up environment variables for sensitive information. Create a `.env` file in the `server` directory with the following content:**
        # MongoDB URIs
        MONGO_URI_REMOTE=<your_mongodb_uri_remote>

        # JWT Secret Key
        JWT_SECRET=<your_jwt_secret_key>

        # Stripe Secret Key
        STRIPE_SECRET_KEY=<your_stripe_secret_key>

        # Cloudinary URIs
        CLOUDINARY_API_KEY=<your_cloudinary_api_key>
        CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
        CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>

        # Access Token (Amadeus)
        ACCESS_TOKEN=<your_access_token>

        # OAuth credentials (Amadeus)
        CLIENT_ID=<your_client_id>
        CLIENT_SECRET=<your_client_secret>

        GOOGLE_API_KEY=<your_google_api_key>

        # Host and Frontend URLs
        HOST=http://localhost:8080
        FRONTEND=http://localhost:3000

        # Redis URL
        REDIS_URL=redis://default:<your_redis_password>@<your_redis_host>:<your_redis_port>


6. **Run the development server:**
    **Backend:**
        cd backend_node
        node server.js
    
    **Frontend:**
        cd ../frontend_react
        npm start

    The application should now be running at http://localhost:3000.

### Usage
- **Navigate through the application to explore destinations, find attractions, and locate restaurants.**
- **Create an account to save your preferences and itineraries.**

### Contact
- For any questions or suggestions, please contact aemoein@gmail.com.