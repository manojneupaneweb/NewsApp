<<<<<<< HEAD
```markdown
# NewsApp - MERN Stack

Welcome to **NewsApp**! This is a full-stack application built with **MERN** (MongoDB, Express.js, React, Node.js) for reading and posting news. The app features user authentication, news feed, comments, and an admin dashboard to manage news articles.

## Features

- **News Feed**: View a continuous feed of news articles.
- **User Authentication**: Only authorized users (admin or logged-in users) can post news or interact with comments.
- **Read News**: Any user (logged in or guest) can read news articles.
- **Commenting System**: Logged-in users can comment on news articles.
- **Admin Dashboard**: Admins can manage news articles (CRUD operations).
  
## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token) for secure authentication and role-based access control.

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone (https://github.com/manojneupaneweb/NewsApp)
```

### 2. Install Dependencies

- Navigate to the `backend` folder and install dependencies:

```bash
cd backend
npm install
```

- Navigate to the `frontend` folder and install dependencies:

```bash
cd frontend
npm install
```

### 3. Setup Environment Variables

In the `backend` folder, create a `.env` file with the following:

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/newsapp
JWT_SECRET=your_jwt_secret
```

In the `frontend` folder, configure the API base URL to your backend server (e.g., `http://localhost:8000`).

### 4. Running the Application

- Start the backend server:

```bash
cd backend
npm start
```

- Start the frontend server:

```bash
cd frontend
npm start
```

### 5. Access the Application

- **Frontend** will be accessible at: `http://localhost:3000`
- **Backend** will be accessible at: `http://localhost:8000`

## Features in Detail

### News Feed

- Users can browse the latest news articles.
- Each news article contains a title, content, date, and author.
- The news feed is publicly accessible, but only authorized users can post or manage news.

### Authentication

- Users must sign up and log in to post comments or submit news.
- Admins have access to a special dashboard to manage news.
- Authentication is handled via JWT tokens, ensuring secure access control.

### Comments

- Authenticated users can comment on news articles.
- Each comment includes the author's name, comment text, and timestamp.
- Comments can be added below each news article.

### Admin Dashboard

- Admins can access a restricted dashboard where they can perform CRUD operations (Create, Read, Update, Delete) on news articles.
- Admins can manage comments and users.

### News Posting

- Only authorized users (admin or logged-in users) can post new news articles.
- Admins can approve or delete news articles.

## API Endpoints

### Authentication

- **POST /api/v1/auth/register**: Register a new user.
- **POST /api/v1/auth/login**: Log in a user.

### News

- **GET /api/v1/news**: Get all news articles.
- **POST /api/v1/news**: Post a new news article (Admin only).
- **GET /api/v1/news/:id**: Get a specific news article.
- **DELETE /api/v1/news/:id**: Delete a news article (Admin only).

### Comments

- **POST /api/v1/news/:id/comments**: Add a comment to a news article (Authenticated users).
- **GET /api/v1/news/:id/comments**: Get all comments for a news article.
- **DELETE /api/v1/comments/:id**: Delete a comment (Admin only).


## Contact

For any questions, feel free to reach out to (mailto:maanojneupane111@gmailcom).


=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
>>>>>>> 2671da9 (Initial commit)
