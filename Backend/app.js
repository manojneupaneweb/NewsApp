import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import 'dotenv/config'


const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(","),
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.static("public"))
app.use(cookieParser())

// Middleware to parse JSON requests
app.use(express.json());

import { userRoute } from "./Routers/user.route.js";
import { postRouter } from "./Routers/post.router.js"
app.use("/api/v1/users", userRoute)
app.use("/api/v1/posts", postRouter)

export { app };

