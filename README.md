# Contact Management MERN Stack Application

This project is a **Contact Management** web application built with the **MERN stack** (MongoDB, Express, React, Node.js). The application allows users to manage their contacts, including features such as creating, editing, and deleting contact information. The app uses a MongoDB database for storing contact data and an Express backend to handle API requests. The frontend is built using React.

## Project Overview

The **Contact Management** application allows users to perform CRUD (Create, Read, Update, Delete) operations on contacts. Each contact has a set of properties such as **First Name**, **Last Name**, **Phone Number**, **Email**, **Company**, and **Job Title**.

### Major Technical Decisions

- **Frontend**: The frontend is built using **React.js** with hooks for state management. We used **Tailwind CSS** for styling to make the app responsive and modern.
- **Backend**: The backend is built with **Express.js** and uses **MongoDB** as the database. The backend exposes a REST API for interacting with the contacts.
- **State Management**: We use **React's `useState` and `useEffect`** hooks to manage state and fetch data from the backend. For authentication, **JWT (JSON Web Token)** is used.
- **Deployment**: The app runs both the frontend and backend together using the `concurrently` package. This allows for simultaneous execution of both the server and client.

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
```

### 2. Install Dependencies

#### Backend (Server)

Navigate to the `server` folder and install the required dependencies:

```bash
cd server
npm install
```

#### Frontend (Client)

Go back to the root folder (or navigate to the `client` folder if you're inside `server`), and install the dependencies for the frontend:

```bash
cd ..
npm install
```

### 3. Configure Environment Variables

Ensure that you have set up any environment variables required for both the client and server. You can create `.env` files in both the `server` and root folder for storing sensitive information like MongoDB connection strings, JWT secrets, etc.

Example for `.env` in the `server` folder:

```
MONGO_URI=""
JWT_SECRET=your_jwt_secret
PORT=4000
```

For the frontend, you might need to add the API URL in the `.env` file as well:

```
REACT_APP_BASE_URL=http://localhost:4000/api/v1
```

### 4. Run the Project

To run both the backend and frontend simultaneously, use the following command from the root folder:

```bash
npm run dev
```

This will start both the server and client using the `concurrently` package, which runs both in parallel.

- The backend (server) will be accessible at `http://localhost:4000` (or whatever port you configure in the `server`).
- The frontend (client) will be available at `http://localhost:3000`.

### 5. Database Schema

Check Models Files

## Challenges and Solutions

### 1. **Challenge**: Managing Editable Form for Contact Information

Initially, managing the contact information in editable form was challenging, as we had to ensure that the fields were shown as non-editable headings when not in edit mode, and switched to input fields when the user clicked on the "edit" button.

**Solution**: To solve this, we introduced a state that toggles between editable and non-editable form for each field. The form would switch back to the heading style once the user clicks outside the input fields or saves the changes.

### 2. **Challenge**: Handling Backend API for CRUD Operations

The backend API for handling CRUD operations (Create, Read, Update, Delete) was complicated because it involved integrating with MongoDB and ensuring that the correct data was retrieved, updated, or deleted.

**Solution**: I used Express.js to build API endpoints for each CRUD operation. I used MongoDB's built-in methods like `findById`, `save`, `findOneAndUpdate`, and `deleteOne` to interact with the database. To handle potential errors, I implemented proper error handling and validation.

### 3. **Challenge**: Handling Authentication and State Management

As the application required user authentication and contact management, maintaining the user's logged-in state across components was tricky.

**Solution**: I used **JWT (JSON Web Tokens)** for authentication. After the user logs in, a token is stored in the client (in localStorage). The token is sent in HTTP headers for each protected API request. On the frontend, I used **React's Context API** and **Redux** to manage the global state for authentication.

### 4. **Challenge**: Ensuring UI Responsiveness

Building a responsive UI that works across devices was initially tricky, especially with custom inputs and buttons for editing contact information.

**Solution**: I used **Tailwind CSS** to apply responsive design principles, ensuring that the app looks good on different screen sizes. By using utility classes for layouts and spacing, I was able to achieve a modern, responsive design efficiently.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Key Sections:
- **Project Overview**: Provides a summary of the app and technical decisions.
- **Setup Instructions**: Includes steps for cloning the repo, installing dependencies, setting environment variables, and running the app.
- **Database Schema**: Adds a clear example of the MongoDB schema for the `Contact` model.
- **Challenges and Solutions**: Describes challenges faced during development and how they were resolved.

Let me know if you need further adjustments!