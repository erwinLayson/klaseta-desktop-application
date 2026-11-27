import mysql from "mysql2/promise";
/** Shared MySQL connection pool used by all models and services. */
export declare const pool: mysql.Pool;
/** Verifies that the database is reachable, logging and rethrowing on failure. */
export declare const checkDatabaseConnection: () => Promise<void>;
//# sourceMappingURL=database.conn.d.ts.map