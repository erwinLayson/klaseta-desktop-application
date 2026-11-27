import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./database/database.conn.js";
const MIGRATIONS_TABLE = "schema_migrations";
const runnerDir = dirname(fileURLToPath(import.meta.url));
/**
 * Locates the directory containing the SQL migration files.
 * Checks the runner directory and common source layouts, both for dev and compiled runs.
 * @returns The first directory that contains `.sql` files.
 * @throws If no migrations directory can be found.
 */
const findMigrationsDir = () => {
    const candidates = [
        runnerDir,
        resolve(runnerDir, "../src/migrations"),
        resolve(runnerDir, "../../src/migrations")
    ];
    for (const candidate of candidates) {
        if (existsSync(candidate) && readdirSync(candidate).some((file) => file.endsWith(".sql"))) {
            return candidate;
        }
    }
    throw new Error(`No SQL migrations directory found. Looked in: ${candidates.join(", ")}`);
};
/**
 * Applies every unapplied SQL migration in order and records it in `schema_migrations`.
 * Each migration runs in a transaction so a failure rolls back its statements.
 */
const runMigrations = async () => {
    const migrationsDir = findMigrationsDir();
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
                name VARCHAR(255) NOT NULL PRIMARY KEY,
                applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);
        const [rows] = await connection.query(`SELECT name FROM ${MIGRATIONS_TABLE}`);
        const applied = new Set();
        if (Array.isArray(rows)) {
            for (const row of rows) {
                applied.add(row.name);
            }
        }
        const files = readdirSync(migrationsDir)
            .filter((file) => file.endsWith(".sql"))
            .sort();
        for (const file of files) {
            if (applied.has(file)) {
                console.log(`Skipping applied migration: ${file}`);
                continue;
            }
            const statements = readFileSync(resolve(migrationsDir, file), "utf8")
                .split(";")
                .map((statement) => statement.trim())
                .filter((statement) => statement.length > 0);
            await connection.beginTransaction();
            try {
                for (const statement of statements) {
                    await connection.query(statement);
                }
                await connection.query(`INSERT INTO ${MIGRATIONS_TABLE} (name) VALUES (?)`, [file]);
                await connection.commit();
                console.log(`Applied migration: ${file}`);
            }
            catch (error) {
                await connection.rollback();
                throw new Error(`Failed to apply migration ${file}: ${String(error)}`);
            }
        }
        console.log("Migrations complete.");
    }
    finally {
        connection.release();
        await pool.end();
    }
};
/** Runs the migrations when this module is executed directly. */
runMigrations().catch((error) => {
    console.error("Migration runner failed:", error);
    process.exitCode = 1;
});
//# sourceMappingURL=migration.runner.js.map