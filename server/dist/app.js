import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
dotenv.config();
const app = express();
// Middleware
app.use(express.json());
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