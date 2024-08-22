# Explora: A Travel Scheduling and Journaling Application

<br>

<img src="images/Explora.png">

## Getting Started

The essential procedures required for initiating and configuring the project within your local environment.

### Prerequisites

1. Upgrade the Node Package Manager (npm) to the latest release version.

   ```sh
   npm install -g npm@latest
   ```

### Installation

1. Clone the repository and retrieve it onto your local machine.

   ```sh
   git clone https://github.com/Adshyan-Matheetharan/Explora.git
   ```

2. Navigate to the frontend folder directory.

   ```sh
   cd frontend
   ```

3. Install the required Node Package Manager (npm) packages and dependencies.

   ```sh
   npm install
   ```

4. Enter your environmental variables within the `.env` file.

   ```js
   VITE_FIREBASE_API_KEY="Enter Your API Key"
   VITE_FIREBASE_AUTH_DOMAIN="Enter Your Auth Domain"
   VITE_FIREBASE_PROJECT_ID="Enter Your Project Identification"
   VITE_FIREBASE_STORAGE_BUCKET="Enter Your Storage Bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="Enter Your Messaging Sender Identification"
   VITE_FIREBASE_APP_ID="Enter Your Application Identification"
   VITE_FIREBASE_MEASUREMENT_ID="Enter Your Measurement Identification"
   ```

5. Launch the application via localhost, and then access it through the browser.

   ```sh
   npm run dev
   ```

## License

This repository is distributed under the MIT License. See `LICENSE` for additional information.
