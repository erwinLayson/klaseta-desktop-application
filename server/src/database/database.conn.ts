import mysql from "mysql2/promise";
import isValidEnv from "../helper/isValidEnv.js";

/** Shared MySQL connection pool used by all models and services. */
export const pool = mysql.createPool({
    host: isValidEnv("DB_HOST"),
    user: isValidEnv("DB_USER"),
    password: isValidEnv("DB_PASSWORD"),
    database: isValidEnv("DB_NAME")
});

/** Verifies that the database is reachable, logging and rethrowing on failure. */
export const checkDatabaseConnection = async () => {
    try {
        await pool.query("SELECT 1");
        console.log("Database connection successful.");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
};
