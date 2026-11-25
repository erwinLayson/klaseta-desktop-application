import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";
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
// Routes
app.get("/", (_req, res) => {
    res.send("Hello, World!");
});
app.use("/api/users", userRoutes);
app.use(errorMiddleware);
export default app;
//# sourceMappingURL=app.js.map