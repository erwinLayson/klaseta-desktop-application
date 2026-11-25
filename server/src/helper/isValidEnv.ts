import dotenv from 'dotenv';
dotenv.config();

export default function isValidEnv(env: string): string {
    const value = process.env[env];
    if(value === undefined || value === null) {
        throw new Error(`Environment variable ${env} is not set or is empty.`);
    }
    return value;
}