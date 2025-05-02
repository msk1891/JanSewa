# React Native Authentication App

This project is a full-stack authentication application built with React Native, Express.js, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)

## Project Structure

```
.
├── backend/         # Express.js server
├── frontend/        # React Native app
```

## Setup Instructions

### Backend Setup

1. Navigate to the project root directory and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the `backend` directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/react-native-auth
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   ```

4. Run the app:
   - Press `i` to run on iOS simulator
   - Press `a` to run on Android emulator
   - Scan the QR code with Expo Go app on your physical device

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

## Testing the App

1. Register a new user with username, email, and password
2. Login with your email and password
3. You'll be redirected to the Home screen upon successful authentication
4. Use the Logout button to return to the Login screen