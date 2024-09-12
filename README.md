# TRAVELIO

TRAVELIO is a comprehensive travel application designed to assist travelers at every stage of their journey, from selecting a destination to finding the best local restaurants and interacting with other travelers.

## Features

- **Destination Selection:** Explore various travel destinations with detailed information and personalized recommendations.
- **Local Attractions:** Discover popular attractions and activities at your destination.
- **Social Media Integration:** Connect with fellow travelers by sharing your trips and engaging with the community.
- **Restaurant Finder:** Locate top-rated local dining options with user reviews and ratings.
- **User Profiles:** Create and manage personal travel profiles and preferences.
- **Itinerary Planning:** Efficiently plan and organize your travel itinerary.

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

    ```bash
    git clone https://github.com/aemoein/travelio.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd travelio
    ```

3. **Install backend dependencies:**

    ```bash
    cd backend_node
    npm install
    ```

4. **Install frontend dependencies:**

    ```bash
    cd ../frontend_react
    npm install
    ```

5. **Set up environment variables:**

    Create a `.env` file in the `backend_node` directory with the following content:

    ```env
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

    # Google API Key
    GOOGLE_API_KEY=<your_google_api_key>

    # Host and Frontend URLs
    HOST=http://localhost:8080
    FRONTEND=http://localhost:3000

    # Redis URL
    REDIS_URL=redis://default:<your_redis_password>@<your_redis_host>:<your_redis_port>
    ```

6. **Run the development servers:**

    - **Backend:**

      ```bash
      cd backend_node
      npm start
      ```

    - **Frontend:**

      ```bash
      cd ../frontend_react
      npm start
      ```

    The application should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

- Explore destinations, find attractions, and discover restaurants through the application.
- Create an account to save your preferences and manage your itineraries.

## Contact

For any questions or suggestions, please contact [aemoein@gmail.com](mailto:aemoein@gmail.com).