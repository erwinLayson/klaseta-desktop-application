export function normalizeString(input: unknown): string {
    if (typeof input !== "string") {
        throw new TypeError("Input must be a string");
    }
    
    return input.trim().toLocaleLowerCase();
}