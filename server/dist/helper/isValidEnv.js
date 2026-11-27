import dotenv from 'dotenv';
dotenv.config();
/**
 * Reads a required environment variable and fails fast when it is missing.
 * @param env - Name of the environment variable to read.
 * @returns The configured value.
 * @throws If the variable is not set.
 */
export default function isValidEnv(env) {
    const value = process.env[env];
    if (value === undefined || value === null) {
        throw new Error(`Environment variable ${env} is not set or is empty.`);
    }
    return value;
}
//# sourceMappingURL=isValidEnv.js.map