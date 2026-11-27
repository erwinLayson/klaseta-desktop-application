/** Express application setup: shared middleware, database check, and API route mounting. */
import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL, // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}));
// Check database connection
import { checkDatabaseConnection } from "./database/database.conn.js";
checkDatabaseConnection();
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.route.js";
import teacherRoutes from "./routes/teachers.routes.js";
// Routes
app.use("/api/auth/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use(errorMiddleware);
export default app;
//# sourceMappingURL=app.js.map