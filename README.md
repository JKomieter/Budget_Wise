# Budget Wise App Documentation

## Overview
Budget Wise is a web application that allows users to view their bank account details seamlessly. The app is built using Next.js for the frontend, Express for the backend, and Firebase for authentication and data storage.
 
## Features
* Bank Account Overview: Users can get a quick overview of their bank accounts.
* Secure Authentication: Firebase is used for secure user authentication.
* Real-time Updates: The app provides real-time updates for account details.

## Tech Stack
* Frontend: Next.js
* Backend: Express
* Authentication: Firebase Authentication
* Database: Firebase Firestore

## Getting Started
### Prerequisites
* Node.js and npm installed
* Firebase project and credentials

1. Clone the repository
   ```
   git clone https://github.com/your-username/budget-wise.git
   cd budget-wise
   ```
2. Install the frontend and backend dependencies and run
   Frontend
   ```
    cd frontend
    npm install
    npm run dev
   ```
   Backend
   ```
    cd backend
    npm install
    npm start
   ```

3. Set up Firebase:
* Create a Firebase project: Firebase Console
* Obtain Firebase config details and update the .env file.
  Firebase Configuration
  * Update .env with your Firebase config details:
  ```
  NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
  NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
  ```

4. Set up Plaid
   * Create a Plaid account and obtain the API keys.
   * Update .env with your Plaid API keys with your Plaid config details
     ```
      PLAID_CLIENT_ID=your-plaid-key
      PLAID_SECRET=your-plaid-secret
     ```

## Backend Authentication API Documentation

### Introduction
This documentation outlines the authentication API methods for the Budget Wise application. These methods are responsible for user sign-up, sign-in, sign-out, and retrieving user information.

### Base URL
All endpoints are relative to the base URL of your API. Replace {base_url} with the actual base URL.

#### Sign up
```
 POST /sign_up
```
Registers a new user in the system.
#### Sign out
```
 GET /sign_out
```
Signs out the currently authenticated user.
#### Sign in
```
 POST /sign_in
```
Authenticates an existing user.
#### Check the authentication state
```
 GET /check_auth_state
```
Check the authentication state of the user.

## Budget Wise Plaid Integration API Documentation

### Introduction
This documentation outlines the Plaid integration API methods for the Budget Wise application. These methods facilitate the creation of link tokens, exchanging public tokens, retrieving account information, and fetching transactions from Plaid.

#### Create Link Token
Endpoint
```
GET /create-link-token
```
Creates a Plaid link token for user authentication.

Response
```
{
  "link_token": "plaid-link-token"
}
```
#### Get Access Token
```
POST /get-access-token
```
Exchanges a public token for an access token.
Endpoint
```
{
  "publicToken": "plaid-public-token"
}
```
Response
```
{
  "public_token_exchange": "complete",
  "access_token": "plaid-access-token"
}
```
#### Exchange Public Token
```
POST /exchange-public-token
```
Exchanges a public token for an access token.
Endpoint
```
{
  "public_token": "plaid-public-token"
}
```
Response
```
{
  "public_token_exchange": "complete",
  "access_token": "plaid-access-token"
}
```
