# BuildOnlineChallenge - Backend

## Overview
This project is the backend for this challenge, a contact management platform that allows users to manage their contact information.

## Table of contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MySQL**: Relational database for storing user and contact data.
- **Sequelize**: ORM for managing database interactions.
- **JWT**: Used for user authentication.
- **dotenv**: For managing environment variables.
- **Nodemon** (development): Automatically restarts the server on file changes.

## Installation
Follow these steps to set up the backend locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your_username>/BuildOnlineChallenge-backend.git
   cd BuildOnlineChallenge-backend
   ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Install MySQL client library**:
     ```bash
    npm install mysql2
    ```

## Environment Variables
Create a .env file in the root of your project and configure it with the following variables:
    ```bash
    DB_NAME=contact_management
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    DB_PORT=3306
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

## Running the Application
To run the application, follow these steps:

1. **Start the MySQL database using Docker**:
    Ensure you have Docker installed and run:
     ```bash
    docker-compose up
    ```

2. **Run the backend server**:
    For development mode:
    ```bash
    npm run dev
    ```
    For running in production mode:
    ```bash
    node server.js
    ```

## API Endpoints
**Authentication**:
- POST /api/login: Authenticates a user and returns a JWT token.
    - Request body:
    ```bash
    "email": "example@gmail.com",
    "password": "password"
    ```
    - Response:
    ```bash
    "token": "the_token_generated"
    ```

**Contact Management**:
- GET /api/contacts: Retrieves a list of contacts for the logged-in user.
- GET /api/contacts/:email : etrieves a contact with the specified email.
- POST /api/contacts: Creates a new contact.
    - Request body:
    ```bash
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "address": "123 Main Street"
    ```
- PUT /api/contacts/: Updates an existing contact.
     - Request body: Optional fields 
    ```bash
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "address": "123 Main Street"
    ```
