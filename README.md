## 📢 NewsApp

**NewsApp** is a full-stack news platform where users can read and manage news articles. Built using **MERN Stack (MongoDB, Express.js, React, Node.js)**, this app provides real-time news updates with user authentication and an intuitive UI.

---

### 📌 Features

✅ View the latest news articles  
✅ User authentication (Signup/Login)  
✅ Add, edit, and delete news (Admin only)  
✅ Categorized news sections  
✅ Responsive UI for all devices
✅ Fast performance with optimized API calls  

---

### 🛠️ Tech Stack

#### 🌐 Frontend:
- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation

#### ⚙️ Backend:
- Node.js with Express.js
- MongoDB & Mongoose (Database)
- JWT Authentication
- Multer (for image uploads)
- Cloudinary (for media storage)

#### 🚀 Deployment:
- Frontend: **Vercel /**
- Backend:  **Vercel /**
- Database: **MongoDB Atlas**

---

## 📦 Installation & Setup

### 🔹 Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/manojneupaneweb/NewsApp.git
   cd newsapp/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

---

### 🔹 Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## 🔄 API Endpoints

| Method | Endpoint                 | Description                 |
|--------|--------------------------|-----------------------------|
| `GET`  | `/api/v1/posts`          | Get all news articles      |
| `GET`  | `/api/v1/posts/:id`      | Get a single news post     |
| `POST` | `/api/v1/posts/create`   | Create a new post (Admin)  |
| `PUT`  | `/api/v1/posts/edit/:id` | Edit a post (Admin)        |
| `DELETE` | `/api/v1/posts/delete/:id` | Delete post (Admin) |

---

## 📝 Future Updates
- Add user comments & likes  
- Implement newsletter subscription  
- Add real-time news API integration  

---

### 📧 Contact & Support
For any queries, feel free to reach out at **maanojneupane111@email.com** or connect via [LinkedIn]([(https://www.linkedin.com/in/manoj-neupane-52162921a/)].
